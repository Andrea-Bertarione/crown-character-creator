<script lang="ts">
    import Header from "../../components/header/header.svelte";
    import CharacterList from "../../components/characterList/characterList.svelte";
    import RaceCard from "../../components/raceCard/raceCard.svelte";

    import { GradientButton, Modal, Label, Input, Select } from "flowbite-svelte";
    import {
        type AbilityScore,
        Character,
        type CharacterLanguage,
        charactersState,
        Race
    } from "../../State/characters.state";
    import { raceList } from "../../data/races.data";
    import {syncToCharacter} from "$lib/utils/characterSync";

    let showCreationModal = $state(false);

    // 1) Reactive form state (source of truth, plain data)
    let characterForm = $state({
        name: "",
        raceName: "Default" as string,
    });

    // 2) RaceCard selection state (persists across race changes)
    let chosenLanguagesState = $state<string[]>([]);
    let chosenAbilityModifiersState = $state<string[]>([]);
    let traitsOpen = $state<{ open: boolean; type?: string; choices: string[] }[]>([]);

    // 3) Map RaceData -> Race instances for runtime use
    const raceMap = new Map<string, Race>(
        raceList.map(raceData => [
            raceData.name,
            new Race(
                raceData.name,
                raceData.fixedModifiers,
                raceData.choiceModifiers,
                raceData.features,
                raceData.size,
                raceData.speed,
                raceData.languages,
                raceData.languageChoices,
                raceData.image!
            )
        ])
    );

    // 4) Items for Flowbite Select
    const itemRaceList = raceList.map(raceData => ({
        value: raceData.name,
        name: raceData.name
    }));

    // 5) Computed: current selected race (updates when characterForm.raceName changes)
    let currentRace = $derived(raceMap.get(characterForm.raceName) ?? null);

    // 6) Computed: derived Character instance (now includes RaceCard state)
    let newCharacter = $derived.by(() => {
        const c = new Character();
        c.name = characterForm.name;
        if (currentRace) {
            c.race = currentRace;
            c.allLanguages = currentRace.languages;
            c.chosenLanguages = chosenLanguagesState;
            c.chosenAbilityModifiers = chosenAbilityModifiersState;
        }
        return c;
    });

    let actualMap = new Map<string, Character>();
    let characters: Character[] = $derived.by(() => {
        let chars: Character[] = [];
        charactersState.value.subscribe(map => {
            chars = Array.from(map.values());
            actualMap = map;
        });
        return chars;
    });

    let characterAmount = $derived(characters.length);

    // 7) Handler for submit
    function handleCreate() {
        if (!currentRace) return;

        // Combine race languages with chosen languages
        newCharacter.allLanguages = currentRace.languages.concat(chosenLanguagesState as CharacterLanguage[]);

        // Apply ability modifiers
        for (const attribute in newCharacter.stats) {
            const choiceIndex = chosenAbilityModifiersState?.indexOf(attribute);

            // Add fixed modifiers from race
            newCharacter.stats[attribute as AbilityScore] += currentRace.fixedModifiers[attribute as AbilityScore];

            // Add choice modifiers if this ability was chosen
            if (choiceIndex !== -1) {
                newCharacter.stats[attribute as AbilityScore] += currentRace.choiceModifiers[choiceIndex];
            }
        }

        console.log("Creating character:", newCharacter);
        // Push to store or API here
        actualMap.set(newCharacter.id, newCharacter)
        charactersState.value.set(actualMap);

        // Reset form
        showCreationModal = false;
        characterForm = { name: "", raceName: "Default" };
        chosenLanguagesState = [];
        chosenAbilityModifiersState = [];
        traitsOpen = [];
    }


</script>

<Header />
<div class="flex flex-col items-center justify-center relative">
    <h2 class="text-5xl font-bold dark:text-white">Your Characters</h2>
    {#if characterAmount > 0}
        <GradientButton
                class="absolute top-16 right-20"
                onclick={() => showCreationModal = true}
        >
            Create New Character
        </GradientButton>
    {:else}
        <button
                onclick={() => showCreationModal = true}
                class="mt-30 w-full max-w-md mx-auto flex flex-col items-center justify-center gap-6 p-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-dashed border-primary/40 hover:border-primary/60 hover:dark:border-white transition-all group cursor-pointer"
        >
            <div class="text-7xl font-light text-primary/60 group-hover:dark:text-white group-hover:scale-110 transition-all">
                +
            </div>
            <div class="text-center">
                <h2 class="text-2xl font-bold dark:text-white mb-2">Create your first Character</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">Begin your adventure by creating a new hero</p>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-2 group-hover:scale-150 group-hover:dark:text-white group-hover:font-bold transition-all">Click to start</div>
        </button>
    {/if}
    <div class="flex flex-row justify-start mt-10">
        <CharacterList />
    </div>
</div>

{#if showCreationModal}
    <Modal
            class="relative overflow-visible"
            title="Create a new character"
            form
            bind:open={showCreationModal}
            onsubmit={handleCreate}
    >
        <Label for="name">Name</Label>
        <Input
                id="name"
                bind:value={characterForm.name}
                placeholder="Insert your character name"
        />

        <Label for="race">Race</Label>
        <Select
                id="race"
                bind:value={characterForm.raceName}
                placeholder="Select your character race"
                items={itemRaceList}
        />

        {#if currentRace}
            <RaceCard
                    race={currentRace}
                    characterInstance={newCharacter}
                    bind:chosenLanguagesState
                    bind:chosenAbilityModifiersState
                    bind:traitsOpen
            />
        {/if}

        <GradientButton type="submit">Create</GradientButton>
    </Modal>
{/if}
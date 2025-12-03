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

    let showCreationModal = $state(false);

    // 1) Reactive form state (source of truth, plain data)
    let characterForm = $state({
        name: "",
        raceName: "Default" as string,
    });

    // 2) Map RaceData -> Race instances for runtime use
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

    // 3) Items for Flowbite Select
    const itemRaceList = raceList.map(raceData => ({
        value: raceData.name,
        name: raceData.name
    }));

    // 4) Computed: current selected race (updates when characterForm.raceName changes)
    let currentRace = $derived(raceMap.get(characterForm.raceName) ?? null);

    // 5) Computed: derived Character instance
    let newCharacter = $derived.by(() => {
        const c = new Character();
        c.name = characterForm.name;
        if (currentRace) {
            c.race = currentRace;
            c.allLanguages = currentRace.languages;
            c.choosenLanguages = [];
        }
        return c;
    });

    let characters: Character[] = $derived.by(() => {
        let chars: Character[] = [];
        charactersState.value.subscribe(map => {
            chars = Array.from(map.values());
        });
        return chars;
    });

    let characterAmount = $derived(characters.length);

    // 6) Handler for submit
    function handleCreate() {
        newCharacter.allLanguages = newCharacter.allLanguages.concat(newCharacter.choosenLanguages as CharacterLanguage[]);
        for (const attribute in newCharacter.stats) {

            const choiceIndex = newCharacter.chosenAbilityModifiers?.indexOf(attribute);

            newCharacter.stats[attribute as AbilityScore] += newCharacter.race.fixedModifiers[attribute as AbilityScore];
            newCharacter.stats[attribute as AbilityScore] +=  choiceIndex ? newCharacter.race.choiceModifiers[choiceIndex] : 0;
        }


        console.log("Creating character:", newCharacter);
        // Push to store or API here
        showCreationModal = false;
        characterForm = { name: "", raceName: "Default" };
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
            <RaceCard race={currentRace} characterInstance={newCharacter} />
        {/if}

        <GradientButton type="submit">Create</GradientButton>
    </Modal>
{/if}

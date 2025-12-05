<script lang="ts">
    import {Accordion, AccordionItem, GradientButton, Input, Label, Modal, Select} from "flowbite-svelte";
    import Header from "../../components/header/header.svelte";
    import AbilityScoreComp from "../../components/abilityScoreComp/abilityScoreComp.svelte";
    import {type AbilityScore, type Character} from "$lib/characterCreation.svelte";
    import {type CharacterRace, racesData} from "../../data/races.data";
    import {proficienciesList} from "../../data/proficiencies.data";
    import { raceList, type RaceData } from "../../data/races.data";

    import {v4 as uuidv4} from "uuid";

    let idGenerated: string = uuidv4();

    // States
    let showCreationModal = $state(false);
    let characterState: Character = $state({
        id: idGenerated,
        name: "",
        race: "Default",
        abilityScoreComputed: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            wisdom: 10,
            intelligence: 10,
            charisma: 10,
        } as Record<AbilityScore, number>,
        abilityScores: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            wisdom: 10,
            intelligence: 10,
            charisma: 10,
        } as Record<AbilityScore, number>,
        additionalAbilityScores: {},
        proficiencies: proficienciesList,
        features: [],
    });

    let previousRace = $state<CharacterRace | "Default">("Default");

    $effect(() => {
        if (characterState.race !== "Default") {
            const selectedRace = racesData[characterState.race as CharacterRace];

            // Remove modifiers from PREVIOUS race
            if (previousRace !== "Default") {
                const prevRaceData = racesData[previousRace];
                prevRaceData.choiceModifiers.forEach((_, index) => {
                    delete characterState.additionalAbilityScores[`Race-${prevRaceData.name} extra ability score n.${index}`];
                });
            }

            // Add modifiers from NEW race
            selectedRace.choiceModifiers.forEach((mod, index) => {
                characterState.additionalAbilityScores[`Race-${selectedRace.name} extra ability score n.${index}`] = {
                    source: `${selectedRace.name} extra ability score n.${index}`,
                    increment: mod,
                    chosenScore: null
                };
            });

            // Update tracked race
            previousRace = characterState.race;
        } else {
            // If race set to Default, remove previous race modifiers
            if (previousRace !== "Default") {
                const prevRaceData = racesData[previousRace];
                prevRaceData.choiceModifiers.forEach((_, index) => {
                    delete characterState.additionalAbilityScores[`Race-${prevRaceData.name} extra ability score n.${index}`];
                });
            }
            previousRace = "Default";
        }
    });

</script>

<Header />
<div class="flex flex-col items-center justify-center relative">
        <button
                onclick={() => {
                    idGenerated = uuidv4();
                    showCreationModal = true
                }}
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
</div>

{#if showCreationModal}
    <Modal
            class="relative overflow-scroll box-border"
            title="Create a new character"
            size="xl"
            form
            bind:open={showCreationModal}
            onsubmit={() => console.log(characterState)}
    >
        <Label for="name">Name</Label>
        <Input
                id="name"
                bind:value={characterState.name}
                placeholder="Insert your character name"
        />

        <Label for="race">Race</Label>
        <Select
                id="race"
                bind:value={characterState.race}
                items={raceList.map((race: RaceData) => ({
                        name: race.name,
                        value: race.name,
                    }))}
                placeholder="Insert your character name"
        />

        <Accordion>
            <AccordionItem>
                {#snippet header()}
                    <Label class="text-xl" for="Ability">Ability Scores</Label>
                {/snippet}
                <AbilityScoreComp bind:characterState={characterState} isInCharacterCreation />
            </AccordionItem>
        </Accordion>

        <GradientButton type="submit">Create</GradientButton>
    </Modal>
{/if}
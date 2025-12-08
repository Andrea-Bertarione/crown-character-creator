<script lang="ts">
    import {Accordion, AccordionItem, GradientButton, Input, Label, Modal} from "flowbite-svelte";
    import Header from "../../components/header/header.svelte";
    import AbilityScoreComp from "../../components/abilityScoreComp/abilityScoreComp.svelte";
    import RaceFeaturesComp from "../../components/raceFeaturesComp/raceFeaturesComp.svelte";
    import LanguagesComp from "../../components/languagesComp/languagesComp.svelte";
    import RaceSelector from "../../components/raceSelector/raceSelector.svelte";
    import ClassSelector from "../../components/classSelector/classSelector.svelte";
    import { characterCreationState } from "$lib/characterCreation.svelte";

    // States
    let showCreationModal = $state(false);
    let showRaceModal = $state(false);
    let showClassModal = $state(false);
</script>

<Header />
<div class="flex flex-col items-center justify-center relative">
        <button
                onclick={() => {
                    showCreationModal = true;
                    characterCreationState.reset();
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
            onsubmit={() => characterCreationState.logCharacter()}
    >
        <Label for="name">Name</Label>
        <Input
                id="name"
                bind:value={characterCreationState.name}
                placeholder="Insert your character name"
        />

        <div class="flex flex-row gap-10">
            <div class="flex flex-col gap-3 w-50">
                <Label for="race">Race</Label>
                <GradientButton id="race" onclick={() => (showRaceModal = true)}>
                    {characterCreationState.race === "Default" ? "Select a Race..." : characterCreationState.race}{characterCreationState.subrace === null ? "" : `(${characterCreationState.subrace})`}
                </GradientButton>
            </div>
            <div class="flex flex-col gap-3 w-50">
                <Label for="class">Class</Label>
                <GradientButton id="class" onclick={() => (showClassModal = true)}>
                    {characterCreationState.class === null ? "Select a Class..." : characterCreationState.class}{characterCreationState.subClass === null ? "" : `(${characterCreationState.subClass})`}
                </GradientButton>
            </div>
        </div>
        {#if characterCreationState.race !== "Default"}
            <hr class="text-gray-600">
            <Accordion>
                <AccordionItem>
                    {#snippet header()}
                        <Label class="text-xl" for="Ability">Ability Scores</Label>
                    {/snippet}
                    <AbilityScoreComp isInCharacterCreation />
                </AccordionItem>
                <AccordionItem>
                    {#snippet header()}
                        <Label class="text-xl" for="RaceFeatures">Race Features</Label>
                    {/snippet}
                    <RaceFeaturesComp />
                </AccordionItem>
                <AccordionItem>
                    {#snippet header()}
                        <Label class="text-xl" for="Languages">Languages</Label>
                    {/snippet}
                    <LanguagesComp />
                </AccordionItem>
            </Accordion>
        {/if}
        <hr class="text-gray-600">
        <GradientButton type="submit">Create</GradientButton>
    </Modal>

    <RaceSelector
            bind:isOpen={showRaceModal}
            bind:selectedRace={characterCreationState.race}
            bind:selectedSubrace={characterCreationState.subrace}
            onSelect={(race) => {
                characterCreationState.race = race;
            }}
    />
    <ClassSelector
        bind:isOpen={showClassModal}
        bind:selectedClass={characterCreationState.class}
        bind:selectedSubclass={characterCreationState.subClass}
        onSelect={(classEl, subClassEl, choicesEl) => {
            characterCreationState.class = classEl;
            characterCreationState.subClass = subClassEl;
            characterCreationState.classChoices = choicesEl;
        }}
    />
{/if}
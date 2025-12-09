<script lang="ts">
    import {Accordion, AccordionItem, Button, GradientButton, Input, Label, Modal} from "flowbite-svelte";
    import Header from "../../components/header/header.svelte";
    import AbilityScoreComp from "../../components/abilityScoreComp/abilityScoreComp.svelte";
    import RaceFeaturesComp from "../../components/raceFeaturesComp/raceFeaturesComp.svelte";
    import LanguagesComp from "../../components/languagesComp/languagesComp.svelte";
    import RaceDetails from "../../components/details/raceDetails.svelte";
    import SubraceDetails from "../../components/details/subraceDetails.svelte";
    import ClassDetails from "../../components/details/classDetails.svelte";
    import SelectorComp from "../../components/selectorComp/selectorComp.svelte";
    import { characterCreationState } from "$lib/characterCreation.svelte";
    import racesData, {type CharacterRace, raceList} from "../../data/races.data";
    import {ChevronRightOutline} from "flowbite-svelte-icons";
    import {classesData} from "../../data/classes.data";

    interface Step {
        name: string;
        header: string,
        side: string[],
        confirm?: string
    }

    // States
    let showCreationModal = $state(false);
    let showSelectorModal = $state(false);

    let selectedSide = $state(0);
    let tempChoices: {[key: string]: string } = $state({
        Race: "",
        Subrace: "",
        Class: ""
    });

    const stepsData: Step[] = $derived.by(() => {
        // set race selection as default step 1
        const stepsArray = [
            {
                name: "Race",
                header: "Select a Race",
                side: raceList.map((race) => race.name as string),
                confirm: "Select race"
            },
        ];

        if (tempChoices.Race === "") { return stepsArray; }

        //has race been selected
        const confirmedRace = racesData[tempChoices.Race as CharacterRace];
        if (confirmedRace && confirmedRace.subraces && confirmedRace.subraces.length > 0) {
            stepsArray.push({
                name: "Subrace",
                header: "Select a Sub-Race" ,
                side: confirmedRace.subraces.map(subrace => subrace.name as string),
                confirm: "Select subrace"
            });
        }

        stepsArray.push({
            name: "Class",
            header: "Select a Class",
            side: Object.keys(classesData),
            confirm: "Select a Class"
        });

        return stepsArray;
    });
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
                <GradientButton id="race" onclick={() => (showSelectorModal  = true)}>
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

    <SelectorComp bind:isOpen={showSelectorModal} bind:selectedSide={selectedSide} numberOfSteps={3}  >
        {#snippet headers(currentStep)}
            {@const stepInfo = stepsData[currentStep]}
        	<p>{stepInfo ? stepInfo.header : "No header found"}</p>
        {/snippet}
        {#snippet side(currentStep)}
            {@const stepInfo = stepsData[currentStep]}
            {#if stepInfo}
                {#each stepInfo.side || [] as sideData, i}
                    <button
                            onclick={() => selectedSide = i}
                            class={`w-full px-4 py-3 text-left transition-all border-l-4 ${
                                    selectedSide === i
                                        ? "bg-opacity-20 border-sky-500 bg-gray-700"
                                        : "border-transparent hover:bg-gray-700 hover:bg-opacity-20"
                                }`}
                    >
                        <div class="flex items-center justify-between">
                            <span class="font-medium">{sideData}</span>
                            <ChevronRightOutline class="w-4 h-4 text-gray-500" />
                        </div>
                    </button>
                {/each}
            {/if}
        {/snippet}
        {#snippet steps(i)}
            {@const stepInfo = stepsData[i]}
            {#if stepInfo && stepInfo.name === "Race"}
                <RaceDetails currentRace={raceList[selectedSide]} />
            {/if}
            {#if stepInfo && stepInfo.name === "Subrace"}
                {@const race = raceList.find(race => race.name === tempChoices["Race"])}
                <SubraceDetails currentSubrace={!race || !race.subraces ? undefined : race.subraces[selectedSide] } />
            {/if}
            {#if stepInfo && stepInfo.name === "Class"}
                <ClassDetails currentClass={Object.values(classesData)[selectedSide]} />
            {/if}
        {/snippet}
        {#snippet actions(currentStep, nextStep, previousStep)}
            {@const stepInfo = stepsData[currentStep]}
            <GradientButton
                    onclick={() => {
                       if (!stepInfo) return;

                       tempChoices[stepInfo.name] = stepInfo.side[selectedSide];
                       selectedSide = 0;

                       nextStep();
                    }}
            >
                {(stepInfo && stepInfo.confirm) || "confirm selection"}
            </GradientButton>
        {/snippet}
    </SelectorComp>
{/if}
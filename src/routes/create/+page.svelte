<script lang="ts">
    import {Accordion, AccordionItem, Badge, Tabs, TabItem, GradientButton, Input, Label, Modal} from "flowbite-svelte";
    import Header from "../../components/header/header.svelte";
    import AbilityScoreComp from "../../components/abilityScoreComp/abilityScoreComp.svelte";
    import RaceFeaturesComp from "../../components/raceFeaturesComp/raceFeaturesComp.svelte";
    import LanguagesComp from "../../components/languagesComp/languagesComp.svelte";
    import RaceDetails from "../../components/details/raceDetails.svelte";
    import SubraceDetails from "../../components/details/subraceDetails.svelte";
    import ClassDetails from "../../components/details/classDetails.svelte";
    import SelectorComp from "../../components/selectorComp/selectorComp.svelte";
    import ProficienciesComp from "../../components/proficienciesComp/proficienciesComp.svelte";
    import FeatComp from "../../components/featComp/featComp.svelte";
    import { getAvailableSkillProficiencies, getAvailableToolsProficiencies } from "../../data/proficiencies.data";
    import {featsData} from "../../data/feats.data";
    import {characterCreationState, type CharacterLanguage} from "$lib/characterCreation.svelte";
    import racesData, {
        type CharacterRace,
        getKnownLanguages,
        getLanguageChoicesCount, getRacialFeatures,
        raceList
    } from "../../data/races.data";
    import {ChevronRightOutline} from "flowbite-svelte-icons";
    import {classesData, type ClassName} from "../../data/classes.data";
    import {featuresMap} from "../../data/features.data";

    //imported states
    import {CharacterCreationManager} from "$lib/characterCreationManager.svelte";

    const manager = new CharacterCreationManager({
        racesData: racesData,
        classesData: classesData,
        featuresMap: featuresMap,
        raceList
    });

    // States
    let showCreationModal = $state(false);
    let showSelectorModal = $state(false);
    let selectedSide = $state(0);


    let proficienciesAvailables: {[key: string]: () => string[]} = {
        skill: getAvailableSkillProficiencies,
        tool: getAvailableToolsProficiencies,
    }

    const getSelectedCount =(
        choiceCategory: string,
        selections: string[] = []
    ): number => {
        // Filter out empty strings and count non-empty selections
        return selections.filter(s => s && s.trim().length > 0).length;
    }

    const getMaxCount = (
        choiceCategory: string,
        race?: CharacterRace,
        subrace?: string | null,
        selectedClass?: string
    ): number => {
        const normalized = choiceCategory
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");

        switch (normalized) {
            case "languages":
                return race ? getLanguageChoicesCount(race, subrace) : 0;

            case "skill": {
                // FIX: Check both race AND class for skill choices
                let maxChoices = 0;

                // Add race skill choices
                if (race) {
                    const features = getRacialFeatures(race, subrace);
                    for (const featureName of features) {
                        const featureData = featuresMap[featureName];
                        if (!featureData || !featureData.modifiers) continue;

                        for (const mod of featureData.modifiers) {
                            if (
                                (mod.type === "skill-proficiency" &&
                                    mod.value === "choice")
                            ) {
                                maxChoices += 1;
                            }
                        }
                    }
                }

                // Add class skill choices (this is the main source for most classes)
                if (selectedClass) {
                    const classData = classesData[selectedClass as ClassName];
                    if (classData && classData.skillChoices) {
                        maxChoices += classData.skillChoices;
                    }
                }

                return maxChoices;
            }

            case "tool": {
                // FIX: Check both race AND class for tool choices
                let maxChoices = 0;

                // Add race tool choices
                if (race) {
                    const features = getRacialFeatures(race, subrace);
                    for (const featureName of features) {
                        const featureData = featuresMap[featureName];
                        if (!featureData || !featureData.modifiers) continue;

                        for (const mod of featureData.modifiers) {
                            if (
                                (mod.type === "tool-proficiency" &&
                                    mod.value === "choice")
                            ) {
                                maxChoices += 1;
                            }
                        }
                    }
                }

                // Add class tool choices
                if (selectedClass) {
                    const classData = classesData[selectedClass as ClassName];
                    if (classData && classData.toolChoices) {
                        maxChoices += classData.toolChoices;
                    }
                }

                return maxChoices;
            }

            case "feat": {
                if (!race) return 0;
                const features = getRacialFeatures(race, subrace);
                return features.includes("Feat at 1st Level") ? 1 : 0;
            }

            default:
                return 0;
        }
    };

    const getSelectedCountByTab = (proficiencyTab: string): number => {
        const allSelected = manager.additionalChoicesRaceSubState["Proficiency"] || [];
        const available = proficienciesAvailables[proficiencyTab]();
        return allSelected.filter(p => available.includes(p)).length;
    };

    /**
     * Syncs the appropriate temp state to character based on which step was completed
     */
    const syncCharacterFromStep = (stepName: string) => {
        switch(stepName) {
            case "Race":
                // Race is the root - clear dependent choices too
                characterCreationState.syncFromSelectionState({
                    race: manager.tempChoices.Race as CharacterRace
                });
                // Clear temp state for dependent steps
                manager.tempChoices.Subrace = "";
                manager.tempChoices.Class = "";
                manager.tempChoices.Subclass = "";
                manager.additionalChoicesRaceSubState.Languages = [];
                manager.additionalChoicesRaceSubState.Proficiency = [];
                manager.additionalChoicesRaceSubState.Feat = [];

                break;

            case "Subrace":
                characterCreationState.syncFromSelectionState({
                    subrace: manager.tempChoices.Subrace || null
                });
                // Clear temp state for dependent steps
                manager.tempChoices.Class = "";
                manager.tempChoices.Subclass = "";
                manager.additionalChoicesRaceSubState.Languages = [];
                manager.additionalChoicesRaceSubState.Proficiency = [];
                manager.additionalChoicesRaceSubState.Feat = [];

                break;

            case "Class":
                characterCreationState.syncFromSelectionState({
                    class: manager.tempChoices.Class as ClassName
                });
                // Clear subclass if class changed
                manager.tempChoices.Subclass = "";
                // Clear additional choices since proficiencies might change
                manager.additionalChoicesRaceSubState.Languages = [];
                manager.additionalChoicesRaceSubState.Proficiency = [];
                manager.additionalChoicesRaceSubState.Feat = [];

                break;

            case "Subclass":
                characterCreationState.syncFromSelectionState({
                    subclass: manager.tempChoices.Subclass || null
                });
                // Clear additional choices in case subclass changes what's available
                manager.additionalChoicesRaceSubState.Languages = [];
                manager.additionalChoicesRaceSubState.Proficiency = [];
                manager.additionalChoicesRaceSubState.Feat = [];

                break;

            case "AdditionalChanges":
                characterCreationState.syncFromSelectionState({
                    languages: manager.additionalChoicesRaceSubState.Languages,
                    proficiencies: manager.additionalChoicesRaceSubState.Proficiency,
                    feats: manager.additionalChoicesRaceSubState.Feat
                });
                // Keep temp state - don't reset it yet, user might go back
                break;
        }
    };

</script>

<Header />
<div class="flex flex-col items-center justify-center relative">
    <button
            onclick={() => {
                    showCreationModal = true;
                    showSelectorModal = true;
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
            class="relative box-border"
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

        <div class="flex flex-row gap-10 mt-20">
            <div class="flex flex-col justify-center items-center gap-6 w-full">
                <Label class="text-3xl font-bold" for="character">Character Details</Label>
                <GradientButton class="text-2xl  w-2/3" id="character" onclick={() => (showSelectorModal  = true)}>
                    Edit selections...
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
                    <LanguagesComp knownLanguages={getKnownLanguages(characterCreationState.race, characterCreationState.subrace || "")}
                                   bind:languageChoices={characterCreationState.languagesChoices}
                                   languageChoicesCount={getLanguageChoicesCount(characterCreationState.race, characterCreationState.subrace || "")}
                    />
                </AccordionItem>
            </Accordion>
        {/if}
        <hr class="text-gray-600">
        <GradientButton type="submit">Create</GradientButton>
    </Modal>

    <SelectorComp bind:isOpen={showSelectorModal} bind:selectedSide={selectedSide} numberOfSteps={manager.stepsData.length}  >
        {#snippet headers(currentStep)}
            {@const stepInfo = manager.stepsData[currentStep]}
            <p>{stepInfo ? stepInfo.header : "No header found"}</p>
            <p class="text-gray-400 text-sm mt-1">{stepInfo ? stepInfo.subheader : "No SubHeader found"}</p>
        {/snippet}
        {#snippet side(currentStep)}
            {@const stepInfo = manager.stepsData[currentStep]}
            {#if stepInfo}
                {#each stepInfo.side || Array<String>(0) as sideData, i}
                    <button
                            onclick={() => selectedSide = i}
                            class={`w-full px-4 py-3 text-left transition-all border-l-4 ${
                                    selectedSide === i
                                        ? "bg-opacity-20 border-sky-500 bg-gray-700"
                                        : "border-transparent hover:bg-gray-700 hover:bg-opacity-20"
                                }`}
                    >
                        <div class="flex items-center justify-between">
                            <span class="font-medium capitalize">{sideData.replaceAll("-", " ")}</span>
                            {#if stepInfo.name === "AdditionalChanges"}
                                <Badge color="blue" class="px-2 py-0 text-xs">
                                    {sideData === "skill" || sideData === "tool" ?
                                        getSelectedCount(sideData, manager.additionalChoicesRaceSubState["Proficiency"]):
                                        getSelectedCount(sideData, manager.additionalChoicesRaceSubState[sideData])}
                                    /
                                    {sideData === "skill" || sideData === "tool" ?
                                        getMaxCount(sideData, manager.tempChoices["Race"], manager.tempChoices["Subrace"], manager.tempChoices["Class"]):
                                        getMaxCount(sideData, manager.tempChoices["Race"], manager.tempChoices["Subrace"])}
                                </Badge>
                            {/if}
                            <ChevronRightOutline class="w-4 h-4 text-gray-500" />
                        </div>
                    </button>
                {/each}
            {/if}
        {/snippet}
        {#snippet steps(i)}
            {@const stepInfo = manager.stepsData[i]}
            {#if stepInfo && stepInfo.name === "Race"}
                <RaceDetails currentRace={raceList[selectedSide]} />
            {/if}
            {#if stepInfo && stepInfo.name === "Subrace"}
                {@const race = raceList.find(race => race.name === manager.tempChoices["Race"])}
                <SubraceDetails currentSubrace={!race || !race.subraces ? undefined : race.subraces[selectedSide] } />
            {/if}
            {#if stepInfo && stepInfo.name === "AdditionalChanges"}
                {#if stepInfo.side[selectedSide] === "Languages"}
                    <LanguagesComp knownLanguages={getKnownLanguages(manager.tempChoices["Race"], manager.tempChoices["Subrace"] || "")}
                                   bind:languageChoices={manager.additionalChoicesRaceSubState["Languages"]}
                                   languageChoicesCount={getLanguageChoicesCount(manager.tempChoices["Race"], manager.tempChoices["Subrace"] || "")}
                    />
                {/if}
                {#if stepInfo.side[selectedSide] === "skill" || stepInfo.side[selectedSide] === "tool"}
                    <Tabs classes={{ active: "p-4 text-white bg-sky-800 rounded-t-lg dark:bg-sky-600 dark:text-white" }}>
                        {#if stepInfo.side[selectedSide] === "skill"}
                            <TabItem open title="Skills">
                                <ProficienciesComp
                                        bind:selectedProficiencies={manager.additionalChoicesRaceSubState["Proficiency"]}
                                        availableProficiencies={getAvailableSkillProficiencies()}
                                        maxSelections={getMaxCount("skill", manager.tempChoices["Race"], manager.tempChoices["Subrace"], manager.tempChoices["Class"])}
                                />
                            </TabItem>
                        {/if}
                        {#if stepInfo.side[selectedSide] === "tool"}
                            <TabItem open title="Tools">
                                <ProficienciesComp
                                        bind:selectedProficiencies={manager.additionalChoicesRaceSubState["Proficiency"]}
                                        availableProficiencies={getAvailableToolsProficiencies()}
                                        maxSelections={getMaxCount("tool", manager.tempChoices["Race"], manager.tempChoices["Subrace"], manager.tempChoices["Class"])}
                                />
                            </TabItem>
                        {/if}
                    </Tabs>
                {/if}
                {#if stepInfo.side[selectedSide] === "feat"}
                    <FeatComp
                            character={characterCreationState}
                            bind:selectedFeats={manager.additionalChoicesRaceSubState["Feat"]}
                            maxFeats={getMaxCount("feat", manager.tempChoices["Race"], manager.tempChoices["Subrace"])}
                            featDescription={featsData}
                    />
                {/if}
            {/if}
            {#if stepInfo && stepInfo.name === "Class"}
                <ClassDetails currentClass={Object.values(classesData)[selectedSide]} />
            {/if}
        {/snippet}
        {#snippet actions(currentStep, nextStep, previousStep)}
            {@const stepInfo = manager.stepsData[currentStep]}
            <GradientButton
                    onclick={() => {
               if (!stepInfo) return;

               // Store the selection
               manager.tempChoices[stepInfo.name] = stepInfo.side[selectedSide];

               // 🔑 NEW: Sync to character state based on step type
               syncCharacterFromStep(stepInfo.name);

               // FIX: Close modal after final step (AdditionalChanges)
               if (stepInfo.name === "AdditionalChanges") {
                   showSelectorModal = false;
               } else {
                   selectedSide = 0;
                   nextStep();
               }
            }}
            >
                {(stepInfo && stepInfo.confirm) || "confirm selection"}
            </GradientButton>
        {/snippet}
    </SelectorComp>
{/if}
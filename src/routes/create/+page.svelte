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
    import {classesData} from "../../data/classes.data";
    import {featuresMap} from "../../data/features.data";

    interface Step {
        name: string;
        header: string,
        subheader: string,
        side: string[],
        confirm: string
    }

    interface AdditionalChoicesRaceSubState {
        Languages?: CharacterLanguage[],
        Proficiency?: string[],
        Feat?: string[]
    }

    // States
    let showCreationModal = $state(false);
    let showSelectorModal = $state(false);

    let selectedSide = $state(0);
    let tempChoices: {[key: string]: string } & {Race: CharacterRace} = $state({
        Race: "Default",
        Subrace: "",
        AdditionalChanges: "",
        Class: ""
    });

    let additionalChoicesRaceSubState: {[key: string]: any[] } & AdditionalChoicesRaceSubState = $state({
        Languages: [],
        Proficiency: [],
        Feat: []
    });

    let proficienciesTabRaceState: string[] = $derived.by(() => {
        const tabsProf: string[] = [];

        if (tempChoices.Race === "Default") return tabsProf;

        const confirmedRace = racesData[tempChoices.Race as CharacterRace];
        if (!confirmedRace) return tabsProf;

        const features = confirmedRace.features;
        for (const raceFeature of features) {
            const featureData = featuresMap[raceFeature];
            if (!featureData) continue;

            for (const modifier of featureData.modifiers || []) {
                if (modifier.value === "choice") {
                    const isProficiency = modifier.type.includes("proficiency") ? "proficiency" : modifier.type;
                    if (isProficiency === "proficiency" && !tabsProf.includes(modifier.type.split("-")[0])) {
                        tabsProf.push(modifier.type.split("-")[0]);
                    }
                }
            }
        }

        if (tempChoices["Subrace"]) {
            const confirmedSubRace = confirmedRace.subraces?.find(sub => sub.name === tempChoices["Subrace"]);
            const featuresSub = confirmedSubRace?.features || [];

            for (const raceSubFeature of featuresSub) {
                const featureData = featuresMap[raceSubFeature];
                if (!featureData) continue;

                for (const modifier of featureData.modifiers || []) {
                    if (modifier.value === "choice") {
                        const isProficiency = modifier.type.includes("proficiency") ? "proficiency" : modifier.type;
                        if (isProficiency === "proficiency" && !tabsProf.includes(modifier.type.split("-")[0])) {
                            tabsProf.push(modifier.type.split("-")[0]);
                        }
                    }
                }
            }
        }

        return tabsProf;
    });

    let proficienciesAvailables: {[key: string]: () => string[]} = {
        skill: getAvailableSkillProficiencies,
        tool: getAvailableToolsProficiencies,
    }

    const stepsData: Step[] = $derived.by(() => {
        // set race selection as default step 1
        const stepsArray = [
            {
                name: "Race",
                header: "Select a Race",
                subheader: "Choose a race for your character. Each race grants different ability score increases, features, and languages.",
                side: raceList.map((race) => race.name as string),
                confirm: "Select race"
            },
        ];

        if (tempChoices.Race === "Default") { return stepsArray; }

        //has race been selected
        const confirmedRace = racesData[tempChoices.Race as CharacterRace];
        let hasSubrace = false;
        if (confirmedRace && confirmedRace.subraces && confirmedRace.subraces.length > 0) {
            hasSubrace = true;
            stepsArray.push({
                name: "Subrace",
                header: "Select a Sub-Race" ,
                subheader: "Select a subrace to customize your character further.",
                side: confirmedRace.subraces.map(subrace => subrace.name as string),
                confirm: "Select subrace"
            });
        }

        stepsArray.push({
            name: "Class",
            header: "Select a Class",
            subheader: "Choose a class for your character. Each class determines your abilities, proficiencies, and combat style.",
            side: Object.keys(classesData),
            confirm: "Select a Class"
        });

        //additional choices
        const additionalChoicesRes: Step = {
            name: "AdditionalChanges",
            header: "Select additional choices and features",
            subheader: "Select additional choices and features for your character.",
            side: [],
            confirm: "Confirm choices"
        }
        if (confirmedRace) {
            const hasLanguageChoice = confirmedRace.languageChoices > 0 ? additionalChoicesRes.side.push("Languages") ? true : true : false;
            const features = confirmedRace.features;
            for (const raceFeature of features) {
                const featureData = featuresMap[raceFeature];

                if (!featureData) { continue; }

                for (const modifier of featureData.modifiers || []) {
                    if (modifier.value === "choice") {
                        const isProficiency = modifier.type.includes("proficiency") ? "proficiency" : modifier.type;
                        additionalChoicesRes.side.indexOf(isProficiency as string) === -1 ? additionalChoicesRes.side.push(isProficiency) : null;
                    }
                }
            }

            if (hasSubrace) {
                const confirmedSubRace = confirmedRace.subraces!.find(sub => sub.name === tempChoices["Subrace"]);
                hasLanguageChoice ? null : (confirmedSubRace?.languageChoices || 0) > 0 ? additionalChoicesRes.side.push("Languages") : null;

                const featuresSub = confirmedSubRace?.features || [];

                for (const raceSubFeature of featuresSub) {
                    const featureData = featuresMap[raceSubFeature];

                    if (!featureData) { continue; }

                    for (const modifier of featureData.modifiers || []) {
                        if (modifier.value === "choice") {
                            const isProficiency = modifier.type.includes("proficiency") ? "proficiency" : modifier.type;
                            additionalChoicesRes.side.indexOf(isProficiency as string) === -1 ? additionalChoicesRes.side.push(isProficiency) : null;
                        }
                    }
                }
            }
        }

        if (additionalChoicesRes.side.length > 0) {
            stepsArray.push(additionalChoicesRes);
        }

        return stepsArray;
    });

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
        subrace?: string | null
    ): number => {
        const normalized = choiceCategory
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");

        switch (normalized) {
            case "languages":
                return race ? getLanguageChoicesCount(race, subrace) : 0;

            case "skill": {
                if (!race) return 0;

                // Collect all racial + subracial features
                const features = getRacialFeatures(race, subrace);

                // Count how many modifiers of type "skill-proficiency" with value "choice"
                // e.g. Half-Elf "Skill Versatility" gives 2 such modifiers.
                let maxChoices = 0;

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

                return maxChoices;
            }

            case "tool": {
                if (!race) return 0;

                // Collect all racial + subracial features
                const features = getRacialFeatures(race, subrace);

                // Count how many modifiers of type "skill-proficiency" with value "choice"
                // e.g. Half-Elf "Skill Versatility" gives 2 such modifiers.
                let maxChoices = 0;

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
        const allSelected = additionalChoicesRaceSubState["Proficiency"] || [];
        const available = proficienciesAvailables[proficiencyTab]();
        return allSelected.filter(p => available.includes(p)).length;
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

    <SelectorComp bind:isOpen={showSelectorModal} bind:selectedSide={selectedSide} numberOfSteps={3}  >
        {#snippet headers(currentStep)}
            {@const stepInfo = stepsData[currentStep]}
        	<p>{stepInfo ? stepInfo.header : "No header found"}</p>
            <p class="text-gray-400 text-sm mt-1">{stepInfo ? stepInfo.subheader : "No SubHeader found"}</p>
        {/snippet}
        {#snippet side(currentStep)}
            {@const stepInfo = stepsData[currentStep]}
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
                                    {sideData === "proficiency" ?
                                        proficienciesTabRaceState.reduce((sum, tab) => sum + getSelectedCountByTab(tab), 0):
                                        getSelectedCount(sideData, additionalChoicesRaceSubState[sideData])}
                                    /
                                    {sideData === "proficiency" ?
                                        proficienciesTabRaceState.map(proficiencyTab => getMaxCount(proficiencyTab, tempChoices["Race"], tempChoices["Subrace"])).reduce((a, b) => a + b, 0):
                                        getMaxCount(sideData, tempChoices["Race"], tempChoices["Subrace"])}
                                </Badge>
                            {/if}
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
            {#if stepInfo && stepInfo.name === "AdditionalChanges"}
                {#if stepInfo.side[selectedSide] === "Languages"}
                    <LanguagesComp knownLanguages={getKnownLanguages(tempChoices["Race"], tempChoices["Subrace"] || "")}
                                   bind:languageChoices={additionalChoicesRaceSubState["Languages"]}
                                   languageChoicesCount={getLanguageChoicesCount(tempChoices["Race"], tempChoices["Subrace"] || "")}
                    />
                {/if}
                {#if stepInfo.side[selectedSide] === "proficiency"}
                    <Tabs classes={{ active: "p-4 text-white bg-sky-800 rounded-t-lg dark:bg-sky-600 dark:text-white" }}>
                        {#each proficienciesTabRaceState as proficiencyTab, i}
                            {@const availableProficiencies = proficienciesAvailables[proficiencyTab]}
                            {#if availableProficiencies}
                                <TabItem open={i === 0} title={proficiencyTab + "s"}>
                                    <ProficienciesComp
                                            bind:selectedProficiencies={additionalChoicesRaceSubState["Proficiency"]}
                                            availableProficiencies={availableProficiencies()}
                                            maxSelections={getMaxCount(proficiencyTab, tempChoices["Race"], tempChoices["Subrace"])}
                                    />
                                </TabItem>
                            {:else}
                                Warn no proficiencies available for {proficiencyTab}
                            {/if}
                        {/each}
                    </Tabs>
                {/if}
                {#if stepInfo.side[selectedSide] === "feat"}
                    <FeatComp
                            character={characterCreationState}
                            bind:selectedFeats={additionalChoicesRaceSubState["Feat"]}
                            maxFeats={getMaxCount("feat", tempChoices["Race"], tempChoices["Subrace"])}
                            featDescription={featsData}
                    />
                {/if}
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
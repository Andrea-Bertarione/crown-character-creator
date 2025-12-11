<script lang="ts">
    import {Modal, Button, GradientButton, Popover, Label} from "flowbite-svelte";
    import { ChevronRightOutline, ChevronLeftOutline } from "flowbite-svelte-icons";
    import FeaturesCard from "../featuresCard/featuresCard.svelte";
    import racesData, { raceList, type CharacterRace } from "../../data/races.data";
    import {featuresMap} from "../../data/features.data";

    let {
        isOpen = $bindable(false),
        onSelect = (race: CharacterRace, subrace?: string) => {},
        selectedRace = $bindable("Default"),
        selectedSubrace = $bindable<string | null>(null)
    }: {
        isOpen: boolean;
        onSelect: (race: CharacterRace, subrace?: string) => void;
        selectedRace: CharacterRace;
        selectedSubrace: string | null;
    } = $props();

    let step: "race" | "subrace" = $state("race");
    let tempRace: CharacterRace | null = $state(null);
    let tempSubrace: string | null = $state(null);
    let hoveredRace: CharacterRace | null = $state(null);

    const previewRace = (race: CharacterRace) => {
        hoveredRace = race;
    };

    const confirmRace = () => {
        if (!hoveredRace) return;

        const raceData = racesData[hoveredRace];
        if (raceData?.subraces && raceData.subraces.length > 0) {
            tempRace = hoveredRace;
            step = "subrace";
            tempSubrace = null;
        } else {
            selectedRace = hoveredRace;
            onSelect(hoveredRace);
            isOpen = false;
        }
    };

    const previewSubrace = (subraceName: string) => {
        tempSubrace = subraceName;
    };

    const confirmSubrace = () => {
        if (!tempSubrace || !tempRace) return;

        selectedSubrace = tempSubrace;
        selectedRace = tempRace;
        onSelect(tempRace, tempSubrace);
        isOpen = false;
    };

    const goBack = () => {
        step = "race";
        tempRace = null;
        tempSubrace = null;
        hoveredRace = null;
    };
</script>

<Modal bind:open={isOpen} size="xl" class="!max-w-6xl">
    <div class="py-4 h-[600px] flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 pb-4 border-b border-gray-700">
            <div class="flex items-center gap-3">
                {#if step === "subrace"}
                    <button onclick={goBack} class="text-gray-400 hover:text-white transition">
                        <ChevronLeftOutline class="w-15 h-15" />
                    </button>
                {/if}
                <div>
                    <h2 class="text-3xl font-bold">
                        {step === "race" ? "Select a Race" : `${tempRace} Subraces`}
                    </h2>
                    <p class="text-gray-400 text-sm mt-1">
                        {step === "race"
                            ? "Choose a race for your character. Each race grants different ability score increases, features, and languages."
                            : "Select a subrace to customize your character further."}
                    </p>
                </div>
            </div>
        </div>

        <!-- Content Area: Two-Column Layout -->
        <div class="flex flex-1 overflow-hidden">
            <!-- LEFT SIDEBAR: List of Races/Subraces -->
            <div class="w-48 border-r border-gray-700 overflow-y-auto">
                {#if step === "race"}
                    {#each raceList as race}
                        <button
                                onclick={() => previewRace(race.name)}
                                class={`w-full px-4 py-3 text-left transition-all border-l-4 ${
                                hoveredRace === race.name
                                    ? "bg-opacity-20 border-sky-500 bg-gray-700"
                                    : "border-transparent hover:bg-gray-700 hover:bg-opacity-20"
                            }`}
                        >
                            <div class="flex items-center justify-between">
                                <span class="font-medium">{race.name}</span>
                                {#if race.subraces && race.subraces.length > 0}
                                    <ChevronRightOutline class="w-4 h-4 text-gray-500" />
                                {/if}
                            </div>
                        </button>
                    {/each}
                {:else if step === "subrace" && tempRace}
                    {@const raceData = racesData[tempRace]}
                    {@const subraces = raceData?.subraces || []}
                    {#each subraces as subrace}
                        <button
                                onclick={() => previewSubrace(subrace.name)}
                                class={`w-full px-4 py-3 text-left transition-all border-l-4 ${
                                tempSubrace === subrace.name
                                    ? "bg-opacity-20 border-sky-500 bg-gray-700"
                                    : "border-transparent hover:bg-gray-700 hover:bg-opacity-20"
                            }`}
                        >
                            <span class="font-medium">{subrace.name}</span>
                        </button>
                    {/each}
                {/if}
            </div>

            <!-- RIGHT CONTENT AREA: Details Card -->
            <div class="relative flex-1 overflow-y-auto p-6">
                {#if step === "race"}
                    {@const currentRace = raceList.find(r => r.name === hoveredRace)}
                    {#if currentRace}
                        <div class="space-y-6">
                            <!-- Image -->
                            <div class="absolute bottom-0 right-2 overflow-hidden">
                                <img
                                        src={currentRace.image}
                                        alt={currentRace.name}
                                        class="object-cover"
                                />
                            </div>

                            <!-- Race Name -->
                            <div class="z-10 w-2/3">
                                <h3 class="text-2xl font-bold mb-2">{currentRace.name}</h3>
                                <p class="text-gray-300 text-sm">
                                    {currentRace.description || "A proud and versatile people."}
                                </p>
                            </div>

                            <!-- Ability Modifiers + Choice Modifiers -->
                            {#if Object.entries(currentRace.fixedModifiers).some(([_, mod]) => mod !== 0) || currentRace.choiceModifiers.length > 0}
                                <div class="z-10">
                                    <p class="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wide">Ability Modifiers</p>
                                    <div class="flex gap-2 flex-wrap">
                                        {#each Object.entries(currentRace.fixedModifiers) as [ability, mod]}
                                            {#if mod !== 0}
                                                <span class="px-3 py-1 bg-sky-500 text-black rounded-lg text-xs font-bold">
                                                    {ability.slice(0, 3).toUpperCase()} {mod > 0 ? "+" : ""}{mod}
                                                </span>
                                            {/if}
                                        {/each}
                                        {#each currentRace.choiceModifiers as choice}
                                            <span class="px-3 py-1 bg-sky-500 bg-opacity-50 text-black rounded-lg text-xs font-bold border border-sky-400 border-dashed">
                                                +{choice} <span class="text-black">(Choose)</span>
                                            </span>
                                        {/each}
                                    </div>
                                </div>
                            {/if}

                            <!-- Size, Speed, Languages -->
                            <div class="z-10 grid grid-cols-4 gap-4">
                                <div class="bg-gray-700 bg-opacity-30 rounded-lg p-3">
                                    <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Size</p>
                                    <p class="text-sm font-bold text-white">{currentRace.size}</p>
                                </div>
                                <div class="bg-gray-700 bg-opacity-30 rounded-lg p-3">
                                    <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Speed</p>
                                    <p class="text-sm font-bold text-white">{currentRace.speed}m</p>
                                </div>
                            </div>

                            <!-- Languages Detail -->
                            <div class="z-10">
                                <p class="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Known Languages</p>
                                <div class="flex gap-2 flex-wrap">
                                    {#each currentRace.languages as lang}
                                        <span class="px-2 py-1 bg-gray-700 text-gray-200 rounded text-xs">
                                            {lang}
                                        </span>
                                    {/each}
                                    {#if currentRace.languageChoices > 0}
                                        <span class="px-2 py-1 bg-sky-500 bg-opacity-30 text-black rounded text-xs">
                                            +{currentRace.languageChoices} to choose
                                        </span>
                                    {/if}
                                </div>
                            </div>

                            <!-- Key Features -->
                            {#if currentRace.features && currentRace.features.length > 0}
                                <div class="z-10">
                                    <p class="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wide">Key Features</p>
                                    <div class="space-y-2">
                                        {#each currentRace.features as feature}
                                            <p class="text-sm text-gray-300 flex gap-2">
                                                <span class="text-sky-400">•</span>
                                                <span class="cursor-help hover:text-sky-500 transition-all">{feature}</span>
                                                <Popover class="max-w-md p-3">
                                                    <FeaturesCard feature={featuresMap[feature] || {name: feature, description: "missing description", icon: "NoIcon"}} />
                                                </Popover>
                                            </p>
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {:else}
                        <div class="flex justify-center items-center h-full">
                            <p class="text-2xl">Select a race to view additional information...</p>
                        </div>
                    {/if}
                {:else if step === "subrace" && tempRace}
                    {@const raceData = racesData[tempRace]}
                    {@const currentSubrace = raceData?.subraces?.find(s => s.name === tempSubrace)}
                    {#if currentSubrace}
                        <div class="space-y-6">
                            <!-- Subrace Name -->
                            <div>
                                <h3 class="text-2xl font-bold mb-2">{currentSubrace.name}</h3>
                                <p class="text-gray-300 text-sm">
                                    {currentSubrace.description || "A unique variant of the " + tempRace + " race."}
                                </p>
                            </div>

                            <!-- Additional Ability Modifiers + Choice Modifiers -->
                            {#if Object.values(currentSubrace.fixedModifiers).some(v => v !== 0) || (currentSubrace.choiceModifiers && currentSubrace.choiceModifiers.length > 0)}
                                <div>
                                    <p class="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wide">Additional Modifiers</p>
                                    <div class="flex gap-2 flex-wrap">
                                        {#each Object.entries(currentSubrace.fixedModifiers) as [ability, mod]}
                                            {#if mod !== 0}
                                                <span class="px-3 py-1 bg-sky-500 text-black bg-opacity-70 rounded-lg text-xs font-bold">
                                                    {ability.slice(0, 3).toUpperCase()} {mod > 0 ? "+" : ""}{mod}
                                                </span>
                                            {/if}
                                        {/each}
                                        {#each currentSubrace.choiceModifiers as choice}
                                            <span class="px-3 py-1 bg-sky-500 bg-opacity-50 text-black rounded-lg text-xs font-bold border border-sky-400 border-dashed">
                                                +{choice} <span class="text-black">(Choose)</span>
                                            </span>
                                        {/each}
                                    </div>
                                </div>
                            {/if}

                            <!-- Subrace Languages Detail -->
                            {#if currentSubrace.languages && currentSubrace.languages.length > 0 || (currentSubrace.languageChoices && currentSubrace.languageChoices > 0)}
                                <div>
                                    <p class="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Additional Languages</p>
                                    <div class="flex gap-2 flex-wrap">
                                        {#each currentSubrace.languages || [] as lang}
                                            <span class="px-2 py-1 bg-gray-700 text-gray-200 rounded text-xs">
                                                {lang}
                                            </span>
                                        {/each}
                                        {#if currentSubrace.languageChoices && currentSubrace.languageChoices > 0}
                                            <span class="px-2 py-1 bg-sky-500 bg-opacity-30 text-black rounded text-xs">
                                                +{currentSubrace.languageChoices} to choose
                                            </span>
                                        {/if}
                                    </div>
                                </div>
                            {/if}

                            <!-- Subrace Features -->
                            {#if currentSubrace.features && currentSubrace.features.length > 0}
                                <div>
                                    <p class="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wide">Special Features</p>
                                    <div class="space-y-2">
                                        {#each currentSubrace.features as feature}
                                            <p class="text-sm text-gray-300 flex gap-2">
                                                <span class="text-sky-400">•</span>
                                                <span class="cursor-help hover:text-sky-500 transition-all">{feature}</span>
                                                <Popover class="max-w-md p-3">
                                                    <FeaturesCard feature={featuresMap[feature] || {name: feature, description: "missing description", icon: "NoIcon"}} />
                                                </Popover>
                                            </p>
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {:else}
                        <div class="flex justify-center items-center h-full">
                            <p class="text-2xl">Select a sub-race to view additional information...</p>
                        </div>
                    {/if}
                {/if}
            </div>
        </div>

        <!-- Action buttons -->
        <div class="flex gap-3 justify-end pt-4 px-6 border-t border-gray-700">
            <Button onclick={() => (isOpen = false)} color="alternative">
                Cancel
            </Button>
            <GradientButton
                    onclick={() => {
                    if (step === "race") {
                        confirmRace();
                    } else {
                        confirmSubrace();
                    }
                }}
                    disabled={step === "race" ? !hoveredRace : !tempSubrace}
            >
                {step === "race" ? "Select Race" : "Select Subrace"}
            </GradientButton>
        </div>
    </div>
</Modal>

<style>
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(139, 92, 246, 0.5);
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: rgba(139, 92, 246, 0.7);
    }
</style>

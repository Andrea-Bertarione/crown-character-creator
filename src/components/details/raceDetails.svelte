<script lang="ts">
    import { Popover } from "flowbite-svelte";
    import FeaturesCard from "../featuresCard/featuresCard.svelte";
    import { featuresMap } from "../../data/features.data";
    import type {RaceData} from "../../data/races.data";
    import {languagesMap} from "../../data/languages.data";

    let { currentRace }: { currentRace: RaceData } = $props<{ currentRace: RaceData }>();
</script>

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
                    <span class="px-2 py-1 bg-gray-700 text-gray-200 rounded text-xs cursor-help hover:bg-sky-700 transition duration-200">
                        {lang}
                    </span>
                    <Popover class="max-w-md p-3">
                        {@const langData = languagesMap[lang]}
                        <div class="space-y-3">
                            <p class="text-gray-300">{langData.description}</p>
                            <div>
                                <h4 class="font-semibold text-sm mb-2">Speakers:</h4>
                                <div class="flex flex-wrap gap-2">
                                    {#each langData.speakers as speaker}
                                        <span class="px-3 py-1 bg-gray-700 rounded-full text-sm">
                                            {speaker}
                                        </span>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </Popover>
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

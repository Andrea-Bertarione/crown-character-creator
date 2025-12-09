<script lang="ts">
    import { Popover } from "flowbite-svelte";
    import RaceFeaturesCard from "../raceFeaturesCard/raceFeaturesCard.svelte";
    import { featuresMap } from "../../data/features.data";
    import type {SubraceData} from "../../data/races.data";
    import {languagesMap} from "../../data/languages.data";

    let { currentSubrace }: { currentSubrace?: SubraceData } = $props<{ currentSubrace?: SubraceData }>();
</script>

{#if currentSubrace}
    <div class="space-y-6">
        <!-- Subrace Name -->
        <div>
            <h3 class="text-2xl font-bold mb-2">{currentSubrace.name}</h3>
            <p class="text-gray-300 text-sm">
                {currentSubrace.description || "A unique variant of the previously selected race."}
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
                                <RaceFeaturesCard feature={featuresMap[feature] || {name: feature, description: "missing description", icon: "NoIcon"}} />
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
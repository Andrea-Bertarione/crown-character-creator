<script lang="ts">
    import { Accordion, AccordionItem, Select } from "flowbite-svelte";
    import { characterCreationState, type CharacterLanguage } from "$lib/characterCreation.svelte";
    import { languagesMap } from "../../data/languages.data";
    import racesData from "../../data/races.data";

    let languageChoicesCount = $derived(racesData[characterCreationState.race]?.languageChoices ?? 0);

    let availableLanguages = $derived(
        Object.keys(languagesMap).map(key => ({
            name: key,
            value: key as CharacterLanguage,
            disabled: characterCreationState.languages.includes(key as CharacterLanguage),
        }))
    );

    const selectLanguage = (index: number, language: string) => {
        characterCreationState.languagesChoices[index] = language as CharacterLanguage;
    };
</script>

<!-- Known Languages -->
<div class="space-y-4">
    <h3 class="text-lg font-bold">Known Languages</h3>
    <Accordion multiple>
        {#each characterCreationState.languages as language}
            {@const languageData = languagesMap[language]}
            <AccordionItem>
                {#snippet header()}
                    <span class="flex items-center gap-2">
                        <span class="text-xl">{languageData.icon}</span>
                        <span class="font-semibold">{languageData.name}</span>
                        <span class="text-sm text-gray-400">({languageData.script})</span>
                    </span>
                {/snippet}

                <div class="space-y-3">
                    <p class="text-gray-300">{languageData.description}</p>
                    <div>
                        <h4 class="font-semibold text-sm mb-2">Speakers:</h4>
                        <div class="flex flex-wrap gap-2">
                            {#each languageData.speakers as speaker}
                                <span class="px-3 py-1 bg-gray-700 rounded-full text-sm">
                                    {speaker}
                                </span>
                            {/each}
                        </div>
                    </div>
                </div>
            </AccordionItem>
        {/each}
    </Accordion>
</div>

<!-- Choose Additional Languages -->
{#if languageChoicesCount > 0}
    <div class="space-y-4 mt-6">
        <h3 class="text-lg font-bold">Choose {languageChoicesCount} Additional Language{languageChoicesCount > 1 ? 's' : ''}</h3>
        <Accordion multiple>
            {#each Array(languageChoicesCount) as _, i}
                <AccordionItem>
                    {#snippet header()}
                        <span class="flex items-center gap-2 w-full">
                            <span class="text-xl">
                                {characterCreationState.languagesChoices[i]
                                    ? languagesMap[characterCreationState.languagesChoices[i]]?.icon
                                    : "❓"}
                            </span>
                            <Select
                                    class="flex-1 max-w-1/3"
                                    items={availableLanguages}
                                    placeholder={characterCreationState.languagesChoices[i] === undefined ? "Choose a language..." : languagesMap[characterCreationState.languagesChoices[i]].name}
                                    onchange={(e) => selectLanguage(i, e.currentTarget.value)}
                            />
                            {#if characterCreationState.languagesChoices[i]}
                                <span class="text-sm text-gray-400">
                                    ({languagesMap[characterCreationState.languagesChoices[i]].script})
                                </span>
                            {/if}
                        </span>
                    {/snippet}

                    {#if characterCreationState.languagesChoices[i]}
                        {@const langData = languagesMap[characterCreationState.languagesChoices[i]]}
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
                    {/if}
                </AccordionItem>
            {/each}
        </Accordion>
    </div>
{/if}

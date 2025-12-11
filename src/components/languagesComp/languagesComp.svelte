<script lang="ts">
    import { Accordion, AccordionItem, Select } from "flowbite-svelte";
    import { languagesMap } from "../../data/languages.data";
    import type { CharacterLanguage } from "$lib/characterCreation.svelte";

    let {
        knownLanguages = $bindable<CharacterLanguage[]>([]),
        languageChoices = $bindable<CharacterLanguage[]>([]),
        languageChoicesCount = 0
    }: {
        knownLanguages: CharacterLanguage[];
        languageChoices: CharacterLanguage[] | undefined;
        languageChoicesCount: number;
    } = $props();

    const availableLanguages = $derived(
        Object.keys(languagesMap).map(key => ({
            name: languagesMap[key].name,
            value: key as CharacterLanguage,
            disabled: knownLanguages.includes(key as CharacterLanguage) ||
                languageChoices?.includes(key as CharacterLanguage)
        }))
    );

    const selectLanguage = (index: number, language: string) => {
        languageChoices[index] = language as CharacterLanguage;
    };
</script>

<!-- Known Languages -->
<div class="space-y-4">
    <h3 class="text-lg font-bold">Known Languages</h3>
    {#if knownLanguages.length > 0}
        <Accordion multiple>
            {#each knownLanguages as language}
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
    {:else}
        <p class="text-gray-400 text-sm">No known languages yet.</p>
    {/if}
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
                                {languageChoices[i]
                                    ? languagesMap[languageChoices[i]]?.icon
                                    : "❓"}
                            </span>
                            <Select
                                    class="flex-1 max-w-1/3"
                                    items={availableLanguages}
                                    placeholder={languageChoices[i] === undefined ? "Choose a language..." : languagesMap[languageChoices[i]].name}
                                    value={languageChoices[i] ?? ""}
                                    onchange={(e) => selectLanguage(i, e.currentTarget.value)}
                            />
                            {#if languageChoices[i]}
                                <span class="text-sm text-gray-400">
                                    (Alphabet: {languagesMap[languageChoices[i]].script})
                                </span>
                            {/if}
                        </span>
                    {/snippet}

                    {#if languageChoices[i]}
                        {@const langData = languagesMap[languageChoices[i]]}
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
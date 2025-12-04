<script lang="ts">
    import { Card, Select, Label, Accordion, AccordionItem, Indicator } from "flowbite-svelte";
    import {
        type CharacterLanguage,
        charactersState,
        type FeatureChoiceType,
        Race,
        skillList
    } from "../../State/characters.state.ts";
    import { Character, type AbilityScore, languageList, abilityScores } from "../../State/characters.state.ts";
    import featureList from "../../data/features.data";
    import {getAvailableItems} from "$lib/utils/featureFilters";
    import {syncToCharacter as syncGeneral} from "$lib/utils/characterSync";
    import ChoiceSelector from "../choiceSelector/choiceSelector.svelte";

    import { onMount } from 'svelte';

    let cardEl: any = null;
    let cardHeight = $state(0);

    onMount(() => {
        const observer = new ResizeObserver(() => {
            cardHeight = cardEl?.clientHeight || 0;
        });
        observer.observe(cardEl);
        return () => observer.disconnect();
    });

    let { race, characterInstance = $bindable(), chosenLanguagesState = $bindable(), chosenAbilityModifiersState = $bindable(), traitsOpen = $bindable() }: {
        race: Race,
        characterInstance: Character,
        chosenLanguagesState: string[],
        chosenAbilityModifiersState: string[],
        traitsOpen: { open: boolean; type?: string; choices: string[] }[]
    } = $props();

    // 1) Reactive form state
    let showTraits = $state(false);

    // Track selection completion
    let abilitiesSelected = $state(true);
    let languagesSelected = $state(true);

    $effect(() => {
        chosenLanguagesState = Array(race.languageChoices).fill("");
    });

    $effect(() => {
        chosenAbilityModifiersState = Array(race.choiceModifiers.length).fill("");
    });

    $effect(() => {
        traitsOpen = race.features
            .filter(featureName => {
                const feature = featureList[featureName];
                return feature?.choice;
            })
            .map((featureName) => ({
                open: false,
                type: featureList[featureName].choice!.type,
                choices: Array<string>(featureList[featureName].choice!.amount).fill("")
            }));
    })

    // 2) Type definitions
    type SelectItem = { value: string; name: string; disabled?: boolean };

    // 3) Derived state for languages
    let availableLanguages = $derived.by((): SelectItem[] => {
        const allChosen = [
            ...race.languages,
            ...chosenLanguagesState.filter(l => l)
        ];
        return languageList.map((language): SelectItem => ({
            value: language,
            name: language,
            disabled: allChosen.includes(language)
        }));
    });

    let raceLanguages = $derived(race.languages);
    let chosenLanguages = $derived(chosenLanguagesState.filter(l => l));

    // 4) Derived state for abilities
    let availableAbilityScores = $derived.by((): SelectItem[] => {
        const chosen = chosenAbilityModifiersState.filter(a => a);
        return abilityScores.map((ability): SelectItem => ({
            value: ability,
            name: ability.toUpperCase(),
            disabled: chosen.includes(ability) || race.fixedModifiers[ability] !== 0
        }));
    });

    let abilityModifiers = $derived(
        Object.entries(race.fixedModifiers).filter(([_, mod]) => mod !== 0) as Array<[string, number]>
    );

    let chosenAbilityModifiers = $derived(
        chosenAbilityModifiersState
            .map((ability, index) => [ability, race.choiceModifiers[index]] as const)
            .filter(([ability]) => ability && ability.length > 0) as Array<[string, number]>
    );

    // 5) Indicator derivations
    let anyTraitIncomplete = $derived.by(() => {
        return traitsOpen.some(trait =>
            trait.choices.length === 0 || trait.choices.some(c => !c)
        );
    });

    let anyIndicatorsMain = $derived(
        abilitiesSelected || languagesSelected
    );

    let traitSkillsAvailableItems = $derived(
        getAvailableItems("skill", skillList.map(v => v), characterInstance)
    );

    let traitExpertiseAvailableItems = $derived(
        getAvailableItems("expertise", skillList.map(v => v), characterInstance)
    );

    let itemsMap: {[key: string]: SelectItem[]} = $derived.by(() => ({
        skill: traitSkillsAvailableItems,
        expertise: traitExpertiseAvailableItems,
    }));


    // 6) Sync handler
    function syncToCharacter() {
        characterInstance.chosenLanguages = [
            ...chosenLanguagesState.filter(l => l)
        ];

        characterInstance.chosenAbilityModifiers = [
            ...chosenAbilityModifiersState.filter(a => a)
        ];

        const featureChoices: Record<string, { type: FeatureChoiceType; value: string[] }> = {};
        race.features.forEach((feature, i) => {
            if (featureList[feature]?.choice && traitsOpen[i] && traitsOpen[i].choices.length > 0) {
                const chosenItems = traitsOpen[i].choices.filter(c => c);

                featureChoices[feature] = {
                    type: featureList[feature].choice.type as FeatureChoiceType,
                    value: chosenItems
                };
            }
        });
        characterInstance.featureChoices = featureChoices;

        for (const attribute in characterInstance.stats) {
            const choiceIndex = chosenAbilityModifiersState?.indexOf(attribute);

            // Add fixed modifiers from race
            characterInstance.stats[attribute as AbilityScore] += race.fixedModifiers[attribute as AbilityScore];

            // Add choice modifiers if this ability was chosen
            if (choiceIndex !== -1) {
                characterInstance.stats[attribute as AbilityScore] += race.choiceModifiers[choiceIndex];
            }
        }

        race.features.forEach((feature) => {
            featureList[feature].action(characterInstance);
        });

        console.log(characterInstance)
    }

    $effect(() => {
        if (race) {
            syncToCharacter();
        }
    })
</script>

<div bind:this={cardEl} style="top: calc(50% - {cardHeight / 2}px)" class="absolute -left-8/12">
    <Card class="p-6">
        {#if race.image}
            <img src={race.image} alt={race.name} class="w-2/3 rounded-lg mb-4 ml-auto mr-auto" />
        {/if}

        <h1 class="text-2xl dark:text-white font-bold">{race.name}</h1>

        {#if !showTraits}
            <!-- Race Info -->
            <div class="flex flex-row justify-between mt-4 gap-4">
                <div>
                    <Label for="speed" class="text-sm">Speed</Label>
                    <p id="speed" class="text-lg font-semibold dark:text-gray-300">{race.speed}m</p>
                </div>
                <div>
                    <Label for="size" class="text-sm">Size</Label>
                    <p id="size" class="text-lg font-semibold dark:text-gray-300">{race.size}</p>
                </div>
            </div>

            <!-- Fixed Ability Modifiers -->
            {#if abilityModifiers.length > 0}
                <div class="mt-4">
                    <Label class="text-sm">Ability Modifiers</Label>
                    <div class="flex flex-wrap justify-center gap-x-6 mt-2">
                        {#each abilityModifiers as [ability, modifier]}
                            <span class="px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded text-sm font-semibold">
                                {ability.toUpperCase()} {modifier > 0 ? '+' : ''}{modifier}
                            </span>
                        {/each}
                        {#each chosenAbilityModifiers as [ability, modifier]}
                            <span class="px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded text-sm text-green-400 font-semibold">
                                {ability.toUpperCase()} {modifier > 0 ? '+' : ''}{modifier}
                            </span>
                        {/each}
                    </div>
                </div>
            {/if}

            <!-- Choices Accordion -->
            {#if race.choiceModifiers.length > 0 || chosenLanguages.length > 0 || race.languageChoices > 0}
                <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Accordion>
                        {#if race.choiceModifiers.length > 0}
                            <AccordionItem>
                                {#snippet header()}
                                    <div class="flex items-center justify-between w-full gap-2">
                                        <p class="text-sm font-semibold">
                                            Choose {race.choiceModifiers.length} ability score{race.choiceModifiers.length > 1 ? 's' : ''} to increase
                                        </p>
                                        {#if abilitiesSelected}
                                            <Indicator color="red" border size="md">
                                                <span class="text-xs font-bold text-white"></span>
                                            </Indicator>
                                        {/if}
                                    </div>
                                {/snippet}
                                <div class="mt-4">
                                    <ChoiceSelector
                                            title="Select Abilities"
                                            bind:values={chosenAbilityModifiersState}
                                            bind:availableItems={availableAbilityScores}
                                            bind:showIndicator={abilitiesSelected}
                                            changeValues={() => syncToCharacter()}
                                    />
                                </div>
                            </AccordionItem>
                        {/if}

                        {#if race.languageChoices > 0}
                            <AccordionItem>
                                {#snippet header()}
                                    <div class="flex items-center justify-between w-full gap-2">
                                        <p class="text-sm font-semibold">
                                            Choose {race.languageChoices} additional language{race.languageChoices > 1 ? 's' : ''}
                                        </p>
                                        {#if languagesSelected}
                                            <Indicator color="red" border size="md">
                                                <span class="text-xs font-bold text-white"></span>
                                            </Indicator>
                                        {/if}
                                    </div>
                                {/snippet}
                                <div class="mt-4">
                                    <ChoiceSelector
                                            title="Select Languages"
                                            bind:values={chosenLanguagesState}
                                            bind:availableItems={availableLanguages}
                                            bind:showIndicator={languagesSelected}
                                            changeValues={() => syncToCharacter()}
                                    />
                                </div>
                            </AccordionItem>
                        {/if}
                    </Accordion>
                </div>
            {/if}

            <!-- Languages Display -->
            {#if raceLanguages.length > 0 || chosenLanguages.length > 0}
                <div class="mt-4">
                    <Label for="languages" class="text-sm">Languages</Label>
                    <div class="flex flex-row flex-wrap gap-2 mt-2" id="languages">
                        {#each raceLanguages as lang}
                            <span class="text-sm dark:text-gray-300">{lang}</span>
                        {/each}
                        {#each chosenLanguages as lang}
                            <span class="text-sm text-green-400 font-semibold">{lang}</span>
                        {/each}
                    </div>
                </div>
            {/if}
        {/if}

        <!-- Traits Section -->
        {#if race.features.length > 0}
            <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                        onclick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        showTraits = !showTraits;
                    }}
                        class="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                    <span class="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {showTraits ? "Hide" : "Show"} Traits ({race.features.length})
                    </span>
                    <div class="relative">
                        <svg class="w-5 h-5 transition-transform {showTraits ? 'rotate-180' : ''}"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        {#if (anyIndicatorsMain && showTraits) || (anyTraitIncomplete && !showTraits)}
                            <Indicator color="red" border size="sm" placement="top-right">
                                <span class="text-xs font-bold text-white"></span>
                            </Indicator>
                        {/if}
                    </div>
                </button>

                {#if showTraits}
                    <div class="mt-4 space-y-4 animate-in fade-in duration-200">
                        {#each race.features as feature, featureIndex}
                            <div class="relative p-3 pr-8 pb-8 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/20">
                                <h3 class="text-sm font-semibold text-primary mb-1">{feature}</h3>
                                <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {featureList[feature]?.description}
                                </p>

                                {#if featureList[feature].choice}
                                    <button
                                            aria-label="open-feature"
                                            class="absolute right-2 bottom-2"
                                            onclick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            traitsOpen[featureIndex].open = !traitsOpen[featureIndex].open;
                                        }}
                                    >
                                        <svg class="w-5 h-5 transition-transform {traitsOpen[featureIndex] && traitsOpen[featureIndex].open ? 'rotate-90' : '-rotate-90'}"
                                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </button>

                                    {#if traitsOpen[featureIndex] &&  traitsOpen[featureIndex].open}
                                        <Card class="absolute -top-1/2 -right-full translate-x-12 w-80 z-50 transition-all p-4 space-y-4">
                                            <div>
                                                <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                                    {featureList[feature]?.description}
                                                </p>
                                            </div>

                                            <ChoiceSelector
                                                    title={featureList[feature].choice.type}
                                                    bind:values={traitsOpen[featureIndex].choices}
                                                    availableItems={itemsMap[featureList[feature].choice.type]}
                                                    changeValues={(i, value) => {
                                                                    syncToCharacter();
                                                                    characterInstance.syncFeatureChoices(feature, i, value);

                                                                }}
                                            />
                                        </Card>
                                    {/if}
                                {/if}
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}
    </Card>
</div>
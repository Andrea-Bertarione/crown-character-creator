<script lang="ts">
    import { Card, Select, Label, Accordion, AccordionItem, Indicator, GradientButton, P } from "flowbite-svelte";
    import {type CharacterLanguage, Race} from "../../State/characters.state.ts";
    import { Character, type AbilityScore, languageList, abilityScores } from "../../State/characters.state.ts";
    import featureList from "../../data/features.data";
    import {getAvailableItems} from "$lib/utils/featureFilters";
    import {syncToCharacter as syncGeneral} from "$lib/utils/characterSync";

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

    const { race, characterInstance }: { race: Race, characterInstance: Character } = $props();

    // 1) Reactive form state for chosen languages
    let chosenLanguagesState = $state<string[]>([]);

    // 2) Reactive form state for chosen ability modifiers
    let chosenAbilityModifiersState = $state<string[]>([]);

    $effect(() => {
        chosenLanguagesState = Array(race.languageChoices).fill("");
    });

    $effect(() => {
        chosenAbilityModifiersState = Array(race.choiceModifiers.length).fill("");
    });

    let chosenLanguagesNumber = $derived(
        chosenLanguagesState.filter(lang => lang && languageList.includes(lang as CharacterLanguage)).length
    );

    let chosenAbilityChoicesNumber = $derived(
        chosenAbilityModifiersState.filter(ability => ability && abilityScores.includes(ability as AbilityScore)).length
    )

    // 3) Type-safe items array
    type SelectItem = { value: string; name: string; disabled?: boolean };

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

    // 4) Available ability scores (exclude already chosen ones)
    let availableAbilityScores = $derived.by((): SelectItem[] => {
        const chosen = chosenAbilityModifiersState.filter(a => a);

        return abilityScores.map((ability): SelectItem => ({
            value: ability,
            name: ability.toUpperCase(),
            disabled: chosen.includes(ability) || race.fixedModifiers[ability] !== 0
        }));
    });

    // 5) Computed: separate race languages and chosen languages
    let raceLanguages = $derived(race.languages);
    let chosenLanguages = $derived(chosenLanguagesState.filter(l => l));

    // 6) Computed: ability score modifiers display
    let abilityModifiers = $derived(
        Object.entries(race.fixedModifiers).filter(([_, mod]) => mod !== 0) as Array<[string, number]>
    );

    let chosenAbilityModifiers = $derived(
        chosenAbilityModifiersState
            .map((ability, index) => [ability, race.choiceModifiers[index]] as const)
            .filter(([ability]) => ability && ability.length > 0) as Array<[string, number]>
    );

    let anyIndicatorsMain = $derived(
        chosenAbilityChoicesNumber < race.choiceModifiers.length || chosenLanguagesNumber < race.languageChoices
    );

    let showTraits = $state(false);
    let traitsOpen = $state<{ open: boolean; type?: string; choices: string[] }[]>([]);

    $effect(() => {
        traitsOpen = race.features.map((feature) => ({
            open: false,
            type: featureList[feature]?.choice?.type,
            choices: []
        }));
    });

    function syncToCharacter() {
        syncGeneral(
            characterInstance,
            race,
            chosenLanguagesState,
            chosenAbilityModifiersState,
            traitsOpen
        );
    }


</script>

<div bind:this={cardEl} style="top: calc(50% - {cardHeight / 2}px)" class="absolute -left-8/12">
<Card class="p-6">
    {#if race.image}
        <img src={race.image} alt={race.name} class="w-2/3 rounded-lg mb-4 ml-auto mr-auto" />
    {/if}

    <h1 class="text-2xl dark:text-white font-bold">{race.name}</h1>

    {#if !showTraits}

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

    {#if race.choiceModifiers.length > 0 || chosenLanguages.length > 0 || race.languageChoices > 0}
        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Accordion>
                {#if race.choiceModifiers.length > 0}
                    <AccordionItem class="relative">
                        {#snippet header()}
                            <p class="text-sm font-semibold">
                                Choose {race.choiceModifiers.length} ability score{race.choiceModifiers.length > 1 ? 's' : ''} to increase
                            </p>
                            {#if chosenAbilityChoicesNumber < race.choiceModifiers.length}
                                <Indicator color="red" border size="md" placement="center-right">
                                    <span class="text-xs font-bold text-white"></span>
                                </Indicator>
                            {/if}
                        {/snippet}
                        <div class="space-y-4">
                            {#each Array.from({ length: race.choiceModifiers.length }, (_, i) => i) as i (i)}
                                <div>
                                    <Label for={`ability${i}`} class="text-sm">
                                        Ability {i + 1}
                                        {#if race.choiceModifiers[i] > 0}
                                            <span class="text-green-400">+{race.choiceModifiers[i]}</span>
                                        {/if}
                                    </Label>
                                    <Select
                                            class="mt-2"
                                            name={`ability${i}`}
                                            id={`ability${i}`}
                                            bind:value={chosenAbilityModifiersState[i]}
                                            items={availableAbilityScores}
                                            onchange={() => syncToCharacter()}
                                    />
                                </div>
                            {/each}
                        </div>
                    </AccordionItem>
                {/if}

                {#if race.languageChoices > 0}
                    <AccordionItem class="relative">
                        {#snippet header()}
                            <p class="text-sm font-semibold">
                                Choose {race.languageChoices} additional language{race.languageChoices > 1 ? 's' : ''}
                            </p>
                            {#if chosenLanguagesNumber < race.languageChoices}
                                <Indicator color="red" border size="md" placement="center-right">
                                    <span class="text-xs font-bold text-white"></span>
                                </Indicator>
                            {/if}
                        {/snippet}
                        <div class="space-y-4">
                            {#each Array.from({ length: race.languageChoices }, (_, i) => i) as i (i)}
                                <div>
                                    <Label for={`language${i}`} class="text-sm">
                                        Language {i + 1}
                                    </Label>
                                    <Select
                                            class="mt-2"
                                            name={`language${i}`}
                                            id={`language${i}`}
                                            bind:value={chosenLanguagesState[i]}
                                            items={availableLanguages}
                                            onchange={() => syncToCharacter()}
                                    />
                                </div>
                            {/each}
                        </div>
                    </AccordionItem>
                {/if}
            </Accordion>
        </div>
    {/if}

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
                    {#if anyIndicatorsMain && showTraits}
                        <Indicator color="red" border size="sm" placement="top-right">
                            <span class="text-xs font-bold text-white"></span>
                        </Indicator>
                    {/if}
                </div>
            </button>

            {#if showTraits}
                <div class="mt-4 space-y-4 animate-in fade-in duration-200">
                    {#each race.features as feature, i}
                        <div class=" relative p-3 pr-8 pb-8 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/20">
                            <h3 class="text-sm font-semibold text-primary mb-1">{feature}</h3>
                            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                {featureList[feature]?.description}
                            </p>
                            {#if featureList[feature].choice}
                                <button aria-label="open-feature" class="absolute right-2 bottom-2" onclick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    traitsOpen[i].open = !traitsOpen[i].open;
                                }}>
                                    <span>
                                        <svg class="w-5 h-5 transition-transform {traitsOpen[i].open ? 'rotate-90' : '-rotate-90'}"
                                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </span>
                                </button>
                            {/if}
                            {#if showTraits && traitsOpen[i].open}
                                <Card class="absolute -top-1/2 -right-full translate-x-12 w-80 z-50 transition-all p-3">
                                    <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                        {featureList[feature]?.description}
                                    </p>

                                    {#if featureList[feature]?.choice}
                                        <div class="space-y-3">
                                            <Label class="text-sm font-semibold">
                                                Choose {featureList[feature].choice.amount} {featureList[feature].choice.type}
                                            </Label>
                                            {#each Array.from({ length: featureList[feature].choice.amount }, (_, choiceIndex) => choiceIndex) as choiceIndex}
                                                <Select
                                                        items={getAvailableItems(
                                                            featureList[feature].choice.type,
                                                            featureList[feature].choice.availableList,
                                                            characterInstance,
                                                            traitsOpen[i].choices,
                                                            choiceIndex
                                                        )}
                                                        bind:value={traitsOpen[i].choices[choiceIndex]}
                                                        onchange={() => syncToCharacter()}
                                                        placeholder={`${featureList[feature].choice.type} ${choiceIndex + 1}`}
                                                />
                                            {/each}

                                        </div>
                                    {/if}
                                </Card>
                            {/if}
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}

</Card>
</div>
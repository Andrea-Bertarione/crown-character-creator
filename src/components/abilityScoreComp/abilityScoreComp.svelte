<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Select, Card, Input, Dropdown, DropdownItem, GradientButton} from "flowbite-svelte";
    import { ChevronDownOutline } from "flowbite-svelte-icons";
    import type {AbilityScore, Character} from "$lib/characterCreation.svelte";
    import AbilityScoreCard from "../abilityScoreCard/abilityScoreCard.svelte";

    import racesData, {type CharacterRace} from "../../data/races.data";
    import {rollDice} from "$lib/diceRoller";
    import {v4 as uuidv4} from "uuid";

    type ChoiceScoreSelection = "Manual" | "Point Buy" | "3D6" | "4D6 discard lowest";

    let limitPointOnSelection: Record< ChoiceScoreSelection, { min: number, max: number }> = {
        ["Manual"]: { min: 1, max: 20 },
        ["Point Buy"]: { min: 8, max: 15 },
        ["3D6"]: { min: 3, max: 18 },
        ["4D6 discard lowest"]: { min: 3, max: 18 },
    }

    let startingPointsOnSelection: Record< ChoiceScoreSelection, Record<AbilityScore, number>> = {
        ["Manual"]: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            wisdom: 10,
            intelligence: 10,
            charisma: 10,
        },
        ["Point Buy"]: {
            strength: 8,
            dexterity: 8,
            constitution: 8,
            wisdom: 8,
            intelligence: 8,
            charisma: 8,
        },
        ["3D6"]: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            wisdom: 10,
            intelligence: 10,
            charisma: 10,
        },
        ["4D6 discard lowest"]: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            wisdom: 10,
            intelligence: 10,
            charisma: 10,
        },
    }

    let scoreSelectionItems: { name: ChoiceScoreSelection, value: ChoiceScoreSelection }[] = [
        {
            name: "Manual",
            value: "Manual",
        },
        {
            name: "Point Buy",
            value: "Point Buy",
        },
        {
            name: "3D6",
            value: "3D6",
        },
        {
            name: "4D6 discard lowest",
            value: "4D6 discard lowest",
        }
    ]

    let abilityToRolledScoreId: Record<AbilityScore, string | null> = $state({
        strength: null,
        dexterity: null,
        constitution: null,
        wisdom: null,
        intelligence: null,
        charisma: null,
    });

    let { characterState = $bindable(),  isInCharacterCreation = true }: { characterState: Character,  isInCharacterCreation: boolean } = $props<{ characterState: Character, isInCharacterCreation: boolean    }>();
    let computedAbilities = $derived(
        Object.entries(characterState.abilityScoreComputed).map(([ability, score]) => ({
            ability: ability as AbilityScore,
            scoreComputed: (characterState.abilityScoreComputed[ability as AbilityScore]),
            score: score,
            raceModifier: racesData[characterState.race as CharacterRace] && racesData[characterState.race as CharacterRace].fixedModifiers[ability as AbilityScore],
        }))
    );

    let hasRaceModifiers = $derived(
        characterState.race !== "Default" &&
        Object.entries(racesData[characterState.race as CharacterRace].fixedModifiers).
            filter(([key, value]) => value !== 0).length > 0
    );

    let hasAdditionalModifiers = $derived(
        Object.entries(characterState.additionalAbilityScores).length > 0
    )

    let pointsScoreValue = $state(27);

    let increasePoint = (ability: AbilityScore) => {
        if (scoreSelectionValue === "Point Buy") {
            if (pointsScoreValue - (characterState.abilityScores[ability as AbilityScore] + 1 > 13 ? 2 : 1) < 0 ||
                characterState.abilityScores[ability as AbilityScore] + 1 > limitPointOnSelection[scoreSelectionValue].max) {
                return;
            }

            pointsScoreValue -= (characterState.abilityScores[ability as AbilityScore] + 1 > 13 ? 2 : 1)
        }

        characterState.abilityScores[ability as AbilityScore]++;
    }

    let decreasePoint = (ability: AbilityScore) => {
        if (scoreSelectionValue === "Point Buy") {
            if (characterState.abilityScores[ability as AbilityScore] - 1 < limitPointOnSelection[scoreSelectionValue].min) {
                return;
            }

            pointsScoreValue += (characterState.abilityScores[ability as AbilityScore] - 1 >= 13 ? 2 : 1)
        }

        characterState.abilityScores[ability as AbilityScore]--;
    }

    $effect(() => {
        Object.entries(characterState.abilityScores).forEach(([key, abilityScore]) => {
            const clamped = Math.min(Math.max(limitPointOnSelection[scoreSelectionValue].min, abilityScore as number), limitPointOnSelection[scoreSelectionValue].max);
            if (clamped !== abilityScore) {
                characterState.abilityScores[key as AbilityScore] = clamped;
            }
        });

        Object.entries(characterState.abilityScores).forEach(([ability, baseScore]) => {
            const raceMod = racesData[characterState.race as CharacterRace]?.fixedModifiers[ability as AbilityScore] ?? 0;
            characterState.abilityScoreComputed[ability as AbilityScore] = baseScore as number + raceMod;
        });
    });

    let scoreSelectionValue: ChoiceScoreSelection = $state("Manual");
    let availableScoreD6s: { name: string, value: string, disabled: boolean }[] = $state(Array(6).fill({
        name: uuidv4(),
        value: JSON.stringify({id: uuidv4(), value: 10}),
        disabled: true,
    }).map(v => ({
        name: uuidv4(),
        value: JSON.stringify({id: uuidv4(), value: 10}),
        disabled: true,
    })));
    const setStartingScoreValues = () => {
        Object.entries(characterState.abilityScores).forEach(([key, value]) => {
            characterState.abilityScores[key as AbilityScore] = startingPointsOnSelection[scoreSelectionValue][key as AbilityScore];
        })

        if (scoreSelectionValue === "Point Buy") {
            pointsScoreValue = 27;
        }

        if (scoreSelectionValue === "3D6" || scoreSelectionValue === "4D6 discard lowest") {
            availableScoreD6s = availableScoreD6s.map((_, index) => {  // Use index for uniqueness
                const roll = scoreSelectionValue === "3D6"
                    ? rollDice("3d6")
                    : rollDice("4d6");

                let result = roll.result;
                if (scoreSelectionValue === "4D6 discard lowest") {
                    const results = roll.diceRolls.map(d => d.result);
                    result = results.reduce((sum, r) => sum + r, 0) - Math.min(...results);
                }

                return {
                    name: `${result}`,
                    value: JSON.stringify({id: uuidv4(), value: result}),
                    disabled: false
                };
            });
        }
    }

    const setRolledScore = (e: Event & {
        currentTarget: (EventTarget & HTMLSelectElement)
    }, abilityScore: AbilityScore) => {
        const selectedValueScore: {id: string, value: number} = JSON.parse(e.currentTarget.value) as {id: string, value: number};

        // Re-enable the PREVIOUS score if one existed
        const previousScoreId = abilityToRolledScoreId[abilityScore];
        if (previousScoreId) {
            const prevScore = availableScoreD6s.find(v => {
                const parsed: {id: string, value: number} = JSON.parse(v.value);
                return parsed.id === previousScoreId;
            });
            if (prevScore) prevScore.disabled = false;
        }

        // Disable the NEW score
        availableScoreD6s.forEach((v) => {
            const actualValueScore: {id: string, value: number} = JSON.parse(v.value) as {id: string, value: number};
            if (actualValueScore.id === selectedValueScore.id) {
                v.disabled = true;
            }
        });

        // Update tracking
        abilityToRolledScoreId[abilityScore] = selectedValueScore.id;
        characterState.abilityScores[abilityScore] = selectedValueScore.value;
    };
</script>

<Table>
    <TableHead>
        <TableHeadCell class="max-w-60">
            <div class="flex items-center gap-x-4">
                Ability Scores
                    {#if scoreSelectionValue === "Point Buy"}
                        <div class="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
                            Points Remaining: <span class="text-xl">{pointsScoreValue} / 27 </span>
                        </div>
                    {/if}
            </div>
        </TableHeadCell>
        <TableHeadCell>
            Computed scores
        </TableHeadCell>
        <TableHeadCell class="">
            <div class="flex flex-row gap-x-4 items-center">
                Basic scores
                {#if isInCharacterCreation}
                    <Select class="max-w-40" bind:value={scoreSelectionValue} items={scoreSelectionItems} onchange={setStartingScoreValues}/>
                {/if}
            </div>
        </TableHeadCell>
        {#if hasRaceModifiers}
            <TableHeadCell>Race Modifiers</TableHeadCell>
        {/if}
        {#if hasAdditionalModifiers}
            <TableHeadCell>
                <div class="flex flex-col justify-center items-center gap-4">
                    Additional Modifiers
                    {#if isInCharacterCreation && Object.values(characterState.additionalAbilityScores).some(m => !m.chosenScore)}
                        <GradientButton class="text-white dark:text-white">Assign <ChevronDownOutline class="ms-2 h-6 w-6 text-white dark:text-white" /></GradientButton>
                        <Dropdown simple>
                            {#each Object.entries(characterState.additionalAbilityScores) as [key, val]}
                                <DropdownItem>
                                    <Select placeholder={val.source} items={Object.entries(characterState.abilityScores).
                                    map(([name,  value]) => {
                                        return {
                                            name: name,
                                            value: name,
                                            disabled: racesData[characterState.race].fixedModifiers[name] !== 0,
                                        }
                                    })} />
                                </DropdownItem>
                            {/each}
                        </Dropdown>
                    {/if}
                </div>
            </TableHeadCell>
        {/if}
    </TableHead>
    <TableBody>
        {#each computedAbilities as abilities}
            <TableBodyRow>
                <TableBodyCell>
                    <span class="dark:text-white text-2xl">{abilities.ability.charAt(0).toUpperCase() + abilities.ability.slice(1)}</span>
                </TableBodyCell>
                <TableBodyCell>
                    <AbilityScoreCard score={abilities.scoreComputed} />
                </TableBodyCell>
                <TableBodyCell class="flex justify-start items-center">
                    {#if isInCharacterCreation && (scoreSelectionValue === "Point Buy" || scoreSelectionValue === "Manual") }
                        <button onclick={() => {decreasePoint(abilities.ability)}} title="decrement" type="button" id="decrement-button" class="rounded-tl-2xl rounded-bl-2xl text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:bg-gray-700 hover:text-white cursor-pointer font-medium leading-5 rounded-s-base text-sm px-3 focus:outline-none h-16">
                            <svg class="w-4 h-4 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>
                        </button>
                    {/if}
                    <Input readonly={!isInCharacterCreation || scoreSelectionValue !== "Manual" } class="text-2xl text-center h-16 max-w-20 {(scoreSelectionValue === 'Point Buy' || scoreSelectionValue === 'Manual') && isInCharacterCreation ? 'rounded-none' : ''}" type="number" bind:value={characterState.abilityScores[abilities.ability]} min={7} max={16}/>
                    {#if isInCharacterCreation}
                        {#if (scoreSelectionValue === "Point Buy" || scoreSelectionValue === "Manual") }
                            <button onclick={() => {increasePoint((abilities.ability))}} title="increment" type="button" id="increment-button" class="rounded-tr-2xl rounded-br-2xl text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:bg-gray-700 hover:text-white cursor-pointer font-medium leading-5 rounded-e-base text-sm px-3 focus:outline-none h-16">
                                <svg class="w-4 h-4 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/></svg>
                            </button>
                        {:else}
                            <Select class="ml-6 max-w-40" placeholder="Choose one score" items={availableScoreD6s} onchange={(e) => setRolledScore(e, abilities.ability)} />
                        {/if}
                    {/if}
                </TableBodyCell>
                {#if hasRaceModifiers}
                    <TableBodyCell>
                        <Card class="text-xl justify-center items-center h-16">{abilities.raceModifier > 0 ? '+' : ''}{abilities.raceModifier}</Card>
                    </TableBodyCell>
                {/if}
                {#if hasAdditionalModifiers}
                    <TableBodyCell>

                    </TableBodyCell>
                {/if}
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>
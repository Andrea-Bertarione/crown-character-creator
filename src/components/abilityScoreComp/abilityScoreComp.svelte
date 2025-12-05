<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Input, Card, Dropdown, DropdownItem, GradientButton } from "flowbite-svelte";
    import { ChevronDownOutline } from "flowbite-svelte-icons";
    import type {AbilityScore, Character} from "$lib/characterCreation.svelte";
    import AbilityScoreCard from "../abilityScoreCard/abilityScoreCard.svelte";

    import racesData, {type CharacterRace} from "../../data/races.data";

    let { characterState = $bindable() } = $props<{ characterState: Character }>();
    let computedAbilities = $derived(
        Object.entries(characterState.abilityScoreComputed).map(([ability, score]) => ({
            ability: ability as AbilityScore,
            scoreComputed: (characterState.abilityScoreComputed[ability]) as number,
            score: score as number,
            raceModifier: racesData[characterState.race as CharacterRace] && racesData[characterState.race as CharacterRace].fixedModifiers[ability as AbilityScore],
        }))
    );

    let hasRaceModifiers = $derived(
        characterState.race !== "Default" &&
        Object.entries(racesData[characterState.race as CharacterRace].fixedModifiers).
            filter(([key, value]) => value !== 0).length > 0
    );

    $effect(() => {
        Object.entries(characterState.abilityScores).forEach(([key, abilityScore]) => {
            const clamped = Math.min(Math.max(7, abilityScore as number), 16);
            if (clamped !== abilityScore) {
                characterState.abilityScores[key as AbilityScore] = clamped;
            }
        });

        Object.entries(characterState.abilityScores).forEach(([ability, baseScore]) => {
            const raceMod = racesData[characterState.race as CharacterRace]?.fixedModifiers[ability as AbilityScore] ?? 0;
            characterState.abilityScoreComputed[ability as AbilityScore] = baseScore as number + raceMod;
        });
    });
</script>

<Table>
    <TableHead>
        <TableHeadCell>Ability</TableHeadCell>
        <TableHeadCell>Computed scores</TableHeadCell>
        <TableHeadCell class="flex justify-start items-center gap-x-5">
            Basic scores
            <GradientButton size="xs"><ChevronDownOutline class="h-6 w-6 text-white dark:text-white" /></GradientButton>
            <Dropdown simple>
                <DropdownItem>test</DropdownItem>
            </Dropdown>
        </TableHeadCell>
        {#if hasRaceModifiers}
            <TableHeadCell>Race Modifiers</TableHeadCell>
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
                    <button onclick={() => {characterState.abilityScores[abilities.ability]--}} title="decrement" type="button" id="decrement-button" class="rounded-tl-2xl rounded-bl-2xl text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:bg-gray-700 hover:text-white cursor-pointer font-medium leading-5 rounded-s-base text-sm px-3 focus:outline-none h-16">
                        <svg class="w-4 h-4 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>
                    </button>
                    <Input class="text-2xl text-center h-16 max-w-20 rounded-none" type="number" bind:value={characterState.abilityScores[abilities.ability]} min={7} max={16}/>
                    <button onclick={() => {characterState.abilityScores[abilities.ability]++}} title="increment" type="button" id="increment-button" class="rounded-tr-2xl rounded-br-2xl text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:bg-gray-700 hover:text-white cursor-pointer font-medium leading-5 rounded-e-base text-sm px-3 focus:outline-none h-16">
                        <svg class="w-4 h-4 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/></svg>
                    </button>
                </TableBodyCell>
                {#if hasRaceModifiers}
                    <TableBodyCell>
                        <Card class="text-xl justify-center items-center h-16">{abilities.raceModifier > 0 ? '+' : ''}{abilities.raceModifier}</Card>
                    </TableBodyCell>
                {/if}
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>
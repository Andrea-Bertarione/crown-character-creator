<script lang="ts">
    import { Badge, Checkbox } from "flowbite-svelte";

    interface Props {
        knownProficiencies?: string[];
        selectedProficiencies?: string[];
        availableProficiencies?: string[];
        maxSelections?: number;
    }
    let {
        knownProficiencies = $bindable<string[]>([]),
        selectedProficiencies = $bindable<string[]>([]),
        availableProficiencies = [],
        maxSelections = 0
    }: Props = $props();

    const toggleProficiency = (proficiency: string) => {
        const index = selectedProficiencies.indexOf(proficiency);

        if (index > -1) {
            selectedProficiencies.splice(index, 1);
        } else {
            if (selectedFiltered.length < maxSelections) {  // Use filtered count!
                selectedProficiencies.push(proficiency);
            }
        }
    };

    const selectedFiltered = $derived(selectedProficiencies.filter(v => availableProficiencies.includes(v)));

    const isDisabled = (proficiency: string): boolean => {
        return selectedFiltered.length === maxSelections && !selectedFiltered.includes(proficiency);
    };

</script>

<!-- Known Proficiencies -->
<div class="space-y-4">
    <h3 class="text-lg font-bold">Known Proficiencies</h3>
    {#if knownProficiencies.length > 0 || selectedFiltered.length > 0}
        <div class="space-y-2 w-full flex flex-row items-center justify-center flex-wrap gap-2">
            {#each knownProficiencies as proficiency}
                <div class="mb-2 p-3 w-1/4 bg-gray-700 bg-opacity-30 rounded flex items-center gap-3">
                    <span class="text-sm font-medium flex-1">{proficiency}</span>
                    <Badge color="green" class="text-xs">Known</Badge>
                </div>
            {/each}
            {#each selectedFiltered as proficiency}
                <div class="mb-2 p-3 w-1/4 bg-gray-700 bg-opacity-30 rounded flex items-center gap-3">
                    <span class="text-sm font-medium flex-1">{proficiency}</span>
                    <Badge color="green" class="text-xs">Known</Badge>
                </div>
            {/each}
        </div>
    {:else}
        <p class="text-gray-400 text-sm">No known proficiencies yet.</p>
    {/if}
</div>

<!-- Choose Additional Proficiencies -->
{#if maxSelections > 0}
    <div class="space-y-4 mt-6">
        <h3 class="text-lg font-bold">
            Choose {maxSelections} Additional Proficiency{maxSelections > 1 ? 'ies' : ''}
        </h3>
        <p class="text-sm text-gray-400">
            {selectedFiltered.length} of {maxSelections} selected
        </p>
        <div class="space-y-2 flex flex-row items-center justify-center flex-wrap gap-2">
            {#each availableProficiencies as proficiency}
                <label class="flex items-center w-1/4 gap-3 p-3 bg-gray-700 bg-opacity-30 rounded cursor-pointer hover:bg-opacity-50 transition">
                    <Checkbox
                            checked={selectedProficiencies.includes(proficiency)}
                            onchange={() => toggleProficiency(proficiency)}
                            disabled={isDisabled(proficiency)}
                            color="sky"
                    />
                    <span class="text-sm flex-1">{proficiency}</span>
                </label>
            {/each}
        </div>
    </div>
{/if}
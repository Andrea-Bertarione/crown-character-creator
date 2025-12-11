<script lang="ts">
    import { Badge, Checkbox } from "flowbite-svelte";

    interface Props {
        categoryName: string;
        categoryIcon?: string;
        selectedChoices?: string[];
        availableChoices?: string[];
        maxSelections?: number;
        knownChoices?: string[];
        description?: string;
    }

    let {
        categoryName = $bindable(""),
        categoryIcon = "✓",
        selectedChoices = $bindable<string[]>([]),
        availableChoices = [],
        maxSelections = 0,
        knownChoices = [],
        description = ""
    }: Props = $props();

    const toggleChoice = (choice: string) => {
        if (selectedChoices.includes(choice)) {
            selectedChoices = selectedChoices.filter(c => c !== choice);
        } else {
            if (maxSelections === 0 || selectedChoices.length < maxSelections) {
                selectedChoices = [...selectedChoices, choice];
            }
        }
    };

    const isDisabled = (choice: string): boolean => {
        return maxSelections > 0 && selectedChoices.length === maxSelections && !selectedChoices.includes(choice);
    };
</script>

<!-- Known Choices -->
{#if knownChoices.length > 0}
    <div class="space-y-4">
        <h3 class="text-lg font-bold">Known {categoryName}</h3>
        <div class="space-y-2">
            {#each knownChoices as choice}
                <div class="px-4 py-3 bg-gray-700 bg-opacity-30 rounded flex items-center gap-3">
                    <span class="text-xl">{categoryIcon}</span>
                    <span class="text-sm font-medium flex-1">{choice}</span>
                    <Badge color="green" class="text-xs">Known</Badge>
                </div>
            {/each}
        </div>
    </div>
{/if}

<!-- Choose Additional Choices -->
{#if maxSelections > 0 || availableChoices.length > 0}
    <div class="space-y-4 mt-6">
        <div>
            <h3 class="text-lg font-bold">
                {maxSelections > 0 ? `Choose ${maxSelections}` : 'Select'} {categoryName}
            </h3>
            {#if description}
                <p class="text-sm text-gray-400 mt-1">{description}</p>
            {/if}
            {#if maxSelections > 0}
                <p class="text-sm text-gray-400 mt-2">
                    {selectedChoices.length} of {maxSelections} selected
                </p>
            {/if}
        </div>

        {#if availableChoices.length > 0}
            <div class="space-y-2">
                {#each availableChoices as choice}
                    <label class="flex items-center gap-3 p-3 bg-gray-700 bg-opacity-30 rounded cursor-pointer hover:bg-opacity-50 transition">
                        <Checkbox
                                checked={selectedChoices.includes(choice)}
                                onchange={() => toggleChoice(choice)}
                                disabled={isDisabled(choice)}
                        />
                        <span class="text-xl">{categoryIcon}</span>
                        <span class="text-sm flex-1">{choice}</span>
                        {#if selectedChoices.includes(choice)}
                            <Badge color="blue" class="text-xs">Selected</Badge>
                        {/if}
                    </label>
                {/each}
            </div>
        {:else}
            <p class="text-gray-400 text-sm">No additional {categoryName.toLowerCase()} available.</p>
        {/if}
    </div>
{/if}

<!-- Selected Summary (if limited choices) -->
{#if maxSelections > 0 && selectedChoices.length > 0}
    <div class="space-y-3 mt-4 p-4 bg-blue-500 bg-opacity-10 rounded-lg border border-blue-500 border-opacity-30">
        <p class="text-xs font-semibold text-blue-300 uppercase">Selected {categoryName.toLowerCase()}</p>
        <div class="space-y-1">
            {#each selectedChoices as choice}
                <div class="flex items-center gap-2">
                    <span class="text-sm">{categoryIcon} {choice}</span>
                </div>
            {/each}
        </div>
    </div>
{/if}
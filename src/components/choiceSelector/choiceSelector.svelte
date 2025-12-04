<script lang="ts">
    import { Select } from "flowbite-svelte";

    interface SelectionItem {
        value: string;
        name: string;
        disabled?: boolean;
    }

    let {
        title = "",
        values = $bindable<string[]>([]),           // Direct state binding
        availableItems = $bindable<SelectionItem[]>([]),  // Available options
        changeValues = (index: number, value: string) => {},  // Callback for each change
        showIndicator = $bindable<boolean>(true)
    } : {
        title: string;
        values: string[];
        availableItems: SelectionItem[];
        changeValues: (index: number, value: string) => void;
        showIndicator?: boolean;
    }= $props();

    const arrayOfSelectedIndexes = $state<number[]>([]);
    $effect(() => {
        showIndicator = arrayOfSelectedIndexes.length < values.length;
    })
</script>

<div class="space-y-3">
    <p class="text-sm font-semibold">{title}</p>
    {#each values as value, i (i)}
        <Select
                items={availableItems}
                bind:value={values[i]}
                onchange={() => {
                    if (!arrayOfSelectedIndexes.includes(i)) {
                        arrayOfSelectedIndexes.push(i);
                    }

                    changeValues(i, values[i]);
                }}
        />
    {/each}
</div>

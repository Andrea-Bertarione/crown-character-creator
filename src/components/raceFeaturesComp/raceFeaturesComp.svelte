<script lang="ts">
    import {Card, Label} from "flowbite-svelte";
    import {characterCreationState} from "$lib/characterCreation.svelte";
    import {type FeatureData, featuresMap} from "../../data/features.data";

    let raceFeaturesData: FeatureData[] = $derived(characterCreationState.raceFeatures.map(v => {
        return featuresMap[v] || { name: v, description: `No description found for: ${v}`, icon: "" };
    }))
</script>

<div class="flex flex-row flex-wrap gap-4">
    {#each raceFeaturesData as feature }
        <Card class="p-6 w-1/3">
            <Label for="feature" class="relative text-2xl">
                {feature.name}
                <span class="text-3xl absolute top-0 right-0">{feature.icon}</span>
            </Label>
            <div id="feature" class=" mt-4">
                <p>{feature.description}</p>
            </div>
        </Card>
    {:else}
        <p class="dark:text-white text-3xl text-center">No race features are present</p>
    {/each}
</div>
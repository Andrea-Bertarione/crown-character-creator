<script lang="ts">
    import RaceFeaturesCard from "../raceFeaturesCard/raceFeaturesCard.svelte";
    import {characterCreationState} from "$lib/characterCreation.svelte";
    import {type FeatureData, featuresMap} from "../../data/features.data";
    import {Card} from "flowbite-svelte";

    let raceFeaturesData: FeatureData[] = $derived(
        characterCreationState.raceFeatures
            .map(v => featuresMap[v] || {
                name: v,
                description: `No description found for: ${v}`,
                icon: "❓",
                type: "passive"
            })
    );
</script>

<div class="flex flex-row flex-wrap gap-4">
    {#each raceFeaturesData as feature }
        <Card class="p-6 w-1/3">
            <RaceFeaturesCard {feature} />
        </Card>

    {:else}
        <p class="dark:text-white text-3xl text-center">No race features are present</p>
    {/each}
</div>

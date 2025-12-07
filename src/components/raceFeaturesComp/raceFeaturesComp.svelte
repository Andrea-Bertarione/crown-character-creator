<script lang="ts">
    import RaceFeaturesCard from "../raceFeaturesCard/raceFeaturesCard.svelte";
    import {characterCreationState} from "$lib/characterCreation.svelte";
    import {type FeatureData, featuresMap} from "../../data/features.data";
    import type {RaceData} from "../../data/races.data";

    let raceFeaturesData: FeatureData[] = $derived(
        [
            ...characterCreationState.raceFeatures,
            ...(characterCreationState.getSubraceData(characterCreationState.getRaceData() || {} as RaceData)?.features ?? [])
        ].map(v => featuresMap[v] || { name: v, description: `No description found for: ${v}`, icon: "" })
    );

</script>

<div class="flex flex-row flex-wrap gap-4">
    {#each raceFeaturesData as feature }
        <RaceFeaturesCard feature={feature} />
    {:else}
        <p class="dark:text-white text-3xl text-center">No race features are present</p>
    {/each}
</div>
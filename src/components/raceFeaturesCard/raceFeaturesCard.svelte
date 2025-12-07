<script lang="ts">
    import {Card, Label} from "flowbite-svelte";
    import type {FeatureData} from "../../data/features.data.ts";

    let {feature}: {feature: FeatureData} = $props();
    let {name, description, icon} = feature;
</script>

<Card class="p-6 w-1/3">
    <Label for="feature" class="relative text-2xl">
        {name}
        <span class="text-3xl absolute top-0 right-0">{icon}</span>
    </Label>
    <div id="feature" class=" mt-4">
        <p>{description}</p>
    </div>
</Card>
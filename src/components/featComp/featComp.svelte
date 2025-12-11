<script lang="ts">
    import {Accordion, AccordionItem, Badge, Checkbox} from "flowbite-svelte";

    interface FeatModifier {
        type: string;
        value: string | number;
        options?: string[];
        description?: string;
    }

    interface FeatData {
        name: string;
        description: string;
        prerequisites?: string;
        icon?: string;
        source?: string;
        modifiers?: FeatModifier[];
    }

    interface Props {
        selectedFeats?: string[];
        availableFeats?: FeatData[];
        maxFeats?: number;
        featDescription?: Record<string, FeatData>;
    }

    let {
        selectedFeats = $bindable<string[]>([]),
        availableFeats = [],
        maxFeats = 0,
        featDescription = {}
    }: Props = $props();

    const selectFeat = (feat: string) => {
        if (selectedFeats.includes(feat)) {
            selectedFeats = selectedFeats.filter(f => f !== feat);
        } else if (selectedFeats.length < maxFeats) {
            selectedFeats = [...selectedFeats, feat];
        }
    };

    const getFeatDetails = (featName: string): FeatData => {
        return featDescription[featName] || {
            name: featName,
            description: "Feat details not available",
            icon: "⭐"
        };
    };

    const getChoiceModifiers = (featData: FeatData): FeatModifier[] =>
        (featData.modifiers || []).filter(m => m.value === "choice");
</script>

{#if selectedFeats.length > 0}
    <div class="space-y-4 mt-6">
        <h3 class="text-lg font-bold">Selected Feats</h3>
        <div class="space-y-2">
            {#each selectedFeats as feat}
                {@const featData = getFeatDetails(feat)}
                <div class="px-4 py-3 bg-sky-800 bg-opacity-20 rounded flex items-center gap-3">
                    <span class="text-xl">{featData.icon || "⭐"}</span>
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-white">{featData.name}</p>
                        {#if featData.prerequisites}
                            <p class="text-xs text-white">Requires: {featData.prerequisites}</p>
                        {/if}
                    </div>
                    <button
                            onclick={() => selectFeat(feat)}
                            class="text-xs text-white hover:text-red-400 transition"
                    >
                        ✕
                    </button>
                </div>
            {/each}
        </div>
    </div>
{/if}

<!-- Available Feats Selection -->
<div class="space-y-4 mt-5">
    <h3 class="text-lg font-bold">
        Choose {maxFeats} Feat{maxFeats !== 1 ? 's' : ''}
    </h3>
    {#if maxFeats > 0}
        <p class="text-sm text-gray-400">
            {selectedFeats.length} of {maxFeats} selected
        </p>
        <Accordion multiple>
            {#each availableFeats as feat}
                {@const featData = typeof feat === 'string' ? getFeatDetails(feat) : feat}
                {@const isSelected = selectedFeats.includes(featData.name)}
                {@const choiceModifiers = getChoiceModifiers(featData)}
                <AccordionItem>
                    {#snippet header()}
                        <div class="flex items-center gap-3 w-full cursor-pointer">
                            <Checkbox
                                    checked={isSelected}
                                    onchange={(e) => {
                                        e.stopPropagation();
                                        selectFeat(featData.name);
                                    }}
                                    disabled={selectedFeats.length === maxFeats && !isSelected}
                                    color="sky"
                            />
                            <span class="text-xl">{featData.icon || "⭐"}</span>
                            <span class="font-semibold flex-1">{featData.name}</span>
                            {#if isSelected}
                                <Badge color="green" class="text-xs">Selected</Badge>
                            {/if}
                            {#if featData.prerequisites}
                                <span class="text-xs text-gray-400 mr-5">
                                    Prerequisites: {featData.prerequisites}
                                </span>
                            {/if}
                        </div>
                    {/snippet}

                    <div class="space-y-3 mt-2">
                        <p class="text-gray-300 text-sm whitespace-pre-line">
                            {featData.description}
                        </p>

                        {#if choiceModifiers.length > 0}
                            <div class="bg-purple-500 bg-opacity-10 border border-purple-500 rounded-lg p-2 space-y-2">
                                <p class="text-xs font-semibold text-purple-200">
                                    This feat grants additional choices:
                                </p>
                                {#each choiceModifiers as mod}
                                    <div class="text-xs text-gray-100">
                                        <span class="font-bold capitalize">
                                            {mod.type.replace('-', ' ')}:
                                        </span>
                                        {#if mod.description}
                                            <span> {mod.description}</span>
                                        {/if}
                                        {#if mod.options && mod.options.length}
                                            <div class="mt-1 flex flex-wrap gap-1">
                                                {#each mod.options as opt}
                                                    <span class="px-2 py-0.5 rounded bg-gray-700 text-[0.7rem]">
                                                        {opt}
                                                    </span>
                                                {/each}
                                            </div>
                                        {/if}
                                    </div>
                                {/each}
                            </div>
                        {/if}

                        {#if featData.prerequisites}
                            <div class="bg-blue-500 bg-opacity-20 border border-blue-500 rounded-lg p-2">
                                <p class="text-xs text-gray-100">
                                    <span class="font-bold">Prerequisites:</span>
                                    {featData.prerequisites}
                                </p>
                            </div>
                        {/if}
                    </div>
                </AccordionItem>
            {/each}
        </Accordion>
    {:else}
        <p class="text-gray-400 text-sm">No feats available for this race/class combination.</p>
    {/if}
</div>
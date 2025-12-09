<script lang="ts">
    import {Label, Badge} from "flowbite-svelte";
    import type {FeatureData, ActionResource} from "../../data/features.data.ts";

    let {feature}: {feature: FeatureData} = $props();
    let {name, description, icon, type, frequency, level, modifiers} = feature;

    // Extract action from modifiers if it exists
    let action = $derived(
        type == "active" &&
        modifiers?.find(m => m.type === "action")?.value
    );

    let resources = $derived.by(() => {
        if (!action?.resources) return [];
        return action.resources as ActionResource[];
    });

    let resourceLabels: Record<string, string> = {
        'action': '⚡ Action',
        'bonus-action': '✨ Bonus Action',
        'reaction': '🔄 Reaction',
        'movement': '💨 Movement'
    };

    let typeColors: Record<string, string> = {
        'passive': 'blue',
        'active': 'green',
        'resistance': 'purple',
        'proficiency': 'yellow',
        'cantrip': 'indigo',
        'spell': 'violet',
        'ability-boost': 'red'
    };
</script>
{#if feature}
    <div class="flex justify-between items-start">
        <div class="flex-1">
            <Label for="feature" class="relative text-2xl">
                {name}
                <span class="text-3xl absolute top-0 right-0">{icon}</span>
            </Label>

            <div class="flex gap-2 mt-2">
                <Badge color={typeColors[type]}>
                    {type && (type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' '))}
                </Badge>

                {#if frequency}
                    <Badge color="gray">
                        {frequency.replace('-', ' ').replace('per', 'Per')}
                    </Badge>
                {/if}

                {#if level}
                    <Badge color="gray">
                        Level {level}+
                    </Badge>
                {/if}
            </div>
        </div>
    </div>

    <div id="feature" class="mt-4">
        <p class="text-sm text-gray-700 dark:text-gray-300">{description}</p>
    </div>

    <!-- Resources section for actions -->
    {#if resources.length > 0}
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <p class="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">COSTS</p>
            <div class="flex flex-wrap gap-2">
                {#each resources as resource}
                    <Badge color="orange">
                        {resourceLabels[resource.type]}
                        {#if resource.cost > 1}
                            <span class="ml-1">×{resource.cost}</span>
                        {/if}
                    </Badge>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Modifiers summary -->
    {#if modifiers && modifiers.length > 0}
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <p class="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">EFFECTS</p>
            <ul class="text-sm space-y-1">
                {#each modifiers as modifier}
                    {#if modifier.type === 'action'}
                        <li class="text-sky-600 dark:text-sky-400">
                            {modifier.value.reductionDice ? "🛡 " + modifier.value.reductionDice + " damage reduction" : ""}
                            {modifier.value.damageDice ? "⚔️ " + modifier.value.damageDice + " " + modifier.value.damageType + " damage" : ""}
                            {modifier.value.area ? "in an area of " + modifier.value.area : ""}
                            {modifier.value.origin === "self" ? "around yourself" : ""}
                        </li>
                        <span>{modifier.value.save ? "Targets do a " + modifier.value.save + " saving throw against (" + modifier.value.cd + ")" : ""}</span>
                    {/if}
                    {#if modifier.type === 'resistance'}
                        <li class="text-purple-600 dark:text-purple-400">
                            🛡️ Resistance: <span class="capitalize">{modifier.value.replace('-', ' ')}</span>
                        </li>
                    {/if}

                    {#if modifier.type === 'skill-proficiency'}
                        <li class="text-blue-600 dark:text-blue-400">
                            📚 Skill: <span class="capitalize">{modifier.value.replace('-', ' ')}</span>
                        </li>
                    {/if}

                    {#if modifier.type === 'saving-throw'}
                        <li class="text-teal-400 dark:text-teal-200">
                            📚 Saving throw: <span class="capitalize">{modifier.value.type}</span> on {modifier.value.source.replace('-', ' ')}
                        </li>
                    {/if}

                    {#if modifier.type === 'weapon-proficiency'}
                        <li class="text-red-600 dark:text-red-400">
                            ⚔️ {#if Array.isArray(modifier.value)}
                            {modifier.value.join(', ')}
                        {/if}
                        </li>
                    {/if}

                    {#if modifier.type === 'armor-proficiency'}
                        <li class="text-orange-600 dark:text-orange-400">
                            🛡️ {#if Array.isArray(modifier.value)}
                            {modifier.value.join(', ')}
                        {/if}
                        </li>
                    {/if}

                    {#if modifier.type === 'tool-proficiency'}
                        <li class="text-yellow-600 dark:text-yellow-400">
                            🔧 <span class="capitalize">{modifier.value}</span>
                        </li>
                    {/if}

                    {#if modifier.type === 'speed'}
                        <li class="text-green-600 dark:text-green-400">
                            💨 +{modifier.value}m
                        </li>
                    {/if}

                    {#if modifier.type === 'darkvision'}
                        <li class="text-indigo-600 dark:text-indigo-400">
                            👁️ {modifier.value}m
                        </li>
                    {/if}

                    {#if modifier.type === 'cantrip'}
                        <li class="text-violet-600 dark:text-violet-400">
                            ✨ <span class="capitalize">{modifier.value}</span>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    {/if}
{:else}
    <p>feature not found</p>
{/if}
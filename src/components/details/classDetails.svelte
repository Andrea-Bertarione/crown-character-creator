<script lang="ts">
    import {Popover} from "flowbite-svelte";
    import type {ClassData} from "../../data/classes.data";
    import {featuresMap} from "../../data/features.data";
    import FeaturesCard from "../featuresCard/featuresCard.svelte";

    let { currentClass }: { currentClass?: ClassData } = $props<{ currentClass?: ClassData }>();
</script>

{#if currentClass}
    <div class="space-y-6">
        <!-- Class Name -->
        <div>
            <h3 class="text-2xl font-bold mb-2">{currentClass.name}</h3>
            <p class="text-gray-300 text-sm">
                {currentClass.description}
            </p>
        </div>

        <!-- Hit Dice + HP -->
        <div class="grid grid-cols-3 gap-4">
            <div class="bg-gray-700 bg-opacity-30 rounded-lg p-3">
                <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Hit Dice</p>
                <p class="text-sm font-bold text-white">{currentClass.hitDice}</p>
            </div>
            <div class="bg-gray-700 bg-opacity-30 rounded-lg p-3">
                <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">HP at 1st Level</p>
                <p class="text-sm font-bold text-white">{currentClass.hitPointsAtLevel1}</p>
            </div>
            {#if currentClass.spellcastingAbility}
                <div class="bg-gray-700 bg-opacity-30 rounded-lg p-3">
                    <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Spellcasting</p>
                    <p class="text-sm font-bold text-white capitalize">{currentClass.spellcastingAbility}</p>
                </div>
            {/if}
        </div>

        <!-- Features info -->
        <div class="z-10">
            <p class="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wide">Class Features</p>
            <div class="space-y-2">
                {#each currentClass.classFeatures.filter(v => v.level === 1) as classFeature}
                    <p class="text-sm text-gray-300 flex gap-2">
                        <span class="text-sky-400">•</span>
                        <span class="cursor-help hover:text-sky-500 transition-all">{classFeature.name} - {classFeature.description}</span>
                        <Popover class="max-w-md p-3">
                            <FeaturesCard feature={featuresMap[classFeature.name] || {name: classFeature.name, description: "missing description", icon: "NoIcon"}} />
                        </Popover>
                    </p>
                {/each}
            </div>
        </div>

        <!-- Armor Proficiencies -->
        {#if currentClass.armorProficiencies.length > 0}
            <div>
                <p class="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Armor Proficiencies</p>
                <div class="flex gap-2 flex-wrap">
                    {#each currentClass.armorProficiencies as armor}
                                            <span class="px-3 py-1 bg-orange-500 text-black rounded-lg text-xs font-bold capitalize">
                                                {armor}
                                            </span>
                    {/each}
                </div>
            </div>
        {/if}

        <!-- Weapon Proficiencies -->
        {#if currentClass.weaponProficiencies.length > 0}
            <div>
                <p class="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Weapon Proficiencies</p>
                <div class="flex gap-2 flex-wrap">
                    {#each currentClass.weaponProficiencies as weapon}
                                            <span class="px-3 py-1 bg-red-500 text-black rounded-lg text-xs font-bold capitalize">
                                                {weapon}
                                            </span>
                    {/each}
                </div>
            </div>
        {/if}

        <!-- Tool Proficiencies -->
        {#if currentClass.toolProficiencies.length > 0}
            <div>
                <p class="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Tool Proficiencies</p>
                <div class="flex gap-2 flex-wrap">
                    {#each currentClass.toolProficiencies as tool}
                                            <span class="px-2 py-1 bg-gray-700 text-gray-200 rounded text-xs">
                                                {tool}
                                            </span>
                    {/each}
                </div>
            </div>
        {/if}

        <!-- Saving Throw Proficiencies -->
        {#if currentClass.savingThrowProficiencies.length > 0}
            <div>
                <p class="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Saving Throw Proficiencies</p>
                <div class="flex gap-2 flex-wrap">
                    {#each currentClass.savingThrowProficiencies as save}
                                            <span class="px-2 py-1 bg-purple-700 text-purple-100 rounded text-xs">
                                                {save}
                                            </span>
                    {/each}
                </div>
            </div>
        {/if}

        <!-- Skill Proficiencies -->
        {#if currentClass.skillChoices > 0}
            <div>
                <p class="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Skill Proficiencies</p>
                <p class="text-sm text-gray-300">
                    You will choose <span class="font-bold text-sky-400">{currentClass.skillChoices}</span> skills between these:
                </p>
                <div class="mt-2 flex gap-2 flex-wrap">
                    {#each currentClass.SkillProficiencyList as skill}
                                            <span class="px-2 py-1 bg-gray-700 text-gray-200 rounded text-xs">
                                                {skill}
                                            </span>
                    {/each}
                </div>
            </div>
        {/if}

        {#if currentClass.toolChoices > 0 || currentClass.toolProficiencies.length > 0}
            <div>
                <p class="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Tools Proficiencies</p>
                {#if currentClass.toolProficiencies.length > 0 }
                    <p class="text-sm text-gray-300">
                        You are proficient in these tools:
                    </p>
                    {#each currentClass.toolProficiencies as tool}
                        <span class="px-3 py-1 bg-green-800 text-black rounded-lg text-xs font-bold capitalize">
                            {tool}
                        </span>
                    {/each}
                {/if}
                {#if currentClass.toolChoices > 0 }
                    <p class="text-sm text-gray-300">
                        You will choose <span class="font-bold text-sky-400">{currentClass.toolChoices}</span> tools proficiencies between these:
                    </p>
                    <div class="mt-2 flex gap-2 flex-wrap">
                        {#each currentClass.toolsProficiencyList as tools}
                                                <span class="px-2 py-1 bg-gray-700 text-gray-200 rounded text-xs">
                                                    {tools}
                                                </span>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}
    </div>
{:else}
    <div class="flex justify-center items-center h-full">
        <p class="text-xl text-gray-400">Select a class to view additional information...</p>
    </div>
{/if}
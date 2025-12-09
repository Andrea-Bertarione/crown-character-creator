<script lang="ts">
    import type {ClassData} from "../../data/classes.data";

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

        <!-- Subclass Availability Notice -->
        {#if currentClass.subclasses && currentClass.subclasses.length > 0}
            <div class="bg-blue-500 bg-opacity-20 border border-blue-500 rounded-lg p-3">
                <p class="text-sm text-gray-100">
                    <span class="font-bold">Subclass Available at Level {currentClass.subclassLevel}</span>
                    {#if currentClass.subclassLevel === 1}
                        <span> — Choose your specialization now</span>
                    {:else}
                        <span> — You'll choose your specialization later</span>
                    {/if}
                </p>
            </div>
        {/if}

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
                    Choose <span class="font-bold text-sky-400">{currentClass.skillChoices}</span> skills from:
                </p>
                <div class="mt-2 flex gap-2 flex-wrap">
                    {#each currentClass.skillProficiencies as skill}
                                            <span class="px-2 py-1 bg-gray-700 text-gray-200 rounded text-xs">
                                                {skill}
                                            </span>
                    {/each}
                </div>
            </div>
        {/if}

        <!-- Spellcasting Info -->
        {#if ((currentClass.spellsKnownAtLevel1 || 0) > 0 || (currentClass.cantripsKnownAtLevel1 || 0) > 0) && currentClass.spellcastingAbility}
            <div class="bg-purple-500 bg-opacity-20 border border-purple-500 rounded-lg p-3">
                <p class="text-sm text-gray-100">
                    <span class="font-bold">Spellcasting:</span>
                    {#if (currentClass.cantripsKnownAtLevel1 || 0) > 0}
                        <span> {currentClass.cantripsKnownAtLevel1} cantrips</span>
                    {/if}
                    {#if (currentClass.spellsKnownAtLevel1 || 0)> 0}
                        <span> + {currentClass.spellsKnownAtLevel1} spells</span>
                    {/if}
                    <span> (You'll choose in the next step)</span>
                </p>
            </div>
        {/if}
    </div>
{:else}
    <div class="flex justify-center items-center h-full">
        <p class="text-xl text-gray-400">Select a class to view additional information...</p>
    </div>
{/if}
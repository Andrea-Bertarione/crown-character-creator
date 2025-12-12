<script lang="ts">
    import {Accordion, AccordionItem, Badge, Checkbox, Select} from "flowbite-svelte";
    import {Character, characterCreationState} from "$lib/characterCreation.svelte";
    import type {FeatData, PrerequisiteType, FeatModifier } from "../../data/feats.data.ts";

    interface Props {
        character: Character; // Your Character instance
        maxFeats?: number;
        featDescription?: Record<string, FeatData>;
        selectedFeats?: string[]; // Optional if tracking externally
    }

    let {
        character,
        maxFeats = 0,
        featDescription = {},
        selectedFeats = $bindable<string[]>([])
    }: Props = $props();

    // ===== STATE =====
    let searchQuery = $state("");
    let selectedSource = $state<string>("");
    let showOnlyMetPrerequisites = $state(true);

    // ===== BUILD CHARACTER FOR PREREQUISITE CHECKING =====
    /**
     * Convert Character class to prerequisite-checkable format
     */
    const buildCharacterForPrerequisiteCheck = () => {
        const snapshot = characterCreationState

        return {
            level: 1, // D&D starts at level 1, adjust as needed
            class: snapshot.class || undefined,
            abilityScores: {
                strength: snapshot.abilityScoreComputed.strength,
                dexterity: snapshot.abilityScoreComputed.dexterity,
                constitution: snapshot.abilityScoreComputed.constitution,
                intelligence: snapshot.abilityScoreComputed.intelligence,
                wisdom: snapshot.abilityScoreComputed.wisdom,
                charisma: snapshot.abilityScoreComputed.charisma,
            },
            proficiencies: {
                skills: Object.entries(snapshot.proficiencies)
                    .filter(([_, prof]) => prof.type === "skill" && prof.state !== "none")
                    .map(([key, prof]) => prof.name),
                tools: Object.entries(snapshot.proficiencies)
                    .filter(([_, prof]) => prof.type === "tool" && prof.state !== "none")
                    .map(([key, prof]) => prof.name),
                armor: extractArmorProficiencies(snapshot.proficiencies),
            },
            hasSpellcasting: hasSpellcastingFeature(snapshot),
            hasPactMagic: hasPactMagicFeature(snapshot),
        };
    };

    /**
     * Extract armor proficiency levels from proficiencies
     */
    const extractArmorProficiencies = (profs: any): ("light" | "medium" | "heavy")[] => {
        const armorProfs: ("light" | "medium" | "heavy")[] = [];
        const lightArmor = ["Leather", "Padded", "Studded Leather"];
        const mediumArmor = ["Chain Mail", "Chain Shirt", "Half Plate", "Hide", "Scale Mail"];
        const heavyArmor = ["Plate", "Plate Armor", "Splint"];

        Object.entries(profs).forEach(([_, prof]: any) => {
            if (prof.type === "armor" && prof.state !== "none") {
                if (lightArmor.includes(prof.name)) {
                    if (!armorProfs.includes("light")) armorProfs.push("light");
                }
                if (mediumArmor.includes(prof.name)) {
                    if (!armorProfs.includes("medium")) armorProfs.push("medium");
                }
                if (heavyArmor.includes(prof.name)) {
                    if (!armorProfs.includes("heavy")) armorProfs.push("heavy");
                }
            }
        });

        return armorProfs;
    };

    /**
     * Check if character has spellcasting feature
     */
    const hasSpellcastingFeature = (snapshot: any): boolean => {
        const allFeatures = [...snapshot.raceFeatures, ...snapshot.classFeatures];
        return allFeatures.some((f: string) =>
            f.toLowerCase().includes("spellcasting") ||
            f.toLowerCase().includes("pact magic")
        );
    };

    /**
     * Check if character has pact magic feature (Warlock-specific)
     */
    const hasPactMagicFeature = (snapshot: any): boolean => {
        const allFeatures = [...snapshot.raceFeatures, ...snapshot.classFeatures];
        return allFeatures.some((f: string) => f.toLowerCase().includes("pact magic"));
    };

    // ===== PREREQUISITE CHECKING =====
    const checkPrerequisite = (
        prerequisite: PrerequisiteType,
        char: ReturnType<typeof buildCharacterForPrerequisiteCheck>
    ): boolean => {
        switch (prerequisite.type) {
            case "ability-score":
                const abilityScore = char.abilityScores[prerequisite.ability.toLowerCase() as keyof typeof char.abilityScores];
                return abilityScore >= prerequisite.minimum;

            case "proficiency":
                return (
                    char.proficiencies.skills.includes(prerequisite.proficiency) ||
                    char.proficiencies.tools.includes(prerequisite.proficiency)
                );

            case "spellcasting":
                return char.hasSpellcasting || (char.hasPactMagic ?? false);

            case "armor-proficiency":
                return char.proficiencies.armor.some(armor => {
                    if (prerequisite.level === "light") return ["light", "medium", "heavy"].includes(armor);
                    if (prerequisite.level === "medium") return ["medium", "heavy"].includes(armor);
                    if (prerequisite.level === "heavy") return armor === "heavy";
                    return false;
                });

            case "level":
                return char.level >= prerequisite.minimum;

            case "class":
                return char.class?.toLowerCase() === prerequisite.class.toLowerCase();

            default:
                return prerequisite;
        }
    };

    const canTakeFeat = (featData: FeatData, char: ReturnType<typeof buildCharacterForPrerequisiteCheck>) => {
        if (!featData.prerequisites || featData.prerequisites.length === 0) {
            return { canTake: true, failedPrerequisites: [] as PrerequisiteType[] };
        }

        const failedPrerequisites = featData.prerequisites.filter(
            prereq => !checkPrerequisite(prereq, char)
        );

        return {
            canTake: failedPrerequisites.length === 0,
            failedPrerequisites,
        };
    };

    const getPrerequisiteDescription = (prerequisite: PrerequisiteType): string => {
        switch (prerequisite.type) {
            case "ability-score":
                return `${prerequisite.ability} ${prerequisite.minimum} or higher`;
            case "proficiency":
                return `Proficiency in ${prerequisite.proficiency}`;
            case "spellcasting":
                return "Spellcasting or Pact Magic feature";
            case "armor-proficiency":
                return `${prerequisite.level.charAt(0).toUpperCase() + prerequisite.level.slice(1)} armor proficiency`;
            case "level":
                return `Level ${prerequisite.minimum} or higher`;
            case "class":
                return `Must be a ${prerequisite.class}`;
            default:
                return "Unknown prerequisite";
        }
    };

    // ===== MODIFIER BADGE GENERATION =====
    /**
     * Get badges for what this feat provides
     */
    const getModifierBadges = (modifiers: FeatModifier[] | undefined): { label: string; color: string }[] => {
        if (!modifiers) return [];

        const badges: { label: string; color: string }[] = [];
        const modifierTypes = new Set<string>();

        modifiers.forEach(mod => {
            if (modifierTypes.has(mod.type)) return; // Only show each type once

            switch (mod.type) {
                case "ability-score":
                    badges.push({ label: "+1 Ability", color: "blue" });
                    modifierTypes.add("ability-score");
                    break;
                case "skill-proficiency":
                    badges.push({ label: "Skill Prof.", color: "purple" });
                    modifierTypes.add("skill-proficiency");
                    break;
                case "tool-proficiency":
                    badges.push({ label: "Tool Prof.", color: "purple" });
                    modifierTypes.add("tool-proficiency");
                    break;
                case "armor-proficiency":
                    badges.push({ label: "Armor Prof.", color: "amber" });
                    modifierTypes.add("armor-proficiency");
                    break;
                case "weapon-proficiency":
                    badges.push({ label: "Weapon Prof.", color: "red" });
                    modifierTypes.add("weapon-proficiency");
                    break;
                case "spell":
                    badges.push({ label: "Spell", color: "indigo" });
                    modifierTypes.add("spell");
                    break;
                case "ac-bonus":
                    badges.push({ label: "AC Bonus", color: "cyan" });
                    modifierTypes.add("ac-bonus");
                    break;
                case "speed-bonus":
                    badges.push({ label: "Speed +", color: "green" });
                    modifierTypes.add("speed-bonus");
                    break;
                case "saving-throw-proficiency":
                    badges.push({ label: "Save Prof.", color: "orange" });
                    modifierTypes.add("saving-throw-proficiency");
                    break;
                case "feature":
                    badges.push({ label: "Feature", color: "gray" });
                    modifierTypes.add("feature");
                    break;
            }
        });

        return badges;
    };

    // ===== FILTERING LOGIC =====
    const getFilteredFeats = () => {
        const charForCheck = buildCharacterForPrerequisiteCheck();
        const allFeats = Object.values(featDescription);

        return allFeats.filter(featData => {
            // Search filter
            const matchesSearch = searchQuery === "" ||
                featData.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                featData.description.toLowerCase().includes(searchQuery.toLowerCase());

            // Source filter
            const matchesSource = selectedSource === "" ||
                (featData.source || "").toLowerCase() === selectedSource.toLowerCase();

            // Prerequisite filter
            const prerequisiteCheck = canTakeFeat(featData, charForCheck);
            const matchesPrerequisites = !showOnlyMetPrerequisites || prerequisiteCheck.canTake;

            return matchesSearch && matchesSource && matchesPrerequisites;
        });
    };

    const getFeatDetails = (featName: string): FeatData => {
        return featDescription[featName] || {
            name: featName,
            description: "Feat details not available",
            icon: "⭐"
        };
    };

    const getChoiceModifiers = (featData: FeatData) =>
        (featData.modifiers || []).filter((m: any) => m.value.type === "choice" || m.value === "choice");

    const getAllSources = () => {
        const sources = new Set<string>();
        Object.values(featDescription).forEach(feat => {
            if (feat.source) sources.add(feat.source);
        });
        return Array.from(sources).sort();
    };

    const selectFeat = (feat: string) => {
        if (selectedFeats.includes(feat)) {
            selectedFeats = selectedFeats.filter(f => f !== feat);
        } else if (selectedFeats.length < maxFeats) {
            selectedFeats = [...selectedFeats, feat];
        }
    };

    // Derived values
    const filteredFeats = $derived(getFilteredFeats());
    const sources = $derived(getAllSources());
    const charForDisplay = $derived(buildCharacterForPrerequisiteCheck());
</script>

{#if selectedFeats.length > 0}
    <div class="space-y-4 mt-6">
        <h3 class="text-lg font-bold">Selected Feats</h3>
        <div class="space-y-2">
            {#each selectedFeats as feat}
                {@const featData = getFeatDetails(feat)}
                {@const prerequisiteCheck = canTakeFeat(featData, charForDisplay)}
                <div class="px-4 py-3 bg-sky-800 bg-opacity-20 rounded flex items-center gap-3">
                    <span class="text-xl">{featData.icon || "⭐"}</span>
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-white">{featData.name}</p>
                        {#if !prerequisiteCheck.canTake}
                            <p class="text-xs text-red-400">
                                ⚠️ Missing: {prerequisiteCheck.failedPrerequisites.map(getPrerequisiteDescription).join(", ")}
                            </p>
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

<!-- Feat Selection -->
<div class="space-y-4 mt-5">
    <h3 class="text-lg font-bold">
        Choose {maxFeats} Feat{maxFeats !== 1 ? 's' : ''}
    </h3>

    {#if maxFeats > 0}
        <p class="text-sm text-gray-400">
            {selectedFeats.length} of {maxFeats} selected
        </p>

        <!-- Search and Filters Bar -->
        <div class="space-y-3 bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700">
            <!-- Search Bar -->
            <div>
                <input
                        type="text"
                        placeholder="Search feats by name or description..."
                        value={searchQuery}
                        onchange={(e) => searchQuery = e.currentTarget.value}
                        class="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 transition"
                />
            </div>

            <!-- Filters Row -->
            <div class="flex gap-3 flex-wrap">
                <!-- Source Filter -->
                {#if sources.length > 0}
                    <div class="flex-1 min-w-[200px]">
                        <Select
                                bind:value={selectedSource}
                                class="text-sm"
                                items={[
                                { value: "", name: "All Sources" },
                                ...sources.map(source => ({ value: source, name: source }))
                            ]}
                        />
                    </div>
                {/if}

                <!-- Show Only Met Prerequisites Toggle -->
                <div class="flex items-center gap-2 px-3 py-2 bg-gray-900 border border-gray-600 rounded">
                    <Checkbox
                            bind:checked={showOnlyMetPrerequisites}
                            color="sky"
                    />
                    <label class="text-sm text-gray-300 cursor-pointer">
                        Only show available
                    </label>
                </div>
            </div>

            <!-- Results Count -->
            <div class="text-xs text-gray-400">
                {filteredFeats.length} of {Object.keys(featDescription).length} feat{Object.keys(featDescription).length !== 1 ? 's' : ''} shown
            </div>
        </div>

        <!-- Feats Accordion -->
        {#if filteredFeats.length > 0}
            <Accordion multiple>
                {#each filteredFeats as featData}
                    {@const isSelected = selectedFeats.includes(featData.name)}
                    {@const choiceModifiers = getChoiceModifiers(featData)}
                    {@const prerequisiteCheck = canTakeFeat(featData, charForDisplay)}
                    {@const isDisabled = !prerequisiteCheck.canTake || (selectedFeats.length === maxFeats && !isSelected)}
                    {@const modifierBadges = getModifierBadges(featData.modifiers)}

                    <AccordionItem>
                        {#snippet header()}
                            <div class="flex items-center gap-3 w-full cursor-pointer">
                                <Checkbox
                                        checked={isSelected}
                                        onchange={(e) => {
                                        e.stopPropagation();
                                        selectFeat(featData.name);
                                    }}
                                        disabled={isDisabled}
                                        color="sky"
                                />
                                <span class="text-xl">{featData.icon || "⭐"}</span>
                                <div class="flex-1">
                                    <span class="font-semibold">{featData.name}</span>
                                    {#if modifierBadges.length > 0}
                                        <div class="flex gap-1 flex-wrap mt-1">
                                            {#each modifierBadges as badge}
                                                <Badge color={badge.color} class="text-xs py-0.5 px-1.5">
                                                    {badge.label}
                                                </Badge>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>

                                {#if isSelected}
                                    <Badge color="green" class="text-xs">Selected</Badge>
                                {/if}

                                {#if !prerequisiteCheck.canTake}
                                    <Badge color="red" class="text-xs">Requires Prerequisites</Badge>
                                {/if}

                                {#if featData.source}
                                    <span class="text-xs text-gray-500 mr-2">{featData.source}</span>
                                {/if}
                            </div>
                        {/snippet}

                        <div class="space-y-3 mt-2">
                            <!-- Prerequisites Status -->
                            {#if featData.prerequisites && featData.prerequisites.length > 0}
                                {#if !prerequisiteCheck.canTake}
                                    <div class="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-3">
                                        <p class="text-xs font-semibold text-red-400 mb-2">Missing Prerequisites:</p>
                                        <ul class="text-xs text-red-300 space-y-1">
                                            {#each prerequisiteCheck.failedPrerequisites as prereq}
                                                <li class="flex items-start gap-2">
                                                    <span class="mt-0.5">•</span>
                                                    <span>{getPrerequisiteDescription(prereq)}</span>
                                                </li>
                                            {/each}
                                        </ul>
                                    </div>
                                {:else}
                                    <div class="bg-green-900 bg-opacity-20 border border-green-700 rounded-lg p-2">
                                        <p class="text-xs text-green-400">
                                            ✓ All prerequisites met
                                        </p>
                                    </div>
                                {/if}
                            {/if}

                            <!-- Description -->
                            <p class="text-gray-300 text-sm whitespace-pre-line">
                                {featData.description}
                            </p>

                            <!-- Choice Modifiers -->
                            {#if choiceModifiers.length > 0}
                                <div class="bg-purple-900 bg-opacity-10 border border-purple-900 rounded-lg p-2 space-y-2">
                                    <p class="text-xs font-semibold text-purple-300">
                                        This feat grants additional choices you will finalize after class selection...
                                    </p>
                                    {#each choiceModifiers as mod}
                                        <div class="text-xs text-gray-100">
                                            <span class="font-bold capitalize">
                                                {mod.type.replace('-', ' ')}:
                                            </span>
                                            {#if mod.description}
                                                <span> {mod.description}</span>
                                            {/if}
                                            {#if (mod.value as any).abilities}
                                                <div class="mt-1 flex flex-wrap gap-1">
                                                    {#each (mod.value as any).abilities as opt}
                                                        <span class="px-2 py-0.5 rounded bg-gray-700 text-[0.7rem]">
                                                            {opt}
                                                        </span>
                                                    {/each}
                                                </div>
                                            {:else if (mod.value as any).skills}
                                                <div class="mt-1 flex flex-wrap gap-1">
                                                    {#each (mod.value as any).skills as opt}
                                                        <span class="px-2 py-0.5 rounded bg-gray-700 text-[0.7rem]">
                                                            {opt}
                                                        </span>
                                                    {/each}
                                                </div>
                                            {:else if (mod.value as any).tools}
                                                <div class="mt-1 flex flex-wrap gap-1">
                                                    {#each (mod.value as any).tools as opt}
                                                        <span class="px-2 py-0.5 rounded bg-gray-700 text-[0.7rem]">
                                                            {opt}
                                                        </span>
                                                    {/each}
                                                </div>
                                            {:else if (mod.value as any).savingThrows}
                                                <div class="mt-1 flex flex-wrap gap-1">
                                                    {#each (mod.value as any).savingThrows as opt}
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
                        </div>
                    </AccordionItem>
                {/each}
            </Accordion>
        {:else}
            <div class="text-center py-8 text-gray-400">
                <p class="text-sm">
                    {showOnlyMetPrerequisites
                        ? "No feats available that meet your current prerequisites. Try toggling 'Only show available' or improving your ability scores!"
                        : "No feats match your search. Try different keywords."}
                </p>
            </div>
        {/if}
    {:else}
        <p class="text-gray-400 text-sm">No feats available for this race/class combination.</p>
    {/if}
</div>

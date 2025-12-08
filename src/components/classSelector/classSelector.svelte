<script lang="ts">
    import {Modal, Button, GradientButton, Popover, Badge, Checkbox} from "flowbite-svelte";
    import { ChevronRightOutline, ChevronLeftOutline } from "flowbite-svelte-icons";
    import RaceFeaturesCard from "../raceFeaturesCard/raceFeaturesCard.svelte";
    import { classesData, type ClassName } from "../../data/classes.data";
    import {featuresMap} from "../../data/features.data";
    import type { ClassChoices} from "$lib/characterCreation.svelte";

    let {
        isOpen = $bindable(false),
        onSelect = (className: ClassName, subclass: string | null, choices?: ClassChoices) => {},
        selectedClass = $bindable<ClassName | null>(null),
        selectedSubclass = $bindable<string | null>(null)
    }: {
        isOpen: boolean;
        onSelect: (className: ClassName, subclass: string | null, choices?: ClassChoices) => void;
        selectedClass: ClassName | null;
        selectedSubclass: string | null;
    } = $props();

    const classList = Object.values(classesData) as any[];

    // State management
    let step: "class" | "subclass" | "choices" = $state("class");
    let tempClass: ClassName | null = $state(null);
    let tempSubclass: string | null = $state(null);
    let hoveredClass: ClassName | null = $state(null);

    // Current choice category being viewed
    let currentChoiceTab: "skills" | "tools" | "cantrips" | "spells" = $state("skills");

    // Choices state - Using arrays for proper reactivity
    let selectedSkills: string[] = $state([]);
    let selectedTools: string[] = $state([]);
    let selectedCantrips: string[] = $state([]);
    let selectedSpells: string[] = $state([]);
    let selectedArmorProficiencies: string[] = $state([]);

    const previewClass = (className: ClassName) => {
        hoveredClass = className;
    };

    const confirmClass = () => {
        if (!hoveredClass) return;

        const classData = classesData[hoveredClass];

        // Check if class has subclass at level 1
        if (classData?.subclasses && classData.subclasses.length > 0 && classData.subclassLevel === 1) {
            tempClass = hoveredClass;
            step = "subclass";
            tempSubclass = null;
        } else {
            // Check if class has any choices to make
            if (hasChoices(classData)) {
                tempClass = hoveredClass;
                step = "choices";
                currentChoiceTab = "skills";
                resetChoices();
            } else {
                selectedClass = hoveredClass;
                onSelect(hoveredClass, null);
                isOpen = false;
            }
        }
    };

    const previewSubclass = (subclassName: string) => {
        tempSubclass = subclassName;
    };

    const confirmSubclass = () => {
        if (!tempSubclass || !tempClass) return;

        const classData = classesData[tempClass];

        // Check if class has choices to make after subclass selection
        if (hasChoices(classData)) {
            step = "choices";
            currentChoiceTab = "skills";
            resetChoices();
        } else {
            selectedSubclass = tempSubclass;
            selectedClass = tempClass;
            onSelect(tempClass, tempSubclass);
            isOpen = false;
        }
    };

    const confirmChoices = () => {
        if (!tempClass) return;

        const classData = classesData[tempClass];

        // Validate choices
        if (classData.skillChoices > 0 && selectedSkills.length !== classData.skillChoices) {
            alert(`Please select exactly ${classData.skillChoices} skills`);
            return;
        }

        const choices: ClassChoices = {
            skills: selectedSkills,
            tools: selectedTools,
            cantrips: selectedCantrips,
            spells: selectedSpells,
            armorProficiencies: selectedArmorProficiencies
        };

        selectedClass = tempClass;
        selectedSubclass = tempSubclass;
        onSelect(tempClass, tempSubclass || null, choices);
        isOpen = false;
    };

    const hasChoices = (classData: any): boolean => {
        return (
            classData.skillChoices > 0 ||
            classData.toolProficiencies.some((t: string) => t.includes('choose') || t.includes('Choose')) ||
            classData.spellsKnownAtLevel1 > 0 ||
            classData.cantripsKnownAtLevel1 > 0 ||
            classData.armorProficiencies.some((a: string) => a.includes('choose') || a.includes('Choose'))
        );
    };

    const resetChoices = () => {
        selectedSkills = [];
        selectedTools = [];
        selectedCantrips = [];
        selectedSpells = [];
        selectedArmorProficiencies = [];
    };

    const toggleSkill = (skill: string) => {
        if (!tempClass) return;
        const classData = classesData[tempClass];

        if (selectedSkills.includes(skill)) {
            selectedSkills = selectedSkills.filter(s => s !== skill);
        } else {
            if (selectedSkills.length < classData.skillChoices) {
                selectedSkills = [...selectedSkills, skill];
            }
        }
    };

    const toggleTool = (tool: string) => {
        if (selectedTools.includes(tool)) {
            selectedTools = selectedTools.filter(t => t !== tool);
        } else {
            selectedTools = [...selectedTools, tool];
        }
    };

    const toggleCantrip = (cantrip: string) => {
        if (!tempClass) return;
        const classData = classesData[tempClass];

        if (selectedCantrips.includes(cantrip)) {
            selectedCantrips = selectedCantrips.filter(c => c !== cantrip);
        } else {
            if (selectedCantrips.length < (classData.cantripsKnownAtLevel1 || 0)) {
                selectedCantrips = [...selectedCantrips, cantrip];
            }
        }
    };

    const toggleSpell = (spell: string) => {
        if (!tempClass) return;
        const classData = classesData[tempClass];

        if (selectedSpells.includes(spell)) {
            selectedSpells = selectedSpells.filter(s => s !== spell);
        } else {
            if (selectedSpells.length < (classData.spellsKnownAtLevel1 || 0)) {
                selectedSpells = [...selectedSpells, spell];
            }
        }
    };

    const toggleArmor = (armor: string) => {
        if (selectedArmorProficiencies.includes(armor)) {
            selectedArmorProficiencies = selectedArmorProficiencies.filter(a => a !== armor);
        } else {
            selectedArmorProficiencies = [...selectedArmorProficiencies, armor];
        }
    };

    const goBack = () => {
        if (step === "choices") {
            if (tempSubclass) {
                step = "subclass";
            } else {
                step = "class";
            }
            resetChoices();
        } else if (step === "subclass") {
            step = "class";
        }
        tempClass = null;
        tempSubclass = null;
        hoveredClass = null;
    };

    // Get available choices for current category
    const getChoicesForTab = (tab: string) => {
        if (!tempClass) return [];
        const classData = classesData[tempClass];

        switch (tab) {
            case "skills":
                return classData.skillProficiencies || [];
            case "tools":
                return classData.toolProficiencies.filter((t: string) => !t.includes('choose')) || [];
            case "cantrips":
                return ['Fire Bolt', 'Mage Hand', 'Light', 'Prestidigitation', 'Acid Splash', 'Shocking Grasp', 'Ray of Frost', 'Minor Illusion', 'Blade Ward', 'True Strike'];
            case "spells":
                return ['Magic Missile', 'Shield', 'Identify', 'Detect Magic', 'Mage Armor', 'Charm Person', 'Sleep', 'Disguise Self', 'Fog Cloud', 'Scorching Ray', 'Darkness', 'Misty Step'];
            default:
                return [];
        }
    };

    // Get selected count for a category
    const getSelectedCount = (tab: string) => {
        if (!tempClass) return 0;
        const classData = classesData[tempClass];

        switch (tab) {
            case "skills":
                return selectedSkills.length;
            case "tools":
                return selectedTools.length;
            case "cantrips":
                return selectedCantrips.length;
            case "spells":
                return selectedSpells.length;
            default:
                return 0;
        }
    };

    // Get max count for a category
    const getMaxCount = (tab: string) => {
        if (!tempClass) return 0;
        const classData = classesData[tempClass];

        switch (tab) {
            case "skills":
                return classData.skillChoices || 0;
            case "tools":
                return 999; // unlimited
            case "cantrips":
                return classData.cantripsKnownAtLevel1 || 0;
            case "spells":
                return classData.spellsKnownAtLevel1 || 0;
            default:
                return 0;
        }
    };

    // Check if tab has choices
    const hasTabChoices = (tab: string) => {
        if (!tempClass) return false;
        const classData = classesData[tempClass];

        switch (tab) {
            case "skills":
                return classData.skillChoices > 0;
            case "tools":
                return classData.toolProficiencies.filter((t: string) => !t.includes('choose')).length > 0;
            case "cantrips":
                return (classData.cantripsKnownAtLevel1 || 0) > 0;
            case "spells":
                return (classData.spellsKnownAtLevel1 || 0) > 0;
            default:
                return false;
        }
    };

    // Set first available tab
    $effect(() => {
        if (step === "choices" && tempClass) {
            if (hasTabChoices("skills")) {
                currentChoiceTab = "skills";
            } else if (hasTabChoices("tools")) {
                currentChoiceTab = "tools";
            } else if (hasTabChoices("cantrips")) {
                currentChoiceTab = "cantrips";
            } else if (hasTabChoices("spells")) {
                currentChoiceTab = "spells";
            }
        }
    });
</script>

<Modal bind:open={isOpen} size="xl" class="!max-w-6xl">
    <div class="py-4 h-[600px] flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 pb-4 border-b border-gray-700">
            <div class="flex items-center gap-3">
                {#if step !== "class"}
                    <button onclick={goBack} class="text-gray-400 hover:text-white transition">
                        <ChevronLeftOutline class="w-5 h-5" />
                    </button>
                {/if}
                <div>
                    <h2 class="text-3xl font-bold">
                        {step === "class" ? "Select a Class" : step === "subclass" ? `${tempClass} Subclasses` : "Customize Your Class"}
                    </h2>
                    <p class="text-gray-400 text-sm mt-1">
                        {step === "class"
                            ? "Choose a class for your character. Each class determines your abilities, proficiencies, and combat style."
                            : step === "subclass"
                                ? "Select a subclass to define your character's specialization and unique features."
                                : "Choose your proficiencies, spells, and skills."}
                    </p>
                </div>
            </div>
        </div>

        <!-- Content Area: Two-Column Layout -->
        <div class="flex flex-1 overflow-hidden">
            <!-- LEFT SIDEBAR: List of Classes/Subclasses/Choice Tabs -->
            <div class="w-48 border-r border-gray-700 overflow-y-auto">
                {#if step === "class"}
                    {#each classList as classData}
                        <button
                                onclick={() => previewClass(classData.name)}
                                class={`w-full px-4 py-3 text-left transition-all border-l-4 ${
                                hoveredClass === classData.name
                                    ? "bg-opacity-20 border-sky-500 bg-gray-700"
                                    : "border-transparent hover:bg-gray-700 hover:bg-opacity-20"
                            }`}
                        >
                            <div class="flex items-center justify-between">
                                <span class="font-medium">{classData.name}</span>
                                {#if classData.subclasses && classData.subclasses.length > 0 && classData.subclassLevel === 1}
                                    <ChevronRightOutline class="w-4 h-4 text-gray-500" />
                                {/if}
                            </div>
                        </button>
                    {/each}
                {:else if step === "subclass" && tempClass}
                    {@const classData = classesData[tempClass]}
                    {@const subclasses = classData?.subclasses || []}
                    {#each subclasses as subclass}
                        <button
                                onclick={() => previewSubclass(subclass.name)}
                                class={`w-full px-4 py-3 text-left transition-all border-l-4 ${
                                tempSubclass === subclass.name
                                    ? "bg-opacity-20 border-sky-500 bg-gray-700"
                                    : "border-transparent hover:bg-gray-700 hover:bg-opacity-20"
                            }`}
                        >
                            <span class="font-medium">{subclass.name}</span>
                        </button>
                    {/each}
                {:else if step === "choices" && tempClass}
                    <!-- Choice category tabs -->
                    {#if hasTabChoices("skills")}
                        <button
                                onclick={() => (currentChoiceTab = "skills")}
                                class={`w-full px-4 py-3 text-left transition-all border-l-4 text-sm ${
                                currentChoiceTab === "skills"
                                    ? "bg-opacity-20 border-sky-500 bg-gray-700"
                                    : "border-transparent hover:bg-gray-700 hover:bg-opacity-20"
                            }`}
                        >
                            <div class="flex items-center justify-between">
                                <span class="font-medium">Skills</span>
                                <Badge color="blue" class="px-2 py-0 text-xs">{getSelectedCount("skills")}/{getMaxCount("skills")}</Badge>
                            </div>
                        </button>
                    {/if}
                    {#if hasTabChoices("tools")}
                        <button
                                onclick={() => (currentChoiceTab = "tools")}
                                class={`w-full px-4 py-3 text-left transition-all border-l-4 text-sm ${
                                currentChoiceTab === "tools"
                                    ? "bg-opacity-20 border-sky-500 bg-gray-700"
                                    : "border-transparent hover:bg-gray-700 hover:bg-opacity-20"
                            }`}
                        >
                            <div class="flex items-center justify-between">
                                <span class="font-medium">Tools</span>
                                <Badge color="blue" class="px-2 py-0 text-xs">{getSelectedCount("tools")}</Badge>
                            </div>
                        </button>
                    {/if}
                    {#if hasTabChoices("cantrips")}
                        <button
                                onclick={() => (currentChoiceTab = "cantrips")}
                                class={`w-full px-4 py-3 text-left transition-all border-l-4 text-sm ${
                                currentChoiceTab === "cantrips"
                                    ? "bg-opacity-20 border-sky-500 bg-gray-700"
                                    : "border-transparent hover:bg-gray-700 hover:bg-opacity-20"
                            }`}
                        >
                            <div class="flex items-center justify-between">
                                <span class="font-medium">Cantrips</span>
                                <Badge color="blue" class="px-2 py-0 text-xs">{getSelectedCount("cantrips")}/{getMaxCount("cantrips")}</Badge>
                            </div>
                        </button>
                    {/if}
                    {#if hasTabChoices("spells")}
                        <button
                                onclick={() => (currentChoiceTab = "spells")}
                                class={`w-full px-4 py-3 text-left transition-all border-l-4 text-sm ${
                                currentChoiceTab === "spells"
                                    ? "bg-opacity-20 border-sky-500 bg-gray-700"
                                    : "border-transparent hover:bg-gray-700 hover:bg-opacity-20"
                            }`}
                        >
                            <div class="flex items-center justify-between">
                                <span class="font-medium">Spells</span>
                                <Badge color="blue" class="px-2 py-0 text-xs">{getSelectedCount("spells")}/{getMaxCount("spells")}</Badge>
                            </div>
                        </button>
                    {/if}
                {/if}
            </div>

            <!-- RIGHT CONTENT AREA: Details Card -->
            <div class="relative flex-1 overflow-y-auto p-6">
                {#if step === "class"}
                    {@const currentClass = classList.find(c => c.name === hoveredClass)}
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
                            {#if (currentClass.spellsKnownAtLevel1 > 0 || currentClass.cantripsKnownAtLevel1 > 0) && currentClass.spellcastingAbility}
                                <div class="bg-purple-500 bg-opacity-20 border border-purple-500 rounded-lg p-3">
                                    <p class="text-sm text-gray-100">
                                        <span class="font-bold">Spellcasting:</span>
                                        {#if currentClass.cantripsKnownAtLevel1 > 0}
                                            <span> {currentClass.cantripsKnownAtLevel1} cantrips</span>
                                        {/if}
                                        {#if currentClass.spellsKnownAtLevel1 > 0}
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
                {:else if step === "subclass" && tempClass}
                    {@const classData = classesData[tempClass]}
                    {@const currentSubclass = classData?.subclasses?.find(s => s.name === tempSubclass)}
                    {#if currentSubclass}
                        <div class="space-y-6">
                            <!-- Subclass Name -->
                            <div>
                                <h3 class="text-2xl font-bold mb-2">{currentSubclass.name}</h3>
                                <p class="text-gray-300 text-sm">
                                    A specialized path within the {tempClass} class.
                                </p>
                            </div>

                            <!-- Subclass Features -->
                            {#if currentSubclass.features && currentSubclass.features.length > 0}
                                <div>
                                    <p class="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wide">Special Features</p>
                                    <div class="space-y-3">
                                        {#each currentSubclass.features as feature}
                                            <div class="bg-gray-700 bg-opacity-20 rounded-lg p-3">
                                                <div class="flex items-start justify-between gap-3">
                                                    <div class="flex-1">
                                                        <p class="text-sm font-bold text-white">{feature.name}</p>
                                                        <div class="flex items-center gap-2 mt-2">
                                                            <Badge color="blue">Level {feature.level}</Badge>
                                                        </div>
                                                    </div>
                                                    <Popover class="max-w-md p-3">
                                                        <RaceFeaturesCard feature={featuresMap[feature.name] || {
                                                            name: feature.name,
                                                            description: "Feature details not found",
                                                            icon: "⭐",
                                                            type: "passive"
                                                        }} />
                                                    </Popover>
                                                </div>
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {:else}
                        <div class="flex justify-center items-center h-full">
                            <p class="text-xl text-gray-400">Select a subclass to view additional information...</p>
                        </div>
                    {/if}
                {:else if step === "choices" && tempClass}
                    {@const classData = classesData[tempClass]}
                    <div class="space-y-4">
                        <!-- Dynamic content based on current tab -->
                        {#if currentChoiceTab === "skills"}
                            <div>
                                <h3 class="text-lg font-bold mb-1">Select Skills</h3>
                                <p class="text-xs text-gray-400 mb-4">
                                    Choose {classData.skillChoices} skill{classData.skillChoices !== 1 ? 's' : ''} ({selectedSkills.length}/{classData.skillChoices})
                                </p>
                                <div class="space-y-2">
                                    {#each getChoicesForTab("skills") as skill}
                                        <label class="flex items-center gap-3 p-3 bg-gray-700 bg-opacity-30 rounded cursor-pointer hover:bg-opacity-50 transition">
                                            <Checkbox
                                                    checked={selectedSkills.includes(skill)}
                                                    onchange={() => toggleSkill(skill)}
                                                    disabled={selectedSkills.length === classData.skillChoices && !selectedSkills.includes(skill)}
                                            />
                                            <span class="text-sm">{skill}</span>
                                        </label>
                                    {/each}
                                </div>
                            </div>
                        {:else if currentChoiceTab === "tools"}
                            <div>
                                <h3 class="text-lg font-bold mb-1">Select Tools</h3>
                                <p class="text-xs text-gray-400 mb-4">Choose your tool proficiencies</p>
                                <div class="space-y-2">
                                    {#each getChoicesForTab("tools") as tool}
                                        <label class="flex items-center gap-3 p-3 bg-gray-700 bg-opacity-30 rounded cursor-pointer hover:bg-opacity-50 transition">
                                            <Checkbox
                                                    checked={selectedTools.includes(tool)}
                                                    onchange={() => toggleTool(tool)}
                                            />
                                            <span class="text-sm">{tool}</span>
                                        </label>
                                    {/each}
                                </div>
                            </div>
                        {:else if currentChoiceTab === "cantrips"}
                            <div>
                                <h3 class="text-lg font-bold mb-1">Select Cantrips</h3>
                                <p class="text-xs text-gray-400 mb-4">
                                    Choose {classData.cantripsKnownAtLevel1} cantrip{classData.cantripsKnownAtLevel1 !== 1 ? 's' : ''} ({selectedCantrips.length}/{classData.cantripsKnownAtLevel1})
                                </p>
                                <div class="space-y-2">
                                    {#each getChoicesForTab("cantrips") as cantrip}
                                        <label class="flex items-center gap-3 p-3 bg-gray-700 bg-opacity-30 rounded cursor-pointer hover:bg-opacity-50 transition">
                                            <Checkbox
                                                    checked={selectedCantrips.includes(cantrip)}
                                                    onchange={() => toggleCantrip(cantrip)}
                                                    disabled={selectedCantrips.length === classData.cantripsKnownAtLevel1 && !selectedCantrips.includes(cantrip)}
                                            />
                                            <span class="text-sm">{cantrip}</span>
                                        </label>
                                    {/each}
                                </div>
                            </div>
                        {:else if currentChoiceTab === "spells"}
                            <div>
                                <h3 class="text-lg font-bold mb-1">Select Spells</h3>
                                <p class="text-xs text-gray-400 mb-4">
                                    Choose {classData.spellsKnownAtLevel1} spell{classData.spellsKnownAtLevel1 !== 1 ? 's' : ''} ({selectedSpells.length}/{classData.spellsKnownAtLevel1})
                                </p>
                                <div class="space-y-2">
                                    {#each getChoicesForTab("spells") as spell}
                                        <label class="flex items-center gap-3 p-3 bg-gray-700 bg-opacity-30 rounded cursor-pointer hover:bg-opacity-50 transition">
                                            <Checkbox
                                                    checked={selectedSpells.includes(spell)}
                                                    onchange={() => toggleSpell(spell)}
                                                    disabled={selectedSpells.length === classData.spellsKnownAtLevel1 && !selectedSpells.includes(spell)}
                                            />
                                            <span class="text-sm">{spell}</span>
                                        </label>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>

        <!-- Action buttons -->
        <div class="flex gap-3 justify-end pt-4 px-6 border-t border-gray-700">
            <Button onclick={() => (isOpen = false)} color="alternative">
                Cancel
            </Button>
            {#if step === "choices"}
                <Button onclick={goBack} color="alternative">
                    Back
                </Button>
            {/if}
            <GradientButton
                    onclick={() => {
                    if (step === "class") {
                        confirmClass();
                    } else if (step === "subclass") {
                        confirmSubclass();
                    } else if (step === "choices") {
                        confirmChoices();
                    }
                }}
                    disabled={
                    step === "class" ? !hoveredClass
                    : step === "subclass" ? !tempSubclass
                    : tempClass && classesData[tempClass].skillChoices > 0 ? selectedSkills.length !== classesData[tempClass].skillChoices
                    : false
                }
            >
                {step === "class" ? "Select Class" : step === "subclass" ? "Select Subclass" : "Confirm Choices"}
            </GradientButton>
        </div>
    </div>
</Modal>

<style>
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(139, 92, 246, 0.5);
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: rgba(139, 92, 246, 0.7);
    }
</style>
export interface CharacterProficiencies {
    [key: string]: {
        name: string;
        type: "skill" | "save" | "tool" | "weapon" | "armor";
        state: "none" | "proficiency" | "expertise";
    }
}

export const proficienciesList: CharacterProficiencies = {
    // ============ SKILLS (tied to Ability Scores) ============
    // Strength Skills
    Athletics: {
        name: "Athletics",
        type: "skill",
        state: "none",
    },

    // Dexterity Skills
    Acrobatics: {
        name: "Acrobatics",
        type: "skill",
        state: "none",
    },
    "Sleight of Hand": {
        name: "Sleight of Hand",
        type: "skill",
        state: "none",
    },
    Stealth: {
        name: "Stealth",
        type: "skill",
        state: "none",
    },

    // Intelligence Skills
    Arcana: {
        name: "Arcana",
        type: "skill",
        state: "none",
    },
    History: {
        name: "History",
        type: "skill",
        state: "none",
    },
    Investigation: {
        name: "Investigation",
        type: "skill",
        state: "none",
    },
    Nature: {
        name: "Nature",
        type: "skill",
        state: "none",
    },
    Religion: {
        name: "Religion",
        type: "skill",
        state: "none",
    },

    // Wisdom Skills
    "Animal Handling": {
        name: "Animal Handling",
        type: "skill",
        state: "none",
    },
    Insight: {
        name: "Insight",
        type: "skill",
        state: "none",
    },
    Medicine: {
        name: "Medicine",
        type: "skill",
        state: "none",
    },
    Perception: {
        name: "Perception",
        type: "skill",
        state: "none",
    },
    Survival: {
        name: "Survival",
        type: "skill",
        state: "none",
    },

    // Charisma Skills
    Deception: {
        name: "Deception",
        type: "skill",
        state: "none",
    },
    Intimidation: {
        name: "Intimidation",
        type: "skill",
        state: "none",
    },
    Performance: {
        name: "Performance",
        type: "skill",
        state: "none",
    },
    Persuasion: {
        name: "Persuasion",
        type: "skill",
        state: "none",
    },

    // ============ SAVING THROWS (tied to Ability Scores) ============
    "Strength Save": {
        name: "Strength Save",
        type: "save",
        state: "none",
    },
    "Dexterity Save": {
        name: "Dexterity Save",
        type: "save",
        state: "none",
    },
    "Constitution Save": {
        name: "Constitution Save",
        type: "save",
        state: "none",
    },
    "Intelligence Save": {
        name: "Intelligence Save",
        type: "save",
        state: "none",
    },
    "Wisdom Save": {
        name: "Wisdom Save",
        type: "save",
        state: "none",
    },
    "Charisma Save": {
        name: "Charisma Save",
        type: "save",
        state: "none",
    },

    // ============ TOOLS ============
    // Artisan's Tools
    "Alchemist's Supplies": {
        name: "Alchemist's Supplies",
        type: "tool",
        state: "none",
    },
    "Brewer's Supplies": {
        name: "Brewer's Supplies",
        type: "tool",
        state: "none",
    },
    "Calligrapher's Supplies": {
        name: "Calligrapher's Supplies",
        type: "tool",
        state: "none",
    },
    "Carpenter's Tools": {
        name: "Carpenter's Tools",
        type: "tool",
        state: "none",
    },
    "Cartographer's Tools": {
        name: "Cartographer's Tools",
        type: "tool",
        state: "none",
    },
    "Cobbler's Tools": {
        name: "Cobbler's Tools",
        type: "tool",
        state: "none",
    },
    "Cook's Utensils": {
        name: "Cook's Utensils",
        type: "tool",
        state: "none",
    },
    "Glassblower's Tools": {
        name: "Glassblower's Tools",
        type: "tool",
        state: "none",
    },
    "Jeweler's Tools": {
        name: "Jeweler's Tools",
        type: "tool",
        state: "none",
    },
    "Leatherworker's Tools": {
        name: "Leatherworker's Tools",
        type: "tool",
        state: "none",
    },
    "Mason's Tools": {
        name: "Mason's Tools",
        type: "tool",
        state: "none",
    },
    "Painter's Supplies": {
        name: "Painter's Supplies",
        type: "tool",
        state: "none",
    },
    "Potter's Tools": {
        name: "Potter's Tools",
        type: "tool",
        state: "none",
    },
    "Smith's Tools": {
        name: "Smith's Tools",
        type: "tool",
        state: "none",
    },
    "Tinker's Tools": {
        name: "Tinker's Tools",
        type: "tool",
        state: "none",
    },
    "Weaver's Tools": {
        name: "Weaver's Tools",
        type: "tool",
        state: "none",
    },
    "Woodcarver's Tools": {
        name: "Woodcarver's Tools",
        type: "tool",
        state: "none",
    },

    // Gaming Sets
    "Dice Set": {
        name: "Dice Set",
        type: "tool",
        state: "none",
    },
    "Dragonchess Set": {
        name: "Dragonchess Set",
        type: "tool",
        state: "none",
    },
    "Playing Card Set": {
        name: "Playing Card Set",
        type: "tool",
        state: "none",
    },
    "Three-Dragon Ante Set": {
        name: "Three-Dragon Ante Set",
        type: "tool",
        state: "none",
    },

    // Musical Instruments
    "Bagpipes": {
        name: "Bagpipes",
        type: "tool",
        state: "none",
    },
    "Drum": {
        name: "Drum",
        type: "tool",
        state: "none",
    },
    "Dulcimer": {
        name: "Dulcimer",
        type: "tool",
        state: "none",
    },
    "Flute": {
        name: "Flute",
        type: "tool",
        state: "none",
    },
    "Lute": {
        name: "Lute",
        type: "tool",
        state: "none",
    },
    "Lyre": {
        name: "Lyre",
        type: "tool",
        state: "none",
    },
    "Horn": {
        name: "Horn",
        type: "tool",
        state: "none",
    },
    "Pan Flute": {
        name: "Pan Flute",
        type: "tool",
        state: "none",
    },
    "Shawm": {
        name: "Shawm",
        type: "tool",
        state: "none",
    },
    "Viol": {
        name: "Viol",
        type: "tool",
        state: "none",
    },

    // Miscellaneous Tools
    "Disguise Kit": {
        name: "Disguise Kit",
        type: "tool",
        state: "none",
    },
    "Forgery Kit": {
        name: "Forgery Kit",
        type: "tool",
        state: "none",
    },
    "Herbalism Kit": {
        name: "Herbalism Kit",
        type: "tool",
        state: "none",
    },
    "Navigator's Tools": {
        name: "Navigator's Tools",
        type: "tool",
        state: "none",
    },
    "Poisoner's Kit": {
        name: "Poisoner's Kit",
        type: "tool",
        state: "none",
    },
    "Thieves' Tools": {
        name: "Thieves' Tools",
        type: "tool",
        state: "none",
    },
    "Vehicles (Land)": {
        name: "Vehicles (Land)",
        type: "tool",
        state: "none",
    },
    "Vehicles (Water)": {
        name: "Vehicles (Water)",
        type: "tool",
        state: "none",
    },

    // ============ WEAPONS ============
    // Simple Melee Weapons
    "Club": {
        name: "Club",
        type: "weapon",
        state: "none",
    },
    "Dagger": {
        name: "Dagger",
        type: "weapon",
        state: "none",
    },
    "Greatclub": {
        name: "Greatclub",
        type: "weapon",
        state: "none",
    },
    "Handaxe": {
        name: "Handaxe",
        type: "weapon",
        state: "none",
    },
    "Javelin": {
        name: "Javelin",
        type: "weapon",
        state: "none",
    },
    "Lighthammer": {
        name: "Lighthammer",
        type: "weapon",
        state: "none",
    },
    "Mace": {
        name: "Mace",
        type: "weapon",
        state: "none",
    },
    "Quarterstaff": {
        name: "Quarterstaff",
        type: "weapon",
        state: "none",
    },
    "Sickle": {
        name: "Sickle",
        type: "weapon",
        state: "none",
    },
    "Spear": {
        name: "Spear",
        type: "weapon",
        state: "none",
    },
    "Unarmed Strike": {
        name: "Unarmed Strike",
        type: "weapon",
        state: "none",
    },

    // Simple Ranged Weapons
    "Crossbow, Light": {
        name: "Crossbow, Light",
        type: "weapon",
        state: "none",
    },
    "Dart": {
        name: "Dart",
        type: "weapon",
        state: "none",
    },
    "Shortbow": {
        name: "Shortbow",
        type: "weapon",
        state: "none",
    },
    "Sling": {
        name: "Sling",
        type: "weapon",
        state: "none",
    },

    // Martial Melee Weapons
    "Battleaxe": {
        name: "Battleaxe",
        type: "weapon",
        state: "none",
    },
    "Flail": {
        name: "Flail",
        type: "weapon",
        state: "none",
    },
    "Glaive": {
        name: "Glaive",
        type: "weapon",
        state: "none",
    },
    "Greataxe": {
        name: "Greataxe",
        type: "weapon",
        state: "none",
    },
    "Greatsword": {
        name: "Greatsword",
        type: "weapon",
        state: "none",
    },
    "Halberd": {
        name: "Halberd",
        type: "weapon",
        state: "none",
    },
    "Lance": {
        name: "Lance",
        type: "weapon",
        state: "none",
    },
    "Longsword": {
        name: "Longsword",
        type: "weapon",
        state: "none",
    },
    "Maul": {
        name: "Maul",
        type: "weapon",
        state: "none",
    },
    "Morningstar": {
        name: "Morningstar",
        type: "weapon",
        state: "none",
    },
    "Pike": {
        name: "Pike",
        type: "weapon",
        state: "none",
    },
    "Rapier": {
        name: "Rapier",
        type: "weapon",
        state: "none",
    },
    "Scimitar": {
        name: "Scimitar",
        type: "weapon",
        state: "none",
    },
    "Shortsword": {
        name: "Shortsword",
        type: "weapon",
        state: "none",
    },
    "Warhammer": {
        name: "Warhammer",
        type: "weapon",
        state: "none",
    },
    "Warscythe": {
        name: "Warscythe",
        type: "weapon",
        state: "none",
    },
    "Whip": {
        name: "Whip",
        type: "weapon",
        state: "none",
    },

    // Martial Ranged Weapons
    "Blowgun": {
        name: "Blowgun",
        type: "weapon",
        state: "none",
    },
    "Crossbow, Hand": {
        name: "Crossbow, Hand",
        type: "weapon",
        state: "none",
    },
    "Crossbow, Heavy": {
        name: "Crossbow, Heavy",
        type: "weapon",
        state: "none",
    },
    "Longbow": {
        name: "Longbow",
        type: "weapon",
        state: "none",
    },
    "Net": {
        name: "Net",
        type: "weapon",
        state: "none",
    },

    // ============ ARMOR ============
    // Light Armor
    "Leather": {
        name: "Leather",
        type: "armor",
        state: "none",
    },
    "Padded": {
        name: "Padded",
        type: "armor",
        state: "none",
    },
    "Studded Leather": {
        name: "Studded Leather",
        type: "armor",
        state: "none",
    },

    // Medium Armor
    "Chain Mail": {
        name: "Chain Mail",
        type: "armor",
        state: "none",
    },
    "Chain Shirt": {
        name: "Chain Shirt",
        type: "armor",
        state: "none",
    },
    "Half Plate": {
        name: "Half Plate",
        type: "armor",
        state: "none",
    },
    "Hide": {
        name: "Hide",
        type: "armor",
        state: "none",
    },
    "Scale Mail": {
        name: "Scale Mail",
        type: "armor",
        state: "none",
    },

    // Heavy Armor
    "Plate": {
        name: "Plate",
        type: "armor",
        state: "none",
    },
    "Plate Armor": {
        name: "Plate Armor",
        type: "armor",
        state: "none",
    },
    "Splint": {
        name: "Splint",
        type: "armor",
        state: "none",
    },

    // Shields
    "Shield": {
        name: "Shield",
        type: "armor",
        state: "none",
    },
};

// ===== SKILL PROFICIENCIES =====
/**
 * All available D&D 5e skill proficiencies
 */
export const skillProficiencies = [
    "Acrobatics",
    "Animal Handling",
    "Arcana",
    "Athletics",
    "Deception",
    "History",
    "Insight",
    "Intimidation",
    "Investigation",
    "Medicine",
    "Nature",
    "Perception",
    "Performance",
    "Persuasion",
    "Religion",
    "Sleight of Hand",
    "Stealth",
    "Survival"
] as const;

export type SkillProficiency = typeof skillProficiencies[number];

// ===== TOOL PROFICIENCIES WITH CATEGORIES =====
export const toolsProficiencies = {
    "Artisan's Tools": [
        "Alchemist's Supplies",
        "Brewer's Supplies",
        "Calligrapher's Supplies",
        "Carpenter's Tools",
        "Cartographer's Tools",
        "Cobbler's Tools",
        "Cook's Utensils",
        "Glassblower's Tools",
        "Jeweler's Tools",
        "Leatherworker's Tools",
        "Mason's Tools",
        "Painter's Supplies",
        "Potter's Tools",
        "Smith's Tools",
        "Tinker's Tools",
        "Weaver's Tools",
        "Woodcarver's Tools"
    ] as const,
    "Musical Instruments": [
        "Bagpipes",
        "Drum",
        "Dulcimer",
        "Flute",
        "Lute",
        "Lyre",
        "Horn",
        "Pan Flute",
        "Shawm",
        "Viol"
    ] as const,
    "Gaming Sets": [
        "Dice Set",
        "Dragonchess Set",
        "Playing Card Set",
        "Three-Dragon Ante Set"
    ] as const,
    "Miscellaneous Tools": [
        "Disguise Kit",
        "Forgery Kit",
        "Herbalism Kit",
        "Navigator's Tools",
        "Poisoner's Kit",
        "Thieves' Tools",
        "Vehicles (Land)",
        "Vehicles (Water)"
    ] as const,
} as const;

export type ToolCategory = keyof typeof toolsProficiencies;
export type ToolName = typeof toolsProficiencies[ToolCategory][number];

// ===== UTILITY FUNCTIONS =====

/**
 * Get all available skill proficiencies
 * @returns Array of all skill proficiency names
 */
export function getAvailableSkillProficiencies(): SkillProficiency[] {
    return [...skillProficiencies];
}

/**
 * Get all available tool proficiencies
 * @returns Array of all tool names
 */
export function getAvailableToolsProficiencies(): ToolName[] {
    return Object.values(toolsProficiencies).flat() as ToolName[];
}

/**
 * Get tool proficiencies by category
 * @param category - The tool category
 * @returns Array of tool names in the category
 */
export function getToolsByCategory(category: ToolCategory): readonly ToolName[] {
    return toolsProficiencies[category];
}

/**
 * Get the category of a tool
 * @param toolName - The tool name
 * @returns The category of the tool, or null if not found
 */
export function getToolCategory(toolName: string): ToolCategory | null {
    for (const [category, tools] of Object.entries(toolsProficiencies)) {
        if ((tools as readonly string[]).includes(toolName)) {
            return category as ToolCategory;
        }
    }
    return null;
}

/**
 * Check if a skill is a valid skill proficiency
 * @param skill - The skill name to check
 * @returns Boolean indicating if the skill is valid
 */
export function isValidSkillProficiency(skill: string): skill is SkillProficiency {
    return skillProficiencies.includes(skill as SkillProficiency);
}

/**
 * Check if a tool is a valid tool proficiency
 * @param tool - The tool name to check
 * @returns Boolean indicating if the tool is valid
 */
export function isValidToolProficiency(tool: string): tool is ToolName {
    return getAvailableToolsProficiencies().includes(tool as ToolName);
}

/**
 * Get all tool categories
 * @returns Array of all tool category names
 */
export function getAllToolCategories(): ToolCategory[] {
    return Object.keys(toolsProficiencies) as ToolCategory[];
}

/**
 * Format tool proficiencies grouped by category
 * @param tools - Array of tool names
 * @returns Object with categories as keys and arrays of tools as values
 */
export function formatToolsByCategory(tools: string[]): Record<ToolCategory, ToolName[]> {
    const result: Record<ToolCategory, ToolName[]> = {
        "Artisan's Tools": [],
        "Musical Instruments": [],
        "Gaming Sets": [],
        "Miscellaneous Tools": []
    };

    tools.forEach(tool => {
        const category = getToolCategory(tool);
        if (category && isValidToolProficiency(tool)) {
            result[category].push(tool as ToolName);
        }
    });

    return result;
}

/**
 * Get all tools of multiple categories
 * @param categories - Array of tool categories
 * @returns Array of all tools in the specified categories
 */
export function getToolsFromCategories(categories: ToolCategory[]): ToolName[] {
    return categories.flatMap(category => toolsProficiencies[category] as unknown as ToolName[]);
}

/**
 * Check if proficiency is a tool proficiency
 * @param key - The proficiency key from proficienciesList
 * @returns Boolean indicating if the proficiency is a tool
 */
export function isToolProficiency(key: string): boolean {
    const prof = proficienciesList[key];
    return prof && prof.type === "tool";
}

/**
 * Get all active tool proficiencies from a character
 * @param profs - Character proficiencies object
 * @returns Array of active tool proficiency names
 */
export function getActiveToolProficiencies(profs: CharacterProficiencies): ToolName[] {
    return Object.entries(profs)
        .filter(([_, prof]) => prof.type === "tool" && prof.state !== "none")
        .map(([_, prof]) => prof.name as ToolName);
}

/**
 * Check if a character has a specific tool proficiency
 * @param profs - Character proficiencies object
 * @param toolName - The tool name to check
 * @returns Boolean indicating if the character has the proficiency
 */
export function hasToolProficiency(profs: CharacterProficiencies, toolName: ToolName): boolean {
    const prof = Object.values(profs).find(p => p.name === toolName && p.type === "tool");
    return prof ? prof.state !== "none" : false;
}

/**
 * Get all tools in a category
 * @param category - The tool category
 * @returns Array of tool names in the category
 */
export function getToolsInCategory(category: ToolCategory): ToolName[] {
    return [...toolsProficiencies[category]] as ToolName[];
}
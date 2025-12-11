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

export const toolsProficiencies = [
    "Alchemist's supplies",
    "Brewer's supplies",
    "Cartographer's tools",
    "Cook's utensils",
    "Glassblower's supplies",
    "Jeweler's tools",
    "Mason's tools",
    "Painter's supplies",
    "Poisoner's kit",
    "Ranger's tools",
    "Smith's tools",
    "Thieves' tools",
    "Vintner's tools"
]

export type SkillProficiency = typeof skillProficiencies[number];
export type ToolsProficiency = typeof toolsProficiencies[number];

/**
 * Get all available skill proficiencies
 * @returns Array of all skill proficiency names
 */
export function getAvailableSkillProficiencies(): SkillProficiency[] {
    return [...skillProficiencies];
}

/**
 * Get all available skill proficiencies
 * @returns Array of all skill proficiency names
 */
export function getAvailableToolsProficiencies(): ToolsProficiency[] {
    return [...toolsProficiencies];
}

/**
 * Check if a skill is a valid proficiency
 * @param skill - The skill name to check
 * @returns Boolean indicating if the skill is valid
 */
export function isValidSkillProficiency(skill: string): skill is SkillProficiency {
    return skillProficiencies.includes(skill as SkillProficiency);
}
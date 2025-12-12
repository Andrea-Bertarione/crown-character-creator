import type {ToolName} from "./proficiencies.data";
import type {SkillType} from "./features.data";

// ===== ABILITY SCORES =====
export type AbilityScore = "Strength" | "Dexterity" | "Constitution" | "Intelligence" | "Wisdom" | "Charisma";

// ===== ARMOR TYPES =====
export type ArmorType = "light" | "medium" | "heavy" | "shields";

// ===== WEAPON NAMES =====
export type WeaponName = string;

// ===== SPELL NAMES =====
export type SpellName = string;

// ===== SAVING THROW TYPES =====
export type SavingThrowType = "Strength" | "Dexterity" | "Constitution" | "Intelligence" | "Wisdom" | "Charisma";

// ===== MODIFIER TYPE DEFINITIONS =====

// Ability Score Modifier
export type AbilityScoreModifierValue =
    | { type: "fixed"; increment: number; ability: AbilityScore }
    | { type: "choice"; abilities: AbilityScore[] };

export interface AbilityScoreModifier {
    type: "ability-score";
    id: string;
    value: AbilityScoreModifierValue;
    description: string;
}

// Skill Proficiency Modifier
export type SkillProficiencyModifierValue =
    | { type: "fixed"; skill: SkillType; proficiency: "proficiency" | "expertise" }
    | { type: "choice"; skills: SkillType[]; proficiency: "proficiency" | "expertise" };

export interface SkillProficiencyModifier {
    type: "skill-proficiency";
    id: string;
    value: SkillProficiencyModifierValue;
    description: string;
}

// Tool Proficiency Modifier
export type ToolProficiencyModifierValue =
    | { type: "fixed"; tool: ToolName }
    | { type: "choice"; tools: ToolName[] };

export interface ToolProficiencyModifier {
    type: "tool-proficiency";
    id: string;
    value: ToolProficiencyModifierValue;
    description: string;
}

// Armor Proficiency Modifier
export type ArmorProficiencyModifierValue =
    | { type: "fixed"; armor: ArmorType | ArmorType[] }
    | { type: "choice"; armorTypes: ArmorType[] };

export interface ArmorProficiencyModifier {
    type: "armor-proficiency";
    id: string;
    value: ArmorProficiencyModifierValue;
    description: string;
}

// Weapon Proficiency Modifier
export type WeaponProficiencyModifierValue =
    | { type: "fixed"; weapons: WeaponName[] }
    | { type: "choice"; weapons: WeaponName[] };

export interface WeaponProficiencyModifier {
    type: "weapon-proficiency";
    id: string;
    value: WeaponProficiencyModifierValue;
    description: string;
}

// Spell Modifier
export type SpellModifierValue =
    | {
    type: "known-spells";
    spells: SpellName[];
    castPerRest?: number;
    requiresSlot?: boolean;
}
    | {
    type: "cantrips";
    cantrips: SpellName[];
}
    | {
    type: "choice";
    spellsPerLevel: Record<number, SpellName[]>;
    maxChoices: number;
};

export interface SpellModifier {
    type: "spell";
    id: string;
    value: SpellModifierValue;
    description: string;
}

// AC Bonus Modifier
export type ACBonusModifierValue =
    | { type: "fixed"; bonus: number; condition?: string }
    | { type: "proficiency-bonus"; condition?: string }
    | { type: "ability-modifier"; ability: AbilityScore; condition?: string };

export interface ACBonusModifier {
    type: "ac-bonus";
    id: string;
    value: ACBonusModifierValue;
    description: string;
}

// Speed Bonus Modifier
export type SpeedBonusModifierValue =
    | { type: "fixed"; feet: number }
    | { type: "conditional"; feet: number; condition: string };

export interface SpeedBonusModifier {
    type: "speed-bonus";
    id: string;
    value: SpeedBonusModifierValue;
    description: string;
}

// Saving Throw Proficiency Modifier
export type SavingThrowProficiencyModifierValue =
    | { type: "fixed"; savingThrow: SavingThrowType }
    | { type: "choice"; savingThrows: SavingThrowType[] };

export interface SavingThrowProficiencyModifier {
    type: "saving-throw-proficiency";
    id: string;
    value: SavingThrowProficiencyModifierValue;
    description: string;
}

// Feature Modifier
export interface FeatureModifier {
    type: "feature";
    id: string;
    value: {
        type: "feature";
        name: string;
        description: string;
        mechanicalEffect?: string;
    };
    description: string;
}

// Union Type
export type FeatModifier =
    | AbilityScoreModifier
    | SkillProficiencyModifier
    | ToolProficiencyModifier
    | ArmorProficiencyModifier
    | WeaponProficiencyModifier
    | SpellModifier
    | ACBonusModifier
    | SpeedBonusModifier
    | SavingThrowProficiencyModifier
    | FeatureModifier;

// ===== PREREQUISITE TYPES =====

export type PrerequisiteType =
    | AbilityScorePrerequisite
    | ProficiencyPrerequisite
    | SpellcastingPrerequisite
    | ArmorProficiencyPrerequisite
    | LevelPrerequisite
    | ClassPrerequisite;

export interface AbilityScorePrerequisite {
    type: "ability-score";
    ability: AbilityScore;
    minimum: number;
}

export interface ProficiencyPrerequisite {
    type: "proficiency";
    proficiency: string;
}

export interface SpellcastingPrerequisite {
    type: "spellcasting";
}

export interface ArmorProficiencyPrerequisite {
    type: "armor-proficiency";
    level: "light" | "medium" | "heavy";
}

export interface LevelPrerequisite {
    type: "level";
    minimum: number;
}

export interface ClassPrerequisite {
    type: "class";
    class: string;
}

// ===== CHARACTER FOR PREREQUISITE CHECK =====

export interface CharacterForPrerequisiteCheck {
    level: number;
    class?: string;
    abilityScores: {
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number;
        charisma: number;
    };
    proficiencies: {
        skills: string[];
        tools: string[];
        armor: ("light" | "medium" | "heavy")[];
    };
    hasSpellcasting: boolean;
    hasPactMagic?: boolean;
}

// ===== FEAT DATA =====

export interface FeatData {
    name: string;
    icon: string;
    description: string;
    prerequisites?: PrerequisiteType[];
    availableAt?: number;
    source?: string;
    modifiers?: FeatModifier[];
}

export type FeatName = string;

// ===== UTILITY FUNCTIONS =====

/**
 * Check if a modifier requires a choice from the user
 */
export function modifierRequiresChoice(modifier: FeatModifier): boolean {
    switch (modifier.type) {
        case "ability-score":
            return modifier.value.type === "choice";
        case "skill-proficiency":
            return modifier.value.type === "choice";
        case "tool-proficiency":
            return modifier.value.type === "choice";
        case "armor-proficiency":
            return modifier.value.type === "choice";
        case "weapon-proficiency":
            return modifier.value.type === "choice";
        case "spell":
            return modifier.value.type === "choice";
        case "saving-throw-proficiency":
            return modifier.value.type === "choice";
        default:
            return false;
    }
}

/**
 * Get available choices for a modifier
 */
export function getModifierChoices(modifier: FeatModifier): string[] {
    switch (modifier.type) {
        case "ability-score":
            return modifier.value.type === "choice" ? modifier.value.abilities : [];
        case "skill-proficiency":
            return modifier.value.type === "choice" ? modifier.value.skills : [];
        case "tool-proficiency":
            return modifier.value.type === "choice" ? modifier.value.tools : [];
        case "armor-proficiency":
            return modifier.value.type === "choice" ? modifier.value.armorTypes : [];
        case "weapon-proficiency":
            return modifier.value.type === "choice" ? modifier.value.weapons : [];
        case "spell":
            if (modifier.value.type === "choice") {
                return Object.values(modifier.value.spellsPerLevel).flat();
            }
            return [];
        case "saving-throw-proficiency":
            return modifier.value.type === "choice" ? modifier.value.savingThrows : [];
        default:
            return [];
    }
}

/**
 * Get human-readable text for a modifier
 */
export function getModifierDescription(modifier: FeatModifier): string {
    return modifier.description;
}

// ===== FEATS DATABASE =====

export const featsData: Record<FeatName, FeatData> = {
    // ===== BASIC FEATS (No Prerequisites) =====
    "Alert": {
        name: "Alert",
        icon: "🎯",
        description: "Always vigilant, you gain a +5 bonus to initiative rolls. Other creatures don't gain advantage on attack rolls against you as a result of being hidden from you.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                id: "alert-initiative",
                value: {
                    type: "feature",
                    name: "Alert",
                    description: "+5 bonus to initiative rolls"
                },
                description: "+5 bonus to initiative rolls"
            },
        ],
    },

    "Athlete": {
        name: "Athlete",
        icon: "💪",
        description: "You have undergone extensive physical training. Increase your Strength or Dexterity score by 1. You gain proficiency in one skill of your choice from the list: Acrobatics, Animal Handling, Athletics.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                id: "athlete-ability",
                value: {
                    type: "choice",
                    abilities: ["Strength", "Dexterity"]
                },
                description: "Increase Strength or Dexterity by 1"
            },
            {
                type: "skill-proficiency",
                id: "athlete-skill",
                value: {
                    type: "choice",
                    skills: ["Acrobatics", "Animal Handling", "Athletics"] as unknown as SkillType[],
                    proficiency: "proficiency"
                },
                description: "Choose one skill proficiency: Acrobatics, Animal Handling, or Athletics"
            },
        ],
    },

    "Charger": {
        name: "Charger",
        icon: "🐎",
        description: "When you use your action to Dash, you can use a bonus action to make one melee weapon attack or to shove a creature. If you move at least 5 feet in a straight line right before taking this attack or shove, you gain a +5 bonus to the attack's damage roll or the shove's attack roll.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                id: "charger-feature",
                value: {
                    type: "feature",
                    name: "Dash Bonus Action",
                    description: "Make a melee attack or shove as bonus action after Dash with +5 bonus"
                },
                description: "Make a melee attack or shove as bonus action after Dash with +5 bonus"
            },
        ],
    },

    "Dual Wielder": {
        name: "Dual Wielder",
        icon: "⚔️",
        description: "You master fighting with two weapons at once. While wielding a melee weapon in each hand, you gain +1 to AC. You can use two-weapon fighting even when the one-handed melee weapons aren't light. You can draw or stow two one-handed weapons when you would normally be able to draw or stow only one.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ac-bonus",
                id: "dual-wield-ac",
                value: {
                    type: "fixed",
                    bonus: 1,
                    condition: "when dual wielding"
                },
                description: "Gain +1 to AC while dual wielding"
            },
            {
                type: "feature",
                id: "dual-wield-feature",
                value: {
                    type: "feature",
                    name: "Dual Wielding",
                    description: "Can use two-weapon fighting with non-light weapons, dual draw/stow"
                },
                description: "Two-weapon fighting with non-light weapons, dual draw/stow"
            },
        ],
    },

    "Dungeon Delver": {
        name: "Dungeon Delver",
        icon: "🏔️",
        description: "Alert to the hidden traps and secret doors found in many dungeons, you gain advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to detect the presence of secret doors. You have advantage on saving throws made to avoid or resist traps. You have resistance to the damage dealt by traps. Traveling at a fast pace doesn't impose the normal -5 penalty on your Wisdom (Perception) checks.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                id: "dungeon-delver-feature",
                value: {
                    type: "feature",
                    name: "Dungeon Delver",
                    description: "Advantage on Perception/Investigation for secrets, advantage vs traps, trap damage resistance"
                },
                description: "Advantage on Perception/Investigation for secrets, advantage vs traps, trap damage resistance"
            },
        ],
    },

    "Durable": {
        name: "Durable",
        icon: "🛡️",
        description: "Hard to kill, you gain the following benefits. Increase your Constitution score by 1. When you roll hit dice to recover hit points, the minimum number of hit points you regain from each die is twice your Constitution modifier (minimum of 2).",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                id: "durable-con",
                value: {
                    type: "fixed",
                    increment: 1,
                    ability: "Constitution"
                },
                description: "Increase Constitution by 1"
            },
            {
                type: "feature",
                id: "durable-feature",
                value: {
                    type: "feature",
                    name: "Hit Die Bonus",
                    description: "Minimum HP regain from hit dice is 2x CON modifier (min 2)"
                },
                description: "Minimum HP regain from hit dice is 2x CON modifier (min 2)"
            },
        ],
    },

    "Fey Touched": {
        name: "Fey Touched",
        icon: "🧚",
        description: "Your exposure to the Feywild's magic grants you the following benefits. Increase one ability score of your choice by 1, to a maximum of 20. You learn the misty step spell and can cast it without expending a spell slot once, and you regain the ability to do so when you finish a short or long rest.",
        prerequisites: [],
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "ability-score",
                id: "fey-touched-ability",
                value: {
                    type: "choice",
                    abilities: ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]
                },
                description: "Increase any ability score by 1"
            },
            {
                type: "spell",
                id: "fey-touched-spell",
                value: {
                    type: "known-spells",
                    spells: ["Misty Step"],
                    castPerRest: 1
                },
                description: "Learn Misty Step, can cast once per rest without expending a spell slot"
            },
        ],
    },

    "Keen Mind": {
        name: "Keen Mind",
        icon: "🧩",
        description: "You have a mind that can track time, direction, and detail with uncanny precision. Increase your Intelligence score by 1. You always know which direction is north. You always know the number of hours left before the next sunrise or sunset. You can accurately recall anything you have seen or heard within the past month.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                id: "keen-mind-int",
                value: {
                    type: "fixed",
                    increment: 1,
                    ability: "Intelligence"
                },
                description: "Increase Intelligence by 1"
            },
            {
                type: "feature",
                id: "keen-mind-feature",
                value: {
                    type: "feature",
                    name: "Perfect Recall",
                    description: "Perfect recall of past month, always know direction and time"
                },
                description: "Perfect recall of past month, always know direction and time"
            },
        ],
    },

    "Lucky": {
        name: "Lucky",
        icon: "🍀",
        description: "You have inexplicable luck that seems to kick in when you need it most. You gain 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20 and choose which of the d20s is used. Once you finish a long rest, you regain all spent luck points.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                id: "lucky-feature",
                value: {
                    type: "feature",
                    name: "Luck Points",
                    description: "3 luck points, regain on long rest, reroll d20s"
                },
                description: "3 luck points, regain on long rest, reroll d20s"
            },
        ],
    },

    "Magic Initiate": {
        name: "Magic Initiate",
        icon: "📖",
        description: "Choose a class: bard, cleric, druid, sorcerer, warlock, or wizard. You learn two cantrips of your choice from that class's spell list. In addition, choose one 1st-level spell from that same list. You learn that spell and can cast it at its lowest level.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "spell",
                id: "magic-initiate-spell",
                value: {
                    type: "choice",
                    spellsPerLevel: {
                        0: ["Fire Bolt", "Mage Hand", "Prestidigitation", "Ray of Frost"],
                        1: ["Magic Missile", "Shield", "Sleep", "Cure Wounds"]
                    },
                    maxChoices: 3
                },
                description: "Choose a spellcasting class for cantrips and 1st-level spell"
            },
        ],
    },

    "Observant": {
        name: "Observant",
        icon: "👁️",
        description: "Quick to notice details of your environment, you gain the following benefits. Increase your Intelligence or Wisdom score by 1. If you can see a creature's mouth while it is speaking a language you understand, you can interpret what it's saying by reading its lips. You have a +5 bonus to your passive Wisdom (Perception) and passive Intelligence (Investigation) scores.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                id: "observant-ability",
                value: {
                    type: "choice",
                    abilities: ["Intelligence", "Wisdom"]
                },
                description: "Increase Intelligence or Wisdom by 1"
            },
            {
                type: "feature",
                id: "observant-feature",
                value: {
                    type: "feature",
                    name: "Lip Reading",
                    description: "+5 bonus to passive Perception/Investigation, can read lips"
                },
                description: "+5 bonus to passive Perception/Investigation, can read lips"
            },
        ],
    },

    "Polearm Master": {
        name: "Polearm Master",
        icon: "🔱",
        description: "You can keep your enemies at bay with reach weapons. When you take the Attack action and attack with only a glaive, halberd, pike, or quarterstaff, you can use a bonus action to make a melee attack with the opposite end of the weapon. The weapon's damage die for this attack is a d4, and the attack deals bludgeoning damage. While you are wielding a glaive, halberd, pike, quarterstaff, or spear, other creatures provoke an opportunity attack from you when they enter your reach.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                id: "polearm-master-feature",
                value: {
                    type: "feature",
                    name: "Reach Combat",
                    description: "Bonus action melee with opposite end of polearm, opportunity attacks on enter reach"
                },
                description: "Bonus action melee with opposite end of polearm, opportunity attacks on enter reach"
            },
        ],
    },

    "Resilient": {
        name: "Resilient",
        icon: "💎",
        description: "Choose one ability score. You gain the following benefits. Increase the chosen ability score by 1, to a maximum of 20. You gain proficiency in saving throws using the chosen ability.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                id: "resilient-ability",
                value: {
                    type: "choice",
                    abilities: ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]
                },
                description: "Increase chosen ability by 1"
            },
            {
                type: "saving-throw-proficiency",
                id: "resilient-save",
                value: {
                    type: "choice",
                    savingThrows: ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]
                },
                description: "Gain proficiency in chosen saving throw"
            },
        ],
    },

    "Sentinel": {
        name: "Sentinel",
        icon: "🛡️",
        description: "You have mastered melee weaponry and the art of combat. When a hostile creature's turn ends, you can use your reaction to make a melee weapon attack against that creature if it is within your reach and you haven't already acted this turn. When a creature makes an attack roll against you, you can use your reaction to make a melee weapon attack against that creature if it is within your reach. You have advantage on opportunity attacks against a creature that is moving away from you.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                id: "sentinel-feature",
                value: {
                    type: "feature",
                    name: "Sentinel Actions",
                    description: "Reaction attacks when enemies turn ends, make attack rolls, advantage vs moving enemies"
                },
                description: "Reaction attacks when enemies turn ends, make attack rolls, advantage vs moving enemies"
            },
        ],
    },

    "Sharpshooter": {
        name: "Sharpshooter",
        icon: "🏹",
        description: "You have mastered ranged weapons and can make shots that others find impossible. Attacking at long range doesn't impose disadvantage on your ranged weapon attack rolls. Your ranged weapon attacks ignore half cover and three-quarters cover. You can use a bonus action to make one ranged weapon attack as long as you've used your action to attack with a ranged weapon this turn.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                id: "sharpshooter-feature",
                value: {
                    type: "feature",
                    name: "Ranged Mastery",
                    description: "No disadvantage at long range, ignore cover, bonus action ranged attack"
                },
                description: "No disadvantage at long range, ignore cover, bonus action ranged attack"
            },
        ],
    },

    "Telepathic": {
        name: "Telepathic",
        icon: "🧠",
        description: "You awaken the telepathic power within yourself. Increase one ability score of your choice by 1, to a maximum of 20. You can speak telepathically to any creature you can see within 60 feet of you. Your telepathic utterances are in a language you know, and the creature understands you only if it shares a language with you. The creature can respond telepathically only if it wants to.",
        prerequisites: [],
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "ability-score",
                id: "telepathic-ability",
                value: {
                    type: "choice",
                    abilities: ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]
                },
                description: "Increase any ability score by 1"
            },
            {
                type: "feature",
                id: "telepathic-feature",
                value: {
                    type: "feature",
                    name: "Telepathy",
                    description: "Telepathically communicate within 60 feet"
                },
                description: "Telepathically communicate within 60 feet"
            },
        ],
    },

    "Actor": {
        name: "Actor",
        icon: "🎭",
        description: "Skilled at mimicry and performance, you gain the following benefits. Increase your Charisma score by 1. You have advantage on Charisma (Deception) and Charisma (Performance) checks when trying to act in character. You can mimic the speech of another person or the sounds made by other creatures. You must have heard the person speaking, or heard the creature make the sound, for at least 1 minute.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                id: "actor-cha",
                value: {
                    type: "fixed",
                    increment: 1,
                    ability: "Charisma"
                },
                description: "Increase Charisma by 1"
            },
            {
                type: "feature",
                id: "actor-feature",
                value: {
                    type: "feature",
                    name: "Mimicry",
                    description: "Advantage on Deception/Performance, can mimic speech"
                },
                description: "Advantage on Deception/Performance, can mimic speech"
            },
        ],
    },

    "Mobile": {
        name: "Mobile",
        icon: "💨",
        description: "You are exceptionally speedy and agile. Your speed increases by 10 feet. When you use the Dash action, difficult terrain doesn't cost you extra movement on that turn. When you make a melee attack against a creature, you don't provoke opportunity attacks from that creature until the end of your next turn.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "speed-bonus",
                id: "mobile-speed",
                value: {
                    type: "fixed",
                    feet: 10
                },
                description: "Speed +10 feet"
            },
            {
                type: "feature",
                id: "mobile-feature",
                value: {
                    type: "feature",
                    name: "Mobility",
                    description: "Dash ignores difficult terrain, no opportunity attacks after melee attack"
                },
                description: "Dash ignores difficult terrain, no opportunity attacks after melee attack"
            },
        ],
    },

    "Great Weapon Master": {
        name: "Great Weapon Master",
        icon: "⚒️",
        description: "You've learned to put the weight of a weapon to your advantage, letting its momentum empower your strikes. On your turn, when you score a critical hit with a melee weapon or reduce a creature to 0 hit points with one, you can make one melee weapon attack as a bonus action. Before you make a melee attack with a heavy weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                id: "great-weapon-master-feature",
                value: {
                    type: "feature",
                    name: "Heavy Weapons",
                    description: "Bonus action attack on crit or kill, -5/+10 damage option with heavy weapons"
                },
                description: "Bonus action attack on crit or kill, -5/+10 damage option with heavy weapons"
            },
        ],
    },

    "Crusher": {
        name: "Crusher",
        icon: "💥",
        description: "You are practiced in the art of crushing your foes, using the blunt force of a weapon to break bones and the life from your enemies' bodies. Increase your Strength or Constitution by 1, to a maximum of 20. Once per turn, when you hit a creature with an attack that deals bludgeoning damage, you can move it 5 feet to an unoccupied space, provided the target is no more than one size larger than you. When you score a critical hit that deals bludgeoning damage to a creature, attack rolls against that creature are made with advantage until the end of your next turn.",
        prerequisites: [],
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "ability-score",
                id: "crusher-ability",
                value: {
                    type: "choice",
                    abilities: ["Strength", "Constitution"]
                },
                description: "Increase Strength or Constitution by 1"
            },
            {
                type: "feature",
                id: "crusher-feature",
                value: {
                    type: "feature",
                    name: "Bludgeoning Mastery",
                    description: "Move creatures with bludgeoning hits, advantage after critical hits"
                },
                description: "Move creatures with bludgeoning hits, advantage after critical hits"
            },
        ],
    },

    "Piercer": {
        name: "Piercer",
        icon: "🗡️",
        description: "You have learned to use piercing weapons in critical moments. Increase your Strength or Dexterity by 1, to a maximum of 20. Once per turn, when you hit a creature with a weapon attack that deals piercing damage, you can reroll one of the attack's damage dice and must use the new roll. When you score a critical hit that deals piercing damage to a creature, you roll one additional damage die for the attack.",
        prerequisites: [],
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "ability-score",
                id: "piercer-ability",
                value: {
                    type: "choice",
                    abilities: ["Strength", "Dexterity"]
                },
                description: "Increase Strength or Dexterity by 1"
            },
            {
                type: "feature",
                id: "piercer-feature",
                value: {
                    type: "feature",
                    name: "Piercing Mastery",
                    description: "Reroll piercing damage dice once per turn, extra die on critical hits"
                },
                description: "Reroll piercing damage dice once per turn, extra die on critical hits"
            },
        ],
    },

    "Slasher": {
        name: "Slasher",
        icon: "🩸",
        description: "You've learned where to cut to have the greatest effect on slashing attacks. Increase your Strength or Dexterity by 1, to a maximum of 20. Once per turn when you hit a creature with an attack that deals slashing damage, you can reduce the speed of the target by 10 feet until the start of your next turn. When you score a critical hit that deals slashing damage to a creature, it has disadvantage on attack rolls until the start of your next turn.",
        prerequisites: [],
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "ability-score",
                id: "slasher-ability",
                value: {
                    type: "choice",
                    abilities: ["Strength", "Dexterity"]
                },
                description: "Increase Strength or Dexterity by 1"
            },
            {
                type: "feature",
                id: "slasher-feature",
                value: {
                    type: "feature",
                    name: "Slashing Mastery",
                    description: "Reduce speed on slashing hits, disadvantage after critical hits"
                },
                description: "Reduce speed on slashing hits, disadvantage after critical hits"
            },
        ],
    },

    // ===== FEATS WITH ABILITY PREREQUISITES =====
    "Defensive Duelist": {
        name: "Defensive Duelist",
        icon: "🤺",
        description: "When you are wielding a finesse weapon with which you are proficient and another creature hits you with a melee attack, you can use your reaction to add your proficiency bonus to your AC for that attack, potentially causing the attack to miss you.",
        prerequisites: [
            { type: "ability-score", ability: "Dexterity", minimum: 13 },
        ],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ac-bonus",
                id: "defensive-duelist-ac",
                value: {
                    type: "proficiency-bonus",
                    condition: "when wielding finesse weapon"
                },
                description: "Add proficiency bonus to AC as reaction when wielding finesse weapon"
            },
        ],
    },

    "Inspiring Leader": {
        name: "Inspiring Leader",
        icon: "👑",
        description: "You can spend 10 minutes inspiring your companions, shoring up their resolve to fight. When you do so, choose up to six friendly creatures (which can include yourself) within 30 feet of you who can see or hear you and who can understand you. Each creature can gain temporary hit points equal to your level plus your Charisma modifier.",
        prerequisites: [
            { type: "ability-score", ability: "Charisma", minimum: 13 },
        ],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                id: "inspiring-leader-feature",
                value: {
                    type: "feature",
                    name: "Inspiring Words",
                    description: "Grant temp HP equal to level + CHA modifier to up to 6 creatures"
                },
                description: "Grant temp HP equal to level + CHA modifier to up to 6 creatures"
            },
        ],
    },

    "Crossbow Expert": {
        name: "Crossbow Expert",
        icon: "🏹",
        description: "You are an expert with hand crossbows and crossbows. You ignore the loading quality of crossbows with which you are proficient. Being within 5 feet of a hostile creature doesn't impose disadvantage on your ranged attack rolls. When you use the Attack action and attack with a one-handed weapon, you can use a bonus action to attack with a loaded hand crossbow you are holding.",
        prerequisites: [
            { type: "ability-score", ability: "Dexterity", minimum: 13 },
        ],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "weapon-proficiency",
                id: "crossbow-expert-weapon",
                value: {
                    type: "fixed",
                    weapons: ["Hand Crossbow", "Crossbow"]
                },
                description: "Proficiency with hand crossbows and crossbows, loading ignored, no disadvantage in close range"
            },
            {
                type: "feature",
                id: "crossbow-expert-feature",
                value: {
                    type: "feature",
                    name: "Crossbow Expert",
                    description: "Bonus action hand crossbow attack when using Attack action with one-handed weapon"
                },
                description: "Bonus action hand crossbow attack when using Attack action with one-handed weapon"
            },
        ],
    },

    "Grappler": {
        name: "Grappler",
        icon: "🤼",
        description: "You've developed the skills necessary to effectively and efficiently grapple creatures. Increase your Strength or Dexterity score by 1, to a maximum of 20. Creatures that are grappled by you don't benefit from any speed that requires a speed, as you form a tether between the wrestler and the grappled creature. You have advantage on attack rolls against a creature grappled by you.",
        prerequisites: [
            { type: "ability-score", ability: "Strength", minimum: 13 },
        ],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                id: "grappler-ability",
                value: {
                    type: "choice",
                    abilities: ["Strength", "Dexterity"]
                },
                description: "Increase Strength or Dexterity by 1"
            },
            {
                type: "feature",
                id: "grappler-feature",
                value: {
                    type: "feature",
                    name: "Grappling Mastery",
                    description: "Advantage on attacks vs grappled creatures, grappled creatures can't use extra speed"
                },
                description: "Advantage on attacks vs grappled creatures, grappled creatures can't use extra speed"
            },
        ],
    },

    // ===== FEATS WITH SPELLCASTING PREREQUISITES =====
    "Eldritch Adept": {
        name: "Eldritch Adept",
        icon: "✨",
        description: "You have learned some of the magic from eldritch invocations. Choose one invocation from the warlock class that is available to you (the invocations known by warlocks of your level or lower and that don't require a higher level of Eldritch Blast than you can cast). If the invocation has a prerequisite, you can choose that invocation only if you're a warlock and only if you meet the prerequisite.",
        prerequisites: [
            { type: "spellcasting" },
        ],
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "feature",
                id: "eldritch-adept-feature",
                value: {
                    type: "feature",
                    name: "Eldritch Invocation",
                    description: "Choose one warlock invocation",
                    mechanicalEffect: "Choose from: Agonizing Blast, One with Shadows, Mask of Many Faces, Devil's Sight, Eldritch Sight"
                },
                description: "Choose one warlock invocation (DM determines available invocations)"
            },
        ],
    },

    "War Caster": {
        name: "War Caster",
        icon: "⚡",
        description: "You have practiced casting spells in the midst of combat, learning techniques that grant you the following benefits. You have advantage on Constitution saving throws that you make to maintain your concentration on a spell when you take damage. You can perform the somatic and verbal components of spells even when you have weapons or a shield in one or both hands. When a hostile creature provokes an opportunity attack from you by leaving your reach, you can use your reaction to cast a spell at that creature, rather than making an opportunity attack, if the spell has a casting time of 1 action and targets only that creature.",
        prerequisites: [
            { type: "spellcasting" },
        ],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                id: "war-caster-feature",
                value: {
                    type: "feature",
                    name: "War Caster",
                    description: "Advantage on concentration saves, somatic components with weapons, reaction spell cast on opportunity",
                    mechanicalEffect: "Advantage on CON saves for concentration. Can cast somatic components with weapons/shields. Can cast action spells as reactions on opportunity attacks."
                },
                description: "Advantage on concentration saves, can cast with weapons, reaction spells on opportunity attacks"
            },
        ],
    },

    // ===== FEATS WITH ARMOR PROFICIENCY PREREQUISITES =====
    "Heavy Armor Master": {
        name: "Heavy Armor Master",
        icon: "🏰",
        description: "You can use your armor to deflect strikes that would kill others. Increase your Strength score by 1, to a maximum of 20. While you are wearing heavy armor, bludgeoning, piercing, and slashing damage that you take from non-magical weapons is reduced by 3.",
        prerequisites: [
            { type: "armor-proficiency", level: "heavy" },
        ],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                id: "heavy-armor-master-str",
                value: {
                    type: "fixed",
                    increment: 1,
                    ability: "Strength"
                },
                description: "Increase Strength by 1"
            },
            {
                type: "feature",
                id: "heavy-armor-master-feature",
                value: {
                    type: "feature",
                    name: "Armor Mastery",
                    description: "Reduce BPS damage from non-magical weapons by 3 when wearing heavy armor"
                },
                description: "Reduce BPS damage from non-magical weapons by 3 when wearing heavy armor"
            },
        ],
    },

    "Moderately Armored": {
        name: "Moderately Armored",
        icon: "🛡️",
        description: "You have some training with armored combat. You gain proficiency with medium armor and shields. Increase your Strength or Dexterity score by 1.",
        prerequisites: [
            { type: "armor-proficiency", level: "light" },
        ],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                id: "moderately-armored-ability",
                value: {
                    type: "choice",
                    abilities: ["Strength", "Dexterity"]
                },
                description: "Increase Strength or Dexterity by 1"
            },
            {
                type: "armor-proficiency",
                id: "moderately-armored-armor",
                value: {
                    type: "fixed",
                    armor: ["medium", "shields"]
                },
                description: "Gain proficiency with medium armor and shields"
            },
        ],
    },

    "Lightly Armored": {
        name: "Lightly Armored",
        icon: "🧥",
        description: "You have trained to lightly armor yourself for adventuring. You gain proficiency with light armor. Increase your Strength or Dexterity score by 1, to a maximum of 20.",
        prerequisites: [],
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                id: "lightly-armored-ability",
                value: {
                    type: "choice",
                    abilities: ["Strength", "Dexterity"]
                },
                description: "Increase Strength or Dexterity by 1"
            },
            {
                type: "armor-proficiency",
                id: "lightly-armored-armor",
                value: {
                    type: "fixed",
                    armor: "light"
                },
                description: "Gain proficiency with light armor"
            },
        ],
    },

    // ===== ADDITIONAL FEATS FROM TASHA'S =====
    "Artificer Initiate": {
        name: "Artificer Initiate",
        icon: "🔧",
        description: "You've studied the magical theory of artificers and learned how to cast some of their spells. You learn two cantrips of your choice from the artificer spell list. Whenever you gain a level, you can replace one of these cantrips with another cantrip from the artificer spell list. You learn one 1st-level artificer spell of your choice and can cast it without expending a spell slot once, and you regain the ability to do so when you finish a long rest.",
        prerequisites: [],
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "spell",
                id: "artificer-initiate-cantrips",
                value: {
                    type: "cantrips",
                    cantrips: ["Mending", "Mage Hand", "Prestidigitation"]
                },
                description: "Learn 2 artificer cantrips"
            },
            {
                type: "spell",
                id: "artificer-initiate-spell",
                value: {
                    type: "known-spells",
                    spells: ["Identify"],
                    castPerRest: 1
                },
                description: "Learn one 1st-level artificer spell, cast once per rest"
            },
        ],
    },

    "Chef": {
        name: "Chef",
        icon: "👨‍🍳",
        description: "You have some experience in cooking and are proficient with cook's utensils. As part of a short rest, you can cook special food with a DC 10 Wisdom (Survival) check. The food spoils if uneaten after 12 hours. For every 4 points by which your check total exceeds 10, you make enough food to nourish one additional creature. The food restores 1d8 + your proficiency bonus hit points to each creature that eats it.",
        prerequisites: [],
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "ability-score",
                id: "chef-ability",
                value: {
                    type: "choice",
                    abilities: ["Constitution", "Wisdom"]
                },
                description: "Increase Constitution or Wisdom by 1"
            },
            {
                type: "tool-proficiency",
                id: "chef-tool",
                value: {
                    type: "fixed",
                    tool: "Cook's Utensils"
                },
                description: "Proficiency with cook's utensils"
            },
            {
                type: "feature",
                id: "chef-feature",
                value: {
                    type: "feature",
                    name: "Healing Meals",
                    description: "Cook meals that restore 1d8 + proficiency bonus HP during short rest"
                },
                description: "Cook meals that restore 1d8 + proficiency bonus HP during short rest"
            },
        ],
    },

    "Gunner": {
        name: "Gunner",
        icon: "🔫",
        description: "You have a quick hand and excellent aim with firearms. Increase your Dexterity score by 1, to a maximum of 20. You gain proficiency with firearms. You don't have disadvantage when making a ranged attack roll with a firearm while you are within 5 feet of a hostile creature. Reload times don't require an action to satisfy the ammunition property of a firearm.",
        prerequisites: [],
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "ability-score",
                id: "gunner-dex",
                value: {
                    type: "fixed",
                    increment: 1,
                    ability: "Dexterity"
                },
                description: "Increase Dexterity by 1"
            },
            {
                type: "weapon-proficiency",
                id: "gunner-weapon",
                value: {
                    type: "fixed",
                    weapons: ["Firearms"]
                },
                description: "Proficiency with firearms, no disadvantage in melee range, reloading doesn't use action"
            },
        ],
    },

    "Telekinetic": {
        name: "Telekinetic",
        icon: "🧲",
        description: "You awaken the latent telekinetic power within yourself. Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20. You learn the mage hand cantrip. If you already know this cantrip, you learn a different sorcerer cantrip of your choice. When you cast mage hand, you can make the spectral hand invisible, and you can move it up to 30 feet away from you.",
        prerequisites: [],
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "ability-score",
                id: "telekinetic-ability",
                value: {
                    type: "choice",
                    abilities: ["Intelligence", "Wisdom", "Charisma"]
                },
                description: "Increase Intelligence, Wisdom, or Charisma by 1"
            },
            {
                type: "spell",
                id: "telekinetic-cantrip",
                value: {
                    type: "cantrips",
                    cantrips: ["Mage Hand"]
                },
                description: "Learn Mage Hand with invisible spectral hand"
            },
            {
                type: "feature",
                id: "telekinetic-feature",
                value: {
                    type: "feature",
                    name: "Telekinetic Shove",
                    description: "Can shove creatures telekinetically as bonus action within 30 feet"
                },
                description: "Can shove creatures telekinetically as bonus action within 30 feet"
            },
        ],
    },

    "Shadow Touched": {
        name: "Shadow Touched",
        icon: "🌑",
        description: "Your exposure to the Shadow Fey and the Shadowfell grants you the following benefits. Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20. You learn the invisibility spell and one 1st-level spell of your choice. The 1st-level spell must be from the Necromancy or Illusion school. You can cast each of these spells without expending a spell slot once, and you regain the ability to do so when you finish a long rest.",
        prerequisites: [],
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "ability-score",
                id: "shadow-touched-ability",
                value: {
                    type: "choice",
                    abilities: ["Intelligence", "Wisdom", "Charisma"]
                },
                description: "Increase Intelligence, Wisdom, or Charisma by 1"
            },
            {
                type: "spell",
                id: "shadow-touched-spell",
                value: {
                    type: "known-spells",
                    spells: ["Invisibility"],
                    castPerRest: 1
                },
                description: "Learn Invisibility, cast once per rest"
            },
            {
                type: "feature",
                id: "shadow-touched-feature",
                value: {
                    type: "feature",
                    name: "Shadow Magic",
                    description: "Learn one 1st-level Necromancy or Illusion spell, cast once per rest"
                },
                description: "Learn one 1st-level Necromancy or Illusion spell, cast once per rest"
            },
        ],
    },

    "Skill Expert": {
        name: "Skill Expert",
        icon: "📚",
        description: "You have honed your proficiency with particular skills, granting you the following benefits. Increase one ability score of your choice by 1, to a maximum of 20. You gain proficiency in one skill of your choice. If you already have proficiency in the chosen skill, you instead gain expertise in that skill.",
        prerequisites: [],
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "ability-score",
                id: "skill-expert-ability",
                value: {
                    type: "choice",
                    abilities: ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]
                },
                description: "Increase any ability score by 1"
            },
            {
                type: "skill-proficiency",
                id: "skill-expert-skill",
                value: {
                    type: "choice",
                    skills: ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"] as unknown as SkillType[],
                    proficiency: "proficiency"
                },
                description: "Choose one skill for proficiency or expertise"
            },
        ],
    },
};

export default featsData;

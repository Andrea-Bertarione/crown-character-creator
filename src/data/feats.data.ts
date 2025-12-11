import type { CharacterRace } from "./races.data";

export interface FeatModifier {
    type: "ability-score" | "proficiency" | "skill-proficiency" | "tool-proficiency" | "spell" | "feature" | "ac-bonus" | "speed-bonus";
    value: string | number | "choice"; // "choice" means player selects from options
    options?: string[]; // For choice type modifiers
    description?: string;
}

export interface FeatData {
    name: string;
    icon: string;
    description: string;
    prerequisites?: string;
    availableAt?: number; // Character level when feat becomes available
    source?: string; // D&D source book
    modifiers?: FeatModifier[]; // Effects/choices granted by the feat
}

export type FeatName = string;

/**
 * Comprehensive D&D 5e feats database
 * Add more feats as needed for your character creation
 */
export const featsData: Record<FeatName, FeatData> = {
    // BASIC FEATS
    "Alert": {
        name: "Alert",
        icon: "🎯",
        description: "Always vigilant, you gain a +5 bonus to initiative. Other creatures don't gain advantage on attack rolls against you as a result of being hidden from you.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                value: "Initiative Bonus",
                description: "+5 bonus to initiative"
            }
        ]
    },
    "Athlete": {
        name: "Athlete",
        icon: "💪",
        description: "You have undergone extensive physical training. Increase your Strength or Dexterity score by 1. You gain proficiency in one skill of your choice from the list: Acrobatics, Animal Handling, Athletics.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                value: "choice",
                options: ["Strength", "Dexterity"],
                description: "Increase by 1"
            },
            {
                type: "skill-proficiency",
                value: "choice",
                options: ["Acrobatics", "Animal Handling", "Athletics"],
                description: "Choose one skill proficiency"
            }
        ]
    },
    "Charger": {
        name: "Charger",
        icon: "🐎",
        description: "When you use your action to Dash, you can use a bonus action to make one melee weapon attack or to shove a creature. If you move at least 5 feet in a straight line right before taking this attack or shove, you gain a +5 bonus to the attack's damage roll or the shove's attack roll.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                value: "Dash Bonus Action",
                description: "Make a melee attack or shove as bonus action after Dash"
            }
        ]
    },
    "Crossbow Expert": {
        name: "Crossbow Expert",
        icon: "🎯",
        description: "You are an expert with hand crossbows and crossbows. You gain the following benefits:\n• You ignore the loading quality of crossbows with which you are proficient.\n• Being within 5 feet of a hostile creature doesn't impose disadvantage on your ranged attack rolls.\n• When you use the Attack action and attack with a one-handed weapon, you can use a bonus action to attack with a loaded hand crossbow you are holding.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "proficiency",
                value: "Crossbow Expert",
                description: "Loading ignored, no disadvantage in close range, bonus action hand crossbow attack"
            }
        ]
    },
    "Defensive Duelist": {
        name: "Defensive Duelist",
        icon: "🗡️",
        description: "When you are wielding a finesse weapon with which you are proficient and another creature hits you with a melee attack, you can use your reaction to add your proficiency bonus to your AC for that attack, potentially causing the attack to miss you.",
        prerequisites: "Dexterity 13 or higher",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ac-bonus",
                value: "proficiency-bonus",
                description: "Add proficiency bonus to AC as reaction"
            }
        ]
    },

    // COMBAT FEATS
    "Dual Wielder": {
        name: "Dual Wielder",
        icon: "⚔️",
        description: "You master fighting with two weapons at once. While you are wielding a melee weapon in each hand, you gain the following benefits:\n• You gain +1 to AC.\n• You can use two-weapon fighting even when the one-handed melee weapons you are wielding aren't light.\n• You can draw or stow two one-handed weapons when you would normally be able to draw or stow only one.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ac-bonus",
                value: 1,
                description: "Gain +1 to AC"
            },
            {
                type: "feature",
                value: "Dual Wielding",
                description: "Two-weapon fighting with non-light weapons, dual draw/stow"
            }
        ]
    },
    "Dungeon Delver": {
        name: "Dungeon Delver",
        icon: "🏔️",
        description: "Alert to the hidden traps and secret doors found in many dungeons, you gain the following benefits:\n• You have advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to detect the presence of secret doors.\n• You have advantage on saving throws made to avoid or resist traps.\n• You have resistance to the damage dealt by traps.\n• Traveling at a fast pace doesn't impose the normal -5 penalty on your Wisdom (Perception) checks.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                value: "Dungeon Delver",
                description: "Advantage on Perception/Investigation for secrets, advantage vs traps, trap damage resistance"
            }
        ]
    },
    "Durable": {
        name: "Durable",
        icon: "🛡️",
        description: "Hard to kill, you gain the following benefits:\n• Increase your Constitution score by 1.\n• When you roll hit dice to recover hit points, the minimum number of hit points you regain from each die is twice your Constitution modifier (minimum of 2).",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                value: 1,
                description: "Increase Constitution by 1"
            },
            {
                type: "feature",
                value: "Hit Die Bonus",
                description: "Minimum HP regain from hit dice is 2x CON modifier (min 2)"
            }
        ]
    },

    // MAGIC FEATS
    "Eldritch Adept": {
        name: "Eldritch Adept",
        icon: "✨",
        description: "Prerequisite: Spellcasting or Pact Magic feature\n\nYou have learned some of the magic from eldritch invocations. Choose one invocation from the warlock class that is available to you (the invocations known by warlocks of your level or lower and that don't require a higher level of Eldritch Blast than you can cast). If the invocation has a prerequisite, you can choose that invocation only if you're a warlock and only if you meet the prerequisite.",
        prerequisites: "Spellcasting or Pact Magic feature",
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "feature",
                value: "choice",
                options: ["Agonizing Blast", "One with Shadows", "Mask of Many Faces", "Devil's Sight"],
                description: "Choose one warlock invocation"
            }
        ]
    },
    "Fey Touched": {
        name: "Fey Touched",
        icon: "🧚",
        description: "Your exposure to the Feywild's magic grants you the following benefits:\n• Increase one ability score of your choice by 1, to a maximum of 20.\n• You learn the misty step spell and can cast it without expending a spell slot. You can cast it once without expending a spell slot, and you regain the ability to do so when you finish a short or long rest. You can also cast the spell using spell slots you have.",
        prerequisites: "None",
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "ability-score",
                value: "choice",
                options: ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"],
                description: "Increase any ability score by 1"
            },
            {
                type: "spell",
                value: "Misty Step",
                description: "Can cast once per rest without slot"
            }
        ]
    },
    "Telepathic": {
        name: "Telepathic",
        icon: "🧠",
        description: "You awaken the telepathic power within yourself. You gain the following benefits:\n• Increase one ability score of your choice by 1, to a maximum of 20.\n• You can speak telepathically to any creature you can see within 60 feet of you. Your telepathic utterances are in a language you know, and the creature understands you only if it shares a language with you. The creature can respond telepathically only if it wants to.",
        prerequisites: "None",
        source: "Tasha's Cauldron of Everything",
        modifiers: [
            {
                type: "ability-score",
                value: "choice",
                options: ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"],
                description: "Increase any ability score by 1"
            },
            {
                type: "feature",
                value: "Telepathy",
                description: "Telepathically communicate within 60 feet"
            }
        ]
    },

    // SKILL FEATS
    "Keen Mind": {
        name: "Keen Mind",
        icon: "🧩",
        description: "You have a mind that can track time, direction, and detail with uncanny precision. You gain the following benefits:\n• Increase your Intelligence score by 1.\n• You always know which direction is north.\n• You always know the number of hours left before the next sunrise or sunset.\n• You can accurately recall anything you have seen or heard within the past month.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                value: 1,
                description: "Increase Intelligence by 1"
            },
            {
                type: "feature",
                value: "Perfect Recall",
                description: "Perfect recall of past month, always know direction and time"
            }
        ]
    },
    "Lucky": {
        name: "Lucky",
        icon: "🍀",
        description: "You have inexplicable luck that seems to kick in when you need it most. You gain 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20 and choose which of the d20s is used. Once you finish a long rest, you regain all spent luck points.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                value: "Luck Points",
                description: "3 luck points, regain on long rest, reroll d20s"
            }
        ]
    },
    "Magic Initiate": {
        name: "Magic Initiate",
        icon: "📖",
        description: "Choose a class: bard, cleric, druid, sorcerer, warlock, or wizard. You learn two cantrips of your choice from that class's spell list. In addition, choose one 1st-level spell from that same list. You learn that spell and can cast it at its lowest level. Once you finish a long rest, you can change your list of prepared spells when you finish a long rest.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                value: "choice",
                options: ["Bard", "Cleric", "Druid", "Sorcerer", "Warlock", "Wizard"],
                description: "Choose a spellcasting class for cantrips and 1st-level spell"
            }
        ]
    },

    // ROLEPLAY & PERSONALITY FEATS
    "Actor": {
        name: "Actor",
        icon: "🎭",
        description: "Skilled at mimicry and performance, you gain the following benefits:\n• Increase your Charisma score by 1.\n• You have advantage on Charisma (Deception) and Charisma (Performance) checks when trying to act in character.\n• You can mimic the speech of another person or the sounds made by other creatures. You must have heard the person speaking, or heard the creature make the sound, for at least 1 minute. A successful Wisdom (Insight) check opposed by your Charisma (Deception) check allows a listener to determine that the effect is faked.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                value: 1,
                description: "Increase Charisma by 1"
            },
            {
                type: "feature",
                value: "Mimicry",
                description: "Advantage on Deception/Performance, can mimic speech"
            }
        ]
    },
    "Inspiring Leader": {
        name: "Inspiring Leader",
        icon: "👑",
        description: "You can spend 10 minutes inspiring your companions, shoring up their resolve to fight. When you do so, choose up to six friendly creatures (which can include yourself) within 30 feet of you who can see or hear you and who can understand you. Each creature can gain temporary hit points equal to your level plus your Charisma modifier.",
        prerequisites: "Charisma 13 or higher",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                value: "Inspiring Words",
                description: "Grant temp HP equal to level + CHA modifier to up to 6 creatures"
            }
        ]
    },
    "Observant": {
        name: "Observant",
        icon: "👁️",
        description: "Quick to notice details of your environment, you gain the following benefits:\n• Increase your Intelligence or Wisdom score by 1.\n• If you can see a creature's mouth while it is speaking a language you understand, you can interpret what it's saying by reading its lips.\n• You have a +5 bonus to your passive Wisdom (Perception) and passive Intelligence (Investigation) scores.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                value: "choice",
                options: ["Intelligence", "Wisdom"],
                description: "Increase by 1"
            },
            {
                type: "feature",
                value: "Lip Reading",
                description: "+5 bonus to passive Perception/Investigation, can read lips"
            }
        ]
    },

    // SPECIALIZED FEATS
    "Polearm Master": {
        name: "Polearm Master",
        icon: "🔱",
        description: "You can keep your enemies at bay with reach weapons. You gain the following benefits:\n• When you take the Attack action and attack with only a glaive, halberd, pike, or quarterstaff, you can use a bonus action to make a melee attack with the opposite end of the weapon. The weapon's damage die for this attack is a d4, and the attack deals bludgeoning damage.\n• While you are wielding a glaive, halberd, pike, quarterstaff, or spear, other creatures provoke an opportunity attack from you when they enter your reach.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                value: "Reach Combat",
                description: "Bonus action melee with opposite end of polearm, opportunity attacks on enter reach"
            }
        ]
    },
    "Resilient": {
        name: "Resilient",
        icon: "💎",
        description: "Choose one ability score. You gain the following benefits:\n• Increase the chosen ability score by 1, to a maximum of 20.\n• You gain proficiency in saving throws using the chosen ability.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                value: "choice",
                options: ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"],
                description: "Increase chosen ability by 1"
            },
            {
                type: "proficiency",
                value: "choice",
                options: ["Strength Save", "Dexterity Save", "Constitution Save", "Intelligence Save", "Wisdom Save", "Charisma Save"],
                description: "Proficiency in chosen saving throw"
            }
        ]
    },
    "Sentinel": {
        name: "Sentinel",
        icon: "🛡️",
        description: "You have mastered melee weaponry and the art of combat. You gain the following benefits:\n• When a hostile creature's turn ends, you can use your reaction to make a melee weapon attack against that creature if it is within your reach and you haven't already acted this turn.\n• When a creature makes an attack roll against you, you can use your reaction to make a melee weapon attack against that creature if it is within your reach.\n• You have advantage on opportunity attacks against a creature that is moving away from you.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                value: "Sentinel Actions",
                description: "Reaction attacks when enemies turn ends, make attack rolls, advantage vs moving enemies"
            }
        ]
    },
    "Sharpshooter": {
        name: "Sharpshooter",
        icon: "🏹",
        description: "You have mastered ranged weapons and can make shots that others find impossible. You gain the following benefits:\n• Attacking at long range doesn't impose disadvantage on your ranged weapon attack rolls.\n• Your ranged weapon attacks ignore half cover and three-quarters cover.\n• Finally, you can use a bonus action to make one ranged weapon attack as long as you've used your action to attack with a ranged weapon this turn.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                value: "Ranged Mastery",
                description: "No disadvantage at long range, ignore cover, bonus action ranged attack"
            }
        ]
    },
    "War Caster": {
        name: "War Caster",
        icon: "⚡",
        description: "You have practiced casting spells in the midst of combat, learning techniques that grant you the following benefits:\n• You have advantage on Constitution saving throws that you make to maintain your concentration on a spell when you take damage.\n• You can perform the somatic and verbal components of spells even when you have weapons or a shield in one or both hands.\n• When a hostile creature provokes an opportunity attack from you by leaving your reach, you can use your reaction to cast a spell at that creature, rather than making an opportunity attack, if the spell has a casting time of 1 action and targets only that creature.",
        prerequisites: "Spellcasting or Pact Magic feature",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                value: "Combat Casting",
                description: "Advantage on concentration saves, somatic components with weapons, reaction spell cast on opportunity"
            }
        ]
    },

    // MOBILITY FEATS
    "Mobile": {
        name: "Mobile",
        icon: "💨",
        description: "You are exceptionally speedy and agile. You gain the following benefits:\n• Your speed increases by 10 feet.\n• When you use the Dash action, difficult terrain doesn't cost you extra movement on that turn.\n• When you make a melee attack against a creature, you don't provoke opportunity attacks from that creature until the end of your next turn.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "speed-bonus",
                value: 10,
                description: "Speed +10 feet"
            },
            {
                type: "feature",
                value: "Mobility",
                description: "Dash ignores difficult terrain, no opportunity attacks after melee attack"
            }
        ]
    },
    "Moderately Armored": {
        name: "Moderately Armored",
        icon: "🛡️",
        description: "You have some training with armored combat. You gain the following benefits:\n• Increase your Strength or Dexterity score by 1.\n• You gain proficiency with medium armor and shields.",
        prerequisites: "Light Armor proficiency",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                value: "choice",
                options: ["Strength", "Dexterity"],
                description: "Increase by 1"
            },
            {
                type: "proficiency",
                value: "Medium Armor & Shields",
                description: "Proficiency with medium armor and shields"
            }
        ]
    },

    // VARIANT HUMAN FEATS
    "Great Weapon Master": {
        name: "Great Weapon Master",
        icon: "⚒️",
        description: "You've learned to put the weight of a weapon to your advantage, letting its momentum empower your strikes. You gain the following benefits:\n• On your turn, when you score a critical hit with a melee weapon or reduce a creature to 0 hit points with one, you can make one melee weapon attack as a bonus action.\n• Before you make a melee attack with a heavy weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage.",
        prerequisites: "None",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "feature",
                value: "Heavy Weapons",
                description: "Bonus action attack on crit or kill, -5/+10 damage option with heavy weapons"
            }
        ]
    },
    "Heavy Armor Master": {
        name: "Heavy Armor Master",
        icon: "🏰",
        description: "You can use your armor to deflect strikes that would kill others. You gain the following benefits:\n• Increase your Strength score by 1.\n• While you are wearing heavy armor, bludgeoning, piercing, and slashing damage that you take from non-magical weapons is reduced by 3.",
        prerequisites: "Proficiency with heavy armor",
        source: "Player's Handbook",
        modifiers: [
            {
                type: "ability-score",
                value: 1,
                description: "Increase Strength by 1"
            },
            {
                type: "feature",
                value: "Armor Mastery",
                description: "Reduce BPS damage from non-magical weapons by 3"
            }
        ]
    }
};


/**
 * Get feats available for a specific race
 * @param race - The character race
 * @returns Array of feat names available for that race
 */
export function getAvailableFeatsForRace(race: CharacterRace): FeatName[] {
    // By default, all feats are available unless you want to restrict certain races
    // Add race-specific restrictions here if needed
    return Object.keys(featsData);
}

/**
 * Get a single feat's data
 * @param featName - The name of the feat
 * @returns FeatData object or undefined if not found
 */
export function getFeatData(featName: FeatName): FeatData | undefined {
    return featsData[featName];
}

/**
 * Get all feats that have no prerequisites (suitable for starting characters)
 * @returns Array of feat names with no prerequisites
 */
export function getBasicFeats(): FeatName[] {
    return Object.entries(featsData)
        .filter(([_, feat]) => !feat.prerequisites || feat.prerequisites === "None")
        .map(([name, _]) => name);
}

/**
 * Search feats by name or description
 * @param query - Search term
 * @returns Array of matching feat names
 */
export function searchFeats(query: string): FeatName[] {
    const lowerQuery = query.toLowerCase();
    return Object.entries(featsData)
        .filter(([name, feat]) =>
            name.toLowerCase().includes(lowerQuery) ||
            feat.description.toLowerCase().includes(lowerQuery) ||
            feat.source?.toLowerCase().includes(lowerQuery)
        )
        .map(([name, _]) => name);
}

/**
 * Get modifiers for a specific feat
 * @param featName - The name of the feat
 * @returns Array of modifiers or empty array
 */
export function getFeatModifiers(featName: FeatName): FeatModifier[] {
    return featsData[featName]?.modifiers || [];
}

/**
 * Get choice modifiers from a feat (for character creation UI)
 * @param featName - The name of the feat
 * @returns Array of choice-type modifiers
 */
export function getFeatChoices(featName: FeatName): FeatModifier[] {
    return getFeatModifiers(featName).filter(mod => mod.value === "choice");
}

export default featsData;

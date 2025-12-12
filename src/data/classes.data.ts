import {getToolsInCategory, type ToolName} from "./proficiencies.data";

export type ClassName =
    | "Artificer"
    | "Barbarian"
    | "Bard"
    | "Blood Hunter"
    | "Cleric"
    | "Druid"
    | "Fighter"
    | "Monk"
    | "Paladin"
    | "Ranger"
    | "Rogue"
    | "Sorcerer"
    | "Warlock"
    | "Wizard";

export type HitDiceSize = "d6" | "d8" | "d10" | "d12";
export type SpellcastingAbility = "charisma" | "intelligence" | "wisdom" | "strength" | "dexterity" | "constitution";
export type ArmorProficiency = "light" | "medium" | "heavy" | "shields";
export type WeaponProficiency = "simple" | "martial";
export type SpellSlotProgression = "full" | "half" | "third";

export interface ClassFeature {
    name: string;
    level: number;
    description?: string;
}

export interface Subclass {
    name: string;
    description?: string;
    features: ClassFeature[];
}

export interface ClassData {
    name: ClassName;
    description: string;
    hitDice: HitDiceSize;
    hitPointsAtLevel1: number;
    armorProficiencies: ArmorProficiency[];
    weaponProficiencies: WeaponProficiency[];
    toolProficiencies: string[];
    SkillProficiencyList: string[];
    skillChoices: number;
    toolsProficiencyList: ToolName[];
    toolChoices: number;
    savingThrowProficiencies: string[];
    spellcastingAbility?: SpellcastingAbility;
    spellsKnownAtLevel1?: number;
    cantripsKnownAtLevel1?: number;
    spellSlotProgression?: SpellSlotProgression
    spellSlots?: Record<number, number[]>; // level -> slots per spell level
    subclassLevel: number;
    subclasses: Subclass[];
    classFeatures: ClassFeature[]; // All class features with progression
}

export const classesData: Record<ClassName, ClassData> = {
    "Bard": {
        name: "Bard",
        description: "An inspiring magician whose power echoes the music of creation itself. A spellcaster and master of the arts, bards use their magical talents to create powerful effects.",
        hitDice: "d8",
        hitPointsAtLevel1: 8,
        armorProficiencies: ["light"],
        weaponProficiencies: ["simple"],
        toolProficiencies: [],
        SkillProficiencyList: [
            "Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception",
            "History", "Insight", "Intimidation", "Investigation", "Medicine",
            "Nature", "Perception", "Performance", "Persuasion", "Religion",
            "Sleight of Hand", "Stealth", "Survival"
        ],
        skillChoices: 3,
        toolsProficiencyList: [... getToolsInCategory("Musical Instruments")],
        toolChoices: 3,
        savingThrowProficiencies: ["Dexterity", "Charisma"],
        spellcastingAbility: "charisma",
        cantripsKnownAtLevel1: 2,
        spellsKnownAtLevel1: 4,
        spellSlotProgression: "full",
        subclassLevel: 3,
        classFeatures: [
            { name: "Spellcasting", level: 1, description: "Cast spells using Charisma" },
            { name: "Bardic Inspiration die", level: 1, description: "The pool of bardic inspiration dices"},
            { name: "Bardic Inspiration", level: 1, description: "Grant allies bardic inspiration die to add to rolls" },
            { name: "Jack of All Trades", level: 2, description: "Add half proficiency to all non-proficient rolls" },
            { name: "Song of Rest", level: 2, description: "Allies gain extra HP when healing during rest" },
            { name: "Expertise", level: 1, description: "Double proficiency with chosen skills" },
            { name: "Font of Inspiration", level: 5, description: "Bardic Inspiration increases to d8" },
            { name: "Countercharm", level: 6, description: "Use reaction to gain advantage on saves against being frightened or charmed" },
            { name: "Magical Secrets", level: 10, description: "Learn spells from any class" },
            { name: "Peerless Skill", level: 20, description: "Add Bardic Inspiration die to own ability checks" }
        ],
        subclasses: [
            {
                name: "College of Glamour",
                description: "Master charm and attraction through art",
                features: [
                    { name: "Mantle of Inspiration", level: 3, description: "Grant temp HP instead of inspiration" },
                    { name: "Enthralling Performance", level: 3, description: "Charm creatures with performance" },
                    { name: "Mantle of Majesty", level: 6, description: "Grant inspiration to multiple allies" },
                    { name: "Unbreakable Beauty", level: 14, description: "Gain advantage against being frightened" }
                ]
            },
            {
                name: "College of Lore",
                description: "Gain knowledge and versatility through study",
                features: [
                    { name: "Bonus Proficiencies", level: 3, description: "Gain three skill proficiencies" },
                    { name: "Cutting Words", level: 3, description: "Use inspiration die to reduce enemy roll" },
                    { name: "Peerless Skill", level: 6, description: "Add inspiration to own checks" },
                    { name: "Additional Magical Secrets", level: 14, description: "Learn more spells from any class" }
                ]
            },
            {
                name: "College of Eloquence",
                description: "Master the power of words and persuasion",
                features: [
                    { name: "Unsettling Words", level: 3, description: "Deduct inspiration from enemy save" },
                    { name: "Unfailing Inspiration", level: 3, description: "Can't roll lower than 1 on inspiration" },
                    { name: "Unfailing Inspiration", level: 6, description: "Inspire grants resistance to psychic damage" },
                    { name: "Unflappable Orator", level: 14, description: "Can't be silenced or restrained" }
                ]
            },
            {
                name: "College of Spirits",
                description: "Channel spirits through your performance",
                features: [
                    { name: "Guiding Whispers", level: 3, description: "Cast guidance at will" },
                    { name: "Spiritual Focus", level: 3, description: "Maintain spirit connection" },
                    { name: "Tales from Beyond", level: 6, description: "Cast spells from other classes" },
                    { name: "Spirit Session", level: 14, description: "Multiple spirit connections at once" }
                ]
            },
            {
                name: "College of Swords",
                description: "Blend combat prowess with artistic flair",
                features: [
                    { name: "Bonus Proficiencies", level: 3, description: "Gain scimitar proficiency" },
                    { name: "Flourish of Blades", level: 3, description: "Add inspiration die to weapon attacks" },
                    { name: "Extra Attack", level: 6, description: "Attack twice when you use Attack action" },
                    { name: "Master's Flourish", level: 14, description: "Reduce damage taken with flourishes" }
                ]
            },
            {
                name: "College of Whispers",
                description: "Master deception and shadow magic",
                features: [
                    { name: "Psychic Blades", level: 3, description: "Add psychic damage to weapon attacks using inspiration" },
                    { name: "Words as Weapon", level: 3, description: "Cause psychic damage with words" },
                    { name: "One with Shadows", level: 6, description: "Hide even in dim light" },
                    { name: "Masterful Mimicry", level: 14, description: "Perfectly mimic anyone's voice" }
                ]
            }
        ]
    },

    "Fighter": {
        name: "Fighter",
        description: "A master of martial combat, skilled with a variety of weapons and armor. Fighters are well-rounded combatants expert at adapting to any combat situation.",
        hitDice: "d10",
        hitPointsAtLevel1: 10,
        armorProficiencies: ["light", "medium", "heavy", "shields"],
        weaponProficiencies: ["simple", "martial"],
        toolProficiencies: [],
        toolsProficiencyList: [],
        SkillProficiencyList: [
            "Acrobatics", "Animal Handling", "Athletics", "History",
            "Insight", "Intimidation", "Perception", "Survival"
        ],
        skillChoices: 2,
        toolChoices: 0,
        savingThrowProficiencies: ["Strength", "Constitution"],
        subclassLevel: 3,
        classFeatures: [
            { name: "Fighting Style(Fighter)", level: 1, description: "Choose a fighting style bonus" },
            { name: "Second Wind", level: 1, description: "Heal yourself as bonus action" },
            { name: "Extra Attack", level: 5, description: "Attack twice when you use Attack action" },
            { name: "Ability Score Improvement", level: 4, description: "Increase ability scores" },
            { name: "Improved Critical", level: 3, description: "Critical hit on 19-20" },
            { name: "Remarkable Athlete", level: 7, description: "Add half proficiency to non-proficient checks" },
            { name: "Indomitable", level: 9, description: "Reroll a failed saving throw" },
            { name: "Extra Attacks", level: 11, description: "Attack three times (at level 11)" },
            { name: "Survivor", level: 18, description: "Heal based on enemies defeated" }
        ],
        subclasses: [
            {
                name: "Champion",
                description: "Master of martial arts and combat technique",
                features: [
                    { name: "Improved Critical", level: 3, description: "Critical hit on 19-20" },
                    { name: "Remarkable Athlete", level: 7, description: "Legendary strength" },
                    { name: "Additional Fighting Style", level: 10, description: "Choose another fighting style" },
                    { name: "Superior Critical", level: 15, description: "Critical hit on 15-20" }
                ]
            },
            {
                name: "Battle Master",
                description: "Master tactician and maneuver specialist",
                features: [
                    { name: "Combat Superiority", level: 3, description: "Use superiority dice for maneuvers" },
                    { name: "Know Your Enemy", level: 7, description: "Learn enemy tactics" },
                    { name: "Improved Maneuvers", level: 10, description: "More maneuver options" },
                    { name: "Relentless", level: 15, description: "Regain one superiority die on initiative" }
                ]
            },
            {
                name: "Eldritch Knight",
                description: "Blend martial combat with magic",
                features: [
                    { name: "Spellcasting", level: 3, description: "Cast spells using Intelligence" },
                    { name: "War Magic", level: 7, description: "Cast spells and attack" },
                    { name: "Improved War Magic", level: 10, description: "More attacks with spells" },
                    { name: "Spell-Fueled Attack", level: 20, description: "Attack after casting spell" }
                ]
            },
            {
                name: "Cavalier",
                description: "Master of mounted combat",
                features: [
                    { name: "Bonus Proficiencies", level: 3, description: "Gain heavy armor and mount training" },
                    { name: "Born to the Saddle", level: 3, description: "Bonded mount bonus" },
                    { name: "Unwavering Mark", level: 3, description: "Mark enemies for advantage" },
                    { name: "Restraining Strike", level: 7, description: "Reduce enemy movement" },
                    { name: "Ferocious Charger", level: 10, description: "Charge bonus damage" }
                ]
            },
            {
                name: "Samurai",
                description: "Master of discipline and honor",
                features: [
                    { name: "Bonus Proficiency", level: 3, description: "Gain Insight or Persuasion" },
                    { name: "Fighting Spirit", level: 3, description: "Use willpower for extra attacks" },
                    { name: "Elegant Courtier", level: 7, description: "Gain social benefits" },
                    { name: "Tireless Spirit", level: 10, description: "Fighting spirit lasts longer" },
                    { name: "Ride the Wind", level: 15, description: "Move without provoking opportunity" }
                ]
            },
            {
                name: "Rune Knight",
                description: "Carve magical runes into your weapons",
                features: [
                    { name: "Bonus Proficiencies", level: 3, description: "Gain Rune Carving" },
                    { name: "Rune Carver", level: 3, description: "Inscribe runes on items" },
                    { name: "Giant's Might", level: 3, description: "Grow large and strong" },
                    { name: "Runic Shield", level: 7, description: "Runes protect you" },
                    { name: "Great Rune", level: 10, description: "Master powerful runes" }
                ]
            }
        ]
    },
};
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
    skillProficiencies: string[];
    skillChoices: number;
    savingThrowProficiencies: string[];
    spellcastingAbility?: SpellcastingAbility;
    spellsKnownAtLevel1?: number;
    cantripsKnownAtLevel1?: number;
    spellSlots?: Record<number, number[]>; // level -> slots per spell level
    subclassLevel: number;
    subclasses: Subclass[];
    classFeatures: ClassFeature[]; // All class features with progression
}

export const classesData: Record<ClassName, ClassData> = {
    "Artificer": {
        name: "Artificer",
        description: "Masters of magical invention, Artificers use infusions and constructs to shape their reality. They are half-caster tinkerers blending technology and magic.",
        hitDice: "d8",
        hitPointsAtLevel1: 8,
        armorProficiencies: ["light", "medium"],
        weaponProficiencies: ["simple"],
        toolProficiencies: ["Artisan's Tools (choose 1)", "Thieves' Tools"],
        skillProficiencies: [
            "Arcana",
            "Investigation",
            "Medicine",
            "Nature",
            "Perception",
            "Sleight of Hand"
        ],
        skillChoices: 2,
        savingThrowProficiencies: ["Constitution", "Intelligence"],
        spellcastingAbility: "intelligence",
        cantripsKnownAtLevel1: 2,
        spellsKnownAtLevel1: 4,
        spellSlots: {
            1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [2, 2, 0, 0, 0, 0, 0, 0, 0],
            3: [2, 3, 0, 0, 0, 0, 0, 0, 0],
            4: [3, 3, 2, 0, 0, 0, 0, 0, 0],
            5: [3, 3, 2, 2, 0, 0, 0, 0, 0],
        },
        subclassLevel: 3,
        classFeatures: [
            { name: "Magical Tinkering", level: 1, description: "Imbue mundane items with minor magical effects" },
            { name: "Spellcasting", level: 1, description: "Cast spells using Intelligence" },
            { name: "Infusions", level: 1, description: "Create magical infusions in objects" },
            { name: "The Right Tool for the Job", level: 2, description: "Spend 10 minutes to create artisan's tools" },
            { name: "Tool Expertise", level: 3, description: "Double proficiency with artisan's tools" },
            { name: "Infuse Item", level: 6, description: "Learn additional infusions" },
            { name: "Tool Expertise Improvement", level: 9, description: "Can create tools from any set" },
            { name: "Magic Item Adept", level: 10, description: "Identify magic items by handling them" },
        ],
        subclasses: [
            {
                name: "Artificer of the Artillerist",
                description: "Master of ranged magical weaponry and turrets",
                features: [
                    { name: "Eldritch Cannon", level: 3, description: "Create a magical cannon for support" },
                    { name: "Cannon Enhancement", level: 5, description: "Improve your cannon's capabilities" },
                    { name: "Improved Cannon", level: 9, description: "Multiple canons active at once" },
                    { name: "Fortified Position", level: 15, description: "Canons gain additional defenses" }
                ]
            },
            {
                name: "Artificer of the Battle Smith",
                description: "Combat-focused artificer with a magical companion",
                features: [
                    { name: "Steel Defender", level: 3, description: "Create a magical construct companion" },
                    { name: "Steel Defender Bond", level: 3, description: "Form a magical bond with your defender" },
                    { name: "Extra Attack", level: 5, description: "Attack twice when you use Attack action" },
                    { name: "Improved Defender", level: 9, description: "Your defender gains strength" },
                    { name: "Master Smith", level: 15, description: "Create additional magical items" }
                ]
            },
            {
                name: "Artificer of the Armorer",
                description: "Wear and maintain powerful magical armor",
                features: [
                    { name: "Armor Model", level: 3, description: "Choose between Guardian or Infiltrator armor" },
                    { name: "Arcane Armor", level: 3, description: "Magically enhance armor" },
                    { name: "Armor Modifications", level: 9, description: "Add additional armor modifications" },
                    { name: "Perfected Armor", level: 15, description: "Your armor reaches peak potential" }
                ]
            },
            {
                name: "Artificer of the Alchemist",
                description: "Create powerful potions and alchemical concoctions",
                features: [
                    { name: "Alchemist's Supplies", level: 3, description: "Proficiency in alchemist's supplies" },
                    { name: "Potion Brewing", level: 3, description: "Create powerful alchemical items" },
                    { name: "Expanded Potion Brewing", level: 5, description: "Create more potions" },
                    { name: "Chemical Mastery", level: 9, description: "Create rare alchemical items" },
                    { name: "Alchemical Expertise", level: 15, description: "Create legendary potions" }
                ]
            },
            {
                name: "Artificer of the Lore Master",
                description: "Master magical archives and ancient knowledge",
                features: [
                    { name: "Magical Lore", level: 3, description: "Gain knowledge from magical archives" },
                    { name: "Spellbook", level: 3, description: "Maintain a spellbook of magical knowledge" },
                    { name: "Expanded Knowledge", level: 5, description: "Learn additional spells" },
                    { name: "Master of Knowledge", level: 9, description: "Unlock deep magical secrets" },
                    { name: "Ultimate Lore", level: 15, description: "Access forbidden knowledge" }
                ]
            },
            {
                name: "Artificer of the Artificer Specialist",
                description: "Specialize in creating unique magical constructs",
                features: [
                    { name: "Tool Specialization", level: 3, description: "Choose your focus craft" },
                    { name: "Master Crafting", level: 3, description: "Create powerful magical items" },
                    { name: "Enhanced Crafting", level: 5, description: "Craft items faster and more efficiently" },
                    { name: "Legendary Crafting", level: 9, description: "Create legendary-grade items" },
                    { name: "Pinnacle Crafting", level: 15, description: "Create artifacts" }
                ]
            }
        ]
    },

    "Barbarian": {
        name: "Barbarian",
        description: "A fierce warrior of primitive background who can enter a battle rage, channeling primal power to enhance their prowess in battle.",
        hitDice: "d12",
        hitPointsAtLevel1: 12,
        armorProficiencies: ["light", "medium", "shields"],
        weaponProficiencies: ["simple", "martial"],
        toolProficiencies: [],
        skillProficiencies: [
            "Animal Handling",
            "Athletics",
            "Insight",
            "Intimidation",
            "Nature",
            "Perception",
            "Survival"
        ],
        skillChoices: 2,
        savingThrowProficiencies: ["Strength", "Constitution"],
        subclassLevel: 3,
        classFeatures: [
            { name: "Rage", level: 1, description: "Enter a rage for 1 minute, gaining damage and resistances" },
            { name: "Unarmored Defense", level: 1, description: "AC = 10 + DEX + CON when unarmored" },
            { name: "Reckless Attack", level: 2, description: "Attack with advantage but enemies attack you with advantage" },
            { name: "Danger Sense", level: 2, description: "React to danger you can sense" },
            { name: "Extra Attack", level: 5, description: "Attack twice when you use Attack action" },
            { name: "Brutal Critical", level: 9, description: "Roll extra dice on critical hits" },
            { name: "Relentless Rage", level: 11, description: "Stay in rage even after taking damage" },
            { name: "Primal Champion", level: 20, description: "Strength and Constitution increase to maximum 24" }
        ],
        subclasses: [
            {
                name: "Path of the Berserker",
                description: "Embrace the primal fury of unbridled aggression",
                features: [
                    { name: "Frenzy", level: 3, description: "Make an extra weapon attack while raging" },
                    { name: "Mindless Rage", level: 6, description: "Can't be charmed or frightened during rage" },
                    { name: "Retaliation", level: 9, description: "Counterattack when hit during rage" },
                    { name: "Relentless Rage", level: 11, description: "Rage continues through damage" }
                ]
            },
            {
                name: "Path of the Totem Warrior",
                description: "Commune with nature spirits to gain their power",
                features: [
                    { name: "Spirit Seeker", level: 3, description: "Commune with spirits to gain knowledge" },
                    { name: "Totem Spirit", level: 3, description: "Choose a totem animal for benefits" },
                    { name: "Aspect of the Beast", level: 6, description: "Gain abilities of your totem animal" },
                    { name: "Spirit Walker", level: 10, description: "Cast spells while raging" },
                    { name: "Totemic Attunement", level: 14, description: "Ultimate totem animal power" }
                ]
            },
            {
                name: "Path of the Ancestral Guardian",
                description: "Channel the wisdom of your ancestors in battle",
                features: [
                    { name: "Ancestral Protectors", level: 3, description: "Ancestors protect your allies" },
                    { name: "Ancestral Shield", level: 6, description: "Damage is reduced when allies are nearby" },
                    { name: "Consult the Spirits", level: 10, description: "Gain advantage on Wisdom saves" },
                    { name: "Ancestral Vengeance", level: 14, description: "Deal extra damage when defending allies" }
                ]
            },
            {
                name: "Path of the Storm Herald",
                description: "Your rage manifests as primal elemental power",
                features: [
                    { name: "Storm Aura", level: 3, description: "Emit an aura of lightning or cold damage" },
                    { name: "Storm Soul", level: 6, description: "Gain resistance to cold or lightning" },
                    { name: "Shielding Storm", level: 10, description: "Your aura provides protection" },
                    { name: "Raging Storm", level: 14, description: "Your aura damages all enemies nearby" }
                ]
            },
            {
                name: "Path of the Zealot",
                description: "Channel divine fury in service of your faith",
                features: [
                    { name: "Divine Fury", level: 3, description: "Add radiant damage to attacks while raging" },
                    { name: "Warrior of the Gods", level: 3, description: "Spend less time raging" },
                    { name: "Fanatical Focus", level: 7, description: "Can't miss attacks while raging" },
                    { name: "Zealous Presence", level: 14, description: "Grant allies bonuses as bonus action" },
                    { name: "Infinite Endurance", level: 20, description: "Rage lasts indefinitely" }
                ]
            },
            {
                name: "Path of Wild Magic",
                description: "Your rage channels untamed magical forces",
                features: [
                    { name: "Magic Awareness", level: 3, description: "Sense magic around you" },
                    { name: "Wild Magic Surge", level: 3, description: "Trigger random magical effects while raging" },
                    { name: "Bolstering Magic", level: 6, description: "Magic surge grants temporary hit points" },
                    { name: "Unstable Backlash", level: 10, description: "Redirect spell effects at casters" },
                    { name: "Controlled Chaos", level: 14, description: "Gain some control over wild magic surges" }
                ]
            }
        ]
    },

    "Bard": {
        name: "Bard",
        description: "An inspiring magician whose power echoes the music of creation itself. A spellcaster and master of the arts, bards use their magical talents to create powerful effects.",
        hitDice: "d8",
        hitPointsAtLevel1: 8,
        armorProficiencies: ["light"],
        weaponProficiencies: ["simple"],
        toolProficiencies: ["Musical Instrument (choose 3)"],
        skillProficiencies: [
            "Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception",
            "History", "Insight", "Intimidation", "Investigation", "Medicine",
            "Nature", "Perception", "Performance", "Persuasion", "Religion",
            "Sleight of Hand", "Stealth", "Survival"
        ],
        skillChoices: 3,
        savingThrowProficiencies: ["Dexterity", "Charisma"],
        spellcastingAbility: "charisma",
        cantripsKnownAtLevel1: 2,
        spellsKnownAtLevel1: 4,
        spellSlots: {
            1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [2, 2, 0, 0, 0, 0, 0, 0, 0],
            3: [2, 3, 0, 0, 0, 0, 0, 0, 0],
            4: [3, 3, 2, 0, 0, 0, 0, 0, 0],
            5: [3, 3, 2, 2, 0, 0, 0, 0, 0],
        },
        subclassLevel: 3,
        classFeatures: [
            { name: "Spellcasting", level: 1, description: "Cast spells using Charisma" },
            { name: "Bardic Inspiration", level: 1, description: "Grant allies d6 to add to rolls" },
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

    "Blood Hunter": {
        name: "Blood Hunter",
        description: "A grim warrior who has made a pact with something sinister to gain power. Blood Hunters hunt monsters and track down supernatural threats using dark magic and forbidden rituals.",
        hitDice: "d10",
        hitPointsAtLevel1: 10,
        armorProficiencies: ["light", "medium"],
        weaponProficiencies: ["simple", "martial"],
        toolProficiencies: ["Alchemist's Supplies"],
        skillProficiencies: [
            "Arcana",
            "Insight",
            "Investigation",
            "Medicine",
            "Perception",
            "Survival"
        ],
        skillChoices: 2,
        savingThrowProficiencies: ["Strength", "Intelligence"],
        spellcastingAbility: "intelligence",
        cantripsKnownAtLevel1: 0,
        spellsKnownAtLevel1: 2,
        subclassLevel: 3,
        classFeatures: [
            { name: "Monster Hunter", level: 1, description: "Track and identify monsters" },
            { name: "Blood Curse", level: 1, description: "Cast curses to hinder enemies" },
            { name: "Crimson Rite", level: 1, description: "Imbue weapons with elemental power" },
            { name: "Blood Maledict", level: 2, description: "Cast curses at a distance" },
            { name: "Rite Specialization", level: 3, description: "Specialize in a specific rite" },
            { name: "Extra Attack", level: 5, description: "Attack twice when you use Attack action" },
            { name: "Hunter's Sense", level: 7, description: "Track creatures within a distance" },
            { name: "Paranormal Knowledge", level: 11, description: "Understand supernatural phenomena" },
            { name: "Blood Mastery", level: 18, description: "Master blood curse and rites" }
        ],
        subclasses: [
            {
                name: "Order of the Profane Soul",
                description: "Gain dark magical power through forbidden pacts",
                features: [
                    { name: "Dark Patron", level: 3, description: "Make a pact for magical power" },
                    { name: "Eldritch Invocations", level: 3, description: "Learn eldritch invocations" },
                    { name: "Expanded Invocations", level: 9, description: "Learn more invocations" },
                    { name: "Ultimate Pact", level: 18, description: "Gain ultimate power from your patron" }
                ]
            },
            {
                name: "Order of the Lycan",
                description: "Harness the power of lycanthropy",
                features: [
                    { name: "Hybrid Transformation", level: 3, description: "Transform into hybrid wolf form" },
                    { name: "Feral Instincts", level: 6, description: "Gain animal senses and abilities" },
                    { name: "Stalker's Prowess", level: 9, description: "Improved speed and strength" },
                    { name: "Apex Predator", level: 18, description: "Transform fully into beast form" }
                ]
            },
            {
                name: "Order of the Ghostslayer",
                description: "Master supernatural creatures and undead",
                features: [
                    { name: "Ghost Sight", level: 3, description: "See invisible and ethereal creatures" },
                    { name: "Slayer's Reaction", level: 6, description: "React to supernatural threats" },
                    { name: "Ethereal Step", level: 9, description: "Move through solid objects briefly" },
                    { name: "Spectral Vengeance", level: 18, description: "Hunt ghosts in the ethereal plane" }
                ]
            },
            {
                name: "Order of the Mutant",
                description: "Infuse your body with supernatural mutations",
                features: [
                    { name: "Mutagenic Infusions", level: 3, description: "Mutate your body for powers" },
                    { name: "Ability Mutation", level: 6, description: "Enhance specific abilities" },
                    { name: "Mutant Stability", level: 9, description: "Control your mutations better" },
                    { name: "Apex Mutation", level: 18, description: "Achieve perfect mutation state" }
                ]
            },
            {
                name: "Order of the Seeker",
                description: "Seek knowledge of dark magic and monsters",
                features: [
                    { name: "Forbidden Knowledge", level: 3, description: "Learn secrets of monsters" },
                    { name: "Arcane Insight", level: 6, description: "Understand magical phenomena" },
                    { name: "Ritual Casting", level: 9, description: "Cast rituals without spell slots" },
                    { name: "Ultimate Secrets", level: 18, description: "Unlock forbidden grimoire knowledge" }
                ]
            },
            {
                name: "Order of the Raven",
                description: "Commune with corvids for supernatural aid",
                features: [
                    { name: "Raven Familiar", level: 3, description: "Bond with a magical raven" },
                    { name: "Raven Sight", level: 6, description: "See through raven's eyes" },
                    { name: "Murder of Ravens", level: 9, description: "Command multiple ravens" },
                    { name: "Eternal Raven", level: 18, description: "Summon a powerful raven spirit" }
                ]
            }
        ]
    },

    "Cleric": {
        name: "Cleric",
        description: "A priestly champion who wields divine magic in service of a higher power. Clerics are embodiments of their gods' wills, performing holy rites and magic.",
        hitDice: "d8",
        hitPointsAtLevel1: 8,
        armorProficiencies: ["light", "medium", "shields"],
        weaponProficiencies: ["simple"],
        toolProficiencies: [],
        skillProficiencies: [
            "Insight",
            "Medicine",
            "Persuasion",
            "Religion"
        ],
        skillChoices: 2,
        savingThrowProficiencies: ["Wisdom", "Charisma"],
        spellcastingAbility: "wisdom",
        cantripsKnownAtLevel1: 3,
        spellsKnownAtLevel1: 8,
        spellSlots: {
            1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
            4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
            5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        },
        subclassLevel: 1,
        classFeatures: [
            { name: "Spellcasting", level: 1, description: "Cast spells using Wisdom" },
            { name: "Domain Spells", level: 1, description: "Gain bonus spells from your domain" },
            { name: "Channel Divinity", level: 2, description: "Channel divine power for special effects" },
            { name: "Ability Score Improvement", level: 4, description: "Increase ability scores" },
            { name: "Divine Strike", level: 8, description: "Add divine damage to weapon attacks" },
            { name: "Potent Spellcasting", level: 8, description: "Add Wisdom modifier to spell damage" },
            { name: "Blessed Strikes", level: 8, description: "Add divine damage to attacks and spells" },
            { name: "Supreme Healing", level: 17, description: "Spells restore maximum hit points" },
            { name: "Divine Intervention", level: 10, description: "Perform a miracle once per day" }
        ],
        subclasses: [
            {
                name: "Life Domain",
                description: "Dedicate yourself to healing and preservation",
                features: [
                    { name: "Domain Spells", level: 1, description: "Gain healing spell list" },
                    { name: "Bonus Proficiency", level: 1, description: "Gain heavy armor proficiency" },
                    { name: "Preserve Life", level: 1, description: "Heal allies as action" },
                    { name: "Blessed Healer", level: 6, description: "Gain hit points when healing others" },
                    { name: "Divine Strike", level: 8, description: "Add radiant damage to attacks" }
                ]
            },
            {
                name: "Tempest Domain",
                description: "Command storms and lightning",
                features: [
                    { name: "Domain Spells", level: 1, description: "Gain storm spell list" },
                    { name: "Bonus Proficiencies", level: 1, description: "Gain martial weapons and heavy armor" },
                    { name: "Wrath of the Storm", level: 1, description: "React with lightning to damage" },
                    { name: "Thunderbolt Strike", level: 6, description: "Push creatures back with lightning" },
                    { name: "Divine Strike", level: 8, description: "Add lightning damage to attacks" }
                ]
            },
            {
                name: "Trickery Domain",
                description: "Master deception and shadows",
                features: [
                    { name: "Domain Spells", level: 1, description: "Gain deception spell list" },
                    { name: "Blessing of the Trickster", level: 1, description: "Gain advantage on stealth" },
                    { name: "Invoke Duplicity", level: 2, description: "Create illusion of yourself" },
                    { name: "Cloak of Shadows", level: 6, description: "Become invisible in dim light" },
                    { name: "Divine Strike", level: 8, description: "Add poison damage to attacks" }
                ]
            },
            {
                name: "War Domain",
                description: "Master combat and martial prowess",
                features: [
                    { name: "Domain Spells", level: 1, description: "Gain combat spell list" },
                    { name: "Bonus Proficiencies", level: 1, description: "Gain martial weapons and armor" },
                    { name: "War Priest", level: 1, description: "Make extra attack as bonus action" },
                    { name: "Divine Strike", level: 8, description: "Add weapon damage to attacks" },
                    { name: "Avatar of Battle", level: 17, description: "Use reaction for attacks" }
                ]
            },
            {
                name: "Knowledge Domain",
                description: "Seek truth and understanding",
                features: [
                    { name: "Domain Spells", level: 1, description: "Gain knowledge spell list" },
                    { name: "Blessing of Knowledge", level: 1, description: "Learn additional skill proficiencies" },
                    { name: "Potent Spellcasting", level: 1, description: "Add Wisdom to spell damage" },
                    { name: "Divine Strike", level: 8, description: "Add psychic damage to attacks" }
                ]
            },
            {
                name: "Forge Domain",
                description: "Shape metal and create wonders",
                features: [
                    { name: "Domain Spells", level: 1, description: "Gain crafting spell list" },
                    { name: "Bonus Proficiencies", level: 1, description: "Gain heavy armor and smith's tools" },
                    { name: "Blessing of the Forge", level: 1, description: "Craft items faster" },
                    { name: "Artisan's Blessing", level: 2, description: "Create magical items at will" },
                    { name: "Divine Strike", level: 8, description: "Add fire damage to attacks" }
                ]
            },
            {
                name: "Grave Domain",
                description: "Preserve the boundary between life and death",
                features: [
                    { name: "Domain Spells", level: 1, description: "Gain death spell list" },
                    { name: "Blessings of the Grave", level: 1, description: "See ghosts and spirits" },
                    { name: "Path to the Grave", level: 2, description: "Make enemies vulnerable to damage" },
                    { name: "Sentinel at Death's Door", level: 6, description: "Prevent killing blows" },
                    { name: "Divine Strike", level: 8, description: "Add necrotic damage to attacks" }
                ]
            },
            {
                name: "Light Domain",
                description: "Wield the power of sacred flame",
                features: [
                    { name: "Domain Spells", level: 1, description: "Gain fire spell list" },
                    { name: "Warding Flare", level: 1, description: "Impose disadvantage on attacks" },
                    { name: "Improved Flares", level: 6, description: "More flares per rest" },
                    { name: "Corona of Light", level: 17, description: "Emit protective light aura" }
                ]
            }
        ]
    },

    "Druid": {
        name: "Druid",
        description: "A priest of the Old Faith, wielding the powers of nature — moonlight and plant growth, fire and lightning — and adopting animal forms.",
        hitDice: "d8",
        hitPointsAtLevel1: 8,
        armorProficiencies: ["light", "medium"],
        weaponProficiencies: ["simple"],
        toolProficiencies: ["Herbalism Kit"],
        skillProficiencies: [
            "Arcana", "Animal Handling", "Insight", "Medicine",
            "Nature", "Perception", "Religion", "Survival"
        ],
        skillChoices: 2,
        savingThrowProficiencies: ["Intelligence", "Wisdom"],
        spellcastingAbility: "wisdom",
        cantripsKnownAtLevel1: 2,
        spellsKnownAtLevel1: 8,
        spellSlots: {
            1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
            4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
            5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        },
        subclassLevel: 2,
        classFeatures: [
            { name: "Spellcasting", level: 1, description: "Cast spells using Wisdom" },
            { name: "Druidic", level: 1, description: "Speak and write Druidic language" },
            { name: "Wild Shape", level: 2, description: "Transform into animal form" },
            { name: "Wild Shape Improvement", level: 4, description: "Extend wild shape duration" },
            { name: "Wild Shape Flying", level: 8, description: "Become flying animals" },
            { name: "Wild Shape Swimming", level: 8, description: "Become aquatic animals" },
            { name: "Timeless Body", level: 18, description: "Age slower" },
            { name: "Beast Spells", level: 18, description: "Cast spells while in wild shape" },
            { name: "Unlimited Wild Shape", level: 20, description: "Transform unlimited times" }
        ],
        subclasses: [
            {
                name: "Circle of the Land",
                description: "Harness the spirits of nature and terrain",
                features: [
                    { name: "Bonus Cantrip", level: 2, description: "Learn additional cantrip" },
                    { name: "Natural Recovery", level: 2, description: "Recover spell slots during rest" },
                    { name: "Circle Spells", level: 3, description: "Gain terrain-specific spells" },
                    { name: "Improved Recovery", level: 6, description: "Recover more spell slots" },
                    { name: "Nature Sanctuary", level: 14, description: "Creatures can't attack in your terrain" }
                ]
            },
            {
                name: "Circle of the Moon",
                description: "Master wild shape and transformation",
                features: [
                    { name: "Combat Wild Shape", level: 2, description: "Attack while in wild shape" },
                    { name: "Circle Spells", level: 2, description: "Cast spells while in wild shape" },
                    { name: "Primal Strike", level: 6, description: "Weapon attacks count as magical" },
                    { name: "Elemental Wild Shape", level: 8, description: "Transform into elementals" },
                    { name: "Thousand Forms", level: 20, description: "Change wild shape at will" }
                ]
            },
            {
                name: "Circle of the Shepherd",
                description: "Command animal companions and spirits",
                features: [
                    { name: "Speech of the Woods", level: 2, description: "Speak with animals" },
                    { name: "Healing Spirit", level: 2, description: "Heal allies in circle" },
                    { name: "Spirit Totem", level: 6, description: "Summon protective spirit" },
                    { name: "Faithful Summons", level: 14, description: "Summon animal protectors" }
                ]
            },
            {
                name: "Circle of Dreams",
                description: "Step between waking and dreaming",
                features: [
                    { name: "Rest Restoration", level: 2, description: "Grant healing during rest" },
                    { name: "Balm of the Summer Court", level: 2, description: "Heal and charm" },
                    { name: "Hearth of Moonlight and Shadow", level: 6, description: "Create safe camp" },
                    { name: "Hidden Paths", level: 10, description: "Teleport through magical space" }
                ]
            },
            {
                name: "Circle of Spores",
                description: "Embrace decay and fungal growth",
                features: [
                    { name: "Symbiotic Entity", level: 2, description: "Form bond with spore colony" },
                    { name: "Fungal Body", level: 6, description: "Gain poison immunity and cloud" },
                    { name: "Spreading Spores", level: 10, description: "Infect others with spores" },
                    { name: "Fungal Infestation", level: 14, description: "Control infected creatures" }
                ]
            },
            {
                name: "Circle of Wildfire",
                description: "Control and commune with fire",
                features: [
                    { name: "Wildfire Spirit", level: 2, description: "Summon fire spirit companion" },
                    { name: "Enhanced Bond", level: 6, description: "Strengthen spirit connection" },
                    { name: "Cauterizing Flames", level: 10, description: "Fire spreads from spirit" },
                    { name: "Blazing Revival", level: 14, description: "Spirit reignites when defeated" }
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
        skillProficiencies: [
            "Acrobatics", "Animal Handling", "Athletics", "History",
            "Insight", "Intimidation", "Perception", "Survival"
        ],
        skillChoices: 2,
        savingThrowProficiencies: ["Strength", "Constitution"],
        subclassLevel: 3,
        classFeatures: [
            { name: "Fighting Style", level: 1, description: "Choose a fighting style bonus" },
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

    "Monk": {
        name: "Monk",
        description: "A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection. Monks are unarmored combatants swift and deadly.",
        hitDice: "d8",
        hitPointsAtLevel1: 8,
        armorProficiencies: [],
        weaponProficiencies: ["simple"],
        toolProficiencies: ["Artisan's Tools or Musical Instrument (choose 1)"],
        skillProficiencies: [
            "Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"
        ],
        skillChoices: 2,
        savingThrowProficiencies: ["Strength", "Dexterity"],
        subclassLevel: 3,
        classFeatures: [
            { name: "Martial Arts", level: 1, description: "Unarmed strikes deal more damage" },
            { name: "Unarmored Defense", level: 1, description: "AC = 10 + DEX + WIS" },
            { name: "Martial Arts Damage", level: 1, description: "Unarmed damage increases with level" },
            { name: "Ki Points", level: 1, description: "Fuel special abilities with ki" },
            { name: "Unarmored Movement", level: 2, description: "Move faster without armor" },
            { name: "Monastic Tradition", level: 3, description: "Choose a tradition" },
            { name: "Extra Attack", level: 5, description: "Attack twice when you use Attack action" },
            { name: "Stunning Strike", level: 5, description: "Stun enemies with strike" },
            { name: "Empty Body", level: 18, description: "Become invisible and ethereal" },
            { name: "Perfect Self", level: 20, description: "Gain unlimited ki points" }
        ],
        subclasses: [
            {
                name: "Way of the Open Hand",
                description: "Traditional monastic martial arts",
                features: [
                    { name: "Open Hand Technique", level: 3, description: "Enhanced unarmed combat" },
                    { name: "Wholeness of Body", level: 6, description: "Heal yourself with ki" },
                    { name: "Tranquility", level: 11, description: "Can't be harmed in meditation" }
                ]
            },
            {
                name: "Way of the Four Elements",
                description: "Channel elemental forces",
                features: [
                    { name: "Disciple of the Elements", level: 3, description: "Learn elemental disciplines" },
                    { name: "Elemental Attunement", level: 6, description: "Attune to elements" },
                    { name: "Improved Disciplines", level: 11, description: "Master more disciplines" }
                ]
            },
            {
                name: "Way of the Long Death",
                description: "Master the boundary between life and death",
                features: [
                    { name: "Touch of Death", level: 3, description: "Deal necrotic damage with strikes" },
                    { name: "Hour of Reaping", level: 6, description: "See death approaching" },
                    { name: "Mastery of Death", level: 11, description: "Survive lethal damage" },
                    { name: "Touch of the Long Death", level: 17, description: "Deal massive death energy" }
                ]
            },
            {
                name: "Way of Shadow",
                description: "Move like shadows and strike from darkness",
                features: [
                    { name: "Shadow Arts", level: 3, description: "Cast shadow spells" },
                    { name: "Shadow Step", level: 6, description: "Teleport between shadows" },
                    { name: "Cloak of Shadows", level: 11, description: "Turn invisible in darkness" },
                    { name: "Master of Shadows", level: 17, description: "Perfect shadow mastery" }
                ]
            },
            {
                name: "Way of the Sun Soul",
                description: "Channel the power of the sun",
                features: [
                    { name: "Radiant Sun Bolt", level: 3, description: "Throw radiant energy" },
                    { name: "Searing Sunburst", level: 6, description: "Explode with radiant power" },
                    { name: "Sun Shield", level: 11, description: "Glow with protective light" },
                    { name: "Sun Ascendant", level: 17, description: "Become one with the sun" }
                ]
            },
            {
                name: "Way of Mercy",
                description: "Balance healing and harm",
                features: [
                    { name: "Hand of Healing", level: 3, description: "Heal allies with touch" },
                    { name: "Hand of Harm", level: 3, description: "Damage enemies with touch" },
                    { name: "Physician's Touch", level: 6, description: "Cure diseases and poisons" },
                    { name: "Flurry of Healing and Harm", level: 11, description: "Heal and damage simultaneously" }
                ]
            }
        ]
    },

    "Paladin": {
        name: "Paladin",
        description: "A holy warrior bound by a sacred oath to fight for justice and righteousness. Paladins are blessed with divine magic and can smite their foes.",
        hitDice: "d10",
        hitPointsAtLevel1: 10,
        armorProficiencies: ["light", "medium", "heavy", "shields"],
        weaponProficiencies: ["simple", "martial"],
        toolProficiencies: [],
        skillProficiencies: [
            "Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"
        ],
        skillChoices: 2,
        savingThrowProficiencies: ["Wisdom", "Charisma"],
        spellcastingAbility: "charisma",
        spellsKnownAtLevel1: 0,
        spellSlots: {
            1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [2, 0, 0, 0, 0, 0, 0, 0, 0],
            4: [2, 2, 0, 0, 0, 0, 0, 0, 0],
            5: [3, 2, 0, 0, 0, 0, 0, 0, 0],
        },
        subclassLevel: 3,
        classFeatures: [
            { name: "Divine Sense", level: 1, description: "Sense celestials, fiends, and undead" },
            { name: "Lay on Hands", level: 1, description: "Heal allies with touch" },
            { name: "Divine Smite", level: 1, description: "Add divine damage to weapon attacks" },
            { name: "Spellcasting", level: 3, description: "Cast spells using Charisma" },
            { name: "Channel Divinity", level: 2, description: "Channel divine power for effects" },
            { name: "Extra Attack", level: 5, description: "Attack twice when you use Attack action" },
            { name: "Improved Divine Smite", level: 11, description: "Enhanced smite damage" },
            { name: "Cleansing Touch", level: 14, description: "Remove conditions with touch" },
            { name: "Holy Nimbus", level: 20, description: "Shine with divine light" }
        ],
        subclasses: [
            {
                name: "Oath of Devotion",
                description: "Serve justice and protect the weak",
                features: [
                    { name: "Tenets of Devotion", level: 3, description: "Hold sacred oaths" },
                    { name: "Sacred Weapon", level: 3, description: "Enhance weapon with light" },
                    { name: "Blessed Strikes", level: 3, description: "Add radiant damage" },
                    { name: "Improved Defense", level: 6, description: "Gain extra defenses" },
                    { name: "Holy Nimbus", level: 20, description: "Emit protective light" }
                ]
            },
            {
                name: "Oath of the Ancients",
                description: "Preserve and protect nature",
                features: [
                    { name: "Tenets of the Ancients", level: 3, description: "Live in harmony with nature" },
                    { name: "Nature's Wrath", level: 3, description: "Summon nature to attack" },
                    { name: "Ensnaring Strike", level: 3, description: "Entangle with vines" },
                    { name: "Undying Sentinel", level: 7, description: "Can't die of old age" },
                    { name: "Elder Champion", level: 20, description: "Become one with nature" }
                ]
            },
            {
                name: "Oath of Vengeance",
                description: "Hunt evil and deliver justice",
                features: [
                    { name: "Tenets of Vengeance", level: 3, description: "Swear to hunt evil" },
                    { name: "Abjure Enemy", level: 3, description: "Fear strike against foes" },
                    { name: "Vow of Enmity", level: 3, description: "Gain advantage against target" },
                    { name: "Relentless Avenger", level: 7, description: "Move as reaction" },
                    { name: "Soul of Vengeance", level: 20, description: "Unlimited vengeance" }
                ]
            },
            {
                name: "Oath of Redemption",
                description: "Seek to redeem even the darkest souls",
                features: [
                    { name: "Tenets of Redemption", level: 3, description: "Offer redemption" },
                    { name: "Emissary of Peace", level: 3, description: "Charm with words" },
                    { name: "Rebuke the Violent", level: 3, description: "Protect allies from harm" },
                    { name: "Protective Spirit", level: 7, description: "Healing aura" },
                    { name: "Emissary of Redemption", level: 20, description: "Redeem anyone" }
                ]
            },
            {
                name: "Oath of Conquest",
                description: "Conquer evil with overwhelming power",
                features: [
                    { name: "Tenets of Conquest", level: 3, description: "Dominate through strength" },
                    { name: "Conquering Strike", level: 3, description: "Frighten with strikes" },
                    { name: "Guided Strike", level: 3, description: "Gain bonuses to attacks" },
                    { name: "Aura of Conquest", level: 7, description: "Enemies slow near you" },
                    { name: "Invincible Conqueror", level: 20, description: "Become unstoppable" }
                ]
            },
            {
                name: "Oath of the Watchers",
                description: "Guard against interdimensional threats",
                features: [
                    { name: "Tenets of the Watchers", level: 3, description: "Watch for otherworldly dangers" },
                    { name: "Watcher's Will", level: 3, description: "Telepathic bonuses" },
                    { name: "Abjure the Extraplanar", level: 3, description: "Banish other-worldly beings" },
                    { name: "Piercing Sight", level: 7, description: "See through illusions" },
                    { name: "Mortal Bulwark", level: 20, description: "Defend against all threats" }
                ]
            }
        ]
    },

    "Ranger": {
        name: "Ranger",
        description: "A warrior who hunts the creatures of the wilderness, armed with combat prowess and the magical connection to nature. Rangers are skilled trackers and scouts.",
        hitDice: "d10",
        hitPointsAtLevel1: 10,
        armorProficiencies: ["light", "medium"],
        weaponProficiencies: ["simple", "martial"],
        toolProficiencies: [],
        skillProficiencies: [
            "Animal Handling", "Athletics", "Insight", "Investigation",
            "Nature", "Perception", "Stealth", "Survival"
        ],
        skillChoices: 3,
        savingThrowProficiencies: ["Strength", "Dexterity"],
        spellcastingAbility: "wisdom",
        spellsKnownAtLevel1: 0,
        spellSlots: {
            1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [2, 0, 0, 0, 0, 0, 0, 0, 0],
            5: [2, 2, 0, 0, 0, 0, 0, 0, 0],
            9: [2, 2, 0, 0, 0, 0, 0, 0, 0],
        },
        subclassLevel: 3,
        classFeatures: [
            { name: "Favored Enemy", level: 1, description: "Gain bonuses against certain creatures" },
            { name: "Natural Explorer", level: 1, description: "Move easily through terrain" },
            { name: "Spellcasting", level: 5, description: "Cast spells using Wisdom" },
            { name: "Fighting Style", level: 1, description: "Choose a fighting style" },
            { name: "Extra Attack", level: 5, description: "Attack twice when you use Attack action" },
            { name: "Ranger's Companion", level: 7, description: "Bond with an animal" },
            { name: "Hunter's Sense", level: 11, description: "Track creatures" },
            { name: "Superior Hunter's Defense", level: 15, description: "Dodge damage from attacks" },
            { name: "Feral Senses", level: 18, description: "Sense nearby creatures" }
        ],
        subclasses: [
            {
                name: "Hunter",
                description: "Master hunter of all prey",
                features: [
                    { name: "Colossus Slayer", level: 3, description: "Extra damage to wounded foes" },
                    { name: "Extra Attack", level: 5, description: "Attack twice" },
                    { name: "Multiattack", level: 11, description: "Attack three times" },
                    { name: "Superior Hunter's Lore", level: 15, description: "Track and predict prey" }
                ]
            },
            {
                name: "Beast Master",
                description: "Bond with an animal companion",
                features: [
                    { name: "Ranger's Companion", level: 3, description: "Tame an animal friend" },
                    { name: "Exceptional Training", level: 7, description: "Train your companion" },
                    { name: "Bestial Fury", level: 11, description: "Your companion attacks more" },
                    { name: "Share Spells", level: 15, description: "Cast spells on your companion" }
                ]
            },
            {
                name: "Monster Slayer",
                description: "Specialize in hunting supernatural threats",
                features: [
                    { name: "Monster Slayer", level: 3, description: "Gain bonuses against monsters" },
                    { name: "Hunter's Sense", level: 7, description: "Sense supernatural creatures" },
                    { name: "Slayer's Counter", level: 11, description: "Counterattack monsters" },
                    { name: "Apex Predator", level: 15, description: "Hunt at maximum efficiency" }
                ]
            },
            {
                name: "Gloom Stalker",
                description: "Hunt in shadows and darkness",
                features: [
                    { name: "Dread Ambusher", level: 3, description: "Initiative bonus and extra damage" },
                    { name: "Umbral Sight", level: 3, description: "See in darkness" },
                    { name: "Iron Mind", level: 7, description: "Immunity to charm and fear" },
                    { name: "Stalker's Flurry", level: 11, description: "Extra attack as bonus action" }
                ]
            },
            {
                name: "Swarmkeeper",
                description: "Command swarms of tiny creatures",
                features: [
                    { name: "Gathered Swarm", level: 3, description: "Control swarm of insects" },
                    { name: "Swarmkeeper Magic", level: 3, description: "Swarm casts spells" },
                    { name: "Writhing Swarm", level: 7, description: "Swarm protects you" },
                    { name: "Mighty Swarm", level: 11, description: "Swarm deals more damage" }
                ]
            },
            {
                name: "Fey Wanderer",
                description: "Befriend the fey and tricksters",
                features: [
                    { name: "Dreadful Strikes", level: 3, description: "Psychic damage" },
                    { name: "Fey Reinforcements", level: 3, description: "Summon fey allies" },
                    { name: "Fey Reinforcements", level: 7, description: "More fey summoned" },
                    { name: "Fey Reinforcements Improved", level: 11, description: "Better fey summoned" }
                ]
            }
        ]
    },

    "Rogue": {
        name: "Rogue",
        description: "A scoundrel who uses stealth and trickery to overcome obstacles and enemies. Rogues have a knack for finding the solution to any problem, usually involving deception or thievery.",
        hitDice: "d8",
        hitPointsAtLevel1: 8,
        armorProficiencies: ["light"],
        weaponProficiencies: ["simple"],
        toolProficiencies: ["Thieves' Tools"],
        skillProficiencies: [
            "Acrobatics", "Athletics", "Deception", "Insight", "Intimidation",
            "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"
        ],
        skillChoices: 4,
        savingThrowProficiencies: ["Dexterity", "Intelligence"],
        subclassLevel: 3,
        classFeatures: [
            { name: "Expertise", level: 1, description: "Double proficiency in chosen skills" },
            { name: "Sneak Attack", level: 1, description: "Extra damage when conditions are met" },
            { name: "Thieves' Cant", level: 1, description: "Speak secret rogue language" },
            { name: "Cunning Action", level: 2, description: "Dash, disengage, or hide as bonus action" },
            { name: "Roguish Archetype", level: 3, description: "Choose an archetype" },
            { name: "Uncanny Dodge", level: 5, description: "Reduce damage taken" },
            { name: "Evasion", level: 7, description: "Avoid most effects of spells" },
            { name: "Feat", level: 10, description: "Gain special ability or improvement" },
            { name: "Stroke of Luck", level: 20, description: "Turn failed roll into success" }
        ],
        subclasses: [
            {
                name: "Thief",
                description: "Master of theft and heists",
                features: [
                    { name: "Fast Hands", level: 3, description: "Use thieves' tools faster" },
                    { name: "Second-Story Work", level: 3, description: "Climb without using hands" },
                    { name: "Supreme Sneak", level: 9, description: "Disable traps faster" },
                    { name: "Use Magic Device", level: 13, description: "Use any magical item" }
                ]
            },
            {
                name: "Assassin",
                description: "Master of death and elimination",
                features: [
                    { name: "Assassinate", level: 3, description: "Kill with advantage" },
                    { name: "Assassinate Improvements", level: 9, description: "Enhanced assassination" },
                    { name: "Infiltration Expertise", level: 13, description: "Perfect cover identity" },
                    { name: "Death Strike", level: 17, description: "Devastating final blow" }
                ]
            },
            {
                name: "Arcane Trickster",
                description: "Blend magic with thievery",
                features: [
                    { name: "Spellcasting", level: 3, description: "Cast mage hand spells" },
                    { name: "Mage Hand Legerdemain", level: 3, description: "Magical mage hand" },
                    { name: "Magical Ambush", level: 9, description: "Cast spells in combat" },
                    { name: "Spell Thief", level: 13, description: "Steal spells from enemies" }
                ]
            },
            {
                name: "Mastermind",
                description: "Master manipulator and spy",
                features: [
                    { name: "Master of Intrigue", level: 3, description: "Language and disguise mastery" },
                    { name: "Master of Tactics", level: 3, description: "Help allies as bonus action" },
                    { name: "Insightful Manipulator", level: 9, description: "Read creatures instantly" },
                    { name: "Soul of Deceit", level: 13, description: "Undetectable lies" }
                ]
            },
            {
                name: "Phantom",
                description: "Commune with spirits of the dead",
                features: [
                    { name: "Whispers of the Dead", level: 3, description: "Speak with ghosts" },
                    { name: "Wails from the Grave", level: 3, description: "Deal psychic damage" },
                    { name: "One with Shadows", level: 9, description: "Fade into shadows" },
                    { name: "Death's Friend", level: 13, description: "Cheat death once per day" }
                ]
            },
            {
                name: "Soulknife",
                description: "Manifest psychic blades",
                features: [
                    { name: "Psychic Blades", level: 3, description: "Manifest psychic weapons" },
                    { name: "Soul Blades", level: 3, description: "Enhanced psychic powers" },
                    { name: "Psychic Veil", level: 9, description: "Hide from detection" },
                    { name: "Rend Mind", level: 13, description: "Devastating psychic strike" }
                ]
            }
        ]
    },

    "Sorcerer": {
        name: "Sorcerer",
        description: "A spellcaster who draws on inherent magic from a gift or bloodline. Sorcerers have an innate, unlearned magical ability arising from some external influence or gift.",
        hitDice: "d6",
        hitPointsAtLevel1: 6,
        armorProficiencies: [],
        weaponProficiencies: ["simple"],
        toolProficiencies: [],
        skillProficiencies: [
            "Arcana", "Deception", "Insight", "Intimidation", "Perception", "Persuasion"
        ],
        skillChoices: 2,
        savingThrowProficiencies: ["Charisma", "Dexterity"],
        spellcastingAbility: "charisma",
        cantripsKnownAtLevel1: 4,
        spellsKnownAtLevel1: 2,
        spellSlots: {
            1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
            4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
            5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        },
        subclassLevel: 1,
        classFeatures: [
            { name: "Spellcasting", level: 1, description: "Cast spells using Charisma" },
            { name: "Sorcerous Points", level: 1, description: "Fuel spellcasting with points" },
            { name: "Font of Magic", level: 2, description: "Convert spells to points and vice versa" },
            { name: "Metamagic", level: 3, description: "Alter spells with magical effects" },
            { name: "Ability Score Improvement", level: 4, description: "Increase ability scores" },
            { name: "Improved Metamagic", level: 10, description: "More metamagic options" },
            { name: "Magical Guidance", level: 14, description: "Guide your spells" },
            { name: "Sorcerous Restoration", level: 20, description: "Regain points on initiative" }
        ],
        subclasses: [
            {
                name: "Draconic Bloodline",
                description: "Channel dragon ancestry",
                features: [
                    { name: "Dragon Ancestor", level: 1, description: "Choose your dragon patron" },
                    { name: "Draconic Resilience", level: 1, description: "AC and HP bonus" },
                    { name: "Elemental Affinity", level: 6, description: "Element damage bonus" },
                    { name: "Dragon Wings", level: 14, description: "Grow dragon wings" },
                    { name: "Draconic Presence", level: 18, description: "Aura of dragon power" }
                ]
            },
            {
                name: "Wild Magic",
                description: "Channel chaotic magical forces",
                features: [
                    { name: "Wild Magic Surge", level: 1, description: "Random magical effects" },
                    { name: "Tides of Chaos", level: 1, description: "Gain advantage using chaos" },
                    { name: "Bend Luck", level: 6, description: "Alter fate" },
                    { name: "Controlled Chaos", level: 14, description: "Control magical surges" },
                    { name: "Spell Bombardment", level: 18, description: "Trigger surge on spell hit" }
                ]
            },
            {
                name: "Shadow Magic",
                description: "Master darkness and shadows",
                features: [
                    { name: "Eyes of the Dark", level: 1, description: "Darkvision and shadow spells" },
                    { name: "Strength of the Master's Shadow", level: 1, description: "Dark power bonus" },
                    { name: "Hound of Ill Omen", level: 6, description: "Summon shadow hound" },
                    { name: "Shadow Walk", level: 14, description: "Teleport through shadows" },
                    { name: "Master of Shadows", level: 18, description: "Perfect shadow mastery" }
                ]
            },
            {
                name: "Divine Soul",
                description: "Channel divine power",
                features: [
                    { name: "Divine Magic", level: 1, description: "Learn divine spells" },
                    { name: "Favored by the Gods", level: 6, description: "Reroll ability checks" },
                    { name: "Empowered Healing", level: 6, description: "Heal more effectively" },
                    { name: "Otherworldly Wings", level: 14, description: "Gain holy wings" },
                    { name: "Unearthly Recovery", level: 18, description: "Recover from death" }
                ]
            },
            {
                name: "Storm Sorcery",
                description: "Command storms and lightning",
                features: [
                    { name: "Tempestuous Magic", level: 1, description: "Move after casting spell" },
                    { name: "Heart of the Storm", level: 6, description: "Elemental affinity" },
                    { name: "Storm Guide", level: 6, description: "Control weather" },
                    { name: "Stormborn", level: 14, description: "Gain flight and resistances" },
                    { name: "Storm Soul", level: 18, description: "Become one with storms" }
                ]
            },
            {
                name: "Aberrant Mind",
                description: "Channel psionic powers",
                features: [
                    { name: "Telepathic Spells", level: 1, description: "Cast spells telepathically" },
                    { name: "Expanded Spell List", level: 1, description: "Learn psionic spells" },
                    { name: "Psychic Defenses", level: 6, description: "Resist mind effects" },
                    { name: "Revelation in Flesh", level: 14, description: "Psychic enhancements" },
                    { name: "Wrent Mind", level: 18, description: "Devastating psychic power" }
                ]
            }
        ]
    },

    "Warlock": {
        name: "Warlock",
        description: "A spellcaster who has made a pact with a powerful otherworldly being. Warlocks bind themselves to eldritch powers in exchange for magical knowledge and abilities.",
        hitDice: "d8",
        hitPointsAtLevel1: 8,
        armorProficiencies: ["light"],
        weaponProficiencies: ["simple"],
        toolProficiencies: [],
        skillProficiencies: [
            "Arcana", "Deception", "History", "Insight", "Intimidation",
            "Investigation", "Nature", "Religion"
        ],
        skillChoices: 2,
        savingThrowProficiencies: ["Wisdom", "Charisma"],
        spellcastingAbility: "charisma",
        cantripsKnownAtLevel1: 2,
        spellsKnownAtLevel1: 2,
        spellSlots: {
            1: [1, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [1, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [2, 2, 0, 0, 0, 0, 0, 0, 0],
            4: [2, 2, 0, 0, 0, 0, 0, 0, 0],
            5: [2, 2, 2, 0, 0, 0, 0, 0, 0],
        },
        subclassLevel: 1,
        classFeatures: [
            { name: "The Otherworldly Patron", level: 1, description: "Make a pact with a being" },
            { name: "Pact Magic", level: 1, description: "Regain spells on short rest" },
            { name: "Eldritch Invocations", level: 2, description: "Learn special abilities" },
            { name: "Eldritch Invocation", level: 2, description: "Gain custom abilities" },
            { name: "Ability Score Improvement", level: 4, description: "Increase ability scores" },
            { name: "Mystic Arcanum", level: 11, description: "Learn powerful spells" },
            { name: "One with Shadows", level: 6, description: "Hide in dim light" },
            { name: "Eldritch Master", level: 20, description: "Ultimate eldritch power" }
        ],
        subclasses: [
            {
                name: "The Fiend",
                description: "Pact with a demon or devil",
                features: [
                    { name: "Expanded Spell List", level: 1, description: "Learn fiendish spells" },
                    { name: "Dark One's Blessing", level: 1, description: "Gain temp HP on kills" },
                    { name: "Dark One's Own Luck", level: 6, description: "Reroll a d20" },
                    { name: "Fiendish Resilience", level: 10, description: "Resistance to damage" },
                    { name: "Hurl Through Hell", level: 14, description: "Teleport enemy to hell" }
                ]
            },
            {
                name: "The Great Old One",
                description: "Pact with an ancient cosmic entity",
                features: [
                    { name: "Expanded Spell List", level: 1, description: "Learn cosmic spells" },
                    { name: "Awakened Mind", level: 1, description: "Telepathic contact" },
                    { name: "Entropic Ward", level: 6, description: "Gain advantage on saves" },
                    { name: "Thought Shield", level: 10, description: "Reflect telepathy" },
                    { name: "Create Thrall", level: 14, description: "Control minds" }
                ]
            },
            {
                name: "The Archfey",
                description: "Pact with a fey lord",
                features: [
                    { name: "Expanded Spell List", level: 1, description: "Learn fey spells" },
                    { name: "Fey Presence", level: 1, description: "Charm and frighten" },
                    { name: "Misty Escape", level: 6, description: "Teleport away" },
                    { name: "Beguiling Defenses", level: 10, description: "Can't be charmed" },
                    { name: "Dark Delirium", level: 14, description: "Trap in illusion" }
                ]
            },
            {
                name: "The Celestial",
                description: "Pact with a celestial being",
                features: [
                    { name: "Expanded Spell List", level: 1, description: "Learn holy spells" },
                    { name: "Healing Light", level: 1, description: "Heal allies" },
                    { name: "Radiant Soul", level: 6, description: "Add radiant damage" },
                    { name: "Celestial Resilience", level: 10, description: "Gain resistance" },
                    { name: "Improved Healing", level: 14, description: "Heal more" }
                ]
            },
            {
                name: "The Hexblade",
                description: "Pact with a shadow fey",
                features: [
                    { name: "Expanded Spell List", level: 1, description: "Learn weapon spells" },
                    { name: "Hexblade's Curse", level: 1, description: "Curse enemies" },
                    { name: "Accursed Specter", level: 6, description: "Summon ghost" },
                    { name: "Armor of Hexes", level: 10, description: "Protect yourself" },
                    { name: "Master of Hexes", level: 14, description: "Perfect curse control" }
                ]
            },
            {
                name: "The Raven Queen",
                description: "Pact with a mysterious raven patron",
                features: [
                    { name: "Expanded Spell List", level: 1, description: "Learn raven spells" },
                    { name: "Raven Familiar", level: 1, description: "Bond with a raven" },
                    { name: "Gift of the Ever-Living Ones", level: 6, description: "No longer age" },
                    { name: "Flock Guardian", level: 10, description: "Summon raven swarm" },
                    { name: "Master of Ravens", level: 14, description: "Control all ravens" }
                ]
            }
        ]
    },

    "Wizard": {
        name: "Wizard",
        description: "A scholarly magic-user capable of manipulating the structures of reality. Wizards spend years learning the theory and practice of magic, mastering a wide variety of spells.",
        hitDice: "d6",
        hitPointsAtLevel1: 6,
        armorProficiencies: [],
        weaponProficiencies: ["simple"],
        toolProficiencies: [],
        skillProficiencies: [
            "Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"
        ],
        skillChoices: 2,
        savingThrowProficiencies: ["Intelligence", "Wisdom"],
        spellcastingAbility: "intelligence",
        cantripsKnownAtLevel1: 3,
        spellsKnownAtLevel1: 6,
        spellSlots: {
            1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
            4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
            5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
        },
        subclassLevel: 2,
        classFeatures: [
            { name: "Spellcasting", level: 1, description: "Cast spells from spellbook" },
            { name: "Spellbook", level: 1, description: "Record spells in spellbook" },
            { name: "Arcane Recovery", level: 1, description: "Recover spell slots on rest" },
            { name: "Arcane Tradition", level: 2, description: "Choose a tradition" },
            { name: "Ability Score Improvement", level: 4, description: "Increase ability scores" },
            { name: "Spell Mastery", level: 18, description: "Cast spells at will" },
            { name: "Signature Spells", level: 20, description: "Ultimate spell mastery" }
        ],
        subclasses: [
            {
                name: "Abjuration",
                description: "Master protective magic",
                features: [
                    { name: "Abjuration Savant", level: 2, description: "Learn abjuration faster" },
                    { name: "Arcane Ward", level: 2, description: "Protective ward" },
                    { name: "Projected Ward", level: 6, description: "Extend ward to others" },
                    { name: "Improved Abjuration", level: 10, description: "Strengthen wards" },
                    { name: "Spell Resistance", level: 14, description: "Resist all magic" }
                ]
            },
            {
                name: "Conjuration",
                description: "Master summoning and creation",
                features: [
                    { name: "Conjuration Savant", level: 2, description: "Learn conjuration faster" },
                    { name: "Minor Conjuration", level: 2, description: "Create small objects" },
                    { name: "Benign Transposition", level: 6, description: "Swap positions" },
                    { name: "Improved Conjuration", level: 10, description: "Enhance summoning" },
                    { name: "Durable Summons", level: 14, description: "Summons last longer" }
                ]
            },
            {
                name: "Divination",
                description: "Master knowledge and prophecy",
                features: [
                    { name: "Divination Savant", level: 2, description: "Learn divination faster" },
                    { name: "Diviner's Intuition", level: 2, description: "Reroll d20s" },
                    { name: "The Third Eye", level: 6, description: "Magical sight" },
                    { name: "Greater Intuition", level: 14, description: "Enhanced divination" },
                    { name: "Vision", level: 18, description: "Perfect divination sight" }
                ]
            },
            {
                name: "Enchantment",
                description: "Master charm and persuasion",
                features: [
                    { name: "Enchantment Savant", level: 2, description: "Learn enchantment faster" },
                    { name: "Hypnotic Gaze", level: 2, description: "Mesmerize with gaze" },
                    { name: "Instinctive Charm", level: 6, description: "Charm attackers" },
                    { name: "Split Enchantment", level: 10, description: "Enchant multiple targets" },
                    { name: "Alter Memory", level: 14, description: "Rewrite memories" }
                ]
            },
            {
                name: "Evocation",
                description: "Master destructive magic",
                features: [
                    { name: "Evocation Savant", level: 2, description: "Learn evocation faster" },
                    { name: "Sculpt Spells", level: 2, description: "Protect allies from spells" },
                    { name: "Potent Cantrip", level: 6, description: "Cantrips never miss" },
                    { name: "Empowered Evocation", level: 10, description: "Damage bonus to spells" },
                    { name: "Overchannel", level: 14, description: "Cast powerful spells" }
                ]
            },
            {
                name: "Illusion",
                description: "Master deception and illusions",
                features: [
                    { name: "Illusion Savant", level: 2, description: "Learn illusion faster" },
                    { name: "Improved Minor Illusion", level: 2, description: "Enhanced minor illusions" },
                    { name: "Malleable Illusions", level: 6, description: "Change illusions at will" },
                    { name: "Illusory Self", level: 10, description: "Create illusory copies" },
                    { name: "Illusory Reality", level: 14, description: "Make illusions real" }
                ]
            },
            {
                name: "Necromancy",
                description: "Master death and undeath",
                features: [
                    { name: "Necromancy Savant", level: 2, description: "Learn necromancy faster" },
                    { name: "Grim Harvest", level: 2, description: "Gain HP from killing" },
                    { name: "Undead Thralls", level: 6, description: "Enhanced undead control" },
                    { name: "Inured to Undeath", level: 10, description: "Resist undeath effects" },
                    { name: "Command Undead", level: 14, description: "Control powerful undead" }
                ]
            },
            {
                name: "Transmutation",
                description: "Master transformation and change",
                features: [
                    { name: "Transmutation Savant", level: 2, description: "Learn transmutation faster" },
                    { name: "Minor Alchemy", level: 2, description: "Alchemical transmutation" },
                    { name: "Transmuter's Stone", level: 6, description: "Create magical stone" },
                    { name: "Master Transmuter", level: 10, description: "Advanced transmutation" },
                    { name: "Shape Change", level: 14, description: "Transmute anything" }
                ]
            }
        ]
    }
};
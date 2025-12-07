export type FeatureType = 'passive' | 'active' | 'resistance' | 'proficiency' | 'cantrip' | 'spell' | 'ability-boost';

export interface FeatureData {
    name: string;
    description: string;
    icon: string;
    type: FeatureType;
    level?: number;
    frequency?: 'at-will' | 'per-long-rest' | 'per-short-rest' | 'once';
    scaling?: (level: number) => string;
}

export const featuresMap: {[key: string]: FeatureData} = {
    // Shared features
    ["Darkvision"]: {
        name: 'Darkvision',
        description: 'You can see in dim light within 18 meters of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.',
        icon: "👁️",
        type: 'passive'
    },
    ["Superior Darkvision"]: {
        name: 'Superior Darkvision',
        description: 'Your darkvision has a radius of 36 meters.',
        icon: "👁️",
        type: 'passive'
    },

    // Elf features
    ["Keen Senses"]: {
        name: 'Keen Senses',
        description: 'You have proficiency in the Perception skill.',
        icon: "👁️",
        type: 'proficiency'
    },
    ["Fey Ancestry"]: {
        name: 'Fey Ancestry',
        description: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.',
        icon: "✨",
        type: 'passive'
    },
    ["Trance"]: {
        name: 'Trance',
        description: 'Elves don\'t need to sleep. Instead, you meditate deeply, remaining semiconscious, for 4 hours a day. While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice.',
        icon: "💤",
        type: 'passive'
    },
    ["Elf Weapon Training"]: {
        name: 'Elf Weapon Training',
        description: 'You have proficiency with the longsword, shortsword, shortbow, and longbow.',
        icon: "🏹",
        type: 'proficiency'
    },
    ["Fleet of Foot"]: {
        name: 'Fleet of Foot',
        description: 'Your base walking speed increases to 10.5 meters.',
        icon: "💨",
        type: 'passive'
    },
    ["Mask of the Wild"]: {
        name: 'Mask of the Wild',
        description: 'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.',
        icon: "🌲",
        type: 'passive'
    },
    ["Sunlight Sensitivity"]: {
        name: 'Sunlight Sensitivity',
        description: 'You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.',
        icon: "☀️",
        type: 'passive'
    },
    ["Drow Magic"]: {
        name: 'Drow Magic',
        description: 'You know the dancing lights cantrip. When you reach 3rd level, you can cast the faerie fire spell once per day. When you reach 5th level, you can also cast the darkness spell once per day. Charisma is your spellcasting ability for these spells.',
        icon: "✨",
        type: 'spell',
        level: 1,
        frequency: 'per-long-rest'
    },

    // Dwarf features
    ["Dwarven Resilience"]: {
        name: 'Dwarven Resilience',
        description: 'You have advantage on saving throws against poison, and you have resistance against poison damage.',
        icon: "🛡️",
        type: 'passive'
    },
    ["Dwarven Combat Training"]: {
        name: 'Dwarven Combat Training',
        description: 'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.',
        icon: "⚒️",
        type: 'proficiency'
    },
    ["Stonecunning"]: {
        name: 'Stonecunning',
        description: 'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of any proficiency bonus you normally apply.',
        icon: "🪨",
        type: 'passive'
    },
    ["Dwarven Armor Training"]: {
        name: 'Dwarven Armor Training',
        description: 'You have proficiency with light and medium armor.',
        icon: "🛡️",
        type: 'proficiency'
    },
    ["Dwarven Toughness"]: {
        name: 'Dwarven Toughness',
        description: 'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.',
        icon: "💪",
        type: 'passive'
    },

    // Halfling features
    ["Lucky"]: {
        name: 'Lucky',
        description: 'When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.',
        icon: "🍀",
        type: 'passive'
    },
    ["Brave"]: {
        name: 'Brave',
        description: 'You have advantage on saving throws against being frightened.',
        icon: "💪",
        type: 'passive'
    },
    ["Halfling Nimbleness"]: {
        name: 'Halfling Nimbleness',
        description: 'You can move through the space of any creature that is of a size larger than yours.',
        icon: "💨",
        type: 'passive'
    },
    ["Naturally Stealthy"]: {
        name: 'Naturally Stealthy',
        description: 'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.',
        icon: "🥷",
        type: 'passive'
    },
    ["Stout Resilience"]: {
        name: 'Stout Resilience',
        description: 'You have advantage on saving throws against poison, and you have resistance to poison damage.',
        icon: "🛡️",
        type: 'resistance'
    },

    // Dragonborn features
    ["Breath Weapon"]: {
        name: 'Breath Weapon',
        description: 'You can use your action to exhale destructive energy. It deals 2d6 damage of a type determined by your draconic ancestry. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw (DC = 8 + your Constitution modifier + your proficiency bonus).',
        icon: "🔥",
        type: 'active',
        frequency: 'per-short-rest'
    },
    ["Lightning Breath"]: {
        name: 'Lightning Breath',
        description: 'Your breath weapon deals lightning damage in an 18-meter line that is 1.5 meters wide.',
        icon: "⚡",
        type: 'active',
        frequency: 'per-short-rest'
    },
    ["Lightning Resistance"]: {
        name: 'Lightning Resistance',
        description: 'You have resistance to lightning damage.',
        icon: "⚡",
        type: 'resistance'
    },
    ["Fire Breath"]: {
        name: 'Fire Breath',
        description: 'Your breath weapon deals fire damage in a 4.5-meter cone.',
        icon: "🔥",
        type: 'active',
        frequency: 'per-short-rest'
    },
    ["Fire Resistance"]: {
        name: 'Fire Resistance',
        description: 'You have resistance to fire damage.',
        icon: "🔥",
        type: 'resistance'
    },
    ["Poison Breath"]: {
        name: 'Poison Breath',
        description: 'Your breath weapon deals poison damage in a 4.5-meter cone.',
        icon: "☠️",
        type: 'active',
        frequency: 'per-short-rest'
    },
    ["Poison Resistance"]: {
        name: 'Poison Resistance',
        description: 'You have resistance to poison damage.',
        icon: "☠️",
        type: 'resistance'
    },
    ["Cold Breath"]: {
        name: 'Cold Breath',
        description: 'Your breath weapon deals cold damage in a 4.5-meter cone.',
        icon: "❄️",
        type: 'active',
        frequency: 'per-short-rest'
    },
    ["Cold Resistance"]: {
        name: 'Cold Resistance',
        description: 'You have resistance to cold damage.',
        icon: "❄️",
        type: 'resistance'
    },
    ["Acid Breath"]: {
        name: 'Acid Breath',
        description: 'Your breath weapon deals acid damage in an 18-meter line that is 1.5 meters wide.',
        icon: "🧪",
        type: 'active',
        frequency: 'per-short-rest'
    },
    ["Acid Resistance"]: {
        name: 'Acid Resistance',
        description: 'You have resistance to acid damage.',
        icon: "🧪",
        type: 'resistance'
    },
    ["Radiant Breath"]: {
        name: 'Radiant Breath',
        description: 'Your breath weapon deals radiant damage in a 4.5-meter cone.',
        icon: "☀️",
        type: 'active',
        frequency: 'per-short-rest'
    },
    ["Radiant Resistance"]: {
        name: 'Radiant Resistance',
        description: 'You have resistance to radiant damage.',
        icon: "☀️",
        type: 'resistance'
    },
    ["Psychic Breath"]: {
        name: 'Psychic Breath',
        description: 'Your breath weapon deals psychic damage in a 4.5-meter cone.',
        icon: "🧠",
        type: 'active',
        frequency: 'per-short-rest'
    },
    ["Psychic Resistance"]: {
        name: 'Psychic Resistance',
        description: 'You have resistance to psychic damage.',
        icon: "🧠",
        type: 'resistance'
    },

    // Gnome features
    ["Gnome Cunning"]: {
        name: 'Gnome Cunning',
        description: 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.',
        icon: "🧠",
        type: 'passive'
    },
    ["Gnome Ingenuity"]: {
        name: 'Gnome Ingenuity',
        description: 'When you make an ability check, you gain a bonus to the check equal to your proficiency bonus if you aren\'t already applying your proficiency bonus to the check.',
        icon: "🔧",
        type: 'passive'
    },
    ["Small Illusion"]: {
        name: 'Small Illusion',
        description: 'You know the minor illusion cantrip. Intelligence is your spellcasting ability for it.',
        icon: "✨",
        type: 'cantrip'
    },
    ["Speak with Small Beasts"]: {
        name: 'Speak with Small Beasts',
        description: 'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts.',
        icon: "🐿️",
        type: 'passive'
    },
    ["Tinker"]: {
        name: 'Tinker',
        description: 'You have proficiency with artisan\'s tools (tinker\'s tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp).',
        icon: "🔧",
        type: 'proficiency'
    },
    ["Proficiency with Artisan's Tools"]: {
        name: 'Proficiency with Artisan\'s Tools',
        description: 'You gain proficiency with one type of artisan\'s tools of your choice.',
        icon: "🔨",
        type: 'proficiency'
    },

    // Half-Elf features
    ["Skill Versatility"]: {
        name: 'Skill Versatility',
        description: 'You gain proficiency in two skills of your choice.',
        icon: "📚",
        type: 'proficiency'
    },

    // Half-Orc features
    ["Menacing"]: {
        name: 'Menacing',
        description: 'You gain proficiency in the Intimidation skill.',
        icon: "😠",
        type: 'proficiency'
    },
    ["Relentless Endurance"]: {
        name: 'Relentless Endurance',
        description: 'When you are reduced to 0 hit points but not killed outright, you can choose to drop to 1 hit point instead. You can\'t use this feature again until you finish a long rest.',
        icon: "💚",
        type: 'active',
        frequency: 'per-long-rest'
    },

    // Tiefling features
    ["Hellish Resistance"]: {
        name: 'Hellish Resistance',
        description: 'You have resistance to fire damage.',
        icon: "🔥",
        type: 'resistance'
    },
    ["Legacy of Nessus"]: {
        name: 'Legacy of Nessus',
        description: 'You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the hellish rebuke spell once with this trait. When you reach 5th level, you can also cast the darkness spell once. You regain the ability to cast these spells when you finish a long rest.',
        icon: "😈",
        type: 'spell',
        level: 1,
        frequency: 'per-long-rest'
    },
    ["Legacy of Maladomini"]: {
        name: 'Legacy of Maladomini',
        description: 'You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the ray of sickness spell once with this trait. When you reach 5th level, you can also cast the crown of madness spell once. You regain the ability to cast these spells when you finish a long rest.',
        icon: "🤢",
        type: 'spell',
        level: 1,
        frequency: 'per-long-rest'
    },
    ["Legacy of Dis"]: {
        name: 'Legacy of Dis',
        description: 'You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the disguise self spell once with this trait. When you reach 5th level, you can also cast the detect thoughts spell once. You regain the ability to cast these spells when you finish a long rest.',
        icon: "🎭",
        type: 'spell',
        level: 1,
        frequency: 'per-long-rest'
    },
    ["Legacy of Phlegethos"]: {
        name: 'Legacy of Phlegethos',
        description: 'You know the friends cantrip. When you reach 3rd level, you can cast the charm person spell once with this trait. When you reach 5th level, you can also cast the suggestion spell once. You regain the ability to cast these spells when you finish a long rest.',
        icon: "💕",
        type: 'spell',
        level: 1,
        frequency: 'per-long-rest'
    },
    ["Legacy of Malbolge"]: {
        name: 'Legacy of Malbolge',
        description: 'You know the minor illusion cantrip. When you reach 3rd level, you can cast the disguise self spell once with this trait. When you reach 5th level, you can also cast the invisibility spell once. You regain the ability to cast these spells when you finish a long rest.',
        icon: "👻",
        type: 'spell',
        level: 1,
        frequency: 'per-long-rest'
    },
    ["Legacy of Stygia"]: {
        name: 'Legacy of Stygia',
        description: 'You know the ray of frost cantrip. When you reach 3rd level, you can cast the armor of agathys spell once with this trait. When you reach 5th level, you can also cast the darkness spell once. You regain the ability to cast these spells when you finish a long rest.',
        icon: "❄️",
        type: 'spell',
        level: 1,
        frequency: 'per-long-rest'
    },
    ["Legacy of Minauros"]: {
        name: 'Legacy of Minauros',
        description: 'You know the mage hand cantrip. When you reach 3rd level, you can cast the tenser\'s floating disk spell once with this trait. When you reach 5th level, you can also cast the arcane lock spell once. You regain the ability to cast these spells when you finish a long rest.',
        icon: "💰",
        type: 'spell',
        level: 1,
        frequency: 'per-long-rest'
    },
    ["Legacy of Cania"]: {
        name: 'Legacy of Cania',
        description: 'You know the mage hand cantrip. When you reach 3rd level, you can cast the burning hands spell once with this trait. When you reach 5th level, you can also cast the flame blade spell once. You regain the ability to cast these spells when you finish a long rest.',
        icon: "🔥",
        type: 'spell',
        level: 1,
        frequency: 'per-long-rest'
    },
    ["Legacy of Avernus"]: {
        name: 'Legacy of Avernus',
        description: 'You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the searing smite spell once with this trait. When you reach 5th level, you can also cast the branding smite spell once. You regain the ability to cast these spells when you finish a long rest.',
        icon: "⚔️",
        type: 'spell',
        level: 1,
        frequency: 'per-long-rest'
    },

    // Aasimar features
    ["Celestial Resistance"]: {
        name: 'Celestial Resistance',
        description: 'You have resistance to necrotic and radiant damage.',
        icon: "✨",
        type: 'resistance'
    },
    ["Healing Hands"]: {
        name: 'Healing Hands',
        description: 'As an action, you can touch another creature and restore hit points equal to your level. Once you use this feature, you can\'t use it again until you finish a long rest.',
        icon: "🙏",
        type: 'active',
        frequency: 'per-long-rest'
    },
    ["Light Bearer"]: {
        name: 'Light Bearer',
        description: 'You know the light cantrip. Charisma is your spellcasting ability for it.',
        icon: "💡",
        type: 'cantrip'
    },
    ["Radiant Soul"]: {
        name: 'Radiant Soul',
        description: 'Starting at 3rd level, you can use your action to unleash the divine energy within yourself, causing your eyes to glimmer and your veins to glow with radiant energy.',
        icon: "☀️",
        type: 'active',
        level: 3,
        frequency: 'per-long-rest'
    },
    ["Radiant Consumption"]: {
        name: 'Radiant Consumption',
        description: 'Starting at 3rd level, you can use your action to unleash divine wrath, surrounding yourself with destructive energy. Each creature of your choice that you can see within 10 feet of you must make a Constitution saving throw.',
        icon: "🔥",
        type: 'active',
        level: 3,
        frequency: 'per-long-rest'
    },
    ["Necrotic Shroud"]: {
        name: 'Necrotic Shroud',
        description: 'Starting at 3rd level, you can use your action to unleash the divine energy within yourself, but perverted to a dark purpose. Loss of this power results in a dark shadow forming around you.',
        icon: "💀",
        type: 'active',
        level: 3,
        frequency: 'per-long-rest'
    },

    // Bugbear features
    ["Long-Limbed"]: {
        name: 'Long-Limbed',
        description: 'Your long arms give you reach 5 feet greater than normal when you attack in melee combat.',
        icon: "💪",
        type: 'passive'
    },
    ["Powerful Build"]: {
        name: 'Powerful Build',
        description: 'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
        icon: "💪",
        type: 'passive'
    },
    ["Sneaky"]: {
        name: 'Sneaky',
        description: 'You are proficient in the Stealth skill.',
        icon: "🥷",
        type: 'proficiency'
    },
    ["Surprise Attack"]: {
        name: 'Surprise Attack',
        description: 'If you surprise a creature and hit it with an attack on your first turn in combat, the attack deals an extra 7 damage of the attack\'s type.',
        icon: "⚡",
        type: 'passive'
    },

    // Goliath features
    ["Stone's Endurance"]: {
        name: 'Stone\'s Endurance',
        description: 'You can take a reaction when you take damage to reduce that damage by 1d12 plus your CON modifier. Once you use this feature, you can\'t use it again until you finish a short rest.',
        icon: "🪨",
        type: 'active',
        frequency: 'per-short-rest'
    },
    ["Mountain Born"]: {
        name: 'Mountain Born',
        description: 'You have resistance to cold damage, and you\'re acclimated to high altitude.',
        icon: "⛰️",
        type: 'resistance'
    },
    ["Cloud Walk"]: {
        name: 'Cloud Walk',
        description: 'You can cast the fog cloud spell once per day using this ability. Wisdom is your spellcasting ability for it.',
        icon: "☁️",
        type: 'spell',
        frequency: 'per-long-rest'
    },

    // Orc features
    ["Aggressive"]: {
        name: 'Aggressive',
        description: 'As a bonus action, you can move up to your speed toward an enemy of your choice that you can see or hear. You must end this move closer to the enemy than you started.',
        icon: "😤",
        type: 'active',
        frequency: 'at-will'
    },
    ["Primal Intuition"]: {
        name: 'Primal Intuition',
        description: 'When you make a Wisdom (Survival) check, you can add double your proficiency bonus to the check.',
        icon: "🧠",
        type: 'passive'
    },
    ["Relentless"]: {
        name: 'Relentless',
        description: 'When you hit with an attack using Strength, you can immediately move up to half your speed as a free action.',
        icon: "🔥",
        type: 'passive'
    },

    // Human features
    ["Feat at 1st Level"]: {
        name: 'Feat at 1st Level',
        description: 'You gain one feat of your choice.',
        icon: "⭐",
        type: 'ability-boost'
    },

    // Additional features for missing references
    ["Cantrip"]: {
        name: 'Cantrip',
        description: 'You know one additional cantrip of your choice from the wizard spell list.',
        icon: "✨",
        type: 'cantrip'
    },
    ["Extra Language"]: {
        name: 'Extra Language',
        description: 'You can speak, read, and write one extra language of your choice.',
        icon: "📚",
        type: 'proficiency'
    }
};

export type FeatureType = 'passive' | 'active' | 'resistance' | 'proficiency' | 'cantrip' | 'spell' | 'ability-boost';
export type DamageType = 'fire' | 'cold' | 'lightning' | 'poison' | 'acid' | 'radiant' | 'necrotic' | 'psychic' | 'force' | 'bludgeoning' | 'piercing' | 'slashing' | 'thunder';
export type SkillType = 'acrobatics' | 'animal-handling' | 'arcana' | 'athletics' | 'deception' | 'history' | 'insight' | 'intimidation' | 'investigation' | 'medicine' | 'nature' | 'perception' | 'performance' | 'persuasion' | 'religion' | 'sleight-of-hand' | 'stealth' | 'survival';
export type ModifierType = 'resistance' | 'skill-proficiency' | 'weapon-proficiency' | 'armor-proficiency' | 'tool-proficiency' | 'speed' | 'darkvision' | 'damage-bonus' | 'ac-bonus' | 'saving-throw' | 'hit-points' | 'expertise' | 'resource' | 'extra-attack' | 'spell-list' | 'ability-boost';
export type ResourceType = 'action' | 'bonus-action' | 'reaction' | 'movement' | 'spell-slot' | 'ki-point' | 'superiority-die' | 'bardic-inspiration' | 'sorcerous-point';

export interface ActionResource {
    type: ResourceType;
    cost: number;
    description?: string;
}

export interface Modifier {
    type: ModifierType;
    value: any;
    description?: string;
}

export interface FeatureData {
    name: string;
    description: string;
    icon: string;
    type: FeatureType;
    level?: number;
    frequency?: 'at-will' | 'per-long-rest' | 'per-short-rest' | 'once' | 'per-turn' | 'per-round' | 'per-day';
    scaling?: (level: number) => string;
    modifiers?: Modifier[];
    resources?: ActionResource[];
}

export const featuresMap: {[key: string]: FeatureData} = {
    // ==================== SHARED/GENERIC FEATURES ====================

    // Darkvision Features
    ["Darkvision"]: {
        name: 'Darkvision',
        description: 'You can see in dim light within 18 meters of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.',
        icon: "👁️",
        type: 'passive',
        modifiers: [
            { type: 'darkvision', value: 18, description: '60 feet' }
        ]
    },
    ["Superior Darkvision"]: {
        name: 'Superior Darkvision',
        description: 'Your darkvision has a radius of 36 meters.',
        icon: "👁️",
        type: 'passive',
        modifiers: [
            { type: 'darkvision', value: 36, description: '120 feet' }
        ]
    },

    // ==================== ARTIFICER FEATURES ====================

    ["Magical Tinkering"]: {
        name: 'Magical Tinkering',
        description: 'You can imbue mundane objects with magical effects. You can cast spells as infusions to create magical items. You have 4 infusions known at 1st level, and gain more as you level up.',
        icon: "🔧",
        type: 'active',
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 1, description: 'Create magical item' }
        ]
    },
    ["Infuse Item"]: {
        name: 'Infuse Item',
        description: 'When you finish a long rest, you can touch a nonmagical object and imbue it with one of your artificer infusions, turning it into a magic item.',
        icon: "✨",
        type: 'active',
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 1 }
        ]
    },
    ["Tool Expertise"]: {
        name: 'Tool Expertise',
        description: 'Your proficiency bonus is doubled for any ability check you make that uses a tool proficiency you have.',
        icon: "🔨",
        type: 'passive',
        modifiers: [
            { type: 'expertise', value: 'tools', description: 'Double proficiency with tools' }
        ]
    },
    ["Eldritch Cannon"]: {
        name: 'Eldritch Cannon',
        description: 'You can create a magical cannon that provides support in combat. The cannon can attack with spells or support allies.',
        icon: "🎯",
        type: 'active',
        level: 3,
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 1, description: 'Fire cannon projectile' }
        ]
    },
    ["Steel Defender"]: {
        name: 'Steel Defender',
        description: 'You create a medium steel construct that acts as a companion. It has AC 15 and hit points equal to your artificer level plus 5.',
        icon: "⚙️",
        type: 'active',
        level: 3,
        frequency: 'per-long-rest',
        modifiers: [
            { type: 'ac-bonus', value: 15, description: 'Steel Defender AC' }
        ]
    },
    ["Arcane Armor"]: {
        name: 'Arcane Armor',
        description: 'You can infuse your armor with magical enhancements, allowing you to cast spells while wearing it without penalties.',
        icon: "🛡️",
        type: 'passive',
        level: 3,
        modifiers: [
            { type: 'armor-proficiency', value: 'arcane-armor', description: 'Enhanced magical armor' }
        ]
    },
    ["Potion Brewing"]: {
        name: 'Potion Brewing',
        description: 'You can create alchemical potions that provide various benefits. You can create up to your proficiency bonus potions during long rests.',
        icon: "🧪",
        type: 'active',
        level: 3,
        frequency: 'per-long-rest'
    },

    // ==================== BARBARIAN FEATURES ====================

    ["Rage"]: {
        name: 'Rage',
        description: 'On your turn, you can enter a rage as a bonus action. While raging, you gain a bonus to melee weapon attacks and take reduced damage. You can rage for 1 + CON modifier minutes.',
        icon: "🔥",
        type: 'active',
        frequency: 'per-long-rest',
        resources: [
            { type: 'bonus-action', cost: 1 }
        ],
        modifiers: [
            { type: 'damage-bonus', value: 'CON modifier', description: 'Bonus to melee damage' },
            { type: 'resistance', value: 'bludgeoning', description: 'Resistance to physical damage' }
        ]
    },
    ["Unarmored Defense"]: {
        name: 'Unarmored Defense',
        description: 'While you are not wearing any armor, your AC equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.',
        icon: "💪",
        type: 'passive',
        modifiers: [
            { type: 'ac-bonus', value: 10, description: 'Unarmored defense: 10 + DEX + CON' }
        ]
    },
    ["Reckless Attack"]: {
        name: 'Reckless Attack',
        description: 'Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly.',
        icon: "⚡",
        type: 'active',
        level: 2,
        resources: [
            { type: 'action', cost: 0, description: 'Advantage on attacks but enemies get advantage against you' }
        ]
    },
    ["Danger Sense"]: {
        name: 'Danger Sense',
        description: 'At 2nd level, you gain an uncanny sense of when things nearby aren\'t as they should be, giving you an edge when you dodge away from danger.',
        icon: "⚠️",
        type: 'passive',
        level: 2,
        frequency: 'per-turn'
    },
    ["Extra Attack"]: {
        name: 'Extra Attack',
        description: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.',
        icon: "🗡️",
        type: 'passive',
        level: 5,
        modifiers: [
            { type: 'extra-attack', value: 1, description: 'Attack twice per action' }
        ]
    },
    ["Brutal Critical"]: {
        name: 'Brutal Critical',
        description: 'Beginning at 9th level, when you score a critical hit with a weapon attack, you can roll one additional weapon damage die when determining the extra damage.',
        icon: "💥",
        type: 'passive',
        level: 9,
        modifiers: [
            { type: 'damage-bonus', value: '+1d (crit)', description: 'Extra die on critical hit' }
        ]
    },
    ["Relentless Rage"]: {
        name: 'Relentless Rage',
        description: 'Starting at 11th level, your rage can keep you fighting even when you should be overwhelmed. If you would end your rage at the end of a turn, you can make one melee attack using Strength.',
        icon: "🔥",
        type: 'passive',
        level: 11,
        frequency: 'per-turn'
    },
    ["Frenzy"]: {
        name: 'Frenzy',
        description: 'Starting at 3rd level, you can go into a frenzy when you rage. If you do so, for the duration of your rage you can make a single melee weapon attack as a bonus action on each of your turns after this one.',
        icon: "⚔️",
        type: 'active',
        level: 3,
        frequency: 'per-turn',
        resources: [
            { type: 'bonus-action', cost: 1 }
        ]
    },
    ["Mindless Rage"]: {
        name: 'Mindless Rage',
        description: 'Beginning at 6th level, you can\'t be charmed or frightened while raging. Any condition that was active before the rage ends when the rage ends.',
        icon: "😤",
        type: 'passive',
        level: 6,
        frequency: 'per-turn'
    },
    ["Totem Spirit"]: {
        name: 'Totem Spirit',
        description: 'At 3rd level, you choose a totem animal: bear, eagle, elk, tiger, or wolf. You gain benefits associated with your totem.',
        icon: "🐻",
        type: 'passive',
        level: 3
    },
    ["Aspect of the Beast"]: {
        name: 'Aspect of the Beast',
        description: 'At 6th level, you gain physical features based on your totem animal. For example, a bear gives you a bonus to Athletics checks.',
        icon: "🐾",
        type: 'passive',
        level: 6
    },

    // ==================== BARD FEATURES ====================

    ["Bardic Inspiration"]: {
        name: 'Bardic Inspiration',
        description: 'You can inspire others through stirring words or music. Other creatures that can hear you within 18 meters gain a Bardic Inspiration die.',
        icon: "🎵",
        type: 'active',
        frequency: 'per-long-rest',
        resources: [
            { type: 'bardic-inspiration', cost: 1, description: 'Grant d6' }
        ]
    },
    ["Jack of All Trades"]: {
        name: 'Jack of All Trades',
        description: 'Starting at 2nd level, you can add half your proficiency bonus (rounded up) to any ability check you make that doesn\'t already include your proficiency bonus.',
        icon: "📚",
        type: 'passive',
        level: 2,
        modifiers: [
            { type: 'skill-proficiency', value: 'half-proficiency', description: '+PB/2 to non-proficient checks' }
        ]
    },
    ["Song of Rest"]: {
        name: 'Song of Rest',
        description: 'Beginning at 2nd level, you can use soothing music or oration to help revitalize your wounded allies during a short rest.',
        icon: "🎶",
        type: 'passive',
        level: 2,
        frequency: 'per-short-rest'
    },
    ["Expertise"]: {
        name: 'Expertise',
        description: 'At 1st level, choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.',
        icon: "⭐",
        type: 'passive',
        modifiers: [
            { type: 'expertise', value: 'skills', description: 'Double proficiency on chosen skills' }
        ]
    },
    ["Font of Inspiration"]: {
        name: 'Font of Inspiration',
        description: 'Beginning at 5th level, you regain one of your uses of Bardic Inspiration when you finish a short or long rest.',
        icon: "✨",
        type: 'passive',
        level: 5
    },
    ["Countercharm"]: {
        name: 'Countercharm',
        description: 'At 6th level, you gain the ability to use your Bardic Inspiration to defend against effects that charm or frighten you.',
        icon: "🛡️",
        type: 'passive',
        level: 6
    },
    ["Mantle of Inspiration"]: {
        name: 'Mantle of Inspiration',
        description: 'When you use Bardic Inspiration, the target gains temporary hit points equal to the number rolled on the Bardic Inspiration die.',
        icon: "💚",
        type: 'passive',
        level: 3
    },
    ["Enthralling Performance"]: {
        name: 'Enthralling Performance',
        description: 'You can charm creatures with your performance. When you perform, you can designate a number of humanoids within 18 meters who can see and hear you.',
        icon: "🎭",
        type: 'active',
        level: 3,
        frequency: 'per-long-rest'
    },
    ["Cutting Words"]: {
        name: 'Cutting Words',
        description: 'When a creature that you can see within 18 meters of you makes an attack roll, an ability check, or a damage roll, you can use your reaction to subtract a number from the roll.',
        icon: "📎",
        type: 'active',
        level: 3,
        frequency: 'per-short-rest',
        resources: [
            { type: 'reaction', cost: 1 }
        ]
    },
    ["Magical Secrets"]: {
        name: 'Magical Secrets',
        description: 'At 10th level, you have plundered magical knowledge from a wide spectrum of disciplines. Choose two spells from any classes, including this one.',
        icon: "📖",
        type: 'spell',
        level: 10,
        modifiers: [
            { type: 'spell-list', value: 'Any 2 spells', description: 'Learn spells from any class' }
        ]
    },

    // ==================== BLOOD HUNTER FEATURES ====================

    ["Monster Hunter"]: {
        name: 'Monster Hunter',
        description: 'You have advantage on Wisdom (Survival) checks to track monsters, and you add double your proficiency bonus to Investigation checks made to identify a monster\'s weaknesses.',
        icon: "🔍",
        type: 'passive',
        modifiers: [
            { type: 'expertise', value: 'monster-hunting', description: 'Track and identify monsters' }
        ]
    },
    ["Blood Curse"]: {
        name: 'Blood Curse',
        description: 'You can cast a crimson curse on a target you can see within 12 meters. The target makes a Wisdom saving throw or is cursed. You can curse a number of creatures equal to your Intelligence modifier.',
        icon: "💀",
        type: 'active',
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 1 }
        ]
    },
    ["Crimson Rite"]: {
        name: 'Crimson Rite',
        description: 'When you hit a creature with a weapon attack, you can imbue the strike with blood magic, dealing an extra 1d4 damage of a type you choose.',
        icon: "🩸",
        type: 'active',
        frequency: 'at-will',
        modifiers: [
            { type: 'damage-bonus', value: '1d4', description: 'Blood magic damage' }
        ]
    },
    ["Blood Maledict"]: {
        name: 'Blood Maledict',
        description: 'At 2nd level, you can cast blood curses from a distance. You can curse a creature you can see within 12 meters.',
        icon: "🔮",
        type: 'active',
        level: 2,
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 1 }
        ]
    },
    ["Rite Specialization"]: {
        name: 'Rite Specialization',
        description: 'At 3rd level, choose one element to specialize in: fire, cold, lightning, poison, or radiant. You gain benefits related to this specialization.',
        icon: "⚡",
        type: 'passive',
        level: 3,
        modifiers: [
            { type: 'damage-bonus', value: '+1', description: 'Bonus with chosen element' }
        ]
    },
    ["Dark Patron"]: {
        name: 'Dark Patron',
        description: 'You have made a pact with a dark entity. Choose a patron type: The Profane Soul, The Lycan, The Ghostslayer, The Mutant, The Seeker, or The Raven.',
        icon: "😈",
        type: 'passive',
        level: 3
    },
    ["Eldritch Invocations"]: {
        name: 'Eldritch Invocations',
        description: 'You learn eldritch invocations that grant you powerful supernatural abilities. You gain invocations equal to your Intelligence modifier.',
        icon: "✨",
        type: 'ability-boost',
        level: 3,
        modifiers: [
            { type: 'resource', value: 'Invocation', description: 'Supernatural power' }
        ]
    },

    // ==================== CLERIC FEATURES ====================

    ["Divine Sense"]: {
        name: 'Divine Sense',
        description: 'The presence of strong good, evil, or undead registers on your senses like a vibration. You sense celestials, fiends, and undead within 18 meters of you.',
        icon: "✨",
        type: 'passive',
        modifiers: [
            { type: 'resource', value: 'sense', description: 'Detect celestials, fiends, undead' }
        ]
    },
    ["Lay on Hands"]: {
        name: 'Lay on Hands',
        description: 'Your blessed touch can heal wounds. You have a pool of healing power equal to your cleric level × 5. As an action, you can touch a creature and draw power to restore a number of hit points.',
        icon: "🙏",
        type: 'active',
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 1 }
        ]
    },
    ["Channel Divinity"]: {
        name: 'Channel Divinity',
        description: 'At 2nd level, you gain the ability to channel divine energy directly from your deity. You can use this ability a number of times equal to your Wisdom modifier + your cleric level.',
        icon: "⚡",
        type: 'active',
        level: 2,
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 1 }
        ]
    },
    ["Preserve Life"]: {
        name: 'Preserve Life',
        description: 'As an action, you present your holy symbol and any of your allies within 18 meters of you that can see or hear you regain hit points equal to 1d4 + your cleric level.',
        icon: "💚",
        type: 'active',
        level: 1,
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 1 }
        ]
    },
    ["Blessed Healer"]: {
        name: 'Blessed Healer',
        description: 'At 6th level, whenever you cast a spell with a spell slot that restores hit points to any creature other than you, you regain hit points equal to 2 + the spell\'s level.',
        icon: "💚",
        type: 'passive',
        level: 6
    },
    ["Divine Strike"]: {
        name: 'Divine Strike',
        description: 'At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 radiant damage.',
        icon: "⚡",
        type: 'passive',
        level: 8,
        modifiers: [
            { type: 'damage-bonus', value: '1d8', description: 'Radiant damage on hit' }
        ]
    },
    ["Wrath of the Storm"]: {
        name: 'Wrath of the Storm',
        description: 'Also at 1st level, you can use your reaction when you are hit by a melee attack to make a melee weapon attack against the attacker. You can use this reaction a number of times equal to your Wisdom modifier.',
        icon: "⛈️",
        type: 'active',
        frequency: 'per-long-rest',
        resources: [
            { type: 'reaction', cost: 1 }
        ]
    },

    // ==================== DRUID FEATURES ====================

    ["Druidic"]: {
        name: 'Druidic',
        description: 'You know Druidic, the secret language of druids. You can speak the language and use it to leave hidden messages.',
        icon: "🌲",
        type: 'passive',
        modifiers: [
            { type: 'skill-proficiency', value: 'druidic-language', description: 'Secret druid language' }
        ]
    },
    ["Wild Shape"]: {
        name: 'Wild Shape',
        description: 'Starting at 2nd level, you can use your action to magically assume the shape of a beast that you have seen before. You can use this feature a number of times equal to your Wisdom modifier.',
        icon: "🐻",
        type: 'active',
        level: 2,
        frequency: 'per-short-rest',
        resources: [
            { type: 'action', cost: 1 }
        ]
    },
    ["Bonus Cantrip"]: {
        name: 'Bonus Cantrip',
        description: 'At 2nd level, you learn one additional druid cantrip of your choice.',
        icon: "✨",
        type: 'cantrip',
        level: 2,
        modifiers: [
            { type: 'spell-list', value: '+1 Cantrip', description: 'Learn additional cantrip' }
        ]
    },
    ["Natural Recovery"]: {
        name: 'Natural Recovery',
        description: 'At 2nd level, you can regain some of your magical energy by sitting in meditation and communing with nature. During a short rest, you can recover expended spell slots.',
        icon: "🌿",
        type: 'passive',
        level: 2,
        frequency: 'per-short-rest'
    },
    ["Wild Shape Improvement"]: {
        name: 'Wild Shape Improvement',
        description: 'At higher levels, you can remain in a beast form for longer and can assume forms with a challenge rating higher than your druid level.',
        icon: "🐺",
        type: 'passive',
        level: 4
    },
    ["Timeless Body"]: {
        name: 'Timeless Body',
        description: 'Starting at 18th level, the primal magic that you wield causes you to age more slowly. For every 10 years that pass, your body ages only 1 year.',
        icon: "⏳",
        type: 'passive',
        level: 18
    },
    ["Beast Spells"]: {
        name: 'Beast Spells',
        description: 'At 18th level, you can cast spells while you are transformed by Wild Shape. You can perform the somatic and verbal components of a druid spell while in a beast form.',
        icon: "🧙",
        type: 'passive',
        level: 18
    },
    ["Circle of the Land"]: {
        name: 'Circle of the Land',
        description: 'At 2nd level, you choose to identify with a circle of druids: the Desert, Forest, Grassland, Mountain, Swamp, or Underdark.',
        icon: "🌍",
        type: 'passive',
        level: 2
    },
    ["Circle Spells"]: {
        name: 'Circle Spells',
        description: 'Your mystical connection to the land infuses you with the ability to cast certain spells. When you finish a long rest, you gain access to spells based on the type of terrain associated with your circle.',
        icon: "🌿",
        type: 'spell',
        level: 3,
        modifiers: [
            { type: 'spell-list', value: 'Circle spells', description: 'Bonus spells from terrain' }
        ]
    },

    // ==================== FIGHTER FEATURES ====================

    ["Fighting Style"]: {
        name: 'Fighting Style',
        description: 'You adopt a particular style of fighting as your specialty. You choose one of the following options.',
        icon: "🗡️",
        type: 'passive',
        modifiers: [
            { type: 'damage-bonus', value: '+2', description: 'Weapon style bonus' }
        ]
    },
    ["Second Wind"]: {
        name: 'Second Wind',
        description: 'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level.',
        icon: "💨",
        type: 'active',
        frequency: 'per-long-rest',
        resources: [
            { type: 'bonus-action', cost: 1 }
        ]
    },
    ["Improved Critical"]: {
        name: 'Improved Critical',
        description: 'Beginning when you reach 3rd level, your weapon attacks score a critical hit on a roll of 19 or 20.',
        icon: "🎲",
        type: 'passive',
        level: 3
    },
    ["Remarkable Athlete"]: {
        name: 'Remarkable Athlete',
        description: 'Starting at 7th level, you can add half your proficiency bonus to any ability check you make that uses Strength, Dexterity, or Constitution.',
        icon: "💪",
        type: 'passive',
        level: 7,
        modifiers: [
            { type: 'skill-proficiency', value: 'half-proficiency', description: '+PB/2 to STR/DEX/CON checks' }
        ]
    },
    ["Indomitable"]: {
        name: 'Indomitable',
        description: 'Beginning at 9th level, you can reroll a saving throw that you fail. If you do so, you must use the new roll, and you can\'t use this feature again until you finish a long rest.',
        icon: "🛡️",
        type: 'active',
        level: 9,
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 0 }
        ]
    },
    ["Extra Attacks"]: {
        name: 'Extra Attacks',
        description: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn. The number of attacks increases when you reach certain fighter levels.',
        icon: "⚔️",
        type: 'passive',
        level: 5,
        modifiers: [
            { type: 'extra-attack', value: 1, description: 'Attack twice per action' }
        ]
    },
    ["Combat Superiority"]: {
        name: 'Combat Superiority',
        description: 'At 3rd level, you learn maneuvers that are fueled by special dice called superiority dice. You have 4 superiority dice, which are d8s. When you use a maneuver, you expend one superiority die.',
        icon: "🎲",
        type: 'active',
        level: 3,
        frequency: 'per-short-rest',
        resources: [
            { type: 'superiority-die', cost: 1 }
        ]
    },
    ["Know Your Enemy"]: {
        name: 'Know Your Enemy',
        description: 'Starting at 7th level, if you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities.',
        icon: "🧠",
        type: 'passive',
        level: 7
    },
    ["Spellcasting (Eldritch Knight)"]: {
        name: 'Spellcasting (Eldritch Knight)',
        description: 'When you reach 3rd level, you augment your martial prowess with the ability to cast spells. See the Eldritch Knight Spellcasting table for how many spell slots you have.',
        icon: "🧙",
        type: 'spell',
        level: 3,
        modifiers: [
            { type: 'spell-list', value: 'Fighter spells', description: 'Cast Eldritch Knight spells' }
        ]
    },

    // ==================== MONK FEATURES ====================

    ["Martial Arts"]: {
        name: 'Martial Arts',
        description: 'At 1st level, your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons. Your unarmed strike damage increases as you gain levels.',
        icon: "👊",
        type: 'passive',
        modifiers: [
            { type: 'damage-bonus', value: '1d4+', description: 'Unarmed damage scales with level' }
        ]
    },
    ["Unarmored Defense (Monk)"]: {
        name: 'Unarmored Defense (Monk)',
        description: 'Beginning at 1st level, while you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier.',
        icon: "💪",
        type: 'passive',
        modifiers: [
            { type: 'ac-bonus', value: 10, description: 'Unarmored defense: 10 + DEX + WIS' }
        ]
    },
    ["Ki Points"]: {
        name: 'Ki Points',
        description: 'Your access to this energy is represented by a number of ki points. Your monk level determines the number of ki points you have.',
        icon: "✨",
        type: 'passive',
        modifiers: [
            { type: 'resource', value: 'Ki Points', description: 'Fuel monk abilities' }
        ]
    },
    ["Unarmored Movement"]: {
        name: 'Unarmored Movement',
        description: 'Starting at 2nd level, your speed increases by 3 meters while you are not wearing armor or wielding a shield.',
        icon: "💨",
        type: 'passive',
        level: 2,
        modifiers: [
            { type: 'speed', value: 1.5, description: '+10 feet speed' }
        ]
    },
    ["Monastic Tradition"]: {
        name: 'Monastic Tradition',
        description: 'When you reach 3rd level, you commit to a monastic tradition. Choose the Way of the Open Hand, the Way of the Shadow, or another tradition.',
        icon: "🏯",
        type: 'passive',
        level: 3
    },
    ["Open Hand Technique"]: {
        name: 'Open Hand Technique',
        description: 'Starting at 3rd level, you can manipulate your enemy\'s movement. Whenever you hit a creature with a weapon attack granted by Flurry of Blows, you can reduce its speed by 3 meters.',
        icon: "👋",
        type: 'passive',
        level: 3,
        modifiers: [
            { type: 'resource', value: 'Reduce movement', description: '-10 feet to enemy speed' }
        ]
    },
    ["Wholeness of Body"]: {
        name: 'Wholeness of Body',
        description: 'At 6th level, you gain the ability to heal yourself. As an action, you can spend ki points to regain hit points equal to the number spent.',
        icon: "💚",
        type: 'active',
        level: 6,
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 1 }
        ]
    },
    ["Stunning Strike"]: {
        name: 'Stunning Strike',
        description: 'Starting at 5th level, you can interfere with the flow of ki in an opponent\'s body. When you hit another creature with a melee weapon attack, you can spend 1 ki point to attempt a stunning strike.',
        icon: "⚡",
        type: 'active',
        level: 5,
        frequency: 'at-will',
        resources: [
            { type: 'ki-point', cost: 1 }
        ]
    },
    ["Shadow Arts"]: {
        name: 'Shadow Arts',
        description: 'Starting at 3rd level, you can use your ki to duplicate the effects of certain spells. As a bonus action, you can spend 2 ki points to cast darkness, invisibility, or pass without trace.',
        icon: "🌑",
        type: 'active',
        level: 3,
        frequency: 'at-will',
        resources: [
            { type: 'ki-point', cost: 2 }
        ]
    },

    // ==================== PALADIN FEATURES ====================

    ["Divine Sense (Paladin)"]: {
        name: 'Divine Sense (Paladin)',
        description: 'The presence of strong good, evil, or undead registers on your senses like a vibration. You sense celestials, fiends, and undead within 18 meters of you.',
        icon: "✨",
        type: 'passive',
        modifiers: [
            { type: 'resource', value: 'sense', description: 'Detect celestials, fiends, undead' }
        ]
    },
    ["Lay on Hands (Paladin)"]: {
        name: 'Lay on Hands (Paladin)',
        description: 'Your blessed touch can heal wounds. You have a pool of healing power equal to your paladin level × 5.',
        icon: "🙏",
        type: 'active',
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 1 }
        ]
    },
    ["Divine Smite"]: {
        name: 'Divine Smite',
        description: 'Starting at 1st level, when you hit a creature with a weapon attack, you can expend one spell slot to deal radiant damage to the target.',
        icon: "⚡",
        type: 'active',
        frequency: 'at-will',
        modifiers: [
            { type: 'damage-bonus', value: '1d8+', description: 'Radiant damage per spell slot' }
        ]
    },
    ["Divine Health"]: {
        name: 'Divine Health',
        description: 'By 1st level, the divine magic flowing through you makes you immune to disease.',
        icon: "💪",
        type: 'passive',
        modifiers: [
            { type: 'resistance', value: 'disease', description: 'Immune to disease' }
        ]
    },
    ["Sacred Weapon"]: {
        name: 'Sacred Weapon',
        description: 'At 1st level as part of the Oath of Devotion, your weapon becomes infused with sacred power. When you hit with a weapon attack, you can add your Charisma modifier to the damage roll.',
        icon: "⚔️",
        type: 'passive',
        level: 1,
        modifiers: [
            { type: 'damage-bonus', value: 'CHA', description: 'Add Charisma to damage' }
        ]
    },
    ["Channel Divinity (Paladin)"]: {
        name: 'Channel Divinity (Paladin)',
        description: 'Starting at 2nd level, you can use your Channel Divinity to fuel various paladin abilities.',
        icon: "⚡",
        type: 'active',
        level: 2,
        frequency: 'per-long-rest'
    },
    ["Extra Attack (Paladin)"]: {
        name: 'Extra Attack (Paladin)',
        description: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.',
        icon: "⚔️",
        type: 'passive',
        level: 5,
        modifiers: [
            { type: 'extra-attack', value: 1, description: 'Attack twice per action' }
        ]
    },
    ["Improved Divine Smite"]: {
        name: 'Improved Divine Smite',
        description: 'By 11th level, you are so suffused with righteous power that all your melee weapon strikes carry divine power with them. Whenever you hit a creature with a melee weapon attack, that creature takes an extra 1d8 radiant damage.',
        icon: "💥",
        type: 'passive',
        level: 11,
        modifiers: [
            { type: 'damage-bonus', value: '1d8', description: 'Always radiant damage on hit' }
        ]
    },
    ["Cleansing Touch"]: {
        name: 'Cleansing Touch',
        description: 'Beginning at 14th level, you can use your action to end one spell on yourself or on one willing creature that you touch.',
        icon: "✨",
        type: 'active',
        level: 14,
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 1 }
        ]
    },

    // ==================== RANGER FEATURES ====================

    ["Favored Enemy"]: {
        name: 'Favored Enemy',
        description: 'Beginning at 1st level, you have significant experience studying, tracking, hunting, and even communicating with a certain type of enemy. You have advantage on Wisdom (Survival) checks to track your favored enemies.',
        icon: "🎯",
        type: 'passive',
        modifiers: [
            { type: 'expertise', value: 'favored-enemy', description: 'Advantage tracking enemies' }
        ]
    },
    ["Natural Explorer"]: {
        name: 'Natural Explorer',
        description: 'You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions. Choose one type of favored terrain.',
        icon: "🌲",
        type: 'passive',
        modifiers: [
            { type: 'skill-proficiency', value: 'terrain-mastery', description: 'Benefits in favored terrain' }
        ]
    },
    ["Fighting Style (Ranger)"]: {
        name: 'Fighting Style (Ranger)',
        description: 'At 1st level, you adopt a fighting style. You choose Archery, Defense, Dueling, or Two-Weapon Fighting.',
        icon: "🏹",
        type: 'passive',
        modifiers: [
            { type: 'damage-bonus', value: '+2', description: 'Fighting style bonus' }
        ]
    },
    ["Spellcasting (Ranger)"]: {
        name: 'Spellcasting (Ranger)',
        description: 'By the time you reach 5th level, you have learned to use the magical essence of nature to cast spells. You know ranger spells.',
        icon: "🧙",
        type: 'spell',
        level: 5,
        modifiers: [
            { type: 'spell-list', value: 'Ranger spells', description: 'Cast nature magic' }
        ]
    },
    ["Ranger's Companion"]: {
        name: 'Ranger\'s Companion',
        description: 'At 3rd level, you gain a beast companion that accompanies you on your adventures and is trained to combat.',
        icon: "🐺",
        type: 'passive',
        level: 3
    },
    ["Extra Attack (Ranger)"]: {
        name: 'Extra Attack (Ranger)',
        description: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.',
        icon: "🏹",
        type: 'passive',
        level: 5,
        modifiers: [
            { type: 'extra-attack', value: 1, description: 'Attack twice per action' }
        ]
    },
    ["Colossus Slayer"]: {
        name: 'Colossus Slayer',
        description: 'Starting at 3rd level, your tenacity can wear down the most potent foes. When you hit a creature with a weapon attack, the creature takes an extra 1d8 damage if it\'s missing any of its hit points.',
        icon: "⚔️",
        type: 'passive',
        level: 3,
        modifiers: [
            { type: 'damage-bonus', value: '1d8', description: 'Extra damage to wounded enemies' }
        ]
    },
    ["Hunter's Sense"]: {
        name: 'Hunter\'s Sense',
        description: 'At 11th level, you gain preternatural senses that help you fight creatures you can\'t see. When you attack a creature you can\'t see, your inability to see it doesn\'t impose disadvantage on your attack rolls against it.',
        icon: "👁️",
        type: 'passive',
        level: 11
    },

    // ==================== ROGUE FEATURES ====================

    ["Expertise (Rogue)"]: {
        name: 'Expertise (Rogue)',
        description: 'At 1st level, choose two of your skill proficiencies, or one of your skill proficiencies and proficiency with thieves\' tools. Your proficiency bonus is doubled for any ability check you make using either chosen proficiency.',
        icon: "🎯",
        type: 'passive',
        modifiers: [
            { type: 'expertise', value: 'skills', description: 'Double proficiency on chosen skills' }
        ]
    },
    ["Sneak Attack"]: {
        name: 'Sneak Attack',
        description: 'Beginning at 1st level, you know how to strike subtly and exploit a foe\'s distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with a weapon attack if you have advantage on the attack roll.',
        icon: "🗡️",
        type: 'passive',
        frequency: 'per-turn',
        modifiers: [
            { type: 'damage-bonus', value: '1d6+', description: 'Extra damage on sneak attacks' }
        ]
    },
    ["Thieves' Cant"]: {
        name: 'Thieves\' Cant',
        description: 'During your rogue training you learned thieves\' cant, a secret mix of dialect, jargon, and nonverbal language. You understand the language and those who know it understand you.',
        icon: "🤐",
        type: 'passive',
        modifiers: [
            { type: 'skill-proficiency', value: 'thieves-cant', description: 'Secret rogue language' }
        ]
    },
    ["Cunning Action"]: {
        name: 'Cunning Action',
        description: 'Starting at 2nd level, your quick thinking and agility allow you to move and act quickly. You can take a bonus action on each of your turns in combat.',
        icon: "💨",
        type: 'active',
        level: 2,
        frequency: 'per-turn',
        resources: [
            { type: 'bonus-action', cost: 1 }
        ]
    },
    ["Roguish Archetype"]: {
        name: 'Roguish Archetype',
        description: 'At 3rd level, you choose an archetype that you emulate. Your choice grants you features at 3rd level and again at 9th, 13th, and 17th level.',
        icon: "🎭",
        type: 'passive',
        level: 3
    },
    ["Uncanny Dodge"]: {
        name: 'Uncanny Dodge',
        description: 'Starting at 5th level, when an attacker that you can see hits you with an attack, you can use your reaction to halve the attack\'s damage against you.',
        icon: "🛡️",
        type: 'active',
        level: 5,
        frequency: 'per-turn',
        resources: [
            { type: 'reaction', cost: 1 }
        ]
    },
    ["Evasion"]: {
        name: 'Evasion',
        description: 'Beginning at 7th level, you can nimbly dodge out of the way of certain area effects. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed.',
        icon: "💨",
        type: 'passive',
        level: 7
    },
    ["Stroke of Luck"]: {
        name: 'Stroke of Luck',
        description: 'At 20th level, you have an uncanny knack for succeeding when you need to. If your attack misses a target within range, you can turn the miss into a hit. Alternatively, if you fail an ability check, you can treat the d20 roll as a 20.',
        icon: "🍀",
        type: 'active',
        level: 20,
        frequency: 'once'
    },
    ["Fast Hands"]: {
        name: 'Fast Hands',
        description: 'Starting at 3rd level, you can use the bonus action granted by your Cunning Action to make a Dexterity (Sleight of Hand) check, use your thieves\' tools to disarm a trap or open a lock, or take the Use an Object action.',
        icon: "✋",
        type: 'active',
        level: 3,
        frequency: 'per-turn',
        resources: [
            { type: 'bonus-action', cost: 1 }
        ]
    },
    ["Assassinate"]: {
        name: 'Assassinate',
        description: 'Starting at 3rd level, you are at your deadliest when you get the drop on your enemies. You have advantage on attack rolls against any creature that hasn\'t taken a turn in the combat yet.',
        icon: "💀",
        type: 'passive',
        level: 3
    },

    // ==================== SORCERER FEATURES ====================

    ["Spellcasting (Sorcerer)"]: {
        name: 'Spellcasting (Sorcerer)',
        description: 'An event in your past, or in the world around you, has given you innate magical power. You cast spells using Charisma.',
        icon: "✨",
        type: 'spell',
        modifiers: [
            { type: 'spell-list', value: 'Sorcerer spells', description: 'Cast magic using Charisma' }
        ]
    },
    ["Sorcerous Points"]: {
        name: 'Sorcerous Points',
        description: 'You have a pool of sorcerous points equal to your sorcerer level. You can spend these points to fuel sorcerous powers.',
        icon: "⚡",
        type: 'passive',
        modifiers: [
            { type: 'resource', value: 'Sorcerous Points', description: 'Fuel sorcerer abilities' }
        ]
    },
    ["Font of Magic"]: {
        name: 'Font of Magic',
        description: 'At 2nd level, you can tap into the wellspring of magic within yourself. This feature allows you to convert spell slots into sorcerous points and vice versa.',
        icon: "✨",
        type: 'passive',
        level: 2,
        frequency: 'per-long-rest'
    },
    ["Metamagic"]: {
        name: 'Metamagic',
        description: 'At 3rd level, you gain the ability to twist your spells in ways only a sorcerer can. You can use only one Metamagic option on a spell when you cast it.',
        icon: "🌀",
        type: 'active',
        level: 3,
        frequency: 'at-will',
        modifiers: [
            { type: 'ability-boost', value: 'Metamagic', description: 'Enhance spell effects' }
        ]
    },
    ["Draconic Resilience"]: {
        name: 'Draconic Resilience',
        description: 'As a draconic sorcerer at 1st level, you gain a bonus to all Armor Class and hit points as if wearing light armor and a shield, even if you are not.',
        icon: "🐉",
        type: 'passive',
        level: 1,
        modifiers: [
            { type: 'ac-bonus', value: '+1', description: 'Dragon armor bonus' },
            { type: 'hit-points', value: '+1/level', description: 'Extra HP from dragon ancestry' }
        ]
    },
    ["Dragon Ancestor"]: {
        name: 'Dragon Ancestor',
        description: 'At 1st level, you choose one type of dragon as your ancestor. The damage type associated with this dragon becomes part of your sorcerous magic.',
        icon: "🐉",
        type: 'passive',
        level: 1,
        modifiers: [
            { type: 'damage-bonus', value: 'Dragon type', description: 'Gain dragon ancestry benefits' }
        ]
    },
    ["Wild Magic Surge"]: {
        name: 'Wild Magic Surge',
        description: 'Starting when you choose this origin at 1st level, your spellcasting can unleash surges of raw magic. Immediately after you cast a sorcerer spell, roll a d20.',
        icon: "⚡",
        type: 'passive',
        level: 1,
        frequency: 'per-turn'
    },
    ["Tides of Chaos"]: {
        name: 'Tides of Chaos',
        description: 'Starting at 1st level, you can manipulate the forces of chance and chaos. Once per long rest, you can gain advantage on one attack roll, ability check, or saving throw.',
        icon: "🌀",
        type: 'active',
        level: 1,
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 0 }
        ]
    },

    // ==================== WARLOCK FEATURES ====================

    ["Otherworldly Patron"]: {
        name: 'Otherworldly Patron',
        description: 'At 1st level, you have struck a bargain with an otherworldly being. Choose one of the following patrons.',
        icon: "👹",
        type: 'passive',
        modifiers: [
            { type: 'ability-boost', value: 'Patron benefits', description: 'Gain patron abilities' }
        ]
    },
    ["Pact Magic"]: {
        name: 'Pact Magic',
        description: 'Your arcane research and the magic bestowed on you by your patron have given you facility with spells. You regain all expended spell slots when you finish a short or long rest.',
        icon: "📖",
        type: 'spell',
        modifiers: [
            { type: 'spell-list', value: 'Warlock spells', description: 'Cast pact spells' }
        ]
    },
    ["Eldritch Invocation"]: {
        name: 'Eldritch Invocation',
        description: 'At 2nd level, you learn an eldritch invocation of your choice. You gain more invocations as you gain levels.',
        icon: "✨",
        type: 'passive',
        level: 2,
        frequency: 'per-long-rest',
        modifiers: [
            { type: 'ability-boost', value: 'Invocation', description: 'Supernatural power' }
        ]
    },
    ["Dark One's Blessing"]: {
        name: 'Dark One\'s Blessing',
        description: 'Starting at 1st level, when you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier + your warlock level.',
        icon: "💀",
        type: 'passive',
        level: 1,
        frequency: 'per-turn'
    },
    ["Agonizing Blast"]: {
        name: 'Agonizing Blast',
        description: 'When you cast eldritch blast, add your Charisma modifier to the damage it deals on a hit.',
        icon: "⚡",
        type: 'passive',
        modifiers: [
            { type: 'damage-bonus', value: 'CHA', description: 'Add Charisma to blast damage' }
        ]
    },
    ["Awakened Mind"]: {
        name: 'Awakened Mind',
        description: 'Starting at 1st level, your alien knowledge gives you the ability to touch the minds of others. You can telepathically speak to any creature you can see within 30 feet of you as long as you can see it.',
        icon: "🧠",
        type: 'passive',
        level: 1,
        frequency: 'at-will'
    },
    ["Fey Presence"]: {
        name: 'Fey Presence',
        description: 'Starting at 1st level, your patron bestows a magical presence on you. As an action, you can spend one warlock spell slot to cast charm person without expending a spell slot.',
        icon: "✨",
        type: 'active',
        level: 1,
        frequency: 'at-will',
        resources: [
            { type: 'action', cost: 1 }
        ]
    },

    // ==================== WIZARD FEATURES ====================

    ["Spellcasting (Wizard)"]: {
        name: 'Spellcasting (Wizard)',
        description: 'As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power.',
        icon: "📖",
        type: 'spell',
        modifiers: [
            { type: 'spell-list', value: 'Wizard spells', description: 'Cast magic from spellbook' }
        ]
    },
    ["Spellbook"]: {
        name: 'Spellbook',
        description: 'At 1st level, you have a spellbook containing six 1st-level wizard spells of your choice. Your spellbook is the repository of the wizard spells you know.',
        icon: "📕",
        type: 'passive',
        modifiers: [
            { type: 'skill-proficiency', value: 'spellbook', description: 'Record spells in spellbook' }
        ]
    },
    ["Arcane Recovery"]: {
        name: 'Arcane Recovery',
        description: 'You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover.',
        icon: "✨",
        type: 'active',
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 1 }
        ]
    },
    ["Arcane Tradition"]: {
        name: 'Arcane Tradition',
        description: 'When you reach 2nd level, you choose an arcane tradition, shaping your practice of magic through one of the following schools.',
        icon: "🎓",
        type: 'passive',
        level: 2
    },
    ["Abjuration Savant"]: {
        name: 'Abjuration Savant',
        description: 'Beginning when you select this school at 2nd level, the gold and time you must spend to copy a abjuration spell into your spellbook is halved.',
        icon: "🛡️",
        type: 'passive',
        level: 2
    },
    ["Arcane Ward"]: {
        name: 'Arcane Ward',
        description: 'Starting at 2nd level, you can weave magic around yourself for protection. When you cast an abjuration spell of 1st level or higher, you gain temporary hit points.',
        icon: "🛡️",
        type: 'passive',
        level: 2,
        modifiers: [
            { type: 'hit-points', value: 'Temp HP', description: 'Protection from abjuration spells' }
        ]
    },
    ["Sculpt Spells"]: {
        name: 'Sculpt Spells',
        description: 'Beginning at 2nd level, you can create pockets of relative safety within the effects of your evocation spells. When you cast an evocation spell, you can choose a number of creatures equal to 1 + the spell\'s level.',
        icon: "🎨",
        type: 'passive',
        level: 2,
        frequency: 'per-turn'
    },
    ["Potent Cantrip"]: {
        name: 'Potent Cantrip',
        description: 'Starting at 6th level, when a creature makes a saving throw against your cantrip, it takes half damage on a success and full damage on a failure.',
        icon: "✨",
        type: 'passive',
        level: 6
    },
    ["Minor Alchemy"]: {
        name: 'Minor Alchemy',
        description: 'Starting at 2nd level, you can temporarily alter the physical properties of nonmagical objects. You perform a special alchemical procedure on one nonmagical object.',
        icon: "🔬",
        type: 'active',
        level: 2,
        frequency: 'per-long-rest',
        resources: [
            { type: 'action', cost: 1 }
        ]
    },
    ["Grim Harvest"]: {
        name: 'Grim Harvest',
        description: 'Starting at 2nd level, once per turn when you kill one creature with a spell of 1st level or higher, you gain temporary hit points.',
        icon: "💀",
        type: 'passive',
        level: 2,
        frequency: 'per-turn'
    }
};

export function getFeature(featureName: string): FeatureData | undefined {
    return featuresMap[featureName];
}

export function getAllFeatures(): FeatureData[] {
    return Object.values(featuresMap);
}

export function getFeaturesByType(type: FeatureType): FeatureData[] {
    return Object.values(featuresMap).filter(f => f.type === type);
}

export function getFeaturesByLevel(level: number): FeatureData[] {
    return Object.values(featuresMap).filter(f => f.level === level || !f.level);
}

export function getClassFeatures(className: string): FeatureData[] {
    // This would map class names to their features
    const classFeatureMap: {[key: string]: string[]} = {
        'Artificer': ['Magical Tinkering', 'Infuse Item', 'Tool Expertise', 'Eldritch Cannon', 'Steel Defender', 'Arcane Armor', 'Potion Brewing'],
        'Barbarian': ['Rage', 'Unarmored Defense', 'Reckless Attack', 'Danger Sense', 'Extra Attack', 'Brutal Critical', 'Relentless Rage', 'Frenzy', 'Mindless Rage', 'Totem Spirit', 'Aspect of the Beast'],
        'Bard': ['Bardic Inspiration', 'Jack of All Trades', 'Song of Rest', 'Expertise', 'Font of Inspiration', 'Countercharm', 'Mantle of Inspiration', 'Enthralling Performance', 'Cutting Words', 'Magical Secrets'],
        'Blood Hunter': ['Monster Hunter', 'Blood Curse', 'Crimson Rite', 'Blood Maledict', 'Rite Specialization', 'Dark Patron', 'Eldritch Invocations'],
        'Cleric': ['Divine Sense', 'Lay on Hands', 'Channel Divinity', 'Preserve Life', 'Blessed Healer', 'Divine Strike', 'Wrath of the Storm'],
        'Druid': ['Druidic', 'Wild Shape', 'Bonus Cantrip', 'Natural Recovery', 'Wild Shape Improvement', 'Timeless Body', 'Beast Spells', 'Circle of the Land', 'Circle Spells'],
        'Fighter': ['Fighting Style', 'Second Wind', 'Improved Critical', 'Remarkable Athlete', 'Indomitable', 'Extra Attacks', 'Combat Superiority', 'Know Your Enemy', 'Spellcasting (Eldritch Knight)'],
        'Monk': ['Martial Arts', 'Unarmored Defense (Monk)', 'Ki Points', 'Unarmored Movement', 'Monastic Tradition', 'Open Hand Technique', 'Wholeness of Body', 'Stunning Strike', 'Shadow Arts'],
        'Paladin': ['Divine Sense (Paladin)', 'Lay on Hands (Paladin)', 'Divine Smite', 'Divine Health', 'Sacred Weapon', 'Channel Divinity (Paladin)', 'Extra Attack (Paladin)', 'Improved Divine Smite', 'Cleansing Touch'],
        'Ranger': ['Favored Enemy', 'Natural Explorer', 'Fighting Style (Ranger)', 'Spellcasting (Ranger)', 'Ranger\'s Companion', 'Extra Attack (Ranger)', 'Colossus Slayer', 'Hunter\'s Sense'],
        'Rogue': ['Expertise (Rogue)', 'Sneak Attack', 'Thieves\' Cant', 'Cunning Action', 'Roguish Archetype', 'Uncanny Dodge', 'Evasion', 'Stroke of Luck', 'Fast Hands', 'Assassinate'],
        'Sorcerer': ['Spellcasting (Sorcerer)', 'Sorcerous Points', 'Font of Magic', 'Metamagic', 'Draconic Resilience', 'Dragon Ancestor', 'Wild Magic Surge', 'Tides of Chaos'],
        'Warlock': ['Otherworldly Patron', 'Pact Magic', 'Eldritch Invocation', 'Dark One\'s Blessing', 'Agonizing Blast', 'Awakened Mind', 'Fey Presence'],
        'Wizard': ['Spellcasting (Wizard)', 'Spellbook', 'Arcane Recovery', 'Arcane Tradition', 'Abjuration Savant', 'Arcane Ward', 'Sculpt Spells', 'Potent Cantrip', 'Minor Alchemy', 'Grim Harvest']
    };

    const featureNames = classFeatureMap[className] || [];
    return featureNames.map(name => featuresMap[name]).filter(f => f !== undefined);
}
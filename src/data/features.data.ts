export interface FeatureData {
    name: string;
    description: string;
    icon: string;
}

export const featuresMap: {[key: string]: FeatureData} = {
    // Shared features
    ["Darkvision"]: {
        name: 'Darkvision',
        description: 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.',
        icon: "👁️"
    },

    // Elf features
    ["Keen Senses"]: {
        name: 'Keen Senses',
        description: 'You have proficiency in the Perception skill.',
        icon: "👁️"
    },
    ["Fey Ancestry"]: {
        name: 'Fey Ancestry',
        description: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.',
        icon: "✨"
    },
    ["Trance"]: {
        name: 'Trance',
        description: 'Elves don\'t need to sleep. Instead, you meditate deeply, remaining semiconscious, for 4 hours a day. While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice.',
        icon: "💤"
    },

    // Dwarf features
    ["Dwarven Resilience"]: {
        name: 'Dwarven Resilience',
        description: 'You have advantage on saving throws against poison, and you have resistance against poison damage.',
        icon: "🛡️"
    },
    ["Dwarven Combat Training"]: {
        name: 'Dwarven Combat Training',
        description: 'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.',
        icon: "⚒️"
    },
    ["Stonecunning"]: {
        name: 'Stonecunning',
        description: 'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of any proficiency bonus you normally apply.',
        icon: "🪨"
    },

    // Halfling features
    ["Lucky"]: {
        name: 'Lucky',
        description: 'When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.',
        icon: "🍀"
    },
    ["Brave"]: {
        name: 'Brave',
        description: 'You have advantage on saving throws against being frightened.',
        icon: "💪"
    },
    ["Halfling Nimbleness"]: {
        name: 'Halfling Nimbleness',
        description: 'You can move through the space of any creature that is of a size larger than yours.',
        icon: "💨"
    },

    // Dragonborn features
    ["Draconic Ancestry"]: {
        name: 'Draconic Ancestry',
        description: 'You are descended from a dragon and have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your damage resistance and breath weapon are determined by the dragon type.',
        icon: "🐉"
    },
    ["Breath Weapon"]: {
        name: 'Breath Weapon',
        description: 'You can use your action to exhale destructive energy. It deals 2d6 damage of a type determined by your draconic ancestry. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw (DC = 8 + your Constitution modifier + your proficiency bonus).',
        icon: "🔥"
    },
    ["Damage Resistance"]: {
        name: 'Damage Resistance',
        description: 'You have resistance to the damage type associated with your draconic ancestry.',
        icon: "🛡️"
    },

    // Gnome features
    ["Gnome Cunning"]: {
        name: 'Gnome Cunning',
        description: 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.',
        icon: "🧠"
    },
    ["Gnome Ingenuity"]: {
        name: 'Gnome Ingenuity',
        description: 'When you make an ability check, you gain a bonus to the check equal to your proficiency bonus if you aren\'t already applying your proficiency bonus to the check.',
        icon: "🔧"
    },

    // Half-Elf features
    ["Skill Versatility"]: {
        name: 'Skill Versatility',
        description: 'You gain proficiency in two skills of your choice.',
        icon: "📚"
    },

    // Half-Orc features
    ["Menacing"]: {
        name: 'Menacing',
        description: 'You gain proficiency in the Intimidation skill.',
        icon: "😠"
    },
    ["Relentless Endurance"]: {
        name: 'Relentless Endurance',
        description: 'When you are reduced to 0 hit points but not killed outright, you can choose to drop to 1 hit point instead. You can\'t use this feature again until you finish a long rest.',
        icon: "💚"
    },

    // Tiefling features
    ["Hellish Resistance"]: {
        name: 'Hellish Resistance',
        description: 'You have resistance to fire damage.',
        icon: "🔥"
    },
    ["Infernal Legacy"]: {
        name: 'Infernal Legacy',
        description: 'You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the hellish rebuke spell once with this trait and regain the ability to do so when you finish a long rest.',
        icon: "😈"
    },
};
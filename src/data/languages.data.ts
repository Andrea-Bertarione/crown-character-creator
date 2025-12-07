import type {CharacterLanguage} from "$lib/characterCreation.svelte";

export interface LanguageData {
    name: CharacterLanguage;
    description: string;
    script: string;
    speakers: string[];
    icon: string;
}

export const languagesMap: {[key: string]: LanguageData} = {
    ["Common"]: {
        name: "Common",
        description: "The universal language of humanoids across the realms. Most races speak Common as a primary or secondary language.",
        script: "Common",
        speakers: ["Humans", "Halflings", "Half-Elves", "Half-Orcs"],
        icon: "🗣️"
    },
    ["Elvish"]: {
        name: "Elvish",
        description: "The melodious language of the Elven peoples. Known for its flowing, harmonic qualities and deep connection to nature.",
        script: "Elvish",
        speakers: ["Elves", "Half-Elves"],
        icon: "🌿"
    },
    ["Dwarvish"]: {
        name: "Dwarvish",
        description: "The guttural language of the Dwarven clans, often accompanied by hand gestures. Used in trade and stonework.",
        script: "Dwarvish",
        speakers: ["Dwarves"],
        icon: "⛏️"
    },
    ["Halfling"]: {
        name: "Halfling",
        description: "The cheerful language of the Halfling folk, full of diminutives and colloquialisms.",
        script: "Common",
        speakers: ["Halflings"],
        icon: "🍃"
    },
    ["Draconic"]: {
        name: "Draconic",
        description: "The ancient, powerful language of dragons and Dragonborn. Commands respect and authority.",
        script: "Draconic",
        speakers: ["Dragonborn", "Dragons"],
        icon: "🐉"
    },
    ["Gnomish"]: {
        name: "Gnomish",
        description: "The quick, clever language of the Gnomes, filled with technical terminology and wordplay.",
        script: "Dwarvish",
        speakers: ["Gnomes"],
        icon: "🔧"
    },
    ["Orc"]: {
        name: "Orc",
        description: "The guttural, aggressive language of Orcs. Direct and expressive.",
        script: "Draconic",
        speakers: ["Half-Orcs", "Orcs"],
        icon: "⚔️"
    },
    ["Infernal"]: {
        name: "Infernal",
        description: "The dark language of the Lower Planes, spoken by demons and devils. Often whispered in threats.",
        script: "Infernal",
        speakers: ["Tieflings"],
        icon: "😈"
    },
    ["Giant"]: {
        name: "Giant",
        description: "The booming language of giants, spoken in loud, resonant tones.",
        script: "Dwarvish",
        speakers: ["Giants"],
        icon: "👹"
    },
    ["Abyssal"]: {
        name: "Abyssal",
        description: "The chaotic language of the Abyss and its denizens. Often causes discomfort to those who hear it.",
        script: "Infernal",
        speakers: ["Demons"],
        icon: "👿"
    },
    ["Celestial"]: {
        name: "Celestial",
        description: "The beautiful, otherworldly language of the Upper Planes. Known for its harmonic quality.",
        script: "Celestial",
        speakers: ["Celestials", "Good Outsiders"],
        icon: "✨"
    },
    ["Deep Speech"]: {
        name: "Deep Speech",
        description: "The strange, alien language of the Far Realm and aberrations. Difficult for most minds to comprehend.",
        script: "Unknown",
        speakers: ["Aboleths", "Mind Flayers"],
        icon: "👁️"
    },
    ["Primordial"]: {
        name: "Primordial",
        description: "The ancient language of elementals and primal forces. Each dialect (Aquan, Auran, Ignan, Terran) sounds like its element.",
        script: "Draconic",
        speakers: ["Elementals"],
        icon: "🌀"
    },
    ["Sylvan"]: {
        name: "Sylvan",
        description: "The whimsical language of fey creatures and nature spirits. Often incorporates sounds of the forest.",
        script: "Elvish",
        speakers: ["Fey", "Forest Creatures"],
        icon: "🌲"
    },
    ["Undercommon"]: {
        name: "Undercommon",
        description: "The trade language of the Underdark. Used by drow, duergar, and other underground denizens.",
        script: "Elvish",
        speakers: ["Drow", "Duergar", "Underground Races"],
        icon: "🕳️"
    },
    ["Goblin"]: {
        name: "Goblin",
        description: "The sharp, quick language of goblins and goblinoids. Full of harsh sounds and rapid speech.",
        script: "Dwarvish",
        speakers: ["Goblins", "Hobgoblins"],
        icon: "👺"
    },
};

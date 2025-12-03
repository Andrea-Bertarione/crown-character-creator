import { Race } from "../State/characters.state";
export type CharacterRace = "Default" | "Human" | "Elf" | "Dwarf" | "Halfling" | "Dragonborn" | "Gnome" | "Half-Elf" | "Half-Orc" | "Tiefling";
import type { CharacterSize, CharacterLanguage, CharacterStats } from "../State/characters.state";

export interface RaceData {
    name: CharacterRace;
    fixedModifiers: CharacterStats;
    choiceModifiers: number[];
    features: string[];
    size: CharacterSize;
    speed: number;
    languages: CharacterLanguage[];
    languageChoices: number;
    image?: string;
}

export const raceList: RaceData[] = [
    {
        name: "Human",
        fixedModifiers: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
        choiceModifiers: [],
        features: ["Skill Versatility", "Menacing", "Expertise"],
        size: "Medium",
        speed: 9,
        languages: ["Common"],
        languageChoices: 1,
        image: "https://www.dndbeyond.com/avatars/thumbnails/6/258/420/618/636271801914013762.png"
    },
    {
        name: "Elf",
        fixedModifiers: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 0 },
        choiceModifiers: [],
        features: ["Darkvision", "Keen Senses", "Fey Ancestry", "Trance"],
        size: "Medium",
        speed: 9,
        languages: ["Common", "Elvish"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/7/639/420/618/636287075350739045.png"
    },
    {
        name: "Dwarf",
        fixedModifiers: { str: 0, dex: 0, con: 2, int: 0, wis: 0, cha: 0 },
        choiceModifiers: [],
        features: ["Darkvision", "Dwarven Resilience", "Dwarven Combat Training", "Stonecunning"],
        size: "Medium",
        speed: 8,
        languages: ["Common", "Dwarvish"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/6/254/420/618/636271781394265550.png"
    },
    {
        name: "Halfling",
        fixedModifiers: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 0 },
        choiceModifiers: [],
        features: ["Lucky", "Brave", "Halfling Nimbleness"],
        size: "Small",
        speed: 8,
        languages: ["Common", "Halfling"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/6/256/420/618/636271789409776659.png"
    },
    {
        name: "Dragonborn",
        fixedModifiers: { str: 2, dex: 0, con: 0, int: 0, wis: 0, cha: 1 },
        choiceModifiers: [],
        features: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"],
        size: "Medium",
        speed: 9,
        languages: ["Common", "Draconic"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/6/340/420/618/636272677995471928.png"
    },
    {
        name: "Gnome",
        fixedModifiers: { str: 0, dex: 0, con: 0, int: 2, wis: 0, cha: 0 },
        choiceModifiers: [],
        features: ["Darkvision", "Gnome Cunning", "Gnome Ingenuity"],
        size: "Small",
        speed: 8,
        languages: ["Common", "Gnomish"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/6/334/420/618/636272671553055253.png"
    },
    {
        name: "Half-Elf",
        fixedModifiers: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 2 },
        choiceModifiers: [1, 1],
        features: ["Darkvision", "Fey Ancestry", "Skill Versatility"],
        size: "Medium",
        speed: 9,
        languages: ["Common", "Elvish"],
        languageChoices: 1,
        image: "https://www.dndbeyond.com/avatars/thumbnails/6/481/420/618/636274618102950794.png"
    },
    {
        name: "Half-Orc",
        fixedModifiers: { str: 2, dex: 0, con: 1, int: 0, wis: 0, cha: 0 },
        choiceModifiers: [],
        features: ["Darkvision", "Menacing", "Relentless Endurance"],
        size: "Medium",
        speed: 9,
        languages: ["Common", "Orc"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/6/266/420/618/636271801914090571.png"
    },
    {
        name: "Tiefling",
        fixedModifiers: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 2 },
        choiceModifiers: [1],
        features: ["Darkvision", "Hellish Resistance", "Infernal Legacy"],
        size: "Medium",
        speed: 9,
        languages: ["Common", "Infernal"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/7/641/420/618/636287076637981942.png"
    },
];

export default raceList;
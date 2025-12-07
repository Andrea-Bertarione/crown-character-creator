export type CharacterRace = "Default" | "Human" | "Elf" | "Dwarf" | "Halfling" | "Dragonborn" | "Gnome" | "Half-Elf" | "Half-Orc" | "Tiefling";
import type { CharacterSize, CharacterLanguage, AbilityScore} from "$lib/characterCreation.svelte";

export interface RaceData {
    name: CharacterRace;
    fixedModifiers: Record<AbilityScore, number>;
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
        fixedModifiers: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
        choiceModifiers: [],
        features: [],
        size: "Medium",
        speed: 9,
        languages: ["Common"],
        languageChoices: 1,
        image: "https://www.dndbeyond.com/avatars/thumbnails/6/258/420/618/636271801914013762.png"
    },
    {
        name: "Elf",
        fixedModifiers: { strength: 0, dexterity: 2, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 },
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
        fixedModifiers: { strength: 0, dexterity: 0, constitution: 2, intelligence: 0, wisdom: 0, charisma: 0 },
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
        fixedModifiers: { strength: 0, dexterity: 2, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 },
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
        fixedModifiers: { strength: 2, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 1 },
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
        fixedModifiers: { strength: 0, dexterity: 0, constitution: 0, intelligence: 2, wisdom: 0, charisma: 0 },
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
        fixedModifiers: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 2 },
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
        fixedModifiers: { strength: 2, dexterity: 0, constitution: 1, intelligence: 0, wisdom: 0, charisma: 0 },
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
        fixedModifiers: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 2 },
        choiceModifiers: [1],
        features: ["Darkvision", "Hellish Resistance", "Infernal Legacy"],
        size: "Medium",
        speed: 9,
        languages: ["Common", "Infernal"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/7/641/420/618/636287076637981942.png"
    },
];

export const racesData = Object.fromEntries(
    raceList.map(race => [race.name, race])
) as Record<CharacterRace, RaceData>;

export default racesData;
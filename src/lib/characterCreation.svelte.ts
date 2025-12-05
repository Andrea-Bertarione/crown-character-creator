import {v4 as uuidv4} from "uuid";
import {type CharacterProficiencies, proficienciesList} from "../data/proficiencies.data";
import type {CharacterRace} from "../data/races.data";

export type AbilityScore = "strength" | "dexterity" | "constitution" | "wisdom" | "intelligence" | "charisma";
export type CharacterSize = "Small" | "Medium" | "Large" | "Huge";
export type CharacterLanguage = "Common" | "Elvish" | "Giant" | "Gnomish" | "Abyssal" | "Celestial" | "Draconic" | "Deep Speech" | "Halfling" | "Primordial" | "Sylvan" | "Undercommon" | "Orc" | "Dwarvish" | "Goblin" | "Infernal";


export interface Character {
    id: string;
    name: string;
    race: CharacterRace;
    abilityScoreComputed: Record<AbilityScore, number>;
    abilityScores: Record<AbilityScore, number>;
    proficiencies: CharacterProficiencies;
    features: [];
}

const starterCharacter: Character = {
    id: uuidv4(),
    name: "",
    race: "Default",
    abilityScoreComputed: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        wisdom: 10,
        intelligence: 10,
        charisma: 10,
    },
    abilityScores: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        wisdom: 10,
        intelligence: 10,
        charisma: 10,
    },
    proficiencies: proficienciesList,
    features: [],
};

export const characterCreation = ():Character => {
    return Object.create(starterCharacter);
}
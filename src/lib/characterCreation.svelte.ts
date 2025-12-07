import {v4 as uuidv4} from "uuid";
import {type CharacterProficiencies, proficienciesList} from "../data/proficiencies.data";
import {type CharacterRace, racesData} from "../data/races.data";

export type AbilityScore = "strength" | "dexterity" | "constitution" | "wisdom" | "intelligence" | "charisma";
export type CharacterSize = "Small" | "Medium" | "Large" | "Huge";
export type CharacterLanguage = "Common" | "Elvish" | "Giant" | "Gnomish" | "Abyssal" | "Celestial" | "Draconic" | "Deep Speech" | "Halfling" | "Primordial" | "Sylvan" | "Undercommon" | "Orc" | "Dwarvish" | "Goblin" | "Infernal";

export class Character {
    id: string;
    name: string;
    race: CharacterRace;
    abilityScoreComputed: Record<AbilityScore, number>;
    abilityScores: Record<AbilityScore, number>;
    additionalAbilityScoresChoices: Record<string, AbilityScore | null>;
    additionalAbilityScores: Record<string, {
        source: string;
        increment: number;
        chosenScore: AbilityScore | null;
    }>;
    raceFeatures: string[];
    languages: CharacterLanguage[];
    languagesChoices: CharacterLanguage[];
    proficiencies: CharacterProficiencies;

    constructor() {
        this.id = uuidv4();
        this.name = $state("");
        this.race = $state("Default");
        this.abilityScores = $state({
            strength: 10,
            dexterity: 10,
            constitution: 10,
            wisdom: 10,
            intelligence: 10,
            charisma: 10,
        });

        this.abilityScoreComputed = $derived.by(() => {
            const result: Record<AbilityScore, number> = {
                strength: 0,
                dexterity: 0,
                constitution: 0,
                wisdom: 0,
                intelligence: 0,
                charisma: 0,
            };

            (Object.entries(this.abilityScores) as [AbilityScore, number][]).forEach(
                ([ability, baseScore]) => {
                    const raceMod = racesData[this.race as CharacterRace]?.fixedModifiers[ability] ?? 0;
                    const additionalPoints = Object.values(this.additionalAbilityScores)
                        .filter((mod) => mod.chosenScore === ability)
                        .reduce((sum, mod) => sum + mod.increment, 0);

                    result[ability] = baseScore + raceMod + additionalPoints;
                }
            );

            return result;
        });

        this.additionalAbilityScoresChoices = $state({});
        this.additionalAbilityScores = $derived.by(() => {
            if (this.race === "Default") { return {} }
            const selectedRace = racesData[this.race];
            const additionalChoicesHelper = this.additionalAbilityScoresChoices;
            const additionalAbilityScoresHelper: Record<string, {
                source: string;
                increment: number;
                chosenScore: AbilityScore | null;
            }> = {};

            selectedRace.choiceModifiers.forEach((mod, index) => {
                additionalAbilityScoresHelper[`Race-${selectedRace.name} n.${index}`] ={
                    source: `${selectedRace.name}`,
                    increment: mod,
                    chosenScore: additionalChoicesHelper[`Race-${selectedRace.name} n.${index}`] || null
                };
            });

            return additionalAbilityScoresHelper;
        })

        this.raceFeatures = $derived.by(() => {
            if (this.race === "Default") { return [] }

            const selectedRace = racesData[this.race];
            return selectedRace.features.map(v => v);
        })

        this.languages = $derived.by(() => {
            if (this.race === "Default") { return [] }

            const selectedRace = racesData[this.race];
            return selectedRace.languages.map(v => v);
        })

        this.languagesChoices = $state([]);

        this.proficiencies = proficienciesList;
    }

    setAdditionalAbilityScoresChoices = (key: string, value: AbilityScore) => {
        for (const choiceName in this.additionalAbilityScoresChoices) {
            if (!this.additionalAbilityScores.hasOwnProperty(choiceName)) {
                delete this.additionalAbilityScoresChoices[choiceName];
            }
        }

        this.additionalAbilityScoresChoices[key] = value;
    }

    reset = () => {
        this.id = uuidv4();
        this.name = "";
        this.race = "Default";
        this.abilityScores = {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            wisdom: 10,
            intelligence: 10,
            charisma: 10,
        };
        this.proficiencies = proficienciesList;
    }

    logCharacter = () => {
        console.log(`Character ${this.id}`);
        console.log($state.snapshot(this.name), "the", $state.snapshot(this.race));
        console.log("Basic ability scores:", $state.snapshot(this.abilityScores));
        console.log("Computed ability scores:", $state.snapshot(this.abilityScoreComputed));
        console.log("Additional Ability Scores:", $state.snapshot(this.additionalAbilityScores));
        console.log("Additional Choices:", $state.snapshot(this.additionalAbilityScoresChoices));
        console.log("Languages:", $state.snapshot(this.languages));
        console.log("Chosen Languages:", $state.snapshot(this.languagesChoices));
    }
}

export const characterCreationState = new Character();
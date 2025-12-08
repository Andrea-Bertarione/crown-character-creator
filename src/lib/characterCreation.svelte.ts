import {v4 as uuidv4} from "uuid";
import {featuresMap} from "../data/features.data";
import {type CharacterProficiencies, proficienciesList} from "../data/proficiencies.data";
import {type CharacterRace, type RaceData, racesData} from "../data/races.data";
import { classesData, type ClassName } from "../data/classes.data";

export type AbilityScore = "strength" | "dexterity" | "constitution" | "wisdom" | "intelligence" | "charisma";
export type CharacterSize = "Small" | "Medium" | "Large" | "Huge";
export type CharacterLanguage = "Common" | "Elvish" | "Giant" | "Gnomish" | "Abyssal" | "Celestial" | "Draconic" | "Deep Speech" | "Halfling" | "Primordial" | "Sylvan" | "Undercommon" | "Orc" | "Dwarvish" | "Goblin" | "Infernal";

export interface SpellChoice {
    source: string; // "Bard Level 1", "Wizard Spellbook", etc
    level: number; // Spell level (0-9, cantrips are 0)
    type: "cantrip" | "spell";
    maxChoices: number; // How many can be selected
    availableSpells: string[]; // List of available spells to choose from
}

export interface ClassChoices {
    skills: string[];
    tools: string[];
    cantrips: string[];
    spells: string[];
    armorProficiencies: string[];
}

export class Character {
    id: string;
    name: string;
    race: CharacterRace;
    subrace: string | null;
    class: ClassName | null;
    subClass: string | null;
    abilityScoreComputed: Record<AbilityScore, number>;
    abilityScores: Record<AbilityScore, number>;
    additionalAbilityScoresChoices: Record<string, AbilityScore | null>;
    additionalAbilityScores: Record<string, {
        source: string;
        increment: number;
        chosenScore: AbilityScore | null;
    }>;
    raceFeatures: string[];
    classFeatures: string[];
    classChoices?: ClassChoices;
    actives: string[];
    manualProficiencies: Record<string, "none" | "proficiency" | "expertise">;
    languages: CharacterLanguage[];
    languagesChoices: CharacterLanguage[];
    proficiencies: CharacterProficiencies;

    spellChoices: Record<string, SpellChoice>;
    selectedSpells: Record<string, string> = $state({}); // Key: choice ID, Value: spell name

    spells: string[] = $derived.by(() => {
        // Derive actual selected spells from selectedSpells
        return Object.values(this.selectedSpells).filter(Boolean);
    });

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

        this.subrace = $state(null);
        this.manualProficiencies = $state({});

        this.class = $state(null);
        this.subClass = $state(null);

        this.actives = $state([]);
        this.classChoices = $state({
            skills: [],
            tools: [],
            cantrips: [],
            spells: [],
            armorProficiencies: [],
        })

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
                    const subRaceMod = this.getSubraceData(racesData[this.race as CharacterRace])?.fixedModifiers[ability] ?? 0;

                    const additionalPoints = Object.values(this.additionalAbilityScores)
                        .filter((mod) => mod.chosenScore === ability)
                        .reduce((sum, mod) => sum + mod.increment, 0);

                    result[ability] = baseScore + raceMod + subRaceMod + additionalPoints;
                }
            );

            return result;
        });

        this.additionalAbilityScoresChoices = $state({});
        this.additionalAbilityScores = $derived.by(() => {
            const selectedRace = this.getRaceData();
            if (selectedRace === null) { return {} }

            const additionalChoicesHelper = this.additionalAbilityScoresChoices;
            const additionalAbilityScoresHelper: Record<string, {
                source: string;
                increment: number;
                chosenScore: AbilityScore | null;
            }> = {};

            selectedRace.choiceModifiers.forEach((mod, index) => {
                additionalAbilityScoresHelper[`Race-${selectedRace.name} n.${index}`] = {
                    source: `${selectedRace.name}`,
                    increment: mod,
                    chosenScore: additionalChoicesHelper[`Race-${selectedRace.name} n.${index}`] || null
                };
            });

            const selectedSubRace = this.getSubraceData(selectedRace);
            if (selectedSubRace) {
                selectedSubRace.choiceModifiers?.forEach((mod, index) => {
                    additionalAbilityScoresHelper[`Race-${selectedSubRace.name} n.${index}`] = {
                        source: `${selectedSubRace.name}`,
                        increment: mod,
                        chosenScore: additionalChoicesHelper[`Race-${selectedSubRace.name} n.${index}`] || null
                    }
                });
            }

            return additionalAbilityScoresHelper;
        })

        this.spellChoices = $derived.by(() => {
            if (this.class === null) { return {} }

            const classData = this.getClassData();
            if (!classData) { return {} }

            const choices: Record<string, SpellChoice> = {};

            // Add cantrip choices for level 1
            if (classData.cantripsKnownAtLevel1 && classData.cantripsKnownAtLevel1 > 0) {
                choices[`${classData.name}-Cantrips-Level1`] = {
                    source: `${classData.name} Level 1`,
                    level: 0,
                    type: "cantrip",
                    maxChoices: classData.cantripsKnownAtLevel1,
                    availableSpells: [] // Would be populated from spells.data
                };
            }

            // Add spell choices for level 1
            if (classData.spellsKnownAtLevel1 && classData.spellsKnownAtLevel1 > 0) {
                choices[`${classData.name}-Spells-Level1`] = {
                    source: `${classData.name} Level 1`,
                    level: 0, // Can be any spell level
                    type: "spell",
                    maxChoices: classData.spellsKnownAtLevel1,
                    availableSpells: [] // Would be populated from spells.data
                };
            }

            return choices;
        });

        this.raceFeatures = $derived.by(() => {
            const selectedRace = this.getRaceData();
            if (selectedRace === null) { return []}

            let result = selectedRace.features.map(v => v);
            if (this.subrace !== null && selectedRace.subraces !== undefined) {
                const selectedSubrace = this.getSubraceData(selectedRace);

                if (selectedSubrace) {
                    result = result.concat(selectedSubrace.features);
                }
            }

            return result;
        })

        this.classFeatures = $derived.by(() => {
            if (this.class === null) { return [] }

            const selectedClass = classesData[this.class];
            if (!selectedClass) { return [] }

            let result: string[] = [];

            // Add base class features (this could be expanded if ClassData had base features)
            // For now, we only add subclass features if a subclass is selected

            if (this.subClass !== null) {
                const selectedSubclass = selectedClass.subclasses.find(s => s.name === this.subClass);
                if (selectedSubclass) {
                    result = selectedSubclass.features.map(f => f.name);
                }
            }

            return result;
        })

        this.languages = $derived.by(() => {
            const selectedRace = this.getRaceData();
            if (selectedRace === null) { return []}

            let result = selectedRace.languages.map(v => v);
            if (this.subrace !== null && selectedRace.subraces !== undefined) {
                const selectedSubrace = this.getSubraceData(selectedRace);

                if (selectedSubrace) {
                    result = result.concat(selectedSubrace.languages || []);
                }
            }

            return result;
        })

        this.languagesChoices = $state([]);

        // Reactive proficiencies derived from features
        this.proficiencies = $derived.by(() => {
            const baseProficiencies = JSON.parse(JSON.stringify(proficienciesList)) as CharacterProficiencies;

            // Apply manual overrides first
            Object.entries(this.manualProficiencies).forEach(([key, state]) => {
                if (baseProficiencies[key]) {
                    baseProficiencies[key].state = state;
                }
            });

            // Combine race and class features for proficiency application
            const allFeatures = [...this.raceFeatures, ...this.classFeatures];

            // Apply feature-granted proficiencies
            allFeatures.forEach((featureName) => {
                const feature = featuresMap[featureName];
                if (!feature?.modifiers) return;

                feature.modifiers.forEach((modifier: any) => {
                    if (modifier.type === "skill-proficiency") {
                        const skillKey = Object.keys(baseProficiencies).find(
                            key => baseProficiencies[key].name.toLowerCase() === modifier.value.toLowerCase()
                        );
                        if (skillKey && baseProficiencies[skillKey]) {
                            if (baseProficiencies[skillKey].state === "none") {
                                baseProficiencies[skillKey].state = "proficiency";
                            }
                        }
                    }

                    if (modifier.type === "weapon-proficiency") {
                        const weapons = Array.isArray(modifier.value) ? modifier.value : [modifier.value];
                        weapons.forEach((weapon: string) => {
                            const weaponKey = Object.keys(baseProficiencies).find(
                                key => baseProficiencies[key].name.toLowerCase() === weapon.toLowerCase()
                            );
                            if (weaponKey && baseProficiencies[weaponKey]) {
                                if (baseProficiencies[weaponKey].state === "none") {
                                    baseProficiencies[weaponKey].state = "proficiency";
                                }
                            }
                        });
                    }

                    if (modifier.type === "armor-proficiency") {
                        const armorTypes = Array.isArray(modifier.value) ? modifier.value : [modifier.value];
                        armorTypes.forEach((armor: string) => {
                            Object.values(baseProficiencies).forEach((prof) => {
                                if (prof.type === "armor") {
                                    if (armor === "light" && ["Leather", "Padded", "Studded Leather"].includes(prof.name)) {
                                        if (prof.state === "none") prof.state = "proficiency";
                                    }
                                    if (armor === "medium" && ["Chain Mail", "Chain Shirt", "Half Plate", "Hide", "Scale Mail"].includes(prof.name)) {
                                        if (prof.state === "none") prof.state = "proficiency";
                                    }
                                    if (armor === "heavy" && ["Plate", "Plate Armor", "Splint"].includes(prof.name)) {
                                        if (prof.state === "none") prof.state = "proficiency";
                                    }
                                }
                            });
                        });
                    }

                    if (modifier.type === "tool-proficiency") {
                        const toolKey = Object.keys(baseProficiencies).find(
                            key => baseProficiencies[key].name.toLowerCase() === modifier.value.toLowerCase()
                        );
                        if (toolKey && baseProficiencies[toolKey]) {
                            if (baseProficiencies[toolKey].state === "none") {
                                baseProficiencies[toolKey].state = "proficiency";
                            }
                        }
                    }
                });
            });

            return baseProficiencies;
        });
    }

    setAdditionalAbilityScoresChoices = (key: string, value: AbilityScore | null) => {
        for (const choiceName in this.additionalAbilityScoresChoices) {
            if (!this.additionalAbilityScores.hasOwnProperty(choiceName)) {
                delete this.additionalAbilityScoresChoices[choiceName];
            }
        }

        this.additionalAbilityScoresChoices[key] = value;
    }

    setManualProficiency = (proficiencyName: string, state: "none" | "proficiency" | "expertise") => {
        this.manualProficiencies[proficiencyName] = state;
    }

    getRaceData() {
        if (this.race === "Default") { return null; }

        return racesData[this.race];
    }

    getSubraceData = (raceData: RaceData) => {
        if (this.subrace !== null && raceData.subraces !== undefined) {
            return raceData.subraces.find(v => v.name === this.subrace) || null;
        }

        return null;
    }

    getClassData() {
        if (this.class === null) { return null; }

        return classesData[this.class];
    }

    getSubclassData = () => {
        const classData = this.getClassData();
        if (this.subClass === null || !classData) { return null; }

        return classData.subclasses.find(s => s.name === this.subClass) || null;
    }

    setSpellChoice = (choiceId: string, spellName: string) => {
        this.selectedSpells[choiceId] = spellName;
    }

    removeSpellChoice = (choiceId: string) => {
        delete this.selectedSpells[choiceId];
    }

    reset = () => {
        this.id = uuidv4();
        this.name = "";
        this.race = "Default";
        this.subrace = null;
        this.class = null;
        this.subClass = null;
        this.abilityScores = {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            wisdom: 10,
            intelligence: 10,
            charisma: 10,
        };
        this.manualProficiencies = {};
        this.spells = [];
        this.actives = [];
    }

    logCharacter = () => {
        console.log(`Character ${this.id}`);
        console.log($state.snapshot(this.name), "the", $state.snapshot(this.race), `(${$state.snapshot(this.subrace)})`);
        console.log("Class:", $state.snapshot(this.class), "Subclass:", $state.snapshot(this.subClass));
        console.log("Class choices", $state.snapshot(this.classChoices));
        console.log("Basic ability scores:", $state.snapshot(this.abilityScores));
        console.log("Computed ability scores:", $state.snapshot(this.abilityScoreComputed));
        console.log("Additional Ability Scores:", $state.snapshot(this.additionalAbilityScores));
        console.log("Additional Choices:", $state.snapshot(this.additionalAbilityScoresChoices));
        console.log("Languages:", $state.snapshot(this.languages));
        console.log("Chosen Languages:", $state.snapshot(this.languagesChoices));
        console.log("Race Features:", $state.snapshot(this.raceFeatures));
        console.log("Class Features:", $state.snapshot(this.classFeatures));
        console.log("Proficiencies:", $state.snapshot(this.proficiencies));
        console.log("Spell Choices:", $state.snapshot(this.spells));
    }
}

export const characterCreationState = new Character();

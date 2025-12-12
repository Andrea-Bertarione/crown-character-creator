// characterCreation.svelte.ts
// CharacterCreationManager class with Svelte 5 runes for reactive state

import type {
    CharacterRace,
    RaceData,
    SubraceData
} from "../data/races.data";
import type {
    ClassName,
    ClassData,
    Subclass
} from "../data/classes.data";

interface Step {
    name: string;
    header: string;
    subheader: string;
    side: string[];
    confirm: string;
}

interface AdditionalChoicesRaceSubState {
    Languages?: string[];
    Proficiency?: string[];
    Feat?: string[];
}

/**
 * CharacterCreationManager
 * Manages all character creation state and logic
 * Uses Svelte 5 runes for reactive state ($state, $derived)
 */
export class CharacterCreationManager {
    // ✨ Reactive state using Svelte 5 runes
    tempChoices: { [key: string]: string } & { Race: CharacterRace } = $state({
        Race: "Default",
        Subrace: "",
        Subclass: "",
        AdditionalChanges: "",
        Class: ""
    });

    additionalChoicesRaceSubState: AdditionalChoicesRaceSubState = $state({
        Languages: [],
        Proficiency: [],
        Feat: []
    });

    // Dependencies (injected)
    racesData: Record<CharacterRace, RaceData>;
    classesData: Record<ClassName, ClassData>;
    featuresMap: Record<string, any>;
    raceList: RaceData[];

    constructor(deps: {
        racesData: Record<CharacterRace, RaceData>;
        classesData: Record<ClassName, ClassData>;
        featuresMap: Record<string, any>;
        raceList: RaceData[];
    }) {
        this.racesData = deps.racesData;
        this.classesData = deps.classesData;
        this.featuresMap = deps.featuresMap;
        this.raceList = deps.raceList;
    }

    // ============================================
    // SECTION 1: DATA RETRIEVAL HELPERS
    // ============================================

    /**
     * Get the confirmed race object from tempChoices
     */
    getConfirmedRace(): RaceData | null {
        if (this.tempChoices.Race === "Default") return null;
        const race = this.racesData[this.tempChoices.Race as CharacterRace];
        console.log("🎭 getConfirmedRace:", this.tempChoices.Race, "->", race?.name ?? "NULL");
        return race ?? null;
    }

    /**
     * Check if the given race has subrace options
     */
    hasRaceSubraces(race: RaceData | null): boolean {
        const hasSubraces = !!(race?.subraces && race.subraces.length > 0);
        console.log("🎭 hasRaceSubraces:", race?.name ?? "NULL", "->", hasSubraces);
        return hasSubraces;
    }

    /**
     * Get the confirmed subrace from a race
     */
    getConfirmedSubrace(race: RaceData | null): SubraceData | null {
        if (!race || !this.tempChoices.Subrace) {
            console.log("🎭 getConfirmedSubrace:", "NO RACE OR SUBRACE SELECTED");
            return null;
        }
        const subrace = race.subraces?.find(s => s.name === this.tempChoices.Subrace);
        console.log("🎭 getConfirmedSubrace:", this.tempChoices.Subrace, "->", subrace?.name ?? "NULL");
        return subrace ?? null;
    }

    /**
     * Get the confirmed class object from tempChoices
     */
    getConfirmedClass(): ClassData | null {
        if (this.tempChoices.Class === "") {
            console.log("⚔️  getConfirmedClass: NO CLASS SELECTED");
            return null;
        }
        const classData = this.classesData[this.tempChoices.Class as ClassName];
        console.log("⚔️  getConfirmedClass:", this.tempChoices.Class, "->", classData?.name ?? "NULL");
        return classData ?? null;
    }

    /**
     * Check if the given class has subclass options (subclassLevel === 1)
     */
    hasClassSubclasses(classData: ClassData | null): boolean {
        const hasSubclasses = !!(classData && classData.subclassLevel === 1);
        console.log("⚔️  hasClassSubclasses:", classData?.name ?? "NULL", "->", hasSubclasses);
        return hasSubclasses;
    }

    /**
     * Get the confirmed subclass from a class
     */
    getConfirmedSubclass(classData: ClassData | null): Subclass | null {
        if (!classData || !this.tempChoices.Subclass) {
            console.log("⚔️  getConfirmedSubclass: NO CLASS OR SUBCLASS SELECTED");
            return null;
        }
        const subclass = classData.subclasses?.find(s => s.name === this.tempChoices.Subclass);
        console.log("⚔️  getConfirmedSubclass:", this.tempChoices.Subclass, "->", subclass?.name ?? "NULL");
        return subclass ?? null;
    }

    /**
     * Extract the various choice categories from a list of feature names
     */
    extractChoiceCategories(featureNames: string[]): string[] {
        const categories = new Set<string>();

        for (const featureName of featureNames) {
            const featureData = this.featuresMap[featureName];
            if (!featureData) continue;

            for (const modifier of featureData.modifiers || []) {
                if (modifier.value === "choice") {
                    let category = modifier.type;
                    if (modifier.type.endsWith("-proficiency")) {
                        category = modifier.type.split("-")[0];
                    }
                    categories.add(category);
                }
            }
        }

        return Array.from(categories);
    }

    // ============================================
    // SECTION 2: ADDITIONAL CHOICES HELPERS
    // ============================================

    /**
     * Extract all choice categories from a race
     */
    getRaceAdditionalChoices(race: RaceData | null): string[] {
        if (!race) {
            console.log("📋 getRaceAdditionalChoices: NO RACE");
            return [];
        }

        const choices: string[] = [];

        if (race.languageChoices > 0) {
            choices.push("Languages");
            console.log("📋   + Languages (count:", race.languageChoices + ")");
        }

        const raceFeatureChoices = this.extractChoiceCategories(race.features);
        raceFeatureChoices.forEach(choice => {
            if (!choices.includes(choice)) {
                choices.push(choice);
                console.log("📋   + " + choice + " (from race features)");
            }
        });

        console.log("📋 getRaceAdditionalChoices TOTAL:", choices);
        return choices;
    }

    /**
     * Extract all choice categories from a subrace
     */
    getSubraceAdditionalChoices(subrace: SubraceData | null): string[] {
        if (!subrace) {
            console.log("📋 getSubraceAdditionalChoices: NO SUBRACE");
            return [];
        }

        const choices: string[] = [];

        if ((subrace.languageChoices || 0) > 0) {
            choices.push("Languages");
            console.log("📋   + Languages (count:", subrace.languageChoices + ")");
        }

        const subraceFeatureChoices = this.extractChoiceCategories(subrace.features);
        subraceFeatureChoices.forEach(choice => {
            if (!choices.includes(choice)) {
                choices.push(choice);
                console.log("📋   + " + choice + " (from subrace features)");
            }
        });

        console.log("📋 getSubraceAdditionalChoices TOTAL:", choices);
        return choices;
    }

    /**
     * Extract all choice categories from a class
     */
    getClassAdditionalChoices(classData: ClassData | null): string[] {
        if (!classData) {
            console.log("📋 getClassAdditionalChoices: NO CLASS");
            return [];
        }

        const choices: string[] = [];

        if (classData.skillChoices && classData.skillChoices > 0) {
            choices.push("skill");
            console.log("📋   + skill (count:", classData.skillChoices + ")");
        }

        if (classData.toolChoices && classData.toolChoices > 0) {
            choices.push("tool");
            console.log("📋   + tool (count:", classData.toolChoices + ")");
        }

        if (classData.classFeatures && classData.classFeatures.length > 0) {
            const level1Features = classData.classFeatures
                .filter(f => f.level === 1)
                .map(f => f.name);
            console.log("📋   Level 1 features:", level1Features);

            const classFeatureChoices = this.extractChoiceCategories(level1Features);
            classFeatureChoices.forEach(choice => {
                if (!choices.includes(choice)) {
                    choices.push(choice);
                    console.log("📋   + " + choice + " (from class features)");
                }
            });
        }

        console.log("📋 getClassAdditionalChoices TOTAL:", choices);
        return choices;
    }

    /**
     * Extract all choice categories from a subclass
     */
    getSubclassAdditionalChoices(subclass: Subclass | null): string[] {
        if (!subclass) {
            console.log("📋 getSubclassAdditionalChoices: NO SUBCLASS");
            return [];
        }

        const choices = this.extractChoiceCategories(
            subclass.features.map(f => f.name)
        );

        console.log("📋 getSubclassAdditionalChoices:", choices);
        return choices;
    }

    /**
     * Merge multiple choice arrays, avoiding duplicates
     */
    mergeAdditionalChoices(...choiceArrays: string[][]): string[] {
        const merged: string[] = [];
        choiceArrays.forEach(choices => {
            choices.forEach(choice => {
                if (!merged.includes(choice)) {
                    merged.push(choice);
                }
            });
        });
        console.log("📋 mergeAdditionalChoices MERGED:", merged);
        return merged;
    }

    // ============================================
    // SECTION 3: STEP BUILDING HELPERS
    // ============================================

    /**
     * Build the Subrace step if applicable
     */
    buildSubraceStep(race: RaceData): Step | null {
        if (!this.hasRaceSubraces(race)) {
            console.log("📍 buildSubraceStep: SKIPPED (no subraces)");
            return null;
        }

        console.log("📍 buildSubraceStep: ADDED");
        return {
            name: "Subrace",
            header: "Select a Sub-Race",
            subheader: "Select a subrace to customize your character further.",
            side: race.subraces!.map(subrace => subrace.name as string),
            confirm: "Select subrace"
        };
    }

    /**
     * Build the Subclass step if applicable
     */
    buildSubclassStep(classData: ClassData): Step | null {
        if (!this.hasClassSubclasses(classData)) {
            console.log("📍 buildSubclassStep: SKIPPED (no subclasses or subclassLevel !== 1)");
            return null;
        }

        console.log("📍 buildSubclassStep: ADDED");
        return {
            name: "Subclass",
            header: "Select a Subclass",
            subheader: "Choose a Subclass for your character. Each subclass specializes in different aspects and may change your playstyle.",
            side: Object.keys(classData.subclasses),
            confirm: "Select a Subclass"
        };
    }

    /**
     * Build the AdditionalChanges step if there are choices
     */
    buildAdditionalChoicesStep(
        race: RaceData | null,
        subrace: SubraceData | null,
        classData: ClassData | null,
        subclass: Subclass | null
    ): Step | null {
        const choiceArrays: string[][] = [];

        if (race) choiceArrays.push(this.getRaceAdditionalChoices(race));
        if (subrace) choiceArrays.push(this.getSubraceAdditionalChoices(subrace));
        if (classData) choiceArrays.push(this.getClassAdditionalChoices(classData));
        if (subclass) choiceArrays.push(this.getSubclassAdditionalChoices(subclass));

        const allChoices = this.mergeAdditionalChoices(...choiceArrays);

        if (allChoices.length === 0) {
            console.log("📍 buildAdditionalChoicesStep: SKIPPED (no choices available)");
            return null;
        }

        console.log("📍 buildAdditionalChoicesStep: ADDED with choices:", allChoices);
        return {
            name: "AdditionalChanges",
            header: "Select additional choices and features",
            subheader: "Select additional choices and features for your character.",
            side: allChoices,
            confirm: "Confirm choices"
        };
    }

    // ============================================
    // SECTION 4: MAIN STEPSDATA DERIVED (using $derived)
    // ============================================

    /**
     * ✨ Reactive derived state that auto-updates when tempChoices changes
     */
    stepsData: Step[] = $derived.by(() => {
        console.log("🔄 STEPSDATA RECALCULATING...", {
            Race: this.tempChoices.Race,
            Class: this.tempChoices.Class,
            Subrace: this.tempChoices.Subrace,
            Subclass: this.tempChoices.Subclass
        });

        const stepsArray: Step[] = [
            {
                name: "Race",
                header: "Select a Race",
                subheader: "Choose a race for your character. Each race grants different ability score increases, features, and languages.",
                side: this.raceList.map((race) => race.name as string),
                confirm: "Select race"
            },
        ];

        // EARLY RETURN: No race selected
        const confirmedRace = this.getConfirmedRace();
        if (!confirmedRace) {
            console.log("🔄 STEPSDATA RESULT: Only Race step (no race selected)");
            return stepsArray;
        }

        // ADD SUBRACE STEP (if applicable)
        const subraceStep = this.buildSubraceStep(confirmedRace);
        if (subraceStep) stepsArray.push(subraceStep);

        // ADD CLASS STEP (always after race)
        stepsArray.push({
            name: "Class",
            header: "Select a Class",
            subheader: "Choose a class for your character. Each class determines your abilities, proficiencies, and combat style.",
            side: Object.keys(this.classesData),
            confirm: "Select a Class"
        });

        // GET CLASS & SUBCLASS DATA
        const confirmedClass = this.getConfirmedClass();
        const confirmedSubrace = this.getConfirmedSubrace(confirmedRace);
        const confirmedSubclass = confirmedClass ? this.getConfirmedSubclass(confirmedClass) : null;

        // ADD SUBCLASS STEP (if applicable)
        if (confirmedClass) {
            const subclassStep = this.buildSubclassStep(confirmedClass);
            if (subclassStep) stepsArray.push(subclassStep);
        }

        // ADD ADDITIONAL CHOICES STEP (if applicable)
        const additionalChoicesStep = this.buildAdditionalChoicesStep(
            confirmedRace,
            confirmedSubrace,
            confirmedClass,
            confirmedSubclass
        );
        if (additionalChoicesStep) {
            stepsArray.push(additionalChoicesStep);
        }

        console.log("🔄 STEPSDATA RESULT:", stepsArray.map(s => s.name));
        return stepsArray;
    });

    // ============================================
    // UTILITY METHODS
    // ============================================

    /**
     * Reset all state to defaults
     */
    reset() {
        this.tempChoices = {
            Race: "Default",
            Subrace: "",
            Subclass: "",
            AdditionalChanges: "",
            Class: ""
        };
        this.additionalChoicesRaceSubState = {
            Languages: [],
            Proficiency: [],
            Feat: []
        };
        console.log("♻️  CharacterCreationManager reset");
    }

    /**
     * Clear dependent choices when a parent choice changes
     */
    clearDependentChoices(changedField: string) {
        switch (changedField) {
            case "Race":
                this.tempChoices.Subrace = "";
                this.tempChoices.Class = "";
                this.tempChoices.Subclass = "";
                this.additionalChoicesRaceSubState = { Languages: [], Proficiency: [], Feat: [] };
                break;
            case "Subrace":
                this.tempChoices.Class = "";
                this.tempChoices.Subclass = "";
                this.additionalChoicesRaceSubState = { Languages: [], Proficiency: [], Feat: [] };
                break;
            case "Class":
                this.tempChoices.Subclass = "";
                this.additionalChoicesRaceSubState = { Languages: [], Proficiency: [], Feat: [] };
                break;
        }
        console.log(`🔄 Cleared dependent choices for ${changedField}`);
    }

    /**
     * Sync character selection state from completed step
     */
    syncFromSelectionState(updates: Partial<{ race: CharacterRace; subrace: string | null; class: ClassName; subclass: string | null; languages: string[]; proficiencies: string[]; feats: string[] }>) {
        if (updates.race !== undefined) this.tempChoices.Race = updates.race;
        if (updates.subrace !== undefined) this.tempChoices.Subrace = updates.subrace || "";
        if (updates.class !== undefined) this.tempChoices.Class = updates.class;
        if (updates.subclass !== undefined) this.tempChoices.Subclass = updates.subclass || "";
        if (updates.languages !== undefined) this.additionalChoicesRaceSubState.Languages = updates.languages;
        if (updates.proficiencies !== undefined) this.additionalChoicesRaceSubState.Proficiency = updates.proficiencies;
        if (updates.feats !== undefined) this.additionalChoicesRaceSubState.Feat = updates.feats;
        console.log("✅ Synced character state:", updates);
    }
}
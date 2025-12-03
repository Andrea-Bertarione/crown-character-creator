import { v4 as uuidv4 } from "uuid";
import {LocalStore} from "$lib/localStore.svelte";
import { type CharacterRace } from "../data/races.data";

export type CharacterClassType = "Fighter" | "Wizard" | "Rogue" | "Monk" | "Cleric" | "Paladin" | "Druid" | "Bard" | "Barbarian" | "Sorcerer" | "Ranger" | "Warlock" | "Artificer";
export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type CharacterSize = "Small" | "Medium" | "Large" | "Huge";
export type CharacterLanguage = "Common" | "Elvish" | "Giant" | "Gnomish" | "Abyssal" | "Celestial" | "Draconic" | "Deep Speech" | "Halfling" | "Primordial" | "Sylvan" | "Undercommon" | "Orc" | "Dwarvish" | "Goblin" | "Infernal";
export type DiceTypes = "d4" | "d6" | "d8" | "d10" | "d12" | "d20";
export type ComponentsTypes = "V" | "S" | "M";
export type AbilityScore = "str" | "dex" | "con" | "int" | "wis" | "cha";

export interface CharacterStats {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}

export interface Spell {
    name: string;
    description: string;
    level: number;
    castingTime: string;
    range: number;
    components: ComponentsTypes[];
    duration: string;
}

export interface CharacterClass {
    name: CharacterClassType;
    spells: Spell[];
    features: string[];
    hpDice: DiceTypes;
}

export class Race {
    name: CharacterRace = "Human";
    fixedModifiers: CharacterStats = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
    choiceModifiers: number[] = [1, 1];
    features: string[] = [];
    size: CharacterSize = "Medium";
    speed: number = 9; //meters per turn
    languages: CharacterLanguage[] = [];
    languageChoices: number = 0;
    image: string = '';

    constructor(name: CharacterRace = "Human", modifiers: CharacterStats = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 }, choiceModifiers: number[], features: string[] = [], size: CharacterSize = "Medium", speed: number = 9, languages: CharacterLanguage[] = [], languageChoices: number = 0, image: string = '') {
        this.name = name;
        this.fixedModifiers = modifiers;
        this.choiceModifiers = choiceModifiers;
        this.features = features;
        this.size = size;
        this.speed = speed;
        this.languages = languages;
        this.languageChoices = languageChoices;
        this.image = image;
    }
}

export class Character {
    id: string = uuidv4();
    name: string = '';
    avatar: string = '';
    description: string = '';
    status: CharacterStatus = "unknown";
    class: CharacterClass = { name: "Fighter", spells: [], features: [], hpDice: "d8"};
    race: Race = new Race("Default", { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 }, [1, 1], [], "Medium", 9, [], 0, '');
    proficencyBonus: number = 2;
    background: string = '';
    alignment: string = '';
    features: String[] = [];
    proficencies: string[] = [];
    saveProficencies: string[] = [];
    expertises: string[] = [];
    featureChoices?: Record<string, {type: string, value: string[]}>;
    chosenAbilityModifiers?: string[];
    level: number = 1;
    stats: CharacterStats = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    xp: number = 0;
    hp: number = 1;
    hitDice: number = 1;
    spells: Spell[] = []; //all the spells the character knows, including spells learned from classes and feats
    activeSpells: Spell[] = [];
    pendingSpellChoices: { amount: number, spellList: Spell[] }[] = [];
    spellSlots: { [key: number]: number } = {}; // key is the level and number is the amount (total spell slots)
    spellSlotsRemaining: { [key: number]: number } = {};
    mainHand: string = '';
    offHand: string = '';
    equipment = {
        head: '',
        neck: '',
        shoulders: '',
        back: '',
        chest: '',
        hands: '',
        waist: '',
        legs: '',
        feet: '',
    }
    inventory: string[] = [];
    allLanguages: CharacterLanguage[] = [];
    choosenLanguages: string[] = [];
}

export const languageList: CharacterLanguage[] = [
    "Common", "Elvish", "Giant", "Gnomish", "Abyssal", "Celestial", "Draconic", "Deep Speech", "Halfling", "Primordial", "Sylvan", "Undercommon", "Orc", "Dwarvish", "Goblin", "Infernal"
];

export const abilityScores: AbilityScore[] = ["str", "dex", "con", "int", "wis", "cha"]

// Skills only
export const skillList = [
    "Acrobatics",
    "Animal Handling",
    "Arcana",
    "Athletics",
    "Deception",
    "History",
    "Insight",
    "Intimidation",
    "Investigation",
    "Medicine",
    "Nature",
    "Perception",
    "Performance",
    "Persuasion",
    "Religion",
    "Sleight of Hand",
    "Stealth",
    "Survival",
] as const;

// Saving Throws
export const savingThrowList = [
    "Strength Save",
    "Dexterity Save",
    "Constitution Save",
    "Intelligence Save",
    "Wisdom Save",
    "Charisma Save",
] as const;

// Armor
export const armorProficiencyList = [
    "Light Armor",
    "Medium Armor",
    "Heavy Armor",
    "Shields",
] as const;

// Weapons
export const weaponProficiencyList = [
    "Simple Melee Weapons",
    "Simple Ranged Weapons",
    "Martial Melee Weapons",
    "Martial Ranged Weapons",
] as const;

// Tools
export const toolProficiencyList = [
    "Artisan's Tools",
    "Gaming Set",
    "Musical Instrument",
    "Thieves' Tools",
    "Tinker's Tools",
] as const;

// All proficiencies combined
export const proficiencyList = [
    ...skillList,
    ...savingThrowList,
    ...armorProficiencyList,
    ...weaponProficiencyList,
    ...toolProficiencyList,
] as const;

export type Proficiency = typeof proficiencyList[number];
export type Skill = typeof skillList[number];
export type SavingThrow = typeof savingThrowList[number];
export type ArmorProficiency = typeof armorProficiencyList[number];
export type WeaponProficiency = typeof weaponProficiencyList[number];
export type ToolProficiency = typeof toolProficiencyList[number];


export const charactersState = new LocalStore<Map<String, Character>>(
    "charactersCache",
    new Map<String, Character>()
);
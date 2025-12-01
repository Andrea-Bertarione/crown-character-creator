import { v4 as uuidv4 } from "uuid";
import {LocalStore, localStore} from "$lib/localStore.svelte";

export type CharacterClassType = "Fighter" | "Wizard" | "Rogue" | "Monk" | "Cleric" | "Paladin" | "Druid" | "Bard" | "Barbarian" | "Sorcerer" | "Ranger" | "Warlock" | "Artificer";
export type CharacterRace = "Human" | "Elf" | "Dwarf" | "Halfling" | "Dragonborn" | "Gnome" | "Half-Elf" | "Half-Orc" | "Tiefling";
export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type DiceTypes = "d4" | "d6" | "d8" | "d10" | "d12" | "d20";
export type ComponentsTypes = "V" | "S" | "M";

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

export class Character {
    id: string = uuidv4();
    name: string = '';
    avatar: string = '';
    description: string = '';
    status: CharacterStatus = "unknown";
    class: CharacterClass = { name: "Fighter", spells: [], features: [], hpDice: "d8"};
    race: CharacterRace = "Human";
    level: number = 1;
    stats: CharacterStats = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    xp: number = 0;
    hp: number = 1;
    hitDice: number = 1;
    classFeatures: string[] = [];
    raceFeatures: string[] = [];
    spells: Spell[] = [];
    inventory: string[] = [];
}

export let charactersState: LocalStore<Character[]>;

export function initCharactersState() {
    charactersState = localStore("charactersCache", new Array<Character>());
}
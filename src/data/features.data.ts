import { Character, skillList, savingThrowList, armorProficiencyList, weaponProficiencyList, toolProficiencyList, type Spell } from "../State/characters.state";

export const featureList: {
    [key: string]: {
        description: string;
        choice?: {
            type: string;
            availableList: readonly string[];
            amount: number;
        };
        action: (character: Character) => void;
    };
} = {
    // ===== RACIAL FEATURES =====
    "Darkvision": {
        description: "Can see in dim light within 18 meters as if it were bright light, and in darkness as if it were dim light.",
        action: () => {}
    },

    "Keen Senses": {
        description: "Proficiency in the Perception skill.",
        action: (character: Character) => {
            if (!character.proficiencies.skills.includes("Perception")) {
                character.proficiencies.skills.push("Perception");
            }
            else {
                console.warn("Couldn't add 'Perception Proficiency' to character's skills. ")
            }
        }
    },

    "Fey Ancestry": {
        description: "Immune to being put to sleep by magic. Cannot be charmed.",
        action: () => {}
    },

    "Trance": {
        description: "Don't need to sleep. Meditate 4 hours instead of sleeping.",
        action: () => {}
    },

    "Dwarven Resilience": {
        description: "Advantage on saving throws against poison. Resistance to poison damage.",
        action: () => {}
    },

    "Dwarven Combat Training": {
        description: "Proficiency with battleaxe, handaxe, light hammer, and warhammer.",
        action: (character: Character) => {
            const weapons = ["Battleaxe", "Handaxe", "Light Hammer", "Warhammer"];
            weapons.forEach(w => {
                if (!character.inventory.includes(w)) {
                    character.inventory.push(w);
                }
            });
        }
    },

    "Stonecunning": {
        description: "Whenever you make an Intelligence (History) check related to stonework, you are considered proficient and add double your proficiency bonus.",
        action: () => {}
    },

    "Lucky": {
        description: "When you roll a 1 on a d20 for an attack roll, ability check, or saving throw, you can reroll the die.",
        action: () => {}
    },

    "Brave": {
        description: "Advantage on saving throws against being frightened.",
        action: () => {}
    },

    "Halfling Nimbleness": {
        description: "You can move through the space of any creature that is of a size larger than yours.",
        action: () => {}
    },

    "Draconic Ancestry": {
        description: "You have draconic heritage. Choose one type of dragon; gain resistance to the damage type associated with it.",
        action: () => {}
    },

    "Breath Weapon": {
        description: "You can use your action to exhale destructive energy. Damage is 2d6 at level 1, increases at higher levels (6m cone).",
        action: () => {}
    },

    "Damage Resistance": {
        description: "Resistance to the damage type of your draconic ancestry.",
        action: () => {}
    },

    "Gnome Cunning": {
        description: "Advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.",
        action: () => {}
    },

    "Skill Versatility": {
        description: "Gain proficiency in two skills of your choice.",
        choice: {
            type: "skill",
            availableList: skillList.map(v => v),
            amount: 2
        },
        action: () => {}
    },

    "Menacing": {
        description: "Proficiency in Intimidation skill.",
        action: (character: Character) => {
            if (!character.proficiencies.skills.includes("Intimidation")) {
                character.proficiencies.skills.push("Intimidation");
            }
        }
    },

    "Relentless Endurance": {
        description: "When you are reduced to 0 HP but not killed outright, you can drop to 1 HP instead. Cannot use again until you finish a long rest.",
        action: () => {}
    },

    "Hellish Resistance": {
        description: "Resistance to fire damage.",
        action: () => {}
    },

    "Infernal Legacy": {
        description: "You know the thaumaturgy cantrip. At 3rd level, cast hellish rebuke once per day. At 5th level, cast darkness once per day.",
        action: (character: Character) => {
            const thaumaturgy: Spell = {
                name: "Thaumaturgy",
                description: "You manifest a minor wonder, a sign of supernatural power, within 9 meters of you.",
                level: 0,
                castingTime: "1 action",
                range: 9,
                components: ["V"],
                duration: "1 minute"
            };
            if (!character.spells.some(s => s.name === "Thaumaturgy")) {
                character.spells.push(thaumaturgy);
            }

            if (character.level >= 3) {
                const hellishRebuke: Spell = {
                    name: "Hellish Rebuke",
                    description: "You point your finger, and the creature that damaged you is momentarily surrounded by hellish flames. The creature must make a Dexterity saving throw. 18m range.",
                    level: 1,
                    castingTime: "1 reaction",
                    range: 18,
                    components: ["V", "S"],
                    duration: "Instantaneous"
                };
                if (!character.spells.some(s => s.name === "Hellish Rebuke")) {
                    character.spells.push(hellishRebuke);
                }
            }

            if (character.level >= 5) {
                const darkness: Spell = {
                    name: "Darkness",
                    description: "Magical darkness spreads from a point of your choice within 18m range. Creates a 4.5m radius sphere.",
                    level: 2,
                    castingTime: "1 action",
                    range: 18,
                    components: ["V", "M"],
                    duration: "Concentration, up to 10 minutes"
                };
                if (!character.spells.some(s => s.name === "Darkness")) {
                    character.spells.push(darkness);
                }
            }
        }
    },

    "Extra Ability Score Increase": {
        description: "Humans gain an additional ability score increase of +1.",
        action: () => {}
    },

    "Extra Feat": {
        description: "Humans gain an extra feat at 1st level.",
        action: () => {}
    },

    // ===== CLASS FEATURES - FIGHTER =====
    "Fighting Style": {
        description: "Choose a fighting style such as Archery, Defense, Dueling, Great Weapon Fighting, or Two-Weapon Fighting.",
        action: () => {}
    },

    "Second Wind": {
        description: "Use a bonus action to regain 1d10 + fighter level in HP. Can use once per short rest.",
        action: () => {}
    },

    "Action Surge": {
        description: "Take an additional action on your turn. Can use once per short rest.",
        action: () => {}
    },

    "Extra Attack - Fighter": {
        description: "Beginning at 5th level, you can attack twice. At 11th level, three times. At 20th level, four times.",
        action: () => {}
    },

    "Indomitable": {
        description: "Beginning at 9th level, reroll a saving throw you fail. Can use once per long rest.",
        action: () => {}
    },

    // ===== CLASS FEATURES - WIZARD =====
    "Spellcasting": {
        description: "You have learned to cast wizard spells. See the spell list for available spells.",
        action: () => {}
    },

    "Arcane Recovery": {
        description: "Once per day when you finish a short rest, recover spell slots totaling spell level up to your wizard level.",
        action: () => {}
    },

    "Arcane Tradition": {
        description: "Choose a wizard tradition (Abjuration, Conjuration, Divination, Enchantment, Evocation, Illusion, Necromancy, or Transmutation).",
        action: () => {}
    },

    // ===== CLASS FEATURES - ROGUE =====
    "Expertise": {
        description: "Choose two of your skill proficiencies. Add double your proficiency bonus to checks with those skills.",
        choice: {
            type: "expertise",
            availableList: skillList,
            amount: 2
        },
        action: () => {}
    },

    "Sneak Attack": {
        description: "Once per turn, deal extra damage when you have advantage or an ally adjacent to target. 1d6 at level 1, increases with level.",
        action: () => {}
    },

    "Cunning Action": {
        description: "On each of your turns in combat, you can use a bonus action to take the Dash, Disengage, or Hide action.",
        action: () => {}
    },

    "Uncanny Dodge": {
        description: "Beginning at 5th level, when an attacker you can see hits you with an attack, you can use your reaction to halve the damage.",
        action: () => {}
    },

    // ===== CLASS FEATURES - CLERIC =====
    "Channel Divinity": {
        description: "Channel divine energy to fuel magical effects. Available options depend on your domain.",
        action: () => {}
    },

    "Divine Domain": {
        description: "Choose a domain at 1st level, granting you domain spells and other features.",
        action: () => {}
    },

    // ===== CLASS FEATURES - BARBARIAN =====
    "Rage": {
        description: "As a bonus action, enter a rage for 10 minutes. Gain damage resistance and bonus damage to melee attacks.",
        action: () => {}
    },

    "Unarmored Defense": {
        description: "When not wearing armor, your AC = 10 + Dex modifier + Con modifier.",
        action: () => {}
    },

    "Reckless Attack": {
        description: "Beginning at 2nd level, attack with advantage but attacks against you have advantage until your next turn.",
        action: () => {}
    },

    "Extra Attack - Barbarian": {
        description: "Beginning at 5th level, you can attack twice.",
        action: () => {}
    },

    // ===== BACKGROUND FEATURES =====
    "Criminal Contact": {
        description: "You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals.",
        action: () => {}
    },

    "Feature: Acolyte": {
        description: "You command the respect of those who share your faith. You can perform religious ceremonies and have access to religious community.",
        action: () => {}
    },

    "Soldier": {
        description: "You have military rank from your service. You gain a military rank insignia and have authority within military hierarchy.",
        action: () => {}
    },

    // ===== FEATS =====
    "Alert": {
        description: "+5 bonus to initiative. You can't be surprised while conscious. Other creatures don't gain advantage on attack rolls against you as a result of being hidden from you.",
        action: () => {}
    },

    "Polearm Master": {
        description: "When you take the Attack action with a polearm, you can use a bonus action to make a melee attack with the opposite end.",
        action: () => {}
    },

    "Great Weapon Master": {
        description: "When you score a critical hit with a melee weapon, you can roll extra weapon damage. Also can take -5 penalty to hit for +10 damage.",
        action: () => {}
    },

    "Sharpshooter": {
        description: "Ignore half and three-quarters cover. Attacking at long range doesn't impose disadvantage. Can take -5 penalty to hit for +10 damage.",
        action: () => {}
    },

    "Defensive Duelist": {
        description: "When wielding a finesse weapon and you're not wearing heavy armor, add your Charisma modifier to your AC.",
        action: () => {}
    },

    "Weapon Master": {
        description: "Gain proficiency with four martial melee weapons of your choice.",
        choice: {
            type: "weapon",
            availableList: weaponProficiencyList,
            amount: 4
        },
        action: () => {}
    },

    "Resilient": {
        description: "Gain proficiency in a saving throw of your choice.",
        choice: {
            type: "saving throw",
            availableList: savingThrowList,
            amount: 1
        },
        action: () => {}
    },

    "Tool Proficiency": {
        description: "Gain proficiency with a set of tools of your choice.",
        choice: {
            type: "tool",
            availableList: toolProficiencyList,
            amount: 2
        },
        action: () => {}
    },
};

export default featureList;

export type CharacterRace = "Default" | "Human" | "Elf" | "Dwarf" | "Halfling" | "Dragonborn" | "Gnome" | "Half-Elf" | "Half-Orc" | "Tiefling" | "Aasimar" | "Bugbear" | "Goliath" | "Orc" | "Warforged";
import type { CharacterSize, CharacterLanguage, AbilityScore} from "$lib/characterCreation.svelte";

export interface SubraceData {
    name: string;
    fixedModifiers: Partial<Record<AbilityScore, number>>;
    choiceModifiers?: number[];
    features: string[];
    languages?: CharacterLanguage[];
    languageChoices?: number;
    description?: string;
}

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
    description?: string;
    subraces?: SubraceData[];
}

export const raceList: RaceData[] = [
    {
        name: "Human",
        fixedModifiers: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 },
        choiceModifiers: [],
        features: [],
        size: "Medium",
        speed: 9,
        languages: ["Common"],
        languageChoices: 1,
        image: "https://www.dndbeyond.com/avatars/thumbnails/43940/545/340/340/638607451217645102.png",
        description: "Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.",
        subraces: [
            {
                name: "Standard Human",
                fixedModifiers: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
                features: [],
                description: "Standard humans gain a +1 bonus to all ability scores and an additional language, reflecting their natural adaptability and broad talents."
            },
            {
                name: "Variant Human",
                fixedModifiers: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 },
                choiceModifiers: [2],
                features: ["Feat at 1st Level"],
                description: "Variant humans forgo the universal ability boost to gain a feat of their choice and an extra language, allowing for greater specialization from the start."
            }
        ]
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
        image: "https://www.dndbeyond.com/avatars/thumbnails/43940/469/340/340/638607449397487719.png",
        description: "Elves are a magical people of otherworldly grace, living in the world but not entirely part of it. They live in places of ethereal beauty, in the midst of ancient forests or in silvery spires glowing with blue and white light.",
        subraces: [
            {
                name: "High Elf",
                fixedModifiers: { intelligence: 1 },
                features: ["Elf Weapon Training", "Cantrip", "Extra Language"],
                languages: [],
                languageChoices: 1,
                description: "As a high elf, you have a keen mind and a mastery of at least the basics of magic. In many of the worlds of D&D, there are two kinds of high elves. One type is haughty and reclusive, believing themselves to be superior to non-elves and even other elves."
            },
            {
                name: "Wood Elf",
                fixedModifiers: { wisdom: 1 },
                features: ["Elf Weapon Training", "Fleet of Foot", "Mask of the Wild"],
                description: "As a wood elf, you have keen senses and intuition, with excellent coordination and balance. Woodelves are more often on the move, patrolling the woods rather than remaining in one place for long."
            },
            {
                name: "Dark Elf (Drow)",
                fixedModifiers: { charisma: 1 },
                features: ["Superior Darkvision", "Sunlight Sensitivity", "Drow Magic"],
                description: "Drow, also known as dark elves, are primarily evil humanoid creatures that dwell deep in the Underdark with little love for those that dwell on the surface. They are known for their dark skin and white hair."
            }
        ]
    },
    {
        name: "Dwarf",
        fixedModifiers: { strength: 0, dexterity: 0, constitution: 2, intelligence: 0, wisdom: 0, charisma: 0 },
        choiceModifiers: [],
        features: ["Darkvision", "Dwarven Resilience", "Dwarven Combat Training", "Stonecunning"],
        size: "Medium",
        speed: 7.5,
        languages: ["Common", "Dwarvish"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/43940/451/340/340/638607448980217343.png",
        description: "Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal. Though they stand well under 5 feet tall, dwarves are so broad and compact that they can weigh as much as a human standing nearly two feet taller.",
        subraces: [
            {
                name: "Mountain Dwarf",
                fixedModifiers: { strength: 2 },
                features: ["Dwarven Armor Training"],
                description: "As a mountain dwarf, you're strong and hardy, accustomed to a difficult life in rocky terrain. You're probably on the tall side for a dwarf and tend toward lighter coloring."
            },
            {
                name: "Hill Dwarf",
                fixedModifiers: { wisdom: 1 },
                features: ["Dwarven Toughness"],
                description: "As a hill dwarf, you have keen intuition and remarkable resilience. Most hill dwarves are short, stocky, and tend to have darker coloring than their mountain dwelling cousins."
            }
        ]
    },
    {
        name: "Halfling",
        fixedModifiers: { strength: 0, dexterity: 2, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 },
        choiceModifiers: [],
        features: ["Lucky", "Brave", "Halfling Nimbleness"],
        size: "Small",
        speed: 7.5,
        languages: ["Common", "Halfling"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/43940/520/340/340/638607450551607741.png",
        description: "The diminutive halflings have earned a reputation as remarkable survivors, with an inborn knack for finding a way out of any disaster. Most halflings live in relative peace, tending their gardens and preparing for the next meal.",
        subraces: [
            {
                name: "Lightfoot Halfling",
                fixedModifiers: { charisma: 1 },
                features: ["Naturally Stealthy"],
                description: "As a Lightfoot halfling, you can easily hide from notice, even using other people as cover. Lightfoots are inclined to be affable and get along well with others of all races."
            },
            {
                name: "Stout Halfling",
                fixedModifiers: { constitution: 1 },
                features: ["Stout Resilience"],
                description: "As a Stout halfling, you are hardier than your Lightfoot cousins and have some resistance to poisons. Some say that Stouts have dwarven blood in them."
            }
        ]
    },
    {
        name: "Dragonborn",
        fixedModifiers: { strength: 2, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 1 },
        choiceModifiers: [],
        features: [],
        size: "Medium",
        speed: 9,
        languages: ["Common", "Draconic"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/43940/435/340/340/638607448651696917.png",
        description: "Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension. Shaped by draconic gods or the dragons themselves, dragonborn originally hatched from dragon eggs as a race designed to serve dragons.",
        subraces: [
            {
                name: "Black Dragon",
                fixedModifiers: { constitution: 1 },
                features: ["Lightning Breath", "Lightning Resistance"],
                description: "Your draconic ancestor is a black dragon, master of lightning. You inherit its affinity for electricity and resistance to lightning damage."
            },
            {
                name: "Blue Dragon",
                fixedModifiers: { constitution: 1 },
                features: ["Lightning Breath", "Lightning Resistance"],
                description: "Your draconic ancestor is a blue dragon, sovereign of lightning. You gain affinity with electrical power and immunity to paralysis."
            },
            {
                name: "Green Dragon",
                fixedModifiers: { intelligence: 1 },
                features: ["Poison Breath", "Poison Resistance"],
                description: "Your draconic ancestor is a green dragon, master of deception and poison. You inherit its cunning and resistance to poison."
            },
            {
                name: "Red Dragon",
                fixedModifiers: { constitution: 1 },
                features: ["Fire Breath", "Fire Resistance"],
                description: "Your draconic ancestor is a red dragon, the most powerful and prideful of dragons. You gain affinity with fire and resistance to fire damage."
            },
            {
                name: "White Dragon",
                fixedModifiers: { strength: 1 },
                features: ["Cold Breath", "Cold Resistance"],
                description: "Your draconic ancestor is a white dragon, the most bestial of dragons. You inherit its savage nature and resistance to cold damage."
            },
            {
                name: "Brass Dragon",
                fixedModifiers: { charisma: 1 },
                features: ["Fire Breath", "Fire Resistance"],
                description: "Your draconic ancestor is a brass dragon, friendliest of dragons and lover of conversation. You inherit its charm and affinity with fire."
            },
            {
                name: "Bronze Dragon",
                fixedModifiers: { wisdom: 1 },
                features: ["Lightning Breath", "Lightning Resistance"],
                description: "Your draconic ancestor is a bronze dragon, guardian of the coastlines. You gain its aquatic nature and resistance to lightning."
            },
            {
                name: "Copper Dragon",
                fixedModifiers: { intelligence: 1 },
                features: ["Acid Breath", "Acid Resistance"],
                description: "Your draconic ancestor is a copper dragon, trickster and lover of pranks. You inherit its wit and resistance to acid damage."
            },
            {
                name: "Gold Dragon",
                fixedModifiers: { charisma: 1 },
                features: ["Fire Breath", "Fire Resistance"],
                description: "Your draconic ancestor is a gold dragon, noblest of all dragons and paragon of virtue. You gain its majesty and affinity with fire."
            },
            {
                name: "Silver Dragon",
                fixedModifiers: { wisdom: 1 },
                features: ["Cold Breath", "Cold Resistance"],
                description: "Your draconic ancestor is a silver dragon, protector of humanoids. You inherit its noble nature and resistance to cold damage."
            },
            {
                name: "Amethyst Dragon",
                fixedModifiers: { intelligence: 1 },
                features: ["Lightning Breath", "Lightning Resistance"],
                description: "Your draconic ancestor is an amethyst dragon, dweller of the Astral Plane. You inherit its connection to the mind and resistance to lightning."
            },
            {
                name: "Crystal Dragon",
                fixedModifiers: { wisdom: 1 },
                features: ["Radiant Breath", "Radiant Resistance"],
                description: "Your draconic ancestor is a crystal dragon, embodiment of good and light. You gain its radiance and resistance to radiant damage."
            },
            {
                name: "Emerald Dragon",
                fixedModifiers: { intelligence: 1 },
                features: ["Psychic Breath", "Psychic Resistance"],
                description: "Your draconic ancestor is an emerald dragon, master of psionics. You inherit its mental powers and resistance to psychic damage."
            },
            {
                name: "Sapphire Dragon",
                fixedModifiers: { charisma: 1 },
                features: ["Lightning Breath", "Lightning Resistance"],
                description: "Your draconic ancestor is a sapphire dragon, lord of gems and jewels. You gain its pride and resistance to lightning damage."
            },
            {
                name: "Topaz Dragon",
                fixedModifiers: { constitution: 1 },
                features: ["Acid Breath", "Acid Resistance"],
                description: "Your draconic ancestor is a topaz dragon, desert dweller and fierce protector of its lair. You inherit its strength and resistance to acid damage."
            }
        ]
    },
    {
        name: "Gnome",
        fixedModifiers: { strength: 0, dexterity: 0, constitution: 0, intelligence: 2, wisdom: 0, charisma: 0 },
        choiceModifiers: [],
        features: ["Darkvision", "Gnome Cunning", "Gnome Ingenuity"],
        size: "Small",
        speed: 7.5,
        languages: ["Common", "Gnomish"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/43940/482/340/340/638607449736508079.png",
        description: "A gnome's energy and enthusiasm for living shines through every inch of his or her tiny body. Gnomes average slightly over 3 feet tall and weigh 40 to 45 pounds. Their tan or brown skin is as natural as the earth they love, and their hair is often a brighter hue.",
        subraces: [
            {
                name: "Forest Gnome",
                fixedModifiers: { dexterity: 1 },
                features: ["Small Illusion", "Speak with Small Beasts"],
                description: "As a forest gnome, you have a natural knack for illusion and inherent quickness and stealth. Most forest gnomes are shy, cautious, and reclusive."
            },
            {
                name: "Rock Gnome",
                fixedModifiers: { constitution: 1 },
                features: ["Tinker", "Proficiency with Artisan's Tools"],
                description: "As a rock gnome, you have a natural inventiveness and hardiness beyond that of other gnomes. Most gnomes in the worlds of D&D live underground in intricate burrow networks."
            }
        ]
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
        image: "https://www.dndbeyond.com/avatars/thumbnails/4808/241/340/340/636771215841402193.png",
        description: "Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents: the curiosity, ambition, and adaptability of humans with the refined senses, love of nature, and artistic tastes of the elves."
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
        image: "https://www.dndbeyond.com/avatars/thumbnails/4808/245/340/340/636771216332458941.png",
        description: "Half-orcs' grayish pigmentation, sloping foreheads, jutting jaws, prominent teeth, and towering builds make their orcish heritage plain for all to see. Half-orcs are medium-sized humanoids that tower above most other races but are shorter than orcs themselves."
    },
    {
        name: "Tiefling",
        fixedModifiers: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 2 },
        choiceModifiers: [],
        features: ["Darkvision", "Hellish Resistance"],
        size: "Medium",
        speed: 9,
        languages: ["Common", "Infernal"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/43940/586/340/340/638607451956352471.png",
        description: "To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling. And yet tieflings have not earned a reputation of evil.",
        subraces: [
            {
                name: "Bloodline of Asmodeus",
                fixedModifiers: { intelligence: 1 },
                features: ["Legacy of Nessus"],
                description: "The tieflings connected to Nessus command the power of fire and darkness, guided by a keener than normal intellect, as befits those linked to Asmodeus himself."
            },
            {
                name: "Bloodline of Baalzebul",
                fixedModifiers: { intelligence: 1 },
                features: ["Legacy of Maladomini"],
                description: "The crumbling realm of Maladomini is ruled by Baalzebul, who excels at corrupting those whose minor sins can be transformed into acts of damnation. Tieflings linked to this archdevil can corrupt others both physically and psychically."
            },
            {
                name: "Bloodline of Dispater",
                fixedModifiers: { dexterity: 1 },
                features: ["Legacy of Dis"],
                description: "The great city of Dis occupies most of Hell's second layer. It is a place where secrets are uncovered and shared with the highest bidder, making tieflings tied to Dispater excellent spies and infiltrators."
            },
            {
                name: "Bloodline of Fierna",
                fixedModifiers: { wisdom: 1 },
                features: ["Legacy of Phlegethos"],
                description: "A master manipulator, Fierna grants tieflings tied to her forceful personalities, allowing them to charm and influence those around them."
            },
            {
                name: "Bloodline of Glasya",
                fixedModifiers: { dexterity: 1 },
                features: ["Legacy of Malbolge"],
                description: "Glasya, Hell's criminal mastermind, grants her tieflings magic that is useful for committing heists and evading detection through stealth and deception."
            },
            {
                name: "Bloodline of Levistus",
                fixedModifiers: { constitution: 1 },
                features: ["Legacy of Stygia"],
                description: "Frozen Stygia is ruled by Levistus, an archdevil known for offering bargains to those who face an inescapable doom. His tieflings inherit ice-touched magic and bargaining prowess."
            },
            {
                name: "Bloodline of Mammon",
                fixedModifiers: { intelligence: 1 },
                features: ["Legacy of Minauros"],
                description: "The great miser Mammon loves coins above all else. Tieflings tied to him excel at gathering and safeguarding wealth through arcane means."
            },
            {
                name: "Bloodline of Mephistopheles",
                fixedModifiers: { intelligence: 1 },
                features: ["Legacy of Cania"],
                description: "In the frozen realm of Cania, Mephistopheles offers arcane power to those who entreat with him. Tieflings linked to him master some arcane magic and fiery combat spells."
            },
            {
                name: "Bloodline of Zariel",
                fixedModifiers: { strength: 1 },
                features: ["Legacy of Avernus"],
                description: "Tieflings with a blood tie to Zariel are stronger than the typical tiefling and receive magical abilities that aid them in battle against the forces of darkness."
            }
        ]
    },
    {
        name: "Aasimar",
        fixedModifiers: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 2 },
        choiceModifiers: [],
        features: ["Darkvision", "Celestial Resistance", "Healing Hands", "Light Bearer"],
        size: "Medium",
        speed: 9,
        languages: ["Common", "Celestial"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/43940/408/340/340/638607447895916115.png",
        description: "Aasimar are placed in the world to serve as guardians of law and good. Their patrons expect them to strike at evil, lead by example, and further the cause of justice. Aasimar are visibly touched by their celestial heritage, bearing semblances to their heavenly ancestors.",
        subraces: [
            {
                name: "Protector Aasimar",
                fixedModifiers: { wisdom: 1 },
                features: ["Radiant Soul"],
                description: "Protector aasimar are charged by their patrons to guard the weak, fight evil wherever it hides, and bring the light to dark places. They are the most virtuous and noble of aasimar."
            },
            {
                name: "Scourge Aasimar",
                fixedModifiers: { strength: 1 },
                features: ["Radiant Consumption"],
                description: "Scourge aasimar are aasimar with a burning desire to cleanse the world of evil. They are aggressive and quick to act, sometimes recklessly so."
            },
            {
                name: "Fallen Aasimar",
                fixedModifiers: { charisma: 1 },
                features: ["Necrotic Shroud"],
                description: "Fallen aasimar were once charged with a glorious purpose, but fell from grace. They have succumbed to darkness and now wield it as a weapon."
            }
        ]
    },
    {
        name: "Bugbear",
        fixedModifiers: { strength: 2, dexterity: 0, constitution: 1, intelligence: 0, wisdom: 0, charisma: 0 },
        choiceModifiers: [],
        features: ["Darkvision", "Long-Limbed", "Powerful Build", "Sneaky", "Surprise Attack"],
        size: "Medium",
        speed: 9,
        languages: ["Common", "Goblin"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/25746/814/340/340/637880558251875529.png",
        description: "Bugbears are the largest of the goblinoids and far more savage than their smaller cousins. They are feared for their strength and ferocity in battle, often lurking in dark places to ambush unsuspecting travelers."
    },
    {
        name: "Goliath",
        fixedModifiers: { strength: 2, dexterity: 0, constitution: 1, intelligence: 0, wisdom: 0, charisma: 0 },
        choiceModifiers: [],
        features: ["Stone's Endurance", "Powerful Build", "Mountain Born"],
        size: "Medium",
        speed: 9,
        languages: ["Common", "Giant"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/43940/490/340/340/638607450043098406.png",
        description: "Goliaths are tall, powerfully built giants that stand between 7 and 8 feet tall. They are competitive by nature and push themselves to be the best. Goliaths are driven by the thrill of competition and the chance to prove their prowess.",
        subraces: [
            {
                name: "Mountain Goliath",
                fixedModifiers: { constitution: 1 },
                features: ["Stone's Endurance"],
                description: "Mountain goliaths are accustomed to harsh, rocky terrain and have adapted to withstand the elements. They are stoic and resilient."
            },
            {
                name: "Cloudborn Goliath",
                fixedModifiers: { wisdom: 1 },
                features: ["Cloud Walk"],
                description: "Cloudborn goliaths are said to be touched by the spirits of the sky. They are more mystical and spiritual than their mountain cousins."
            }
        ]
    },
    {
        name: "Orc",
        fixedModifiers: { strength: 2, dexterity: 0, constitution: 1, intelligence: 0, wisdom: 0, charisma: 0 },
        choiceModifiers: [],
        features: ["Darkvision", "Aggressive", "Powerful Build", "Primal Intuition"],
        size: "Medium",
        speed: 9,
        languages: ["Common", "Orc"],
        languageChoices: 0,
        image: "https://www.dndbeyond.com/avatars/thumbnails/43940/567/340/340/638607451596983406.png",
        description: "Orcs are fierce warriors who live by a simple rule: a creature's worth is determined by its strength and prowess in battle. Orcs thrive in a world of constant conflict, and it is their nature to be hunters and warriors.",
        subraces: [
            {
                name: "Many-Arrows Orc",
                fixedModifiers: { intelligence: 1 },
                features: ["Aggressive", "Primal Intuition"],
                description: "Orcs of Many-Arrows are part of a large orcish nation and have adapted to a more structured society while maintaining their warrior traditions."
            },
            {
                name: "Gruumsh Orc",
                fixedModifiers: { strength: 1 },
                features: ["Aggressive", "Relentless"],
                description: "Orcs devoted to Gruumsh, god of war, are fierce warriors with an insatiable hunger for battle and conquest. They are the most fearsome of all orcs."
            }
        ]
    },
    {
        name: "Warforged",
        fixedModifiers: { strength: 0, dexterity: 0, constitution: 2, intelligence: 0, wisdom: 0, charisma: 0 },
        choiceModifiers: [1],
        features: ["Integrated Protection", "Specialized Design", "Constructed Resilience", "Sentry's Rest"],
        size: "Medium",
        speed: 9,
        languages: ["Common"],
        languageChoices: 1,
        image: "https://www.dndbeyond.com/avatars/thumbnails/52994/778/340/340/638996059022064405.png",
        description: "The warforged were built to fight in the Last War. The first warforged were mindless automatons, but House Cannith devoted vast resources to improving these steel soldiers. An unexpected breakthrough produced fully sentient soldiers, blending organic and inorganic materials. Warforged are made from wood and metal, but they can feel pain and emotion. Built as weapons, they must now find a purpose beyond the war. A warforged can be a steadfast ally, a cold-hearted killing machine, or a visionary in search of purpose and meaning.",
    }
];

export const racesData = Object.fromEntries(
    raceList.map(race => [race.name, race])
) as Record<CharacterRace, RaceData>;

export default racesData;

export function getLanguageChoicesCount(
    race: CharacterRace,
    subrace?: string | null
): number {
    const raceData = racesData[race];
    if (!raceData) return 0;

    let choicesCount = raceData.languageChoices;

    if (subrace && raceData.subraces) {
        const subraceData = raceData.subraces.find(s => s.name === subrace);
        if (subraceData && subraceData.languageChoices !== undefined) {
            choicesCount += subraceData.languageChoices;
        }
    }

    return choicesCount;
}

/**
 * Get all known languages for a race and subrace combination
 * @param race - The race name
 * @param subrace - The subrace name (optional)
 * @returns Array of known languages
 */
export function getKnownLanguages(
    race: CharacterRace,
    subrace?: string | null
): CharacterLanguage[] {
    const raceData = racesData[race];
    if (!raceData) return [];

    let languages = [...raceData.languages];

    if (subrace && raceData.subraces) {
        const subraceData = raceData.subraces.find(s => s.name === subrace);
        if (subraceData && subraceData.languages) {
            // Add subrace languages that aren't already in the list
            languages = [...new Set([...languages, ...subraceData.languages])];
        }
    }

    return languages;
}

/**
 * Get all racial features (traits) for a race and subrace combination
 * @param race - The race name
 * @param subrace - The subrace name (optional)
 * @returns Array of feature names
 */
export function getRacialFeatures(
    race: CharacterRace,
    subrace?: string | null
): string[] {
    const raceData = racesData[race];
    if (!raceData) return [];

    let features = [...raceData.features];

    if (subrace && raceData.subraces) {
        const subraceData = raceData.subraces.find(s => s.name === subrace);
        if (subraceData) {
            features = [...new Set([...features, ...subraceData.features])];
        }
    }

    return features;
}

/**
 * Get the base ability score modifiers for a race and subrace
 * @param race - The race name
 * @param subrace - The subrace name (optional)
 * @returns Object with ability score modifiers
 */
export function getAbilityModifiers(race: CharacterRace, subrace?: string | null) {
    const raceData = racesData[race];
    if (!raceData) {
        return {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };
    }

    const modifiers = { ...raceData.fixedModifiers };

    if (subrace && raceData.subraces) {
        const subraceData = raceData.subraces.find(s => s.name === subrace);
        if (subraceData && subraceData.fixedModifiers) {
            Object.entries(subraceData.fixedModifiers).forEach(([key, value]) => {
                modifiers[key as keyof typeof modifiers] += value;
            });
        }
    }

    return modifiers;
}

/**
 * Get choice modifiers (floating ability points) for a race and subrace
 * @param race - The race name
 * @param subrace - The subrace name (optional)
 * @returns Array of choice modifier values
 */
export function getChoiceModifiers(race: CharacterRace, subrace?: string | null): number[] {
    const raceData = racesData[race];
    if (!raceData) return [];

    let choiceModifiers = [...raceData.choiceModifiers];

    if (subrace && raceData.subraces) {
        const subraceData = raceData.subraces.find(s => s.name === subrace);
        if (subraceData && subraceData.choiceModifiers) {
            choiceModifiers = [...choiceModifiers, ...subraceData.choiceModifiers];
        }
    }

    return choiceModifiers;
}

/**
 * Get physical attributes (size, speed, darkvision distance) for a race and subrace
 * @param race - The race name
 * @param subrace - The subrace name (optional)
 * @returns Object with physical attributes
 */
export function getPhysicalAttributes(race: CharacterRace, subrace?: string | null) {
    const raceData = racesData[race];
    if (!raceData) {
        return {
            size: "Medium" as const,
            speed: 9,
            image: undefined
        };
    }

    return {
        size: raceData.size,
        speed: raceData.speed,
        image: raceData.image
    };
}

/**
 * Get comprehensive race information combining all data for a race and subrace
 * @param race - The race name
 * @param subrace - The subrace name (optional)
 * @returns Comprehensive race info object
 */
export function getRaceInfo(race: CharacterRace, subrace?: string | null) {
    const raceData = racesData[race];
    if (!raceData) return null;

    const subraceData = subrace && raceData.subraces
        ? raceData.subraces.find(s => s.name === subrace)
        : null;

    return {
        race: {
            name: raceData.name,
            description: raceData.description,
            image: raceData.image
        },
        subrace: subraceData ? {
            name: subraceData.name,
            description: subraceData.description
        } : null,
        abilities: {
            fixedModifiers: getAbilityModifiers(race, subrace),
            choiceModifiers: getChoiceModifiers(race, subrace)
        },
        languages: {
            known: getKnownLanguages(race, subrace),
            choicesCount: getLanguageChoicesCount(race, subrace)
        },
        features: getRacialFeatures(race, subrace),
        physical: getPhysicalAttributes(race, subrace)
    };
}

/**
 * Get all subraces for a given race
 * @param race - The race name
 * @returns Array of subrace names, or empty array if no subraces
 */
export function getSubraces(race: CharacterRace): string[] {
    const raceData = racesData[race];
    if (!raceData || !raceData.subraces) return [];
    return raceData.subraces.map(s => s.name);
}

/**
 * Check if a race has subraces
 * @param race - The race name
 * @returns Boolean indicating if race has subraces
 */
export function hasSubraces(race: CharacterRace): boolean {
    const raceData = racesData[race];
    return !!(raceData?.subraces && raceData.subraces.length > 0);
}

/**
 * Get the subrace description
 * @param race - The race name
 * @param subrace - The subrace name
 * @returns Subrace description or undefined
 */
export function getSubraceDescription(race: CharacterRace, subrace: string): string | undefined {
    const raceData = racesData[race];
    if (!raceData || !raceData.subraces) return undefined;
    return raceData.subraces.find(s => s.name === subrace)?.description;
}
export interface SpellData {
    name: string;
    level: number; // 0-9 (0 is cantrip)
    school: string; // Abjuration, Conjuration, Divination, Enchantment, Evocation, Illusion, Necromancy, Transmutation
    castingTime: string; // "1 action", "1 bonus action", "1 reaction", "1 minute", etc
    range: string; // "Self", "60 feet", "Touch", "Unlimited", etc
    duration: string; // "Instantaneous", "1 minute", "Concentration, up to 1 minute", etc
    components: string[]; // ["V", "S", "M"] - Verbal, Somatic, Material
    description: string;
    classes: string[]; // Which classes can learn this spell
}

export const spellsData: Record<string, SpellData> = {
    // ========== CANTRIPS (LEVEL 0) ==========
    "Acid Splash": {
        name: "Acid Splash",
        level: 0,
        school: "Conjuration",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "You hurl a bubble of acid. Choose one creature you can see within range, or choose two creatures you can see within range that are within 5 feet of each other.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Blade Ward": {
        name: "Blade Ward",
        level: 0,
        school: "Abjuration",
        castingTime: "1 action",
        range: "Self",
        duration: "1 round",
        components: ["V", "S"],
        description: "You extend your hand and trace a sigil of warding in the air. Until the end of your next turn, you have resistance against bludgeoning, piercing, and slashing damage dealt by weapon attacks.",
        classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
    },
    "Booming Blade": {
        name: "Booming Blade",
        level: 0,
        school: "Evocation",
        castingTime: "1 action",
        range: "Self (5-foot radius)",
        duration: "1 round",
        components: ["S", "M"],
        description: "As part of the action used to cast this spell, you must make a melee attack with a weapon against one creature within 5 feet of you.",
        classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
    },
    "Chill Touch": {
        name: "Chill Touch",
        level: 0,
        school: "Necromancy",
        castingTime: "1 action",
        range: "120 feet",
        duration: "1 round",
        components: ["V", "S"],
        description: "You create a ghostly, skeletal hand in the space of a creature within 5 feet of you. Make a ranged spell attack against the creature to assail it with the chill of the grave.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Control Flames": {
        name: "Control Flames",
        level: 0,
        school: "Transmutation",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Instantaneous or 1 hour",
        components: ["S"],
        description: "You choose nonmagical flame that you can see within range and that fits within a 5-foot cube. You affect it in one of the following ways.",
        classes: ["Druid", "Sorcerer", "Wizard"]
    },
    "Create Bonfire": {
        name: "Create Bonfire",
        level: 0,
        school: "Conjuration",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Concentration, up to 1 minute",
        components: ["V", "S"],
        description: "You create a bonfire on ground that you can see within range. Until the spell ends, the space is difficult terrain for your enemies.",
        classes: ["Bard", "Druid", "Sorcerer", "Wizard"]
    },
    "Dancing Lights": {
        name: "Dancing Lights",
        level: 0,
        school: "Evocation",
        castingTime: "1 action",
        range: "120 feet",
        duration: "Concentration, up to 1 minute",
        components: ["V", "S", "M"],
        description: "You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration.",
        classes: ["Bard", "Sorcerer", "Wizard"]
    },
    "Druidcraft": {
        name: "Druidcraft",
        level: 0,
        school: "Transmutation",
        castingTime: "1 action",
        range: "30 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "Whispering to the spirits of nature, you create one of the following effects within range.",
        classes: ["Druid"]
    },
    "Eldritch Blast": {
        name: "Eldritch Blast",
        level: 0,
        school: "Evocation",
        castingTime: "1 action",
        range: "120 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "A beam of crackling energy springs from your finger toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage.",
        classes: ["Warlock"]
    },
    "Encode Thoughts": {
        name: "Encode Thoughts",
        level: 0,
        school: "Enchantment",
        castingTime: "1 action",
        range: "Self",
        duration: "8 hours",
        components: ["S"],
        description: "For the spell's duration, you can use an action to encode your thoughts into a tiny crystalline structure that fits in the palm of your hand.",
        classes: ["Artificer", "Bard", "Wizard"]
    },
    "Fire Bolt": {
        name: "Fire Bolt",
        level: 0,
        school: "Evocation",
        castingTime: "1 action",
        range: "120 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "You hurl a mote of fire at a creature or object you can see within range. Make a ranged spell attack against the target.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Friends": {
        name: "Friends",
        level: 0,
        school: "Enchantment",
        castingTime: "1 action",
        range: "Self",
        duration: "Concentration, up to 1 minute",
        components: ["S", "M"],
        description: "For the duration, you have advantage on all Charisma checks directed at one creature of your choice that isn't hostile to you.",
        classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
    },
    "Frostbite": {
        name: "Frostbite",
        level: 0,
        school: "Evocation",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "You cause numbing frost to form on one creature that you can see within range. The creature must make a Constitution saving throw or take 1d6 cold damage.",
        classes: ["Artificer", "Sorcerer", "Wizard"]
    },
    "Green-Flame Blade": {
        name: "Green-Flame Blade",
        level: 0,
        school: "Evocation",
        castingTime: "1 action",
        range: "Self (5-foot radius)",
        duration: "Instantaneous",
        components: ["S", "M"],
        description: "As part of the action used to cast this spell, you must make a melee attack with a weapon against one creature within 5 feet of you.",
        classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
    },
    "Guidance": {
        name: "Guidance",
        level: 0,
        school: "Divination",
        castingTime: "1 action",
        range: "Touch",
        duration: "Concentration, up to 1 minute",
        components: ["V", "S"],
        description: "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice.",
        classes: ["Artificer", "Bard", "Cleric", "Druid"]
    },
    "Gust": {
        name: "Gust",
        level: 0,
        school: "Transmutation",
        castingTime: "1 action",
        range: "30 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "You seize the air and compel it to create a momentary gust. Each creature in a 5-foot cube originating from you must succeed on a Strength saving throw or take 5 force damage.",
        classes: ["Druid", "Sorcerer", "Wizard"]
    },
    "Hand of Radiance": {
        name: "Hand of Radiance",
        level: 0,
        school: "Evocation",
        castingTime: "1 action",
        range: "5 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "You point your hand at a creature you can see within range. A sudden flash of radiance springs from your hand.",
        classes: ["Cleric"]
    },
    "Infestation": {
        name: "Infestation",
        level: 0,
        school: "Conjuration",
        castingTime: "1 action",
        range: "30 feet",
        duration: "Instantaneous",
        components: ["V", "S", "M"],
        description: "You cause a cloud of mites, fleas, and other parasites to burst forth from you. Each creature in a 5-foot cube originating from you must succeed on a Constitution saving throw or take 1d4 poison damage.",
        classes: ["Artificer", "Druid", "Warlock", "Wizard"]
    },
    "Light": {
        name: "Light",
        level: 0,
        school: "Evocation",
        castingTime: "1 action",
        range: "Touch",
        duration: "1 hour",
        components: ["V", "M"],
        description: "You touch one object that is no larger than 10 feet in any dimension. The object sheds bright light in a 20-foot radius and dim light for an additional 20 feet.",
        classes: ["Artificer", "Bard", "Cleric", "Sorcerer", "Wizard"]
    },
    "Lightning Lure": {
        name: "Lightning Lure",
        level: 0,
        school: "Evocation",
        castingTime: "1 action",
        range: "Self (15-foot radius)",
        duration: "Instantaneous",
        components: ["V"],
        description: "You create a lash of lightning energy that springs from you to a creature of your choice that you can see within 15 feet of you.",
        classes: ["Artificer", "Sorcerer", "Wizard"]
    },
    "Mage Hand": {
        name: "Mage Hand",
        level: 0,
        school: "Conjuration",
        castingTime: "1 action",
        range: "30 feet",
        duration: "1 minute",
        components: ["V", "S"],
        description: "A spectral, floating hand appears at a point of your choice within 30 feet. The hand lasts for the duration or until you dismiss it as an action.",
        classes: ["Artificer", "Bard", "Sorcerer", "Wizard"]
    },
    "Magic Stone": {
        name: "Magic Stone",
        level: 0,
        school: "Transmutation",
        castingTime: "1 bonus action",
        range: "Touch",
        duration: "1 minute",
        components: ["V", "S"],
        description: "You touch one to three pebbles and imbue them with magic. You or someone else can make a ranged spell attack using one of the pebbles.",
        classes: ["Artificer", "Druid", "Warlock"]
    },
    "Mending": {
        name: "Mending",
        level: 0,
        school: "Transmutation",
        castingTime: "1 minute",
        range: "Touch",
        duration: "Instantaneous",
        components: ["V", "S", "M"],
        description: "This spell repairs a single break or tear in an object you touch, such as broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin.",
        classes: ["Artificer", "Bard", "Cleric", "Druid", "Sorcerer", "Wizard"]
    },
    "Message": {
        name: "Message",
        level: 0,
        school: "Transmutation",
        castingTime: "1 action",
        range: "120 feet",
        duration: "1 round",
        components: ["V", "S", "M"],
        description: "You point your finger toward a creature within range. Whispering a message, you speak in a quiet voice. Only the creature you point at can hear the message.",
        classes: ["Bard", "Sorcerer", "Wizard"]
    },
    "Mind Sliver": {
        name: "Mind Sliver",
        level: 0,
        school: "Enchantment",
        castingTime: "1 action",
        range: "60 feet",
        duration: "1 round",
        components: ["V"],
        description: "You target one creature you can see within range. As your spell pierces into its mind, the creature must make an Intelligence saving throw.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Minor Illusion": {
        name: "Minor Illusion",
        level: 0,
        school: "Illusion",
        castingTime: "1 action",
        range: "30 feet",
        duration: "1 minute",
        components: ["S", "M"],
        description: "You create a sound or an image of an object within range that lasts for the duration.",
        classes: ["Bard", "Sorcerer", "Wizard"]
    },
    "Mold Earth": {
        name: "Mold Earth",
        level: 0,
        school: "Transmutation",
        castingTime: "1 action",
        range: "30 feet",
        duration: "Instantaneous or 1 hour",
        components: ["S"],
        description: "You choose a portion of dirt or stone that you can see within range and that fits within a 5-foot cube.",
        classes: ["Artificer", "Druid", "Sorcerer", "Wizard"]
    },
    "Poison Spray": {
        name: "Poison Spray",
        level: 0,
        school: "Conjuration",
        castingTime: "1 action",
        range: "10 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "You extend your hand toward a creature you can see within range and project a puff of noxious gas.",
        classes: ["Artificer", "Sorcerer", "Wizard"]
    },
    "Prestidigitation": {
        name: "Prestidigitation",
        level: 0,
        school: "Transmutation",
        castingTime: "1 action",
        range: "10 feet",
        duration: "Up to 1 hour",
        components: ["V", "S"],
        description: "This spell is a minor magical trick that novice spellcasters often use for practice.",
        classes: ["Artificer", "Bard", "Sorcerer", "Wizard"]
    },
    "Primal Savagery": {
        name: "Primal Savagery",
        level: 0,
        school: "Transmutation",
        castingTime: "1 action",
        range: "Self",
        duration: "Instantaneous",
        components: ["S"],
        description: "You channel primal magic to cause your teeth or fingernails to sharpen, ready to deliver a corrosive attack.",
        classes: ["Druid"]
    },
    "Produce Flame": {
        name: "Produce Flame",
        level: 0,
        school: "Conjuration",
        castingTime: "1 action",
        range: "Self",
        duration: "10 minutes",
        components: ["V", "S"],
        description: "A flickering flame appears in your hand. The flame remains there for the duration and harms neither you nor your equipment.",
        classes: ["Druid"]
    },
    "Ray of Frost": {
        name: "Ray of Frost",
        level: 0,
        school: "Evocation",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "A thin icy beam springs from your pointing finger. Make a ranged spell attack against the target.",
        classes: ["Artificer", "Sorcerer", "Wizard"]
    },
    "Resistance": {
        name: "Resistance",
        level: 0,
        school: "Abjuration",
        castingTime: "1 action",
        range: "Touch",
        duration: "Concentration, up to 1 minute",
        components: ["V", "S", "M"],
        description: "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one saving throw of its choice.",
        classes: ["Artificer", "Cleric", "Druid"]
    },
    "Sacred Flame": {
        name: "Sacred Flame",
        level: 0,
        school: "Evocation",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "Flame-like radiance descends on a creature that you can see within range. The target must succeed on a Dexterity saving throw or take 1d8 radiant damage.",
        classes: ["Cleric"]
    },
    "Sapping Sting": {
        name: "Sapping Sting",
        level: 0,
        school: "Necromancy",
        castingTime: "1 action",
        range: "30 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "You sap the vitality of one creature you can see within range. The target must succeed on a Constitution saving throw or take 1d4 necrotic damage.",
        classes: ["Artificer", "Bard", "Cleric", "Druid", "Sorcerer", "Warlock", "Wizard"]
    },
    "Shape Water": {
        name: "Shape Water",
        level: 0,
        school: "Transmutation",
        castingTime: "1 action",
        range: "30 feet",
        duration: "Instantaneous or 1 hour",
        components: ["S"],
        description: "You choose an area of water that you can see within range and that fits within a 5-foot cube.",
        classes: ["Artificer", "Druid", "Sorcerer", "Wizard"]
    },
    "Shillelagh": {
        name: "Shillelagh",
        level: 0,
        school: "Transmutation",
        castingTime: "1 bonus action",
        range: "Touch",
        duration: "1 minute",
        components: ["V", "S", "M"],
        description: "The wood of a club or quarterstaff you are holding is imbued with nature's power.",
        classes: ["Druid"]
    },
    "Shocking Grasp": {
        name: "Shocking Grasp",
        level: 0,
        school: "Evocation",
        castingTime: "1 action",
        range: "Touch",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target.",
        classes: ["Artificer", "Sorcerer", "Wizard"]
    },
    "Spare the Dying": {
        name: "Spare the Dying",
        level: 0,
        school: "Necromancy",
        castingTime: "1 action",
        range: "Touch",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "You touch a living creature that has 0 hit points. The creature becomes stable. This spell has no effect on undead or constructs.",
        classes: ["Artificer", "Cleric"]
    },
    "Sword Burst": {
        name: "Sword Burst",
        level: 0,
        school: "Conjuration",
        castingTime: "1 action",
        range: "Self (5-foot radius)",
        duration: "Instantaneous",
        components: ["V"],
        description: "You create a momentary circle of spectral blades around you on your turn. Each creature in that area must succeed on a Dexterity saving throw or take 1d6 force damage.",
        classes: ["Artificer", "Sorcerer", "Warlock", "Wizard"]
    },
    "Thaumaturgy": {
        name: "Thaumaturgy",
        level: 0,
        school: "Transmutation",
        castingTime: "1 action",
        range: "30 feet",
        duration: "Up to 1 minute",
        components: ["V"],
        description: "You manifest a minor wonder, a sign of supernatural power, within range.",
        classes: ["Cleric"]
    },
    "Thorn Whip": {
        name: "Thorn Whip",
        level: 0,
        school: "Transmutation",
        castingTime: "1 action",
        range: "30 feet",
        duration: "Instantaneous",
        components: ["V", "S", "M"],
        description: "You create a long, vine-like whip covered in thorns that lashes out at your command toward a creature in range.",
        classes: ["Artificer", "Druid"]
    },
    "Thunderclap": {
        name: "Thunderclap",
        level: 0,
        school: "Evocation",
        castingTime: "1 action",
        range: "Self (5-foot radius)",
        duration: "Instantaneous",
        components: ["S"],
        description: "You create a burst of thunderous sound that can be heard up to 100 feet away. Each creature in a 5-foot cube originating from you must make a Constitution saving throw.",
        classes: ["Artificer", "Bard", "Sorcerer", "Wizard"]
    },
    "Toll the Dead": {
        name: "Toll the Dead",
        level: 0,
        school: "Necromancy",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "You point at one creature you can see within range. The creature must make a Wisdom saving throw. A target takes 1d8 necrotic damage on a failed save.",
        classes: ["Artificer", "Cleric", "Wizard"]
    },
    "True Strike": {
        name: "True Strike",
        level: 0,
        school: "Divination",
        castingTime: "1 action",
        range: "30 feet",
        duration: "Concentration, up to 1 round",
        components: ["S"],
        description: "Your magic guides you to strike with uncanny accuracy. On your next turn, you have advantage on your first attack roll against the target.",
        classes: ["Bard", "Sorcerer", "Warlock", "Wizard"]
    },
    "Vicious Mockery": {
        name: "Vicious Mockery",
        level: 0,
        school: "Enchantment",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Instantaneous",
        components: ["V"],
        description: "You unleash a string of insults laced with subtle enchantments at a creature you can see within range.",
        classes: ["Bard"]
    },
    "Word of Radiance": {
        name: "Word of Radiance",
        level: 0,
        school: "Evocation",
        castingTime: "1 action",
        range: "5 feet",
        duration: "Instantaneous",
        components: ["V", "M"],
        description: "You utter a divine word, and burning radiance erupts from you. Each creature of your choice that you can see within 5 feet of you must succeed on a Constitution saving throw or take 1d6 radiant damage.",
        classes: ["Cleric"]
    },

    // ========== LEVEL 1 SPELLS ==========
    "Absorb Elements": {
        name: "Absorb Elements",
        level: 1,
        school: "Abjuration",
        castingTime: "1 reaction",
        range: "Self",
        duration: "1 round",
        components: ["S"],
        description: "The spell captures some of the incoming energy, lessening its effect on you and storing it for your next melee attack.",
        classes: ["Artificer", "Druid", "Monk", "Ranger", "Sorcerer", "Wizard"]
    },
    "Alarm": {
        name: "Alarm",
        level: 1,
        school: "Abjuration",
        castingTime: "1 minute",
        range: "30 feet",
        duration: "8 hours",
        components: ["V", "S", "M"],
        description: "You set an alarm against unwanted intrusion. When you cast this spell, you can specify creatures that won't trigger the alarm.",
        classes: ["Artificer", "Bard", "Ranger", "Wizard"]
    },
    "Animal Friendship": {
        name: "Animal Friendship",
        level: 1,
        school: "Enchantment",
        castingTime: "1 action",
        range: "30 feet",
        duration: "24 hours",
        components: ["V", "S", "M"],
        description: "This spell lets you convince a beast that you mean it no harm. Choose a beast that you can see within range.",
        classes: ["Artificer", "Bard", "Cleric", "Druid", "Ranger"]
    },
    "Armor of Agathys": {
        name: "Armor of Agathys",
        level: 1,
        school: "Abjuration",
        castingTime: "1 action",
        range: "Self",
        duration: "1 hour",
        components: ["V", "S", "M"],
        description: "A protective magical force surrounds you, manifesting as a spectral frost that covers you and your gear.",
        classes: ["Warlock"]
    },
    "Arms of Hadar": {
        name: "Arms of Hadar",
        level: 1,
        school: "Conjuration",
        castingTime: "1 action",
        range: "Self (10-foot radius)",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "You invoke the power of Hadar, the Dark Hunger. Tendrils of dark energy spring from you and lash out at nearby creatures.",
        classes: ["Warlock"]
    },
    "Bane": {
        name: "Bane",
        level: 1,
        school: "Enchantment",
        castingTime: "1 action",
        range: "30 feet",
        duration: "Concentration, up to 1 minute",
        components: ["V", "S", "M"],
        description: "Up to three creatures of your choice that you can see within range must make Charisma saving throws.",
        classes: ["Bard", "Cleric"]
    },
    "Beast Bond": {
        name: "Beast Bond",
        level: 1,
        school: "Divination",
        castingTime: "1 action",
        range: "Touch",
        duration: "Concentration, up to 1 minute",
        components: ["V", "S", "M"],
        description: "You establish a telepathic link with one beast you touch that is friendly to you or charmed by you.",
        classes: ["Druid", "Ranger"]
    },
    "Bless": {
        name: "Bless",
        level: 1,
        school: "Enchantment",
        castingTime: "1 action",
        range: "30 feet",
        duration: "Concentration, up to 1 minute",
        components: ["V", "S", "M"],
        description: "You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4.",
        classes: ["Artificer", "Cleric", "Paladin"]
    },
    "Burning Hands": {
        name: "Burning Hands",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "Self (15-foot cone)",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "As you hold your hands with thumbs touching and fingers spread, a thin sheet of roaring flame springs from your hands.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Catapult": {
        name: "Catapult",
        level: 1,
        school: "Transmutation",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Instantaneous",
        components: ["S"],
        description: "Choose one object weighing 1 to 5 pounds within range that isn't being worn or carried. The object flies in a straight line up to 90 feet in a direction you choose.",
        classes: ["Artificer", "Sorcerer", "Wizard"]
    },
    "Cause Fear": {
        name: "Cause Fear",
        level: 1,
        school: "Necromancy",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Concentration, up to 1 minute",
        components: ["V", "S"],
        description: "You awaken the sense of mortality in one creature you can see within range. A creature makes a Wisdom saving throw.",
        classes: ["Artificer", "Cleric", "Wizard"]
    },
    "Ceremony": {
        name: "Ceremony",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "Touch",
        duration: "Instantaneous",
        components: ["V", "S", "M"],
        description: "You perform a religious ceremony imbued with magic. When you cast the spell, choose one of the following ceremonies.",
        classes: ["Artificer", "Cleric"]
    },
    "Chaos Bolt": {
        name: "Chaos Bolt",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "120 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "You hurl an undulating, warbling mass of chaotic energy at one creature in range.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Charm Person": {
        name: "Charm Person",
        level: 1,
        school: "Enchantment",
        castingTime: "1 action",
        range: "30 feet",
        duration: "1 hour",
        components: ["V", "S"],
        description: "You attempt to charm a humanoid you can see within range. It must make a Wisdom saving throw, and it does so with advantage if you or your companions are fighting it.",
        classes: ["Artificer", "Bard", "Sorcerer", "Warlock", "Wizard"]
    },
    "Chromatic Orb": {
        name: "Chromatic Orb",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "90 feet",
        duration: "Instantaneous",
        components: ["V", "S", "M"],
        description: "You hurl a 4-inch-diameter sphere of energy at a creature that you can see within range. You choose what type of energy the sphere is, such as acid, cold, fire, lightning, poison, or thunder.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Color Spray": {
        name: "Color Spray",
        level: 1,
        school: "Illusion",
        castingTime: "1 action",
        range: "Self (15-foot cone)",
        duration: "1 round",
        components: ["V", "S", "M"],
        description: "A spray of magical color springs from your fingers. Roll 6d10; the total is how many hit points of creatures this spell can affect.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Command": {
        name: "Command",
        level: 1,
        school: "Enchantment",
        castingTime: "1 action",
        range: "60 feet",
        duration: "1 round",
        components: ["V"],
        description: "You speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn.",
        classes: ["Artificer", "Cleric"]
    },
    "Compelled Duel": {
        name: "Compelled Duel",
        level: 1,
        school: "Enchantment",
        castingTime: "1 bonus action",
        range: "30 feet",
        duration: "Concentration, up to 1 minute",
        components: ["V"],
        description: "You challenge a creature you can see within range to combat. You and the target must be able to see each other.",
        classes: ["Paladin"]
    },
    "Comprehend Languages": {
        name: "Comprehend Languages",
        level: 1,
        school: "Divination",
        castingTime: "1 action",
        range: "Self",
        duration: "1 hour",
        components: ["V", "S", "M"],
        description: "For the duration, you understand the literal meaning of any spoken language that you hear.",
        classes: ["Artificer", "Bard", "Sorcerer", "Warlock", "Wizard"]
    },
    "Create or Destroy Water": {
        name: "Create or Destroy Water",
        level: 1,
        school: "Transmutation",
        castingTime: "1 action",
        range: "30 feet",
        duration: "Instantaneous",
        components: ["V", "S", "M"],
        description: "You either create or destroy water. If you create water, you choose a point within range and create up to 10 gallons of clean water in that area.",
        classes: ["Artificer", "Cleric", "Druid"]
    },
    "Cure Wounds": {
        name: "Cure Wounds",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "Touch",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "A creature you touch regains hit points equal to 1d8 + your spellcasting ability modifier.",
        classes: ["Artificer", "Bard", "Cleric", "Druid", "Paladin", "Ranger"]
    },
    "Detect Evil and Good": {
        name: "Detect Evil and Good",
        level: 1,
        school: "Divination",
        castingTime: "1 action",
        range: "Self",
        duration: "Concentration, up to 10 minutes",
        components: ["V", "S"],
        description: "For the duration, you know if there is an aberration, celestial, dragon, elemental, fey, fiend, or undead within 30 feet of you.",
        classes: ["Artificer", "Cleric", "Paladin"]
    },
    "Detect Magic": {
        name: "Detect Magic",
        level: 1,
        school: "Divination",
        castingTime: "1 action",
        range: "Self",
        duration: "Concentration, up to 10 minutes",
        components: ["V", "S"],
        description: "For the duration, you sense the presence of magic within 30 feet of you.",
        classes: ["Artificer", "Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Wizard"]
    },
    "Detect Poison and Disease": {
        name: "Detect Poison and Disease",
        level: 1,
        school: "Divination",
        castingTime: "1 action",
        range: "Self",
        duration: "Concentration, up to 10 minutes",
        components: ["V", "S", "M"],
        description: "For the duration, you can sense the presence and location of poisons, poisonous creatures, and diseases within 30 feet of you.",
        classes: ["Artificer", "Cleric", "Druid", "Paladin", "Ranger"]
    },
    "Disguise Self": {
        name: "Disguise Self",
        level: 1,
        school: "Illusion",
        castingTime: "1 action",
        range: "Self",
        duration: "1 hour",
        components: ["V", "S"],
        description: "You make yourself—including your clothing, armor, weapons, and other belongings on your person—look different until the spell ends.",
        classes: ["Artificer", "Bard", "Sorcerer", "Wizard"]
    },
    "Dissonant Whispers": {
        name: "Dissonant Whispers",
        level: 1,
        school: "Enchantment",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Instantaneous",
        components: ["V"],
        description: "You whisper a discordant melody that only one creature of your choice within range can hear, wracking it with terrible pain.",
        classes: ["Artificer", "Bard"]
    },
    "Distort Value": {
        name: "Distort Value",
        level: 1,
        school: "Illusion",
        castingTime: "1 minute",
        range: "Touch",
        duration: "8 hours",
        components: ["V"],
        description: "You cast this spell on an object no larger than 1 cubic foot. For the spell's duration, you make the object look like a different object of the same general size and shape.",
        classes: ["Artificer", "Bard", "Wizard"]
    },
    "Divine Favor": {
        name: "Divine Favor",
        level: 1,
        school: "Evocation",
        castingTime: "1 bonus action",
        range: "Self",
        duration: "Concentration, up to 1 minute",
        components: ["V", "S"],
        description: "Your prayer empowers you with divine radiance. Until the spell ends, your weapon attacks deal an extra 1d4 radiant damage on a hit.",
        classes: ["Artificer", "Cleric", "Paladin"]
    },
    "Earth Tremor": {
        name: "Earth Tremor",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "Self (10-foot radius)",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "You cause a tremor in the ground within 10 feet of you. Each creature other than you in that area must make a Dexterity saving throw.",
        classes: ["Artificer", "Bard", "Druid", "Sorcerer", "Wizard"]
    },
    "Ensnaring Strike": {
        name: "Ensnaring Strike",
        level: 1,
        school: "Conjuration",
        castingTime: "1 bonus action",
        range: "Self",
        duration: "Concentration, up to 1 minute",
        components: ["V"],
        description: "The next time you hit a creature with a weapon attack before this spell ends, a writhing mass of thorny vines appears at the point of impact, and the target must succeed on a Strength saving throw or be restrained by the magical vines.",
        classes: ["Artificer", "Ranger"]
    },
    "Entangle": {
        name: "Entangle",
        level: 1,
        school: "Conjuration",
        castingTime: "1 action",
        range: "90 feet",
        duration: "Concentration, up to 1 minute",
        components: ["V", "S"],
        description: "Grasping weeds and vines sprout from the ground in a 20-foot square starting from a point within range.",
        classes: ["Artificer", "Druid"]
    },
    "Expeditious Retreat": {
        name: "Expeditious Retreat",
        level: 1,
        school: "Transmutation",
        castingTime: "1 bonus action",
        range: "Self",
        duration: "Concentration, up to 10 minutes",
        components: ["V", "S"],
        description: "This spell allows you to move at an incredible pace. When you cast this spell, and then as a bonus action on each of your turns until the spell ends, you can take the Dash action.",
        classes: ["Artificer", "Bard", "Sorcerer", "Warlock", "Wizard"]
    },
    "Faerie Fire": {
        name: "Faerie Fire",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Concentration, up to 1 minute",
        components: ["V"],
        description: "Each object in a 20-foot cube within range is outlined in blue, green, or violet light (your choice) for the duration.",
        classes: ["Artificer", "Bard", "Druid"]
    },
    "False Life": {
        name: "False Life",
        level: 1,
        school: "Necromancy",
        castingTime: "1 action",
        range: "Self",
        duration: "1 hour",
        components: ["V", "S", "M"],
        description: "Bolstering yourself with a necromantic facsimile of life, you gain 1d4 + 4 temporary hit points for the duration.",
        classes: ["Artificer", "Sorcerer", "Wizard"]
    },
    "Feather Fall": {
        name: "Feather Fall",
        level: 1,
        school: "Transmutation",
        castingTime: "1 reaction",
        range: "60 feet",
        duration: "1 minute",
        components: ["V", "M"],
        description: "Choose up to five falling creatures within range. A creature's rate of descent slows to 60 feet per round until the spell ends.",
        classes: ["Artificer", "Bard", "Sorcerer", "Wizard"]
    },
    "Find Familiar": {
        name: "Find Familiar",
        level: 1,
        school: "Conjuration",
        castingTime: "1 hour",
        range: "10 feet",
        duration: "Instantaneous",
        components: ["V", "S", "M"],
        description: "You gain the service of a familiar, a spirit that takes animal form and emits an aura of faint magic.",
        classes: ["Artificer", "Bard", "Sorcerer", "Warlock", "Wizard"]
    },
    "Fog Cloud": {
        name: "Fog Cloud",
        level: 1,
        school: "Conjuration",
        castingTime: "1 action",
        range: "120 feet",
        duration: "Concentration, up to 1 hour",
        components: ["V", "S"],
        description: "You create a 20-foot-radius sphere of fog centered on a point within range. The sphere spreads around corners, and its area is heavily obscured.",
        classes: ["Artificer", "Druid", "Ranger", "Sorcerer", "Wizard"]
    },
    "Frost Fingers": {
        name: "Frost Fingers",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "Self (15-foot cone)",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "Freezing fingers spring from your hand. Each creature in a 15-foot cone that you can see within range must make a Constitution saving throw.",
        classes: ["Artificer", "Sorcerer", "Wizard"]
    },
    "Goodberry": {
        name: "Goodberry",
        level: 1,
        school: "Transmutation",
        castingTime: "1 action",
        range: "Touch",
        duration: "Instantaneous",
        components: ["V", "S", "M"],
        description: "Up to ten berries appear in your hand and are infused with magic for the duration. A creature can use an action to eat one berry.",
        classes: ["Artificer", "Druid", "Ranger"]
    },
    "Grease": {
        name: "Grease",
        level: 1,
        school: "Conjuration",
        castingTime: "1 action",
        range: "60 feet",
        duration: "1 minute",
        components: ["V", "S", "M"],
        description: "Slick grease covers the ground in a 10-foot square centered on a point within range and turns the area into difficult terrain for the duration.",
        classes: ["Artificer", "Sorcerer", "Wizard"]
    },
    "Guiding Bolt": {
        name: "Guiding Bolt",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "120 feet",
        duration: "1 round",
        components: ["V", "S"],
        description: "A flash of light springs from your hand. Make a ranged spell attack against the target.",
        classes: ["Cleric"]
    },
    "Hail of Thorns": {
        name: "Hail of Thorns",
        level: 1,
        school: "Conjuration",
        castingTime: "1 bonus action",
        range: "Self",
        duration: "Concentration, up to 1 minute",
        components: ["V"],
        description: "The next time you hit a creature with a weapon attack before this spell ends, the weapon suddenly elongates, and the attack deals an extra 1d10 piercing damage to the target.",
        classes: ["Ranger"]
    },
    "Healing Word": {
        name: "Healing Word",
        level: 1,
        school: "Evocation",
        castingTime: "1 bonus action",
        range: "60 feet",
        duration: "Instantaneous",
        components: ["V"],
        description: "A creature of your choice that you can see within range regains hit points equal to 1d4 + your spellcasting ability modifier.",
        classes: ["Artificer", "Bard", "Cleric", "Druid"]
    },
    "Hellish Rebuke": {
        name: "Hellish Rebuke",
        level: 1,
        school: "Evocation",
        castingTime: "1 reaction",
        range: "60 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "You point your finger, and the creature that damaged you is momentarily surrounded by hellish flames. The creature must make a Dexterity saving throw.",
        classes: ["Warlock"]
    },
    "Heroism": {
        name: "Heroism",
        level: 1,
        school: "Enchantment",
        castingTime: "1 action",
        range: "Touch",
        duration: "Concentration, up to 1 minute",
        components: ["V", "S"],
        description: "A willing creature you touch is imbued with bravery. Until the spell ends, the creature is immune to being frightened and gains temporary hit points equal to your spellcasting ability modifier at the start of each of its turns.",
        classes: ["Artificer", "Bard", "Paladin"]
    },
    "Hex": {
        name: "Hex",
        level: 1,
        school: "Enchantment",
        castingTime: "1 bonus action",
        range: "90 feet",
        duration: "Concentration, up to 1 hour",
        components: ["V", "S", "M"],
        description: "You place a curse on a creature that you can see within range. Until the spell ends, you deal an extra 1d6 necrotic damage to the target whenever you hit it with an attack.",
        classes: ["Warlock"]
    },
    "Hunter's Mark": {
        name: "Hunter's Mark",
        level: 1,
        school: "Divination",
        castingTime: "1 bonus action",
        range: "90 feet",
        duration: "Concentration, up to 1 hour",
        components: ["V"],
        description: "You choose a creature you can see within range and mystically mark it as your quarry. Until the spell ends, you deal an extra 1d6 damage to the target whenever you hit it with a weapon attack.",
        classes: ["Ranger"]
    },
    "Ice Knife": {
        name: "Ice Knife",
        level: 1,
        school: "Conjuration",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Instantaneous",
        components: ["S", "M"],
        description: "You create a shard of ice and hurl it at one creature within range. Make a ranged spell attack against the target.",
        classes: ["Artificer", "Druid", "Sorcerer", "Wizard"]
    },
    "Identify": {
        name: "Identify",
        level: 1,
        school: "Divination",
        castingTime: "1 minute",
        range: "Touch",
        duration: "Instantaneous",
        components: ["V", "S", "M"],
        description: "You choose an object that you must touch throughout the casting of this spell. If it is a magic item or some other magic-imbued object, you learn its properties and how to use them.",
        classes: ["Artificer", "Bard", "Cleric", "Wizard"]
    },
    "Illusory Script": {
        name: "Illusory Script",
        level: 1,
        school: "Illusion",
        castingTime: "1 minute",
        range: "Touch",
        duration: "10 days",
        components: ["S", "M"],
        description: "You write on parchment, paper, or some other suitable writing material and imbue it with a potent illusion that lasts for the duration.",
        classes: ["Artificer", "Bard", "Warlock", "Wizard"]
    },
    "Inflict Wounds": {
        name: "Inflict Wounds",
        level: 1,
        school: "Necromancy",
        castingTime: "1 action",
        range: "Touch",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "Make a melee spell attack against a creature you can reach. On a hit, the target takes 3d10 necrotic damage.",
        classes: ["Cleric"]
    },
    "Jim's Magic Missile": {
        name: "Jim's Magic Missile",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "120 feet",
        duration: "Instantaneous",
        components: ["V", "S", "M"],
        description: "You hurl magical missiles that explode around a creature you can see within range.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Jump": {
        name: "Jump",
        level: 1,
        school: "Transmutation",
        castingTime: "1 action",
        range: "Touch",
        duration: "1 minute",
        components: ["V", "S", "M"],
        description: "You touch a creature. The creature's jump distance is tripled until the spell ends.",
        classes: ["Artificer", "Druid", "Ranger", "Sorcerer", "Wizard"]
    },
    "Longstrider": {
        name: "Longstrider",
        level: 1,
        school: "Transmutation",
        castingTime: "1 action",
        range: "Touch",
        duration: "1 hour",
        components: ["V", "S", "M"],
        description: "You touch a creature. The target's speed increases by 10 feet until the spell ends.",
        classes: ["Artificer", "Bard", "Druid", "Ranger", "Sorcerer", "Wizard"]
    },
    "Mage Armor": {
        name: "Mage Armor",
        level: 1,
        school: "Abjuration",
        castingTime: "1 action",
        range: "Touch",
        duration: "8 hours",
        components: ["V", "S", "M"],
        description: "You touch a willing creature who isn't wearing armor, and a protective magical force surrounds it.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Magic Missile": {
        name: "Magic Missile",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "120 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Protection from Evil and Good": {
        name: "Protection from Evil and Good",
        level: 1,
        school: "Abjuration",
        castingTime: "1 action",
        range: "Touch",
        duration: "Concentration, up to 10 minutes",
        components: ["V", "S", "M"],
        description: "Until the spell ends, one willing creature you touch is protected against certain types of creatures: aberrations, celestials, dragons, elementals, fey, fiends, and undead.",
        classes: ["Artificer", "Cleric", "Paladin", "Warlock", "Wizard"]
    },
    "Purify Food and Drink": {
        name: "Purify Food and Drink",
        level: 1,
        school: "Transmutation",
        castingTime: "1 action",
        range: "10 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "All nonmagical food and drink within a 5-foot-radius sphere centered on a point of your choice within range is purified and rendered free of poison and disease.",
        classes: ["Artificer", "Bard", "Cleric", "Druid", "Monk", "Paladin", "Ranger"]
    },
    "Ray of Sickness": {
        name: "Ray of Sickness",
        level: 1,
        school: "Necromancy",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "A ray of sickening brownish-green energy springs from your pointing finger toward a creature within range.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Sanctuary": {
        name: "Sanctuary",
        level: 1,
        school: "Abjuration",
        castingTime: "1 bonus action",
        range: "30 feet",
        duration: "1 minute",
        components: ["V", "S", "M"],
        description: "You ward a creature within range against attack. Until the spell ends, any creature that targets the warded creature with an attack or a harmful spell must first make a Wisdom saving throw.",
        classes: ["Artificer", "Cleric"]
    },
    "Searing Smite": {
        name: "Searing Smite",
        level: 1,
        school: "Evocation",
        castingTime: "1 bonus action",
        range: "Self",
        duration: "Concentration, up to 1 minute",
        components: ["V"],
        description: "The next time you hit a creature with a weapon attack before this spell ends, your weapon flares with white-hot intensity, and the attack deals an extra 1d6 fire damage to the target.",
        classes: ["Paladin"]
    },
    "Shield": {
        name: "Shield",
        level: 1,
        school: "Abjuration",
        castingTime: "1 reaction",
        range: "Self",
        duration: "1 round",
        components: ["V", "S"],
        description: "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Shield of Faith": {
        name: "Shield of Faith",
        level: 1,
        school: "Abjuration",
        castingTime: "1 bonus action",
        range: "60 feet",
        duration: "Concentration, up to 10 minutes",
        components: ["V", "S", "M"],
        description: "A shimmering shield appears and protects a creature of your choice within range. Until the spell ends, the target gains a +2 bonus to AC.",
        classes: ["Artificer", "Cleric", "Paladin"]
    },
    "Silent Image": {
        name: "Silent Image",
        level: 1,
        school: "Illusion",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Concentration, up to 10 minutes",
        components: ["V", "S", "M"],
        description: "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot cube. The image appears at a spot that you can see within range and lasts for the duration.",
        classes: ["Artificer", "Bard", "Sorcerer", "Wizard"]
    },
    "Silvery Barbs": {
        name: "Silvery Barbs",
        level: 1,
        school: "Enchantment",
        castingTime: "1 reaction",
        range: "60 feet",
        duration: "Instantaneous",
        components: ["V"],
        description: "You see a creature casting a spell or making an attack roll within 60 feet of you. You can use your reaction to force that creature to make a Wisdom saving throw.",
        classes: ["Bard", "Sorcerer", "Wizard"]
    },
    "Sleep": {
        name: "Sleep",
        level: 1,
        school: "Enchantment",
        castingTime: "1 action",
        range: "90 feet",
        duration: "1 minute",
        components: ["V", "S", "M"],
        description: "This spell sends creatures into a magical slumber. Roll 5d8; the total is how many hit points of creatures this spell can affect.",
        classes: ["Artificer", "Bard", "Sorcerer", "Wizard"]
    },
    "Snare": {
        name: "Snare",
        level: 1,
        school: "Abjuration",
        castingTime: "1 minute",
        range: "Touch",
        duration: "Until dispelled or triggered",
        components: ["V", "S", "M"],
        description: "As you cast this spell, you lay a trap by crafting an illusory snare using materials such as rope or vines.",
        classes: ["Artificer", "Ranger"]
    },
    "Speak with Animals": {
        name: "Speak with Animals",
        level: 1,
        school: "Divination",
        castingTime: "1 action",
        range: "Self",
        duration: "10 minutes",
        components: ["V", "S"],
        description: "You gain the ability to comprehend and verbally communicate with beasts for the duration.",
        classes: ["Artificer", "Bard", "Druid", "Ranger"]
    },
    "Tasha's Caustic Brew": {
        name: "Tasha's Caustic Brew",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "Self (30-foot line)",
        duration: "Concentration, up to 1 minute",
        components: ["V", "S", "M"],
        description: "A stream of acid springs from your hand. Make a ranged spell attack against each creature in the line.",
        classes: ["Artificer", "Sorcerer", "Wizard"]
    },
    "Tasha's Hideous Laughter": {
        name: "Tasha's Hideous Laughter",
        level: 1,
        school: "Enchantment",
        castingTime: "1 action",
        range: "30 feet",
        duration: "Concentration, up to 1 minute",
        components: ["V", "S", "M"],
        description: "A creature of your choice that you can see within range perceives everything as hilariously funny and falls into fits of laughter if this spell affects it.",
        classes: ["Artificer", "Bard", "Wizard"]
    },
    "Tenser's Floating Disk": {
        name: "Tenser's Floating Disk",
        level: 1,
        school: "Conjuration",
        castingTime: "1 action",
        range: "30 feet",
        duration: "1 hour",
        components: ["V", "S", "M"],
        description: "You create a circular, floating disk of magical force, 3 feet in diameter and 1 inch thick, that persists for the duration.",
        classes: ["Artificer", "Bard", "Sorcerer", "Wizard"]
    },
    "Thunderous Smite": {
        name: "Thunderous Smite",
        level: 1,
        school: "Evocation",
        castingTime: "1 bonus action",
        range: "Self",
        duration: "Concentration, up to 1 minute",
        components: ["V"],
        description: "The next time you hit a creature with a weapon attack before this spell ends, the weapon rings with thunder that is audible within 300 feet of you, and the attack deals an extra 2d6 thunder damage.",
        classes: ["Paladin"]
    },
    "Thunderwave": {
        name: "Thunderwave",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "Self (15-foot cube)",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "A wave of thunderous force pulses out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw.",
        classes: ["Artificer", "Bard", "Druid", "Sorcerer", "Wizard"]
    },
    "Unseen Servant": {
        name: "Unseen Servant",
        level: 1,
        school: "Conjuration",
        castingTime: "1 action",
        range: "60 feet",
        duration: "1 hour",
        components: ["V", "S", "M"],
        description: "This spell creates an invisible, mindless servant of magic, shaped from shadow and bound by your will.",
        classes: ["Artificer", "Bard", "Sorcerer", "Wizard"]
    },
    "Witch Bolt": {
        name: "Witch Bolt",
        level: 1,
        school: "Evocation",
        castingTime: "1 action",
        range: "30 feet",
        duration: "Concentration, up to 1 minute",
        components: ["V", "S", "M"],
        description: "A beam of crackling, blue energy springs from your pointing finger to a creature within range.",
        classes: ["Artificer", "Sorcerer", "Wizard"]
    },
    "Wrathful Smite": {
        name: "Wrathful Smite",
        level: 1,
        school: "Evocation",
        castingTime: "1 bonus action",
        range: "Self",
        duration: "Concentration, up to 1 minute",
        components: ["V"],
        description: "The next time you hit a creature with a weapon attack before this spell ends, your attack rings with divine power.",
        classes: ["Paladin"]
    },
    "Zephyr Strike": {
        name: "Zephyr Strike",
        level: 1,
        school: "Transmutation",
        castingTime: "1 bonus action",
        range: "Self",
        duration: "Concentration, up to 1 minute",
        components: ["V"],
        description: "You move like the wind. For the duration, your movement doesn't provoke opportunity attacks.",
        classes: ["Artificer", "Ranger"]
    },

    // ========== LEVEL 2+ SPELLS (ABBREVIATED FOR SPACE) ==========
    // I'll include a few key level 2+ spells and you can continue the pattern

    // Level 2
    "Acid Arrow": {
        name: "Acid Arrow",
        level: 2,
        school: "Evocation",
        castingTime: "1 action",
        range: "90 feet",
        duration: "Instantaneous",
        components: ["V", "S", "M"],
        description: "A shimmering green arrow streaks toward a target within range. Make a ranged spell attack against the target.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Aid": {
        name: "Aid",
        level: 2,
        school: "Abjuration",
        castingTime: "1 action",
        range: "30 feet",
        duration: "8 hours",
        components: ["V", "S", "M"],
        description: "Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range.",
        classes: ["Artificer", "Bard", "Cleric", "Paladin"]
    },
    "Fireball": {
        name: "Fireball",
        level: 3,
        school: "Evocation",
        castingTime: "1 action",
        range: "150 feet",
        duration: "Instantaneous",
        components: ["V", "S", "M"],
        description: "A bright streak flashes from your pointing finger to a point of your choice within range and then blossoms with a low roar into an explosion of flame.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Lightning Bolt": {
        name: "Lightning Bolt",
        level: 3,
        school: "Evocation",
        castingTime: "1 action",
        range: "Self (100-foot line)",
        duration: "Instantaneous",
        components: ["V", "S", "M"],
        description: "A stroke of lightning forming a line 100 feet long and 5 feet wide blasts out from you in a direction you choose.",
        classes: ["Sorcerer", "Wizard"]
    },
    "Polymorph": {
        name: "Polymorph",
        level: 4,
        school: "Transmutation",
        castingTime: "1 action",
        range: "60 feet",
        duration: "Concentration, up to 1 hour",
        components: ["V", "S", "M"],
        description: "This spell transforms a creature with at most 1 hit point per spell level. An unwilling creature must make a Wisdom saving throw to avoid the effect.",
        classes: ["Bard", "Sorcerer", "Wizard"]
    },
    "Wish": {
        name: "Wish",
        level: 9,
        school: "Conjuration",
        castingTime: "1 action",
        range: "Self",
        duration: "Instantaneous",
        components: ["V", "S"],
        description: "Wish is the mightiest spell a mortal creature can cast. By simply speaking aloud, you can alter the very foundations of reality in accord with your desires.",
        classes: ["Sorcerer", "Wizard", "Warlock"]
    }
};

// Helper function to get spells available for a class
export function getSpellsForClass(className: string, level: number): SpellData[] {
    return Object.values(spellsData).filter(
        spell => spell.classes.includes(className) && spell.level === level
    );
}

// Helper function to get all spells for a class
export function getAllSpellsForClass(className: string): SpellData[] {
    return Object.values(spellsData).filter(spell => spell.classes.includes(className));
}

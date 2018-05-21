
Types = {
    Messages: {
        CREATE: 0,
        LOGIN: 1,
        WELCOME: 2,
        SPAWN: 3,
        DESPAWN: 4,
        MOVE: 5,
        LOOTMOVE: 6,
        AGGRO: 7,
        ATTACK: 8,
        HIT: 9,
        HURT: 10,
        HEALTH: 11,
        CHAT: 12,
        LOOT: 13,
        EQUIP: 14,
        DROP: 15,
        TELEPORT: 16,
        DAMAGE: 17,
        POPULATION: 18,
        KILL: 19,
        LIST: 20,
        WHO: 21,
        ZONE: 22,
        DESTROY: 23,
        HP: 24,
        BLINK: 25,
        OPEN: 26,
        CHECK: 27,
        PVP: 28,
        GUILD: 29,
        GUILDERROR: 30,
        INVENTORY: 31,
        ACHIEVEMENT: 32,
        TALKTONPC: 33,
        GUILDERRORTYPE: {
        	DOESNOTEXIST: 1,
        	BADNAME: 2,
        	ALREADYEXISTS: 3,
        	NOLEAVE: 4,
        	BADINVITE: 5,
        	GUILDRULES: 6,
        	IDWARNING: 7
        },
        GUILDACTION: {
			CONNECT: 8,
			ONLINE: 9,
			DISCONNECT: 10,
			INVITE: 11,
			LEAVE: 12,
			CREATE: 13,
			TALK: 14,
			JOIN: 15,
			POPULATION: 16
		}
    },

    Entities: {
        WARRIOR: 1,

        // Mobs
        RAT: 2,
        SKELETON: 3,
        GOBLIN: 4,
        OGRE: 5,
        SPECTRE: 6,
        CRAB: 7,
        BAT: 8,
        WIZARD: 9,
        EYE: 10,
        SNAKE: 11,
        SKELETON2: 12,
        BOSS: 13,
        DEATHKNIGHT: 14,
        ORC: 67,
        OLDOGRE: 68,
        GOLEM: 69,
        MIMIC: 70,
        HOBGOBLIN: 71,
        YELLOWMOUSE: 75,
        WHITEMOUSE: 76,
        BROWNMOUSE: 77,
        REDMOUSE: 80,
        REDGUARD: 81,
        INFECTEDGUARD: 85,
        LIVINGARMOR: 86,
        MERMAID: 87,
        YELLOWFISH: 90,
        GREENFISH: 91,
        REDFISH: 92,
        CLAM: 93,
        PRETA: 94,
        PIRATESKELETON: 95,
        PENGUIN: 98,
        MOLEKING: 99,
        DARKSKELETON: 102,
        GREENPIRATESKELETON: 103,
        BLACKPIRATESKELETON: 104,
        REDPIRATESKELETON: 105,
        YELLOWPRETA: 106,
        BLUEPRETA: 107,
        MINIKNIGHT: 108,
        WOLF: 109,
        PINKELF: 115,
        SKYELF: 117,
        REDELF: 119,
        HERMITCRAB: 141, 
        ZOMBIE: 121,
        PIRATECAPTAIN: 122,
        IRONOGRE: 123,
        OGRELORD: 124,
        ADHERER: 125,
        ICEGOLEM: 126,
        DESERTSCOLPION: 142, 
        DARKSCOLPION: 143,
        VULTURE: 144, 
        FORESTDRAGON: 145,
        CRYSTALSCOLPION: 146,
        ELIMINATOR: 147,
        FROSTQUEEN: 148,
        SNOWRABBIT: 149,
        SNOWWOLF: 150,
        ICEKNIGHT: 151,
        MINIICEKNIGHT: 152,
        SNOWELF: 153,
        WHITEBEAR: 154,
        COBRA: 155,
        GOLDGOLEM: 156,
        DARKREGION: 157,
        DARKREGIONILLUSION: 158,
        NIGHTMAREREGION: 159,
        DARKOGRE: 171, // Last

        // Armors
        CLOTHARMOR: 21,
        LEATHERARMOR: 22,
        MAILARMOR: 23,
        PLATEARMOR: 24,
        REDARMOR: 25,
        GOLDENARMOR: 26,
        GREENARMOR: 72,
        GREENWINGARMOR: 73,
        GUARDARMOR: 78,
        REDGUARDARMOR: 82,
        WHITEARMOR: 83,
        RATARMOR: 88,
        BLUEPIRATEARMOR: 96,
        CHEOLIARMOR: 100,
        DOVAKINARMOR: 110,
        GBWINGARMOR: 111,
        REDWINGARMOR: 112,
        SNOWFOXARMOR: 113,
        WOLFARMOR: 114,
        BLUEWINGARMOR: 127,
        THIEFARMOR: 128,
        NINJAARMOR: 129,
        DRAGONARMOR: 130,
        FALLENARMOR: 131,
        PALADINARMOR: 132,
        CRYSTALARMOR: 133,
        ADHERERROBE: 134,
        FROSTARMOR: 135,
        GAYARMOR: 160,
        SCHOOLUNIFORM: 161,
        BEAUTIFULLIFE: 162,
        REGIONARMOR: 163,
        GHOSTRIDER: 164,
        TAEKWONDO: 170,

        // Objects
        FLASK: 35,
        BURGER: 36,
        CHEST: 37,
        FIREPOTION: 38,
        CAKE: 39,

        // NPCs
        GUARD: 40,
        KING: 41,
        OCTOCAT: 42,
        VILLAGEGIRL: 43,
        VILLAGER: 44,
        PRIEST: 45,
        SCIENTIST: 46,
        AGENT: 47,
        RICK: 48,
        NYAN: 49,
        SORCERER: 50,
        BEACHNPC: 51,
        FORESTNPC: 52,
        DESERTNPC: 53,
        LAVANPC: 54,
        CODER: 55,

        // Weapons
        SWORD1: 60,
        SWORD2: 61,
        REDSWORD: 62,
        GOLDENSWORD: 63,
        MORNINGSTAR: 64,
        AXE: 65,
        BLUESWORD: 66,
        SIDESWORD: 74,
        SPEAR: 79,
        SCIMITAR: 84,
        TRIDENT: 89,
        BLUESCIMITAR: 97,
        HAMMER: 101,
        GREENLIGHTSABER: 116,
        SKYLIGHTSABER: 118,
        REDLIGHTSABER: 120,
        REDMETALSWORD: 136,
        BASTARDSWORD: 137,
        HALBERD: 138,
        ROSE: 139,
        ICEROSE: 140,
        JUSTICEHAMMER: 165,
        FIRESWORD: 166,
        WHIP: 167,
        FORESTGUARDIANSWORD: 168,

        DEBENEF: 20,
        FIREBENEF: 169,
    },

    Orientations: {
        UP: 1,
        DOWN: 2,
        LEFT: 3,
        RIGHT: 4
    },

    Keys: {
        ENTER: 13,
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        W: 87,
        A: 65,
        S: 83,
        D: 68,
        SPACE: 32,
        I: 73,
        H: 72,
        M: 77,
        P: 80,
        KEYPAD_4: 100,
        KEYPAD_6: 102,
        KEYPAD_8: 104,
        KEYPAD_2: 98
    }
};

var kinds = {
    warrior: [Types.Entities.WARRIOR, "player", 0],

    wizard: [Types.Entities.WIZARD, "mob", 7],
    rat: [Types.Entities.RAT, "mob", 1],
    bat: [Types.Entities.BAT, "mob", 3],
    crab: [Types.Entities.CRAB, "mob", 4],
    goblin: [Types.Entities.GOBLIN, "mob", 5],
    yellowfish: [Types.Entities.YELLOWFISH, "mob", 5],
    skeleton: [Types.Entities.SKELETON , "mob", 8],
    greenfish: [Types.Entities.GREENFISH, "mob", 8],
    snake: [Types.Entities.SNAKE, "mob", 10],
    redfish: [Types.Entities.REDFISH, "mob", 10],
    ogre: [Types.Entities.OGRE, "mob", 12],
    clam: [Types.Entities.CLAM, "mob", 12],
    skeleton2: [Types.Entities.SKELETON2, "mob", 14],
    hermitcrab: [Types.Entities.HERMITCRAB, "mob", 14],
    eye: [Types.Entities.EYE, "mob", 16],
    spectre: [Types.Entities.SPECTRE, "mob", 18],
    deathknight: [Types.Entities.DEATHKNIGHT, "mob", 21],
    boss: [Types.Entities.BOSS, "mob", 120],
    mimic: [Types.Entities.MIMIC, "mob", 32],
    orc: [Types.Entities.ORC, "mob", 32],
    oldogre: [Types.Entities.OLDOGRE, "mob", 41],
    golem: [Types.Entities.GOLEM, "mob", 41],
    hobgoblin: [Types.Entities.HOBGOBLIN, "mob", 48],
    yellowmouse: [Types.Entities.YELLOWMOUSE, "mob", 55],
    brownmouse: [Types.Entities.BROWNMOUSE, "mob", 66],
    redguard: [Types.Entities.REDGUARD, "mob", 84],
    redmouse: [Types.Entities.REDMOUSE, "mob", 89],
    infectedguard: [Types.Entities.INFECTEDGUARD, "mob", 101],
    livingarmor: [Types.Entities.LIVINGARMOR, "mob", 101],
    whitemouse: [Types.Entities.WHITEMOUSE, "mob", 114],
    mermaid: [Types.Entities.MERMAID, "mob", 125],
    preta: [Types.Entities.PRETA, "mob", 162],
    pirateskeleton: [Types.Entities.PIRATESKELETON, "mob", 180],
    vulture: [Types.Entities.VULTURE, "mob", 231],
    penguin: [Types.Entities.PENGUIN, "mob", 269],
    moleking: [Types.Entities.MOLEKING, "mob", 360],
    desertscolpion: [Types.Entities.DESERTSCOLPION, "mob", 368],
    darkskeleton: [Types.Entities.DARKSKELETON, "mob", 432],
    darkscolpion: [Types.Entities.DARKSCOLPION, "mob", 471],
    greenpirateskeleton: [Types.Entities.GREENPIRATESKELETON, "mob", 504],
    blackpirateskeleton: [Types.Entities.BLACKPIRATESKELETON, "mob", 600],
    redpirateskeleton: [Types.Entities.REDPIRATESKELETON, "mob", 720],
    yellowpreta: [Types.Entities.YELLOWPRETA, "mob", 864],
    bluepreta: [Types.Entities.BLUEPRETA, "mob", 1032],
    miniknight: [Types.Entities.MINIKNIGHT, "mob", 1224],
    wolf: [Types.Entities.WOLF, "mob", 1464],
    pinkelf: [Types.Entities.PINKELF, "mob", 1700],
    skyelf: [Types.Entities.SKYELF, "mob", 2000],
    redelf: [Types.Entities.REDELF, "mob", 2400],
    zombie: [Types.Entities.ZOMBIE, "mob", 2900],
    piratecaptain: [Types.Entities.PIRATECAPTAIN, "mob", 3500],
    ironogre: [Types.Entities.IRONOGRE, "mob", 4200],
    ogrelord: [Types.Entities.OGRELORD, "mob", 5000],
    crystalscolpion: [Types.Entities.CRYSTALSCOLPION, "mob", 5900],
    eliminator: [Types.Entities.ELIMINATOR, "mob", 6900],
    adherer: [Types.Entities.ADHERER, "mob", 8000],
    miniiceknight: [Types.Entities.MINIICEKNIGHT, "mob", 9200],
    iceknight: [Types.Entities.ICEKNIGHT, "mob", 10500],
    icegolem: [Types.Entities.ICEGOLEM, "mob", 11600],
    snowwolf: [Types.Entities.SNOWWOLF, "mob", 12600],
    cobra: [Types.Entities.COBRA, "mob", 13700],
    darkogre: [Types.Entities.DARKOGRE, "mob", 14800],

    forestdragon: [Types.Entities.FORESTDRAGON, "mob", 1],
    frostqueen: [Types.Entities.FROSTQUEEN, "mob", 1],
    snowrabbit: [Types.Entities.SNOWRABBIT, "mob", 1],
    snowelf: [Types.Entities.SNOWELF, "mob", 1],
    whitebear: [Types.Entities.WHITEBEAR, "mob", 1],
    goldgolem: [Types.Entities.GOLDGOLEM, "mob", 1],
    darkregion: [Types.Entities.DARKREGION, "mob", 1],
    darkregionillusion: [Types.Entities.DARKREGIONILLUSION, "mob", 1],
    nightmareregion: [Types.Entities.NIGHTMAREREGION, "mob", 1],

    sword1: [Types.Entities.SWORD1, "weapon", 0],
    sword2: [Types.Entities.SWORD2, "weapon", 0],
    axe: [Types.Entities.AXE, "weapon", 0],
    redsword: [Types.Entities.REDSWORD, "weapon", 0],
    bluesword: [Types.Entities.BLUESWORD, "weapon", 0],
    goldensword: [Types.Entities.GOLDENSWORD, "weapon", 0],
    morningstar: [Types.Entities.MORNINGSTAR, "weapon", 0],
    sidesword: [Types.Entities.SIDESWORD, "weapon", 0],
    spear: [Types.Entities.SPEAR, "weapon", 0],
    scimitar: [Types.Entities.SCIMITAR, "weapon", 0],
    trident: [Types.Entities.TRIDENT, "weapon", 0],
    bluescimitar: [Types.Entities.BLUESCIMITAR, "weapon", 0],
    hammer: [Types.Entities.HAMMER, "weapon", 0],
    greenlightsaber: [Types.Entities.GREENLIGHTSABER, "weapon", 0],
    skylightsaber: [Types.Entities.SKYLIGHTSABER, "weapon", 0],
    redlightsaber: [Types.Entities.REDLIGHTSABER, "weapon", 0],
    redmetalsword: [Types.Entities.REDMETALSWORD, "weapon", 0],
    bastardsword: [Types.Entities.BASTARDSWORD, "weapon", 0],
    halberd: [Types.Entities.HALBERD, "weapon", 0],
    rose: [Types.Entities.ROSE, "weapon", 0],
    icerose: [Types.Entities.ICEROSE, "weapon", 0],
    justicehammer: [Types.Entities.JUSTICEHAMMER, "weapon", 0],
    firesword: [Types.Entities.FIRESWORD, "weapon", 0],
    whip: [Types.Entities.WHIP, "weapon", 0],
    forestguardiansword: [Types.Entities.FORESTGUARDIANSWORD, "weapon", 0],

    clotharmor: [Types.Entities.CLOTHARMOR, "armor", 0],
    leatherarmor: [Types.Entities.LEATHERARMOR, "armor", 0],
    mailarmor: [Types.Entities.MAILARMOR, "armor", 0],
    platearmor: [Types.Entities.PLATEARMOR, "armor", 0],
    redarmor: [Types.Entities.REDARMOR, "armor", 0],
    goldenarmor: [Types.Entities.GOLDENARMOR, "armor", 0],
    greenarmor: [Types.Entities.GREENARMOR, "armor", 0],
    greenwingarmor: [Types.Entities.GREENWINGARMOR, "armor", 0],
    guardarmor: [Types.Entities.GUARDARMOR, "armor", 0],
    redguardarmor: [Types.Entities.REDGUARDARMOR, "armor", 0],
    whitearmor: [Types.Entities.WHITEARMOR, "armor", 0],
    ratarmor: [Types.Entities.RATARMOR, "armor", 0],
    bluepiratearmor: [Types.Entities.BLUEPIRATEARMOR, "armor", 0],
    cheoliarmor: [Types.Entities.CHEOLIARMOR, "armor", 0],
    dovakinarmor: [Types.Entities.DOVAKINARMOR, "armor", 0],
    gbwingarmor: [Types.Entities.GBWINGARMOR, "armor", 0],
    redwingarmor: [Types.Entities.REDWINGARMOR, "armor", 0],
    snowfoxarmor: [Types.Entities.SNOWFOXARMOR, "armor", 0],
    wolfarmor: [Types.Entities.WOLFARMOR, "armor", 0],
    bluewingarmor: [Types.Entities.BLUEWINGARMOR, "armor", 0],
    thiefarmor: [Types.Entities.THIEFARMOR, "armor", 0],
    ninjaarmor: [Types.Entities.NINJAARMOR, "armor", 0],
    dragonarmor: [Types.Entities.DRAGONARMOR, "armor", 0],
    fallenarmor: [Types.Entities.FALLENARMOR, "armor", 0],
    paladinarmor: [Types.Entities.PALADINARMOR, "armor", 0],
    crystalarmor: [Types.Entities.CRYSTALARMOR, "armor", 0],
    adhererrobe: [Types.Entities.ADHERERROBE, "armor", 0],
    frostarmor: [Types.Entities.FROSTARMOR, "armor", 0],
    gayarmor: [Types.Entities.GAYARMOR, "armor", 0],
    schooluniform: [Types.Entities.SCHOOLUNIFORM, "armor", 0],
    beautifullife: [Types.Entities.BEAUTIFULLIFE, "armor", 0],
    regionarmor: [Types.Entities.REGIONARMOR, "armor", 0],
    ghostrider: [Types.Entities.GHOSTRIDER, "armor", 0],
    taekwondo: [Types.Entities.TAEKWONDO, "armor", 0],

    flask: [Types.Entities.FLASK, "object"],
    cake: [Types.Entities.CAKE, "object"],
    burger: [Types.Entities.BURGER, "object"],
    chest: [Types.Entities.CHEST, "object"],
    firepotion: [Types.Entities.FIREPOTION, "object"],

    guard: [Types.Entities.GUARD, "npc", 0],
    villagegirl: [Types.Entities.VILLAGEGIRL, "npc", 0],
    villager: [Types.Entities.VILLAGER, "npc", 0],
    coder: [Types.Entities.CODER, "npc", 0],
    scientist: [Types.Entities.SCIENTIST, "npc", 0],
    priest: [Types.Entities.PRIEST, "npc", 0],
    king: [Types.Entities.KING, "npc", 0],
    rick: [Types.Entities.RICK, "npc", 0],
    nyan: [Types.Entities.NYAN, "npc", 0],
    sorcerer: [Types.Entities.SORCERER, "npc", 0],
    agent: [Types.Entities.AGENT, "npc", 0],
    octocat: [Types.Entities.OCTOCAT, "npc", 0],
    beachnpc: [Types.Entities.BEACHNPC, "npc", 0],
    forestnpc: [Types.Entities.FORESTNPC, "npc", 0],
    desertnpc: [Types.Entities.DESERTNPC, "npc", 0],
    lavanpc: [Types.Entities.LAVANPC, "npc", 0],

    debenef: [Types.Entities.DEBENEF, "benef", 0],
    firebenef: [Types.Entities.FIREBENEF, "benef", 0],

    getType: function(kind) {
        return kinds[Types.getKindAsString(kind)][1];
    },
    getMobExp: function(kind){
        return kinds[Types.getKindAsString(kind)][2];
    },
    getMobLevel: function(kind){
        return kinds[Types.getKindAsString(kind)][3];
    }

};

Types.rankedWeapons = [
    Types.Entities.SWORD1,
    Types.Entities.SWORD2,
    Types.Entities.AXE,
    Types.Entities.MORNINGSTAR,
    Types.Entities.BLUESWORD,
    Types.Entities.REDSWORD,
    Types.Entities.GOLDENSWORD,
    Types.Entities.SIDESWORD,
    Types.Entities.SPEAR,
    Types.Entities.SCIMITAR,
    Types.Entities.TRIDENT,
    Types.Entities.BLUESCIMITAR,
    Types.Entities.HAMMER,
    Types.Entities.GREENLIGHTSABER,
    Types.Entities.SKYLIGHTSABER,
    Types.Entities.REDLIGHTSABER,
    Types.Entities.BASTARDSWORD,
    Types.Entities.REDMETALSWORD,
    Types.Entities.JUSTICEHAMMER,
    Types.Entities.ROSE,
    Types.Entities.ICEROSE,
    Types.Entities.HALBERD,
    Types.Entities.WHIP,

    Types.Entities.FIRESWORD,
    Types.Entities.FORESTGUARDIANSWORD,
];

Types.rankedArmors = [
    Types.Entities.CLOTHARMOR,
    Types.Entities.LEATHERARMOR,
    Types.Entities.MAILARMOR,
    Types.Entities.PLATEARMOR,
    Types.Entities.REDARMOR,
    Types.Entities.GOLDENARMOR,
    Types.Entities.GREENARMOR,
    Types.Entities.GREENWINGARMOR,
    Types.Entities.GUARDARMOR,
    Types.Entities.REDGUARDARMOR,
    Types.Entities.WHITEARMOR,
    Types.Entities.RATARMOR,
    Types.Entities.BLUEPIRATEARMOR,
    Types.Entities.CHEOLIARMOR,
    Types.Entities.DOVAKINARMOR,
    Types.Entities.GBWINGARMOR,
    Types.Entities.REDWINGARMOR,
    Types.Entities.SNOWFOXARMOR,
    Types.Entities.WOLFARMOR,
    Types.Entities.BLUEWINGARMOR,
    Types.Entities.FALLENARMOR,
    Types.Entities.CRYSTALARMOR,
    Types.Entities.PALADINARMOR,
    Types.Entities.ADHERERROBE,
    Types.Entities.SCHOOLUNIFORM,
    Types.Entities.TAEKWONDO,
    Types.Entities.GAYARMOR,

    Types.Entities.NINJAARMOR,
    Types.Entities.THIEFARMOR,
    Types.Entities.DRAGONARMOR,
    Types.Entities.FROSTARMOR,
    Types.Entities.BEAUTIFULLIFE,
    Types.Entities.REGIONARMOR,
    Types.Entities.GHOSTRIDER,
];

Types.expForLevel = [
    1, 16, 81, 256, 625,
    1296, 2401, 4096, 6561, 10000,
    14641, 20736, 28561, 38416, 50625,
    65536, 83521, 104976, 130321, 160000,
    194481, 234256, 279841, 331776, 390625,
    456976, 531441, 614656, 707281, 810000,
    923521, 1048576, 1185921, 1336336, 1500625,
    1679616, 1874161, 2085136, 2313441, 2560000,
    2825761, 3111696, 3418801, 3748096, 4100625,
    4477456, 4879681, 5308416, 5764801, 6250000,
    6765201, 7311616, 7890481, 8503056, 9150625,
    9834496, 10556001, 11316496, 12117361, 12960000,
    13845841, 14776336, 15752961, 16777216, 17850625,
    18974736, 20151121, 21381376, 22667121, 24010000,
    25411681, 26873856, 28398241, 29986576, 31640625,
    33362176, 35153041, 37015056, 38950081, 40960000,
    43046721, 45212176, 47458321, 49787136, 52200625,
    54700816, 57289761, 59969536, 62742241, 65610000,
    68574961, 71639296, 74805201, 78074896, 81450625,
    84934656, 88529281, 92236816, 96059601, 100000000,
];

Types.getLevel = function(exp){
    var i=1;
    for(i=1; i<90; i++){
        if(exp < Types.expForLevel[i]){
            return i;
        }
    }
    return 90;
};
Types.getWeaponRank = function(weaponKind) {
    return _.indexOf(Types.rankedWeapons, weaponKind);
};

Types.getArmorRank = function(armorKind) {
    return _.indexOf(Types.rankedArmors, armorKind);
};
Types.getMobExp = function(mobKind){
    return kinds.getMobExp(mobKind);
};
Types.getMobLevel = function(mobKind){
    return kinds.getMobLevel(mobKind);
};

Types.isPlayer = function(kind) {
    return kinds.getType(kind) === "player";
};

Types.isMob = function(kind) {
    return kinds.getType(kind) === "mob";
};

Types.isNpc = function(kind) {
    return kinds.getType(kind) === "npc";
};

Types.isBenef = function(kind) {
    return kinds.getType(kind) === "benef";
};

Types.isCharacter = function(kind) {
    return Types.isMob(kind) || Types.isNpc(kind) || Types.isPlayer(kind);
};

Types.isArmor = function(kind) {
    return kinds.getType(kind) === "armor";
};

Types.isWeapon = function(kind) {
    return kinds.getType(kind) === "weapon";
};

Types.isObject = function(kind) {
    return kinds.getType(kind) === "object";
};

Types.isChest = function(kind) {
    return kind === Types.Entities.CHEST;
};

Types.isItem = function(kind) {
    return Types.isWeapon(kind)
        || Types.isArmor(kind)
        || (Types.isObject(kind) && !Types.isChest(kind));
};

Types.isHealingItem = function(kind) {
    return kind === Types.Entities.FLASK
        || kind === Types.Entities.BURGER;
};

Types.isExpendableItem = function(kind) {
    return Types.isHealingItem(kind)
        || kind === Types.Entities.FIREPOTION
        || kind === Types.Entities.CAKE;
};

Types.getKindFromString = function(kind) {
    if(kind in kinds) {
        return kinds[kind][0];
    }
};

Types.getKindAsString = function(kind) {
    for(var k in kinds) {
        if(kinds[k][0] === kind) {
            return k;
        }
    }
};

Types.forEachKind = function(callback) {
    for(var k in kinds) {
        callback(kinds[k][0], k);
    }
};

Types.forEachArmor = function(callback) {
    Types.forEachKind(function(kind, kindName) {
        if(Types.isArmor(kind)) {
            callback(kind, kindName);
        }
    });
};

Types.forEachMobOrNpcKind = function(callback) {
    Types.forEachKind(function(kind, kindName) {
        if(Types.isMob(kind) || Types.isNpc(kind)) {
            callback(kind, kindName);
        }
    });
};

Types.forEachArmorKind = function(callback) {
    Types.forEachKind(function(kind, kindName) {
        if(Types.isArmor(kind)) {
            callback(kind, kindName);
        }
    });
};
Types.forEachWeaponKind = function(callback) {
    Types.forEachKind(function(kind, kindName) {
        if(Types.isWeapon(kind)) {
            callback(kind, kindName);
        }
    });
};

Types.getOrientationAsString = function(orientation) {
    switch(orientation) {
        case Types.Orientations.LEFT: return "left"; break;
        case Types.Orientations.RIGHT: return "right"; break;
        case Types.Orientations.UP: return "up"; break;
        case Types.Orientations.DOWN: return "down"; break;
    }
};

Types.getRandomItemKind = function(item) {
    var all = _.union(this.rankedWeapons, this.rankedArmors),
        forbidden = [Types.Entities.SWORD1, Types.Entities.CLOTHARMOR],
        itemKinds = _.difference(all, forbidden),
        i = Math.floor(Math.random() * _.size(itemKinds));

    return itemKinds[i];
};

Types.getMessageTypeAsString = function(type) {
    var typeName;
    _.each(Types.Messages, function(value, name) {
        if(value === type) {
            typeName = name;
        }
    });
    if(!typeName) {
        typeName = "UNKNOWN";
    }
    return typeName;
};

if(!(typeof exports === 'undefined')) {
    module.exports = Types;
}


var Types = require("../../shared/js/gametypes");

var Properties = {
    wizard: {
        drops: {
            flask: 50,
            platearmor: 5,
            firepotion: 5
        },
        hp: 80,
        armor: 1,
        weapon: 5,
    },
    rat: {
        drops: {
            flask: 40,
            burger: 10,
            firepotion: 5
        },
        hp: 25,
        armor: 2,
        weapon: 2,
    },
    bat: {
        drops: {
            flask: 50,
            sword2: 5,
            firepotion: 5
        },
        hp: 80,
        armor: 2,
        weapon: 2,
    },
    crab: {
        drops: {
            flask: 50,
            sword2: 5,
            firepotion: 5
        },
        hp: 100,
        armor: 2,
        weapon: 2,
    },
    goblin: {
        drops: {
            flask: 50,
            leatherarmor: 5,
            firepotion: 5
        },
        hp: 140,
        armor: 2,
        weapon: 2,
    },
    yellowfish: {
        drops: {
            flask: 50,
            leatherarmor: 5,
            firepotion: 5
        },
        hp: 140,
        armor: 2,
        weapon: 2,
    },
    skeleton: {
        drops: {
            flask: 40,
            axe: 5,
            firepotion: 5
        },
        hp: 240,
        armor: 3,
        weapon: 3,
    },
    greenfish: {
        drops: {
            flask: 40,
            axe: 5,
            firepotion: 5
        },
        hp: 240,
        armor: 3,
        weapon: 3,
    },
    snake: {
        drops: {
            flask: 50,
            mailarmor: 5,
            firepotion: 5
        },
        hp: 160,
        armor: 2,
        weapon: 5,
    },
    redfish: {
        drops: {
            flask: 50,
            mailarmor: 5,
            firepotion: 5
        },
        hp: 160,
        armor: 2,
        weapon: 5,
    },
    ogre: {
        drops: {
            burger: 10,
            flask: 50,
            morningstar: 5,
            firepotion: 5
        },
        hp: 360,
        armor: 2,
        weapon: 4,
    },
    clam: {
        drops: {
            burger: 10,
            flask: 50,
            morningstar: 5,
            firepotion: 5
        },
        hp: 360,
        armor: 2,
        weapon: 4,
    },
    skeleton2: {
        drops: {
            flask: 60,
            platearmor: 5,
            firepotion: 5
        },
        hp: 400,
        armor: 4,
        weapon: 6,
    },
    hermitcrab: {
        drops: {
            flask: 60,
            platearmor: 5,
            firepotion: 5
        },
        hp: 400,
        armor: 4,
        weapon: 6,
    },
    eye: {
        drops: {
            flask: 50,
            bluesword: 5,
            firepotion: 5
        },
        hp: 300,
        armor: 4,
        weapon: 8,
    },
    spectre: {
        drops: {
            flask: 30,
            redarmor: 5,
            firepotion: 5
        },
        hp: 200,
        armor: 4,
        weapon: 10,
    },
    deathknight: {
        drops: {
            burger: 65,
            redsword: 5,
            firepotion: 5
        },
        hp: 360,
        armor: 8,
        weapon: 8,
    },
    boss: {
        drops: {
            goldensword: 100
        },
        hp: 1400,
        armor: 10,
        weapon: 12,
    },
    mimic: {
        drops: {
            flask: 50,
            greenarmor: 5,
            firepotion: 5
        },
        hp: 540,
        armor: 9,
        weapon: 9,
    },
    orc: {
        drops: {
            flask: 50,
            greenarmor: 5,
            firepotion: 5
        },
        hp: 540,
        armor: 9,
        weapon: 9,
    },
    oldogre: {
        drops: {
            flask: 50,
            greenwingarmor: 5,
            firepotion: 5
        },
        hp: 700,
        armor: 9,
        weapon: 9,
    },
    golem: {
        drops: {
            flask: 50,
            greenwingarmor: 5,
            firepotion: 5
        },
        hp: 700,
        armor: 9,
        weapon: 9,
    },
    hobgoblin: {
        drops: {
            flask: 50,
            sidesword: 5,
            firepotion: 5
        },
        hp: 800,
        armor: 9,
        weapon: 9,
    },
    yellowmouse: {
        drops: {
            flask: 50,
            spear: 5,
            firepotion: 5
        },
        hp: 540,
        armor: 11,
        weapon: 11,
    },
    brownmouse: {
        drops: {
            flask: 50,
            guardarmor: 5,
            firepotion: 5
        },
        hp: 740,
        armor: 11,
        weapon: 11,
    },
    redguard: {
        drops: {
            flask: 50,
            redguardarmor: 5,
            firepotion: 5
        },
        hp: 600,
        armor: 13,
        weapon: 13,
    },
    redmouse: {
        drops: {
            flask: 50,
            scimitar: 5,
            firepotion: 5
        },
        hp: 800,
        armor: 13,
        weapon: 11,
    },
    infectedguard: {
        drops: {
            flask: 50,
            whitearmor: 5,
            firepotion: 5
        },
        hp: 800,
        armor: 13,
        weapon: 13,
    },
    livingarmor: {
        drops: {
            flask: 50,
            whitearmor: 5,
            firepotion: 5
        },
        hp: 800,
        armor: 13,
        weapon: 13,
    },
    whitemouse: {
        drops: {
            flask: 50,
            ratarmor: 5,
            firepotion: 5
        },
        hp: 900,
        armor: 13,
        weapon: 13,
    },
    mermaid: {
        drops: {
            flask: 50,
            trident: 5,
            firepotion: 5
        },
        hp: 1000,
        armor: 13,
        weapon: 13,
    },
    preta: {
        drops: {
            flask: 50,
            bluescimitar: 5,
            firepotion: 5
        },
        hp: 1000,
        armor: 14,
        weapon: 14,
    },
    pirateskeleton: {
        drops: {
            flask: 50,
            bluepiratearmor: 5,
            firepotion: 5
        },
        hp: 1000,
        armor: 15,
        weapon: 15,
    },
    vulture: {
        drops: {
            flask: 50,
            burger: 10,
            firepotion: 5
        },
        hp: 1150,
        armor: 16,
        weapon: 16,
    },
    penguin: {
        drops: {
            flask: 50,
            cheoliarmor: 5,
            firepotion: 5
        },
        hp: 1200,
        armor: 17,
        weapon: 17,
    },
    moleking: {
        drops: {
            flask: 50,
            hammer: 5,
            firepotion: 5
        },
        hp: 1400,
        armor: 19,
        weapon: 19,
    },
    darkskeleton: {
        drops: {
            flask: 50,
            dovakinarmor: 5,
            firepotion: 5
        },
        hp: 1600,
        armor: 21,
        weapon: 21,
    },
    darkscolpion: {
        drops: {
            flask: 50,
            burger: 10,
            firepotion: 5
        },
        hp: 1700,
        armor: 22,
        weapon: 22,
    },
    greenpirateskeleton: {
        drops: {
            flask: 50,
            gbwingarmor: 5,
            firepotion: 5
        },
        hp: 1800,
        armor: 23,
        weapon: 23,
    },
    blackpirateskeleton: {
        drops: {
            flask: 50,
            gbwingarmor: 5,
            firepotion: 5
        },
        hp: 2000,
        armor: 25,
        weapon: 25,
    },
    redpirateskeleton: {
        drops: {
            flask: 50,
            gbwingarmor: 5,
            firepotion: 5
        },
        hp: 2200,
        armor: 27,
        weapon: 27,
    },
    yellowpreta: {
        drops: {
            flask: 50,
            redwingarmor: 5,
            firepotion: 5
        },
        hp: 2400,
        armor: 29,
        weapon: 29,
    },
    bluepreta: {
        drops: {
            flask: 50,
            redwingarmor: 5,
            firepotion: 5
        },
        hp: 2600,
        armor: 31,
        weapon: 31,
    },
    miniknight: {
        drops: {
            flask: 50,
            snowfoxarmor: 5,
            firepotion: 5
        },
        hp: 2800,
        armor: 33,
        weapon: 33,
    },
    wolf: {
        drops: {
            flask: 50,
            wolfarmor: 5,
            firepotion: 5
        },
        hp: 3000,
        armor: 35,
        weapon: 35,
    },
    pinkelf: {
        drops: {
            flask: 50,
            greenlightsaber: 5,
            firepotion: 5
        },
        hp: 3200,
        armor: 37,
        weapon: 37,
    },
    skyelf: {
        drops: {
            flask: 50,
            skylightsaber: 5,
            firepotion: 5
        },
        hp: 3400,
        armor: 39,
        weapon: 39,
    },
    redelf: {
        drops: {
            flask: 50,
            redlightsaber: 5,
            firepotion: 5
        },
        hp: 3600,
        armor: 41,
        weapon: 41,
    },
    zombie: {
        drops: {
            flask: 50,
            bluewingarmor: 5,
            firepotion: 5
        },
        hp: 3800,
        armor: 43,
        weapon: 43,
    },
    piratecaptain: {
        drops: {
            flask: 50,
            bastardsword: 5,
            firepotion: 5
        },
        hp: 4000,
        armor: 45,
        weapon: 45,
    },
    ironogre: {
        drops: {
            flask: 50,
            fallenarmor: 5,
            firepotion: 5
        },
        hp: 4200,
        armor: 47,
        weapon: 47,
    },
    ogrelord: {
        drops: {
            flask: 50,
            redmetalsword: 5,
            firepotion: 5
        },
        hp: 4400,
        armor: 49,
        weapon: 49,
    },
    crystalscolpion: {
        drops: {
            flask: 50,
            crystalarmor: 5,
            firepotion: 5
        },
        hp: 4600,
        armor: 51,
        weapon: 51,
    },
    eliminator: {
        drops: {
            flask: 50,
            paladinarmor: 2,
            justicehammer: 2,
            firepotion: 5
        },
        hp: 5000,
        armor: 55,
        weapon: 55,
    },
    adherer: {
        drops: {
            flask: 50,
            adhererrobe: 5,
            firepotion: 5
        },
        hp: 5500,
        armor: 59,
        weapon: 59,
    },
    miniiceknight: {
        drops: {
            flask: 50,
            icerose: 5,
            firepotion: 5
        },
        hp: 6000,
        armor: 63,
        weapon: 63,
    },
    iceknight: {
        drops: {
            flask: 50,
            schooluniform: 5,
            firepotion: 5
        },
        hp: 6500,
        armor: 67,
        weapon: 67,
    },
    icegolem: {
        drops: {
            flask: 50,
            halberd: 5,
            firepotion: 5
        },
        hp: 7000,
        armor: 71,
        weapon: 71,
    },
    snowwolf: {
        drops: {
            flask: 50,
            taekwondo: 5,
            firepotion: 5
        },
        hp: 7500,
        armor: 75,
        weapon: 75,
    },
    cobra: {
        drops: {
            flask: 50,
            whip: 5,
            firepotion: 5
        },
        hp: 8000,
        armor: 80,
        weapon: 80,
    },
    darkogre: {
        drops: {
            flask: 50,
            gayarmor: 5,
            firepotion: 5
        },
        hp: 8500,
        armor: 85,
        weapon: 85,
    },
    snowelf: {
        drops: {
            flask: 50,
            theifarmor: 5,
            firepotion: 5
        },
        hp: 5500,
        armor: 59,
        weapon: 59,
    },
    whitebear: {
        drops: {
            flask: 50,
            ninjaarmor: 5,
            firepotion: 5
        },
        hp: 6500,
        armor: 66,
        weapon: 66,
    },
    nightmareregion: {
        drops: {
            flask: 50,
            dragonarmor: 5,
            firepotion: 5
        },
        hp: 7500,
        armor: 74,
        weapon: 74,
    },
    snowrabbit: {
        drops: {
            flask: 50,
            icerose: 5,
            firepotion: 5
        },
        hp: 8000,
        armor: 78,
        weapon: 78,
    },
    desertscolpion: {
        drops: {
            flask: 50,
            firepotion: 5
        },
        hp: 1400,
        armor: 19,
        weapon: 19,
    },
    frostqueen: {
        drops: {
            flask: 50,
            frostarmor: 5,
            firepotion: 5
        },
        hp: 9500,
        armor: 88,
        weapon: 88,
    },
    goldgolem: {
        drops: {
            flask: 50,
            schooluniform: 5,
            firepotion: 5
        },
        hp: 12000,
        armor: 102,
        weapon: 102,
    },
    darkregionillusion: {
        drops: {
            flask: 50,
            beautifullife: 5,
            firepotion: 5
        },
        hp: 13000,
        armor: 107,
        weapon: 107,
    },
    darkregion: {
        drops: {
            flask: 50,
            regionarmor: 5,
            firepotion: 5
        },
        hp: 14000,
        armor: 112,
        weapon: 112,
    },
    forestdragon: {
        drops: {
            flask: 50,
            forestguardiansword: 5,
            ghostrider: 5,
            firepotion: 5
        },
        hp: 15000,
        armor: 117,
        weapon: 117,
    },
};

Properties.getArmorLevel = function(kind) {
    try {
        if(Types.isMob(kind)) {
            return Properties[Types.getKindAsString(kind)].armor;
        } else {
            return Types.getArmorRank(kind) + 1;
        }
    } catch(e) {
        log.error("No level found for armor: "+Types.getKindAsString(kind));
        log.error('Error stack: ' + e.stack);
    }
};

Properties.getWeaponLevel = function(kind) {
    try {
        if(Types.isMob(kind)) {
            return Properties[Types.getKindAsString(kind)].weapon;
        } else {
            return Types.getWeaponRank(kind) + 1;
        }
    } catch(e) {
        log.error("No level found for weapon: "+Types.getKindAsString(kind));
        log.error('Error stack: ' + e.stack);
    }
};

Properties.getHitPoints = function(kind) {
    return Properties[Types.getKindAsString(kind)].hp;
};
Properties.getExp = function(kind){
    return Properties[Types.getKindAsString(kind)].exp;
};

module.exports = Properties;


var Types = require("../../shared/js/gametypes");

var Properties = {
    wizard: {
        drops: {
            flask: 50,
            platearmor: 5,
            firepotion: 5
        },
        hp: 80,
    },
    crab: {
        drops: {
            flask: 50,
            firepotion: 5
        },
        hp: 25,
    },
    rat: {
        drops: {
            flask: 50,
            sword2: 20,
            firepotion: 5
        },
        hp: 80,
    },
    bat: {
        drops: {
            flask: 50,
            sword2: 20,
            firepotion: 5
        },
        hp: 100,
    },
    goblin: {
        drops: {
            flask: 50,
            leatherarmor: 20,
            firepotion: 5
        },
        hp: 140,
    },
    yellowfish: {
        drops: {
            flask: 50,
            leatherarmor: 20,
            firepotion: 5
        },
        hp: 140,
    },
    skeleton: {
        drops: {
            flask: 40,
            axe: 20,
            firepotion: 5
        },
        hp: 240,
    },
    greenfish: {
        drops: {
            flask: 40,
            axe: 20,
            firepotion: 5
        },
        hp: 240,
    },
    snake: {
        drops: {
            flask: 50,
            mailarmor: 20,
            firepotion: 5
        },
        hp: 300,
    },
    redfish: {
        drops: {
            flask: 50,
            mailarmor: 20,
            firepotion: 5
        },
        hp: 300,
    },
    ogre: {
        drops: {
            burger: 10,
            flask: 50,
            morningstar: 20,
            firepotion: 5
        },
        hp: 300,
    },
    clam: {
        drops: {
            burger: 10,
            flask: 50,
            morningstar: 20,
            firepotion: 5
        },
        hp: 300,
    },
    skeleton2: {
        drops: {
            flask: 60,
            platearmor: 20,
            firepotion: 5
        },
        hp: 300,
    },
    hermitcrab: {
        drops: {
            flask: 60,
            platearmor: 20,
            firepotion: 5
        },
        hp: 300,
    },
    eye: {
        drops: {
            flask: 50,
            bluesword: 20,
            firepotion: 5
        },
        hp: 300,
    },
    spectre: {
        drops: {
            flask: 30,
            redarmor: 20,
            firepotion: 5
        },
        hp: 300,
    },
    deathknight: {
        drops: {
            burger: 30,
            redsword: 20,
            firepotion: 5
        },
        hp: 360,
    },
    skeletonking: {
        drops: {
            goldensword: 100
        },
        hp: 1400,
    },
    mimic: {
        drops: {
            burger: 30,
            greenarmor: 5,
            firepotion: 5
        },
        hp: 540,
    },
    orc: {
        drops: {
            burger: 30,
            greenarmor: 5,
            firepotion: 5
        },
        hp: 540,
    },
    oldogre: {
        drops: {
            burger: 30,
            greenwingarmor: 5,
            firepotion: 5
        },
        hp: 700,
    },
    golem: {
        drops: {
            burger: 30,
            greenwingarmor: 5,
            firepotion: 5
        },
        hp: 700,
    },
    hobgoblin: {
        drops: {
            burger: 30,
            sidesword: 5,
            firepotion: 5
        },
        hp: 800,
    },
    yellowmouse: {
        drops: {
            burger: 30,
            spear: 5,
            firepotion: 5
        },
        hp: 540,
    },
    brownmouse: {
        drops: {
            burger: 30,
            guardarmor: 5,
            firepotion: 5
        },
        hp: 740,
    },
    redguard: {
        drops: {
            burger: 30,
            redguardarmor: 5,
            firepotion: 5
        },
        hp: 600,
    },
    redmouse: {
        drops: {
            burger: 30,
            scimitar: 5,
            firepotion: 5
        },
        hp: 800,
    },
    infectedguard: {
        drops: {
            burger: 30,
            whitearmor: 5,
            firepotion: 5
        },
        hp: 800,
    },
    livingarmor: {
        drops: {
            burger: 30,
            whitearmor: 5,
            firepotion: 5
        },
        hp: 800,
    },
    whitemouse: {
        drops: {
            burger: 30,
            ratarmor: 5,
            firepotion: 5
        },
        hp: 900,
    },
    mermaid: {
        drops: {
            burger: 30,
            trident: 5,
            firepotion: 5
        },
        hp: 1000,
    },
    preta: {
        drops: {
            burger: 30,
            bluescimitar: 5,
            firepotion: 5
        },
        hp: 1000,
    },
    pirateskeleton: {
        drops: {
            burger: 30,
            bluepiratearmor: 5,
            firepotion: 5
        },
        hp: 1000,
    },
    vulture: {
        drops: {
            burger: 30,
            firepotion: 5
        },
        hp: 1150,
    },
    penguin: {
        drops: {
            burger: 30,
            cheoliarmor: 5,
            firepotion: 5
        },
        hp: 1200,
    },
    desertscolpion: {
        drops: {
            burger: 30,
            firepotion: 5
        },
        hp: 1300,
    },
    moleking: {
        drops: {
            burger: 30,
            hammer: 5,
            firepotion: 5
        },
        hp: 1400,
    },
    darkskeleton: {
        drops: {
            burger: 30,
            dovakinarmor: 5,
            firepotion: 5
        },
        hp: 1500,
    },
    darkscolpion: {
        drops: {
            burger: 30,
            firepotion: 5
        },
        hp: 1700,
    },
    greenpirateskeleton: {
        drops: {
            burger: 30,
            gbwingarmor: 5,
            firepotion: 5
        },
        hp: 1800,
    },
    blackpirateskeleton: {
        drops: {
            burger: 30,
            gbwingarmor: 5,
            firepotion: 5
        },
        hp: 1900,
    },
    redpirateskeleton: {
        drops: {
            burger: 30,
            gbwingarmor: 5,
            firepotion: 5
        },
        hp: 2000,
    },
    yellowpreta: {
        drops: {
            burger: 30,
            redwingarmor: 5,
            firepotion: 5
        },
        hp: 2100,
    },
    bluepreta: {
        drops: {
            burger: 30,
            redwingarmor: 5,
            firepotion: 5
        },
        hp: 2200,
    },
    miniknight: {
        drops: {
            burger: 30,
            snowfoxarmor: 5,
            firepotion: 5
        },
        hp: 2300,
    },
    wolf: {
        drops: {
            burger: 30,
            wolfarmor: 5,
        },
        hp: 2500,
    },
    pinkelf: {
        drops: {
            burger: 30,
            greenlightsaber: 5,
            firepotion: 5
        },
        hp: 2700,
    },
    skyelf: {
        drops: {
            burger: 30,
            skylightsaber: 5,
            firepotion: 5
        },
        hp: 2900,
    },
    redelf: {
        drops: {
            burger: 30,
            redlightsaber: 5,
            firepotion: 5
        },
        hp: 3100,
    },
    zombie: {
        drops: {
            burger: 30,
            bluewingarmor: 5,
            firepotion: 5
        },
        hp: 3300,
    },
    piratecaptain: {
        drops: {
            burger: 30,
            bastardsword: 5,
            firepotion: 5
        },
        hp: 3500,
    },
    ironogre: {
        drops: {
            burger: 30,
            fallenarmor: 5,
            firepotion: 5
        },
        hp: 3700,
    },
    ogrelord: {
        drops: {
            burger: 30,
            redmetalsword: 5,
            firepotion: 5
        },
        hp: 3900,
    },
    crystalscolpion: {
        drops: {
            burger: 30,
            crystalarmor: 5,
            firepotion: 5
        },
        hp: 4100,
    },
    eliminator: {
        drops: {
            burger: 30,
            paladinarmor: 2,
            justicehammer: 2,
            firepotion: 5
        },
        hp: 4300,
    },
    adherer: {
        drops: {
            burger: 30,
            adhererrobe: 5,
            firepotion: 5
        },
        hp: 4500,
    },
    miniiceknight: {
        drops: {
            burger: 30,
            icerose: 5,
            firepotion: 5
        },
        hp: 4700,
    },
    iceknight: {
        drops: {
            burger: 30,
            schooluniform: 5,
            firepotion: 5
        },
        hp: 4900,
    },
    icegolem: {
        drops: {
            burger: 30,
            halberd: 5,
            firepotion: 5
        },
        hp: 5100,
    },
    snowwolf: {
        drops: {
            burger: 30,
            taekwondo: 5,
            firepotion: 5
        },
        hp: 5300,
    },
    cobra: {
        drops: {
            burger: 30,
            whip: 5,
            firepotion: 5
        },
        hp: 5500,
    },
    darkogre: {
        drops: {
            burger: 30,
            gayarmor: 5,
            firepotion: 5
        },
        hp: 5700,
    },
    snowelf: {
        drops: {
            burger: 30,
            ninjaarmor: 5,
            firepotion: 5
        },
        hp: 5900,
    },
    forestdragon: {
        drops: {
            burger: 30,
            forestguardiansword: 5,
            firepotion: 5
        },
        hp: 6100,
    },
    pain: {
        drops: {
            burger: 30,
            beautifullife: 5,
            firepotion: 5
        },
        hp: 6300,
    },
    whitebear: {
        drops: {
            burger: 30,
            thiefarmor: 5,
            firepotion: 5
        },
        hp: 6500,
    },
    snowrabbit: {
        drops: {
            burger: 30,
            rabbitarmor: 5,
            firepotion: 5
        },
        hp: 6700,
    },
    icevulture: {
        drops: {
            burger: 30,
            sickle: 5,
            firepotion: 5
        },
        hp: 6900,
    },
    darkregionillusion: {
        drops: {
            burger: 30,
            portalarmor: 5,
            firepotion: 5
        },
        hp: 7100,
    },
    regionhenchman: {
        drops: {
            burger: 30,
            ghostrider: 5,
            firepotion: 5
        },
        hp: 7300,
    },
    purplepreta: {
        drops: {
            burger: 30,
            plunger: 5,
            firepotion: 5
        },
        hp: 7500,
    },
    flaredeathknight: {
        drops: {
            burger: 30,
            redsickle: 5,
            firepotion: 5
        },
        hp: 7700,
    },
    snowlady: {
        drops: {
            burger: 30,
            daywalker: 5,
            firepotion: 5
        },
        hp: 7900,
    },
    frostqueen: {
        drops: {
            burger: 30,
            frostarmor: 5,
            firepotion: 5
        },
        hp: 8100,
    },
    darkregion: {
        drops: {
            burger: 30,
            regionarmor: 5,
            firepotion: 5
        },
        hp: 8300,
    },
    nightmareregion: {
        drops: {
            burger: 30,
            purplecloudkallege: 5,
            firepotion: 5
        },
        hp: 8500,
    },
    seadragon: {
        drops: {
            burger: 30,
            searage: 3,
            seadragonarmor: 3,
            firepotion: 5
        },
        hp: 8700,
    },
    goldgolem: {
        drops: {
            burger: 30,
            schooluniform: 5,
            firepotion: 5
        },
        hp: 12000,
    },
};

Properties.getArmorLevel = function(kind) {
    try {
        return Types.getArmorRank(kind) + 1;
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

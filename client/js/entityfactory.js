
define(['mobs', 'items', 'npcs', 'warrior', 'chest'], function(Mobs, Items, NPCs, Warrior, Chest) {

    var EntityFactory = {};

    EntityFactory.createEntity = function(kind, id, name) {
        if(!kind) {
            log.error("kind is undefined", true);
            return;
        }

        if(!_.isFunction(EntityFactory.builders[kind])) {
            throw Error(kind + " is not a valid Entity type");
        }

        return EntityFactory.builders[kind](id, name);
    };

    //===== mobs ======

    EntityFactory.builders = [];

    EntityFactory.builders[Types.Entities.WARRIOR] = function(id, name) {
        return new Warrior(id, name);
    };

    EntityFactory.builders[Types.Entities.RAT] = function(id) {
        return new Mobs.Rat(id);
    };

    EntityFactory.builders[Types.Entities.SKELETON] = function(id) {
        return new Mobs.Skeleton(id);
    };

    EntityFactory.builders[Types.Entities.SKELETON2] = function(id) {
        return new Mobs.Skeleton2(id);
    };

    EntityFactory.builders[Types.Entities.SPECTRE] = function(id) {
        return new Mobs.Spectre(id);
    };

    EntityFactory.builders[Types.Entities.DEATHKNIGHT] = function(id) {
        return new Mobs.Deathknight(id);
    };

    EntityFactory.builders[Types.Entities.GOBLIN] = function(id) {
        return new Mobs.Goblin(id);
    };

    EntityFactory.builders[Types.Entities.OGRE] = function(id) {
        return new Mobs.Ogre(id);
    };

    EntityFactory.builders[Types.Entities.CRAB] = function(id) {
        return new Mobs.Crab(id);
    };

    EntityFactory.builders[Types.Entities.SNAKE] = function(id) {
        return new Mobs.Snake(id);
    };

    EntityFactory.builders[Types.Entities.EYE] = function(id) {
        return new Mobs.Eye(id);
    };

    EntityFactory.builders[Types.Entities.BAT] = function(id) {
        return new Mobs.Bat(id);
    };

    EntityFactory.builders[Types.Entities.WIZARD] = function(id) {
        return new Mobs.Wizard(id);
    };

    EntityFactory.builders[Types.Entities.SKELETONKING] = function(id) {
        return new Mobs.Skeletonking(id);
    };
    EntityFactory.builders[Types.Entities.ORC] = function(id) {
        return new Mobs.Orc(id);
    };
    EntityFactory.builders[Types.Entities.GOLEM] = function(id) {
        return new Mobs.Golem(id);
    };
    EntityFactory.builders[Types.Entities.OLDOGRE] = function(id) {
        return new Mobs.Oldogre(id);
    };
    EntityFactory.builders[Types.Entities.MIMIC] = function(id) {
        return new Mobs.Mimic(id);
    };
    EntityFactory.builders[Types.Entities.HOBGOBLIN] = function(id) {
        return new Mobs.Hobgoblin(id);
    };
    EntityFactory.builders[Types.Entities.YELLOWMOUSE] = function(id) {
        return new Mobs.Yellowmouse(id);
    };
    EntityFactory.builders[Types.Entities.WHITEMOUSE] = function(id) {
        return new Mobs.Whitemouse(id);
    };
    EntityFactory.builders[Types.Entities.BROWNMOUSE] = function(id) {
        return new Mobs.Brownmouse(id);
    };
    EntityFactory.builders[Types.Entities.REDMOUSE] = function(id) {
        return new Mobs.Redmouse(id);
    };
    EntityFactory.builders[Types.Entities.REDGUARD] = function(id) {
        return new Mobs.Redguard(id);
    };
    EntityFactory.builders[Types.Entities.INFECTEDGUARD] = function(id) {
        return new Mobs.Infectedguard(id);
    };
    EntityFactory.builders[Types.Entities.LIVINGARMOR] = function(id) {
        return new Mobs.Livingarmor(id);
    };
    EntityFactory.builders[Types.Entities.MERMAID] = function(id) {
        return new Mobs.Mermaid(id);
    };
    EntityFactory.builders[Types.Entities.YELLOWFISH] = function(id) {
        return new Mobs.Yellowfish(id);
    };
    EntityFactory.builders[Types.Entities.GREENFISH] = function(id) {
        return new Mobs.Greenfish(id);
    };
    EntityFactory.builders[Types.Entities.REDFISH] = function(id) {
        return new Mobs.Redfish(id);
    };
    EntityFactory.builders[Types.Entities.CLAM] = function(id) {
        return new Mobs.Clam(id);
    };
    EntityFactory.builders[Types.Entities.PRETA] = function(id) {
        return new Mobs.Preta(id);
    };
    EntityFactory.builders[Types.Entities.PIRATESKELETON] = function(id) {
        return new Mobs.Pirateskeleton(id);
    };
    EntityFactory.builders[Types.Entities.PENGUIN] = function(id) {
        return new Mobs.Penguin(id);
    };
    EntityFactory.builders[Types.Entities.MOLEKING] = function(id) {
        return new Mobs.Moleking(id);
    };
    EntityFactory.builders[Types.Entities.DARKSKELETON] = function(id) {
        return new Mobs.Darkskeleton(id);
    };
    EntityFactory.builders[Types.Entities.GREENPIRATESKELETON] = function(id) {
        return new Mobs.Greenpirateskeleton(id);
    };
    EntityFactory.builders[Types.Entities.BLACKPIRATESKELETON] = function(id) {
        return new Mobs.Blackpirateskeleton(id);
    };
    EntityFactory.builders[Types.Entities.REDPIRATESKELETON] = function(id) {
        return new Mobs.Redpirateskeleton(id);
    };
    EntityFactory.builders[Types.Entities.YELLOWPRETA] = function(id) {
        return new Mobs.Yellowpreta(id);
    };
    EntityFactory.builders[Types.Entities.BLUEPRETA] = function(id) {
        return new Mobs.Bluepreta(id);
    };
    EntityFactory.builders[Types.Entities.MINIKNIGHT] = function(id) {
        return new Mobs.Miniknight(id);
    };
    EntityFactory.builders[Types.Entities.WOLF] = function(id) {
        return new Mobs.Wolf(id);
    };
    EntityFactory.builders[Types.Entities.PINKELF] = function(id) {
        return new Mobs.Pinkelf(id);
    };
    EntityFactory.builders[Types.Entities.SKYELF] = function(id) {
        return new Mobs.Skyelf(id);
    };
    EntityFactory.builders[Types.Entities.REDELF] = function(id) {
        return new Mobs.Redelf(id);
    };
    EntityFactory.builders[Types.Entities.HERMITCRAB] = function(id) {
        return new Mobs.Hermitcrab(id);
    };
    EntityFactory.builders[Types.Entities.ZOMBIE] = function(id) {
        return new Mobs.Zombie(id);
    };
    EntityFactory.builders[Types.Entities.PIRATECAPTAIN] = function(id) {
        return new Mobs.Piratecaptain(id);
    };
    EntityFactory.builders[Types.Entities.IRONOGRE] = function(id) {
        return new Mobs.Ironogre(id);
    };
    EntityFactory.builders[Types.Entities.OGRELORD] = function(id) {
        return new Mobs.Ogrelord(id);
    };
    EntityFactory.builders[Types.Entities.ADHERER] = function(id) {
        return new Mobs.Adherer(id);
    };
    EntityFactory.builders[Types.Entities.ICEGOLEM] = function(id) {
        return new Mobs.Icegolem(id);
    };    
    EntityFactory.builders[Types.Entities.DESERTSCOLPION] = function(id) {
        return new Mobs.Desertscolpion(id);
    };
    EntityFactory.builders[Types.Entities.DARKSCOLPION] = function(id) {
        return new Mobs.Darkscolpion(id);
    };
    EntityFactory.builders[Types.Entities.VULTURE] = function(id) {
        return new Mobs.Vulture(id);
    };
    EntityFactory.builders[Types.Entities.FORESTDRAGON] = function(id) {
        return new Mobs.Forestdragon(id);
    };
    EntityFactory.builders[Types.Entities.CRYSTALSCOLPION] = function(id) {
        return new Mobs.Crystalscolpion(id);
    };
    EntityFactory.builders[Types.Entities.ELIMINATOR] = function(id) {
        return new Mobs.Eliminator(id);
    };
    EntityFactory.builders[Types.Entities.FROSTQUEEN] = function(id) {
        return new Mobs.Frostqueen(id);
    };
    EntityFactory.builders[Types.Entities.SNOWRABBIT] = function(id) {
        return new Mobs.Snowrabbit(id);
    };
    EntityFactory.builders[Types.Entities.SNOWWOLF] = function(id) {
        return new Mobs.Snowwolf(id);
    };
    EntityFactory.builders[Types.Entities.ICEKNIGHT] = function(id) {
        return new Mobs.Iceknight(id);
    };
    EntityFactory.builders[Types.Entities.MINIICEKNIGHT] = function(id) {
        return new Mobs.Miniiceknight(id);
    };
    EntityFactory.builders[Types.Entities.SNOWELF] = function(id) {
        return new Mobs.Snowelf(id);
    };
    EntityFactory.builders[Types.Entities.WHITEBEAR] = function(id) {
        return new Mobs.Whitebear(id);
    };
    EntityFactory.builders[Types.Entities.COBRA] = function(id) {
        return new Mobs.Cobra(id);
    };
    EntityFactory.builders[Types.Entities.GOLDGOLEM] = function(id) {
        return new Mobs.Goldgolem(id);
    };
    EntityFactory.builders[Types.Entities.DARKREGION] = function(id) {
        return new Mobs.Darkregion(id);
    };
    EntityFactory.builders[Types.Entities.DARKREGIONILLUSION] = function(id) {
        return new Mobs.Darkregionillusion(id);
    };
    EntityFactory.builders[Types.Entities.NIGHTMAREREGION] = function(id) {
        return new Mobs.Nightmareregion(id);
    };
    EntityFactory.builders[Types.Entities.DARKOGRE] = function(id) {
        return new Mobs.Darkogre(id);
    };
    EntityFactory.builders[Types.Entities.PAIN] = function(id) {
        return new Mobs.Pain(id);
    };
    EntityFactory.builders[Types.Entities.ICEVULTURE] = function(id) {
        return new Mobs.Icevulture(id);
    };
    EntityFactory.builders[Types.Entities.REGIONHENCHMAN] = function(id) {
        return new Mobs.Regionhenchman(id);
    };
    EntityFactory.builders[Types.Entities.PURPLEPRETA] = function(id) {
        return new Mobs.Purplepreta(id);
    };
    EntityFactory.builders[Types.Entities.FLAREDEATHKNIGHT] = function(id) {
        return new Mobs.Flaredeathknight(id);
    };
    EntityFactory.builders[Types.Entities.SNOWLADY] = function(id) {
        return new Mobs.Snowlady(id);
    };
    EntityFactory.builders[Types.Entities.SEADRAGON] = function(id) {
        return new Mobs.Seadragon(id);
    };

    //===== items ======

    EntityFactory.builders[Types.Entities.SWORD2] = function(id) {
        return new Items.Sword2(id);
    };

    EntityFactory.builders[Types.Entities.AXE] = function(id) {
        return new Items.Axe(id);
    };

    EntityFactory.builders[Types.Entities.REDSWORD] = function(id) {
        return new Items.RedSword(id);
    };

    EntityFactory.builders[Types.Entities.BLUESWORD] = function(id) {
        return new Items.BlueSword(id);
    };

    EntityFactory.builders[Types.Entities.GOLDENSWORD] = function(id) {
        return new Items.GoldenSword(id);
    };

    EntityFactory.builders[Types.Entities.MORNINGSTAR] = function(id) {
        return new Items.MorningStar(id);
    };
    EntityFactory.builders[Types.Entities.SIDESWORD] = function(id) {
        return new Items.SideSword(id);
    };
    EntityFactory.builders[Types.Entities.SPEAR] = function(id) {
        return new Items.Spear(id);
    };
    EntityFactory.builders[Types.Entities.SCIMITAR] = function(id) {
        return new Items.Scimitar(id);
    };
    EntityFactory.builders[Types.Entities.TRIDENT] = function(id) {
        return new Items.Trident(id);
    };
    EntityFactory.builders[Types.Entities.BLUESCIMITAR] = function(id) {
        return new Items.Bluescimitar(id);
    };
    EntityFactory.builders[Types.Entities.HAMMER] = function(id) {
        return new Items.Hammer(id);
    };
    EntityFactory.builders[Types.Entities.GREENLIGHTSABER] = function(id) {
        return new Items.Greenlightsaber(id);
    };
    EntityFactory.builders[Types.Entities.SKYLIGHTSABER] = function(id) {
        return new Items.Skylightsaber(id);
    };
    EntityFactory.builders[Types.Entities.REDLIGHTSABER] = function(id) {
        return new Items.Redlightsaber(id);
    };
    EntityFactory.builders[Types.Entities.REDMETALSWORD] = function(id) {
        return new Items.Redmetalsword(id);
    };
    EntityFactory.builders[Types.Entities.BASTARDSWORD] = function(id) {
        return new Items.Bastardsword(id);
    };
    EntityFactory.builders[Types.Entities.HALBERD] = function(id) {
        return new Items.Halberd(id);
    };
    EntityFactory.builders[Types.Entities.ROSE] = function(id) {
        return new Items.Rose(id);
    };
    EntityFactory.builders[Types.Entities.ICEROSE] = function(id) {
        return new Items.Icerose(id);
    };
    EntityFactory.builders[Types.Entities.JUSTICEHAMMER] = function(id) {
        return new Items.Justicehammer(id);
    };
    EntityFactory.builders[Types.Entities.FIRESWORD] = function(id) {
        return new Items.Firesword(id);
    };
    EntityFactory.builders[Types.Entities.WHIP] = function(id) {
        return new Items.Whip(id);
    };
    EntityFactory.builders[Types.Entities.FORESTGUARDIANSWORD] = function(id) {
        return new Items.Forestguardiansword(id);
    };
    EntityFactory.builders[Types.Entities.SICKLE] = function(id) {
        return new Items.Sickle(id);
    };
    EntityFactory.builders[Types.Entities.PLUNGER] = function(id) {
        return new Items.Plunger(id);
    };
    EntityFactory.builders[Types.Entities.REDSICKLE] = function(id) {
        return new Items.Redsickle(id);
    };
    EntityFactory.builders[Types.Entities.DAYWALKER] = function(id) {
        return new Items.Daywalker(id);
    };
    EntityFactory.builders[Types.Entities.PURPLECLOUDKALLEGE] = function(id) {
        return new Items.Purplecloudkallege(id);
    };
    EntityFactory.builders[Types.Entities.SEARAGE] = function(id) {
        return new Items.Searage(id);
    };

    EntityFactory.builders[Types.Entities.CLOTHARMOR] = function(id) {
        return new Items.ClothArmor(id);
    };

    EntityFactory.builders[Types.Entities.MAILARMOR] = function(id) {
        return new Items.MailArmor(id);
    };

    EntityFactory.builders[Types.Entities.LEATHERARMOR] = function(id) {
        return new Items.LeatherArmor(id);
    };

    EntityFactory.builders[Types.Entities.PLATEARMOR] = function(id) {
        return new Items.PlateArmor(id);
    };

    EntityFactory.builders[Types.Entities.REDARMOR] = function(id) {
        return new Items.RedArmor(id);
    };

    EntityFactory.builders[Types.Entities.GOLDENARMOR] = function(id) {
        return new Items.GoldenArmor(id);
    };
    EntityFactory.builders[Types.Entities.GREENARMOR] = function(id) {
        return new Items.GreenArmor(id);
    };
    EntityFactory.builders[Types.Entities.GREENWINGARMOR] = function(id) {
        return new Items.GreenWingArmor(id);
    };
    EntityFactory.builders[Types.Entities.GUARDARMOR] = function(id) {
        return new Items.GuardArmor(id);
    };
    EntityFactory.builders[Types.Entities.REDGUARDARMOR] = function(id) {
        return new Items.RedGuardArmor(id);
    };
    EntityFactory.builders[Types.Entities.WHITEARMOR] = function(id) {
        return new Items.WhiteArmor(id);
    };
    EntityFactory.builders[Types.Entities.RATARMOR] = function(id) {
        return new Items.RatArmor(id);
    };
    EntityFactory.builders[Types.Entities.BLUEPIRATEARMOR] = function(id) {
        return new Items.BluepirateArmor(id);
    };
    EntityFactory.builders[Types.Entities.CHEOLIARMOR] = function(id) {
        return new Items.CheoliArmor(id);
    };
    EntityFactory.builders[Types.Entities.DOVAKINARMOR] = function(id) {
        return new Items.DovakinArmor(id);
    };
    EntityFactory.builders[Types.Entities.GBWINGARMOR] = function(id) {
        return new Items.GbwingArmor(id);
    };
    EntityFactory.builders[Types.Entities.REDWINGARMOR] = function(id) {
        return new Items.RedwingArmor(id);
    };
    EntityFactory.builders[Types.Entities.SNOWFOXARMOR] = function(id) {
        return new Items.SnowfoxArmor(id);
    };
    EntityFactory.builders[Types.Entities.WOLFARMOR] = function(id) {
        return new Items.WolfArmor(id);
    };
    EntityFactory.builders[Types.Entities.BLUEWINGARMOR] = function(id) {
        return new Items.BluewingArmor(id);
    };
    EntityFactory.builders[Types.Entities.THIEFARMOR] = function(id) {
        return new Items.ThiefArmor(id);
    };
    EntityFactory.builders[Types.Entities.NINJAARMOR] = function(id) {
        return new Items.NinjaArmor(id);
    };
    EntityFactory.builders[Types.Entities.DRAGONARMOR] = function(id) {
        return new Items.DragonArmor(id);
    };
    EntityFactory.builders[Types.Entities.FALLENARMOR] = function(id) {
        return new Items.FallenArmor(id);
    };
    EntityFactory.builders[Types.Entities.PALADINARMOR] = function(id) {
        return new Items.PaladinArmor(id);
    };
    EntityFactory.builders[Types.Entities.CRYSTALARMOR] = function(id) {
        return new Items.CrystalArmor(id);
    };
    EntityFactory.builders[Types.Entities.ADHERERROBE] = function(id) {
        return new Items.AdhererRobe(id);
    };
    EntityFactory.builders[Types.Entities.FROSTARMOR] = function(id) {
        return new Items.FrostArmor(id);
    };
    EntityFactory.builders[Types.Entities.GAYARMOR] = function(id) {
        return new Items.GayArmor(id);
    };
    EntityFactory.builders[Types.Entities.SCHOOLUNIFORM] = function(id) {
        return new Items.SchoolUniform(id);
    };
    EntityFactory.builders[Types.Entities.BEAUTIFULLIFE] = function(id) {
        return new Items.BeautifulLife(id);
    };
    EntityFactory.builders[Types.Entities.REGIONARMOR] = function(id) {
        return new Items.RegionArmor(id);
    };
    EntityFactory.builders[Types.Entities.GHOSTRIDER] = function(id) {
        return new Items.GhostRider(id);
    };
    EntityFactory.builders[Types.Entities.TAEKWONDO] = function(id) {
        return new Items.Taekwondo(id);
    };
    EntityFactory.builders[Types.Entities.ADMINARMOR] = function(id) {
        return new Items.AdminArmor(id);
    };
    EntityFactory.builders[Types.Entities.RABBITARMOR] = function(id) {
        return new Items.RabbitArmor(id);
    };
    EntityFactory.builders[Types.Entities.PORTALARMOR] = function(id) {
        return new Items.PortalArmor(id);
    };
    EntityFactory.builders[Types.Entities.PIRATEKING] = function(id) {
        return new Items.PirateKing(id);
    };
    EntityFactory.builders[Types.Entities.SEADRAGONARMOR] = function(id) {
        return new Items.SeadragonArmor(id);
    };

    EntityFactory.builders[Types.Entities.FLASK] = function(id) {
        return new Items.Flask(id);
    };

    EntityFactory.builders[Types.Entities.FIREPOTION] = function(id) {
        return new Items.FirePotion(id);
    };

    EntityFactory.builders[Types.Entities.BURGER] = function(id) {
        return new Items.Burger(id);
    };

    EntityFactory.builders[Types.Entities.CAKE] = function(id) {
        return new Items.Cake(id);
    };

    EntityFactory.builders[Types.Entities.CHEST] = function(id) {
        return new Chest(id);
    };
    EntityFactory.builders[Types.Entities.BOOK] = function(id) {
        return new Items.Book(id);
    };
    EntityFactory.builders[Types.Entities.CD] = function(id) {
        return new Items.Cd(id);
    };

    //====== NPCs ======

    EntityFactory.builders[Types.Entities.GUARD] = function(id) {
        return new NPCs.Guard(id);
    };

    EntityFactory.builders[Types.Entities.KING] = function(id) {
        return new NPCs.King(id);
    };

    EntityFactory.builders[Types.Entities.VILLAGEGIRL] = function(id) {
        return new NPCs.VillageGirl(id);
    };

    EntityFactory.builders[Types.Entities.VILLAGER] = function(id) {
        return new NPCs.Villager(id);
    };

    EntityFactory.builders[Types.Entities.CODER] = function(id) {
        return new NPCs.Coder(id);
    };

    EntityFactory.builders[Types.Entities.AGENT] = function(id) {
        return new NPCs.Agent(id);
    };

    EntityFactory.builders[Types.Entities.RICK] = function(id) {
        return new NPCs.Rick(id);
    };

    EntityFactory.builders[Types.Entities.SCIENTIST] = function(id) {
        return new NPCs.Scientist(id);
    };

    EntityFactory.builders[Types.Entities.NYAN] = function(id) {
        return new NPCs.Nyan(id);
    };

    EntityFactory.builders[Types.Entities.PRIEST] = function(id) {
        return new NPCs.Priest(id);
    };

    EntityFactory.builders[Types.Entities.SORCERER] = function(id) {
        return new NPCs.Sorcerer(id);
    };

    EntityFactory.builders[Types.Entities.OCTOCAT] = function(id) {
        return new NPCs.Octocat(id);
    };

    EntityFactory.builders[Types.Entities.BEACHNPC] = function(id) {
        return new NPCs.BeachNpc(id);
    };

    EntityFactory.builders[Types.Entities.FORESTNPC] = function(id) {
        return new NPCs.ForestNpc(id);
    };

    EntityFactory.builders[Types.Entities.DESERTNPC] = function(id) {
        return new NPCs.DesertNpc(id);
    };

    EntityFactory.builders[Types.Entities.LAVANPC] = function(id) {
        return new NPCs.LavaNpc(id);
    };

    return EntityFactory;
});

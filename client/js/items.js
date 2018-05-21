
define(['item'], function(Item) {

    var Items = {

        Sword2: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SWORD2, "weapon");
                this.lootMessage = "You get a steel sword";
            },
        }),

        Axe: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.AXE, "weapon");
                this.lootMessage = "You get an axe";
            },
        }),

        RedSword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDSWORD, "weapon");
                this.lootMessage = "You get a blazing sword";
            },
        }),

        BlueSword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BLUESWORD, "weapon");
                this.lootMessage = "You get a magic sword";
            },
        }),

        GoldenSword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GOLDENSWORD, "weapon");
                this.lootMessage = "You get the ultimate sword";
            },
        }),

        MorningStar: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.MORNINGSTAR, "weapon");
                this.lootMessage = "You get a morning star";
            },
        }),

        SideSword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SIDESWORD, "weapon");
                this.lootMessage = "You get a side sword";
            },
        }),
        Spear: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SPEAR, "weapon");
                this.lootMessage = "You get a spear";
            },
        }),
        Scimitar: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SCIMITAR, "weapon");
                this.lootMessage = "You get a scimitar";
            },
        }),
        Trident: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.TRIDENT, "weapon");
                this.lootMessage = "You get a trident";
            },
        }),
        Bluescimitar: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BLUESCIMITAR, "weapon");
                this.lootMessage = "You get a blue scimitar";
            },
        }),
        Hammer: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.HAMMER, "weapon");
                this.lootMessage = "You get a hammer";
            },
        }),
        Greenlightsaber: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GREENLIGHTSABER, "weapon");
                this.lootMessage = "You get a green light saber";
            },
        }),
        Skylightsaber: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SKYLIGHTSABER, "weapon");
                this.lootMessage = "You get a sky light saber";
            },
        }),
        Redlightsaber: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDLIGHTSABER, "weapon");
                this.lootMessage = "You get a red light saber";
            },
        }),
        Redmetalsword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDMETALSWORD, "weapon");
                this.lootMessage = "You get a red metal sword";
            },
        }),
        Bastardsword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BASTARDSWORD, "weapon");
                this.lootMessage = "You get a bastard sword";
            },
        }),
        Halberd: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.HALBERD, "weapon");
                this.lootMessage = "You get a halberd";
            },
        }),
        Rose: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.ROSE, "weapon");
                this.lootMessage = "You get a rose";
            },
        }),
        Icerose: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.ICEROSE, "weapon");
                this.lootMessage = "You get a ice rose";
            },
        }),
        Justicehammer: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.JUSTICEHAMMER, "weapon");
                this.lootMessage = "You get a justice hammer";
            },
        }),
        Firesword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FIRESWORD, "weapon");
                this.lootMessage = "You get a fire sword";
            },
        }),
        Whip: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.WHIP, "weapon");
                this.lootMessage = "You get a whip";
            },
        }),
        Forestguardiansword: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FORESTGUARDIANSWORD, "weapon");
                this.lootMessage = "You get a forest guardian sword";
            },
        }),
        Sickle: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SICKLE, "weapon");
                this.lootMessage = "You get a Sickle";
            },
        }),
        Plunger: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.PLUNGER, "weapon");
                this.lootMessage = "You get a Plunger";
            },
        }),
        Redsickle: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDSICKLE, "weapon");
                this.lootMessage = "You get a red sickle";
            },
        }),
        Daywalker: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.DAYWALKER, "weapon");
                this.lootMessage = "You get a day walker";
            },
        }),
        Purplecloudkallege: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.PURPLECLOUDKALLEGE, "weapon");
                this.lootMessage = "You get a Purple cloud kallege";
            },
        }),
        Searage: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SEARAGE, "weapon");
                this.lootMessage = "You get a sea rage";
            },
        }),

        ClothArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.CLOTHARMOR, "armor");
                this.lootMessage = "You get cloth armor";
            },
        }),

        LeatherArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.LEATHERARMOR, "armor");
                this.lootMessage = "You equip a leather armor";
            },
        }),

        MailArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.MAILARMOR, "armor");
                this.lootMessage = "You equip a mail armor";
            },
        }),

        PlateArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.PLATEARMOR, "armor");
                this.lootMessage = "You equip a plate armor";
            },
        }),

        RedArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDARMOR, "armor");
                this.lootMessage = "You equip a ruby armor";
            },
        }),

        GoldenArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GOLDENARMOR, "armor");
                this.lootMessage = "You equip a golden armor";
            },
        }),

        GreenArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GREENARMOR, "armor");
                this.lootMessage = "You get a green armor";
            },
        }),
        GreenWingArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GREENWINGARMOR, "armor");
                this.lootMessage = "You get a green wing";
            },
        }),
        GuardArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GUARDARMOR, "armor");
                this.lootMessage = "You get a guard armor";
            },
        }),
        RedGuardArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDGUARDARMOR, "armor");
                this.lootMessage = "You get a red guard armor";
            },
        }),
        WhiteArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.WHITEARMOR, "armor");
                this.lootMessage = "You get a white armor";
            },
        }),
        RatArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.RATARMOR, "armor");
                this.lootMessage = "You get a rat armor";
            },
        }),
        BluepirateArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BLUEPIRATEARMOR, "armor");
                this.lootMessage = "You get a blue pirate armor";
            },
        }),
        CheoliArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.CHEOLIARMOR, "armor");
                this.lootMessage = "You get a cheoli armor";
            },
        }),
        DovakinArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.DOVAKINARMOR, "armor");
                this.lootMessage = "You get a dovakin armor";
            },
        }),
        GbwingArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GBWINGARMOR, "armor");
                this.lootMessage = "You get a gbwing armor";
            },
        }),
        RedwingArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REDWINGARMOR, "armor");
                this.lootMessage = "You get a red wing armor";
            },
        }),
        SnowfoxArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SNOWFOXARMOR, "armor");
                this.lootMessage = "You get a snow fox armor";
            },
        }),
        WolfArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.WOLFARMOR, "armor");
                this.lootMessage = "You get a wolf armor";
            },
        }),
        BluewingArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BLUEWINGARMOR, "armor");
                this.lootMessage = "You get a blue wing armor";
            },
        }),
        ThiefArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.THIEFARMOR, "armor");
                this.lootMessage = "You get a thief armor";
            },
        }),
        NinjaArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.NINJAARMOR, "armor");
                this.lootMessage = "You get a ninja armor";
            },
        }),
        DragonArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.DRAGONARMOR, "armor");
                this.lootMessage = "You get a dragon armor";
            },
        }),
        FallenArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FALLENARMOR, "armor");
                this.lootMessage = "You get a fallen armor";
            },
        }),
        PaladinArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.PALADINARMOR, "armor");
                this.lootMessage = "You get a paladin armor";
            },
        }),
        CrystalArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.CRYSTALARMOR, "armor");
                this.lootMessage = "You get a crystal armor";
            },
        }),
        AdhererRobe: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.ADHERERROBE, "armor");
                this.lootMessage = "You get a adherer robe";
            },
        }),
        FrostArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FROSTARMOR, "armor");
                this.lootMessage = "You get a frost armor";
            },
        }),
        GayArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GAYARMOR, "armor");
                this.lootMessage = "You get a gay armor";
            },
        }),
        SchoolUniform: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SCHOOLUNIFORM, "armor");
                this.lootMessage = "You get a school uniform";
            },
        }),
        BeautifulLife: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BEAUTIFULLIFE, "armor");
                this.lootMessage = "You get a beuatiful life";
            },
        }),
        RegionArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.REGIONARMOR, "armor");
                this.lootMessage = "You get a region armor";
            },
        }),
        GhostRider: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.GHOSTRIDER, "armor");
                this.lootMessage = "You get a ghost rider";
            },
        }),
        Taekwondo: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.TAEKWONDO, "armor");
                this.lootMessage = "You get a taekwondo";
            },
        }),
        AdminArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.ADMINARMOR, "armor");
                this.lootMessage = "You get a admin armor";
            },
        }),
        RabbitArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.RABBITARMOR, "armor");
                this.lootMessage = "You get a rabbit armor";
            },
        }),
        PortalArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.PORTALARMOR, "armor");
                this.lootMessage = "You get a portal armor";
            },
        }),
        PirateKing: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.PIRATEKING, "armor");
                this.lootMessage = "You get a pirate king";
            },
        }),
        SeadragonArmor: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.SEADRAGONARMOR, "armor");
                this.lootMessage = "You get a sea dragon armor";
            },
        }),

        Flask: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FLASK, "object");
                this.lootMessage = "You drink a health potion";
            },
        }),

        Cake: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.CAKE, "object");
                this.lootMessage = "You eat a cake";
            },
        }),

        Burger: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BURGER, "object");
                this.lootMessage = "You can haz rat burger";
            },
        }),

        FirePotion: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.FIREPOTION, "object");
                this.lootMessage = "You feel the power of Firefox!";
            },

            onLoot: function(player) {
                player.startInvincibility();
            },
        }),
        Book: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.BOOK, "object");
                this.lootMessage = "You get a book";
            },
        }),
        Cd: Item.extend({
            init: function(id) {
                this._super(id, Types.Entities.CD, "object");
                this.lootMessage = "You cat a CD";
            },
        }),
    };

    return Items;
});

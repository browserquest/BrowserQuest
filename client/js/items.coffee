define ["item"], (Item) ->
    Items =
        Sword2: Item.extend(init: (id) ->
            @_super id, Types.Entities.SWORD2, "weapon"
            @lootMessage = "You pick up a steel sword"
        )
        Axe: Item.extend(init: (id) ->
            @_super id, Types.Entities.AXE, "weapon"
            @lootMessage = "You pick up an axe"
        )
        RedSword: Item.extend(init: (id) ->
            @_super id, Types.Entities.REDSWORD, "weapon"
            @lootMessage = "You pick up a blazing sword"
        )
        BlueSword: Item.extend(init: (id) ->
            @_super id, Types.Entities.BLUESWORD, "weapon"
            @lootMessage = "You pick up a magic sword"
        )
        GoldenSword: Item.extend(init: (id) ->
            @_super id, Types.Entities.GOLDENSWORD, "weapon"
            @lootMessage = "You pick up the ultimate sword"
        )
        MorningStar: Item.extend(init: (id) ->
            @_super id, Types.Entities.MORNINGSTAR, "weapon"
            @lootMessage = "You pick up a morning star"
        )
        LeatherArmor: Item.extend(init: (id) ->
            @_super id, Types.Entities.LEATHERARMOR, "armor"
            @lootMessage = "You equip a leather armor"
        )
        MailArmor: Item.extend(init: (id) ->
            @_super id, Types.Entities.MAILARMOR, "armor"
            @lootMessage = "You equip a mail armor"
        )
        PlateArmor: Item.extend(init: (id) ->
            @_super id, Types.Entities.PLATEARMOR, "armor"
            @lootMessage = "You equip a plate armor"
        )
        RedArmor: Item.extend(init: (id) ->
            @_super id, Types.Entities.REDARMOR, "armor"
            @lootMessage = "You equip a ruby armor"
        )
        GoldenArmor: Item.extend(init: (id) ->
            @_super id, Types.Entities.GOLDENARMOR, "armor"
            @lootMessage = "You equip a golden armor"
        )
        Flask: Item.extend(init: (id) ->
            @_super id, Types.Entities.FLASK, "object"
            @lootMessage = "You drink a health potion"
        )
        Cake: Item.extend(init: (id) ->
            @_super id, Types.Entities.CAKE, "object"
            @lootMessage = "You eat a cake"
        )
        Burger: Item.extend(init: (id) ->
            @_super id, Types.Entities.BURGER, "object"
            @lootMessage = "You can haz rat burger"
        )
        FirePotion: Item.extend(
            init: (id) ->
                @_super id, Types.Entities.FIREPOTION, "object"
                @lootMessage = "You feel the power of Firefox!"

            onLoot: (player) ->
                player.startInvincibility()
        )

    Items

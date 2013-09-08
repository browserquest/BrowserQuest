define ['entity'], (Entity) ->
    class Item extends Entity
        constructor: (id, kind, @type) ->
            super id, kind

            @itemKind = Types.getKindAsString kind
            @wasDropped = false

        hasShadow: -> true

        onLoot: (player) ->
            if @type == "weapon"
                player.switchWeapon @itemKind
            else if @type == "armor"
                player.armorloot_callback @itemKind

        getSpriteName: ->
            "item-" + @itemKind

        getLootMessage: ->
            @lootMessage

    Item

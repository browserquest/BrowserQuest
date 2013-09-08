define ['player'], (Player) ->
    class Warrior extends Player
        constructor: (id, name) ->
            super id, name, Types.Entities.WARRIOR

    Warrior
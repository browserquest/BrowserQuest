define ["player"], (Player) ->
  Warrior = Player.extend(init: (id, name) ->
    @_super id, name, Types.Entities.WARRIOR
  )
  Warrior


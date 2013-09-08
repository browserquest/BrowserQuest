define ["character"], (Character) ->
  Mob = Character.extend(init: (id, kind) ->
    @_super id, kind
    @aggroRange = 1
    @isAggressive = true
  )
  Mob


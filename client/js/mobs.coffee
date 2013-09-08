define ["mob", "timer"], (Mob, Timer) ->
  Mobs =
    Rat: Mob.extend(init: (id) ->
      @_super id, Types.Entities.RAT
      @moveSpeed = 350
      @idleSpeed = 700
      @shadowOffsetY = -2
      @isAggressive = false
    )
    Skeleton: Mob.extend(init: (id) ->
      @_super id, Types.Entities.SKELETON
      @moveSpeed = 350
      @atkSpeed = 100
      @idleSpeed = 800
      @shadowOffsetY = 1
      @setAttackRate 1300
    )
    Skeleton2: Mob.extend(init: (id) ->
      @_super id, Types.Entities.SKELETON2
      @moveSpeed = 200
      @atkSpeed = 100
      @idleSpeed = 800
      @walkSpeed = 200
      @shadowOffsetY = 1
      @setAttackRate 1300
    )
    Spectre: Mob.extend(init: (id) ->
      @_super id, Types.Entities.SPECTRE
      @moveSpeed = 150
      @atkSpeed = 50
      @idleSpeed = 200
      @walkSpeed = 200
      @shadowOffsetY = 1
      @setAttackRate 900
    )
    Deathknight: Mob.extend(
      init: (id) ->
        @_super id, Types.Entities.DEATHKNIGHT
        @atkSpeed = 50
        @moveSpeed = 220
        @walkSpeed = 100
        @idleSpeed = 450
        @setAttackRate 800
        @aggroRange = 3

      idle: (orientation) ->
        unless @hasTarget()
          @_super Types.Orientations.DOWN
        else
          @_super orientation
    )
    Goblin: Mob.extend(init: (id) ->
      @_super id, Types.Entities.GOBLIN
      @moveSpeed = 150
      @atkSpeed = 60
      @idleSpeed = 600
      @setAttackRate 700
    )
    Ogre: Mob.extend(init: (id) ->
      @_super id, Types.Entities.OGRE
      @moveSpeed = 300
      @atkSpeed = 100
      @idleSpeed = 600
    )
    Crab: Mob.extend(init: (id) ->
      @_super id, Types.Entities.CRAB
      @moveSpeed = 200
      @atkSpeed = 40
      @idleSpeed = 500
    )
    Snake: Mob.extend(init: (id) ->
      @_super id, Types.Entities.SNAKE
      @moveSpeed = 200
      @atkSpeed = 40
      @idleSpeed = 250
      @walkSpeed = 100
      @shadowOffsetY = -4
    )
    Eye: Mob.extend(init: (id) ->
      @_super id, Types.Entities.EYE
      @moveSpeed = 200
      @atkSpeed = 40
      @idleSpeed = 50
    )
    Bat: Mob.extend(init: (id) ->
      @_super id, Types.Entities.BAT
      @moveSpeed = 120
      @atkSpeed = 90
      @idleSpeed = 90
      @walkSpeed = 85
      @isAggressive = false
    )
    Wizard: Mob.extend(init: (id) ->
      @_super id, Types.Entities.WIZARD
      @moveSpeed = 200
      @atkSpeed = 100
      @idleSpeed = 150
    )
    Boss: Mob.extend(
      init: (id) ->
        @_super id, Types.Entities.BOSS
        @moveSpeed = 300
        @atkSpeed = 50
        @idleSpeed = 400
        @atkRate = 2000
        @attackCooldown = new Timer(@atkRate)
        @aggroRange = 3

      idle: (orientation) ->
        unless @hasTarget()
          @_super Types.Orientations.DOWN
        else
          @_super orientation
    )

  Mobs


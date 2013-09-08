define ["entity", "transition", "timer"], (Entity, Transition, Timer) ->
  Character = Entity.extend(
    init: (id, kind) ->
      self = this
      @_super id, kind
      
      # Position and orientation
      @nextGridX = -1
      @nextGridY = -1
      @orientation = Types.Orientations.DOWN
      
      # Speeds
      @atkSpeed = 50
      @moveSpeed = 120
      @walkSpeed = 100
      @idleSpeed = 450
      @setAttackRate 800
      
      # Pathing
      @movement = new Transition()
      @path = null
      @newDestination = null
      @adjacentTiles = {}
      
      # Combat
      @target = null
      @unconfirmedTarget = null
      @attackers = {}
      
      # Health
      @hitPoints = 0
      @maxHitPoints = 0
      
      # Modes
      @isDead = false
      @attackingMode = false
      @followingMode = false
      @inspecting = null

    clean: ->
      @forEachAttacker (attacker) ->
        attacker.disengage()
        attacker.idle()


    setMaxHitPoints: (hp) ->
      @maxHitPoints = hp
      @hitPoints = hp

    setDefaultAnimation: ->
      @idle()

    hasWeapon: ->
      false

    hasShadow: ->
      true

    animate: (animation, speed, count, onEndCount) ->
      oriented = ["atk", "walk", "idle"]
      o = @orientation
      unless @currentAnimation and @currentAnimation.name is "death" # don't change animation if the character is dying
        @flipSpriteX = false
        @flipSpriteY = false
        if _.indexOf(oriented, animation) >= 0
          animation += "_" + ((if o is Types.Orientations.LEFT then "right" else Types.getOrientationAsString(o)))
          @flipSpriteX = (if (@orientation is Types.Orientations.LEFT) then true else false)
        @setAnimation animation, speed, count, onEndCount

    turnTo: (orientation) ->
      @orientation = orientation
      @idle()

    setOrientation: (orientation) ->
      @orientation = orientation  if orientation

    idle: (orientation) ->
      @setOrientation orientation
      @animate "idle", @idleSpeed

    hit: (orientation) ->
      @setOrientation orientation
      @animate "atk", @atkSpeed, 1

    walk: (orientation) ->
      @setOrientation orientation
      @animate "walk", @walkSpeed

    moveTo_: (x, y, callback) ->
      @destination =
        gridX: x
        gridY: y

      @adjacentTiles = {}
      if @isMoving()
        @continueTo x, y
      else
        path = @requestPathfindingTo(x, y)
        @followPath path

    requestPathfindingTo: (x, y) ->
      if @request_path_callback
        @request_path_callback x, y
      else
        log.error @id + " couldn't request pathfinding to " + x + ", " + y
        []

    onRequestPath: (callback) ->
      @request_path_callback = callback

    onStartPathing: (callback) ->
      @start_pathing_callback = callback

    onStopPathing: (callback) ->
      @stop_pathing_callback = callback

    followPath: (path) ->
      if path.length > 1 # Length of 1 means the player has clicked on himself
        @path = path
        @step = 0
        # following a character
        path.pop()  if @followingMode
        @start_pathing_callback path  if @start_pathing_callback
        @nextStep()

    continueTo: (x, y) ->
      @newDestination =
        x: x
        y: y

    updateMovement: ->
      p = @path
      i = @step
      @walk Types.Orientations.LEFT  if p[i][0] < p[i - 1][0]
      @walk Types.Orientations.RIGHT  if p[i][0] > p[i - 1][0]
      @walk Types.Orientations.UP  if p[i][1] < p[i - 1][1]
      @walk Types.Orientations.DOWN  if p[i][1] > p[i - 1][1]

    updatePositionOnGrid: ->
      @setGridPosition @path[@step][0], @path[@step][1]

    nextStep: ->
      stop = false
      x = undefined
      y = undefined
      path = undefined
      if @isMoving()
        @before_step_callback()  if @before_step_callback
        @updatePositionOnGrid()
        @checkAggro()
        if @interrupted # if Character.stop() has been called
          stop = true
          @interrupted = false
        else
          if @hasNextStep()
            @nextGridX = @path[@step + 1][0]
            @nextGridY = @path[@step + 1][1]
          @step_callback()  if @step_callback
          if @hasChangedItsPath()
            x = @newDestination.x
            y = @newDestination.y
            path = @requestPathfindingTo(x, y)
            @newDestination = null
            if path.length < 2
              stop = true
            else
              @followPath path
          else if @hasNextStep()
            @step += 1
            @updateMovement()
          else
            stop = true
        if stop # Path is complete or has been interrupted
          @path = null
          @idle()
          @stop_pathing_callback @gridX, @gridY  if @stop_pathing_callback

    onBeforeStep: (callback) ->
      @before_step_callback = callback

    onStep: (callback) ->
      @step_callback = callback

    isMoving: ->
      (@path isnt null)

    hasNextStep: ->
      @path.length - 1 > @step

    hasChangedItsPath: ->
      (@newDestination isnt null)

    isNear: (character, distance) ->
      dx = undefined
      dy = undefined
      near = false
      dx = Math.abs(@gridX - character.gridX)
      dy = Math.abs(@gridY - character.gridY)
      near = true  if dx <= distance and dy <= distance
      near

    onAggro: (callback) ->
      @aggro_callback = callback

    onCheckAggro: (callback) ->
      @checkaggro_callback = callback

    checkAggro: ->
      @checkaggro_callback()  if @checkaggro_callback

    aggro: (character) ->
      @aggro_callback character  if @aggro_callback

    onDeath: (callback) ->
      @death_callback = callback

    
    ###
    Changes the character's orientation so that it is facing its target.
    ###
    lookAtTarget: ->
      @turnTo @getOrientationTo(@target)  if @target

    
    ###
    ###
    go: (x, y) ->
      if @isAttacking()
        @disengage()
      else if @followingMode
        @followingMode = false
        @target = null
      @moveTo_ x, y

    
    ###
    Makes the character follow another one.
    ###
    follow: (entity) ->
      if entity
        @followingMode = true
        @moveTo_ entity.gridX, entity.gridY

    
    ###
    Stops a moving character.
    ###
    stop: ->
      @interrupted = true  if @isMoving()

    
    ###
    Makes the character attack another character. Same as Character.follow but with an auto-attacking behavior.
    @see Character.follow
    ###
    engage: (character) ->
      @attackingMode = true
      @setTarget character
      @follow character

    disengage: ->
      @attackingMode = false
      @followingMode = false
      @removeTarget()

    
    ###
    Returns true if the character is currently attacking.
    ###
    isAttacking: ->
      @attackingMode

    
    ###
    Gets the right orientation to face a target character from the current position.
    Note:
    In order to work properly, this method should be used in the following
    situation :
    S
    S T S
    S
    (where S is self, T is target character)
    
    @param {Character} character The character to face.
    @returns {String} The orientation.
    ###
    getOrientationTo: (character) ->
      if @gridX < character.gridX
        Types.Orientations.RIGHT
      else if @gridX > character.gridX
        Types.Orientations.LEFT
      else if @gridY > character.gridY
        Types.Orientations.UP
      else
        Types.Orientations.DOWN

    
    ###
    Returns true if this character is currently attacked by a given character.
    @param {Character} character The attacking character.
    @returns {Boolean} Whether this is an attacker of this character.
    ###
    isAttackedBy: (character) ->
      character.id of @attackers

    
    ###
    Registers a character as a current attacker of this one.
    @param {Character} character The attacking character.
    ###
    addAttacker: (character) ->
      unless @isAttackedBy(character)
        @attackers[character.id] = character
      else
        log.error @id + " is already attacked by " + character.id

    
    ###
    Unregisters a character as a current attacker of this one.
    @param {Character} character The attacking character.
    ###
    removeAttacker: (character) ->
      if @isAttackedBy(character)
        delete @attackers[character.id]
      else
        log.error @id + " is not attacked by " + character.id

    
    ###
    Loops through all the characters currently attacking this one.
    @param {Function} callback Function which must accept one character argument.
    ###
    forEachAttacker: (callback) ->
      _.each @attackers, (attacker) ->
        callback attacker


    
    ###
    Sets this character's attack target. It can only have one target at any time.
    @param {Character} character The target character.
    ###
    setTarget: (character) ->
      if @target isnt character # If it's not already set as the target
        @removeTarget()  if @hasTarget() # Cleanly remove the previous one
        @unconfirmedTarget = null
        @target = character
        if @settarget_callback
          targetName = Types.getKindAsString(character.kind)
          @settarget_callback character, targetName
      else
        log.debug character.id + " is already the target of " + @id

    onSetTarget: (callback) ->
      @settarget_callback = callback

    showTarget: (character) ->
      if @inspecting isnt character
        @inspecting = character
        if @settarget_callback
          targetName = Types.getKindAsString(character.kind)
          @settarget_callback character, targetName, true

    
    ###
    Removes the current attack target.
    ###
    removeTarget: ->
      self = this
      if @target
        @target.removeAttacker this  if @target instanceof Character
        @removetarget_callback @target.id  if @removetarget_callback
        @target = null

    onRemoveTarget: (callback) ->
      @removetarget_callback = callback

    
    ###
    Returns true if this character has a current attack target.
    @returns {Boolean} Whether this character has a target.
    ###
    hasTarget: ->
      (@target isnt null)

    
    ###
    Marks this character as waiting to attack a target.
    By sending an "attack" message, the server will later confirm (or not)
    that this character is allowed to acquire this target.
    
    @param {Character} character The target character
    ###
    waitToAttack: (character) ->
      @unconfirmedTarget = character

    
    ###
    Returns true if this character is currently waiting to attack the target character.
    @param {Character} character The target character.
    @returns {Boolean} Whether this character is waiting to attack.
    ###
    isWaitingToAttack: (character) ->
      @unconfirmedTarget is character

    
    ###
    ###
    canAttack: (time) ->
      return true  if @canReachTarget() and @attackCooldown.isOver(time)
      false

    canReachTarget: ->
      return true  if @hasTarget() and @isAdjacentNonDiagonal(@target)
      false

    
    ###
    ###
    die: ->
      @removeTarget()
      @isDead = true
      @death_callback()  if @death_callback

    onHasMoved: (callback) ->
      @hasmoved_callback = callback

    hasMoved: ->
      @setDirty()
      @hasmoved_callback this  if @hasmoved_callback

    hurt: ->
      self = this
      @stopHurting()
      @sprite = @hurtSprite
      @hurting = setTimeout(@stopHurting.bind(this), 75)

    stopHurting: ->
      @sprite = @normalSprite
      clearTimeout @hurting

    setAttackRate: (rate) ->
      @attackCooldown = new Timer(rate)
  )
  Character


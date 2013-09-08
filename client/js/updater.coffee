define ["character", "timer"], (Character, Timer) ->
  Updater = Class.extend(
    init: (game) ->
      @game = game
      @playerAggroTimer = new Timer(1000)

    update: ->
      @updateZoning()
      @updateCharacters()
      @updatePlayerAggro()
      @updateTransitions()
      @updateAnimations()
      @updateAnimatedTiles()
      @updateChatBubbles()
      @updateInfos()
      @updateKeyboardMovement()

    updateCharacters: ->
      self = this
      @game.forEachEntity (entity) ->
        isCharacter = entity instanceof Character
        if entity.isLoaded
          if isCharacter
            self.updateCharacter entity
            self.game.onCharacterUpdate entity
          self.updateEntityFading entity


    updatePlayerAggro: ->
      t = @game.currentTime
      player = @game.player
      
      # Check player aggro every 1s when not moving nor attacking
      player.checkAggro()  if player and not player.isMoving() and not player.isAttacking() and @playerAggroTimer.isOver(t)

    updateEntityFading: (entity) ->
      if entity and entity.isFading
        duration = 1000
        t = @game.currentTime
        dt = t - entity.startFadingTime
        if dt > duration
          @isFading = false
          entity.fadingAlpha = 1
        else
          entity.fadingAlpha = dt / duration

    updateTransitions: ->
      self = this
      m = null
      z = @game.currentZoning
      @game.forEachEntity (entity) ->
        m = entity.movement
        m.step self.game.currentTime  if m.inProgress  if m

      z.step @game.currentTime  if z.inProgress  if z

    updateZoning: ->
      g = @game
      c = g.camera
      z = g.currentZoning
      s = 3
      ts = 16
      speed = 500
      if z and z.inProgress is false
        orientation = @game.zoningOrientation
        startValue = endValue = offset = 0
        updateFunc = null
        endFunc = null
        if orientation is Types.Orientations.LEFT or orientation is Types.Orientations.RIGHT
          offset = (c.gridW - 2) * ts
          startValue = (if (orientation is Types.Orientations.LEFT) then c.x - ts else c.x + ts)
          endValue = (if (orientation is Types.Orientations.LEFT) then c.x - offset else c.x + offset)
          updateFunc = (x) ->
            c.setPosition x, c.y
            g.initAnimatedTiles()
            g.renderer.renderStaticCanvases()

          endFunc = ->
            c.setPosition z.endValue, c.y
            g.endZoning()
        else if orientation is Types.Orientations.UP or orientation is Types.Orientations.DOWN
          offset = (c.gridH - 2) * ts
          startValue = (if (orientation is Types.Orientations.UP) then c.y - ts else c.y + ts)
          endValue = (if (orientation is Types.Orientations.UP) then c.y - offset else c.y + offset)
          updateFunc = (y) ->
            c.setPosition c.x, y
            g.initAnimatedTiles()
            g.renderer.renderStaticCanvases()

          endFunc = ->
            c.setPosition c.x, z.endValue
            g.endZoning()
        z.start @game.currentTime, updateFunc, endFunc, startValue, endValue, speed

    updateCharacter: (c) ->
      self = this
      
      # Estimate of the movement distance for one update
      tick = Math.round(16 / Math.round((c.moveSpeed / (1000 / @game.renderer.FPS))))
      if c.isMoving() and c.movement.inProgress is false
        if c.orientation is Types.Orientations.LEFT
          c.movement.start @game.currentTime, ((x) ->
            c.x = x
            c.hasMoved()
          ), (->
            c.x = c.movement.endValue
            c.hasMoved()
            c.nextStep()
          ), c.x - tick, c.x - 16, c.moveSpeed
        else if c.orientation is Types.Orientations.RIGHT
          c.movement.start @game.currentTime, ((x) ->
            c.x = x
            c.hasMoved()
          ), (->
            c.x = c.movement.endValue
            c.hasMoved()
            c.nextStep()
          ), c.x + tick, c.x + 16, c.moveSpeed
        else if c.orientation is Types.Orientations.UP
          c.movement.start @game.currentTime, ((y) ->
            c.y = y
            c.hasMoved()
          ), (->
            c.y = c.movement.endValue
            c.hasMoved()
            c.nextStep()
          ), c.y - tick, c.y - 16, c.moveSpeed
        else if c.orientation is Types.Orientations.DOWN
          c.movement.start @game.currentTime, ((y) ->
            c.y = y
            c.hasMoved()
          ), (->
            c.y = c.movement.endValue
            c.hasMoved()
            c.nextStep()
          ), c.y + tick, c.y + 16, c.moveSpeed

    updateKeyboardMovement: ->
      return  if not @game.player or @game.player.isMoving()
      game = @game
      player = @game.player
      pos =
        x: player.gridX
        y: player.gridY

      if player.moveUp
        pos.y -= 1
        game.keys pos, Types.Orientations.UP
      else if player.moveDown
        pos.y += 1
        game.keys pos, Types.Orientations.DOWN
      else if player.moveRight
        pos.x += 1
        game.keys pos, Types.Orientations.RIGHT
      else if player.moveLeft
        pos.x -= 1
        game.keys pos, Types.Orientations.LEFT

    updateAnimations: ->
      t = @game.currentTime
      @game.forEachEntity (entity) ->
        anim = entity.currentAnimation
        entity.setDirty()  if anim.update(t)  if anim

      sparks = @game.sparksAnimation
      sparks.update t  if sparks
      target = @game.targetAnimation
      target.update t  if target

    updateAnimatedTiles: ->
      self = this
      t = @game.currentTime
      @game.forEachAnimatedTile (tile) ->
        if tile.animate(t)
          tile.isDirty = true
          tile.dirtyRect = self.game.renderer.getTileBoundingRect(tile)
          self.game.checkOtherDirtyRects tile.dirtyRect, tile, tile.x, tile.y  if self.game.renderer.mobile or self.game.renderer.tablet


    updateChatBubbles: ->
      t = @game.currentTime
      @game.bubbleManager.update t

    updateInfos: ->
      t = @game.currentTime
      @game.infoManager.update t
  )
  Updater


{
  "type": "block",
  "src": "{",
  "value": "{",
  "lineno": 491,
  "children": [],
  "varDecls": [],
  "labels": {
    "table": {},
    "size": 0
  },
  "functions": [],
  "nonfunctions": [],
  "transformed": true
}
define ["camera", "item", "character", "player", "timer"], (Camera, Item, Character, Player, Timer) ->
  Renderer = Class.extend(
    init: (game, canvas, background, foreground) ->
      @game = game
      @context = (if (canvas and canvas.getContext) then canvas.getContext("2d") else null)
      @background = (if (background and background.getContext) then background.getContext("2d") else null)
      @foreground = (if (foreground and foreground.getContext) then foreground.getContext("2d") else null)
      @canvas = canvas
      @backcanvas = background
      @forecanvas = foreground
      @initFPS()
      @tilesize = 16
      @upscaledRendering = @context.mozImageSmoothingEnabled isnt `undefined`
      @supportsSilhouettes = @upscaledRendering
      @rescale @getScaleFactor()
      @lastTime = new Date()
      @frameCount = 0
      @maxFPS = @FPS
      @realFPS = 0
      
      #Turn on or off Debuginfo (FPS Counter)
      @isDebugInfoVisible = false
      @animatedTileCount = 0
      @highTileCount = 0
      @tablet = Detect.isTablet(window.innerWidth)
      @fixFlickeringTimer = new Timer(100)

    getWidth: ->
      @canvas.width

    getHeight: ->
      @canvas.height

    setTileset: (tileset) ->
      @tileset = tileset

    getScaleFactor: ->
      w = window.innerWidth
      h = window.innerHeight
      scale = undefined
      @mobile = false
      if w <= 1000
        scale = 2
        @mobile = true
      else if w <= 1500 or h <= 870
        scale = 2
      else
        scale = 3
      scale

    rescale: (factor) ->
      @scale = @getScaleFactor()
      @createCamera()
      @context.mozImageSmoothingEnabled = false
      @background.mozImageSmoothingEnabled = false
      @foreground.mozImageSmoothingEnabled = false
      @initFont()
      @initFPS()
      @setTileset @game.map.tilesets[@scale - 1]  if not @upscaledRendering and @game.map and @game.map.tilesets
      @game.setSpriteScale @scale  if @game.renderer

    createCamera: ->
      @camera = new Camera(this)
      @camera.rescale()
      @canvas.width = @camera.gridW * @tilesize * @scale
      @canvas.height = @camera.gridH * @tilesize * @scale
      log.debug "#entities set to " + @canvas.width + " x " + @canvas.height
      @backcanvas.width = @canvas.width
      @backcanvas.height = @canvas.height
      log.debug "#background set to " + @backcanvas.width + " x " + @backcanvas.height
      @forecanvas.width = @canvas.width
      @forecanvas.height = @canvas.height
      log.debug "#foreground set to " + @forecanvas.width + " x " + @forecanvas.height

    initFPS: ->
      @FPS = (if @mobile then 50 else 50)

    initFont: ->
      fontsize = undefined
      switch @scale
        when 1
          fontsize = 10
        when 2
          fontsize = (if Detect.isWindows() then 10 else 13)
        when 3
          fontsize = 20
      @setFontSize fontsize

    setFontSize: (size) ->
      font = size + "px GraphicPixel"
      @context.font = font
      @background.font = font

    drawText: (text, x, y, centered, color, strokeColor) ->
      ctx = @context
      strokeSize = undefined
      switch @scale
        when 1
          strokeSize = 3
        when 2
          strokeSize = 3
        when 3
          strokeSize = 5
      if text and x and y
        ctx.save()
        ctx.textAlign = "center"  if centered
        ctx.strokeStyle = strokeColor or "#373737"
        ctx.lineWidth = strokeSize
        ctx.strokeText text, x, y
        ctx.fillStyle = color or "white"
        ctx.fillText text, x, y
        ctx.restore()

    drawCellRect: (x, y, color) ->
      @context.save()
      @context.lineWidth = 2 * @scale
      @context.strokeStyle = color
      @context.translate x + 2, y + 2
      @context.strokeRect 0, 0, (@tilesize * @scale) - 4, (@tilesize * @scale) - 4
      @context.restore()

    drawRectStroke: (x, y, width, height, color) ->
      @context.fillStyle = color
      @context.fillRect x, y, (@tilesize * @scale) * width, (@tilesize * @scale) * height
      @context.fill()
      @context.lineWidth = 5
      @context.strokeStyle = "black"
      @context.strokeRect x, y, (@tilesize * @scale) * width, (@tilesize * @scale) * height

    drawRect: (x, y, width, height, color) ->
      @context.fillStyle = color
      @context.fillRect x, y, (@tilesize * @scale) * width, (@tilesize * @scale) * height

    drawCellHighlight: (x, y, color) ->
      s = @scale
      ts = @tilesize
      tx = x * ts * s
      ty = y * ts * s
      @drawCellRect tx, ty, color

    drawTargetCell: ->
      mouse = @game.getMouseGridPosition()
      @drawCellHighlight mouse.x, mouse.y, @game.targetColor  if @game.targetCellVisible and not (mouse.x is @game.selectedX and mouse.y is @game.selectedY)

    drawAttackTargetCell: ->
      mouse = @game.getMouseGridPosition()
      entity = @game.getEntityAt(mouse.x, mouse.y)
      s = @scale
      @drawCellRect entity.x * s, entity.y * s, "rgba(255, 0, 0, 0.5)"  if entity

    drawOccupiedCells: ->
      positions = @game.entityGrid
      if positions
        i = 0

        while i < positions.length
          j = 0

          while j < positions[i].length
            @drawCellHighlight i, j, "rgba(50, 50, 255, 0.5)"  unless _.isNull(positions[i][j])
            j += 1
          i += 1

    drawPathingCells: ->
      grid = @game.pathingGrid
      if grid and @game.debugPathing
        y = 0

        while y < grid.length
          x = 0

          while x < grid[y].length
            @drawCellHighlight x, y, "rgba(50, 50, 255, 0.5)"  if grid[y][x] is 1 and @game.camera.isVisiblePosition(x, y)
            x += 1
          y += 1

    drawSelectedCell: ->
      sprite = @game.cursors["target"]
      anim = @game.targetAnimation
      os = (if @upscaledRendering then 1 else @scale)
      ds = (if @upscaledRendering then @scale else 1)
      if @game.selectedCellVisible
        if @mobile or @tablet
          if @game.drawTarget
            x = @game.selectedX
            y = @game.selectedY
            @drawCellHighlight @game.selectedX, @game.selectedY, "rgb(51, 255, 0)"
            @lastTargetPos =
              x: x
              y: y

            @game.drawTarget = false
        else
          if sprite and anim
            frame = anim.currentFrame
            s = @scale
            x = frame.x * os
            y = frame.y * os
            w = sprite.width * os
            h = sprite.height * os
            ts = 16
            dx = @game.selectedX * ts * s
            dy = @game.selectedY * ts * s
            dw = w * ds
            dh = h * ds
            @context.save()
            @context.translate dx, dy
            @context.drawImage sprite.image, x, y, w, h, 0, 0, dw, dh
            @context.restore()

    clearScaledRect: (ctx, x, y, w, h) ->
      s = @scale
      ctx.clearRect x * s, y * s, w * s, h * s

    drawCursor: ->
      mx = @game.mouse.x
      my = @game.mouse.y
      s = @scale
      os = (if @upscaledRendering then 1 else @scale)
      @context.save()
      @context.drawImage @game.currentCursor.image, 0, 0, 14 * os, 14 * os, mx, my, 14 * s, 14 * s  if @game.currentCursor and @game.currentCursor.isLoaded
      @context.restore()

    drawScaledImage: (ctx, image, x, y, w, h, dx, dy) ->
      s = (if @upscaledRendering then 1 else @scale)
      _.each arguments_, (arg) ->
        if _.isUndefined(arg) or _.isNaN(arg) or _.isNull(arg) or arg < 0
          log.error "x:" + x + " y:" + y + " w:" + w + " h:" + h + " dx:" + dx + " dy:" + dy, true
          throw Error("A problem occured when trying to draw on the canvas")

      ctx.drawImage image, x * s, y * s, w * s, h * s, dx * @scale, dy * @scale, w * @scale, h * @scale

    drawTile: (ctx, tileid, tileset, setW, gridW, cellid) ->
      s = (if @upscaledRendering then 1 else @scale)
      # -1 when tile is empty in Tiled. Don't attempt to draw it.
      @drawScaledImage ctx, tileset, getX(tileid + 1, (setW / s)) * @tilesize, Math.floor(tileid / (setW / s)) * @tilesize, @tilesize, @tilesize, getX(cellid + 1, gridW) * @tilesize, Math.floor(cellid / gridW) * @tilesize  if tileid isnt -1

    clearTile: (ctx, gridW, cellid) ->
      s = @scale
      ts = @tilesize
      x = getX(cellid + 1, gridW) * ts * s
      y = Math.floor(cellid / gridW) * ts * s
      w = ts * s
      h = w
      ctx.clearRect x, y, h, w

    drawEntity: (entity) ->
      sprite = entity.sprite
      shadow = @game.shadows["small"]
      anim = entity.currentAnimation
      os = (if @upscaledRendering then 1 else @scale)
      ds = (if @upscaledRendering then @scale else 1)
      if anim and sprite
        frame = anim.currentFrame
        s = @scale
        x = frame.x * os
        y = frame.y * os
        w = sprite.width * os
        h = sprite.height * os
        ox = sprite.offsetX * s
        oy = sprite.offsetY * s
        dx = entity.x * s
        dy = entity.y * s
        dw = w * ds
        dh = h * ds
        if entity.isFading
          @context.save()
          @context.globalAlpha = entity.fadingAlpha
        @drawEntityName entity  if not @mobile and not @tablet
        @context.save()
        if entity.flipSpriteX
          @context.translate dx + @tilesize * s, dy
          @context.scale -1, 1
        else if entity.flipSpriteY
          @context.translate dx, dy + dh
          @context.scale 1, -1
        else
          @context.translate dx, dy
        if entity.isVisible()
          @context.drawImage shadow.image, 0, 0, shadow.width * os, shadow.height * os, 0, entity.shadowOffsetY * ds, shadow.width * os * ds, shadow.height * os * ds  if entity.hasShadow()
          @context.drawImage sprite.image, x, y, w, h, ox, oy, dw, dh
          if entity instanceof Item and entity.kind isnt Types.Entities.CAKE
            sparks = @game.sprites["sparks"]
            anim = @game.sparksAnimation
            frame = anim.currentFrame
            sx = sparks.width * frame.index * os
            sy = sparks.height * anim.row * os
            sw = sparks.width * os
            sh = sparks.width * os
            @context.drawImage sparks.image, sx, sy, sw, sh, sparks.offsetX * s, sparks.offsetY * s, sw * ds, sh * ds
        if entity instanceof Character and not entity.isDead and entity.hasWeapon()
          weapon = @game.sprites[entity.getWeaponName()]
          if weapon
            weaponAnimData = weapon.animationData[anim.name]
            index = (if frame.index < weaponAnimData.length then frame.index else frame.index % weaponAnimData.length)
            wx = weapon.width * index * os
            wy = weapon.height * anim.row * os
            ww = weapon.width * os
            wh = weapon.height * os
            @context.drawImage weapon.image, wx, wy, ww, wh, weapon.offsetX * s, weapon.offsetY * s, ww * ds, wh * ds
        @context.restore()
        @context.restore()  if entity.isFading

    drawEntities: (dirtyOnly) ->
      self = this
      @game.forEachVisibleEntityByDepth (entity) ->
        if entity.isLoaded
          if dirtyOnly
            if entity.isDirty
              self.drawEntity entity
              entity.isDirty = false
              entity.oldDirtyRect = entity.dirtyRect
              entity.dirtyRect = null
          else
            self.drawEntity entity


    drawDirtyEntities: ->
      @drawEntities true

    clearDirtyRect: (r) ->
      @context.clearRect r.x, r.y, r.w, r.h

    clearDirtyRects: ->
      self = this
      count = 0
      @game.forEachVisibleEntityByDepth (entity) ->
        if entity.isDirty and entity.oldDirtyRect
          self.clearDirtyRect entity.oldDirtyRect
          count += 1

      @game.forEachAnimatedTile (tile) ->
        if tile.isDirty
          self.clearDirtyRect tile.dirtyRect
          count += 1

      if @game.clearTarget and @lastTargetPos
        last = @lastTargetPos
        rect = @getTargetBoundingRect(last.x, last.y)
        @clearDirtyRect rect
        @game.clearTarget = false
        count += 1
      count > 0

    
    #log.debug("count:"+count);
    getEntityBoundingRect: (entity) ->
      rect = {}
      s = @scale
      spr = undefined
      if entity instanceof Player and entity.hasWeapon()
        weapon = @game.sprites[entity.getWeaponName()]
        spr = weapon
      else
        spr = entity.sprite
      if spr
        rect.x = (entity.x + spr.offsetX - @camera.x) * s
        rect.y = (entity.y + spr.offsetY - @camera.y) * s
        rect.w = spr.width * s
        rect.h = spr.height * s
        rect.left = rect.x
        rect.right = rect.x + rect.w
        rect.top = rect.y
        rect.bottom = rect.y + rect.h
      rect

    getTileBoundingRect: (tile) ->
      rect = {}
      gridW = @game.map.width
      s = @scale
      ts = @tilesize
      cellid = tile.index
      rect.x = ((getX(cellid + 1, gridW) * ts) - @camera.x) * s
      rect.y = ((Math.floor(cellid / gridW) * ts) - @camera.y) * s
      rect.w = ts * s
      rect.h = ts * s
      rect.left = rect.x
      rect.right = rect.x + rect.w
      rect.top = rect.y
      rect.bottom = rect.y + rect.h
      rect

    getTargetBoundingRect: (x, y) ->
      rect = {}
      s = @scale
      ts = @tilesize
      tx = x or @game.selectedX
      ty = y or @game.selectedY
      rect.x = ((tx * ts) - @camera.x) * s
      rect.y = ((ty * ts) - @camera.y) * s
      rect.w = ts * s
      rect.h = ts * s
      rect.left = rect.x
      rect.right = rect.x + rect.w
      rect.top = rect.y
      rect.bottom = rect.y + rect.h
      rect

    isIntersecting: (rect1, rect2) ->
      not ((rect2.left > rect1.right) or (rect2.right < rect1.left) or (rect2.top > rect1.bottom) or (rect2.bottom < rect1.top))

    drawEntityName: (entity) ->
      @context.save()
      if entity.name and entity instanceof Player
        color = (if (entity.id is @game.playerId) then "#fcda5c" else "white")
        name = (if (entity.level) then "lv." + entity.level + " " + entity.name else entity.name)
        @drawText entity.name, (entity.x + 8) * @scale, (entity.y + entity.nameOffsetY) * @scale, true, color
      @context.restore()

    drawTerrain: ->
      self = this
      m = @game.map
      tilesetwidth = @tileset.width / m.tilesize
      @game.forEachVisibleTile ((id, index) ->
        # Don't draw unnecessary tiles
        self.drawTile self.background, id, self.tileset, tilesetwidth, m.width, index  if not m.isHighTile(id) and not m.isAnimatedTile(id)
      ), 1

    drawAnimatedTiles: (dirtyOnly) ->
      self = this
      m = @game.map
      tilesetwidth = @tileset.width / m.tilesize
      @animatedTileCount = 0
      @game.forEachAnimatedTile (tile) ->
        if dirtyOnly
          if tile.isDirty
            self.drawTile self.context, tile.id, self.tileset, tilesetwidth, m.width, tile.index
            tile.isDirty = false
        else
          self.drawTile self.context, tile.id, self.tileset, tilesetwidth, m.width, tile.index
          self.animatedTileCount += 1


    drawDirtyAnimatedTiles: ->
      @drawAnimatedTiles true

    drawHighTiles: (ctx) ->
      self = this
      m = @game.map
      tilesetwidth = @tileset.width / m.tilesize
      @highTileCount = 0
      @game.forEachVisibleTile ((id, index) ->
        if m.isHighTile(id)
          self.drawTile ctx, id, self.tileset, tilesetwidth, m.width, index
          self.highTileCount += 1
      ), 1

    drawBackground: (ctx, color) ->
      ctx.fillStyle = color
      ctx.fillRect 0, 0, @canvas.width, @canvas.height

    drawFPS: ->
      nowTime = new Date()
      diffTime = nowTime.getTime() - @lastTime.getTime()
      if diffTime >= 1000
        @realFPS = @frameCount
        @frameCount = 0
        @lastTime = nowTime
      @frameCount++
      
      #this.drawText("FPS: " + this.realFPS + " / " + this.maxFPS, 30, 30, false);
      @drawText "FPS: " + @realFPS, 30, 30, false

    drawDebugInfo: ->
      @drawFPS()  if @isDebugInfoVisible

    
    #this.drawText("A: " + this.animatedTileCount, 100, 30, false);
    #this.drawText("H: " + this.highTileCount, 140, 30, false);
    drawCombatInfo: ->
      self = this
      switch @scale
        when 2
          @setFontSize 20
        when 3
          @setFontSize 30
      @game.infoManager.forEachInfo (info) ->
        self.context.save()
        self.context.globalAlpha = info.opacity
        self.drawText info.value, (info.x + 8) * self.scale, Math.floor(info.y * self.scale), true, info.fillColor, info.strokeColor
        self.context.restore()

      @initFont()

    setCameraView: (ctx) ->
      ctx.translate -@camera.x * @scale, -@camera.y * @scale

    clearScreen: (ctx) ->
      ctx.clearRect 0, 0, @canvas.width, @canvas.height

    getPlayerImage: ->
      canvas = document.createElement("canvas")
      ctx = canvas.getContext("2d")
      os = (if @upscaledRendering then 1 else @scale)
      player = @game.player
      sprite = player.getArmorSprite()
      spriteAnim = sprite.animationData["idle_down"]
      
      # character
      row = spriteAnim.row
      w = sprite.width * os
      h = sprite.height * os
      y = row * h
      
      # weapon
      weapon = @game.sprites[@game.player.getWeaponName()]
      ww = weapon.width * os
      wh = weapon.height * os
      wy = wh * row
      offsetX = (weapon.offsetX - sprite.offsetX) * os
      offsetY = (weapon.offsetY - sprite.offsetY) * os
      
      # shadow
      shadow = @game.shadows["small"]
      sw = shadow.width * os
      sh = shadow.height * os
      ox = -sprite.offsetX * os
      oy = -sprite.offsetY * os
      canvas.width = w
      canvas.height = h
      ctx.clearRect 0, 0, w, h
      ctx.drawImage shadow.image, 0, 0, sw, sh, ox, oy, sw, sh
      ctx.drawImage sprite.image, 0, y, w, h, 0, 0, w, h
      ctx.drawImage weapon.image, 0, wy, ww, wh, offsetX, offsetY, ww, wh
      canvas.toDataURL "image/png"

    renderStaticCanvases: ->
      @background.save()
      @setCameraView @background
      @drawTerrain()
      @background.restore()
      if @mobile or @tablet
        @clearScreen @foreground
        @foreground.save()
        @setCameraView @foreground
        @drawHighTiles @foreground
        @foreground.restore()

    renderFrame: ->
      if @mobile or @tablet
        @renderFrameMobile()
      else
        @renderFrameDesktop()

    renderFrameDesktop: ->
      @clearScreen @context
      @context.save()
      @setCameraView @context
      @drawAnimatedTiles()
      if @game.started and @game.cursorVisible
        @drawSelectedCell()
        @drawTargetCell()
      
      #this.drawOccupiedCells();
      @drawPathingCells()
      @drawEntities()
      @drawCombatInfo()
      @drawHighTiles @context
      @context.restore()
      
      # Overlay UI elements
      @drawCursor()  if @game.cursorVisible
      @drawDebugInfo()

    renderFrameMobile: ->
      @clearDirtyRects()
      @preventFlickeringBug()
      @context.save()
      @setCameraView @context
      @drawDirtyAnimatedTiles()
      @drawSelectedCell()
      @drawDirtyEntities()
      @context.restore()

    preventFlickeringBug: ->
      if @fixFlickeringTimer.isOver(@game.currentTime)
        @background.fillRect 0, 0, 0, 0
        @context.fillRect 0, 0, 0, 0
        @foreground.fillRect 0, 0, 0, 0
  )
  getX = (id, w) ->
    return 0  if id is 0
    (if (id % w is 0) then w - 1 else (id % w) - 1)

  Renderer


define ["jquery", "animation", "sprites"], ($, Animation, sprites) ->
  Sprite = Class.extend(
    init: (name, scale) ->
      @name = name
      @scale = scale
      @isLoaded = false
      @offsetX = 0
      @offsetY = 0
      @loadJSON sprites[name]

    loadJSON: (data) ->
      @id = data.id
      @filepath = "img/" + @scale + "/" + @id + ".png"
      @animationData = data.animations
      @width = data.width
      @height = data.height
      @offsetX = (if (data.offset_x isnt `undefined`) then data.offset_x else -16)
      @offsetY = (if (data.offset_y isnt `undefined`) then data.offset_y else -16)
      @load()

    load: ->
      self = this
      @image = new Image()
      @image.crossOrigin = "Anonymous"
      @image.src = @filepath
      @image.onload = ->
        self.isLoaded = true
        self.onload_func()  if self.onload_func

    createAnimations: ->
      animations = {}
      for name of @animationData
        a = @animationData[name]
        animations[name] = new Animation(name, a.length, a.row, @width, @height)
      animations

    createHurtSprite: ->
      canvas = document.createElement("canvas")
      ctx = canvas.getContext("2d")
      width = @image.width
      height = @image.height
      spriteData = undefined
      data = undefined
      canvas.width = width
      canvas.height = height
      ctx.drawImage @image, 0, 0, width, height
      try
        spriteData = ctx.getImageData(0, 0, width, height)
        data = spriteData.data
        i = 0

        while i < data.length
          data[i] = 255
          data[i + 1] = data[i + 2] = 75
          i += 4
        spriteData.data = data
        ctx.putImageData spriteData, 0, 0
        @whiteSprite =
          image: canvas
          isLoaded: true
          offsetX: @offsetX
          offsetY: @offsetY
          width: @width
          height: @height
      catch e
        log.error "Error getting image data for sprite : " + @name

    getHurtSprite: ->
      @whiteSprite

    createSilhouette: ->
      canvas = document.createElement("canvas")
      ctx = canvas.getContext("2d")
      width = @image.width
      height = @image.height
      spriteData = undefined
      finalData = undefined
      data = undefined
      canvas.width = width
      canvas.height = height
      try
        ctx.drawImage @image, 0, 0, width, height
        data = ctx.getImageData(0, 0, width, height).data
        finalData = ctx.getImageData(0, 0, width, height)
        fdata = finalData.data
        getIndex = (x, y) ->
          ((width * (y - 1)) + x - 1) * 4

        getPosition = (i) ->
          x = undefined
          y = undefined
          i = (i / 4) + 1
          x = i % width
          y = ((i - x) / width) + 1
          x: x
          y: y

        hasAdjacentPixel = (i) ->
          pos = getPosition(i)
          return true  if pos.x < width and not isBlankPixel(getIndex(pos.x + 1, pos.y))
          return true  if pos.x > 1 and not isBlankPixel(getIndex(pos.x - 1, pos.y))
          return true  if pos.y < height and not isBlankPixel(getIndex(pos.x, pos.y + 1))
          return true  if pos.y > 1 and not isBlankPixel(getIndex(pos.x, pos.y - 1))
          false

        isBlankPixel = (i) ->
          return true  if i < 0 or i >= data.length
          data[i] is 0 and data[i + 1] is 0 and data[i + 2] is 0 and data[i + 3] is 0

        i = 0

        while i < data.length
          if isBlankPixel(i) and hasAdjacentPixel(i)
            fdata[i] = fdata[i + 1] = 255
            fdata[i + 2] = 150
            fdata[i + 3] = 150
          i += 4
        finalData.data = fdata
        ctx.putImageData finalData, 0, 0
        @silhouetteSprite =
          image: canvas
          isLoaded: true
          offsetX: @offsetX
          offsetY: @offsetY
          width: @width
          height: @height
      catch e
        @silhouetteSprite = this
  )
  Sprite


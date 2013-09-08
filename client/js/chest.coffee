define ["entity"], (Entity) ->
  Chest = Entity.extend(
    init: (id, kind) ->
      @_super id, Types.Entities.CHEST

    getSpriteName: ->
      "chest"

    isMoving: ->
      false

    open: ->
      @open_callback()  if @open_callback

    onOpen: (callback) ->
      @open_callback = callback
  )
  Chest


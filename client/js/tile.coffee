define ->
    class Tile

    class AnimatedTile extends Tile
        constructor: (@id, @length, @speed, @index) ->
            @startId = id
            @lastTime = 0

        tick: ->
            if (@id - @startId) < @length - 1
                @id += 1
            else
                @id = @startId

        animate: (time) ->
            if (time - @lastTime) > @speed
                @tick()
                @lastTime = time
                true
            else
                false

    AnimatedTile

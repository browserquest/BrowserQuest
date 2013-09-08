define ->
    class Area
        constructor: (@x, @y, @width, @height) ->

        contains: (entity) ->
            if entity?
                entity.gridX >= @x and
                entity.gridY >= @x and
                entity.gridX < @x + @width and
                entity.gridY < @y + @height
            else
                false

    Area

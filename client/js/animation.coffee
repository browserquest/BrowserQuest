define ->
    class Animation
        constructor: (@name, @length, @row, @width, @height) ->
            @reset()

        tick: ->
            i = @currentFrame.index

            if i < @length - 1 then i += 1 else i = 0

            if @count > 0 and i is 0
                @count -= 1
                if @count is 0
                    @currentFrame.index = 0
                    @endcount_callback()
                    return

            @currentFrame.x = @width * i
            @currentFrame.y = @height * @row
            @currentFrame.index = i

        setSpeed: (@speed) ->

        setCount: (@count, @endcount_callback) ->

        isTimeToAnimate: (time) ->
            (time - @lastTime) > @speed

        update: (time) ->
            if @lastTime is 0 and @name[..3] is "atk"
                @lastTime = time

            if @isTimeToAnimate time
                @lastTime = time
                @tick()
                true
            else
                false

        reset: ->
            @lastTime = 0
            @currentFrame = { index: 0, x: 0, y: @row * @height }

    Animation

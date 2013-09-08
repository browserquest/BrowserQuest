define ->
  Transition = Class.extend(
    init: ->
      @startValue = 0
      @endValue = 0
      @duration = 0
      @inProgress = false

    start: (currentTime, updateFunction, stopFunction, startValue, endValue, duration) ->
      @startTime = currentTime
      @updateFunction = updateFunction
      @stopFunction = stopFunction
      @startValue = startValue
      @endValue = endValue
      @duration = duration
      @inProgress = true
      @count = 0

    step: (currentTime) ->
      if @inProgress
        if @count > 0
          @count -= 1
          log.debug currentTime + ": jumped frame"
        else
          elapsed = currentTime - @startTime
          elapsed = @duration  if elapsed > @duration
          diff = @endValue - @startValue
          i = @startValue + ((diff / @duration) * elapsed)
          i = Math.round(i)
          if elapsed is @duration or i is @endValue
            @stop()
            @stopFunction()  if @stopFunction
          else @updateFunction i  if @updateFunction

    restart: (currentTime, startValue, endValue) ->
      @start currentTime, @updateFunction, @stopFunction, startValue, endValue, @duration
      @step currentTime

    stop: ->
      @inProgress = false
  )
  Transition


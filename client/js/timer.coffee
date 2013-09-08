define ->
  Timer = Class.extend(
    init: (duration, startTime) ->
      @lastTime = startTime or 0
      @duration = duration

    isOver: (time) ->
      over = false
      if (time - @lastTime) > @duration
        over = true
        @lastTime = time
      over
  )
  Timer


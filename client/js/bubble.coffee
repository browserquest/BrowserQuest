define ['jquery', 'timer'] ($, timer) ->

    class Bubble
        constructor: (@id, @element, time) ->
            @timer = new Timer(5000, time)

        isOver: (time) ->
            if @timer.isOver time
                true
            false

        destroy: ->
            $(@element).remove()

        reset: (time) ->
            @timer.lastTime = time

    class BubbleManager
        constructor: (@container) ->
            @bubbles = {}

        getBubbleById: (id) ->
            if id in @bubbles
                @bubbles[id]
            null

        create: (id, message, time) ->
            if @bubbles[id]
                @bubbles[id].reset(time)
                $("#"+id+" p").html(message)
            else
                el = $("<div id=\""+id+"\" class=\"bubble\"><p>"+message+"</p><div class=\"thingy\"></div></div>") #attr('id', id)
                $(el).appendTo @container
                @bubbles[id] = new Bubble(id, el, time)

        update: (time) ->
            for bubble in @bubbles[0..@bubbles.length] # Don't mutate the list being iterated over
                if bubble.isOver(time)
                    bubble.destroy()
                    delete @bubbles[bubble.id]

        clean: ->
            bubble.destroy(); delete @bubbles[bubble.id] for bubble in @bubbles
            @bubbles = {}

        destroyBubble: (id) ->
            bubble = @getBubbleById(id)
            if bubble
                bubble.destroy()
                delete @bubbles[id]

        forEachBubble: (callback) ->
            calback(bubble) for bubble in @bubbles

    BubbleManager

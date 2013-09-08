define ["jquery", "app", "entrypoint"], ($, App, EntryPoint) ->
  app = undefined
  game = undefined
  initApp = ->
    $(document).ready ->
      app = new App()
      app.center()
      
      # Workaround for graphical glitches on text
      $("body").addClass "windows"  if Detect.isWindows()
      
      # Fix for no pointer events
      $("body").addClass "opera"  if Detect.isOpera()
      
      # Remove chat placeholder
      $("#chatinput").removeAttr "placeholder"  if Detect.isFirefoxAndroid()
      $("body").click (event) ->
        app.toggleScrollContent "credits"  if $("#parchment").hasClass("credits")
        app.toggleScrollContent "legal"  if $("#parchment").hasClass("legal")
        app.toggleScrollContent "about"  if $("#parchment").hasClass("about")

      $(".barbutton").click ->
        $(this).toggleClass "active"

      $("#chatbutton").click ->
        if $("#chatbutton").hasClass("active")
          app.showChat()
        else
          app.hideChat()

      $("#helpbutton").click ->
        if $("body").hasClass("about")
          app.closeInGameScroll "about"
          $("#helpbutton").removeClass "active"
        else
          app.toggleScrollContent "about"

      $("#achievementsbutton").click ->
        app.toggleAchievements()
        clearInterval app.blinkInterval  if app.blinkInterval
        $(this).removeClass "blink"

      $("#instructions").click ->
        app.hideWindows()

      $("#playercount").click ->
        app.togglePopulationInfo()

      $("#population").click ->
        app.togglePopulationInfo()

      $(".clickable").click (event) ->
        event.stopPropagation()

      $("#toggle-credits").click ->
        app.toggleScrollContent "credits"

      $("#toggle-legal").click ->
        app.toggleScrollContent "legal"
        if game.renderer.mobile
          if $("#parchment").hasClass("legal")
            $(this).text "close"
          else
            $(this).text "Privacy"

      $("#create-new span").click ->
        app.animateParchment "loadcharacter", "confirmation"

      $("#continue span").click ->
        app.storage.clear()
        app.animateParchment "confirmation", "createcharacter"
        $("body").removeClass "returning"

      $("#cancel span").click ->
        app.animateParchment "confirmation", "loadcharacter"

      $(".ribbon").click ->
        app.toggleScrollContent "about"

      $("#nameinput").bind "keyup", ->
        app.toggleButton()

      $("#pwinput").bind "keyup", ->
        app.toggleButton()

      $("#pwinput2").bind "keyup", ->
        app.toggleButton()

      $("#emailinput").bind "keyup", ->
        app.toggleButton()

      $("#previous").click ->
        $achievements = $("#achievements")
        if app.currentPage is 1
          false
        else
          app.currentPage -= 1
          $achievements.removeClass().addClass "active page" + app.currentPage

      $("#next").click ->
        $achievements = $("#achievements")
        $lists = $("#lists")
        nbPages = $lists.children("ul").length
        if app.currentPage is nbPages
          false
        else
          app.currentPage += 1
          $achievements.removeClass().addClass "active page" + app.currentPage

      $("#notifications div").bind TRANSITIONEND, app.resetMessagesPosition.bind(app)
      $(".close").click ->
        app.hideWindows()

      $(".twitter").click ->
        url = $(this).attr("href")
        app.openPopup "twitter", url
        false

      $(".facebook").click ->
        url = $(this).attr("href")
        app.openPopup "facebook", url
        false

      data = app.storage.data
      if data.hasAlreadyPlayed
        if data.player.name and data.player.name isnt ""
          $("#playername").html data.player.name
          $("#playerimage").attr "src", data.player.image
      $("#playbutton span").click (event) ->
        app.tryStartingGame()

      document.addEventListener "touchstart", (->
      ), false
      $("#resize-check").bind "transitionend", app.resizeUi.bind(app)
      $("#resize-check").bind "webkitTransitionEnd", app.resizeUi.bind(app)
      $("#resize-check").bind "oTransitionEnd", app.resizeUi.bind(app)
      log.info "App initialized."
      initGame()


  initGame = ->
    require ["game"], (Game) ->
      canvas = document.getElementById("entities")
      background = document.getElementById("background")
      foreground = document.getElementById("foreground")
      input = document.getElementById("chatinput")
      game = new Game(app)
      game.setup "#bubbles", canvas, background, foreground, input
      game.setStorage app.storage
      app.setGame game
      game.loadMap()  if app.isDesktop and app.supportsWorkers
      game.onGameStart ->
        app.initEquipmentIcons()
        entry = new EntryPoint()
        entry.execute game

      game.onDisconnect (message) ->
        $("#death").find("p").html message + "<em>Please reload the page.</em>"
        $("#respawn").hide()

      game.onPlayerDeath ->
        $("body").removeClass "credits"  if $("body").hasClass("credits")
        $("body").addClass "death"

      game.onPlayerEquipmentChange ->
        app.initEquipmentIcons()

      game.onPlayerInvincible ->
        $("#hitpoints").toggleClass "invincible"

      game.onNbPlayersChange (worldPlayers, totalPlayers) ->
        setWorldPlayersString = (string) ->
          $("#instance-population").find("span:nth-child(2)").text string
          $("#playercount").find("span:nth-child(2)").text string

        setTotalPlayersString = (string) ->
          $("#world-population").find("span:nth-child(2)").text string

        $("#playercount").find("span.count").text worldPlayers
        $("#instance-population").find("span").text worldPlayers
        if worldPlayers is 1
          setWorldPlayersString "player"
        else
          setWorldPlayersString "players"
        $("#world-population").find("string").text Types.getLevel
        if totalPlayers is 1
          setTotalPlayersString "player"
        else
          setTotalPlayersString "players"

      game.onGuildPopulationChange (guildName, guildPopulation) ->
        setGuildPlayersString = (string) ->
          $("#guild-population").find("span:nth-child(2)").text string

        $("#guild-population").addClass "visible"
        $("#guild-population").find("span").text guildPopulation
        $("#guild-name").text guildName
        if guildPopulation is 1
          setGuildPlayersString "player"
        else
          setGuildPlayersString "players"

      game.onAchievementUnlock (id, name, description) ->
        app.unlockAchievement id, name

      game.onNotification (message) ->
        app.showMessage message

      app.initHealthBar()
      app.initTargetHud()
      app.initExpBar()
      $("#nameinput").attr "value", ""
      $("#pwinput").attr "value", ""
      $("#pwinput2").attr "value", ""
      $("#emailinput").attr "value", ""
      $("#chatbox").attr "value", ""
      if game.renderer.mobile or game.renderer.tablet
        $("#foreground").bind "touchstart", (event) ->
          app.center()
          app.setMouseCoordinates event.originalEvent.touches[0]
          game.click()
          app.hideWindows()

      else
        $("#foreground").click (event) ->
          app.center()
          app.setMouseCoordinates event
          if game and not app.dropDialogPopuped
            game.pvpFlag = event.shiftKey
            game.click()
          app.hideWindows()

      $("body").unbind "click"
      $("body").click (event) ->
        hasClosedParchment = false
        if $("#parchment").hasClass("credits")
          if game.started
            app.closeInGameScroll "credits"
            hasClosedParchment = true
          else
            app.toggleScrollContent "credits"
        if $("#parchment").hasClass("legal")
          if game.started
            app.closeInGameScroll "legal"
            hasClosedParchment = true
          else
            app.toggleScrollContent "legal"
        if $("#parchment").hasClass("about")
          if game.started
            app.closeInGameScroll "about"
            hasClosedParchment = true
          else
            app.toggleScrollContent "about"
        game.click()  if game.started and not game.renderer.mobile and game.player and not hasClosedParchment

      $("#respawn").click (event) ->
        game.audioManager.playSound "revive"
        game.restart()
        $("body").removeClass "death"

      $(document).mousemove (event) ->
        app.setMouseCoordinates event
        if game.started
          game.pvpFlag = event.shiftKey
          game.movecursor()

      $(document).keyup (e) ->
        key = e.which
        if game.started and not $("#chatbox").hasClass("active")
          switch key
            when Types.Keys.LEFT, Types.Keys.A
          , Types.Keys.KEYPAD_4
              game.player.moveLeft = false
              game.player.disableKeyboardNpcTalk = false
            when Types.Keys.RIGHT, Types.Keys.D
          , Types.Keys.KEYPAD_6
              game.player.moveRight = false
              game.player.disableKeyboardNpcTalk = false
            when Types.Keys.UP, Types.Keys.W
          , Types.Keys.KEYPAD_8
              game.player.moveUp = false
              game.player.disableKeyboardNpcTalk = false
            when Types.Keys.DOWN, Types.Keys.S
          , Types.Keys.KEYPAD_2
              game.player.moveDown = false
              game.player.disableKeyboardNpcTalk = false
            else

      $(document).keydown (e) ->
        key = e.which
        $chat = $("#chatinput")
        if key is Types.Keys.ENTER
          if $("#chatbox").hasClass("active")
            app.hideChat()
          else
            app.showChat()
        else game.pvpFlag = true  if key is 16
        if game.started and not $("#chatbox").hasClass("active")
          pos =
            x: game.player.gridX
            y: game.player.gridY

          switch key
            when Types.Keys.LEFT, Types.Keys.A
          , Types.Keys.KEYPAD_4
              game.player.moveLeft = true
            when Types.Keys.RIGHT, Types.Keys.D
          , Types.Keys.KEYPAD_6
              game.player.moveRight = true
            when Types.Keys.UP, Types.Keys.W
          , Types.Keys.KEYPAD_8
              game.player.moveUp = true
            when Types.Keys.DOWN, Types.Keys.S
          , Types.Keys.KEYPAD_2
              game.player.moveDown = true
            when Types.Keys.SPACE
              game.makePlayerAttackNext()
            when Types.Keys.I
              $("#achievementsbutton").click()
            when Types.Keys.H
              $("#helpbutton").click()
            when Types.Keys.M
              $("#mutebutton").click()
            when Types.Keys.P
              $("#playercount").click()
            else

      $(document).keyup (e) ->
        key = e.which
        game.pvpFlag = false  if key is 16

      $("#chatinput").keydown (e) ->
        key = e.which
        $chat = $("#chatinput")
        placeholder = $(this).attr("placeholder")
        
        #   if (!(e.shiftKey && e.keyCode === 16) && e.keyCode !== 9) {
        #        if ($(this).val() === placeholder) {
        #           $(this).val('');
        #            $(this).removeAttr('placeholder');
        #            $(this).removeClass('placeholder');
        #        }
        #    }
        if key is 13
          if $chat.attr("value") isnt ""
            game.say $chat.attr("value")  if game.player
            $chat.attr "value", ""
            app.hideChat()
            $("#foreground").focus()
            return false
          else
            app.hideChat()
            return false
        if key is 27
          app.hideChat()
          false

      $("#chatinput").focus (e) ->
        placeholder = $(this).attr("placeholder")
        $(this).val placeholder  unless Detect.isFirefoxAndroid()
        @setSelectionRange 0, 0  if $(this).val() is placeholder

      $("#nameinput").focusin ->
        $("#name-tooltip").addClass "visible"

      $("#nameinput").focusout ->
        $("#name-tooltip").removeClass "visible"

      $("#nameinput").keypress (event) ->
        $("#name-tooltip").removeClass "visible"

      $("#mutebutton").click ->
        game.audioManager.toggle()

      $(document).bind "keydown", (e) ->
        key = e.which
        $chat = $("#chatinput")
        if key is 13 # Enter
          if game.ready
            $chat.focus()
            return false
          else
            if app.loginFormActive() or app.createNewCharacterFormActive()
              $("input").blur() # exit keyboard on mobile
              app.handleEnter()
              return false # prevent form submit
        if $("#chatinput:focus").size() is 0 and $("#nameinput:focus").size() is 0
          if key is 27 # ESC
            app.hideWindows()
            _.each game.player.attackers, (attacker) ->
              attacker.stop()

            false

      
      # The following may be uncommented for debugging purposes.
      #
      # if(key === 32 && game.ready) { // Space
      #     game.togglePathingGrid();
      #     return false;
      # }
      # if(key === 70 && game.ready) { // F
      #     game.toggleDebugInfo();
      #     return false;
      # }
      $("#healthbar").click (e) ->
        hb = $("#healthbar")
        hp = $("#hitpoints")
        hpg = $("#hpguide")
        hbp = hb.position()
        hpp = hp.position()
        if (e.offsetX >= hpp.left) and (e.offsetX < hb.width())
          if hpg.css("display") is "none"
            hpg.css "display", "block"
            setInterval (->
              game.eat game.healShortCut  if ((game.player.hitPoints / game.player.maxHitPoints) <= game.hpGuide) and (game.healShortCut >= 0) and Types.isHealingItem(game.player.inventory[game.healShortCut]) and (game.player.inventoryCount[game.healShortCut] > 0)
            ), 100
          hpg.css "left", e.offsetX + "px"
          game.hpGuide = (e.offsetX - hpp.left) / (hb.width() - hpp.left)
        false

      $("body").addClass "tablet"  if game.renderer.tablet


  initApp()


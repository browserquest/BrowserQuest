define ["area"], (Area) ->
  AudioManager = Class.extend(
    init: (game) ->
      self = this
      @enabled = true
      @extension = (if Detect.canPlayMP3() then "mp3" else "ogg")
      @sounds = {}
      @game = game
      @currentMusic = null
      @areas = []
      @musicNames = ["village", "beach", "forest", "cave", "desert", "lavaland", "boss"]
      @soundNames = ["loot", "hit1", "hit2", "hurt", "heal", "chat", "revive", "death", "firefox", "achievement", "kill1", "kill2", "noloot", "teleport", "chest", "npc", "npc-end"]
      loadSoundFiles = ->
        counter = _.size(self.soundNames)
        log.info "Loading sound files..."
        _.each self.soundNames, (name) ->
          self.loadSound name, ->
            counter -= 1
            # Disable music on Safari - See bug 738008
            loadMusicFiles()  unless Detect.isSafari()  if counter is 0



      loadMusicFiles = ->
        unless self.game.renderer.mobile # disable music on mobile devices
          log.info "Loading music files..."
          
          # Load the village music first, as players always start here
          self.loadMusic self.musicNames.shift(), ->
            
            # Then, load all the other music files
            _.each self.musicNames, (name) ->
              self.loadMusic name



      unless Detect.isSafari() and Detect.isWindows()
        loadSoundFiles()
      else
        @enabled = false # Disable audio on Safari Windows

    toggle: ->
      if @enabled
        @enabled = false
        @resetMusic @currentMusic  if @currentMusic
      else
        @enabled = true
        @currentMusic = null  if @currentMusic
        @updateMusic()

    load: (basePath, name, loaded_callback, channels) ->
      path = basePath + name + "." + @extension
      sound = document.createElement("audio")
      self = this
      sound.addEventListener "canplaythrough", ((e) ->
        @removeEventListener "canplaythrough", arguments_.callee, false
        log.debug path + " is ready to play."
        loaded_callback()  if loaded_callback
      ), false
      sound.addEventListener "error", ((e) ->
        log.error "Error: " + path + " could not be loaded."
        self.sounds[name] = null
      ), false
      sound.preload = "auto"
      sound.autobuffer = true
      sound.src = path
      sound.load()
      @sounds[name] = [sound]
      _.times channels - 1, ->
        self.sounds[name].push sound.cloneNode(true)


    loadSound: (name, handleLoaded) ->
      @load "audio/sounds/", name, handleLoaded, 4

    loadMusic: (name, handleLoaded) ->
      @load "audio/music/", name, handleLoaded, 1
      music = @sounds[name][0]
      music.loop = true
      music.addEventListener "ended", (->
        music.play()
      ), false

    getSound: (name) ->
      return null  unless @sounds[name]
      sound = _.detect(@sounds[name], (sound) ->
        sound.ended or sound.paused
      )
      if sound and sound.ended
        sound.currentTime = 0
      else
        sound = @sounds[name][0]
      sound

    playSound: (name) ->
      sound = @enabled and @getSound(name)
      sound.play()  if sound

    addArea: (x, y, width, height, musicName) ->
      area = new Area(x, y, width, height)
      area.musicName = musicName
      @areas.push area

    getSurroundingMusic: (entity) ->
      music = null
      area = _.detect(@areas, (area) ->
        area.contains entity
      )
      if area
        music =
          sound: @getSound(area.musicName)
          name: area.musicName
      music

    updateMusic: ->
      if @enabled
        music = @getSurroundingMusic(@game.player)
        if music
          unless @isCurrentMusic(music)
            @fadeOutCurrentMusic()  if @currentMusic
            @playMusic music
        else
          @fadeOutCurrentMusic()

    isCurrentMusic: (music) ->
      @currentMusic and (music.name is @currentMusic.name)

    playMusic: (music) ->
      if @enabled and music and music.sound
        if music.sound.fadingOut
          @fadeInMusic music
        else
          music.sound.volume = 1
          music.sound.play()
        @currentMusic = music

    resetMusic: (music) ->
      if music and music.sound and music.sound.readyState > 0
        music.sound.pause()
        music.sound.currentTime = 0

    fadeOutMusic: (music, ended_callback) ->
      self = this
      if music and not music.sound.fadingOut
        @clearFadeIn music
        music.sound.fadingOut = setInterval(->
          step = 0.02
          volume = music.sound.volume - step
          if self.enabled and volume >= step
            music.sound.volume = volume
          else
            music.sound.volume = 0
            self.clearFadeOut music
            ended_callback music
        , 50)

    fadeInMusic: (music) ->
      self = this
      if music and not music.sound.fadingIn
        @clearFadeOut music
        music.sound.fadingIn = setInterval(->
          step = 0.01
          volume = music.sound.volume + step
          if self.enabled and volume < 1 - step
            music.sound.volume = volume
          else
            music.sound.volume = 1
            self.clearFadeIn music
        , 30)

    clearFadeOut: (music) ->
      if music.sound.fadingOut
        clearInterval music.sound.fadingOut
        music.sound.fadingOut = null

    clearFadeIn: (music) ->
      if music.sound.fadingIn
        clearInterval music.sound.fadingIn
        music.sound.fadingIn = null

    fadeOutCurrentMusic: ->
      self = this
      if @currentMusic
        @fadeOutMusic @currentMusic, (music) ->
          self.resetMusic music

        @currentMusic = null
  )
  AudioManager


define ->
  Storage = Class.extend(
    init: ->
      if @hasLocalStorage() and localStorage.data
        @data = JSON.parse(localStorage.data)
      else
        @resetData()

    resetData: ->
      @data =
        hasAlreadyPlayed: false
        player:
          name: ""
          weapon: ""
          armor: ""
          guild: ""
          image: ""

        achievements:
          unlocked: []
          ratCount: 0
          skeletonCount: 0
          totalKills: 0
          totalDmg: 0
          totalRevives: 0

    hasLocalStorage: ->
      Modernizr.localstorage

    save: ->
      localStorage.data = JSON.stringify(@data)  if @hasLocalStorage()

    clear: ->
      if @hasLocalStorage()
        localStorage.data = ""
        @resetData()

    
    # Player
    hasAlreadyPlayed: ->
      @data.hasAlreadyPlayed

    initPlayer: (name) ->
      @data.hasAlreadyPlayed = true
      @setPlayerName name

    setPlayerName: (name) ->
      @data.player.name = name
      @save()

    setPlayerImage: (img) ->
      @data.player.image = img
      @save()

    setPlayerArmor: (armor) ->
      @data.player.armor = armor
      @save()

    setPlayerWeapon: (weapon) ->
      @data.player.weapon = weapon
      @save()

    setPlayerGuild: (guild) ->
      if typeof guild isnt "undefined"
        @data.player.guild =
          id: guild.id
          name: guild.name
          members: JSON.stringify(guild.members)

        @save()
      else
        delete @data.player.guild

        @save()

    savePlayer: (img, armor, weapon, guild) ->
      @setPlayerImage img
      @setPlayerArmor armor
      @setPlayerWeapon weapon
      @setPlayerGuild guild

    
    # Achievements
    hasUnlockedAchievement: (id) ->
      _.include @data.achievements.unlocked, id

    unlockAchievement: (id) ->
      unless @hasUnlockedAchievement(id)
        @data.achievements.unlocked.push id
        @save()
        return true
      false

    getAchievementCount: ->
      _.size @data.achievements.unlocked

    
    # Angry rats
    getRatCount: ->
      @data.achievements.ratCount

    incrementRatCount: ->
      if @data.achievements.ratCount < 10
        @data.achievements.ratCount++
        @save()

    
    # Skull Collector
    getSkeletonCount: ->
      @data.achievements.skeletonCount

    incrementSkeletonCount: ->
      if @data.achievements.skeletonCount < 10
        @data.achievements.skeletonCount++
        @save()

    
    # Meatshield
    getTotalDamageTaken: ->
      @data.achievements.totalDmg

    addDamage: (damage) ->
      if @data.achievements.totalDmg < 5000
        @data.achievements.totalDmg += damage
        @save()

    
    # Hunter
    getTotalKills: ->
      @data.achievements.totalKills

    incrementTotalKills: ->
      if @data.achievements.totalKills < 50
        @data.achievements.totalKills++
        @save()

    
    # Still Alive
    getTotalRevives: ->
      @data.achievements.totalRevives

    incrementRevives: ->
      if @data.achievements.totalRevives < 5
        @data.achievements.totalRevives++
        @save()
  )
  Storage


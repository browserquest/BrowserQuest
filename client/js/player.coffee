define ["character", "exceptions"], (Character, Exceptions) ->
  Player = Character.extend(
    MAX_LEVEL: 10
    init: (id, name, pw, kind, guild) ->
      @_super id, kind
      @name = name
      @pw = pw
      @setGuild guild  if typeof guild isnt "undefined"
      
      # Renderer
      @nameOffsetY = -10
      
      # sprites
      @spriteName = "clotharmor"
      @armorName = "clotharmor"
      @weaponName = "sword1"
      
      # modes
      @isLootMoving = false
      @isSwitchingWeapon = true
      
      # PVP Flag
      @pvpFlag = true

    getGuild: ->
      @guild

    setGuild: (guild) ->
      @guild = guild
      $("#guild-population").addClass "visible"
      $("#guild-name").html guild.name

    unsetGuild: ->
      delete @guild

      $("#guild-population").removeClass "visible"

    hasGuild: ->
      typeof @guild isnt "undefined"

    addInvite: (inviteGuildId) ->
      @invite =
        time: new Date().valueOf()
        guildId: inviteGuildId

    deleteInvite: ->
      delete @invite

    checkInvite: ->
      if @invite and ((new Date().valueOf() - @invite.time) < 595000)
        @invite.guildId
      else
        if @invite
          @deleteInvite()
          -1
        else
          false

    loot: (item) ->
      if item
        rank = undefined
        currentRank = undefined
        msg = undefined
        currentArmorName = undefined
        if @currentArmorSprite
          currentArmorName = @currentArmorSprite.name
        else
          currentArmorName = @spriteName
        if item.type is "armor"
          rank = Types.getArmorRank(item.kind)
          currentRank = Types.getArmorRank(Types.getKindFromString(currentArmorName))
          msg = "You are wearing a better armor"
        else if item.type is "weapon"
          rank = Types.getWeaponRank(item.kind)
          currentRank = Types.getWeaponRank(Types.getKindFromString(@weaponName))
          msg = "You are wielding a better weapon"
        if rank and currentRank
          if rank is currentRank
            throw new Exceptions.LootException("You already have this " + item.type)
          else throw new Exceptions.LootException(msg)  if rank <= currentRank
        log.info "Player " + @id + " has looted " + item.id
        @stopInvincibility()  if Types.isArmor(item.kind) and @invincible
        item.onLoot this

    
    ###
    Returns true if the character is currently walking towards an item in order to loot it.
    ###
    isMovingToLoot: ->
      @isLootMoving

    getSpriteName: ->
      @spriteName

    setSpriteName: (name) ->
      @spriteName = name

    getArmorName: ->
      sprite = @getArmorSprite()
      sprite.id

    getArmorSprite: ->
      if @invincible
        @currentArmorSprite
      else
        @sprite

    setArmorName: (name) ->
      @armorName = name

    getWeaponName: ->
      @weaponName

    setWeaponName: (name) ->
      @weaponName = name

    hasWeapon: ->
      @weaponName isnt null

    equipFromInventory: (type, inventoryNumber, sprites) ->
      itemString = Types.getKindAsString(@inventory[inventoryNumber])
      if itemString
        itemSprite = sprites[itemString]
        if itemSprite
          if type is "armor"
            @inventory[inventoryNumber] = Types.getKindFromString(@getArmorName())
            @setSpriteName itemString
            @setSprite itemSprite
            @setArmorName itemString
          else if type is "avatar"
            @inventory[inventoryNumber] = null
            @setSpriteName itemString
            @setSprite itemSprite

    switchArmor: (armorName, sprite) ->
      @setSpriteName armorName
      @setSprite sprite
      @setArmorName armorName
      @switch_callback()  if @switch_callback

    switchWeapon: (newWeaponName) ->
      count = 14
      value = false
      self = this
      toggle = ->
        value = not value
        value

      if newWeaponName isnt @getWeaponName()
        clearInterval blanking  if @isSwitchingWeapon
        @switchingWeapon = true
        blanking = setInterval(->
          if toggle()
            self.setWeaponName newWeaponName
          else
            self.setWeaponName null
          count -= 1
          if count is 1
            clearInterval blanking
            self.switchingWeapon = false
            self.switch_callback()  if self.switch_callback
        , 90)

    switchArmor: (newArmorSprite) ->
      count = 14
      value = false
      self = this
      toggle = ->
        value = not value
        value

      if newArmorSprite and newArmorSprite.id isnt @getSpriteName()
        clearInterval blanking  if @isSwitchingArmor
        @isSwitchingArmor = true
        self.setSprite newArmorSprite
        self.setSpriteName newArmorSprite.id
        blanking = setInterval(->
          self.setVisible toggle()
          count -= 1
          if count is 1
            clearInterval blanking
            self.isSwitchingArmor = false
            self.switch_callback()  if self.switch_callback
        , 90)

    onArmorLoot: (callback) ->
      @armorloot_callback = callback

    onSwitchItem: (callback) ->
      @switch_callback = callback

    onInvincible: (callback) ->
      @invincible_callback = callback

    startInvincibility: ->
      self = this
      unless @invincible
        @currentArmorSprite = @getSprite()
        @invincible = true
        @invincible_callback()
      else
        
        # If the player already has invincibility, just reset its duration.
        clearTimeout @invincibleTimeout  if @invincibleTimeout
      @invincibleTimeout = setTimeout(->
        self.stopInvincibility()
        self.idle()
      , 15000)

    stopInvincibility: ->
      @invincible_callback()
      @invincible = false
      if @currentArmorSprite
        @setSprite @currentArmorSprite
        @setSpriteName @currentArmorSprite.id
        @currentArmorSprite = null
      clearTimeout @invincibleTimeout  if @invincibleTimeout

    flagPVP: (pvpFlag) ->
      @pvpFlag = pvpFlag
  )
  Player


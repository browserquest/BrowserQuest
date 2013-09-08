define ["lib/sha1", "util"], ->
  EntryPoint = Class.extend(
    init: ->
      
      #"hashedID" ← use tools/sha1_encode.html to generate: function(){} ← action
      @hashes = "Obda3tBpL9VXsXsSsv5xB4QKNo4=": (aGame) ->
        aGame.player.switchArmor aGame.sprites["firefox"]
        aGame.showNotification "You enter the game as a fox, but not invincible…"

    execute: (game) ->
      res = false
      ID = getUrlVars()["entrance"]
      unless ID is `undefined`
        shaObj = new jsSHA(ID, "TEXT")
        hash = shaObj.getHash("SHA-1", "B64")
        if @hashes[hash] is `undefined`
          game.showNotification "Nice try little scoundrel… bad code, though"
        else
          @hashes[hash] game
          res = true
      res
  )
  EntryPoint


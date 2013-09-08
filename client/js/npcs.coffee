define ["npc"], (Npc) ->
  NPCs =
    Guard: Npc.extend(init: (id) ->
      @_super id, Types.Entities.GUARD, 1
    )
    King: Npc.extend(init: (id) ->
      @_super id, Types.Entities.KING, 1
    )
    Agent: Npc.extend(init: (id) ->
      @_super id, Types.Entities.AGENT, 1
    )
    Rick: Npc.extend(init: (id) ->
      @_super id, Types.Entities.RICK, 1
    )
    VillageGirl: Npc.extend(init: (id) ->
      @_super id, Types.Entities.VILLAGEGIRL, 1
    )
    Villager: Npc.extend(init: (id) ->
      @_super id, Types.Entities.VILLAGER, 1
    )
    Coder: Npc.extend(init: (id) ->
      @_super id, Types.Entities.CODER, 1
    )
    Scientist: Npc.extend(init: (id) ->
      @_super id, Types.Entities.SCIENTIST, 1
    )
    Nyan: Npc.extend(init: (id) ->
      @_super id, Types.Entities.NYAN, 1
      @idleSpeed = 50
    )
    Sorcerer: Npc.extend(init: (id) ->
      @_super id, Types.Entities.SORCERER, 1
      @idleSpeed = 150
    )
    Priest: Npc.extend(init: (id) ->
      @_super id, Types.Entities.PRIEST, 1
    )
    BeachNpc: Npc.extend(init: (id) ->
      @_super id, Types.Entities.BEACHNPC, 1
    )
    ForestNpc: Npc.extend(init: (id) ->
      @_super id, Types.Entities.FORESTNPC, 1
    )
    DesertNpc: Npc.extend(init: (id) ->
      @_super id, Types.Entities.DESERTNPC, 1
    )
    LavaNpc: Npc.extend(init: (id) ->
      @_super id, Types.Entities.LAVANPC, 1
    )
    Octocat: Npc.extend(init: (id) ->
      @_super id, Types.Entities.OCTOCAT, 1
    )

  NPCs


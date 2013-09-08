define ["mobs", "items", "npcs", "warrior", "chest"], (Mobs, Items, NPCs, Warrior, Chest) ->
  EntityFactory = {}
  EntityFactory.createEntity = (kind, id, name) ->
    unless kind
      log.error "kind is undefined", true
      return
    throw Error(kind + " is not a valid Entity type")  unless _.isFunction(EntityFactory.builders[kind])
    EntityFactory.builders[kind] id, name

  
  #===== mobs ======
  EntityFactory.builders = []
  EntityFactory.builders[Types.Entities.WARRIOR] = (id, name) ->
    new Warrior(id, name)

  EntityFactory.builders[Types.Entities.RAT] = (id) ->
    new Mobs.Rat(id)

  EntityFactory.builders[Types.Entities.SKELETON] = (id) ->
    new Mobs.Skeleton(id)

  EntityFactory.builders[Types.Entities.SKELETON2] = (id) ->
    new Mobs.Skeleton2(id)

  EntityFactory.builders[Types.Entities.SPECTRE] = (id) ->
    new Mobs.Spectre(id)

  EntityFactory.builders[Types.Entities.DEATHKNIGHT] = (id) ->
    new Mobs.Deathknight(id)

  EntityFactory.builders[Types.Entities.GOBLIN] = (id) ->
    new Mobs.Goblin(id)

  EntityFactory.builders[Types.Entities.OGRE] = (id) ->
    new Mobs.Ogre(id)

  EntityFactory.builders[Types.Entities.CRAB] = (id) ->
    new Mobs.Crab(id)

  EntityFactory.builders[Types.Entities.SNAKE] = (id) ->
    new Mobs.Snake(id)

  EntityFactory.builders[Types.Entities.EYE] = (id) ->
    new Mobs.Eye(id)

  EntityFactory.builders[Types.Entities.BAT] = (id) ->
    new Mobs.Bat(id)

  EntityFactory.builders[Types.Entities.WIZARD] = (id) ->
    new Mobs.Wizard(id)

  EntityFactory.builders[Types.Entities.BOSS] = (id) ->
    new Mobs.Boss(id)

  
  #===== items ======
  EntityFactory.builders[Types.Entities.SWORD2] = (id) ->
    new Items.Sword2(id)

  EntityFactory.builders[Types.Entities.AXE] = (id) ->
    new Items.Axe(id)

  EntityFactory.builders[Types.Entities.REDSWORD] = (id) ->
    new Items.RedSword(id)

  EntityFactory.builders[Types.Entities.BLUESWORD] = (id) ->
    new Items.BlueSword(id)

  EntityFactory.builders[Types.Entities.GOLDENSWORD] = (id) ->
    new Items.GoldenSword(id)

  EntityFactory.builders[Types.Entities.MORNINGSTAR] = (id) ->
    new Items.MorningStar(id)

  EntityFactory.builders[Types.Entities.MAILARMOR] = (id) ->
    new Items.MailArmor(id)

  EntityFactory.builders[Types.Entities.LEATHERARMOR] = (id) ->
    new Items.LeatherArmor(id)

  EntityFactory.builders[Types.Entities.PLATEARMOR] = (id) ->
    new Items.PlateArmor(id)

  EntityFactory.builders[Types.Entities.REDARMOR] = (id) ->
    new Items.RedArmor(id)

  EntityFactory.builders[Types.Entities.GOLDENARMOR] = (id) ->
    new Items.GoldenArmor(id)

  EntityFactory.builders[Types.Entities.FLASK] = (id) ->
    new Items.Flask(id)

  EntityFactory.builders[Types.Entities.FIREPOTION] = (id) ->
    new Items.FirePotion(id)

  EntityFactory.builders[Types.Entities.BURGER] = (id) ->
    new Items.Burger(id)

  EntityFactory.builders[Types.Entities.CAKE] = (id) ->
    new Items.Cake(id)

  EntityFactory.builders[Types.Entities.CHEST] = (id) ->
    new Chest(id)

  
  #====== NPCs ======
  EntityFactory.builders[Types.Entities.GUARD] = (id) ->
    new NPCs.Guard(id)

  EntityFactory.builders[Types.Entities.KING] = (id) ->
    new NPCs.King(id)

  EntityFactory.builders[Types.Entities.VILLAGEGIRL] = (id) ->
    new NPCs.VillageGirl(id)

  EntityFactory.builders[Types.Entities.VILLAGER] = (id) ->
    new NPCs.Villager(id)

  EntityFactory.builders[Types.Entities.CODER] = (id) ->
    new NPCs.Coder(id)

  EntityFactory.builders[Types.Entities.AGENT] = (id) ->
    new NPCs.Agent(id)

  EntityFactory.builders[Types.Entities.RICK] = (id) ->
    new NPCs.Rick(id)

  EntityFactory.builders[Types.Entities.SCIENTIST] = (id) ->
    new NPCs.Scientist(id)

  EntityFactory.builders[Types.Entities.NYAN] = (id) ->
    new NPCs.Nyan(id)

  EntityFactory.builders[Types.Entities.PRIEST] = (id) ->
    new NPCs.Priest(id)

  EntityFactory.builders[Types.Entities.SORCERER] = (id) ->
    new NPCs.Sorcerer(id)

  EntityFactory.builders[Types.Entities.OCTOCAT] = (id) ->
    new NPCs.Octocat(id)

  EntityFactory.builders[Types.Entities.BEACHNPC] = (id) ->
    new NPCs.BeachNpc(id)

  EntityFactory.builders[Types.Entities.FORESTNPC] = (id) ->
    new NPCs.ForestNpc(id)

  EntityFactory.builders[Types.Entities.DESERTNPC] = (id) ->
    new NPCs.DesertNpc(id)

  EntityFactory.builders[Types.Entities.LAVANPC] = (id) ->
    new NPCs.LavaNpc(id)

  EntityFactory


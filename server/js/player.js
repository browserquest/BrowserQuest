
var cls = require("./lib/class"),
    _ = require("underscore"),
    Character = require('./character'),
    Chest = require('./chest'),
    Messages = require("./message"),
    Utils = require("./utils"),
    Properties = require("./properties"),
    Formulas = require("./formulas"),
    check = require("./format").check,
    Types = require("../../shared/js/gametypes"),
    Mob = require("./mob"),
    bcrypt = require('bcrypt');

module.exports = Player = Character.extend({
    init: function(connection, worldServer, databaseHandler) {
        var self = this;

        this.server = worldServer;
        this.connection = connection;
        this.databaseHandler = databaseHandler;

        this._super(this.connection.id, "player", Types.Entities.WARRIOR, 0, 0, "");

        this.hasEnteredGame = false;
        this.isDead = false;
        this.haters = {};
        this.lastCheckpoint = null;
        this.formatChecker = new FormatChecker();
        this.disconnectTimeout = null;

        this.pvpFlag = false;
        this.bannedTime = 0;
        this.banUseTime = 0;
        this.experience = 0;
        this.level = 0;
        this.lastWorldChatMinutes=99;

        this.inventory = [];
        this.inventoryCount = [];
        this.achievement = [];

        this.chatBanEndTime = 0;

        this.connection.listen(function(message) {
            var action = parseInt(message[0]);

            log.debug("Received: "+message);
            if(!check(message)) {
                self.connection.close("Invalid "+Types.getMessageTypeAsString(action)+" message format: "+message);
                return;
            }

            if(!self.hasEnteredGame && action !== Types.Messages.CREATE && action !== Types.Messages.LOGIN) { // CREATE or LOGIN must be the first message
                self.connection.close("Invalid handshake message: "+message);
                return;
            }
            if(self.hasEnteredGame && !self.isDead && (action === Types.Messages.CREATE || action === Types.Messages.LOGIN)) { // CREATE/LOGIN can be sent only once
                self.connection.close("Cannot initiate handshake twice: "+message);
                return;
            }

            self.resetTimeout();

            if(action === Types.Messages.CREATE || action === Types.Messages.LOGIN) {
                var name = Utils.sanitize(message[1]);
                var pw = Utils.sanitize(message[2]);
                var email = Utils.sanitize(message[3]);

                log.info("HELLO: " + name);
                // Always ensure that the name is not longer than a maximum length.
                // (also enforced by the maxlength attribute of the name input element).
                self.name = name.substr(0, 12).trim()

                // Validate the username
                if(!self.checkName(self.name)){
                    self.connection.sendUTF8("invalidusername");
                    self.connection.close("Invalid name " + self.name);
                    return;
                }
                self.pw = pw.substr(0, 15);
                self.email = email;

                if(action === Types.Messages.CREATE) {
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(self.pw, salt, function(err, hash) {
                            log.info("CREATE: " + self.name);
                            self.email = Utils.sanitize(message[3]);
                            self.pw = hash;
                            databaseHandler.createPlayer(self);
                        })
                    });
                } else {
                    log.info("LOGIN: " + self.name);
                    if(self.server.loggedInPlayer(self.name)) {
                        self.connection.sendUTF8("loggedin");
                        self.connection.close("Already logged in " + self.name);
                        return;
                    }
                    databaseHandler.checkBan(self);
                    databaseHandler.loadPlayer(self);
                }
            }
            else if(action === Types.Messages.WHO) {
                log.info("WHO: " + self.name);
                message.shift();
                self.server.pushSpawnsToPlayer(self, message);
            }
            else if(action === Types.Messages.ZONE) {
                log.info("ZONE: " + self.name);
                self.zone_callback();
            }
            else if(action === Types.Messages.CHAT) {
                var msg = Utils.sanitize(message[1]);
                log.info("CHAT: " + self.name + ": " + msg);

                // Sanitized messages may become empty. No need to broadcast empty chat messages.
                if(msg && msg !== "") {
                    msg = msg.substr(0, 60); // Enforce maxlength of chat input
                    // CHAD COMMAND HANDLING IN ASKY VERSION HAPPENS HERE!
                    var key = msg.substr(0, 3);
                    if(key === "/1 "){
                        if((new Date()).getTime() > self.chatBanEndTime)
                            self.server.pushBroadcast(new Messages.Chat(self, msg));
                        else
                            self.send([Types.Messages.NOTIFY, "Block chat"]);
                    } else if(key === "/b "){
                        var banPlayer = self.server.getPlayerByName(msg.split(' ')[2]);
                        var days = (msg.split(' ')[1])*1;
                        if(banPlayer){
                            databaseHandler.banPlayer(self, banPlayer, days);
                        }
                    } else if(key === "/i "){
                        var banPlayer = self.server.getPlayerByName(msg.split(' ')[1]);
                        if(banPlayer) {
                            databaseHandler.newBanPlayer(self, banPlayer);
                        }
                    } else if((key === "/c ") || (key === '/ㅊ ')) {
                        var targetPalyer = self.server.getPlayerByName(msg.split(' ')[1]);
                        if(targetPalyer) {
                            databaseHandler.chatBan(self, targetPalyer);
                        }
                    } else {
                        self.broadcastToZone(new Messages.Chat(self, msg), false);
                    }
                }
            }
            else if(action === Types.Messages.MOVE) {
                log.info("MOVE: " + self.name + "(" + message[1] + ", " + message[2] + ")");
                if(self.move_callback) {
                    var x = message[1],
                        y = message[2];

                    if(self.server.isValidPosition(x, y)) {
                        self.setPosition(x, y);
                        self.clearTarget();

                        self.broadcast(new Messages.Move(self));
                        self.move_callback(self.x, self.y);
                    }
                }
            }
            else if(action === Types.Messages.LOOTMOVE) {
                log.info("LOOTMOVE: " + self.name + "(" + message[1] + ", " + message[2] + ")");
                if(self.lootmove_callback) {
                    self.setPosition(message[1], message[2]);

                    var item = self.server.getEntityById(message[3]);
                    if(item) {
                        self.clearTarget();

                        self.broadcast(new Messages.LootMove(self, item));
                        self.lootmove_callback(self.x, self.y);
                    }
                }
            }
            else if(action === Types.Messages.AGGRO) {
                log.info("AGGRO: " + self.name + " " + message[1]);
                if(self.move_callback) {
                    self.server.handleMobHate(message[1], self.id, 5);
                }
            }
            else if(action === Types.Messages.ATTACK) {
                log.info("ATTACK: " + self.name + " " + message[1]);
                var mob = self.server.getEntityById(message[1]);

                if(mob) {
                    self.setTarget(mob);
                    self.server.broadcastAttacker(self);
                }
            }
            else if(action === Types.Messages.HIT) {
                log.info("HIT: " + self.name + " " + message[1]);
                var mob = self.server.getEntityById(message[1]);
                if(mob && self.id) {
                    var dmg = Formulas.dmg(self, mob);

                    if(dmg > 0) {
                      if(mob.type !== "player"){
                        mob.receiveDamage(dmg, self.id);
                        if(mob.hitPoints <= 0) {
                            if(mob.kind === Types.Entities.RAT) {
                                if(self.achievementFound[2].found && self.achievementProgress[2] !== 999){
                                    if(isNaN(self.achievementProgress[2])) {
                                        self.achievementProgress[2] = 0;
                                    } else {
                                        self.achievementProgress[2]++;
                                    }
                                    if(self.achievementProgress[2] >= 10){
                                        self.send([Types.Messages.ACHIEVEMENT, 2, "complete"]);
                                        self.achievementProgress[2] = 999;
                                        self.incExp(50);
                                    }
                                    databaseHandler.progressAchievement(self.name, 2, self.achievementProgress[2]);
                                }
                            } else if(mob.kind === Types.Entities.CRAB){
                                const achievementId = 18;
                                if(self.achievementFound[achievementId] && self.achievementProgress[achievementId] !== 999){
                                    if(isNaN(self.achievementProgress[achievementId])){
                                        self.achievementProgress[achievementId] = 0;
                                    } else{
                                        self.achievementProgress[achievementId]++;
                                    }
                                    if(self.achievementProgress[achievementId] >= 5){
                                        self.send([Types.Messages.ACHIEVEMENT, achievementId, "complete"]);
                                        self.achievementProgress[achievementId] = 999;
                                        self.incExp(50);
                                    }
                                    databaseHandler.progressAchievement(self.name, achievementId, self.achievementProgress[achievementId]);
                                }
                            } else if(mob.kind === Types.Entities.SKELETON){
                                const achievementId = 21;
                                if(self.achievementFound && self.achievement[achievementId].progress !== 999){
                                    
                                    if(isNaN(self.achievementProgress[achievementId])){
                                        self.achievementProgress[achievementId] = 0;
                                    } else{
                                        self.achievementProgress[achievementId]++;
                                    }
                                    if(self.achievementProgress[achievementId] >= 10){
                                        self.send([Types.Messages.ACHIEVEMENT, 21, "complete"]);
                                        self.achievementProgress[achievementId] = 999;
                                        self.incExp(200);
                                    }
                                    databaseHandler.progressAchievement(self.name, achievementId, self.achievementProgress[achievementId]);
                                }
                            }
                        }
                        self.server.handleMobHate(mob.id, self.id, dmg);
                        self.server.handleHurtEntity(mob, self, dmg);
                      } else {
                            mob.hitPoints -= dmg;
                            self.server.handleHurtEntity(mob);
                            if(mob.hitPoints <= 0){
                                mob.isDead = true;
                                if(mob.firepotionTimeout) {
                                    clearTimeout(mob.firepotionTimeout);
                                }
                                self.server.pushBroadcast(new Messages.Chat(self, self.name + "M-M-M-MONSTER KILLED" + mob.name));
                                self.server.pushBroadcast(new Messages.Chat(self, "/1 " + self.name + "kill " + mob.name + " -PK"));
                            }
                        }
                    }
                }
            }
            else if(action === Types.Messages.HURT) {
                log.info("HURT: " + self.name + " " + message[1]);
                var mob = self.server.getEntityById(message[1]);
                if(mob &&
                    (mob.kind === Types.Entities.FORESTDRAGON
                    || mob.kind == Types.Entities.SEADRAGON)) {
                    var group = self.server.groups[self.group];
                    if(group) {
                        _.each(group.players, function(playerId){
                            var attackedPlayer = self.server.getEntityById(playerId);
                            if(attackedPlayer){
                                attackedPlayer.hitPoints -= Formulas.dmg(mob, attackedPlayer);
                                self.server.handleHurtEntity(attackedPlayer);
                            }
                        });
                    }
                }
                if(mob && self.hitPoints > 0 && mob instanceof Mob) {
                    self.hitPoints -= Formulas.dmg(mob, self);
                    self.server.handleHurtEntity(self);
                    mob.addTanker(self.id);

                    if(self.hitPoints <= 0) {
                        self.isDead = true;
                        if(self.level >= 50){
                            self.incExp(Math.floor(self.level*self.level*(-2)));
                        }
                        if(self.firepotionTimeout) {
                            clearTimeout(self.firepotionTimeout);
                        }
                    }
                }
            }
            else if(action === Types.Messages.LOOT) {
                log.info("LOOT: " + self.name + " " + message[1]);
                var item = self.server.getEntityById(message[1]);

                if(item) {
                    var kind = item.kind;

                    if(Types.isItem(kind)) {
                        self.broadcast(item.despawn());
                        self.server.removeEntity(item);

                        if(kind === Types.Entities.FIREPOTION) {
                            self.updateHitPoints();
                            self.broadcast(self.equip(Types.Entities.FIREBENEF));
                            self.firepotionTimeout = setTimeout(function() {
                                self.broadcast(self.equip(Types.Entities.DEBENEF)); // return to normal after 15 sec
                                self.firepotionTimeout = null;
                            }, 15000);
                            self.send(new Messages.HitPoints(self.maxHitPoints).serialize());
                        } else if(Types.isHealingItem(kind)) {
                            self.putInventory(item);
                        } else if(Types.isWeapon(kind)) {
                            self.equipItem(item.kind);
                            self.broadcast(self.equip(kind));

                            
                            
                        } else if(Types.isArmor(kind)) {
                            if(self.level < 100){
                                self.equipItem(item.kind);
                                self.broadcast(self.equip(kind));
                            } else {
                                self.putInventory(item);
                            }
                        } else if(kind == Types.Entities.CAKE || kind === Types.Entities.CD){
                            self.putInventory(item);
                        }
                    }
                }
            }
            else if(action === Types.Messages.TELEPORT) {
                log.info("TELEPORT: " + self.name + "(" + message[1] + ", " + message[2] + ")");
                var x = message[1],
                    y = message[2];

                if(self.server.isValidPosition(x, y)) {
                    self.setPosition(x, y);
                    self.clearTarget();

                    self.broadcast(new Messages.Teleport(self));

                    self.server.handlePlayerVanish(self);
                    self.server.pushRelevantEntityListTo(self);
                    self.broadcast(new Messages.Teleport(self));
                }
            }
            else if(action === Types.Messages.OPEN) {
                log.info("OPEN: " + self.name + " " + message[1]);
                var chest = self.server.getEntityById(message[1]);
                if(chest && chest instanceof Chest) {
                    self.server.handleOpenedChest(chest, self);
                }
            }
            else if(action === Types.Messages.CHECK) {
                log.info("CHECK: " + self.name + " " + message[1]);
                var checkpoint = self.server.map.getCheckpoint(message[1]);
                if(checkpoint) {
                    self.lastCheckpoint = checkpoint;
                    databaseHandler.setCheckpoint(self.name, self.x, self.y);
                }
            }
            else if(action === Types.Messages.INVENTORY){
                log.info("INVENTORY: " + self.name + " " + message[1] + " " + message[2] + " " + message[3]);
                var inventoryNumber = message[2],
                    count = message[3];

                if(inventoryNumber !== 0 && inventoryNumber !== 1){
                    return;
                }

                var itemKind = self.inventory[inventoryNumber];
                if(itemKind){
                    if(message[1] === "avatar" || message[1] === "armor"){
                        if(message[1] === "avatar"){
                            self.inventory[inventoryNumber] = null;
                            databaseHandler.makeEmptyInventory(self.name, inventoryNumber);
                            self.equipItem(itemKind, true);
                        } else{
                            self.inventory[inventoryNumber] = self.armor;
                            databaseHandler.setInventory(self.name, self.armor, inventoryNumber, 1);
                            self.equipItem(itemKind, false);
                        }
                        self.broadcast(self.equip(itemKind));
                    } else if(message[1] === "empty"){
                        //var item = self.server.addItem(self.server.createItem(itemKind, self.x, self.y));
                        var item = self.server.addItemFromChest(itemKind, self.x, self.y);
                        if(Types.isHealingItem(item.kind)){
                            if(count < 0)
                                count = 0;
                            else if(count > self.inventoryCount[inventoryNumber])
                                count = self.inventoryCount[inventoryNumber];
                            item.count = count;
                        }

                        if(item.count > 0) {
                            self.server.handleItemDespawn(item);

                            if(Types.isHealingItem(item.kind)) {
                                if(item.count === self.inventoryCount[inventoryNumber]) {
                                    self.inventory[inventoryNumber] = null;
                                    databaseHandler.makeEmptyInventory(self.name, inventoryNumber);
                                } else {
                                    self.inventoryCount[inventoryNumber] -= item.count;
                                    databaseHandler.setInventory(self.name, self.inventory[inventoryNumber], inventoryNumber, self.inventoryCount[inventoryNumber]);
                                }
                            } else {
                                self.inventory[inventoryNumber] = null;
                                databaseHandler.makeEmptyInventory(self.name, inventoryNumber);
                            }
                        }
                    } else if(message[1] === "eat"){
                        var amount;

                        switch(itemKind) {
                            case Types.Entities.FLASK:
                                amount = 80;
                                break;
                            case Types.Entities.BURGER:
                                amount = 200;
                                break;
                        }

                        if(!self.hasFullHealth()) {
                            self.regenHealthBy(amount);
                            self.server.pushToPlayer(self, self.health());
                        }
                        self.inventoryCount[inventoryNumber] -= 1;
                        if(self.inventoryCount[inventoryNumber] <= 0){
                            self.inventory[inventoryNumber] = null;
                        }
                        databaseHandler.setInventory(self.name, self.inventory[inventoryNumber], inventoryNumber, self.inventoryCount[inventoryNumber]);
                    }
                }
            }
            else if(action === Types.Messages.ACHIEVEMENT) {
                log.info("ACHIEVEMENT: " + self.name + " " + message[1] + " " + message[2]);
                if(message[2] === "found") {
                    self.achievementFound[message[1]] = true;
                    databaseHandler.foundAchievement(self.name, message[1]);
                }
            } else if(action === Types.Messages.TALKTONPC){
                log.info("TALKTONPC: " + self.name + " " + message[1]);
                if(message[1] === Types.Entities.VILLAGER){
                    if(self.armor === Types.Entities.LEATHERARMOR
                    && self.achievementFound[17] === true
                    && self.achievementProgress[17] !== 999){
                        self.equipItem(Types.Entities.CLOTHARMOR);
                        self.send([Types.Messages.ACHIEVEMENT, 17, "complete"]);
                        self.achievementProgress[17] = 999;
                        self.incExp(50);
                        databaseHandler.progressAchievement(self.name, 17, self.achievementProgress[17]);
                    }
                } else if(message[1] === Types.Entities.AGENT){
                    if((self.inventory[0] === Types.Entities.CAKE
                    || self.inventory[1] === Types.Entities.CAKE)
                    && self.achievementFound[19] === true
                    && self.achievementProgress[19] !== 999) {
                        if(self.inventory[0] === Types.Entities.CAKE){
                            self.inventory[0] = null;
                            databaseHandler.makeEmptyInventory(self.name, 0);
                        } else {
                            self.inventory[1] = null;
                            databaseHandler.makeEmptyInventory(self.name, 1);
                        }

                        self.send([Types.Messages.ACHIEVEMENT, 19, "complete"]);
                        self.achievementProgress[19] = 999;
                        self.incExp(50);
                        databaseHandler.progressAchievement(self.name, 19, self.achievementProgress[19]);
                    }
                } else if(message[1] === Types.Entities.NYAN){
                    const achievementId = 20;
                    if((self.inventory[0] === Types.Entities.CD
                     || self.inventory[1] === Types.Entities.CD)
                    && self.achievementFound[achievementId] === true
                    && self.achievementProgress[achievementId] !== 999){
                        if(self.inventory[0] === Types.Entities.CD){
                            self.inventory[0] = null;
                            databaseHandler.makeEmptyInventory(self.name, 0);
                        } else {
                            self.inventory[1] = null;
                            databaseHandler.makeEmptyInventory(self.name, 1);
                        }

                        self.send([Types.Messages.ACHIEVEMENT, 20, "complete"]);
                        self.achievementProgress[achievementId] = 999;
                        self.incExp(100);
                        databaseHandler.progressAchievement(self.name, 20, self.achievementProgress[achievementId]);
                    }
                } else if(message[1] === Types.Entities.DESERTNPC){
                    const achievementId = 22;
                    if(self.weapon === Types.Entities.AXE
                    && self.achievementFound[achievementId] === true
                    && self.achievementProgress[achievementId] !== 999){
                        self.equipItem(Types.Entities.SWORD2);
                        self.send([Types.Messages.ACHIEVEMENT, 22, "complete"]);
                        self.achievementProgress[achievementId] = 999;
                        self.incExp(200);
                        databaseHandler.progressAchievement(self.name, 22, self.achievementProgress[achievementId]);
                    }
                }
            } else if(action === Types.Messages.MAGIC){
                log.info("MAGIC: " + self.name + " " + message[1] + " " + message[2]);
                var magicName = message[1];
                var magicTargetName = message[2];
  
                if(magicName === "setheal"){
                  self.magicTarget = self.server.getPlayerByName(magicTargetName);
                  if(self.magicTarget === self){
                    self.magicTarget = null;
                  }
                } else if(magicName === "heal"){
                  if(self.magicTarget){
                    if(!self.magicTarget.hasFullHealth()) {
                        self.magicTarget.regenHealthBy(50);
                        self.server.pushToPlayer(self.magicTarget, self.magicTarget.health());
                    }
                  }
                }
            } else if(action === Types.Messages.BOARD){
                log.info("BOARD: " + self.name + " " + message[1] + " " + message[2]);
                var command = message[1];
                var number = message[2];
                var replyNumber = message[3];
                databaseHandler.loadBoard(self, command, number, replyNumber);
            } else if(action === Types.Messages.BOARDWRITE){
                log.info("BOARDWRITE: " + self.name + " " + message[1] + " " + message[2] + " " + message[3]);
                var command = message[1];
                if(command === "board"){
                  var title = message[2];
                  var content = message[3];
                  databaseHandler.writeBoard(self, title, content);
                } else if(command === "reply"){
                  var reply = message[2];
                  var number = message[3]*1;
                  if(number > 0){
                    databaseHandler.writeReply(self, reply, number);
                  }
                }
            } else if(action === Types.Messages.KUNG){
                log.info("KUNG: " + self.name + " " + message[1]);
                var word = message[1];
                databaseHandler.pushKungWord(self, word);
            } else if(action === Types.Messages.GUILD) {
                if(message[1] === Types.Messages.GUILDACTION.CREATE) {
                    var guildname = Utils.sanitize(message[2]);
                    if(guildname === "") { //inaccurate name
                        self.server.pushToPlayer(self, new Messages.GuildError(Types.Messages.GUILDERRORTYPE.BADNAME,message[2]));
                    } else {
                        var guildId = self.server.addGuild(guildname);
                        if(guildId === false) {
                            self.server.pushToPlayer(self, new Messages.GuildError(Types.Messages.GUILDERRORTYPE.ALREADYEXISTS, guildname));
                        } else {
                            self.server.joinGuild(self, guildId);
                            self.server.pushToPlayer(self, new Messages.Guild(Types.Messages.GUILDACTION.CREATE, [guildId, guildname]));
                        }
                    }
                }
                else if(message[1] === Types.Messages.GUILDACTION.INVITE) {
                    var userName = message[2];
                    var invitee;
                    if(self.group in self.server.groups) {
                        invitee = _.find(self.server.groups[self.group].entities,
                                         function(entity, key) { return (entity instanceof Player && entity.name == userName) ? entity : false; });
                        if(invitee) {
                            self.getGuild().invite(invitee,self);
                        }
                    }
                }
                else if(message[1] === Types.Messages.GUILDACTION.JOIN) {
                    self.server.joinGuild(self, message[2], message[3]);
                }
                else if(message[1] === Types.Messages.GUILDACTION.LEAVE) {
                    self.leaveGuild();
                }
                else if(message[1] === Types.Messages.GUILDACTION.TALK) {
                    self.server.pushToGuild(self.getGuild(), new Messages.Guild(Types.Messages.GUILDACTION.TALK, [self.name, self.id, message[2]]));
                }
            } else {
                if(self.message_callback) {
                    self.message_callback(message);
                }
            }
        });

        this.connection.onClose(function() {
            if(self.firepotionTimeout) {
                clearTimeout(self.firepotionTimeout);
            }
            clearTimeout(self.disconnectTimeout);
            if(self.exit_callback) {
                self.exit_callback();
            }
        });

        this.connection.sendUTF8("go"); // Notify client that the HELLO/WELCOME handshake can start
    },

    destroy: function() {
        var self = this;

        this.forEachAttacker(function(mob) {
            mob.clearTarget();
        });
        this.attackers = {};

        this.forEachHater(function(mob) {
            mob.forgetPlayer(self.id);
        });
        this.haters = {};
    },

    getState: function() {
        var basestate = this._getBaseState(),
            state = [this.name, this.orientation, this.avatar, this.weapon, this.level];

        if(this.target) {
            state.push(this.target);
        }

        return basestate.concat(state);
    },

    send: function(message) {
        this.connection.send(message);
    },

    flagPVP: function(pvpFlag) {
        if(this.pvpFlag != pvpFlag){
            this.pvpFlag = pvpFlag;
            this.send(new Messages.PVP(this.pvpFlag).serialize());
        }
    },

    broadcast: function(message, ignoreSelf) {
        if(this.broadcast_callback) {
            this.broadcast_callback(message, ignoreSelf === undefined ? true : ignoreSelf);
        }
    },

    broadcastToZone: function(message, ignoreSelf) {
        if(this.broadcastzone_callback) {
            this.broadcastzone_callback(message, ignoreSelf === undefined ? true : ignoreSelf);
        }
    },

    onExit: function(callback) {
        this.exit_callback = callback;
    },

    onMove: function(callback) {
        this.move_callback = callback;
    },

    onLootMove: function(callback) {
        this.lootmove_callback = callback;
    },

    onZone: function(callback) {
        this.zone_callback = callback;
    },

    onOrient: function(callback) {
        this.orient_callback = callback;
    },

    onMessage: function(callback) {
        this.message_callback = callback;
    },

    onBroadcast: function(callback) {
        this.broadcast_callback = callback;
    },

    onBroadcastToZone: function(callback) {
        this.broadcastzone_callback = callback;
    },

    equip: function(item) {
        return new Messages.EquipItem(this, item);
    },

    addHater: function(mob) {
        if(mob) {
            if(!(mob.id in this.haters)) {
                this.haters[mob.id] = mob;
            }
        }
    },

    removeHater: function(mob) {
        if(mob && mob.id in this.haters) {
            delete this.haters[mob.id];
        }
    },

    forEachHater: function(callback) {
        _.each(this.haters, function(mob) {
            callback(mob);
        });
    },

    equipArmor: function(kind) {
        this.armor = kind;
        this.armorLevel = Properties.getArmorLevel(kind);
    },

    equipAvatar: function(kind) {
        if(kind) {
            this.avatar = kind;
        } else {
            this.avatar = Types.Entities.CLOTHARMOR;
        }
     },

    equipWeapon: function(kind) {
        this.weapon = kind;
        this.weaponLevel = Properties.getWeaponLevel(kind);
    },

    equipItem: function(itemKind, isAvatar) {
        var self = this;
        if(itemKind) {
            log.debug(this.name + " equips " + Types.getKindAsString(itemKind));

            if(Types.isArmor(itemKind)) {
                if(isAvatar) {
                    this.databaseHandler.equipAvatar(this.name, Types.getKindAsString(itemKind));
                    this.equipAvatar(itemKind);
                } else {
                    this.databaseHandler.equipAvatar(this.name, Types.getKindAsString(itemKind));
                    this.equipAvatar(itemKind);

                    this.databaseHandler.equipArmor(this.name, Types.getKindAsString(itemKind));
                    this.equipArmor(itemKind);
                }
                this.updateHitPoints();
                this.send(new Messages.HitPoints(this.maxHitPoints).serialize());
            } else if(Types.isWeapon(itemKind)) {
                this.databaseHandler.equipWeapon(this.name, Types.getKindAsString(itemKind));
                this.equipWeapon(itemKind);

                const achievementId = 1;
                if(self.achievementProgress[achievementId] < 999) {
                    self.achievementProgress[achievementId] = 999;
                    self.send([Types.Messages.ACHIEVEMENT, achievementId, "complete"]);
                    self.databaseHandler.progressAchievement(self.name, achievementId, self.achievementProgress[achievementId]);
                }
            }
        }
    },

    updateHitPoints: function() {
        this.resetHitPoints(Formulas.hp(this.level));
    },

    updatePosition: function() {
        if(this.requestpos_callback) {
            var pos = this.requestpos_callback();
            this.setPosition(pos.x, pos.y);
        }
    },

    onRequestPosition: function(callback) {
        this.requestpos_callback = callback;
    },

    resetTimeout: function() {
        clearTimeout(this.disconnectTimeout);
        this.disconnectTimeout = setTimeout(this.timeout.bind(this), 1000 * 60 * 15); // 15 min.
    },

    timeout: function() {
        this.connection.sendUTF8("timeout");
        this.connection.close("Player was idle for too long");
    },

    incExp: function(gotexp){
        this.experience = parseInt(this.experience) + (parseInt(gotexp));
        this.databaseHandler.setExp(this.name, this.experience);
        var origLevel = this.level;
        this.level = Types.getLevel(this.experience);
        if(origLevel !== this.level) {
            this.updateHitPoints();
            this.send(new Messages.HitPoints(this.maxHitPoints).serialize());
        }
    },

    setGuildId: function(id) {
        if(typeof this.server.guilds[id] !== "undefined") {
            this.guildId = id;
        }
        else {
            log.error(this.id + " cannot add guild " + id + ", it does not exist");
        }
    },

    getGuild: function() {
        return this.hasGuild ? this.server.guilds[this.guildId] : undefined;
    },

    hasGuild: function() {
        return (typeof this.guildId !== "undefined");
    },

    leaveGuild: function() {
        if(this.hasGuild()){
            var leftGuild = this.getGuild();
            leftGuild.removeMember(this);
            this.server.pushToGuild(leftGuild, new Messages.Guild(Types.Messages.GUILDACTION.LEAVE, [this.name, this.id, leftGuild.name]));
            delete this.guildId;
            this.server.pushToPlayer(this, new Messages.Guild(Types.Messages.GUILDACTION.LEAVE, [this.name, this.id, leftGuild.name]));
        }
        else {
            this.server.pushToPlayer(this, new Messages.GuildError(Types.Messages.GUILDERRORTYPE.NOLEAVE,""));
        }
    },

    checkName: function(name) {
        if(name === null) return false;
        else if(name === '') return false;
        else if(name === ' ') return false;

        for(var i=0; i < name.length; i++) {
            var c = name.charCodeAt(i);

            if(!((0xAC00 <= c && c <= 0xD7A3) || (0x3131 <= c && c <= 0x318E)       // Korean (Unicode blocks "Hangul Syllables" and "Hangul Compatibility Jamo")
                || (0x61 <= c && c <= 0x7A) || (0x41 <= c && c <= 0x5A)             // English (lowercase and uppercase)
                || (0x30 <= c && c <= 0x39)                                         // Numbers
                || (c == 0x20) || (c == 0x5f)                                       // Space and underscore
                || (c == 0x28) || (c == 0x29)                                       // Parentheses
                || (c == 0x5e))) {                                                  // Caret
                return false;
            }
        }
        return true;
    },

    sendWelcome: function(armor, weapon, avatar, weaponAvatar, exp, admin,
                          bannedTime, banUseTime,
                          inventory, inventoryNumber, achievementFound, achievementProgress,
                          x, y,
                          chatBanEndTime) {
        var self = this;
        self.kind = Types.Entities.WARRIOR;
        self.admin = admin;
        self.equipArmor(Types.getKindFromString(armor));
        self.equipAvatar(Types.getKindFromString(avatar));
        self.equipWeapon(Types.getKindFromString(weapon));
        self.inventory[0] = Types.getKindFromString(inventory[0]);
        self.inventory[1] = Types.getKindFromString(inventory[1]);
        self.inventoryCount[0] = inventoryNumber[0];
        self.inventoryCount[1] = inventoryNumber[1];
        self.achievementFound = achievementFound;
        self.achievementProgress = achievementProgress;
        
        self.bannedTime = bannedTime;
        self.banUseTime = banUseTime;
        self.experience = exp;
        self.level = Types.getLevel(self.experience);
        self.orientation = Utils.randomOrientation;
        self.updateHitPoints();
        if(x === 0 && y === 0) {
            self.updatePosition();
        } else {
            self.setPosition(x, y);
        }
        self.chatBanEndTime = chatBanEndTime;

        self.server.addPlayer(self);
        self.server.enter_callback(self);
        
        self.send([
            Types.Messages.WELCOME, self.id, self.name, self.x, self.y,
            self.hitPoints, armor, weapon, avatar, weaponAvatar,
            self.experience, self.admin,
            inventory[0], inventoryNumber[0], inventory[1], inventoryNumber[1],
            achievementFound, achievementProgress,
        ]);

        self.hasEnteredGame = true;
        self.isDead = false;

        // self.server.addPlayer(self, aGuildId);

    },
    putInventory: function(item){
        if(Types.isHealingItem(item.kind)){
            if(this.inventory[0] === item.kind){
                this.inventoryCount[0] += item.count;
                this.databaseHandler.setInventory(this.name, item.kind, 0, this.inventoryCount[0]);
            } else if(this.inventory[1] === item.kind){
                this.inventoryCount[1] += item.count;
                this.databaseHandler.setInventory(this.name, item.kind, 1, this.inventoryCount[1]);
            } else{
                this._putInventory(item);
            }
        } else{
            this._putInventory(item);
        }
    },
    _putInventory: function(item){
        if(!this.inventory[0]){
            this.inventory[0] = item.kind;
            this.inventoryCount[0] = item.count;
            this.databaseHandler.setInventory(this.name, item.kind, 0, item.count);
        } else if(!this.inventory[1]){
            this.inventory[1] = item.kind;
            this.inventoryCount[1] = item.count;
            this.databaseHandler.setInventory(this.name, item.kind, 1, item.count);
        }
    },
});

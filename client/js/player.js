
define(['character', 'exceptions'], function(Character, Exceptions) {

    var Player = Character.extend({
        MAX_LEVEL: 10,

        init: function(id, name, pw, kind, guild) {
            this._super(id, kind);

            this.name = name;
            this.pw = pw;
            
            if (typeof guild !== 'undefined') {
				this.setGuild(guild);
			}

            // Renderer
             this.nameOffsetY = -10;

            // sprites
            this.spriteName = "clotharmor";
            this.armorName = "clotharmor";
            this.weaponName = "sword1";

            // Inventory
            this.inventory = [];
            this.inventoryCount = [];
            this.healingCoolTimeCallback = null;

            this.magicCoolTimeCallback = null;
            this.healTargetName = null;

            // modes
            this.isLootMoving = false;
            this.isSwitchingWeapon = true;

            // PVP Flag
            this.pvpFlag = false;

            // Benef
            this.invincible = false; // Fire Benef
        },

        getGuild: function() {
			return this.guild;
		},
		
		setGuild: function(guild) {
			this.guild = guild;
			$('#guild-population').addClass("visible");
			$('#guild-name').html(guild.name);
		},
		
		unsetGuild: function(){
			delete this.guild;
			$('#guild-population').removeClass("visible");
		},
		
        hasGuild: function(){
			return (typeof this.guild !== 'undefined');
		},
		
			
		addInvite: function(inviteGuildId){
			this.invite = {time:new Date().valueOf(), guildId: inviteGuildId};
		},
		
		deleteInvite: function(){
			delete this.invite;
		},
		
		checkInvite: function(){
			if(this.invite && ( (new Date().valueOf() - this.invite.time) < 595000)){
				return this.invite.guildId;
			}
			else{
				if(this.invite){
					this.deleteInvite();
					return -1;
				}
				else{
					return false;
				}
			}
		},

        loot: function(item) {
            if(item) {
                var rank, currentRank, msg;

                if(item.type === "armor") {
                    // rank = Types.getArmorRank(item.kind);
                    // currentRank = Types.getArmorRank(Types.getKindFromString(currentArmorName));
                    // msg = "You are wearing a better armor";
                    if(this.level >= 100){
                        this.putInventory(item.kind, 1);
                      } else{
                        rank = Types.getArmorRank(item.kind);
                        currentRank = Types.getArmorRank(Types.getKindFromString(this.armorName));
                        msg = "You are wielding a better armor";
  
                        if(rank && currentRank) {
                          if(rank === currentRank) {
                              throw new Exceptions.LootException("You already have this "+item.type);
                          } else if(rank <= currentRank) {
                              throw new Exceptions.LootException(msg);
                          }
                        }
                      }
                } else if(item.type === "weapon") {
                    rank = Types.getWeaponRank(item.kind);
                    currentRank = Types.getWeaponRank(Types.getKindFromString(this.weaponName));
                    msg = "You are wielding a better weapon";

                    if(rank && currentRank) {
                        if(rank === currentRank) {
                            throw new Exceptions.LootException("You already have this "+item.type);
                        } else if(rank <= currentRank) {
                            throw new Exceptions.LootException(msg);
                        }
                    }
                } else if(item.kind === Types.Entities.CAKE){
                    this.putInventory(item.kind, 1);
                } else if(Types.isHealingItem(item.kind)){
                    this.putInventory(item.kind, item.count);
                } else if(item.kind === Types.Entities.CD){
                    this.putInventory(item.kind, 1);
                }

                log.info('Player '+this.id+' has looted '+item.id);
                if(Types.isArmor(item.kind) && this.invincible) {
                    this.stopInvincibility();
                }
                item.onLoot(this);
            }
        },
        putInventory: function(itemKind, count){
            if(Types.isHealingItem(itemKind)){
                if(this.inventory[0] === itemKind){
                    this.inventoryCount[0] += count;
                } else if(this.inventory[1] === itemKind){
                    this.inventoryCount[1] += count;
                } else{
                    this._putInventory(itemKind, count);
                }
            } else{
                this._putInventory(itemKind, count);
            }
        },
        _putInventory: function(itemKind, count){
            if(!this.inventory[0]){
                this.inventory[0] = itemKind;
                this.inventoryCount[0] = count;
            } else if(!this.inventory[1]){
                this.inventory[1] = itemKind;
                this.inventoryCount[1] = count;
            } else{
                throw new Exceptions.LootException("Inventory is full");
            }
        },

        setInventory: function(itemKind, inventoryNumber, number){
            this.inventory[inventoryNumber] = itemKind;
            this.inventoryCount[inventoryNumber] = number;
        },
        makeEmptyInventory: function(inventoryNumber){
            if(inventoryNumber === 0 || inventoryNumber === 1){
                this.inventory[inventoryNumber] = null;
            }
        },
        decInventory: function(inventoryNumber){
            var self = this;

            if(this.healingCoolTimeCallback === null){
                this.healingCoolTimeCallback = setTimeout(function(){
                    self.healingCoolTimeCallback = null;
                }, 500);
                this.inventoryCount[inventoryNumber] -= 1;
                if(this.inventoryCount[inventoryNumber] <= 0){
                    this.inventory[inventoryNumber] = null;
                }
                return true;
            }
            return false;
        },
        magicCoolTimeCheck: function(){
            var self = this;
            if(this.magicCoolTimeCallback === null){
              this.magicCoolTimeCallback = setTimeout(function(){
                self.magicCoolTimeCallback = null;
              }, 10000000);
              return true;
            }
            return false;
          },

        /**
         * Returns true if the character is currently walking towards an item in order to loot it.
         */
        isMovingToLoot: function() {
            return this.isLootMoving;
        },

        getSpriteName: function() {
            return this.spriteName;
        },

        setSpriteName: function(name) {
            if(name) {
                this.spriteName = name;
            }
        },

        getArmorName: function() {
            return this.armorName;
        },

        getArmorSprite: function() {
            return this.sprite;
        },
        setArmorName: function(name){
            if(name) {
                this.armorName = name;
            }
        },

        getWeaponName: function() {
            return this.weaponName;
        },
        
        setWeaponName: function(name) {
            if(name) {
                this.weaponName = name;
            }
        },

        hasWeapon: function() {
            return this.weaponName !== null;
        },
        setBenef: function() {
            if(itemKind === Types.Entities.FIREBENEF){
                this.startInvincibility();
            } else{
                this.stopInvincibility();
            }
        },
        equipFromInventory: function(type, inventoryNumber, sprites){
            var itemString = Types.getKindAsString(this.inventory[inventoryNumber]);

            if(itemString){
                var itemSprite = sprites[itemString];
                if(itemSprite){
                    if(type === "armor"){
                        this.inventory[inventoryNumber] = Types.getKindFromString(this.getArmorName());
                        this.setSpriteName(itemString);
                        this.setSprite(itemSprite);
                        this.setArmorName(itemString);
                    } else if(type === "avatar"){
                        this.inventory[inventoryNumber] = null;
                        this.setSpriteName(itemString);
                        this.setSprite(itemSprite);
                    }
                }
            }
        },
        switchArmor: function(armorName, sprite){
            this.setSpriteName(armorName);
            this.setSprite(sprite);
            this.setArmorName(armorName);
            if(this.switch_callback) {
              this.switch_callback();
            }
        },
        switchWeapon: function(newWeaponName) {
            var count = 14,
                value = false,
                self = this;

            var toggle = function() {
                value = !value;
                return value;
            };

            if(newWeaponName !== this.getWeaponName()) {
                if(this.isSwitchingWeapon) {
                    clearInterval(blanking);
                }

                this.switchingWeapon = true;
                var blanking = setInterval(function() {
                    if(toggle()) {
                        self.setWeaponName(newWeaponName);
                    } else {
                        self.setWeaponName(null);
                    }

                    count -= 1;
                    if(count === 1) {
                        clearInterval(blanking);
                        self.switchingWeapon = false;

                        if(self.switch_callback) {
                            self.switch_callback();
                        }
                    }
                }, 90);
            }
        },

        onArmorLoot: function(callback){
            this.armorloot_callback = callback;
        },

        onSwitchItem: function(callback) {
            this.switch_callback = callback;
        },

        onInvincible: function(callback) {
            this.invincible_callback = callback;
        },
        
        startInvincibility: function() {
            var self = this;

            if(!this.invincible) {
                this.invincible = true;
                if(this.invincible_callback){
                    this.invincible_callback();
                }
            } else {
                // If the player already has invincibility, just reset its duration.
                if(this.invincibleTimeout) {
                    clearTimeout(this.invincibleTimeout);
                }
            }

            this.invincibleTimeout = setTimeout(function() {
                self.stopInvincibility();
                self.idle();
            }, 15000);
        },

        stopInvincibility: function() {
            if(this.invincible_callback) {
                this.invincible_callback();
            }
            this.invincible = false;

            if(this.invincibleTimeout) {
                clearTimeout(this.invincibleTimeout);
            }
         },
        flagPVP: function(pvpFlag){
            this.pvpFlag = pvpFlag;
       }
    });

    return Player;
});

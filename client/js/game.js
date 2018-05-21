define(['infomanager', 'bubble', 'renderer', 'map', 'animation', 'sprite',
        'tile', 'warrior', 'gameclient', 'audio', 'updater', 'transition',
        'pathfinder', 'item', 'mob', 'npc', 'player', 'character', 'chest',
        'mobs', 'exceptions', 'config', 'chathandler', 'textwindowhandler',
        'menu', 'boardhandler', 'kkhandler', 'guild', '../../shared/js/gametypes'],
function(InfoManager, BubbleManager, Renderer, Map, Animation, Sprite, AnimatedTile,
         Warrior, GameClient, AudioManager, Updater, Transition, Pathfinder,
         Item, Mob, Npc, Player, Character, Chest, Mobs, Exceptions, config,
         ChatHandler, TextWindowHandler, Menu, BoardHandler, KkHandler, Guild) {
    var Game = Class.extend({
        init: function(app) {
            this.app = app;
            this.app.config = config;
            this.ready = false;
            this.started = false;
            this.hasNeverStarted = true;

            this.renderer = null;
            this.updater = null;
            this.pathfinder = null;
            this.chatinput = null;
            this.bubbleManager = null;
            this.audioManager = null;

            // Player
            this.player = new Warrior("player", "");
            this.player.moveUp = false;
            this.player.moveDown = false;
            this.player.moveLeft = false;
            this.player.moveRight = false;
            this.player.disableKeyboardNpcTalk = false;

            // Game state
            this.entities = {};
            this.deathpositions = {};
            this.entityGrid = null;
            this.pathingGrid = null;
            this.renderingGrid = null;
            this.itemGrid = null;
            this.currentCursor = null;
            this.mouse = { x: 0, y: 0 };
            this.zoningQueue = [];
            this.previousClickPosition = {};

            this.cursorVisible = true;
            this.selectedX = 0;
            this.selectedY = 0;
            this.selectedCellVisible = false;
            this.targetColor = "rgba(255, 255, 255, 0.5)";
            this.targetCellVisible = true;
            this.hoveringTarget = false;
            this.hoveringPlayer = false;
            this.hoveringMob = false;
            this.hoveringItem = false;
            this.hoveringCollidingTile = false;

            // Global chats
            this.chats = 0;
            this.maxChats = 3;
            this.globalChatColor = '#A6FFF9';

            // combat
            this.infoManager = new InfoManager(this);

            // Chat commands
            this.kkhandler = new KkHandler();
            this.chathandler = new ChatHandler(this, this.kkhandler);
            this.boardhandler = new BoardHandler(this);

            // TextWindow Handler
            this.textWindowHandler = new TextWindowHandler();

            // Menu
            this.menu = new Menu();

            // Item Info
            this.itemInfoOn = true;

            // zoning
            this.currentZoning = null;

            this.cursors = {};

            this.sprites = {};

            // tile animation
            this.animatedTiles = null;

            // debug
            this.debugPathing = false;
            
            // pvp
            this.pvpFlag = false;

            // Shorcut Healing
            this.healShortCut = -1;
            this.hpGuide = 0;

            // sprites
            this.spriteNames = [
                "seadragon", "seadragonarmor", "item-seadragonarmor", "searage",
                "item-searage", "purplecloudkallege", "item-purplecloudkallege",
                "snowlady", "daywalker", "item-daywalker", "pirateking", "item-pirateking",
                "hermitcrab", "zombie", "piratecaptain", "ironogre", "ogrelord", "adherer",
                "icegolem", "flaredeathknight", "redsickle", "item-redsickle",
                "regionhenchman", "plunger", "item-plunger", "purplepreta", "sickle",
                "item-sickle", "icevulture", "portalarmor", "item-portalarmor",
                "item-adminarmor", "adminarmor", "pain", "rabbitarmor", "item-rabbitarmor",
                "crystalscolpion", "eliminator", "firebenef", "taekwondo", "item-taekwondo",
                "darkogre", "item-book", "item-cd", "frostqueen", "snowrabbit", "snowwolf",
                "iceknight", "miniiceknight", "snowelf", "whitebear", "cobra", "goldgolem",
                "darkregion", "darkregionillusion", "nightmareregion", "justicehammer",
                "item-justicehammer", "firesword", "item-firesword", "whip", "item-whip",
                "forestguardiansword", "item-forestguardiansword", "gayarmor",
                "item-gayarmor", "schooluniform", "item-schooluniform", "beautifullife",
                "item-beautifullife", "regionarmor", "item-regionarmor", "ghostrider",
                "item-ghostrider", "desertscolpion", "darkscolpion", "vulture",
                "forestdragon", "bluewingarmor", "item-bluewingarmor", "thiefarmor",
                "item-thiefarmor", "ninjaarmor", "item-ninjaarmor", "dragonarmor",
                "item-dragonarmor", "fallenarmor", "item-fallenarmor", "paladinarmor",
                "item-paladinarmor", "crystalarmor", "item-crystalarmor", "adhererrobe",
                "item-adhererrobe", "frostarmor", "item-frostarmor", "redmetalsword",
                "item-redmetalsword", "bastardsword", "item-bastardsword", "halberd",
                "item-halberd", "rose", "item-rose", "icerose", "item-icerose", "hand",
                "sword", "loot", "target", "talk", "sparks", "shadow16", "rat", "skeleton",
                "skeleton2", "spectre", "skeletonking", "deathknight", "ogre", "crab",
                "snake", "eye", "bat", "goblin", "wizard", "guard", "king", "villagegirl",
                "villager", "coder", "agent", "rick", "scientist", "nyan", "priest", 
                "sorcerer", "octocat", "beachnpc", "forestnpc", "desertnpc", "lavanpc",
                "clotharmor", "item-clotharmor", "leatherarmor", "mailarmor", "platearmor",
                "redarmor", "goldenarmor", "firefox", "death", "sword1", "axe", "chest",
                "sword2", "redsword", "bluesword", "goldensword", "item-sword2", "item-axe",
                "item-redsword", "item-bluesword", "item-goldensword", "item-leatherarmor",
                "item-mailarmor", "item-platearmor", "item-redarmor", "item-goldenarmor",
                "item-flask", "item-cake", "item-burger", "morningstar", "item-morningstar",
                "item-firepotion", "orc", "oldogre", "golem", "mimic", "hobgoblin",
                "greenarmor", "greenwingarmor", "item-greenarmor", "item-greenwingarmor",
                "redmouse", "redguard", "scimitar", "item-scimitar", "redguardarmor",
                "item-redguardarmor", "whitearmor", "item-whitearmor", "infectedguard",
                "livingarmor", "mermaid", "trident", "item-trident", "ratarmor",
                "item-ratarmor", "yellowfish", "greenfish", "redfish", "clam", "preta",
                "pirateskeleton", "bluescimitar", "item-bluescimitar", "bluepiratearmor",
                "item-bluepiratearmor", "penguin", "moleking", "cheoliarmor",
                "item-cheoliarmor", "hammer", "item-hammer", "darkskeleton",
                "greenpirateskeleton", "blackpirateskeleton", "redpirateskeleton",
                "yellowpreta", "bluepreta", "miniknight", "wolf", "dovakinarmor",
                "item-dovakinarmor", "gbwingarmor", "item-gbwingarmor", "redwingarmor",
                "item-redwingarmor", "snowfoxarmor", "item-snowfoxarmor", "wolfarmor",
                "item-wolfarmor", "pinkelf", "greenlightsaber", "item-greenlightsaber",
                "skyelf", "skylightsaber", "item-skylightsaber", "redelf", "redlightsaber",
                "item-redlightsaber", "item-sidesword", "sidesword", "yellowmouse",
                "whitemouse", "brownmouse", "spear", "item-spear", "guardarmor",
                "item-guardarmor"];
        },

        setup: function($bubbleContainer, canvas, background, foreground, input) {
            this.setBubbleManager(new BubbleManager($bubbleContainer));
            this.setRenderer(new Renderer(this, canvas, background, foreground));
            this.setChatInput(input);
        },

        setStorage: function(storage) {
            this.storage = storage;
        },

        setRenderer: function(renderer) {
            this.renderer = renderer;
        },

        setUpdater: function(updater) {
            this.updater = updater;
        },

        setPathfinder: function(pathfinder) {
            this.pathfinder = pathfinder;
        },

        setChatInput: function(element) {
            this.chatinput = element;
        },

        setBubbleManager: function(bubbleManager) {
            this.bubbleManager = bubbleManager;
        },

        loadMap: function() {
            var self = this;

            this.map = new Map(!this.renderer.upscaledRendering, this);

            this.map.ready(function() {
                log.info("Map loaded.");
                var tilesetIndex = self.renderer.upscaledRendering ? 0 : self.renderer.scale - 1;
                self.renderer.setTileset(self.map.tilesets[tilesetIndex]);
            });
        },

        initPlayer: function() {
            this.player.setSprite(this.sprites[this.player.getSpriteName()]);
            this.player.idle();

            console.log("Finished initPlayer");
        },

        initShadows: function() {
            this.shadows = {};
            this.shadows["small"] = this.sprites["shadow16"];
        },

        initCursors: function() {
            this.cursors["hand"] = this.sprites["hand"];
            this.cursors["sword"] = this.sprites["sword"];
            this.cursors["loot"] = this.sprites["loot"];
            this.cursors["target"] = this.sprites["target"];
            this.cursors["arrow"] = this.sprites["arrow"];
            this.cursors["talk"] = this.sprites["talk"];
            this.cursors["join"] = this.sprites["talk"];
        },

        initAnimations: function() {
            this.targetAnimation = new Animation("idle_down", 4, 0, 16, 16);
            this.targetAnimation.setSpeed(50);

            this.sparksAnimation = new Animation("idle_down", 6, 0, 16, 16);
            this.sparksAnimation.setSpeed(120);

            this.benefAnimation = new Animation("idle_down", 5, 0, 48, 48);
            this.benefAnimation.setSpeed(80);
        },

        initHurtSprites: function() {
            var self = this;

            Types.forEachArmorKind(function(kind, kindName) {
                self.sprites[kindName].createHurtSprite();
            });
        },

        initSilhouettes: function() {
            var self = this;

            Types.forEachMobOrNpcKind(function(kind, kindName) {
                self.sprites[kindName].createSilhouette();
            });
            self.sprites["chest"].createSilhouette();
            self.sprites["item-cake"].createSilhouette();
        },

        initAchievements: function(achievementFound, achievementProgress) {
            var self = this;

            this.achievements = {
                A_TRUE_WARRIOR: {
                    id: 1,
                    name: "A True Warrior",
                    desc: "Find a new weapon",
                    completed: achievementProgress[1] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                ANGRY_RATS: {
                    id: 2,
                    name: "Angry Rats",
                    desc: "Kill 10 rats",
                    hidden: !achievementFound[2],
                    completed: achievementProgress[2] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                SMALL_TALK: {
                    id: 3,
                    name: "Small Talk",
                    desc: "Talk to a non-player character",
                    completed: achievementProgress[3] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                FAT_LOOT: {
                    id: 4,
                    name: "Fat Loot",
                    desc: "Get a new armor set",
                    completed: achievementProgress[4] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                UNDERGROUND: {
                    id: 5,
                    name: "Underground",
                    desc: "Explore at least one cave",
                    completed: achievementProgress[5] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                COWARD: {
                    id: 6,
                    name: "Coward",
                    desc: "Successfully escape an enemy",
                    completed: achievementProgress[6] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                SKULL_COLLECTOR: {
                    id: 7,
                    name: "Skull Collector",
                    desc: "Kill 10 skeletons",
                    completed: achievementProgress[7] === 999 ? true : false,
                    isCompleted: function() {
                        // return self.storage.getSkeletonCount() >= 10;
                        return this.completed;
                    }
                },
                NINJA_LOOT: {
                    id: 8,
                    name: "Ninja Loot",
                    desc: "Get hold of an item you didn't fight for",
                    completed: achievementProgress[8] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                HUNTER: {
                    id: 9,
                    name: "Hunter",
                    desc: "Kill 50 enemies",
                    completed: achievementProgress[9] === 999 ? true : false,
                    isCompleted: function() {
                        // return self.storage.getTotalKills() >= 50;
                        return this.completed;
                    }
                },
                STILL_ALIVE: {
                    id: 10,
                    name: "Still Alive",
                    desc: "Revive your character five times",
                    completed: achievementProgress[10] === 999 ? true : false,
                    isCompleted: function() {
                        // return self.storage.getTotalRevives() >= 5;
                        return this.completed;
                    }
                },
                MEATSHIELD: {
                    id: 11,
                    name: "Meatshield",
                    desc: "Take 5,000 points of damage",
                    completed: achievementProgress[11] === 999 ? true : false,
                    isCompleted: function() {
                        // return self.storage.getTotalDamageTaken() >= 5000;
                        return this.completed;
                    }
                },
                HERO: {
                    id: 12,
                    name: "Hero",
                    desc: "Defeat the final boss",
                    completed: achievementProgress[12] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                FOXY: {
                    id: 13,
                    name: "Foxy",
                    desc: "Find the Firefox costume",
                    hidden: true,
                    completed: achievementProgress[13] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                FOR_SCIENCE: {
                    id: 14,
                    name: "For Science",
                    desc: "Enter into a portal",
                    hidden: true,
                    completed: achievementProgress[14] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                RICKROLLD: {
                    id: 15,
                    name: "Rickroll'd",
                    desc: "Take some singing lessons",
                    hidden: true,
                    completed: achievementProgress[15] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                SAVE_PRINCESS: {
                    id: 16,
                    name: "Save Princess",
                    desc: "Save the princess",
                    hidden: !achievementFound[16],
                    completed: achievementProgress[16] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                BRING_LEATHERARMOR: {
                    id: 17,
                    name: "Bring Leatherarmor",
                    desc: "Bring the leatherarmor",
                    hidden: !achievementFound[17],
                    completed: achievementProgress[17] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                KILL_CRAB: {
                    id: 18,
                    name: "Kill Crab",
                    desc: "Kill 5 Crabs",
                    hidden: !achievementFound[18],
                    completed: achievementProgress[18] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                FIND_CAKE: {
                    id: 19,
                    name: "Find Cake",
                    desc: "Fine Cate",
                    hidden: !achievementFound[19],
                    completed: achievementProgress[19] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                FIND_CD: {
                    id: 20,
                    name: "Find CD",
                    desc: "Find CD",
                    hidden: !achievementFound[20],
                    completed: achievementProgress[20] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                KILL_SKELETON: {
                    id: 21,
                    name: "Kill Skeleton",
                    desc: "Kill 10 Skeletons",
                    hidden: !achievementFound[21],
                    completed: achievementProgress[21] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                },
                BRING_AXE: {
                    id: 22,
                    name: "Bring axe",
                    desc: "Please, bring axe",
                    hidden: !achievementFound[22],
                    completed: achievementProgress[22] === 999 ? true : false,
                    isCompleted: function() {
                        return this.completed;
                    }
                }
            };

            _.each(this.achievements, function(obj) {
                if(!obj.isCompleted) {
                    obj.isCompleted = function() { return true; }
                }
                if(!obj.hidden) {
                    obj.hidden = false;
                }
            });

            this.app.initAchievementList(this.achievements);
            this.app.initUnlockedAchievements(this.achievements);
        },

        getAchievementById: function(id) {
            var found = null;
            _.each(this.achievements, function(achievement, key) {
                if(achievement.id === parseInt(id)) {
                    found = achievement;
                }
            });
            return found;
        },

        loadSprite: function(name) {
            if(this.renderer.upscaledRendering) {
                this.spritesets[0][name] = new Sprite(name, 1);
            } else {
                this.spritesets[1][name] = new Sprite(name, 2);
                if(!this.renderer.mobile && !this.renderer.tablet) {
                    this.spritesets[2][name] = new Sprite(name, 3);
                }
            }
        },

        setSpriteScale: function(scale) {
            var self = this;

            if(this.renderer.upscaledRendering) {
                this.sprites = this.spritesets[0];
            } else {
                this.sprites = this.spritesets[scale - 1];

                _.each(this.entities, function(entity) {
                    entity.sprite = null;
                    entity.setSprite(self.sprites[entity.getSpriteName()]);
                });
                this.initHurtSprites();
                this.initShadows();
                this.initCursors();
            }
        },

        loadSprites: function() {
            log.info("Loading sprites...");
            this.spritesets = [];
            this.spritesets[0] = {};
            this.spritesets[1] = {};
            this.spritesets[2] = {};
            _.map(this.spriteNames, this.loadSprite, this);
        },

        spritesLoaded: function() {
            if(_.any(this.sprites, function(sprite) { return !sprite.isLoaded; })) {
                return false;
            }
            return true;
        },

        setCursor: function(name, orientation) {
            if(name in this.cursors) {
                this.currentCursor = this.cursors[name];
                this.currentCursorOrientation = orientation;
            } else {
                log.error("Unknown cursor name :"+name);
            }
        },

        updateCursorLogic: function() {
            if(this.hoveringCollidingTile && this.started) {
                this.targetColor = "rgba(255, 50, 50, 0.5)";
            }
            else {
                this.targetColor = "rgba(255, 255, 255, 0.5)";
            }
            
            if(this.hoveringPlayer && this.started) {
                if(this.pvpFlag)
                    this.setCursor("sword");
                else
                    this.setCursor("hand");
                this.hoveringTarget = false;
                this.hoveringMob = false;
                this.targetCellVisible = false;
            } else if(this.hoveringMob && this.started) {
                this.setCursor("sword");
                this.hoveringTarget = false;
                this.hoveringPlayer = false;
                this.targetCellVisible = false;
            } else if(this.hoveringNpc && this.started) {
                this.setCursor("talk");
                this.hoveringTarget = false;
                this.targetCellVisible = false;
            } else if((this.hoveringItem || this.hoveringChest) && this.started) {
                this.setCursor("loot");
                this.hoveringTarget = false;
                this.targetCellVisible = true;
            } else {
                this.setCursor("hand");
                this.hoveringTarget = false;
                this.hoveringPlayer = false;
                this.targetCellVisible = true;
            }
        },

        focusPlayer: function() {
            this.renderer.camera.lookAt(this.player);
        },

        addEntity: function(entity) {
            var self = this;

            if(this.entities[entity.id] === undefined) {
                this.entities[entity.id] = entity;
                this.registerEntityPosition(entity);

                if(!(entity instanceof Item && entity.wasDropped)
                && !(this.renderer.mobile || this.renderer.tablet)) {
                    entity.fadeIn(this.currentTime);
                }

                if(this.renderer.mobile || this.renderer.tablet) {
                    entity.onDirty(function(e) {
                        if(self.camera.isVisible(e)) {
                            e.dirtyRect = self.renderer.getEntityBoundingRect(e);
                            self.checkOtherDirtyRects(e.dirtyRect, e, e.gridX, e.gridY);
                        }
                    });
                }
            }
            else {
                log.error("This entity already exists : " + entity.id + " ("+entity.kind+")");
            }
        },

        removeEntity: function(entity) {
            if(entity.id in this.entities) {
                this.unregisterEntityPosition(entity);
                delete this.entities[entity.id];
            }
            else {
                log.error("Cannot remove entity. Unknown ID : " + entity.id);
            }
        },

        addItem: function(item, x, y) {
            item.setSprite(this.sprites[item.getSpriteName()]);
            item.setGridPosition(x, y);
            item.setAnimation("idle", 150);
            this.addEntity(item);
        },

        removeItem: function(item) {
            if(item) {
                this.removeFromItemGrid(item, item.gridX, item.gridY);
                this.removeFromRenderingGrid(item, item.gridX, item.gridY);
                delete this.entities[item.id];
            } else {
                log.error("Cannot remove item. Unknown ID : " + item.id);
            }
        },

        initPathingGrid: function() {
            this.pathingGrid = [];
            for(var i=0; i < this.map.height; i += 1) {
                this.pathingGrid[i] = [];
                for(var j=0; j < this.map.width; j += 1) {
                    this.pathingGrid[i][j] = this.map.grid[i][j];
                }
            }
            log.info("Initialized the pathing grid with static colliding cells.");
        },

        initEntityGrid: function() {
            this.entityGrid = [];
            for(var i=0; i < this.map.height; i += 1) {
                this.entityGrid[i] = [];
                for(var j=0; j < this.map.width; j += 1) {
                    this.entityGrid[i][j] = {};
                }
            }
            log.info("Initialized the entity grid.");
        },

        initRenderingGrid: function() {
            this.renderingGrid = [];
            for(var i=0; i < this.map.height; i += 1) {
                this.renderingGrid[i] = [];
                for(var j=0; j < this.map.width; j += 1) {
                    this.renderingGrid[i][j] = {};
                }
            }
            log.info("Initialized the rendering grid.");
        },

        initItemGrid: function() {
            this.itemGrid = [];
            for(var i=0; i < this.map.height; i += 1) {
                this.itemGrid[i] = [];
                for(var j=0; j < this.map.width; j += 1) {
                    this.itemGrid[i][j] = {};
                }
            }
            log.info("Initialized the item grid.");
        },

        /**
         *
         */
        initAnimatedTiles: function() {
            var self = this,
                m = this.map;

            this.animatedTiles = [];
            this.forEachVisibleTile(function (id, index) {
                if(m.isAnimatedTile(id)) {
                    var tile = new AnimatedTile(id, m.getTileAnimationLength(id), m.getTileAnimationDelay(id), index),
                        pos = self.map.tileIndexToGridPosition(tile.index);

                    tile.x = pos.x;
                    tile.y = pos.y;
                    self.animatedTiles.push(tile);
                }
            }, 1);
            //log.info("Initialized animated tiles.");
        },

        addToRenderingGrid: function(entity, x, y) {
            if(!this.map.isOutOfBounds(x, y)) {
                this.renderingGrid[y][x][entity.id] = entity;
            }
        },

        removeFromRenderingGrid: function(entity, x, y) {
            if(entity && this.renderingGrid[y][x] && entity.id in this.renderingGrid[y][x]) {
                delete this.renderingGrid[y][x][entity.id];
            }
        },

        removeFromEntityGrid: function(entity, x, y) {
            if(this.entityGrid[y][x][entity.id]) {
                delete this.entityGrid[y][x][entity.id];
            }
        },

        removeFromItemGrid: function(item, x, y) {
            if(item && this.itemGrid[y][x][item.id]) {
                delete this.itemGrid[y][x][item.id];
            }
        },

        removeFromPathingGrid: function(x, y) {
            this.pathingGrid[y][x] = 0;
        },

        /**
         * Registers the entity at two adjacent positions on the grid at the same time.
         * This situation is temporary and should only occur when the entity is moving.
         * This is useful for the hit testing algorithm used when hovering entities with the mouse cursor.
         *
         * @param {Entity} entity The moving entity
         */
        registerEntityDualPosition: function(entity) {
            if(entity) {
                this.entityGrid[entity.gridY][entity.gridX][entity.id] = entity;

                this.addToRenderingGrid(entity, entity.gridX, entity.gridY);

                if(entity.nextGridX >= 0 && entity.nextGridY >= 0) {
                    this.entityGrid[entity.nextGridY][entity.nextGridX][entity.id] = entity;
                    if(!(entity instanceof Player)) {
                        this.pathingGrid[entity.nextGridY][entity.nextGridX] = 1;
                    }
                }
            }
        },

        /**
         * Clears the position(s) of this entity in the entity grid.
         *
         * @param {Entity} entity The moving entity
         */
        unregisterEntityPosition: function(entity) {
            if(entity) {
                this.removeFromEntityGrid(entity, entity.gridX, entity.gridY);
                this.removeFromPathingGrid(entity.gridX, entity.gridY);

                this.removeFromRenderingGrid(entity, entity.gridX, entity.gridY);

                if(entity.nextGridX >= 0 && entity.nextGridY >= 0) {
                    this.removeFromEntityGrid(entity, entity.nextGridX, entity.nextGridY);
                    this.removeFromPathingGrid(entity.nextGridX, entity.nextGridY);
                }
            }
        },

        registerEntityPosition: function(entity) {
            var x = entity.gridX,
                y = entity.gridY;

            if(entity && x && y) {
                if(entity instanceof Character || entity instanceof Chest) {
                    this.entityGrid[y][x][entity.id] = entity;
                    if(!(entity instanceof Player)) {
                        this.pathingGrid[y][x] = 1;
                    }
                }
                if(entity instanceof Item) {
                    this.itemGrid[y][x][entity.id] = entity;
                }

                this.addToRenderingGrid(entity, x, y);
            }
        },

        setServerOptions: function(host, port, username, userpw, email) {
            this.host = host;
            this.port = port;
            this.username = username;
            this.userpw = userpw;
            this.email = email;
        },
 
        loadAudio: function() {
            this.audioManager = new AudioManager(this);
        },

        initMusicAreas: function() {
            var self = this;
            _.each(this.map.musicAreas, function(area) {
                self.audioManager.addArea(area.x, area.y, area.w, area.h, area.id);
            });
        },

        run: function(action, started_callback) {
            var self = this;

            this.loadSprites();
            this.setUpdater(new Updater(this));
            this.camera = this.renderer.camera;

            this.setSpriteScale(this.renderer.scale);

            var wait = setInterval(function() {
                if(self.map.isLoaded && self.spritesLoaded()) {
                    console.log('All sprites loaded.');

                    self.loadAudio();

                    self.initMusicAreas();
                    self.initCursors();
                    self.initAnimations();
                    self.initShadows();
                    self.initHurtSprites();

                    if(!self.renderer.mobile
                    && !self.renderer.tablet
                    && self.renderer.upscaledRendering) {
                        self.initSilhouettes();
                    }

                    self.initEntityGrid();
                    self.initItemGrid();
                    self.initPathingGrid();
                    self.initRenderingGrid();

                    self.setPathfinder(new Pathfinder(self.map.width, self.map.height));

                    self.initPlayer();
                    self.setCursor("hand");

                    self.connect(action, started_callback);
                    self.ready = true;

                    clearInterval(wait);
                }
            }, 100);
        },

        tick: function() {
            this.currentTime = new Date().getTime();

            if(this.started) {
                this.updateCursorLogic();
                this.updater.update();
                this.renderer.renderFrame();
            }

            if(!this.isStopped) {
                requestAnimFrame(this.tick.bind(this));
            }
        },

        start: function() {
            this.tick();
            this.hasNeverStarted = false;
            log.info("Game loop started.");
        },

        stop: function() {
            log.info("Game stopped.");
            this.isStopped = true;
        },

        entityIdExists: function(id) {
            return id in this.entities;
        },

        getEntityById: function(id) {
            if(id in this.entities) {
                return this.entities[id];
            }
            else {
                log.error("Unknown entity id : " + id, true);
            }
        },

        connect: function(action, started_callback) {
            var self = this,
                connecting = false; // always in dispatcher mode in the build version

            this.client = new GameClient(this.host, this.port, this);
            this.boardhandler.setClient(this.client);
            this.client.wrongpw_callback = function() {
                self.textWindowHandler.setHtml("<center><h1>Wrong Password</h1></center>");
            }
            this.client.ban_callback = function() {
                self.textWindowHandler.setHtml("<center><h1>Ban</h1></center>");
            }
            this.client.fail_callback = function(reason){
                started_callback({
                    success: false,
                    reason: reason
                });
                self.started = false;
            };

            //>>excludeStart("prodHost", pragmas.prodHost);
            var config = this.app.config.local || this.app.config.dev;
            if(config) {
                this.client.connect(config.dispatcher); // false if the client connects directly to a game server
                connecting = true;
            }
            //>>excludeEnd("prodHost");

            //>>includeStart("prodHost", pragmas.prodHost);
            if(!connecting) {
                this.client.connect(false); // dont use the dispatcher in production
            }
            //>>includeEnd("prodHost");

            this.client.onDispatched(function(host, port) {
                console.log("Dispatched to game server "+host+ ":"+port);

                self.client.host = host;
                self.client.port = port;
                self.client.connect(); // connect to actual game server
            });

            this.client.onConnected(function() {
                log.info("Starting client/server handshake");

                self.player.name = self.username;
                self.player.pw = self.userpw;
                self.player.email = self.email;
                self.started = true;
                if(action === 'create') {
                    self.client.sendCreate(self.player);
                } else {
                    self.client.sendLogin(self.player);
                }
            });

            this.client.onEntityList(function(list) {
                var entityIds = _.pluck(self.entities, 'id'),
                    knownIds = _.intersection(entityIds, list),
                    newIds = _.difference(list, knownIds);

                self.obsoleteEntities = _.reject(self.entities, function(entity) {
                    return _.include(knownIds, entity.id) || entity.id === self.player.id;
                });

                // Destroy entities outside of the player's zone group
                self.removeObsoleteEntities();

                // Ask the server for spawn information about unknown entities
                if(_.size(newIds) > 0) {
                    self.client.sendWho(newIds);
                }
            });

            this.client.onWelcome(function(id, name, x, y, hp, armor, weapon,
                    avatar, weaponAvatar, experience,
                    admin,
                    inventory0, inventory0Number, inventory1, inventory1Number,
                    achievementFound, achievementProgress) {
                log.info("Received player ID from server : "+ id);
                self.player.id = id;
                self.playerId = id;
                // Always accept name received from the server which will
                // sanitize and shorten names exceeding the allowed length.
                self.player.name = name;
                self.player.admin = admin;
                self.player.setGridPosition(x, y);
                self.player.setMaxHitPoints(hp);
                self.player.setArmorName(armor);
                self.player.setSpriteName(avatar);
                self.player.setWeaponName(weapon);
                self.player.setInventory(Types.getKindFromString(inventory0), 0, inventory0Number);
                self.player.setInventory(Types.getKindFromString(inventory1), 1, inventory1Number);
                self.initAchievements(achievementFound, achievementProgress);
                self.initPlayer();
                self.player.experience = experience;
                self.player.level = Types.getLevel(experience);

                self.updateBars();
                self.updateExpBar();
                self.resetCamera();
                self.updatePlateauMode();
                self.audioManager.updateMusic();

                self.addEntity(self.player);
                self.player.dirtyRect = self.renderer.getEntityBoundingRect(self.player);

                self.showNotification("Welcome to BrowserQuest!");
                self.chathandler.show();

                self.player.onStartPathing(function(path) {
                    var i = path.length - 1,
                        x =  path[i][0],
                        y =  path[i][1];

                    if(self.player.isMovingToLoot()) {
                        self.player.isLootMoving = false;
                    }
                    else if(!self.player.isAttacking()) {
                        self.client.sendMove(x, y);
                    }

                    // Target cursor position
                    self.selectedX = x;
                    self.selectedY = y;

                    self.selectedCellVisible = true;

                    if(self.renderer.mobile || self.renderer.tablet) {
                        self.drawTarget = true;
                        self.clearTarget = true;
                        self.renderer.targetRect = self.renderer.getTargetBoundingRect();
                        self.checkOtherDirtyRects(self.renderer.targetRect, null, self.selectedX, self.selectedY);
                    }
                });

                self.player.onCheckAggro(function() {
                    self.forEachMob(function(mob) {
                        if(mob.isAggressive && !mob.isAttacking() && self.player.isNear(mob, mob.aggroRange)) {
                            self.player.aggro(mob);
                        }
                    });
                });

                self.player.onAggro(function(mob) {
                    if(!mob.isWaitingToAttack(self.player) && !self.player.isAttackedBy(mob)) {
                        self.player.log_info("Aggroed by " + mob.id + " at ("+self.player.gridX+", "+self.player.gridY+")");
                        self.client.sendAggro(mob);
                        mob.waitToAttack(self.player);
                    }
                });

                self.player.onBeforeStep(function() {
                    var blockingEntity = self.getEntityAt(self.player.nextGridX, self.player.nextGridY);
                    if(blockingEntity && blockingEntity.id !== self.playerId) {
                        console.log("Blocked by " + blockingEntity.id);
                    }
                    self.unregisterEntityPosition(self.player);
                });

                self.player.onStep(function() {
                    if(self.player.hasNextStep()) {
                        self.registerEntityDualPosition(self.player);
                    }

                    if(self.isZoningTile(self.player.gridX, self.player.gridY)) {
                        self.enqueueZoningFrom(self.player.gridX, self.player.gridY);
                    }

                    self.player.forEachAttacker(self.makeAttackerFollow);

                    var item = self.getItemAt(self.player.gridX, self.player.gridY);
                    if(item instanceof Item) {
                        self.tryLootingItem(item);
                    }

                    self.updatePlayerCheckpoint();

                    if(!self.player.isDead) {
                        self.audioManager.updateMusic();
                    }
                });

                self.player.onStopPathing(function(x, y) {
                    if(self.player.hasTarget()) {
                        self.player.lookAtTarget();
                    }

                    self.selectedCellVisible = false;

                    if(self.isItemAt(x, y)) {
                        var item = self.getItemAt(x, y);
                        self.tryLootingItem(item);
                    }

                    if(!self.player.hasTarget() && self.map.isDoor(x, y)) {
                        var dest = self.map.getDoorDestination(x, y);

                        if(dest.level > self.player.level) {
                            self.unregisterEntityPosition(self.player);
                            self.registerEntityPosition(self.player);
                            return;
                        }
                        if(dest.admin === 1 && self.player.admin === null){
                            self.unregisterEntityPosition(self.player);
                            self.registerEntityPosition(self.player);
                            return;
                        }
                        var desty = dest.y;

                        //push them off the door spot so they can use the
                        //arrow keys and mouse to walk back in or out
                        if (dest.orientation === Types.Orientations.UP) {
                            desty--;
                        } else if (dest.orientation === Types.Orientations.DOWN) {
                            desty++;
                        }

                        self.player.setGridPosition(dest.x, desty);
                        self.player.nextGridX = dest.x;
                        self.player.nextGridY = desty;
                        self.player.turnTo(dest.orientation);
                        self.client.sendTeleport(dest.x, desty);

                        if(self.renderer.mobile && dest.cameraX && dest.cameraY) {
                            self.camera.setGridPosition(dest.cameraX, dest.cameraY);
                            self.resetZone();
                        } else {
                            if(dest.portal) {
                                self.assignBubbleTo(self.player);
                            } else {
                                self.camera.focusEntity(self.player);
                                self.resetZone();
                            }
                        }

                        self.player.forEachAttacker(function(attacker) {
                            attacker.disengage();
                            attacker.idle();
                        });

                        self.updatePlateauMode();

                        if(self.renderer.mobile || self.renderer.tablet) {
                            // When rendering with dirty rects, clear the whole screen when entering a door.
                            self.renderer.clearScreen(self.renderer.context);
                        }

                        if(dest.portal) {
                            self.audioManager.playSound("teleport");
                        }

                        if(!self.player.isDead) {
                            self.audioManager.updateMusic();
                        }
                    }

                    if(self.player.target instanceof Npc) {
                        self.makeNpcTalk(self.player.target);
                    } else if(self.player.target instanceof Chest) {
                        self.client.sendOpen(self.player.target);
                        self.audioManager.playSound("chest");
                    }

                    self.player.forEachAttacker(function(attacker) {
                        if(!attacker.isAdjacentNonDiagonal(self.player) && attacker instanceof Mob) {
                            attacker.follow(self.player);
                        }
                    });

                    self.unregisterEntityPosition(self.player);
                    self.registerEntityPosition(self.player);
                });

                self.player.onRequestPath(function(x, y) {
                    var ignored = [self.player]; // Always ignore self

                    if(self.player.hasTarget()) {
                        ignored.push(self.player.target);
                    }
                    return self.findPath(self.player, x, y, ignored);
                });

                self.player.onDeath(function() {
                    log.info(self.playerId + " is dead");

                    self.player.stopBlinking();
                    self.player.setSprite(self.sprites["death"]);
                    self.player.animate("death", 120, 1, function() {
                        log.info(self.playerId + " was removed");

                        self.removeEntity(self.player);
                        self.removeFromRenderingGrid(self.player, self.player.gridX, self.player.gridY);

                        self.player = null;
                        self.client.disable();

                        setTimeout(function() {
                            self.playerdeath_callback();
                        }, 1000);
                    });

                    self.player.forEachAttacker(function(attacker) {
                        attacker.disengage();
                        attacker.idle();
                    });

                    self.audioManager.fadeOutCurrentMusic();
                    self.audioManager.playSound("death");
                });

                self.player.onHasMoved(function(player) {
                    self.assignBubbleTo(player);
                });
                self.client.onPVPChange(function(pvpFlag){
                    self.player.flagPVP(pvpFlag);
                    if(pvpFlag){
                        self.showNotification("PVP is on.");
                    } else{
                        self.showNotification("PVP is off.");
                    }
                });

                self.player.onArmorLoot(function(armorName) {
                    self.player.switchArmor(armorName, self.sprites[armorName]);
                });

                self.player.onSwitchItem(function() {
                    if(self.equipment_callback) {
                        self.equipment_callback();
                    }
                });

                self.player.onInvincible(function() {
                    self.invincible_callback();
                });

                self.client.onSpawnItem(function(item, x, y) {
                    log.info("Spawned " + Types.getKindAsString(item.kind) + " (" + item.id + ") at "+x+", "+y);
                    self.addItem(item, x, y);
                });

                self.client.onSpawnChest(function(chest, x, y) {
                    log.info("Spawned chest (" + chest.id + ") at "+x+", "+y);
                    chest.setSprite(self.sprites[chest.getSpriteName()]);
                    chest.setGridPosition(x, y);
                    chest.setAnimation("idle_down", 150);
                    self.addEntity(chest, x, y);

                    chest.onOpen(function() {
                        chest.stopBlinking();
                        chest.setSprite(self.sprites["death"]);
                        chest.setAnimation("death", 120, 1, function() {
                            log.info(chest.id + " was removed");
                            self.removeEntity(chest);
                            self.removeFromRenderingGrid(chest, chest.gridX, chest.gridY);
                            self.previousClickPosition = {};
                        });
                    });
                });

                self.client.onSpawnCharacter(function(entity, x, y, orientation, targetId) {
                    if(!self.entityIdExists(entity.id)) {
                        try {
                            if(entity.id !== self.playerId) {
                                entity.setSprite(self.sprites[entity.getSpriteName()]);
                                entity.setGridPosition(x, y);
                                entity.setOrientation(orientation);
                                entity.idle();

                                self.addEntity(entity);

                                console.log("Spawned " + Types.getKindAsString(entity.kind) + " (" + entity.id + ") at "+entity.gridX+", "+entity.gridY);

                                if(entity instanceof Character) {
                                    entity.onBeforeStep(function() {
                                        self.unregisterEntityPosition(entity);
                                    });

                                    entity.onStep(function() {
                                        if(!entity.isDying) {
                                            self.registerEntityDualPosition(entity);

                                            if(self.player && self.player.target === entity) {
                                                self.makeAttackerFollow(self.player)
                                            }


                                            entity.forEachAttacker(function(attacker) {
                                                if(attacker.isAdjacent(attacker.target)) {
                                                    attacker.lookAtTarget();
                                                } else {
                                                    attacker.follow(entity);
                                                }
                                            });
                                        }
                                    });

                                    entity.onStopPathing(function(x, y) {
                                        if(!entity.isDying) {
                                            if(entity.hasTarget() && entity.isAdjacent(entity.target)) {
                                                entity.lookAtTarget();
                                            }

                                            if(entity instanceof Player) {
                                                var gridX = entity.destination.gridX,
                                                    gridY = entity.destination.gridY;

                                                if(self.map.isDoor(gridX, gridY)) {
                                                    var dest = self.map.getDoorDestination(gridX, gridY);
                                                    entity.setGridPosition(dest.x, dest.y);
                                                }
                                            }

                                            entity.forEachAttacker(function(attacker) {
                                                if(!attacker.isAdjacentNonDiagonal(entity) && attacker.id !== self.playerId) {
                                                    attacker.follow(entity);
                                                }
                                            });

                                            self.unregisterEntityPosition(entity);
                                            self.registerEntityPosition(entity);
                                        }
                                    });

                                    entity.onRequestPath(function(x, y) {
                                        var ignored = [entity], // Always ignore self
                                            ignoreTarget = function(target) {
                                                ignored.push(target);

                                                // also ignore other attackers of the target entity
                                                target.forEachAttacker(function(attacker) {
                                                    ignored.push(attacker);
                                                });
                                            };

                                        if(entity.hasTarget()) {
                                            ignoreTarget(entity.target);
                                        } else if(entity.previousTarget) {
                                            // If repositioning before attacking again, ignore previous target
                                            // See: tryMovingToADifferentTile()
                                            ignoreTarget(entity.previousTarget);
                                        }

                                        return self.findPath(entity, x, y, ignored);
                                    });

                                    entity.onDeath(function() {
                                        log.info(entity.id + " is dead");

                                        if(entity instanceof Mob) {
                                            // Keep track of where mobs die in order to spawn their dropped items
                                            // at the right position later.
                                            self.deathpositions[entity.id] = {x: entity.gridX, y: entity.gridY};
                                        }

                                        entity.isDying = true;
                                        entity.setSprite(self.sprites[entity instanceof Mobs.Rat ? "rat" : "death"]);
                                        entity.animate("death", 120, 1, function() {
                                            log.info(entity.id + " was removed");

                                            self.removeEntity(entity);
                                            self.removeFromRenderingGrid(entity, entity.gridX, entity.gridY);
                                        });

                                        entity.forEachAttacker(function(attacker) {
                                            attacker.disengage();
                                        });

                                        if(self.player.target && self.player.target.id === entity.id) {
                                            self.player.disengage();
                                        }

                                        // Upon death, this entity is removed from both grids, allowing the player
                                        // to click very fast in order to loot the dropped item and not be blocked.
                                        // The entity is completely removed only after the death animation has ended.
                                        self.removeFromEntityGrid(entity, entity.gridX, entity.gridY);
                                        self.removeFromPathingGrid(entity.gridX, entity.gridY);

                                        if(self.camera.isVisible(entity)) {
                                            self.audioManager.playSound("kill"+Math.floor(Math.random()*2+1));
                                        }

                                        self.updateCursor();
                                    });

                                    entity.onHasMoved(function(entity) {
                                        self.assignBubbleTo(entity); // Make chat bubbles follow moving entities
                                    });

                                    if(entity instanceof Mob) {
                                        if(targetId) {
                                            var player = self.getEntityById(targetId);
                                            if(player) {
                                                self.createAttackLink(entity, player);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        catch(e) {
                            log.error(e);
                        }
                    } else {
                        console.log("Character "+entity.id+" already exists. Don't respawn.");
                    }
                });

                self.client.onDespawnEntity(function(entityId) {
                    var entity = self.getEntityById(entityId);

                    if(entity) {
                        log.info("Despawning " + Types.getKindAsString(entity.kind) + " (" + entity.id+ ")");

                        if(entity.gridX === self.previousClickPosition.x
                        && entity.gridY === self.previousClickPosition.y) {
                            self.previousClickPosition = {};
                        }

                        if(entity instanceof Item) {
                            self.removeItem(entity);
                        } else if(entity instanceof Character) {
                            entity.forEachAttacker(function(attacker) {
                                if(attacker.canReachTarget()) {
                                    attacker.hit();
                                }
                            });
                            entity.die();
                        } else if(entity instanceof Chest) {
                            entity.open();
                        }

                        entity.clean();
                    }
                });

                self.client.onItemBlink(function(id) {
                    var item = self.getEntityById(id);

                    if(item) {
                        item.blink(150);
                    }
                });
                
                self.client.onGuildError(function(errorType, info) {
					if(errorType === Types.Messages.GUILDERRORTYPE.BADNAME){
						self.showNotification(info + " seems to be an inappropriate guild name…");
					}
					else if(errorType === Types.Messages.GUILDERRORTYPE.ALREADYEXISTS){
						self.showNotification(info + " already exists…");
						setTimeout(function(){self.showNotification("Either change the name of YOUR guild")},2500);
						setTimeout(function(){self.showNotification("Or ask a member of " + info + " if you can join them.")},5000);
					}
					else if(errorType === Types.Messages.GUILDERRORTYPE.IDWARNING){
						self.showNotification("WARNING: the server was rebooted.");
						setTimeout(function(){self.showNotification(info + " has changed ID.")},2500);
					}
					else if(errorType === Types.Messages.GUILDERRORTYPE.BADINVITE){
						self.showNotification(info+" is ALREADY a member of “"+self.player.getGuild().name+"”");
					}
				});
				
				self.client.onGuildCreate(function(guildId, guildName) {
					self.player.setGuild(new Guild(guildId, guildName));
					self.storage.setPlayerGuild(self.player.getGuild());
					self.showNotification("You successfully created and joined…");
					setTimeout(function(){self.showNotification("…" + self.player.getGuild().name)},2500);
				});
				
				self.client.onGuildInvite(function(guildId, guildName, invitorName) {
					self.showNotification(invitorName + " invited you to join “"+guildName+"”.");
					self.player.addInvite(guildId);
					setTimeout(function(){$("#chatinput").attr("placeholder", "Do you want to join "+guildName+" ? Type /guild accept yes or /guild accept no");
					self.app.showChat();},2500);
				});
				
				self.client.onGuildJoin(function(playerName, id, guildId, guildName) {
					if(typeof id === "undefined"){
						self.showNotification(playerName + " failed to answer to your invitation in time.");
						setTimeout(function(){self.showNotification("Might have to send another invite…")},2500);
					}
					else if(id === false){
						self.showNotification(playerName + " respectfully declined your offer…");
						setTimeout(function(){self.showNotification("…to join “"+self.player.getGuild().name+"”.")},2500);
					}
					else if(id === self.player.id){
						self.player.setGuild(new Guild(guildId, guildName));
						self.storage.setPlayerGuild(self.player.getGuild());
						self.showNotification("You just joined “"+guildName+"”.");
					}
					else{
						self.showNotification(playerName+" is now a jolly member of “"+guildName+"”.");//#updateguild
					}
				});
				
				self.client.onGuildLeave(function(name, playerId, guildName) {
					if(self.player.id===playerId){
						if(self.player.hasGuild()){
							if(self.player.getGuild().name === guildName){//do not erase new guild on create
								self.player.unsetGuild();
								self.storage.setPlayerGuild();
								self.showNotification("You successfully left “"+guildName+"”.");
							}
						}
						//missing elses above should not happen (errors)
					}
					else{
						self.showNotification(name + " has left “"+guildName+"”.");//#updateguild
					}
				});
				
				self.client.onGuildTalk(function(name, id, message) {
					if(id===self.player.id){
						self.showNotification("YOU: "+message);
					}
					else{
						self.showNotification(name+": "+message);
					}
				});

				self.client.onMemberConnect(function(name) {
					self.showNotification(name + " connected to your world.");//#updateguild
				});
				
				self.client.onMemberDisconnect(function(name) {
					self.showNotification(name + " lost connection with your world.");
				});
				
				self.client.onReceiveGuildMembers(function(memberNames) {
					self.showNotification(memberNames.join(", ") + ((memberNames.length===1) ? " is " : " are ") +"currently online.");//#updateguild
				});

                self.client.onEntityMove(function(id, x, y) {
                    var entity = null;

                    if(id !== self.playerId) {
                        entity = self.getEntityById(id);

                        if(entity) {
                            entity.disengage();
                            entity.idle();
                            self.makeCharacterGoTo(entity, x, y);
                        }
                    }
                });

                self.client.onEntityDestroy(function(id) {
                    var entity = self.getEntityById(id);
                    if(entity) {
                        if(entity instanceof Item) {
                            self.removeItem(entity);
                        } else {
                            self.removeEntity(entity);
                        }
                        console.log("Entity was destroyed: "+entity.id);
                    }
                });

                self.client.onPlayerMoveToItem(function(playerId, itemId) {
                    var player, item;

                    if(playerId !== self.playerId) {
                        player = self.getEntityById(playerId);
                        item = self.getEntityById(itemId);

                        if(player && item) {
                            self.makeCharacterGoTo(player, item.gridX, item.gridY);
                        }
                    }
                });

                self.client.onEntityAttack(function(attackerId, targetId) {
                    var attacker = self.getEntityById(attackerId),
                        target = self.getEntityById(targetId);

                    if(attacker && target && attacker.id !== self.playerId) {
                        console.log(attacker.id + " attacks " + target.id);

                        if(attacker && target instanceof Player && target.id !== self.playerId && target.target && target.target.id === attacker.id && attacker.getDistanceToEntity(target) < 3) {
                            setTimeout(function() {
                                self.createAttackLink(attacker, target);
                            }, 200); // delay to prevent other players attacking mobs from ending up on the same tile as they walk towards each other.
                        } else {
                            self.createAttackLink(attacker, target);
                        }
                    }
                });

                self.client.onPlayerDamageMob(function(mobId, points, healthPoints, maxHp) {
                    var mob = self.getEntityById(mobId);
                    if(mob && points) {
                        self.infoManager.addDamageInfo(points, mob.x, mob.y - 15, "inflicted");
                    }
                    if(self.player.hasTarget()){
                        self.updateTarget(mobId, points, healthPoints, maxHp);
                    }
                });

                self.client.onPlayerKillMob(function(kind, level, exp) {
                    var mobExp = Types.getMobExp(kind);
                    self.player.level = level;
                    self.player.experience = exp;
                    self.updateExpBar();
                    
                    self.infoManager.addDamageInfo("+"+mobExp+" exp", self.player.x, self.player.y - 15, "exp", 3000);

                    var expInThisLevel = self.player.experience - Types.expForLevel[self.player.level-1];
                    var expForLevelUp = Types.expForLevel[self.player.level] - Types.expForLevel[self.player.level-1];
                    var expPercentThisLevel = (100*expInThisLevel/expForLevelUp);

                    self.showNotification( "Total xp: " + expPercentThisLevel.toFixed(1) + "% of this level done." );
                });

                self.client.onPlayerChangeHealth(function(points, isRegen) {
                    var player = self.player,
                        diff,
                        isHurt;

                    if(player && !player.isDead && !player.invincible) {
                        isHurt = points <= player.hitPoints;
                        diff = points - player.hitPoints;
                        player.hitPoints = points;

                        if(player.hitPoints <= 0) {
                            player.die();
                        }
                        if(isHurt) {
                            player.hurt();
                            self.infoManager.addDamageInfo(diff, player.x, player.y - 15, "received");
                            self.audioManager.playSound("hurt");
                            if(self.playerhurt_callback) {
                                self.playerhurt_callback();
                            }
                        } else if(!isRegen){
                            self.infoManager.addDamageInfo("+"+diff, player.x, player.y - 15, "healed");
                        }
                        self.updateBars();
                    }
                });

                self.client.onPlayerChangeMaxHitPoints(function(hp) {
                    self.player.maxHitPoints = hp;
                    self.player.hitPoints = hp;
                    self.updateBars();
                });

                self.client.onPlayerEquipItem(function(playerId, itemKind) {
                    var player = self.getEntityById(playerId),
                        itemName = Types.getKindAsString(itemKind);

                    if(player) {
                        if(Types.isArmor(itemKind)) {
                            player.setSprite(self.sprites[itemName]);
                        } else if(Types.isWeapon(itemKind)) {
                            player.setWeaponName(itemName);
                        } else if(Types.isBenef(itemKind)){
                            player.setBenef(itemKind);
                        }
                    }
                });

                self.client.onPlayerTeleport(function(id, x, y) {
                    var entity = null,
                        currentOrientation;

                    if(id !== self.playerId) {
                        entity = self.getEntityById(id);

                        if(entity) {
                            currentOrientation = entity.orientation;

                            self.makeCharacterTeleportTo(entity, x, y);
                            entity.setOrientation(currentOrientation);

                            entity.forEachAttacker(function(attacker) {
                                attacker.disengage();
                                attacker.idle();
                                attacker.stop();
                            });
                        }
                    }
                });

                self.client.onDropItem(function(item, mobId) {
                    var pos = self.getDeadMobPosition(mobId);

                    if(pos) {
                        self.addItem(item, pos.x, pos.y);
                        self.updateCursor();
                    }
                });

                self.client.onChatMessage(function(entityId, message) {
                    if(!self.chathandler.processReceiveMessage(entityId, message)){
                        var entity = self.getEntityById(entityId);
                        self.createBubble(entityId, message);
                        self.assignBubbleTo(entity);
                    }
                    self.audioManager.playSound("chat");
                });

                self.client.onPopulationChange(function(worldPlayers, totalPlayers) {
                    if(self.nbplayers_callback) {
                        self.nbplayers_callback(worldPlayers, totalPlayers);
                    }
                });
                
                self.client.onGuildPopulation(function(guildName, guildPopulation) {
					if(self.nbguildplayers_callback) {
						self.nbguildplayers_callback(guildName, guildPopulation);
					}
				});

                self.client.onDisconnected(function(message) {
                    if(self.player) {
                        self.player.die();
                    }
                    if(self.disconnect_callback) {
                        self.disconnect_callback(message);
                    }
                });

                self.client.onAchievement(function(id, type) {
                    console.log('onAchievement!!')
                    console.log(id === self.achievements['KILL_CRAB'])
                    console.log(type)
                    var key = null;
                    _.each(self.achievements, function(value, _key) { 
                        if(value.id === id) {
                            key = _key;
                            return -1;
                        }
                    });
                    console.log(key);
                    var achievement = self.achievements[key];

                    if(!achievement) {
                        console.log('no achievement:' + id );
                        return;
                    }
                    if(type === "complete") {
                        achievement.completed = true;
                        self.app.displayUnlockedAchievement(achievement);
                        self.app.showAchievementNotification(achievement.id, achievement.name, "Quest Completed!");
                    } else {
                        return;
                    }

                    if(key === 'ANGRY_RATS'){
                        setTimeout(function() {
                            self.infoManager.addDamageInfo("+50 exp", self.player.x, self.player.y - 15, "exp", 3000);
                        }, 1000);
                    } else if(key === 'BRING_LEATHERARMOR'){
                        self.player.switchArmor("clotharmor", self.sprites["clotharmor"]);
                        setTimeout(function() {
                            self.infoManager.addDamageInfo("+50 exp", self.player.x, self.player.y - 15, "exp", 3000);
                        }, 1000);
                    } else if(key === 'KILL_CRAB'){
                        if(self.player.inventory[0] === Types.Entities.CAKE){
                            self.player.inventory[0] = null;
                        } else if(self.player.inventory[1] === Types.Entities.CAKE){
                            self.player.inventory[1] = null;
                        }
                        setTimeout(function() {
                            self.infoManager.addDamageInfo("+50 exp", self.player.x, self.player.y - 15, "exp", 3000);
                        }, 1000);
                    } else if(key === 'FIND_CAKE'){
                        if(self.player.inventory[0] === Types.Entities.CAKE){
                            self.player.inventory[0] = null;
                        } else if(self.player.inventory[1] === Types.Entities.CAKE){
                            self.player.inventory[1] = null;
                        }
                        setTimeout(function() {
                            self.infoManager.addDamageInfo("+100 exp", self.player.x, self.player.y - 15, "exp", 3000);
                        }, 1000);
                    } else if(key === 'FIND_CD'){
                        if(self.player.inventory[0] === Types.Entities.CD){
                            self.player.inventory[0] = null;
                        } else if(self.player.inventory[1] === Types.Entities.CD){
                            self.player.inventory[1] = null;
                        }
                        setTimeout(function() {
                            self.infoManager.addDamageInfo("+100 exp", self.player.x, self.player.y - 15, "exp", 3000);
                        }, 1000);
                    } else if(key === 'KILL_SKELETON'){
                        setTimeout(function() {
                            self.infoManager.addDamageInfo("+200 exp", self.player.x, self.player.y - 15, "exp", 3000);
                        }, 1000);
                    } else if(key === 'BRING_AXE'){
                        self.player.switchWeapon("sword2");
                        setTimeout(function() {
                            self.infoManager.addDamageInfo("+200 exp", self.player.x, self.player.y - 15, "exp", 3000);
                        }, 1000);
                    }
                });

                self.client.onBoard(function(data){
                    self.boardhandler.handleBoard(data, self.player.level);
                });
                self.client.onNotify(function(msg){
                    self.showNotification(msg);
                });
                self.client.onKung(function(msg){
                    self.kkhandler.add(msg, self.player);
                });

                self.gamestart_callback();

                if(self.hasNeverStarted) {
                    self.start();
                    started_callback({success: true});
                }
            });
        },

        /**
         * Links two entities in an attacker<-->target relationship.
         * This is just a utility method to wrap a set of instructions.
         *
         * @param {Entity} attacker The attacker entity
         * @param {Entity} target The target entity
         */
        createAttackLink: function(attacker, target) {
            if(attacker.hasTarget()) {
                attacker.removeTarget();
            }
            attacker.engage(target);

            if(attacker.id !== this.playerId) {
                target.addAttacker(attacker);
            }
        },

        /**
         * Converts the current mouse position on the screen to world grid coordinates.
         * @returns {Object} An object containing x and y properties.
         */
        getMouseGridPosition: function() {
            var mx = this.mouse.x,
                my = this.mouse.y,
                c = this.renderer.camera,
                s = this.renderer.scale,
                ts = this.renderer.tilesize,
                offsetX = mx % (ts * s),
                offsetY = my % (ts * s),
                x = ((mx - offsetX) / (ts * s)) + c.gridX,
                y = ((my - offsetY) / (ts * s)) + c.gridY;

                return { x: x, y: y };
        },

        /**
         * Moves a character to a given location on the world grid.
         *
         * @param {Number} x The x coordinate of the target location.
         * @param {Number} y The y coordinate of the target location.
         */
        makeCharacterGoTo: function(character, x, y) {
            if(!this.map.isOutOfBounds(x, y)) {
                character.go(x, y);
            }
        },

        /**
         *
         */
        makeCharacterTeleportTo: function(character, x, y) {
            if(!this.map.isOutOfBounds(x, y)) {
                this.unregisterEntityPosition(character);

                character.setGridPosition(x, y);

                this.registerEntityPosition(character);
                this.assignBubbleTo(character);
            } else {
                console.log("Teleport out of bounds: "+x+", "+y);
            }
        },

        /**
         *
         */
        makePlayerAttackNext: function()
        {

            pos = {
                x: this.player.gridX,
                y: this.player.gridY
            };
            switch(this.player.orientation)
            {
                case Types.Orientations.DOWN:
                    pos.y += 1;
                    this.makePlayerAttackTo(pos);
                    break;
                case Types.Orientations.UP:
                    pos.y -= 1;
                    this.makePlayerAttackTo(pos);
                    break;
                case Types.Orientations.LEFT:
                    pos.x -= 1;
                    this.makePlayerAttackTo(pos);
                    break;
                case Types.Orientations.RIGHT:
                    pos.x += 1;
                    this.makePlayerAttackTo(pos);
                    break;

                default:
                    break;
            }
        },

        /**
         *
         */
        makePlayerAttackTo: function(pos)
        {
            entity = this.getEntityAt(pos.x, pos.y);
            if(entity instanceof Mob) {
                this.makePlayerAttack(entity);
            }
        },

        /**
         * Moves the current player to a given target location.
         * @see makeCharacterGoTo
         */
        makePlayerGoTo: function(x, y) {
            this.makeCharacterGoTo(this.player, x, y);
        },

        /**
         * Moves the current player towards a specific item.
         * @see makeCharacterGoTo
         */
        makePlayerGoToItem: function(item) {
            if(item) {
                this.player.isLootMoving = true;
                this.makePlayerGoTo(item.gridX, item.gridY);
                this.client.sendLootMove(item, item.gridX, item.gridY);
            }
        },

        /**
         *
         */
        makePlayerTalkTo: function(npc) {
            if(npc) {
                this.player.setTarget(npc);
                this.player.follow(npc);
            }
        },

        makePlayerOpenChest: function(chest) {
            if(chest) {
                this.player.setTarget(chest);
                this.player.follow(chest);
            }
        },

        /**
         *
         */
        makePlayerAttack: function(mob) {
            this.createAttackLink(this.player, mob);
            this.client.sendAttack(mob);
        },

        /**
         *
         */
        makeNpcTalk: function(npc) {
            var msg;

            if(npc) {
                if(npc.kind == Types.Entities.VILLAGEGIRL && this.achievements['ANGRY_RATS'].hidden){
                    this.unhiddenAchievement(this.achievements['ANGRY_RATS']);
                } else if(npc.kind === Types.Entities.KING && this.achievements['SAVE_PRINCESS'].hidden){
                    this.unhiddenAchievement(this.achievements['SAVE_PRINCESS']);
                } else if(npc.kind === Types.Entities.VILLAGER && this.achievements['BRING_LEATHERARMOR'].hidden) {
                    this.unhiddenAchievement(this.achievements['BRING_LEATHERARMOR']);
                } else if(npc.kind === Types.Entities.VILLAGER && !this.achievements['BRING_LEATHERARMOR'].hidden) {
                    this.client.sendTalkToNPC(npc.kind);
                } else if(npc.kind === Types.Entities.BEACHNPC && this.achievements['KILL_CRAB'].hidden){
                    this.unhiddenAchievement(this.achievements['KILL_CRAB']);
                } else if(npc.kind === Types.Entities.AGENT && this.achievements['FIND_CAKE'].hidden){
                    this.unhiddenAchievement(this.achievements['FIND_CAKE']);
                } else if(npc.kind === Types.Entities.AGENT && !this.achievements['FIND_CAKE'].hidden) {
                    this.client.sendTalkToNPC(npc.kind);
                } else if(npc.kind === Types.Entities.NYAN && this.achievements['FIND_CD'].hidden) {
                    this.unhiddenAchievement(this.achievements['FIND_CD']);
                } else if(npc.kind === Types.Entities.NYAN && !this.achievements['FIND_CD'].hidden) {
                    this.client.sendTalkToNPC(npc.kind);
                } else if(npc.kind === Types.Entities.PRIEST && this.achievements['KILL_SKELETON'].hidden){
                    this.unhiddenAchievement(this.achievements['KILL_SKELETON']);
                } else if(npc.kind === Types.Entities.DESERTNPC && this.achievements['BRING_AXE'].hidden){
                    this.unhiddenAchievement(this.achievements['BRING_AXE']);
                } else if(npc.kind === Types.Entities.DESERTNPC && !this.achievements['BRING_AXE'].hidden){
                    this.client.sendTalkToNPC(npc.kind);
                }
                msg = npc.talk(this);
                this.previousClickPosition = {};
                if(msg) {
                    this.createBubble(npc.id, msg);
                    this.assignBubbleTo(npc);
                    this.audioManager.playSound("npc");
                } else {
                    this.destroyBubble(npc.id);
                    this.audioManager.playSound("npc-end");
                }
            }
        },
        unhiddenAchievement: function(achievement) {
            if(achievement.hidden) {
                this.app.displayUnhiddenAchievement(achievement);
                achievement.hidden = false;
            }
        },

        /**
         * Loops through all the entities currently present in the game.
         * @param {Function} callback The function to call back (must accept one entity argument).
         */
        forEachEntity: function(callback) {
            _.each(this.entities, function(entity) {
                callback(entity);
            });
        },

        /**
         * Same as forEachEntity but only for instances of the Mob subclass.
         * @see forEachEntity
         */
        forEachMob: function(callback) {
            _.each(this.entities, function(entity) {
                if(entity instanceof Mob) {
                    callback(entity);
                }
            });
        },

        /**
         * Loops through all entities visible by the camera and sorted by depth :
         * Lower 'y' value means higher depth.
         * Note: This is used by the Renderer to know in which order to render entities.
         */
        forEachVisibleEntityByDepth: function(callback) {
            var self = this,
                m = this.map;

            this.camera.forEachVisiblePosition(function(x, y) {
                if(!m.isOutOfBounds(x, y)) {
                    if(self.renderingGrid[y][x]) {
                        _.each(self.renderingGrid[y][x], function(entity) {
                            callback(entity);
                        });
                    }
                }
            }, this.renderer.mobile ? 0 : 2);
        },

        /**
         *
         */
        forEachVisibleTileIndex: function(callback, extra) {
            var m = this.map;

            this.camera.forEachVisiblePosition(function(x, y) {
                if(!m.isOutOfBounds(x, y)) {
                    callback(m.GridPositionToTileIndex(x, y) - 1);
                }
            }, extra);
        },

        /**
         *
         */
        forEachVisibleTile: function(callback, extra) {
            var self = this,
                m = this.map;

            if(m.isLoaded) {
                this.forEachVisibleTileIndex(function(tileIndex) {
                    if(_.isArray(m.data[tileIndex])) {
                        _.each(m.data[tileIndex], function(id) {
                            callback(id-1, tileIndex);
                        });
                    }
                    else {
                        if(_.isNaN(m.data[tileIndex]-1)) {
                            //throw Error("Tile number for index:"+tileIndex+" is NaN");
                        } else {
                            callback(m.data[tileIndex]-1, tileIndex);
                        }
                    }
                }, extra);
            }
        },

        /**
         *
         */
        forEachAnimatedTile: function(callback) {
            if(this.animatedTiles) {
                _.each(this.animatedTiles, function(tile) {
                    callback(tile);
                });
            }
        },

        /**
         * Returns the entity located at the given position on the world grid.
         * @returns {Entity} the entity located at (x, y) or null if there is none.
         */
        getEntityAt: function(x, y) {
            if(this.map.isOutOfBounds(x, y) || !this.entityGrid) {
                return null;
            }

            var entities = this.entityGrid[y][x],
                entity = null;
            if(_.size(entities) > 0) {
                entity = entities[_.keys(entities)[0]];
            } else {
                entity = this.getItemAt(x, y);
            }
            return entity;
        },

        getMobAt: function(x, y) {
            var entity = this.getEntityAt(x, y);
            if(entity && (entity instanceof Mob)) {
                return entity;
            }
            return null;
        },

        getPlayerAt: function(x, y) {
          var entity = this.getEntityAt(x, y);
            if(entity && (entity instanceof Player) && (entity !== this.player) && this.player.pvpFlag) {
                return entity;
            }
            return null;
        },

       getNpcAt: function(x, y) {
            var entity = this.getEntityAt(x, y);
            if(entity && (entity instanceof Npc)) {
                return entity;
            }
            return null;
        },

        getChestAt: function(x, y) {
            var entity = this.getEntityAt(x, y);
            if(entity && (entity instanceof Chest)) {
                return entity;
            }
            return null;
        },

        getItemAt: function(x, y) {
            if(this.map.isOutOfBounds(x, y) || !this.itemGrid) {
                return null;
            }
            var items = this.itemGrid[y][x],
                item = null;

            if(_.size(items) > 0) {
                // If there are potions/burgers stacked with equipment items on the same tile, always get expendable items first.
                _.each(items, function(i) {
                    if(Types.isExpendableItem(i.kind)) {
                        item = i;
                    };
                });

                // Else, get the first item of the stack
                if(!item) {
                    item = items[_.keys(items)[0]];
                }
            }
            return item;
        },

        /**
         * Returns true if an entity is located at the given position on the world grid.
         * @returns {Boolean} Whether an entity is at (x, y).
         */
        isEntityAt: function(x, y) {
            return !_.isNull(this.getEntityAt(x, y));
        },

        isMobAt: function(x, y) {
            return !_.isNull(this.getMobAt(x, y));
        },
        isPlayerAt: function(x, y) {
            return !_.isNull(this.getPlayerAt(x, y));
        },

        isItemAt: function(x, y) {
            return !_.isNull(this.getItemAt(x, y));
        },

        isNpcAt: function(x, y) {
            return !_.isNull(this.getNpcAt(x, y));
        },

        isChestAt: function(x, y) {
            return !_.isNull(this.getChestAt(x, y));
        },

        /**
         * Finds a path to a grid position for the specified character.
         * The path will pass through any entity present in the ignore list.
         */
        findPath: function(character, x, y, ignoreList) {
            var self = this,
                grid = this.pathingGrid,
                path = [],
                isPlayer = (character === this.player);

            if(this.map.isColliding(x, y)) {
                return path;
            }

            if(this.pathfinder && character) {
                if(ignoreList) {
                    _.each(ignoreList, function(entity) {
                        self.pathfinder.ignoreEntity(entity);
                    });
                }

                path = this.pathfinder.findPath(grid, character, x, y, false);

                if(ignoreList) {
                    this.pathfinder.clearIgnoreList();
                }
            } else {
                log.error("Error while finding the path to "+x+", "+y+" for "+character.id);
            }
            return path;
        },

        /**
         * Toggles the visibility of the pathing grid for debugging purposes.
         */
        togglePathingGrid: function() {
            if(this.debugPathing) {
                this.debugPathing = false;
            } else {
                this.debugPathing = true;
            }
        },

        /**
         * Toggles the visibility of the FPS counter and other debugging info.
         */
        toggleDebugInfo: function() {
            if(this.renderer && this.renderer.isDebugInfoVisible) {
                this.renderer.isDebugInfoVisible = false;
            } else {
                this.renderer.isDebugInfoVisible = true;
            }
        },

        /**
         *
         */
        movecursor: function() {
            var mouse = this.getMouseGridPosition(),
                x = mouse.x,
                y = mouse.y;

            this.cursorVisible = true;

            if(this.player && !this.renderer.mobile && !this.renderer.tablet) {
                this.hoveringCollidingTile = this.map.isColliding(x, y);
                this.hoveringPlateauTile = this.player.isOnPlateau ? !this.map.isPlateau(x, y) : this.map.isPlateau(x, y);
                this.hoveringMob = this.isMobAt(x, y);
                this.hoveringPlayer = this.isPlayerAt(x, y);
                this.hoveringItem = this.isItemAt(x, y);
                this.hoveringNpc = this.isNpcAt(x, y);
                this.hoveringOtherPlayer = this.isPlayerAt(x, y);
                this.hoveringChest = this.isChestAt(x, y);

                if(this.hoveringMob || this.hoveringPlayer || this.hoveringNpc || this.hoveringChest || this.hoveringOtherPlayer) {
                    var entity = this.getEntityAt(x, y);

                    this.player.showTarget(entity);
                    if(!entity.isHighlighted && this.renderer.supportsSilhouettes) {
                        if(this.lastHovered) {
                            this.lastHovered.setHighlight(false);
                        }
                        entity.setHighlight(false);
                    }
                    this.lastHovered = entity;
                }
                else if(this.lastHovered) {
                    this.lastHovered.setHighlight(null);
                    if(this.timeout === undefined && !this.player.hasTarget()) {
                        var self = this;
                        this.timeout = setTimeout(function(){
                            $('#inspector').fadeOut('fast');
                            $('#inspector .health').text('');
                            self.player.inspecting = null;
                        }, 2000);
                        this.timeout = undefined;
                    }
                    this.lastHovered = null;
                }
            }
        },

        /**
         * Moves the player one space, if possible
         */
        keys: function(pos, orientation) {
            this.hoveringCollidingTile = false;
            this.hoveringPlateauTile = false;

            if((pos.x === this.previousClickPosition.x
            && pos.y === this.previousClickPosition.y) || this.isZoning()) {
                return;
            } else {
                if(!this.player.disableKeyboardNpcTalk)
                    this.previousClickPosition = pos;
            }

            if(!this.player.isMoving()) {
                this.cursorVisible = false;
                this.processInput(pos);
            }
        },

        click: function()
        {
            var pos = this.getMouseGridPosition();

            if(this.textWindowHandler.textWindowOn) {
                this.textWindowHandler.close();
                this.closeItemInfo();
            }

            if(pos.x === this.camera.gridX+this.camera.gridW-2
            && pos.y === this.camera.gridY+this.camera.gridH-1){
                if(this.player.inventory[0]){
                    this.menu.clickInventory0();
                }
                return;
            } else if(pos.x === this.camera.gridX+this.camera.gridW-1
                    && pos.y === this.camera.gridY+this.camera.gridH-1){
                if(this.player.inventory[1]){
                    this.menu.clickInventory1();
                }
                return;
            } else if(this.menu.inventoryOn){
                var inventoryNumber;
                var clickedMenu;

                if(this.menu.inventoryOn === "inventory0"){
                    inventoryNumber = 0;
                } else if(this.menu.inventoryOn === "inventory1"){
                    inventoryNumber = 1;
                } else{
                    return;
                }
                clickedMenu = this.menu.isClickedInventoryMenu(pos, this.camera);
                if(clickedMenu === 3
                    && this.player.inventory[inventoryNumber] !== Types.Entities.CAKE
                    && this.player.inventory[inventoryNumber] !== Types.Entities.CD) {
                    if(Types.isHealingItem(this.player.inventory[inventoryNumber])) {
                        this.healShortCut = inventoryNumber;
                        this.menu.close();
                    } else {
                        this.equip(inventoryNumber);
                    }
                    return;
                } else if(clickedMenu === 2
                    && this.player.inventory[inventoryNumber] !== Types.Entities.CAKE
                    && this.player.inventory[inventoryNumber] !== Types.Entities.CD) {
                    if(Types.isArmor(this.player.inventory[inventoryNumber])){
                        this.avatar(inventoryNumber);
                        return;
                    } else if(Types.isHealingItem(this.player.inventory[inventoryNumber])) {
                        this.eat(inventoryNumber);
                        return;
                    }
                } else if(clickedMenu === 1
                    && this.player.inventory[inventoryNumber] !== Types.Entities.CAKE
                    && this.player.inventory[inventoryNumber] !== Types.Entities.CD) {
                    if(Types.isHealingItem(this.player.inventory[inventoryNumber]) && (this.player.inventoryCount[inventoryNumber] > 1)) {
                        $('#dropCount').val(this.player.inventoryCount[inventoryNumber]);
                        this.app.showDropDialog(inventoryNumber);
                    } else {
                        this.client.sendInventory("empty", inventoryNumber, 1);
                        this.player.makeEmptyInventory(inventoryNumber);
                    }
                    this.menu.close();
                    return;
                } else {
                    this.menu.close();
                }
            } else{
                this.menu.close();
            }
            
            if(pos.x === this.previousClickPosition.x
            && pos.y === this.previousClickPosition.y) {
                return;
            } else {
                this.previousClickPosition = pos;
            }

            this.processInput(pos);
        },

        /**
         * Processes game logic when the user triggers a click/touch event during the game.
         */
        processInput: function(pos) {
            var entity;

            if(this.started
            && this.player
            && !this.isZoning()
            && !this.isZoningTile(this.player.nextGridX, this.player.nextGridY)
            && !this.player.isDead
            && !this.hoveringCollidingTile
            && !this.hoveringPlateauTile) {
                entity = this.getEntityAt(pos.x, pos.y);

        	    if(entity instanceof Mob || (entity instanceof Player && entity !== this.player && this.player.pvpFlag && this.pvpFlag)) {
                    this.makePlayerAttack(entity);
                }
                else if(entity instanceof Item) {
                    this.makePlayerGoToItem(entity);
                }
                else if(entity instanceof Npc) {
                    if(this.player.isAdjacentNonDiagonal(entity) === false) {
                        this.makePlayerTalkTo(entity);
                    } else {
                        if(!this.player.disableKeyboardNpcTalk) {
                            this.makeNpcTalk(entity);

                            if(this.player.moveUp || this.player.moveDown || this.player.moveLeft || this.player.moveRight)
                                this.player.disableKeyboardNpcTalk = true;
                        }
                    }
                }
                else if(entity instanceof Chest) {
                    this.makePlayerOpenChest(entity);
                }
                else {
                    this.makePlayerGoTo(pos.x, pos.y);
                }
            }
        },

        rightClick: function() {
            var pos = this.getMouseGridPosition();

            if(pos.x === this.camera.gridX+this.camera.gridW-2
            && pos.y === this.camera.gridY+this.camera.gridH-1){
                if(this.player.inventory[0]){
                    if(Types.isHealingItem(this.player.inventory[0]))
                        this.eat(0);
                }
                return;
            } else if(pos.x === this.camera.gridX+this.camera.gridW-1
                   && pos.y === this.camera.gridY+this.camera.gridH-1){
                if(this.player.inventory[1]){
                    if(Types.isHealingItem(this.player.inventory[1]))
                        this.eat(1);
                }
            } else {
                if((this.healShortCut >= 0) && this.player.inventory[this.healShortCut]) {
                    if(Types.isHealingItem(this.player.inventory[this.healShortCut]))
                        this.eat(this.healShortCut);
                }
            }
        },

        isMobOnSameTile: function(mob, x, y) {
            var X = x || mob.gridX,
                Y = y || mob.gridY,
                list = this.entityGrid[Y][X],
                result = false;

            _.each(list, function(entity) {
                if(entity instanceof Mob && entity.id !== mob.id) {
                    result = true;
                }
            });
            return result;
        },

        getFreeAdjacentNonDiagonalPosition: function(entity) {
            var self = this,
                result = null;

            entity.forEachAdjacentNonDiagonalPosition(function(x, y, orientation) {
                if(!result && !self.map.isColliding(x, y) && !self.isMobAt(x, y)) {
                    result = {x: x, y: y, o: orientation};
                }
            });
            return result;
        },

        tryMovingToADifferentTile: function(character) {
            var attacker = character,
                target = character.target;

            if(attacker && target && target instanceof Player) {
                if(!target.isMoving() && attacker.getDistanceToEntity(target) === 0) {
                    var pos;

                    switch(target.orientation) {
                        case Types.Orientations.UP:
                            if(!this.map.isColliding(target.gridX, target.gridY - 1)) {
                                pos = {x: target.gridX, y: target.gridY - 1, o: target.orientation};
                            }
                            break;
                        case Types.Orientations.DOWN:
                            if(!this.map.isColliding(target.gridX, target.gridY + 1)) {
                                pos = {x: target.gridX, y: target.gridY + 1, o: target.orientation};
                            }
                            break;
                        case Types.Orientations.LEFT:
                            if(!this.map.isColliding(target.gridX - 1, target.gridY)) {
                                pos = {x: target.gridX - 1, y: target.gridY, o: target.orientation};
                            }
                            break;
                        case Types.Orientations.RIGHT:
                            if(!this.map.isColliding(target.gridX + 1, target.gridY)) {
                                pos = {x: target.gridX + 1, y: target.gridY, o: target.orientation};
                            }
                            break;
                    }

                    if(pos) {
                        attacker.previousTarget = target;
                        attacker.disengage();
                        attacker.idle();
                        this.makeCharacterGoTo(attacker, pos.x, pos.y);
                        target.adjacentTiles[pos.o] = true;

                        return true;
                    }
                }

                if(!target.isMoving() && attacker.isAdjacentNonDiagonal(target) && this.isMobOnSameTile(attacker)) {
                    var pos = this.getFreeAdjacentNonDiagonalPosition(target);

                    // avoid stacking mobs on the same tile next to a player
                    // by making them go to adjacent tiles if they are available
                    if(pos && !target.adjacentTiles[pos.o]) {
                        if(this.player.target && attacker.id === this.player.target.id) {
                            return false; // never unstack the player's target
                        }

                        attacker.previousTarget = target;
                        attacker.disengage();
                        attacker.idle();
                        this.makeCharacterGoTo(attacker, pos.x, pos.y);
                        target.adjacentTiles[pos.o] = true;

                        return true;
                    }
                }
            }
            return false;
        },

        /**
         *
         */
        onCharacterUpdate: function(character) {
            var time = this.currentTime,
                self = this;
            
            // If mob has finished moving to a different tile in order to avoid stacking, attack again from the new position.
            if(character.previousTarget && !character.isMoving() && character instanceof Mob) {
                var t = character.previousTarget;

                if(this.getEntityById(t.id)) { // does it still exist?
                    character.previousTarget = null;
                    this.createAttackLink(character, t);
                    return;
                }
            }

            if(character.isAttacking() && (!character.previousTarget || character.id === this.playerId)) {
                var isMoving = this.tryMovingToADifferentTile(character); // Don't let multiple mobs stack on the same tile when attacking a player.

                if(character.canAttack(time)) {
                    if(!isMoving) { // don't hit target if moving to a different tile.
                        if(character.hasTarget() && character.getOrientationTo(character.target) !== character.orientation) {
                            character.lookAtTarget();
                        }

                        character.hit();

                        if(character.id === this.playerId) {
                            this.client.sendHit(character.target);
                        }

                        if(character instanceof Player && this.camera.isVisible(character)) {
                            this.audioManager.playSound("hit"+Math.floor(Math.random()*2+1));
                        }

                        if(character.hasTarget() && character.target.id === this.playerId && this.player && !this.player.invincible) {
                            this.client.sendHurt(character);
                        }
                    }
                } else {
                    if(character.hasTarget()
                    && character.isDiagonallyAdjacent(character.target)
                    && character.target instanceof Player
                    && !character.target.isMoving()) {
                        // character.follow(character.target);
                    }
                }
            }
        },

        /**
         *
         */
        isZoningTile: function(x, y) {
            var c = this.camera;

            x = x - c.gridX;
            y = y - c.gridY;

            if(x === 0 || y === 0 || x === c.gridW-1 || y === c.gridH-1) {
                return true;
            }
            return false;
        },

        /**
         *
         */
        getZoningOrientation: function(x, y) {
            var orientation = "",
                c = this.camera;

            x = x - c.gridX;
            y = y - c.gridY;

            if(x === 0) {
                orientation = Types.Orientations.LEFT;
            }
            else if(y === 0) {
                orientation = Types.Orientations.UP;
            }
            else if(x === c.gridW-1) {
                orientation = Types.Orientations.RIGHT;
            }
            else if(y === c.gridH-1) {
                orientation = Types.Orientations.DOWN;
            }

            return orientation;
        },

        startZoningFrom: function(x, y) {
            this.zoningOrientation = this.getZoningOrientation(x, y);

            if(this.renderer.mobile || this.renderer.tablet) {
                var z = this.zoningOrientation,
                    c = this.camera,
                    ts = this.renderer.tilesize,
                    x = c.x,
                    y = c.y,
                    xoffset = (c.gridW - 2) * ts,
                    yoffset = (c.gridH - 2) * ts;

                if(z === Types.Orientations.LEFT || z === Types.Orientations.RIGHT) {
                    x = (z === Types.Orientations.LEFT) ? c.x - xoffset : c.x + xoffset;
                } else if(z === Types.Orientations.UP || z === Types.Orientations.DOWN) {
                    y = (z === Types.Orientations.UP) ? c.y - yoffset : c.y + yoffset;
                }
                c.setPosition(x, y);

                this.renderer.clearScreen(this.renderer.context);
                this.endZoning();

                // Force immediate drawing of all visible entities in the new zone
                this.forEachVisibleEntityByDepth(function(entity) {
                    entity.setDirty();
                });
            }
            else {
                this.currentZoning = new Transition();
            }
            this.bubbleManager.clean();
            this.client.sendZone();
        },

        enqueueZoningFrom: function(x, y) {
            this.zoningQueue.push({x: x, y: y});

            if(this.zoningQueue.length === 1) {
                this.startZoningFrom(x, y);
            }
        },

        endZoning: function() {
            this.currentZoning = null;
            this.resetZone();
            this.zoningQueue.shift();

            if(this.zoningQueue.length > 0) {
                var pos = this.zoningQueue[0];
                this.startZoningFrom(pos.x, pos.y);
            }
        },

        isZoning: function() {
            return !_.isNull(this.currentZoning);
        },

        resetZone: function() {
            this.bubbleManager.clean();
            this.initAnimatedTiles();
            this.renderer.renderStaticCanvases();
        },

        resetCamera: function() {
            this.camera.focusEntity(this.player);
            this.resetZone();
        },

        say: function(message) {
			//#cli guilds
			var regexp = /^\/guild\ (invite|create|accept)\s+([^\s]*)|(guild:)\s*(.*)$|^\/guild\ (leave)$/i;
			var args = message.match(regexp);
			if(args != undefined){
				switch(args[1]){
					case "invite":
						if(this.player.hasGuild()){
							this.client.sendGuildInvite(args[2]);
						}
						else{
							this.showNotification("Invite "+args[2]+" to where?");
						}
						break;
					case "create":
						this.client.sendNewGuild(args[2]);
						break;
					case undefined:
						if(args[5]==="leave"){
							this.client.sendLeaveGuild();
						}
						else if(this.player.hasGuild()){
							this.client.talkToGuild(args[4]);
						}
						else{
							this.showNotification("You got no-one to talk to…");
						}
						break;
					case "accept":
						var status;
						if(args[2] === "yes") {
							status = this.player.checkInvite();
							if(status === false){
								this.showNotification("You were not invited anyway…");
							}
							else if (status < 0) {
								this.showNotification("Sorry to say it's too late…");
								setTimeout(function(){self.showNotification("Find someone and ask for another invite.")},2500);
							}
							else{
								this.client.sendGuildInviteReply(this.player.invite.guildId, true);
							}
						}
						else if(args[2] === "no"){
							status = this.player.checkInvite();
							if(status!==false){
								this.client.sendGuildInviteReply(this.player.invite.guildId, false);
								this.player.deleteInvite();
							}
							else{
								this.showNotification("Whatever…");
							}
						}
						else{
							this.showNotification("“guild accept” is a YES or NO question!!");
						}
						break;
				}	
            }
            if(!this.chathandler.processSendMessage(message)){
                this.client.sendChat(message);
            }
        },

        createBubble: function(id, message) {
            this.bubbleManager.create(id, message, this.currentTime);
        },

        destroyBubble: function(id) {
            this.bubbleManager.destroyBubble(id);
        },

        assignBubbleTo: function(character) {
            var bubble = this.bubbleManager.getBubbleById(character.id);

            if(bubble) {
                var s = this.renderer.scale,
                    t = 16 * s, // tile size
                    x = ((character.x - this.camera.x) * s),
                    w = parseInt(bubble.element.css('width')) + 24,
                    offset = (w / 2) - (t / 2),
                    offsetY,
                    y;

                if(character instanceof Npc) {
                    offsetY = 0;
                } else {
                    if(s === 2) {
                        if(this.renderer.mobile) {
                            offsetY = 0;
                        } else {
                            offsetY = 15;
                        }
                    } else {
                        offsetY = 12;
                    }
                }

                y = ((character.y - this.camera.y) * s) - (t * 2) - offsetY;

                bubble.element.css('left', x - offset + 'px');
                bubble.element.css('top', y + 'px');
            }
        },

        respawn: function() {
            console.log("Beginning respawn");

            this.entities = {};
            this.initEntityGrid();
            this.initPathingGrid();
            this.initRenderingGrid();

            this.player = new Warrior("player", this.username);
            this.player.pw = this.userpw;
            this.player.email = this.email;
            this.initPlayer();
            this.app.initTargetHud();

            this.started = true;
            this.client.enable();
            this.client.sendLogin(this.player);

            if(this.renderer.mobile || this.renderer.tablet) {
                this.renderer.clearScreen(this.renderer.context);
            }

            console.log("Finished respawn");
        },

        onGameStart: function(callback) {
            this.gamestart_callback = callback;
        },

        onDisconnect: function(callback) {
            this.disconnect_callback = callback;
        },

        onPlayerDeath: function(callback) {
            this.playerdeath_callback = callback;
        },

        onUpdateTarget: function(callback){
          this.updatetarget_callback = callback;
        },
        onPlayerExpChange: function(callback){
            this.playerexp_callback = callback;
        },

        onPlayerHealthChange: function(callback) {
            this.playerhp_callback = callback;
        },

        onPlayerHurt: function(callback) {
            this.playerhurt_callback = callback;
        },

        onPlayerEquipmentChange: function(callback) {
            this.equipment_callback = callback;
        },

        onNbPlayersChange: function(callback) {
            this.nbplayers_callback = callback;
        },
        
        onGuildPopulationChange: function(callback) {
			this.nbguildplayers_callback = callback;
		},

        onNotification: function(callback) {
            this.notification_callback = callback;
        },

        onPlayerInvincible: function(callback) {
            this.invincible_callback = callback
        },

        resize: function() {
            var x = this.camera.x,
                y = this.camera.y,
                currentScale = this.renderer.scale,
                newScale = this.renderer.getScaleFactor();

                this.renderer.rescale(newScale);
                this.camera = this.renderer.camera;
                this.camera.setPosition(x, y);

                this.renderer.renderStaticCanvases();
        },

        updateBars: function() {
            if(this.player && this.playerhp_callback) {
                this.playerhp_callback(this.player.hitPoints, this.player.maxHitPoints);
            }
        },
        updateExpBar: function(){
            if(this.player && this.playerexp_callback){
                var expInThisLevel = this.player.experience - Types.expForLevel[this.player.level-1];
                var expForLevelUp = Types.expForLevel[this.player.level] - Types.expForLevel[this.player.level-1];
                this.playerexp_callback(expInThisLevel, expForLevelUp);
            }
        },
        updateTarget: function(targetId, points, healthPoints, maxHp){
            if(this.player.hasTarget() && this.updatetarget_callback){
                var target = this.getEntityById(targetId);
                target.name = Types.getKindAsString(target.kind);
                target.points = points;
                target.healthPoints = healthPoints;
                target.maxHp = maxHp;
                this.updatetarget_callback(target);
            }
        },
    
        getDeadMobPosition: function(mobId) {
            var position;

            if(mobId in this.deathpositions) {
                position = this.deathpositions[mobId];
                delete this.deathpositions[mobId];
            }

            return position;
        },

        showNotification: function(message) {
            if(this.notification_callback) {
                this.notification_callback(message);
            }
        },

        removeObsoleteEntities: function() {
            var nb = _.size(this.obsoleteEntities),
                self = this;

            if(nb > 0) {
                _.each(this.obsoleteEntities, function(entity) {
                    if(entity.id != self.player.id) { // never remove yourself
                        self.removeEntity(entity);
                    }
                });
                console.log("Removed "+nb+" entities: "+_.pluck(_.reject(this.obsoleteEntities, function(id) { return id === self.player.id }), 'id'));
                this.obsoleteEntities = null;
            }
        },

        /**
         * Fake a mouse move event in order to update the cursor.
         *
         * For instance, to get rid of the sword cursor in case the mouse is still hovering over a dying mob.
         * Also useful when the mouse is hovering a tile where an item is appearing.
         */
        updateCursor: function() {
            if(!this.cursorVisible)
                var keepCursorHidden = true;

            this.movecursor();
            this.updateCursorLogic();

            if(keepCursorHidden)
                this.cursorVisible = false;
        },

        /**
         * Change player plateau mode when necessary
         */
        updatePlateauMode: function() {
            if(this.map.isPlateau(this.player.gridX, this.player.gridY)) {
                this.player.isOnPlateau = true;
            } else {
                this.player.isOnPlateau = false;
            }
        },

        updatePlayerCheckpoint: function() {
            var checkpoint = this.map.getCurrentCheckpoint(this.player);

            if(checkpoint) {
                var lastCheckpoint = this.player.lastCheckpoint;
                if(!lastCheckpoint || (lastCheckpoint && lastCheckpoint.id !== checkpoint.id)) {
                    this.player.lastCheckpoint = checkpoint;
                    this.client.sendCheck(checkpoint.id);
                }
            }
        },

        makeAttackerFollow: function(attacker) {
              var target = attacker.target;

              if(attacker.isAdjacent(attacker.target)) {
                    attacker.lookAtTarget();
              } else {
                  attacker.follow(target);
              }
        },

        forEachEntityAround: function(x, y, r, callback) {
            for(var i = x-r, max_i = x+r; i <= max_i; i += 1) {
                for(var j = y-r, max_j = y+r; j <= max_j; j += 1) {
                    if(!this.map.isOutOfBounds(i, j)) {
                        _.each(this.renderingGrid[j][i], function(entity) {
                            callback(entity);
                        });
                    }
                }
            }
        },

        checkOtherDirtyRects: function(r1, source, x, y) {
            var r = this.renderer;

            this.forEachEntityAround(x, y, 2, function(e2) {
                if(source && source.id && e2.id === source.id) {
                    return;
                }
                if(!e2.isDirty) {
                    var r2 = r.getEntityBoundingRect(e2);
                    if(r.isIntersecting(r1, r2)) {
                        e2.setDirty();
                    }
                }
            });

            if(source && !(source.hasOwnProperty("index"))) {
                this.forEachAnimatedTile(function(tile) {
                    if(!tile.isDirty) {
                        var r2 = r.getTileBoundingRect(tile);
                        if(r.isIntersecting(r1, r2)) {
                            tile.isDirty = true;
                        }
                    }
                });
            }

            if(!this.drawTarget && this.selectedCellVisible) {
                var targetRect = r.getTargetBoundingRect();
                if(r.isIntersecting(r1, targetRect)) {
                    this.drawTarget = true;
                    this.renderer.targetRect = targetRect;
                }
            }
        },

	    tryLootingItem: function(item) {
            try {
                this.player.loot(item);
                this.client.sendLoot(item); // Notify the server that this item has been looted
                this.removeItem(item);
                this.showNotification(item.getLootMessage());

                if(item.kind === Types.Entities.FIREPOTION) {
                    this.audioManager.playSound("firefox");
                }

                if(Types.isHealingItem(item.kind)) {
                    this.audioManager.playSound("heal");
                } else {
                    this.audioManager.playSound("loot");
                }
            } catch(e) {
                if(e instanceof Exceptions.LootException) {
                    this.showNotification(e.message);
                    this.audioManager.playSound("noloot");
                } else {
                    throw e;
                }
            }
        },

        keyDown: function(key) {
            var self = this;
            if(key === 49 || key === 50){ // 1, 2
              var inventoryNumber;
              if(key === 49){ // 1
                inventoryNumber = 0;
              } else if(key === 50){ // 2
                inventoryNumber = 1;
              } else{
                return;
              }
              if(Types.isHealingItem(this.player.inventory[inventoryNumber])){
                this.eat(inventoryNumber);
              }
            } else if(key === 54){ // 6
              if(this.player.magicCoolTimeCheck("heal")){
                if(this.player.healTargetName){
                  this.client.sendMagic("heal", "empty");
                  this.showNotification("To " + this.player.healTargetName + " Healing");
                } else{
                  this.showNotification("Healing Target not specified howto: /h 닉네임");
                }
              } else{
                this.showNotification("Heaing Magic CoolTime is not over yet");
              }
            }
        },

        toggleItemInfo: function() {
            this.ItemInfoOn  = !this.ItemInfoOn;
        },

        closeItemInfo: function() {
            this.itemInfoOn = false;
        },
        equip: function(inventoryNumber){
            if(Types.isArmor(this.player.inventory[inventoryNumber])){
                this.client.sendInventory("armor", inventoryNumber, 1);
                this.player.equipFromInventory("armor", inventoryNumber, this.sprites);
                if(this.equipment_callback) {
                     this.equipment_callback();
                }
                this.menu.close();
            }
        },
        avatar: function(inventoryNumber){
            this.client.sendInventory("avatar", inventoryNumber, 1);
            this.player.equipFromInventory("avatar", inventoryNumber, this.sprites);
            this.menu.close();
        },
        eat: function(inventoryNumber){
            if(this.player.hitPoints < this.player.maxHitPoints) {
                if(this.player.decInventory(inventoryNumber)){
                    this.client.sendInventory("eat", inventoryNumber, 1);
                } else{
                    this.showNotification("힐링 아이템 쿨타임이 안 끝났습니다.");
                }
            } else {
                this.showNotification("최대 체력입니다.");
            }
            this.menu.close();
        }
    });

    return Game;
});
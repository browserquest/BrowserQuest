
define(['npc'], function(Npc) {

    var NPCs = {
        Villager: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGER, 1);
                this.beforeQuestCompleteTalk = [
                    "hey... I want to be a warrior too...",
                    "Can you get me leather armor?"
                ];
                this.afterQuestCompleteTalk = [
                    "Howdy stranger. Do you like poetry?",
                    "Roses are red, violets are blue...",
                    "I like hunting rats, and so do you...",
                    "The rats are dead, now what to do?",
                    "To be honest, I have no clue.",
                    "Maybe the forest, could interest you...",
                    "or instead, cook a rat stew."
                ]
            }
        }),

        Guard: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.GUARD, 1);
                this.beforeQuestCompleteTalk = [
                    "Hello there",
                    "We don't need to see your identification",
                    "You are not the player we're looking for",
                    "Move along, move along..."
                ]
            },
        }),

        King: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.KING, 1);
                this.beforeQuestCompleteTalk = [
                    "Monster was caught by Princess Leona",
                    "Please, rescue the princess"
                ];
            }
        }),

        Agent: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.AGENT, 1);
                this.beforeQuestCompleteTalk = [
                    "Oh, I lost my girlfriend's birthday cake...",
                    "Have you ever seen a cake near here?",
                ]
            }
        }),

        Rick: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.RICK, 1);
                this.beforeQuestCompleteTalk = [
                    "We're no strangers to love",
                    "You know the rules and so do I",
                    "A full commitment's what I'm thinking of",
                    "You wouldn't get this from any other guy",
                    "I just wanna tell you how I'm feeling",
                    "Gotta make you understand",
                    "Never gonna give you up",
                    "Never gonna let you down",
                    "Never gonna run around and desert you",
                    "Never gonna make you cry",
                    "Never gonna say goodbye",
                    "Never gonna tell a lie and hurt you"
                ]
            }
        }),

        VillageGirl: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.VILLAGEGIRL, 1);
                this.beforeQuestCompleteTalk = [
                    "Brother, there are so many rats in town.",
                    "Plese, kill 10 rats."
                ];
                this.afterQuestCompleteTalk = [
                    "I have something to say.",
                    "Brother, have I become fat?",
                    "Do not you know why I'm angry?",
                    "Do you know what you did wrong?",
                    "Do not you know before I say it?",
                    "what are you sorry about?",
                    "Why are you doing sorry?",
                    "Who is upset about it now?",
                    "You have changed...",
                    "Done. Your brother is just like any other guy."
                ];
            }
        }),

        Coder: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.CODER, 1);
                this.beforeQuestCompleteTalk = [
                    "Hi! Do you know that you can also play BrowserQuest on your tablet or mobile?",
                    "That's the beauty of HTML5!",
                    "Give it a try..."
                ]
            }
        }),

        Scientist: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.SCIENTIST, 1);
                this.beforeQuestCompleteTalk = [
                    "Greetings.",
                    "I am the inventor of these two potions.",
                    "The red one will replenish your health points...",
                    "The orange one will turn you into a firefox and make you invincible...",
                    "But it only lasts for a short while.",
                    "So make good use of it!",
                    "Now if you'll excuse me, I need to get back to my experiments..."
                ]
            }
        }),

        Nyan: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.NYAN, 1);
                this.idleSpeed = 50;
                this.beforeQuestCompleteTalk = [
                    "Do you want to find some music CDs? nyan",
                ]
            }
        }),

        Sorcerer: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.SORCERER, 1);
                this.idleSpeed = 150;
                this.beforeQuestCompleteTalk = [
                    "Ah... I had foreseen you would come to see me.",
                    "Well? How do you like my new staff?",
                    "Pretty cool, eh?",
                    "Where did I get it, you ask?",
                    "I understand. It's easy to get envious.",
                    "I actually crafted it myself, using my mad wizard skills.",
                    "But let me tell you one thing...",
                    "There are lots of items in this game.",
                    "Some more powerful than others.",
                    "In order to find them, exploration is key.",
                    "Good luck."
                ];
            }
        }),

        Priest: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.PRIEST, 1);
                this.beforeQuestCompleteTalk = [
                    "I came to pray to the friend of the skeleton king who died, but I can not do it because there are too many skeletons...",
                    "Please, kill skeleton",
                ]
            }
        }),

        BeachNpc: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.BEACHNPC, 1);
                this.beforeQuestCompleteTalk = [
                    "There are so many crabs that I can not play.",
                    "Please, kill crab",
                ]
            }
        }),

        ForestNpc: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.FORESTNPC, 1);
                this.beforeQuestCompleteTalk = [
                    "lorem ipsum dolor sit amet",
                    "consectetur adipisicing elit, sed do eiusmod tempor"
                ]
            }
        }),

        DesertNpc: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.DESERTNPC, 1);
                this.beforeQuestCompleteTalk = [
                    "One does not simply walk into these mountains...",
                    "An ancient undead lord is said to dwell here.",
                    "Nobody knows exactly what he looks like...",
                    "...for none has lived to tell the tale.",
                    "It's not too late to turn around and go home, kid."
                ]
            }
        }),

        LavaNpc: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.LAVANPC, 1);
                this.beforeQuestCompleteTalk = [
                    "lorem ipsum dolor sit amet",
                    "consectetur adipisicing elit, sed do eiusmod tempor"
                ]
            }
        }),

        Octocat: Npc.extend({
            init: function(id) {
                this._super(id, Types.Entities.OCTOCAT, 1);
                this.beforeQuestCompleteTalk = [
                    "Welcome to BrowserQuest!",
                    "Want to see the source code?",
                    'Check out <a target="_blank" href="http://github.com/game-x-coin/BrowserQuest">the repository on GitHub</a>'
                ];
            }
        })
    };

    return NPCs;
});

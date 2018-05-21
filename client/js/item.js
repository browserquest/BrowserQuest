
define(['entity'], function(Entity) {

    var Item = Entity.extend({
        init: function(id, kind, type) {
            this._super(id, kind);

            this.itemKind = Types.getKindAsString(kind);
            this.type = type;
            this.wasDropped = false;

            this.count = 1;
        },

        hasShadow: function() {
            return true;
        },

        onLoot: function(player) {
            if(this.type === "weapon") {
                player.switchWeapon(this.itemKind);
            } else if(this.type === "armor") {
                if(player.level < 100){
                    player.armorloot_callback(this.itemKind);
                }
            }
        },

        getSpriteName: function() {
            return "item-"+ this.itemKind;
        },

        getLootMessage: function() {
            return this.lootMessage;
        }
    });

    return Item;
});

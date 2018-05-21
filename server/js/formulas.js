var Utils = require('./utils');

var Formulas = {};

Formulas.dmg = function(attacker, defender) {
    var dealt = (attacker.weaponLevel*0.9+attacker.level*0.3 + 5) * Utils.randomInt(6, 9),
        absorbed = (defender.armorLevel*1.8+defender.level*0.325) * 2,
        dmg =  Math.floor(dealt - absorbed);

    //console.log("abs: "+absorbed+"   dealt: "+ dealt+"   dmg: "+ (dealt - absorbed));
    if (dmg <= 0) {
        return Utils.randomInt(0, 3);
    } else {
        return dmg;
    }
};

Formulas.hp = function (entityLevel) {
    var hp = 200 + entityLevel * 8;
    return hp;
};

if (typeof exports !== 'undefined') {
    module.exports = Formulas;
}

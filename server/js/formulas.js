var Utils = require('./utils');

var Formulas = {};

Formulas.dmg = function (weaponLevel, attackerLevel, armorLevel, defenderLevel) {
    var dealt = (weaponLevel * 0.9 + attackerLevel * 0.65) * Utils.randomInt(6, 9),
        absorbed = (armorLevel * 0.9 + defenderLevel * 0.65) * 2,
        dmg =  Math.floor(dealt - absorbed);

    //console.log("abs: "+absorbed+"   dealt: "+ dealt+"   dmg: "+ (dealt - absorbed));
    if (dmg <= 0) {
        return Utils.randomInt(0, 3);
    } else {
        return dmg;
    }
};

Formulas.hp = function (armorLevel, entityLevel) {
    var hp = 80 + ((armorLevel + entityLevel) * 15);;
    return hp;
};

if (typeof exports !== 'undefined') {
    module.exports = Formulas;
}

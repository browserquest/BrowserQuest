var fs = require('fs');


function load_boilerplate() {
    data = fs.readFileSync(__dirname + '/../shared/js/test_boilerplate.js');
    return data.toString();
};

module.exports = load_boilerplate

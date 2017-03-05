/**
 * @author rubyisapm
 */
var path = require('path');
var fs = require('fs');
var entryScripts = fs.readdirSync(path.resolve(__dirname, '../src/js/app'));
var entries = {};
entryScripts.map(function (script) {
    var fileName = script.split('.')[0];
    entries[fileName] = './src/js/app/' + script;
});
module.exports = entries;
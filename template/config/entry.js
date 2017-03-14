/**
 * @author rubyisapm
 */
var path = require('path');
var fs = require('fs');
var utils=require('../build/utils');
var entryScripts = utils.readFilesInDir(path.resolve(__dirname, '../src/js/app'));
var entries = {};
entryScripts.map(function (script) {
    var file = path.relative(path.resolve(__dirname, '../src/js/app'),script);
    var fileName=file.split('.')[0];
    entries[fileName] = './src/js/app/' + file;
});
module.exports = entries;

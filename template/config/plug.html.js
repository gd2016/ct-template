/**
 * @author rubyisapm
 */

var path = require('path');
var fs = require('fs');
var ejsTemplates = fs.readdirSync(path.resolve(__dirname, '../ejs'));
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config=require('./index');
function htmlPlugins(prod) {
  return ejsTemplates.map(function (file) {
    var filename = file.split('.')[0];
    var option={
      filename: path.resolve(__dirname, '../view/' + filename + '.html'),
      template: './ejs/' + file,
      inject:false
    };
    if(!prod){
      option.version=+new Date();
    }else{
      option.minify= {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      };
      option.chunksSortMode= 'dependency';
      option.version=config.build.version;
    }
    return new HtmlWebpackPlugin(option)
  });
};

module.exports = htmlPlugins;

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
      inject:false,
      version:+new Date()
    };
    if(prod){
      option.minify= {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      };
      option.chunksSortMode= 'dependency';
    }
    return new HtmlWebpackPlugin(option)
  });
};

module.exports = htmlPlugins;

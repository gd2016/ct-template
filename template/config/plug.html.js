/**
 * @author rubyisapm
 */

var path = require('path');
var utils=require('../build/utils');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config=require('./index');
var scriptServer={
    dev:'//staticadm.tcy365.org:1506',//开发版
    test:'//staticadm.tcy365.org:1507',//提测版
    testStable:'//staticadm.tcy365.org:1505',//测试稳定版
    pre:'//staticadm.tcy365.com:2505',//预发版
    official:'//staticadm.tcy365.com'//正式版
};
var text={
    dev:'开发版',
    test:'提测版',
    testStable:'测试稳定版',
    pre:'预发版',
    official:'正式版'
};
function htmlPlugins(prod) {
    var ejsTemplates=utils.readFilesInDir(path.resolve(__dirname, '../ejs'));

    var htmlPlugins=[];
    ejsTemplates.map(function (file) {
        var filename = path.relative('./ejs/',file).split('.')[0];
        var option={
            filename: path.resolve(__dirname, '../view/' + filename + '.html'),
            template: file,
            inject:false,
            script:'<script src="'+config.dev.assetsPublicPath+config.dev.assetsSubDirectory+'/'+config.version+'/js/'+filename+'.js?v='+(+new Date())+'"></script>'
        };
        if(prod){
            if(config.toScriptServer){
                Object.keys(scriptServer).map(function(serverKey){
                    var server=scriptServer[serverKey];
                    var optionClone=JSON.parse(JSON.stringify(option));
                    optionClone.script='<script src="'+server+config.build.assetsPublicPath+config.build.assetsSubDirectory+'/'+config.version+'/js/'+filename+'.js"></script>';
                    optionClone.filename = path.resolve(__dirname, '../view_'+text[serverKey]+'/' + filename + '.html');
                    optionClone.minify= {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true
                    };
                    optionClone.chunksSortMode= 'dependency';
                    htmlPlugins.push(new HtmlWebpackPlugin(optionClone));
                });
            }else{
                option.script='<script src="'+config.build.assetsPublicPath+config.build.assetsSubDirectory+'/'+config.version+'/js/'+filename+'.js"></script>';
                option.minify= {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                };
                option.chunksSortMode= 'dependency';
                htmlPlugins.push(new HtmlWebpackPlugin(option));
            }

        }else{
            htmlPlugins.push(new HtmlWebpackPlugin(option));
        }
    });
    return htmlPlugins;
}

module.exports = htmlPlugins;

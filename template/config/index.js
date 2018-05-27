var path = require('path')

var config = {
    version: '1.0.0', // 指定项目的版本
    viewFile: 'view', // 指定页面所在的文件夹名称
    toScriptServer: true, // 指定资源是否需要放置到资源服务器
    pageExtend: 'html', // 指定页面文件的后缀名
    build: {
        env: require('./prod.env'),
        assetsRoot: path.resolve(__dirname, '../dist/'),
        assetsSubDirectory: 'assets',
        assetsPublicPath: '/', // 指定资源所在的资源站子目录，资源站中A以下的目录需要配置在此处
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        host: 'localhost',
        autoOpenBrowser: true,
        assetsSubDirectory: 'asset',
        assetsPublicPath: '/',
        cssSourceMap: false
    }
};

module.exports = config;
var entry = require('./entry');
config.entry = entry;

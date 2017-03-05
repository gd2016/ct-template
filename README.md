## 初始化项目

```
  vue init ct-adc/webpack [你的项目名称]
```

## 配置项说明 

项目根目录下的build/config/mock文件为项目构建配置文件

* build
    * [build.js]()  正式版构建主文件
    * [check-versions.js]()
    * [dev-client.js]()
    * [dev-server.js]() 开发版构建主文件，关于支持热更新的dev-server配置基本都在这里
    * [utils.js]()
    * [vue-loader.conf.js]() .vue文件的loader配置,供webpack.base.conf.js引用
    * [webpack.base.conf.js]() webpack的基本配置,包含entry/output/resolve/各种loader
    * [webpack.dev.conf.js]() webpack在开发环境中的配置
    * [webpack.prod.conf.js]() webpack在生产环境中的配置
    * [webpack.test.conf.js]() webpack在测试环境中的配置
* config
    * [dev.env.js]()
    * [entry.js]() 关于webpack入口的配置，默认自动读取./src/js/app中的每个文件作为入口文件
    * [index.js]() 向外释放开发版和正式版的各种参数，供构建过程使用
    * [plug.html.js]() 读取ejs文件并生成htmlPlugins，以便生成html文件.
    * [prod.env.js]()
    * [test.env.js]()
* mock
    * [data]() 设置mock数据,可以在其中按页面进行设置
        * a.js
        * b.js
    * [define.js]() 设置代理的方式和域名等内容
    * [index.js]() 设置express实例的路由规则






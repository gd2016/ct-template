## 介绍

该项目fork自官方脚手架webpack。

整个脚手架帮你完成html自动编译和入口文件自动读取，不需要开发者另外进行配置。

## 初始化项目

```
  vue init ct-adc/webpack [你的项目名称]
```

## 配置项说明 

项目根目录下的build/config/mock文件为项目构建配置文件

* build
    * [build.js](https://github.com/ct-adc/webpack/blob/master/template/build/build.js)  ``正式版构建主文件``
    * [check-versions.js](https://github.com/ct-adc/webpack/blob/master/template/build/check-versions.js)
    * [dev-client.js](https://github.com/ct-adc/webpack/blob/master/template/build/dev-client.js)
    * [dev-server.js](https://github.com/ct-adc/webpack/blob/master/template/build/dev-server.js) ``开发版构建主文件，关于支持热更新的dev-server配置基本都在这里``
    * [utils.js](https://github.com/ct-adc/webpack/blob/master/template/build/utils.js)
    * [vue-loader.conf.js](https://github.com/ct-adc/webpack/blob/master/template/build/vue-loader.conf.js)  ``.vue文件的loader配置,供webpack.base.conf.js引用``
    * [webpack.base.conf.js](https://github.com/ct-adc/webpack/blob/master/template/build/webpack.base.conf.js)  ``webpack的基本配置,包含entry/output/resolve/各种loader``
    * [webpack.dev.conf.js](https://github.com/ct-adc/webpack/blob/master/template/build/webpack.dev.conf.js)  ``webpack在开发环境中的配置``
    * [webpack.prod.conf.js](https://github.com/ct-adc/webpack/blob/master/template/build/webpack.prod.conf.js) ``webpack在生产环境中的配置``
    * [webpack.test.conf.js](https://github.com/ct-adc/webpack/blob/master/template/build/webpack.test.conf.js)  ``webpack在测试环境中的配置``
* config
    * [dev.env.js](https://github.com/ct-adc/webpack/tree/master/template/config/dev.env.js)
    * [entry.js](https://github.com/ct-adc/webpack/tree/master/template/config/entry.js)  ``关于webpack入口的配置，默认自动读取./src/js/app中的每个文件作为入口文件``
    * [index.js](https://github.com/ct-adc/webpack/tree/master/template/config/index.js)  ``向外释放开发版和正式版的各种参数，供构建过程使用``
    * [plug.html.js](https://github.com/ct-adc/webpack/tree/master/template/config/plug.html.js)  ``读取ejs文件并生成htmlPlugins，以便生成html文件.``
    * [prod.env.js](https://github.com/ct-adc/webpack/tree/master/template/config/prod.env.js)
    * [test.env.js](https://github.com/ct-adc/webpack/tree/master/template/config/test.env.js)
* mock
    * [data](https://github.com/ct-adc/webpack/blob/master/template/mock/data)  ``设置mock数据,可以在其中按页面进行设置``
        * a.js
        * b.js
    * [define.js](https://github.com/ct-adc/webpack/blob/master/template/mock/define.js)  ``设置代理的方式和域名等内容``
    * [index.js](https://github.com/ct-adc/webpack/blob/master/template/mock/index.js)  ``设置express实例的路由规则``

## 命令使用

* 开发环境调试

```
npm run dev
```

可以带参数如 `npm run dev view/app` 则可以自动打开/view/app.html; 默认则打开网站根目录。

* 生产环境构建

```
npm run build
```
## 项目文件分布

### /ejs

/ejs用于存放项目的.ejs文件。
.ejs文件用于自动生成html文件，也就是项目的真实页面文件。
脚手架会自动读取其中的全部.ejs文件并在view文件夹中生成对应路径的html文件。
如ejs/a.ejs会对应生成view/a.html；
ejs/pm/a.ejs会对应生成view/pm/a.html;

### /src

/src用于存放项目脚本文件；
其中/src/app文件参与入口文件的生成；
脚手架支持两种入口文件模式:

#### /src/app中每个.js文件都是一个入口文件;如/src/app/pageA.js；

入口文件:/src/app/\*.js

生成文件：/asset/\*.js

配置信息: entryMode.pagePacked:false

#### /src/app中每个文件夹为一个页面的脚本文件，其中的index.js文件才是最终要的入口文件；如src/app/pageA/index.js

入口文件: /src/app/*/index.js

生成文件: /asset/\*.js

配置信息: entryMode.pagePacked:true

**注意**:以上入口配置请在/config/entry.js中配置；

## mock数据

mock数据的配置都在/mock下定义，在define.js中设置module.export.define来完成代理配置。
配置如下：

属性 | 类型 | 描述 | 默认值
--- | --- | --- | ---
isProxy | Boolean | 是否使用代理 | false
matchPath | RegExp or String 如/\/api/i或者'api' | 代理规则，即路径符合该规则时通过代理访问 | /\/api/i
domain | String | 代理到的域名和端口号。如http://tcysystinker.admin.ct108.org:1505 | ""

当isProxy为false时，会使用/mock/data中的内容进行数据获取;
脚手架默认会读取data中的每一个.js文件，所以开发者可以按照页面级的数据来定义mock数据；请参照/mock/data中的样例。

## 实现方案解析

整个脚手架帮你完成html自动编译和入口文件自动读取，不需要开发者另外进行配置。

## Q & A

### 正式版上的资源访问不是/asset，是/static/projectName/asset，该怎么设置?

设置config/index中的dev.assetsSubDirectory设置为'static/projectName/asset'。


## TODO

html页面改成不区分大小写











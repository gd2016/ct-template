## 介绍

该项目fork自官方脚手架webpack。

整个脚手架帮你完成html自动编译和入口文件自动读取，不需要开发者另外进行配置。

## 初始化项目

```
  vue init gd2016/ct-template [你的项目名称]
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
ejs中的脚本会被自动注入；

### /src

/src用于存放项目脚本文件；
其中/src/app文件参与入口文件的生成；

/src/app中每个文件夹为一个页面的脚本文件，其中的index.js文件才是最终要的入口文件；如src/app/pageA/index.js

入口文件: /src/app/*/index.js

生成文件: /asset/\*.js

## mock数据

mock数据的配置都在/mock下定义，在define.js中设置module.export.define来完成代理配置。
配置如下：

属性 | 类型 | 描述 | 默认值
--- | --- | --- | ---
isProxy | Boolean | 是否使用代理 | false
matchPath | RegExp or String 如/\/api/i或者'api' | 代理规则，即路径符合该规则时通过代理访问 | /\/api/i
domain | String | 代理到的域名和端口号。如http://a.org:1505 | ""

当isProxy为false时，会使用/mock/data中的内容进行数据获取;
脚手架默认会读取data中的每一个.js文件，所以开发者可以按照页面级的数据来定义mock数据；请参照/mock/data中的样例。

### mock/data中的数据设置

mock/data下保存着接口响应数据，当isProxy为false时，返回该目录下定义的接口响应数据。

请在mock/data中针对每个页面定义响应数据，如mock/data/pageA。


#### 接口数据格式

1. 默认格式

```
'/api/ConstList': {
    Status:false,
    Data:[
        {
            Id:1,
            Val:'常量1'
        },
        {
            Id:2,
            Val:'常量2'
        },{
            Id:3,
            Val:'常量3'
        }
    ]
}
```

2. 根据参数的不同返回不同的内容

适用场景: 当项目中存在一个接口A，该接口接收不同的参数时返回截然不同的数据，那么需要使用$params配置匹配的参数。
格式如：

```
'/api/api1': {
    $params:['a1','a2','a3'],
    $res:{
        data: 1
    }
}
```
对于模拟接口数据的检测，支持以下几种:

##### $param 参数检测

检测规则: 当请求中包含指定的全部参数时，参数匹配成功

##### $contentType contentType检测

检测规则: 当请求中的contentType和指定的$contentType一致时，contentType匹配成功

##### $method 请求方式检测

检测规则：当请求的请求方式和指定的$method一致时，method匹配成功

##### $specParams 特定参数检测

检测规则：当请求的请求参数及参数值和指定的$specParams相同(===)时，特定参数匹配成功

注意：特定参数的匹配需要绝对相等，不支持嵌套对象，如检测{a:1}，不支持{a:{b:1}}，因为此类型的请求一般不会这么复杂

**会检测所有在mock/data中指定的条件，当指定的规则全部通过检测时，才返回该接口的数据**

## 项目构建

### 版本控制

项目遵循版本叠加原则，每次版本生成都会在asset里面新建一个以版本为名称的目录，放置该版本的所有资源(js和其他静态资源)。

### publicPath

将/config/index中config.build.assetsPublicPath设置为项目/资源放置的目录；
如/projectName/

#### 配置

**版本信息：**/config/index中的config.version

请在新版本构建时修改该参数，脚手架会帮你生成该版本所需的资源。

**脚本是否部署到资源站：**/config/index中的config.toScriptServer

*资源部署到资源站*

config.toScriptServer需设置为true，此时该工具会帮你生成对应不同版本的view文件（如view_开发版、view_测试版等）

*资源放在项目中*

config.toScriptServer需设置为false，此时该工具只会生成一个view文件，其中的脚本链接使用绝对路径指向该项目生成的脚本

**页面扩展名：** /config/index中的config.pageExtend

默认为html。当开发者需要更改生成页面的文件扩展名时，设置该项为相应的扩展名，如'cshtml'

## 实现方案解析

整个脚手架帮你完成html自动编译和入口文件自动读取，不需要开发者另外进行配置。

## Q & A

### 正式版上的资源访问不是/asset，是/static/projectName/asset，该怎么设置?

设置config/index中的dev.assetsPublicPath和build.assetsPublicPath'/static/projectName/'。


## 脚手架内置脚本使用示例

[使用示例](https://github.com/ct-adc/webpack/blob/master/example.md)










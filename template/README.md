{{#if_eq projectType "component"}}
## {{name}}

{组件描述}

## 组件示例图

[!img](图片地址)

## 在线demo

[在线demo]({在线demo地址})

## 功能点

1.
2.
3.

## 使用

从npm安装ct-adc-test

```
npm install {{name}} --save
```
在代码中使用

```
{描述如何在代码中使用}
```

## props

参数 | 说明 | 类型 | 默认值 | 可选值 | 描述 |
--- | --- | --- | --- | ---- | ---
参数1 | 描述1 | 默认值1 | 可选值 | | |
- 参数1.key1 | 描述1 | 可选值 | 类型1 |


## 方法

### 方法名称

方法描述。。。。。。

#### 参数列表

参数 | 说明 | 类型 | 默认值 | 可选值 | 描述 |
--- | --- | --- | --- | ---- | ----
readable | 说明 | Boolean | true |  |

返回值

类型: {Object}

说明: ......

## 事件

### 事件1

事件名称 | 说明 | 回调参数 | 描述
selected | 选中事件 | value1:说明1; value2: 说明2 | 描述

## 更新日志

[更新日志]({CHANGELOG.md的线上地址})

## 外部资源依赖列表

- jdPicker.js V2.0.0+

- webUploader V1.5.0+

{{else}}
## {项目名称，可参考策划文档}

### 项目说明

#### 项目简介

{简单描述下项目的作用，可参考策划文档}

#### 项目入口

畅唐业务管理系统 - {导航一级分类} - {导航二级分类} - {菜单标题}

例如:畅唐业务管理系统 - 用户体系 - 成长体系 - 紧急开关

#### 项目人员

* 程序：{后端开发}

* 前端：{前端开发}

* 产品：{策划}

### 技术说明

#### 技术框架

webpack + Vuejs

#### 插件和组件

[package.json]({该项目master分支中的package.json文件链接})

### 结构说明

[遵循项目目录规范](http://192.168.1.26:8080/doku.php?id=home:huangxj:admsys:projectrule:vuejsdirectory)

### 接口文档

{接口文档链接 || swagger链接 || 本项目内部.doc文件的git地址}

## 兼容性说明

兼容性：IE10+、chrome

## 发布说明

### 项目FTP

版本 | IP | 文件位置
--- | --- | ---
开发版 | {项目FTP所在的IP} | /D:/{项目FTP目录路径，如/www2/LvSysAdm/Static/EmergencySwitch/}
提测版 |   无 |  无
测试版 |  {项目FTP所在的IP} | /D:/{项目FTP目录路径，如/www2/LvSysAdm/Static/EmergencySwitch/}

### 资源FTP

版本 |   IP | 文件位置
--- | --- | ---
开发版 | 192.168.1.18 | /D:/www2/CtStaticAdm_dev/A/{项目目录,如LvSysAdm/EmergencySwitch/}
提测版 | 192.168.1.18 | /D:/www2/CtStaticAdm_test/A/{项目目录,如LvSysAdm/EmergencySwitch/}
测试版 |   192.168.1.18 | /D:/www2/CtStaticAdm/A/{项目目录,如LvSysAdm/EmergencySwitch/}
预发版 | 121.40.106.185 | /E:/pre/staticadm_pre/A/{项目目录,如LvSysAdm/EmergencySwitch/}
正式1 |  121.40.106.185 | /D:/www8/staticadm/A/{项目目录,如LvSysAdm/EmergencySwitch/}
正式2 |  121.41.74.115 |  /D:/www5/staticadm/A/{项目目录,如LvSysAdm/EmergencySwitch/}

### url

站点 | 地址
--- | ---
开发版 | {项目index.html地址，如http://lv.admin.ct108.org:1506/static/EmergencySwitch/index.html}
提测版 | {项目index.html地址，如http://lv.admin.ct108.org:1507/static/EmergencySwitch/index.html}
测试版 | {项目index.html地址，如http://lv.admin.ct108.org:930/static/EmergencySwitch/index.html}
预发版 | {项目index.html地址，如http://lv.admin.ct108.net:2505/static/EmergencySwitch/index.html}
正式版 | {项目index.html地址，如http://lv.admin.ct108.net/static/EmergencySwitch/index.html}

{{/if_eq}}
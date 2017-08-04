## 更新日志

**2017-05-11**

- 修复 当mock/data文件夹不存在时提示

- 优化 const.js支持异步获取常量列表

- 优化 mock支持同样的接口根据参数的不同返回不同的数据

- 修复 将支持多个domain改成支持一个(因为在真实的项目中,主domain永远只有一个,其他的跨域请求都会在接口层面被处理)

**2017-05-23**

- 修复 缺失body-parser引发的bug

- 修复 express-http-proxy转发大文件请求时失败(添加limit为更大的值)

**2017-06-06**

- 修复 interface中对于tdl的获取的bug

**2017-06-09**

- 优化 在构建完成的js后添加v=timestamp，便于浏览器获取最新的资源

**2017-06-22**

- 修复 interface中关于环境检测的代码: 1.去除debug环境，统一使用test; 2.分离预发和正式；

**2017-07-06**

- 修改 删除脚手架中的内置默认依赖如ct-adc-page等，更新直接引入的脚本版本如bootstrap等

**2017-07-07**

- 优化 修改const

- 添加 添加permission

**2017-07-25**

- 优化 给const添加注释

**2017-07-30**

- 修改 将jdpicker版本改为2.0.0

**2017-08-01**

- 修复 在项目中加入babel-polyfill的支持

- 新增 package.json中加入jsx语法编译支持 "babel-helper-vue-jsx-merge-props": "^2.0.2","babel-plugin-syntax-jsx": "^6.18.0",

- 优化 加入restful接口数据模拟支持(通过mock/data中配置$method/$specParams/$contentType/$params检测请求是否符合)

**2017-08-04**

- 修复 mock数据时匹配全路径（将baseUrl修改为baseUrl+path形式）
# vuetpl

> Vue项目模板

## 特性
- 清晰易扩展的目录结构
- 以闭包封装全局变量
- 丰富的demo
    - http请求
    - router路由
    - vuex状态管理
    - 国际化
- 请求mock
- 路由拦截
- 请求拦截
- 生产环境虑除demo路由
- BEM语法
- 自助提交编译包到svn脚本
- 根据语言包自动导出excel
- 根据excel自动生成语言包
- 提供多种小工具   

### 清晰易维护的目录结构
src  
├─api               //http请求  
│  └─examples       
├─apiMock           //http请求mock，与api一一对应  
│  └─examples  
├─assets            //存放样式文件、图片等资源  
├─components        //存放通用组件  
├─examples          //存放示例  
│  ├─routerUsage  
│  └─vuexUsage  
├─lib               //全局库目录  
│  ├─directives     //指令  
│  ├─locale         //国际化目录  
│  │  └─lang        //语言包  
│  ├─mixins         //混合
│  └─utils          //通用函数  
├─pages             //页面组件，模块化存放  
│  └─pageDemo1  
├─router            //路由文件，模块化存放
└─store             //vuex文件，模块化存放
    └─modules  
        ├─common  
        └─pageDemo1  
每个目录下都有一个README.md文件，说明该目录的用途。这些目录看起来多且复杂，但只要结合框架提供的demo来理解，很快就能掌握。

### 以闭包封装全局变量
虽然有vuex这样的官方插件来帮助我们进行状态管理。但是，在很多情形下，我们还是需要设置一些全局变量（window），比如：
- 全局使用到的常量（token、http请求的超时时间等等）
- vuex无法覆盖的地方（非.vue的js、jq插件，和cef的C++端交互等）  

但是全局变量如果管理不当，容易引发滥用，不易维护。  
常见的全局变量管理方法有两种，一种是设定一个namespace，将变量挂载到该名空间下，另一种方法是采用闭包。  
这里采用第二种做法，将全局变量作为私有变量'保护'起来，只暴露get和set方法。
```
// static/global.js
window.myGlobalClosure = (function () {
  var __object = {
    vueInst: undefined, // vue示例
    i18nLanguage: 'chn',
    env: 'development', // 当前环境
    role: undefined, // 角色，可用于路由拦截
    token: undefined,
    tokenAttr: 'requesttoken', // token字段，可用于http请求拦截
    tokenExpireCode: 10010, // token过期状态码, 根据服务端设置
    tokenInvalidCode: 10011, // token无效状态码，根据服务端设置
    httpTimeout: 5000 // 请求超时时间，5秒
  }
  return {
    // 设置vue实例
    setVueInst: function (instance) {
      __object.vueInst = instance
    },
    getVueInst: function () {
      return __object.vueInst
    },
    // 设置国际化语言
    setLang: function (lang) {
      if (__object.vueInst) {
        __object.vueInst.$store.commit('common/SET_I18N_LANGUAGE', {
          vue: __object.vueInst,
          lang: lang
        })
      }
      __object.i18nLanguage = lang
    },
    getLang: function () {
      return __object.i18nLanguage
    },
    getEnv: function () {
      return __object.env
    },
    setEnv: function (env) {
      __object.env = env
    },
    getRole: function () {
      return __object.role
    },
    setRole: function (uid) {
      __object.role = uid
    },
    setToken: function (token) {
      __object.token = token
    },
    getToken: function () {
      return __object.token
    },
    getTokenAttr: function () {
      return __object.tokenAttr
    },
    getTimeout: function () {
      return __object.httpTimeout
    },
    getTokenExpireCode: function () {
      return __object.tokenExpireCode
    },
    getTokenInvalidCode: function () {
      return __object.tokenInvalidCode
    }
  }
})()
```
全局变量文件在入口html处载入。
```
// index.html
<body>
    <div id="app"></div>
    <!-- 项目使用到的全局变量  -->
    <script type="text/javascript" src="static/global.js"></script>
    <!-- built files will be auto injected -->
</body>
```
这样，我们就可以在.vue或js插件中通过`window.myGlobalClosure.setXX()`或者`window.myGlobalClosure.getXX()`设置或访问全局变量。

### 丰富的demo
本项目模板提供了丰富的例子，对常见的场景（http请求、vue-router、vuex等）用法进行介绍
#### http请求

#### vue-router使用

#### vuex使用

### 生产环境去除demo路由 & demo路由懒加载
大家在使用项目模板时，都不可避免的要对其内容进行修改或删除。因为模板提供的demo只是为了供开发人员在开发时参考，上线时这一部分应该去除，否则占据资源和带宽。  
考虑到这一点，本模板自动提供了生产环境去除demo路由功能，即执行
```
npm run build
```
时，不会加载demo组件。另外，demo的路由是懒加载的，不访问就不会下载到浏览器中。因此demo目录可以一直保存在项目中，即使项目维护人员更迭，新人也能看到并遵循。
1. 通过HtmlWebpackPlugin插件注入环境变量
```
// webpack.dev.conf.js
const env = require('../config/dev.env')
const definedEnv = env.NODE_ENV // 'development'
...
plugins: [
    new HtmlWebpackPlugin({
      ...
      definedEnv: definedEnv
    }),
]

// webpack.prod.conf.js
const env = require('../config/prod.env')
const definedEnv = env.NODE_ENV // 'production'
...
plugins: [
    new HtmlWebpackPlugin({
      ...
      definedEnv: definedEnv
    }),
]
```
2. 在入口html处，将环境变量写入全局闭包
```
// index.html
<!-- 项目使用到的全局变量  -->
<script type="text/javascript" src="static/global.js"></script>
<script type="text/javascript">
    var env = <%=htmlWebpackPlugin.options.definedEnv%>
    // 生产环境的路由不包含demo页面
    window.myGlobalClosure.setEnv(env)
</script>

// global.js
window.myGlobalClosure = (function () {
    var __object = {
        ...
        env: 'development', // 当前环境
    }

    return {
        getEnv: function () {
            return __object.env
        },
        setEnv: function (env) {
            __object.env = env
        },
        ...
    }
})
```
3. 路由表中根据当前环境决定是否导入demo页面
```
// src/router/index.js
import page1Router from './pageDemo1.router'
import InputMock from '@/components/InputMock'

Vue.use(Router)
// production
let env = window.myGlobalClosure.getEnv()
const routes = env != 'production' ? [
  {
    path: '/inputMock',
    name: 'inputMock',
    component: InputMock
  },
  ...page1Router
] : []
```
4. demo路由懒加载
```
// 懒加载路由，不影响实际加载性能
// https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97
const httpUsage = () => import('../examples/httpUsage.vue')

export default [{
  path: '/examples',
  component: {
    template: '<article><router-view></router-view></article>'
  },
  children: [{
    path: 'http',
    name: 'httpUsage',
    component: httpUsage
  },
  ...]
}]
```

### 提供多种小工具 
#### 自动提交编译webapp到svn脚本

#### 语言包一键导出到excel

#### excel一键生成语言包


## todo list
- ~~http请求封装到实例中~~
- ~~demo页面（考虑路由懒加载）~~
- ~~demo页面路由不加载到生产环境中
- ~~多层回调的回调地域避免~~
- ~~router模块化~~
- 通用组件库划分
- ~~国际化~~
- ~~路由拦截~~
- ~~请求拦截~~
- ~~vuex模块化~~
- ~~mock处理~~
- webpack4特性引入
- mixins
- 指令
- 代理配置
- 生产环境校验
- eslint处理
- ~~生产环境不包含demo~~
- 图片处理
- 组件和样式分离
- BEM语法
- ~~自动提交svn脚本~~
- ~~语言包自动导出~~
- 借鉴和参考
- 动画风格
- 第三方js、jq插件的国际化

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

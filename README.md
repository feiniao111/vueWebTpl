# vuetpl

> Vue项目模板  
运行效果戳这里：  https://feiniao111.github.io/vueWebTpl-live/#/

## 安装
```bash
git clone https://github.com/feiniao111/vueWebTpl.git
```

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

## 特性
- [清晰易扩展的目录结构](#清晰易扩展的目录结构)
- [以闭包封装全局变量](#以闭包封装全局变量)
- [丰富的demo](#丰富的demo)
  - [http请求](#http请求)
  - [vue-router使用](#vue-router使用)
  - [vuex状态管理](#vuex状态管理)
  - [国际化](#国际化)
- [请求mock](#请求mock)
- [生产环境去除demo路由 & demo路由懒加载](#生产环境去除demo路由--demo路由懒加载)
- [提供多种小工具](#提供多种小工具)
  - [自动提交编译webapp到svn脚本](#自动提交编译webapp到svn脚本)
  - [自动导入导出语言包](#自动导入导出语言包) 

### 清晰易扩展的目录结构
src  
├─api ........................................................//http请求  
│  └─examples       
├─apiMock .............................................//http请求mock，与api一一对应  
│  └─examples  
├─assets ...................................................//存放样式文件、图片等资源  
├─components ......................................//存放通用组件  
├─examples ............................................//存放示例  
│  ├─routerUsage  
│  └─vuexUsage  
├─lib ...........................................................//全局库目录  
│  ├─directives .........................................//指令  
│  ├─locale .................................................//国际化目录  
│  │  └─lang ................................................//语言包  
│  ├─mixins ................................................//混合  
│  └─utils .....................................................//通用函数  
├─pages .....................................................//页面组件，模块化存放   
│  └─pageDemo1  
├─router .....................................................//路由文件，模块化存放  
└─store .......................................................//vuex文件，模块化存放  
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
```js
// static/global.js
window.myGlobalClosure = (function () {
  var __object = {
    vueInst: undefined, // vue示例
    i18nLanguage: 'chn',
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
    }
  }
})()
```
全局变量文件在入口html处载入。
```html
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
本项目模板提供了丰富的例子，对常见的场景（http请求、vue-router、vuex、国际化等）用法进行介绍
#### http请求
这里采用官方推荐插件axios，并且给出了常用的get、post请求用法，多个请求如何并发执行、顺序执行，请求如何设置全局超时时间，添加token、断网处理等等。 
具体戳这里
<a href="https://github.com/feiniao111/vueWebTpl/blob/master/src/examples/httpUsage.vue" target="_blank">httpUsage</a>   
**值得说明的是，我们将axios绑定到vue实例原型**
```js
import axios from 'axios'
Vue.prototype.$http = axios // 绑定到原型
```
这样就可以在.vue文件中通过
```js
this.$http.get()
this.$http.post()
...
```
来请求资源。
另外，**项目模板将http请求统一放置到`api`目录中，**
```js
// api/examples/vuexUsage.js
import axios from 'axios'
const HTTP = axios

export default {
  setNickname (name) {
    return HTTP.post('/setNickname', {name: name})
  }
}
```
**然后在业务中调用http请求对应的封装方法，这样既可以减少业务中http请求的代码量，又能够实现http请求的复用。**

#### vue-router使用
路由跳转几乎多有的项目都会用到。这里提供了一个浏览商城的例子，介绍路由设置、跳转、鉴权、状态保存。这里着重说明一下鉴权。  
不用的角色访问不同页面，会产生不同的效果。比如普通用户访问后台管理页面会被拒绝，提示无权进入该页面；
![无权](https://raw.githubusercontent.com/feiniao111/gallery/master/accessDeny.png)  
游客访问个人主页，会被提示需要登录，并自动跳转到登录页面。  
![未登录](https://raw.githubusercontent.com/feiniao111/gallery/master/unlogin.png)    
这里鉴权的方法，是在路由对象的meta字段中设置`requiresAuth`和`role`属性，前者表示访问页面需要授权（即登录），后者表示允许访问的角色。然后，利用vue-router的全局前置守卫拦截路由，进行权限验证和控制。
```js
// src/router/index.js
/**
 * 利用全局前置守卫，配合元信息实现路由拦截
 *  https://router.vuejs.org/zh/guide/advanced/meta.html
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let role = window.myGlobalClosure.getRole()
    if (!role) {
      alert(t('page.examples.accessDeny'))
      next(to.fullPath.includes('/router') ? {
        name: 'routerUsageLogin'
      } : {
        name: 'vuexUsageLogin'
      }) // 一般情况下是跳转到登录页面
    } else if (to.meta.role && to.meta.role !== role) {
      alert(t('page.examples.accessNotAuthor'))
      next(false)
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

#### vuex状态管理
vuex是官方推荐的用来做状态管理的一款插件，适合于大中型项目。对于小型项目vue官网给出了一个[简单状态管理方式](https://cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8)(之前的文档应该是介绍公共总线，现更换成store模式)。  
对于是采用vuex还是简单状态管理方式，个人的看法是统一使用其中一种，即要么都采用vuex，要么都采用简单状态管理方式，这样项目整体一致，更容易维护。  
本项目模板采用vuex作为全局的状态管理方案。相比于上面介绍的全局闭包，设置vuex变量有这么几个特征：
- 变量
- 多处业务使用到（比如用户登录信息、购物车商品信息，没必要每个使用到的页面都去服务器请求一次）
- 响应式数据（比如在支持多语言的网站，存放当前语言变量，当变量改变，自动触发视图重新渲染）
- 两个子路由组件间数据通信（如果数据量不大，可以用$route.query传递）

vuex的用法例子和vue-router很像,只是多了用户欢迎提示。  
![vuex用法](https://raw.githubusercontent.com/feiniao111/gallery/master/vuexUsage.png)  
这里将用户名称保存为vuex变量，并绑定到多个页面中。**值得说明的是，如果vuex变量的更新需要发送http请求，建议通过Action的dispatch方法，因为dispatch允许异步操作，而Mutation的commit方法只能同步执行**。
```js
// src/store/modules/pageDemo1/pageDemo1.js
import * as types from '../../mutation-types'
import api from '../../../api/examples/vuexUsage'
import {t} from '../../../lib/locale/index'
const state = {
  username: ''
}

const getters = {
  getUsername: state => state.username
}

const actions = {
  editNickname ({
    commit,
    getters
  }, param) {
    return new Promise((resolve, reject) => {
      api.setNickname(param.name).then(ret => {
        if (ret.data.status === 'success') {
          alert(t('page.pageDemo1.setSucc'))
          commit(types.COMMON_SET_USERNAME, param.name)
          resolve()
        } else {
          alert(t('page.pageDemo1.setFail'))
          reject(new Error(t('page.pageDemo1.setFail')))
        }
      }).catch(err => {
        alert(t('page.pageDemo1.reqUnormal'))
        console.log(err)
        reject(new Error(t('page.pageDemo1.reqUnormal')))
      })
    })
  }
}

const mutations = {
  [types.COMMON_SET_USERNAME] (state, name) {
    state.username = name
  }
}

// src/api/examples/vuexUsage
import axios from 'axios'
const HTTP = axios

export default {
  setNickname (name) {
    // 这里的返回是个Promise对象
    return HTTP.post('/setNickname', {name: name})
  }
}

// 调用
// src/examples/vuexUsage/vChild3.vue
...
methods: {
  handleRename() {
      this.$store.dispatch('editNickname', {name: this.newname}).then(() => {}).catch(() => {});
  }
}
```

#### 国际化
国际化是该项目模板的一大特色，它允许网页按不同的语言进行展示。  
![中文](https://raw.githubusercontent.com/feiniao111/gallery/master/chnTpl.png)  
![英文](https://raw.githubusercontent.com/feiniao111/gallery/master/enTpl.png)  
国际化的处理思路是：**一套html模板，多套语言文件。** 以字段`$t('字段在语言文件中的路径')`（比如`$t('comp.Input.chose')`）替代具体文字(如`选择文件`)。系统会根据当前语言，将字段转化为实际内容。
```html
// src/pages/pageDemo1/page.vue
<template>
  <article class="usage-demo">
    <header>
      <h1>{{ msg }}</h1>
      <h2>Usage</h2>
    </header>
    <section>
      <ul>
        <li>
          <!-- {{$t('page.pageDemo1.httpReq')}} 中文对应 http请求， 英文对应 Http request -->
          <a @click="routeTo('httpUsage')">{{$t('page.pageDemo1.httpReq')}}</a>
        </li>
        <li>
          <!-- {{$t('page.pageDemo1.routers')}} 中文对应 router路由， 英文对应 Router usage -->
          <a @click="routeTo('routerUsageLogin')">{{$t('page.pageDemo1.routers')}}</a>
        </li>
        <li>
          <!-- {{$t('page.pageDemo1.vuexManage')}} 中文对应 vuex状态管理， 英文对应 Vuex management -->
          <a @click="routeTo('vuexUsageLogin')">{{$t('page.pageDemo1.vuexManage')}}</a>
        </li>
        <li>
          <!-- {{$t('page.pageDemo1.internation')}} 中文对应 国际化， 英文对应 internation -->
          <a @click="routeTo('internUsage')">{{$t('page.pageDemo1.internation')}}</a>
        </li>
      </ul>
    </section>
  </article>
</template>
```

我们采用[vue-i18n](http://kazupon.github.io/vue-i18n)插件来实现字段转换。
```js
// main.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
// 引入语言文件
import LangEN from './lib/locale/lang/en'
import LangCN from './lib/locale/lang/zh-CN'
Vue.use(VueI18n)

//将语言文件添加到插件实例中
const i18n = new VueI18n({
  locale: 'chn', // 默认中文
  messages: {
    en: LangEN,
    chn: LangCN
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n, // 将插件绑定到实例
  components: { App },
  template: '<App/>'
})
```

当语言发生改变时，执行下面命令，系统就会自动的将内容转换为该语言下的翻译。
```js
this.$i18n.locale = lang
```
由于不同语言，字段翻译长度不一样，因而每个页面都需要检查样式是否正常，但是在每个页面甚至局部组件中都暴露语言切换代码（如增加一个切换语言的button），是一件重复且繁琐的事情。因此，我们将语言切换代码直接暴露给全局变量window，从而在Console中输入命令即可实现语言切换。具体的，将语言切换逻辑封装在vuex中，把vue实例赋值给全局闭包`window.myGlobalClosure`中的私有变量，通过set方法来执行语言切换。
```js
// src/store/modules/common.js
import * as types from '../../mutation-types'
import {
  use
} from '../../../lib/locale/index'

const state = {
  i18nLanguage: 'chn'  // 系统当前语言是所有页面通用的,可作为CSS类名来调整样式
}

const getters = {
  i18nLanguage: state => state.i18nLanguage
}

const actions = {
}

const mutations = {
  [types.COMMON_SET_I18N_LANGUAGE] (state, obj) {
    let instance = obj.vue
    let lang = obj.lang
    if (!instance || !lang) {
      alert('请传入正确的vue实例和语言:en | chn | turkey')
    }
    state.i18nLanguage = lang
    instance.$i18n.locale = lang
    // 更新独立t函数的语言环境(独立t函数见下面说明)
    use(instance.$i18n.messages[lang])
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

// vueWebTpl\src\store\mutation-types.js
/**
 * common
 */
// 国际化语言
export const COMMON_SET_I18N_LANGUAGE = 'common/SET_I18N_LANGUAGE'


// App.vue
export default {
  ...
  mounted() {
    // 将实例绑定到全局闭包中
    myGlobalClosure.setVueInst(this);
  }
}

// static/global.js
window.myGlobalClosure = (function () {
  var __object = {
    vueInst: undefined, // vue示例
    i18nLanguage: 'chn'
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
    }
  }
})()
```
现在，在Console中输入
```js 
window.myGlobalClosure.setLang('en')
```
即可快速切换地将项目语言切换到英语。

**值得说明的是，如果项目包含了非.vue的js或者jq插件，vue-i18n插件是无法直接切换这些文件的文本字段，因此需要进一步把vue-i18n的翻译函数$t暴露出来。** 这里暴露出来的独立t函数，参考了[Element-UI](https://element.eleme.io/#/zh-CN)的实现，具体见[独立t函数](https://github.com/feiniao111/vueWebTpl/blob/master/src/lib/locale/index.js)   
关于国际化处理方案的更多内容，请参考作者的另一篇文档： 
[vue框架下的国际化](https://feiniao111.github.io/2019/02/04/vue/vue%E6%A1%86%E6%9E%B6%E4%B8%8B%E7%9A%84%E5%9B%BD%E9%99%85%E5%8C%96-md/)

### 生产环境去除demo路由 & demo路由懒加载
大家在使用项目模板开发项目时，都不可避免的要对其内容进行修改或删除，因为模板提供的demo只是为了供开发人员在开发时参考，上线时这一部分应该去除，否则占据资源和带宽。  
考虑到这一点，本项目模板自动提供了生产环境去除demo路由功能，即执行
```
npm run build
```
时，不会加载demo页面。另外，demo的路由是懒加载的，因此也不会下载demo组件到浏览器中。因此demo目录可以一直保存在项目中，即使项目维护人员更迭，新人也能看到并参考。
1. 通过HtmlWebpackPlugin插件注入环境变量
```js
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
```js
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
```js
// src/router/index.js
import page1Router from './pageDemo1.router'
import InputMock from '@/components/InputMock'

Vue.use(Router)
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
```js
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
为了加快开发和部署，我们提供了一些小工具。 

#### 自动提交编译webapp到svn脚本
[auto-commit.sh](https://github.com/feiniao111/vueWebTpl/blob/master/auto-commit.sh)  
关于脚本的具体说明，请参考作者的另一篇文档：
[自动提交webapp](https://feiniao111.github.io/2019/02/02/vue/%E8%87%AA%E5%8A%A8%E6%8F%90%E4%BA%A4webapp-md/)

#### 自动导入导出语言包
在开发多语言版本时，文本翻译有时候是挺费时且容易出错的事情。为此，我们的项目模板提供了自动导入导出语言包工具。
![导入导出](https://raw.githubusercontent.com/feiniao111/gallery/master/transfer.png)
关于工具的具体说明，请参考作者的另一篇文档： 
[自动导入导出语言包](https://feiniao111.github.io/2019/04/23/vue/%E8%87%AA%E5%8A%A8%E5%AF%BC%E5%85%A5%E5%AF%BC%E5%87%BA%E8%AF%AD%E8%A8%80%E5%8C%85/)



## todo list
- 通用组件库划分
- webpack4特性引入
- 图片处理
- 组件和样式分离
- BEM语法
- 第三方js、jq插件的国际化
- mock处理规范化

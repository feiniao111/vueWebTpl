/**
 * 以闭包的方式，存放全局变量，防止污染。
 *  这里存放的数据，一般是以下情形之一:
 *    —— 全局使用到的常量（不修改，没必要放入vuex中；如果仅某个.vue文件使用的常量，写在该文件中）
 *    —— 变量用于vuex无法覆盖到的地方（非.vue的js、jq插件，和cef的C++端交互等）
 *  仅允许使用get和set方法访问数据！
 */

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

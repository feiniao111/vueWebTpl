// 以闭包的方式，存放全局变量，防止污染
window.myGlobalClosure = (function () {
  var __object = {
    vueInst: undefined, // vue示例
    i18nLanguage: 'chn',
    token: undefined,
    tokenAttr: 'requesttoken', // token字段
    tokenExpireCode: 10010, // token过期状态码, 根据服务端设置
    tokenInvalidCode: 10011, // token无效状态码，根据服务端设置
    httpTimeout: 5000 // 请求超时时间，5秒
  }
  return {
    // 设置vue实例
    setVueInst: function (instance) {
      __object.vueInst = instance;
    },
    getVueInst: function () {
      return __object.vueInst;
    },
    // 设置国际化语言
    setLang: function (lang) {
      if (__object.vueInst) {
        __object.vueInst.$store.commit("common/SET_I18N_LANGUAGE", {
          vue: __object.vueInst,
          lang: lang
        });
      }
      __object.i18nLanguage = lang;
    },
    getLang: function () {
      return __object.i18nLanguage;
    },
    setToken: function (token) {
      __object.token = token;
    },
    getToken: function () {
      return __object.token;
    },
    getTokenAttr: function () {
      return __object.tokenAttr;
    },
    getTimeout: function () {
      return __object.httpTimeout;
    },
    getTokenExpireCode: function () {
      return __object.tokenExpireCode;
    },
    getTokenInvalidCode: function () {
      return __object.tokenInvalidCode;
    }
  }
})();

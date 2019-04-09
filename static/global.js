// 以闭包的方式，存放全局变量，防止污染
window.myGlobalClosure = (function () {
  var object = {
    __vueInst: undefined, // vue示例
    __i18nLanguage: 'chn',
    __token: undefined,
    __tokenAttr: 'requesttoken', // token字段
    __tokenExpireCode: 10010, // token过期状态码, 根据服务端设置
    __tokenInvalidCode: 10011, // token无效状态码，根据服务端设置
    __httpTimeout: 30000, // 请求超时时间，30秒
  }
  return {
    // 设置vue实例
    setVueInst: function (instance) {
      object.__vueInst = instance;
    },
    getVueInst: function () {
      return object.__vueInst;
    },
    // 设置国际化语言
    setLang: function (lang) {
      if (object.__vueInst) {
        object.__vueInst.$store.commit("common/SET_I18N_LANGUAGE", {
          vue: object.__vueInst,
          lang: lang
        });
      }
      object.__i18nLanguage = lang;
    },
    getLang: function () {
      return object.__i18nLanguage;
    },
    setToken: function (token) {
      object.__token = token;
    },
    getToken: function () {
      return object.__token;
    },
    getTokenAttr: function () {
      return object.__tokenAttr;
    },
    getTimeout: function () {
      return object.__httpTimeout;
    },
    getTokenExpireCode: function() {
        return object.__tokenExpireCode;
    },
    getTokenInvalidCode: function() {
        return object.__tokenInvalidCode;
    }
  }
})();

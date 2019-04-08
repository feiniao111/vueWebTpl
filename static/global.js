// 以闭包的方式，存放全局变量，防止污染
window.myGlobalClosure = (function () {
    var __i18nLanguage = 'chn';
    var __vueInst = undefined; // vue示例
    return {
        // 设置vue实例
        setVueInst: function (instance) {
            __vueInst = instance;
        },
        getVueInst: function () {
            return __vueInst;
        },
        // 设置国际化语言
        setLang: function (lang) {
            if (__vueInst) {
                __vueInst.$store.commit("common/SET_I18N_LANGUAGE", {
                    vue: __vueInst,
                    lang: lang
                });
            }
            __i18nLanguage = lang;
        },
        getLang: function() {
            return __i18nLanguage;
        }
    }
})();
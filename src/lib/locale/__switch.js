/**
 *  内部使用，用于快速切换语言，上线前请注释掉
 */

window.__vueInst = null;
// let __test = false; //真实线上环境为 false
let __test = true;  //内部测试
window.lang = function (lang) {
  //   return; // 真实环境请取消注释该行  
  if(__test != true) {
    return;
  }
  if (!__vueInst) {
    return;
  }
  if (["chn", "en"].indexOf(lang) < 0) {
    return;
  }
  __vueInst.$store.commit("common/SET_I18N_LANGUAGE", {
    vue: __vueInst,
    lang: lang
  });
};

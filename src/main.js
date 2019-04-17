

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from './store/index'
import App from './App'
import router from './router'
import LangEN from './lib/locale/lang/en'
import LangCN from './lib/locale/lang/zh-CN'
import axios from 'axios'
Vue.prototype.$http = axios // 绑定到原型
Vue.config.productionTip = false
Vue.use(VueI18n)

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
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})

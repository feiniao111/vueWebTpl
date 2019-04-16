import * as types from '../../mutation-types'
import {
  use
} from '../../../lib/locale/index'

const state = {
  i18nLanguage: 'chn',
  
}

const getters = {
  i18nLanguage: state => state.i18nLanguage
}

const actions = {
}

const mutations = {
  [types.COMMON_SET_I18N_LANGUAGE](state, obj) {
    let instance = obj.vue
    let lang = obj.lang
    if (!instance || !lang) {
      alert('请传入正确的vue实例和语言:en | chn | turkey')
    }
    state.i18nLanguage = lang
    instance.$i18n.locale = lang
    // 更新独立t函数的语言环境
    use(instance.$i18n.messages[lang])
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

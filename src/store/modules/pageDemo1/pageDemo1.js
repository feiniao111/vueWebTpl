/**
 * demo vuex文件
 */
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

export default {
  state,
  getters,
  actions,
  mutations
}

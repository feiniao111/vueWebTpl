/**
 * demo vuex文件
 */
import * as types from '../../mutation-types'
import api from '../../../api/examples/vuexUsage'
const state = {
  username: ''
};

const getters = {
  getUsername: state => state.username
};

const actions = {
  editNickname({
    commit,
    getters
  }, param) {
    return new Promise((resolve, reject) => {
      api.setNickname(param.name).then(ret => {
        if (ret.data.status == 'success') {
          alert('设置成功');
          commit(types.COMMON_SET_USERNAME, param.name)
          resolve();
        } else {
          alert('设置失败');
          reject();
        }
      }).catch(err => {
        alert('请求响应异常');
        console.log(err);
        reject();
      })
    })
  }
};

const mutations = {
  [types.COMMON_SET_USERNAME](state, name) {
    state.username = name;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}

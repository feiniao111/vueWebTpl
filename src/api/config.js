// 进一步封装http请求，对异常进行统一处理
import axios from 'axios'
import {
  t
} from '../lib/locale'

export default {
  // 覆写库的超时默认值
  handleGlobConfig () {
    let timeout = window.myGlobalClosure.getTimeout() || 5000
    axios.defaults.timeout = timeout
  },

  handleInterce () {
    // 请求拦截器，在发送请求前，头部添加token
    axios.interceptors.request.use(config => {
      let token = window.myGlobalClosure.getToken() // 也可以用其他的方式存储,比如localStorage
      let attr = window.myGlobalClosure.getTokenAttr()
      if (token) {
        config.headers.common[attr] = token
      }

      return config
    })

    // 响应拦截器
    axios.interceptors.response.use(
      res => {
        // 在接收请求前，校验token
        let expireCode = window.myGlobalClosure.getTokenExpireCode() // token过期码
        let invalidCode = window.myGlobalClosure.getTokenInvalidCode() // token无效码
        if (res.data.code === expireCode || res.data.code === invalidCode) {
          // code字段由服务端返回
          window.myGlobalClosure.setToken(undefined)
          // 跳转到登录页面
          // 。。。

          // 如果过期不跳转而是重新请求token，可以参考这篇文章
          // https://segmentfault.com/a/1190000016946316?utm_source=tag-newest
        } else if (res.data.token) {
          // 提示token需要更新
          window.myGlobalClosure.setToken(res.data.token)
        }
        return res
      },
      err => {
        // 处理断网、超时、服务器错误等异常
        if (err) {
          if (
            err.code == 'ECONNABORTED' &&
            err.message.indexOf('timeout') != -1
          ) {
            // 超时
            // 更多超时处理可以查看这篇文章
            // https://juejin.im/post/5abe0f94518825558a06bcd9
            alert(t('page.examples.reqTimeout'))
            return Promise.reject(err)
          } else if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            switch (err.response.status) {
              case 404:
                // 资源不存在
                alert(t('page.examples.sourceNoExist'))
                break
              default:
                err.data && console.log(err.data.message)
            }
            return Promise.reject(err)
          } else if (err.request) {
            // The request was made but no response was received
            // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(err.request)
            return Promise.reject(err)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message)
          }
        } else {
          // 处理断网的情况
          alert(t('page.examples.offline'))
          return Promise.reject(err)
        }
      }
    )
  }
}

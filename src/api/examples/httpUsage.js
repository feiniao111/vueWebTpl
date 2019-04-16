import axios from 'axios'
const HTTP = axios

export default {
  getGithub() {
    return HTTP.get('https://api.github.com/')
  },
  getPaginationData() {
    return HTTP.post('/postReq1', {
      key1: 'value1',
      key2: 'value2'
    })
  },
  getLoginInfo() {
    return HTTP.get('/loginInfo')
  },
  login() {
    return HTTP.post('/login', {
      user: 'xiaoming',
      password: '123456'
    })
  },
  getUserAccount() {
    return HTTP.get('/user/12345');
  },
  getUserPermissions() {
    return HTTP.get('/user/12345/permissions');
  },
  getBaidu() {
    return HTTP.get('http://www.baidu.com');
  },
  getPrice(product) {
    return HTTP.get('/price?product=' + product);
  },
  getNum(product) {
    return HTTP.get('/num?product=' + product);
  },
  getRate(product) {
    return Promise.resolve(1.1);
  }
}

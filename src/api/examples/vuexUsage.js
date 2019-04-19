import axios from 'axios'
const HTTP = axios

export default {
  setNickname (name) {
    return HTTP.post('/setNickname', {name: name})
  }
}

/**
 * demo api请求Mock
 */
var Mock = require('mockjs')

Mock.mock('/setNickname', 'post', {
  'status': 'success'
})

/** 
 * 开发环境，伪造服务端, 对接 devServer.before
 * 
 */ 
module.exports = function (app, server) {
  app.post('/postReq1', function (req, res) {
    res.json({
      'data': {
        'cur_page': '这是真实的数据'
      }
    })
  })
  app.post('/login', function (req, res) {
    res.json({
      status: 'success'
    })
  })
  app.get('/loginInfo', function (req, res) {
    res.json({
      uid: 'Tony',
      age: 35
    })
  })
  app.get('/user/12345', function (req, res) {
    res.json({
      actionList: ['permissions', 'ranges', 'role']
    })
  })
  app.get('/user/12345/permissions', function (req, res) {
    res.json({
      action: 'permission'
    })
  })
  app.get('/price', function (req, res) {
    res.json({
      price: 10
    })
  })
  app.get('/num', function (req, res) {
    res.json({
      num: 15
    })
  })
}

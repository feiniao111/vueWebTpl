export default {
  comp: { // 块级组件
    Input: {
      chose: '选择文件',
      unchosen: '未选择任何文件'
    },
    button: {
      login: '登录',
      logout: '退出',
    }
  },
  page: { // 页面级组件
    examples: {
      backendPage: '这里是后台管理页面',
      backendPage2: '这里是后台管理页面, 欢迎您，{username}',
      backend: '后台管理',
      shopMallPage: '这里是商城',
      shopMallPage2: '这里是商城, 欢迎您，{username}',
      shopMall: '商城',
      homePage: '这里是个人主页',
      homePage2: '这里是个人主页, 欢迎您，{username}',
      home: '个人主页',
      choseTitle: '请选择一个身份',
      placeholder: '页面内切换，输入不丢失',
      admin: '管理员',
      ordin: '普通用户',
      vistor: '游客',
      subpage: '子页面',
      enterPage: '请选择进入页面',
      reqCall: '请求调用',
      getReq: 'get请求',
      postReq: 'post请求',
      req1by1: '请求成功才执行下一个请求',
      reqAllby1: '多请求并发执行,都成功后执行下一个请求',
      req1by1f: '多请求并发执行,任一失败执行下一个请求',
      reqSeq: '多请求顺序执行',
      reqConf: '请求配置',
      globalTimeout: '全局配置超时时间',
      reqInteceptor: '请求拦截器(设置token和处理token过期、超时、断网等)',
      goodPrice: '{product}的价格是: {price}',
      goodNum: '{product}的数量是: {num}',
      goodRate: '{product}的利率是: {rate}',
      totalPrice: '总价是{price}',
      timeoutSet: '请求超时时间设置为{second}秒',
      reqTimeout: '请求超时',
      sourceNoExist: '请求资源不存在',
      offline: '当前发生了断网',
      setInteceptor: '已配置拦截器',
      accessDeny: '您还未登录，无法访问',
      accessNotAuthor: '您无权进入该页面',
    },
    pageDemo1: {
      en: '英语',
      chn: '中文',
      httpReq: 'http请求',
      routers: 'router路由',
      vuexManage: 'vuex状态管理',
      internation: '国际化'
    }
  }
}

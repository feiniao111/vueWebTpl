export default {
  comp: { // block-level component
    Input: {
      chose: 'Select File',
      unchosen: 'No file is selected.'
    },
    button: {
      login: 'login',
      logout: 'logout',
      confirm: 'confirm'
    }
  },
  page: { // page-level component
    examples: {
      backendPage: 'Here is the background management page.',
      backendPage2: '{username}, welcome to background management page.',
      backend: 'Backstage management',
      shopMallPage: 'Here is the mall.',
      shopMallPage2: '{username}, welcome to the mall.',
      shopMall: 'mall',
      homePage: 'Here is the personal homepage.',
      homePage2: '{username}, welcome to the personal homepage',
      home: 'Personal homepage',
      choseTitle: 'Please choose an identity',
      placeholder: 'Switch within page, input is not lost.',
      admin: 'Administrator',
      ordin: 'Ordinary user',
      vistor: 'Visitor',
      subpage: 'Subpage',
      enterPage: 'Please select the entry page.',
      reqCall: 'Request call.',
      getReq: 'Get request',
      postReq: 'Post request',
      req1by1: 'The request is successful before executing the next request.',
      reqAllby1: 'Multiple requests for concurrent execution, all succeed after executing the next request.',
      req1by1f: 'Multiple requests for concurrent execution, either failed to execute the next request.',
      reqSeq: 'Multiple request sequence execution.',
      reqConf: 'Request configuration',
      globalTimeout: 'Global configuration timeout.',
      reqInteceptor: 'Request interceptor (set token and handle token expiration, timeout, network disconnection, etc.)',
      goodPrice: 'The price of {product} is: {price}.',
      goodNum: 'The number of {product} is: {num}.',
      goodRate: 'The interest rate for {product} is: {rate}.',
      totalPrice: 'The total price is {price}.',
      timeoutSet: 'Request timeout is set to {second} seconds.',
      reqTimeout: 'Request timed out.',
      sourceNoExist: 'Request resource does not exist.',
      setSucc: 'Set succeed.',
      offline: 'The current network has broken.',
      setInteceptor: 'Interceptor configured.',
      accessDeny: 'You are not logged in and cannot access.',
      accessNotAuthor: 'You are not authorized to access this page.',
      internationDoc: 'Internationalization under the vue framework',
      onekeyExportChn: 'One-click export of Chinese language pack (Excel)',
      onekeyExportBoth: 'One-click export of Chinese and English language packs (Excel)',
      genLangFile: 'Generate language files based on language packs',
      uploadiFirst: 'Please upload an excel language pack first.'
    },
    pageDemo1: {
      en: 'English',
      chn: 'Chinese',
      httpReq: 'Http request',
      routers: 'Router usage',
      vuexManage: 'Vuex management',
      internation: 'internation'
    }
  }
}

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import InputMock from '@/components/InputMock'
import httpUsage from '@/examples/httpUsage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/inputMock',
      name: 'inputMock',
      component: InputMock
    },
    {
      path: '/examples/http',
      name: 'httpUsage',
      component: httpUsage
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import exampleRouter from './example.router'
import page1Router from './pageDemo1.router'
import InputMock from '@/components/InputMock'

Vue.use(Router)

const routes = [
  ...exampleRouter,
  ...page1Router
]

export default new Router({
  routes: [
    {
      path: '/inputMock',
      name: 'inputMock',
      component: InputMock
    }
  ].concat(routes)
})

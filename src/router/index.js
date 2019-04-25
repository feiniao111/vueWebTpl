import Vue from 'vue'
import Router from 'vue-router'
import page1Router from './pageDemo1.router'
import InputMock from '@/components/InputMock'
import {t} from '../lib/locale/index'

Vue.use(Router)
// production
let env = window.myGlobalClosure.getEnv()
const routes = env !== 'production' ? [
  {
    path: '/inputMock',
    name: 'inputMock',
    component: InputMock
  },
  ...page1Router
] : []

const router = new Router({
  mode: 'hash', // history的url更友好，但服务端需要相应设置
  routes: routes,
  scrollBehavior (to, from, savedPosition) { // 路由切换时，滚动条回到顶部
    return {
      x: 0,
      y: 0
    }
  }
})

/**
 * 利用全局前置守卫，配合元信息实现路由拦截
 *  https://router.vuejs.org/zh/guide/advanced/meta.html
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let role = window.myGlobalClosure.getRole()
    if (!role) {
      alert(t('page.examples.accessDeny'))
      next(to.fullPath.includes('/router') ? {
        name: 'routerUsageLogin'
      } : {
        name: 'vuexUsageLogin'
      }) // 一般情况下是跳转到登录页面
    } else if (to.meta.role && to.meta.role !== role) {
      alert(t('page.examples.accessNotAuthor'))
      next(false)
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router

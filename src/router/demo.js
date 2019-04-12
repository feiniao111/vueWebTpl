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

const router = new Router({
  mode: 'hash', // history的url更友好，但服务端需要相应设置
  routes: [{
    path: '/inputMock',
    name: 'inputMock',
    component: InputMock
  }].concat(routes),
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
    let role = window.myGlobalClosure.getRole();
    if (!role) {
      alert('您还未登录')
      next(false) // 一般情况下是跳转到登录页面
    } else if (to.meta.role && to.meta.role !== role) {
      alert('您无权进入该页面')
      next(false)
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router

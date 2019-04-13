import httpUsage from '../examples/httpUsage.vue'
import login from '../examples/routerUsage/login.vue'
import shopmall from '../examples/routerUsage/shopMall.vue'
import backend from '../examples/routerUsage/child1.vue'
import shop from '../examples/routerUsage/child2.vue'
import homapage from '../examples/routerUsage/child3.vue'

import vLogin from '../examples/vuexUsage/vLogin.vue'
import vShopmall from '../examples/vuexUsage/vShopMall.vue'
import vBackend from '../examples/vuexUsage/vChild1.vue'
import vShop from '../examples/vuexUsage/vChild2.vue'
import vHomapage from '../examples/vuexUsage/vChild3.vue'

export default [{
  path: '/examples',
  component: {
    template: '<article><router-view></router-view></article>'
  },
  children: [
    {
      path: 'http',
      name: 'httpUsage',
      component: httpUsage
    },
    {
      path: 'login',
      name: 'routerUsageLogin',
      component: login,
    },
    {
      path: 'router',
      name: 'routerUsage',
      component: shopmall,
      children: [
        {
          path: 'backend',
          name: 'backend',
          component: backend,
          meta: { requiresAuth: true, role: 'admin' }
        },
        {
          path: 'shop',
          name: 'shop',
          component: shop
        },
        {
          path: 'homepage',
          name: 'homepage',
          component: homapage,
          meta: { keepAlive: true, requiresAuth: true } // keepAlive 用来状态保存， requiresAuth 用于鉴权
        }
      ]
    },
    {
      path: 'vlogin',
      name: 'vuexUsageLogin',
      component: vLogin,
    },
    {
      path: 'vuex',
      name: 'vuexUsage',
      component: vShopmall,
      children: [
        {
          path: 'vBackend',
          name: 'vBackend',
          component: vBackend,
          meta: { requiresAuth: true, role: 'admin' }
        },
        {
          path: 'vShop',
          name: 'vShop',
          component: vShop
        },
        {
          path: 'vHomepage',
          name: 'vHomepage',
          component: vHomapage,
          meta: { keepAlive: true, requiresAuth: true } // keepAlive 用来状态保存， requiresAuth 用于鉴权
        }
      ]
    }]
}]

// 懒加载路由，不影响实际加载性能
// https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97
const httpUsage = () => import('../examples/httpUsage.vue')
const login = () => import('../examples/routerUsage/login.vue')
const shopmall = () => import('../examples/routerUsage/shopMall.vue')
const backend = () => import('../examples/routerUsage/child1.vue')
const shop = () => import('../examples/routerUsage/child2.vue')
const homapage = () => import('../examples/routerUsage/child3.vue')

const vLogin = () => import('../examples/vuexUsage/vLogin.vue')
const vShopmall = () => import('../examples/vuexUsage/vShopMall.vue')
const vBackend = () => import('../examples/vuexUsage/vChild1.vue')
const vShop = () => import('../examples/vuexUsage/vChild2.vue')
const vHomapage = () => import('../examples/vuexUsage/vChild3.vue')

const internUsage = () => import('../examples/internationUsage.vue')

export default [{
  path: '/examples',
  component: {
    template: '<article><router-view></router-view></article>'
  },
  children: [{
    path: 'http',
    name: 'httpUsage',
    component: httpUsage
  },
  {
    path: 'login',
    name: 'routerUsageLogin',
    component: login
  },
  {
    path: 'router',
    name: 'routerUsage',
    component: shopmall,
    children: [{
      path: 'backend',
      name: 'backend',
      component: backend,
      meta: {
        requiresAuth: true,
        role: 'admin'
      }
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
      meta: {
        keepAlive: true,
        requiresAuth: true
      } // keepAlive 用来状态保存， requiresAuth 用于鉴权
    }
    ]
  },
  {
    path: 'vlogin',
    name: 'vuexUsageLogin',
    component: vLogin
  },
  {
    path: 'vuex',
    name: 'vuexUsage',
    component: vShopmall,
    children: [{
      path: 'vBackend',
      name: 'vBackend',
      component: vBackend,
      meta: {
        requiresAuth: true,
        role: 'admin'
      }
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
      meta: {
        keepAlive: true,
        requiresAuth: true
      } // keepAlive 用来状态保存， requiresAuth 用于鉴权
    }
    ]
  },
  {
    path: 'internUsage',
    name: 'internUsage',
    component: internUsage
  }
  ]
}]

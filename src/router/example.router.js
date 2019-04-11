import httpUsage from '../examples/httpUsage.vue'
import routerUsage from '../examples/routerUsage.vue'
import backend from '../pages/pageDemo1/page2.vue'
import shop from '../pages/pageDemo1/page3.vue'
import homapage from '../pages/pageDemo1/page4.vue'

export default [{
  path: '/examples',
  component: {
    template: '<article><router-view></router-view></article>'
  },
  children: [{
    path: 'http',
    name: 'httpUsage',
    component: httpUsage
  }, {
    path: 'router',
    name: 'routerUsage',
    component: routerUsage,
    children: [{
      path: 'backend',
      name: 'backend',
      component: backend,
      meta: {requiresAuth: true, role: 'admin'}
    }, {
      path: 'shop',
      name: 'shop',
      component: shop
    }, {
      path: 'homepage',
      name: 'homepage',
      component: homapage,
      meta: {keepAlive: true, requiresAuth: true}
    }]
  }]
}]

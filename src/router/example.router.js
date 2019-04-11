import httpUsage from '../examples/httpUsage.vue'
import routerUsage from '../examples/routerUsage.vue'

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
    component: routerUsage
  }]
}]

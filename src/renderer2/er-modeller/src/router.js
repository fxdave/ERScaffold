import Vue from 'vue'
import Router from 'vue-router'
import Modeller from './views/Modeller.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ER Modeller',
      component: Modeller
    }
  ]
})

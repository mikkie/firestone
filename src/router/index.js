import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import MainMenu from '@/components/MainMenu'
import ConfigM from '@/components/ConfigM'
import HomeM from '@/components/HomeM'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/menu',
      name: 'MainMenu',
      component: MainMenu
    },
    {
      path: '/configm',
      name: 'ConfigM',
      component: ConfigM
    },
    {
      path: '/homem',
      name: 'HomeM',
      component: HomeM
    }
  ]
})

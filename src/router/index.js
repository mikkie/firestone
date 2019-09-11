import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import MainMenu from '@/components/MainMenu'
import ConfigM from '@/components/ConfigM'
import HomeM from '@/components/HomeM'
import HistoryM from '@/components/HistoryM'
import Basic from '@/components/strategy/Basic'

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
    },
    {
      path: '/historym',
      name: 'HistoryM',
      component: HistoryM
    },
    {
      path: '/strategy/basic',
      name: 'Basic',
      component: Basic
    }
  ]
})

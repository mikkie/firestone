import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import MainMenu from '@/components/MainMenu'
import Home from '@/components/Home'

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
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})

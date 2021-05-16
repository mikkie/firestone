import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import MainMenu from '@/components/MainMenu'
import Config from '@/components/Config'
import ConfigM from '@/components/ConfigM'
import HomeM from '@/components/HomeM'
import Home from '@/components/Home'
import History from '@/components/History'
import HistoryM from '@/components/HistoryM'
import Basic from '@/components/strategy/Basic'
import BasicSell from '@/components/strategy/BasicSell'
import Ydls from '@/components/strategy/Ydls'
import ConceptPick from '@/components/strategy/ConceptPick'
import BatchYdls from '@/components/strategy/BatchYdls'
import PPT0 from '@/components/strategy/PPT0'
import api from '@/api'

Vue.use(Router)

let router = new Router({
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
      path: '/config',
      name: 'Config',
      component: Config
    },
    {
      path: '/configm',
      name: 'ConfigM',
      component: ConfigM
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/homem',
      name: 'HomeM',
      component: HomeM
    },
    {
      path: '/history',
      name: 'History',
      component: History
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
    },
    {
      path: '/strategy/ydls',
      name: 'Ydls',
      component: Ydls
    },
    {
      path: '/strategy/basicsell',
      name: 'BasicSell',
      component: BasicSell
    },
    {
      path: '/strategy/conceptpick',
      name: 'ConceptPick',
      component: ConceptPick
    },
    {
      path: '/strategy/batchydls',
      name: 'BatchYdls',
      component: BatchYdls
    },
    {
      path: '/strategy/ppt0',
      name: 'PPT0',
      component: PPT0
    }
  ]
})

const apiService = api
router.beforeEach((to, from, next) => {
  if(to.path != '/'){
    let accesstoken = window.$cookies.get('accesstoken');
    if(!accesstoken){
       next('/');
       return;
    }
    apiService.get("/users/auth", {accesstoken : accesstoken}).then((res) => {
      if (res._id) {
        next();
      }
      else {
        next('/');
      }
    });
  }
  else{
    next();
  }
});

export default router

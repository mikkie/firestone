import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import MainMenu from '@/components/MainMenu'
import ConfigM from '@/components/ConfigM'
import HomeM from '@/components/HomeM'
import HistoryM from '@/components/HistoryM'
import Basic from '@/components/strategy/Basic'
import BasicSell from '@/components/strategy/BasicSell'
import Ydls from '@/components/strategy/Ydls'
import ConceptPick from '@/components/strategy/ConceptPick'
import BatchYdls from '@/components/strategy/BatchYdls'
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

import Vue from 'vue';
import Router from 'vue-router';
import { getUsername } from '@/utils/auth';

import login from '@/views/login';
import home from '@/views/home';
import classify from '@/views/classify';
import article from '@/views/article';

Vue.use(Router);

let router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      //name: 'home',
      component: home,
      children: [
        { path: '',name: 'classify',component: classify },
        { path: 'article',name: 'article',component: article },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ]
});


router.beforeEach((to,from,next) => {

  if(getUsername()){ //验证是否登录
    next();
  }else{ //未登录
    if(/\/login/.test(to.path)){ //白名单
      next();
    }else{
      next('/login');
    }
  }
});

export default router;

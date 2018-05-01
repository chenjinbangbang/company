// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

//引入vuex
import store from './store';

import axios from 'axios';
Vue.prototype.$http = axios;

//引入font-awesome
import 'font-awesome/css/font-awesome.min.css';

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//全局函数
import base from '@/utils/base';
Vue.use(base);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

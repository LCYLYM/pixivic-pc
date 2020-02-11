/*
 * @Author: Dongzy
 * @since: 2020-01-26 11:47:00
 * @lastTime     : 2020-02-01 21:36:50
 * @LastAuthor   : Dongzy
 * @文件相对于项目的路径: \pixivic-pc\src\main.js
 * @message:
 */
/*
 * @Author: Dongzy
 * @since: 2020-01-24 15:59:31
 * @lastTime     : 2020-01-26 10:20:04
 * @LastAuthor   : Dongzy
 * @文件相对于项目的路径: \pixivic-pc\src\main.js
 * @message:
 */
import Vue from 'vue';
import api from './api';
import App from './App.vue';
import './plugins/element.js';
import router from './router';
import store from './store/';
import './styles/reset.less';
Vue.config.productionTip = false;

Vue.prototype.$api = api;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

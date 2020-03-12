/*
 * @Author: Dongzy
 * @since: 2020-01-26 11:47:00
 * @lastTime: 2020-03-12 21:56:31
 * @LastAuthor: Dongzy
 * @FilePath: \pixiciv-pc\src\main.js
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
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  try {
    if (isChunkLoadFailed) {
      const LoadingChunk = window.sessionStorage.getItem('LoadingChunk');
      if (LoadingChunk) {
        window.sessionStorage.setItem('LoadingChunk', LoadingChunk - 0 + 1);
      } else {
        window.sessionStorage.setItem('LoadingChunk', 1);
      }
      if (LoadingChunk - 0 > 1) {
        // 防止 死循环
        return false;
      }
      router.replace(targetPath);
      window.sessionStorage.setItem('LoadingChunkPath', targetPath);
      const sa = window.sa;
      if (sa && sa.track) {
        sa.track('element_click', {
          page_title: 'LoadingChunk',
          element_type: 'view',
          page_source: targetPath, // 当前路由
          element_name: `刷新页面${LoadingChunk - 0}次` // 尝试 打开次数
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
});
router.onReady(vm => {
  try {
    const LoadingChunkPath = window.sessionStorage.getItem('LoadingChunkPath');
    const path = vm.path;
    if (LoadingChunkPath) {
      if (path !== LoadingChunkPath && path !== '/') {
        window.sessionStorage.setItem('LoadingChunkPath', vm.path);
        router.replace(vm.path);
      } else {
        router.replace(LoadingChunkPath);
      }
    }
  } catch (e) {
    console.log(e);
  }
});
Vue.prototype.$api = api;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

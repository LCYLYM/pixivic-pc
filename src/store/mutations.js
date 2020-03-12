/*
 * @Author: Dongzy
 * @since: 2020-02-02 14:59:46
 * @lastTime: 2020-03-12 21:13:10
 * @LastAuthor: Dongzy
 * @文件相对于项目的路径: \pixiciv-pc\src\store\mutations.js
 * @message:
 */
import * as types from './mutation-types';

const mutations = {
  [types.SET_USER](state, user) {
    if (user) {
      state.user = user;
    } else {
      state.user = {};
    }
  },
  [types.ADD_CACHED_VIEWS](state, view) {
    if (state.cachedViews.includes(view.name)) return;
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name);
    }
  },
  [types.DEL_CACHED_VIEW](state, name) {
    const index = state.cachedViews.indexOf(name);
    if (index > -1) {
      state.cachedViews.splice(index, 1);
    }
  },
  [types.SHOW_TAB](state, flag) {
    state.showTab = flag;
  },
  [types.SET_LIKE_STATUS](state, data) {
    state.likeStatus = data;
  },
  [types.SET_FOLLOW_STATUS](state, data) {
    state.followStatus = data;
  },
  [types.SET_DETAIL](state, data) {
    state.detail = data;
  }
};

export default mutations;

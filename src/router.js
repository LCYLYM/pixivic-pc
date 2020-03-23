/*
 * @Author: Dongzy
 * @since: 2020-01-26 11:47:00
 * @lastTime: 2020-03-23 23:19:04
 * @LastAuthor: Dongzy
 * @FilePath: \pixiciv-pc\src\router.js
 * @message:
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/DailyRank/DailyRank.vue')
  },
  {
    path: '/keywords/:keyword',
    name: 'keywords',
    component: () =>
      import('./views/SearchResult/SearchResult.vue'),
    props: true
  },
  {
    path: '/illusts/:pid',
    name: 'Illusts',
    component: () => import('./views/Detail/Detail.vue'),
    props: true
  },
  {
    path: '/artist/:artistId',
    name: 'Artist',
    component: () => import('./views/Artist/Artist.vue'),
    props: true
  },
  {
    path: '/note',
    name: 'Note',
    component: () => import('./views/Note/Note.vue')
  },
  {
    path: '/donate',
    name: 'Donate',
    component: () => import('./views/Donate/Donate.vue')
  },
  {
    path: '/remark',
    name: 'Remark',
    component: () => import('./views/Remark/Remark.vue')
  },
  {
    path: '/bbs',
    name: 'BBS',
    component: () => import('./views/BBS/BBS.vue')
  },
  {
    path: '/qqauth',
    name: 'QQauth',
    component: () => import('./views/QQauth/QQauth.vue')
  },
  ...require('./views/SpotLight').default, // A 业务路由入口
  ...require('./views/User').default // A 业务路由入口
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;

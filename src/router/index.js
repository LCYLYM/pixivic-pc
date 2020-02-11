/*
 * @Author: Dongzy
 * @since: 2020-01-26 11:47:00
 * @lastTime     : 2020-02-11 20:20:13
 * @LastAuthor   : Dongzy
 * @文件相对于项目的路径: \pixivic-pc\src\router\index.js
 * @message:
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/DailyRank/DailyRank.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/tag/:keyword',
    name: 'tag',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/SearchResult/SearchResult.vue'
      ),
    props: true,
  },
  {
    path: '/detail/:pid',
    name: 'Detail',
    component: () => import('../views/Detail/Detail.vue'),
    props: true,
  },
  {
    path: '/artist/:artistId',
    name: 'Artist',
    component: () => import('../views/Artist/Artist.vue'),
    props: true,
  },
  {
    path: '/note',
    name: 'Note',
    component: () => import('../views/Note/Note.vue'),
  },
  {
    path: '/donate',
    name: 'Donate',
    component: () => import('../views/Donate/Donate.vue'),
  },
  {
    path: '/remark',
    name: 'Remark',
    component: () => import('../views/Remark/Remark.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

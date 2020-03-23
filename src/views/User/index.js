/*
 * @Author: Dongzy
 * @since: 2020-03-23 23:14:54
 * @lastTime: 2020-03-23 23:23:41
 * @LastAuthor: Dongzy
 * @FilePath: \pixiciv-pc\src\views\User\index.js
 * @message:
 */
export default [
  {
    path: '/users/bookmarked',
    name: 'BookMarked',
    component: () =>
      import('./BookMarked/index.vue')
  }
];

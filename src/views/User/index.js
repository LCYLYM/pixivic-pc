/*
 * @Author: gooing
 * @since: 2020-03-23 23:14:54
 * @lastTime: 2020-03-30 21:26:20
 * @LastAuthor: gooing
 * @FilePath: \pixiciv-pc\src\views\User\index.js
 * @message:
 */
import BookMarked from './BookMarked/index.vue';
import Followed from './Followed/index.vue';
import HomePage from './HomePage/index.vue';

export default [
  {
    path: '/users/bookmarked',
    name: 'BookMarked',
    component: BookMarked
  },
  {
    path: '/users/followed',
    name: 'Followed',
    component: HomePage
  },
  {
    path: '/users/HomePage',
    name: 'HomePage',
    component: HomePage
  }
];

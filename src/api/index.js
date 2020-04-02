/*
 * @Author: gooing
 * @since: 2020-02-02 14:59:46
 * @lastTime: 2020-04-02 23:21:58
 * @LastAuthor: gooing
 * @FilePath: \pixiciv-pc\src\api\index.js
 * @message:
 */
import * as rank from './modules/rank';
import * as detail from './modules/detail';
import * as search from './modules/search';
import * as user from './modules/user';
import * as comment from './modules/comment';

const api = {
  rank,
  search,
  detail,
  user,
  comment
};

export default api;

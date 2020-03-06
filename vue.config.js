/*
 * @Author: Dongzy
 * @since: 2020-02-02 14:59:46
 * @lastTime: 2020-03-02 11:33:58
 * @LastAuthor: Dongzy
 * @文件相对于项目的路径: \pixiciv-pc\vue.config.js
 * @message:
 */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

console.log('Url prefix: ', process.env.VUE_APP_PREFIX);

module.exports = {
  lintOnSave: false,
  publicPath: process.env.VUE_APP_PREFIX,
  // publicPath: './',

  // 路径别名
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')); // key,value自行定义，比如.set('@@', resolve('src/components'))
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true
      }
    }
  }
};

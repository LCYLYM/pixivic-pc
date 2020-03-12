/*
 * @Author: Dongzy
 * @since: 2020-02-02 14:59:46
 * @lastTime: 2020-03-12 21:54:49
 * @LastAuthor: Dongzy
 * @FilePath: \pixiciv-pc\vue.config.js
 * @message:
 */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

console.log('Url prefix: ', process.env.VUE_APP_PREFIX);

module.exports = {
  lintOnSave: false,
  publicPath: process.env.VUE_APP_PREFIX || '/',
  // publicPath: './',

  // 路径别名
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')); // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    disableHostCheck: true, //  新增该配置项
    port: 9000
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // https://github.com/vuejs/vue-cli/issues/2359
      }
    }
  }
}
;

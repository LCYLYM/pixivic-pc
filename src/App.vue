<!--
 * @Author: Dongzy
 * @since: 2020-01-26 11:47:00
 * @lastTime: 2020-03-12 21:45:47
 * @LastAuthor: Dongzy
 * @FilePath: \pixiciv-pc\src\App.vue
 * @message:
 -->
<template>
  <div id="app">
    <el-container class="page-container">
      <!-- 左边栏开始 -->
      <el-aside
        style="background-color: rgb(238, 241, 246)"
        width="65px"
      >
        <left-side />
      </el-aside>
      <!-- 左边栏结束 -->
      <el-container>
        <!-- 标题栏开始 -->
        <el-header style="border-bottom: 1px solid #bbb;">
          <header-bar />
        </el-header>
        <!-- 标题栏结束 -->
        <!-- 主要页面开始 -->
        <el-main>
          <router-view :key="Math.random()" />
        </el-main>
        <!-- 主要页面结束 -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    HeaderBar: () => import('./components/PublicComponents/HeaderBar.vue'),
    LeftSide: () => import('./components/PublicComponents/LeftSide.vue')
  },
  data() {
    return {

    };
  }
};
</script>

<style lang="less">
#app {
	.page-container {
		/deep/ .el-main {
			padding: 0px;
		}
	}
}
</style>

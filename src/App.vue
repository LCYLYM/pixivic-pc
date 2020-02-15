<!--
 * @Author: Dongzy
 * @since: 2020-01-26 11:47:00
 * @lastTime     : 2020-02-14 22:16:50
 * @LastAuthor   : Dongzy
 * @文件相对于项目的路径: \pixivic-pc\src\App.vue
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
				<left-side></left-side>
			</el-aside>
			<!-- 左边栏结束 -->
			<el-container>
				<!-- 标题栏开始 -->
				<el-header style="border-bottom: 1px solid #bbb;">
					<header-bar></header-bar>
				</el-header>
				<!-- 标题栏结束 -->
				<!-- 主要页面开始 -->
				<el-main>
					<router-view :key="Math.random()"></router-view>
				</el-main>
				<!-- 主要页面结束 -->
			</el-container>
		</el-container>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {
		HeaderBar: () => import('./components/PublicComponents/HeaderBar.vue'),
		LeftSide: () => import('./components/PublicComponents/LeftSide.vue'),
	},
	data() {
		const item = {
			date: '2016-05-02',
			name: '王小虎',
			address: '上海市普陀区金沙江路 1518 弄',
		};
		return {
			tableData: Array(20).fill(item),
		};
	},
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

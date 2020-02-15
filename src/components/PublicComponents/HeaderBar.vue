<!--
 * @Author: Dongzy
 * @since: 2020-01-24 22:48:37
 * @lastTime     : 2020-02-14 21:12:18
 * @LastAuthor   : Dongzy
 * @文件相对于项目的路径: \pixivic-pc\src\components\PublicComponents\HeaderBar.vue
 * @message: 
 -->
<template>
	<div class="HeaderBar">
		<el-row
			:gutter="20"
			align="middle"
			justify="space-around"
			style="width:100%;"
			type="flex"
		>
			<el-col :span="6">
				<a
					href
					style="margin:10px 40px;;"
				>
					<img
						alt
						src="@/assets/images/icon.svg"
						style="height:70px;"
					/>
				</a>
			</el-col>
			<el-col :span="10">
				<el-autocomplete
					:debounce="300"
					:fetch-suggestions="querySearch"
					:maxlength="30"
					@keyup.enter.native="handleSearch"
					@select="handleSelect"
					class="input-with-select"
					placeholder="请输入内容"
					v-model="params.keyword"
				>
					<el-select
						placeholder="请选择"
						slot="prepend"
						v-model="params.illustType"
					>
						<el-option
							:key="item.value"
							:label="item.name"
							:value="item.value"
							v-for="item of typeList"
						></el-option>
					</el-select>

					<el-button
						@click="handleSearch"
						icon="el-icon-search"
						slot="append"
					></el-button>
				</el-autocomplete>
			</el-col>
			<el-col
				:span="8"
				class="header-info"
			>
				<el-button
					circle
					icon="el-icon-message-solid"
					style="margin-right:20px;"
					type="info"
				></el-button>
				<el-avatar
					:src="squareUrl"
					shape="square"
				></el-avatar>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'HeaderBar',
	data() {
		return {
			timeout: null,
			params: {
				keyword: '',
				illustType: 'illust',
			},
			keywords: [],
			squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
			typeList: [
				{
					name: '插图',
					value: 'illust',
				},
				{
					name: '漫画',
					value: 'manga',
				},
				{
					name: '作者',
					value: 'artist',
				},
			],
		};
	},
	computed: {},
	components: {},
	watch: {
		'params.keyword': {
			handler: 'getKeywords',
		},
	},
	methods: {
		getKeywords() {
			this.$api.search.getKeyword(this.params.keyword).then(({ data: { data } }) => {
				this.keywords = data.keywordList || [];
			});
		},
		querySearch(queryString, cb) {
			const result = this.keywords.map(e => {
				return { value: e };
			});
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				cb(result);
			}, 1000);
		},
		handleSelect(e) {
			this.handleSearch();
		},
		handleSearch() {
			let keyword = this.params.keyword;
			this.$router.push({
				path: `/tag/${keyword}`,
				query: {
					illustType: this.params.illustType,
				},
			});
		},
	},
	mounted() {},
};
</script>

<style scoped lang="less">
.HeaderBar {
	background-color: #fff;
	height: 100%;
	width: 100%;
	display: flex;
	overflow: hidden;
	/deep/.el-select .el-input {
		width: 110px;
	}
	.input-with-select {
		width: 400px;
		background-color: #fff;
	}
	.header-info {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
}
</style>

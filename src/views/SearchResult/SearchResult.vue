<!--
 * @Author: Dongzy
 * @since: 2020-02-11 12:45:23
 * @lastTime: 2020-03-06 20:40:57
 * @LastAuthor: Dongzy
 * @FilePath: \pixiciv-pc\src\views\SearchResult\SearchResult.vue
 * @message:
 -->
<template>
  <div class="search-result">
    <virtual-list
      :identifier="identifier"
      :list="pictureList"
      @infinite="infinite"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  components: {
    VirtualList: () => import('@/components/Virtual-List/VirtualList')
  },
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isSearchByImg: false,
      identifier: +new Date(),
      pictureList: [],
      date: [],
      // 画作类型
      illustType: 'illust',
      // 搜索图片质量
      searchType: 'original',
      minWidth: 0, // 最小宽度
      minHeight: 0, // 最小高度
      beginDate: null, // 画作发布日期限制
      endDate: null, // 画作发布日期限制
      xRestrict: 0,
      maxSanityLevel: 6,
      page: 1
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    optionsParams() {
      const data = {
        illustType: this.$route.query.illustType || this.illustType,
        searchType: this.searchType,
        minWidth: 0,
        minHeight: 0,
        beginDate: this.date[0] || '',
        endDate: this.date[1] || '',
        xRestrict: this.xRestrict, // 0关 1开
        maxSanityLevel: this.maxSanityLevel // 16禁
      };
      Object.keys(data).forEach(item => {
        if (!data[item]) {
          delete data[item];
        }
      });
      return data;
    },
    infinite($state) {
      if (this.isSearchByImg) {
        return $state.complete();
      }
      this.$api.search
        .getSearch({
          ...this.optionsParams,
          page: this.page++,
          keyword: this.keyword
        })
        .then(res => {
          const data = res.data.data;
          if (!data) {
            $state.complete();
          } else {
            this.pictureList = this.pictureList.concat(data);
            $state.loaded();
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style scoped lang="less">
.search-result {
	height: calc(~'100vh - 60px');
	overflow-y: hidden;
	width: calc(~'100%');
	display: flex;
	justify-content: center;
}
</style>

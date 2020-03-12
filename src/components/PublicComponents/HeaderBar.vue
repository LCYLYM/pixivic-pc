<!--
 * @Author: Dongzy
 * @since: 2020-01-24 22:48:37
 * @lastTime: 2020-03-12 23:39:39
 * @LastAuthor: Dongzy
 * @FilePath: \pixiciv-pc\src\components\PublicComponents\HeaderBar.vue
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
        <a href style="margin:10px 40px;;">
          <img alt src="@/assets/images/icon.svg" style="height:70px;">
        </a>
      </el-col>
      <el-col :span="10">
        <el-autocomplete
          v-model="params.keyword"
          :debounce="300"
          :fetch-suggestions="querySearch"
          :maxlength="30"
          class="input-with-select"
          placeholder="搜索作品"
          @keyup.enter.native="handleSearch"
          @select="handleSelect"
        >
          <el-select
            slot="prepend"
            v-model="params.illustType"
          >
            <el-option
              v-for="item of typeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-autocomplete>
      </el-col>
      <el-col :span="8" class="header-info">
        <el-button
          circle
          icon="el-icon-message-solid"
          style="margin-right:20px;"
          type="info"
        />
        <el-avatar :src="squareUrl" shape="square" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  components: {},
  data() {
    return {
      timeout: null,
      params: {
        keyword: '',
        illustType: 'illust'
      },
      keywords: [],
      squareUrl:
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      typeList: [
        {
          name: '插图',
          value: 'illust'
        },
        {
          name: '漫画',
          value: 'manga'
        },
        {
          name: '作者',
          value: 'artist'
        }
      ]
    };
  },
  computed: {},
  watch: {
    'params.keyword': {
      handler: 'getKeywords'
    }
  },
  mounted() {},
  methods: {
    getKeywords() {
      this.$api.search
        .getKeyword(this.params.keyword)
        .then(({ data: { data }}) => {
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
      const keyword = this.params.keyword;
      this.$router.push({
        path: `/tag/${keyword}`,
        query: {
          illustType: this.params.illustType
        }
      });
    }
  }
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
    width: 80px;
  }
  /deep/.input-with-select {
    width: 400px;
    background-color: #fff;
    // .el-input__inner {
    //   background-color: rgba(0, 0, 0, 0.04);
    //   transition: background-color 0.2s, color 0.2s;
    //   transition-property: background-color, color;
    //   transition-duration: 0.2s, 0.2s;
    //   transition-timing-function: ease, ease;
    //   transition-delay: 0s, 0s;
    // }
    // .el-input__inner:hover {
    //   background-color: rgba(0, 0, 0, 0.08);
    // }
  }

  .input-with-select:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
  .header-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>

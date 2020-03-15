<!--
 * @Author: Dongzy
 * @since: 2020-01-24 22:48:37
 * @lastTime: 2020-03-15 23:15:10
 * @LastAuthor: Dongzy
 * @FilePath: \pixiciv-pc\src\components\PublicComponents\HeaderBar.vue
 * @message:
 -->
<template>
  <div class="HeaderBar">
    <el-row
      align="middle"
      justify="space-around"
      style="width:100%;"
      type="flex"
    >
      <el-col>
        <a href>
          <img alt src="@/assets/images/icon.svg">
        </a>
      </el-col>
      <el-col>
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
      <el-col class="header-info">
        <el-badge :value="3">
          <el-button size="small">消息</el-button>
        </el-badge>
        <div style="margin-left:20px;" @click="userOpen">
          <el-popover
            v-model="userToolVisible"
            placement="bottom"
            title="用户中心"
            width="200"
            trigger="manual"
          >
            <div class="user-tools">
              <el-button>个人中心</el-button>
              <el-button>推荐画师</el-button>
              <el-button>我的收藏</el-button>
              <el-button type="warning" @click="logout">退出登录</el-button>
            </div>
            <el-avatar slot="reference" :src="squareUrl" shape="square" /></el-popover>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cookieTool from 'js-cookie';
export default {
  name: 'HeaderBar',
  components: {},
  data() {
    return {
      // 用户中心显示
      userToolVisible: false,
      // 搜索时延
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
    // 退出登录
    logout() {
      cookieTool.remove('jwt');
      localStorage.removeItem('user');
      window.location.href = '/';
    },
    // 获取关键词
    getKeywords() {
      this.$api.search
        .getKeyword(this.params.keyword)
        .then(({ data: { data }}) => {
          this.keywords = data.keywordList || [];
        });
    },
    // 搜索相关信息
    querySearch(queryString, cb) {
      const result = this.keywords.map(e => {
        return { value: e };
      });
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(result);
      }, 1000);
    },
    // 选择
    handleSelect(e) {
      this.handleSearch();
    },
    // 搜索跳转
    handleSearch() {
      const keyword = this.params.keyword;
      this.$router.push({
        path: `/tag/${keyword}`,
        query: {
          illustType: this.params.illustType
        }
      });
    },
    // 打卡用户系统
    userOpen() {
      if (!cookieTool.get('jwt')) {
        this.$store.dispatch('setLoginBoolean');
      } else {
        this.turnUserTab();
      }
    },
    // 用户看板控制
    turnUserTab() {
      this.userToolVisible = !this.userToolVisible;
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
    width: 25vw;
    background-color: #fff;
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
 .user-tools{
    display: flex;
width: 200px;
flex-wrap:wrap;

  }
</style>

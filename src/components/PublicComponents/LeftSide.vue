<!--
 * @Author: gooing
 * @since: 2020-01-24 22:48:57
 * @lastTime: 2020-04-01 23:17:41
 * @LastAuthor: gooing
 * @FilePath: \pixiciv-pc\src\components\PublicComponents\LeftSide.vue
 * @message:
 -->
<template>
  <div class="LeftSide">
    <el-menu
      :collapse="isCollapse"
      :default-active="computerActiveNav"
      class="el-menu-vertical-demo"
      @close="handleClose"
      @select="handleOpen"
    >
      <el-menu-item
        v-for="item of navLsit"
        :key="item.id"
        :index="item.routePath"
      >
        <i :class="[item.icon]" />
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
    <a href="http://www.beian.miit.gov.cn/" target="_blank" style="text-decoration:none;color:#C0C4CC;">
      <div class="beian">桂ICP备17012945号-3</div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'LeftSide',
  components: {},
  data() {
    return {
      isCollapse: true,
      navLsit: [
        {
          id: '0',
          name: '首页',
          icon: 'el-icon-s-home',
          routePath: '/'
        },
        {
          id: '1',
          name: '须知',
          icon: 'el-icon-document',
          routePath: '/note'
        },
        {
          id: '2',
          name: '反馈',
          icon: 'el-icon-chat-round',
          routePath: '/bbs'
        },
        {
          id: '3',
          name: '捐赠',
          icon: 'el-icon-coffee-cup',
          routePath: '/donate'
        },
        {
          id: '4',
          name: '友情链接',
          icon: 'el-icon-link',
          routePath: '/remark'
        }
      ]
    };
  },
  computed: {
    computerActiveNav() {
      let result = '0';
      const index = this.navLsit.indexOf(item => item.routePath === this.$route.path);
      if (index !== -1) {
        result = '' + index;
      }
      return result;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      this.$router.push({ path: key, query: {}});
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="less">
.LeftSide {
  overflow: hidden;
  .beian{
    width: 15px;
    margin: 400px auto 0;
    line-height: 24px;
    font-size: 12px;
    word-wrap: break-word;/*英文的时候需要加上这句，自动换行*/
    word-break:break-all;
  }
}
</style>

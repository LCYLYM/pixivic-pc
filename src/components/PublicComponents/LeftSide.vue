<!--
 * @Author: Dongzy
 * @since: 2020-01-24 22:48:57
 * @lastTime     : 2020-02-11 20:25:46
 * @LastAuthor   : Dongzy
 * @文件相对于项目的路径: \pixivic-pc\src\components\PublicComponents\LeftSide.vue
 * @message: 
 -->
<template>
  <div class="LeftSide">
    <el-menu
      :collapse="isCollapse"
      :default-active="computerActiveNav"
      @close="handleClose"
      @select="handleOpen"
      class="el-menu-vertical-demo"
    >
      <el-menu-item
        :index="item.routePath"
        :key="item.id"
        v-for="item of navLsit"
      >
        <i :class="[item.icon]"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'LeftSide',
  data() {
    return {
      isCollapse: true,
      navLsit: [
        {
          id: '0',
          name: '首页',
          icon: 'el-icon-s-home',
          routePath: '/',
        },
        {
          id: '1',
          name: '须知',
          icon: 'el-icon-document',
          routePath: '/note',
        },
        {
          id: '2',
          name: '论坛',
          icon: 'el-icon-chat-round',
          routePath: '/bbs',
        },
        {
          id: '3',
          name: '捐赠',
          icon: 'el-icon-coffee-cup',
          routePath: '/donate',
        },
        {
          id: '4',
          name: '友情链接',
          icon: 'el-icon-link',
          routePath: '/remark',
        },
      ],
    };
  },
  computed: {
    computerActiveNav() {
      let result = '0';
      let index = this.navLsit.indexOf(item => item.routePath === this.$route.path);
      if (index !== -1) {
        result = '' + index;
      }
      return result;
    },
  },
  components: {},
  watch: {},
  methods: {
    handleOpen(key, keyPath) {
      this.$router.push({ path: key, query: {} });
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.LeftSide {
}
</style>

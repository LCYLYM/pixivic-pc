<!--
 * @Author: gooing
 * @since: 2020-02-11 12:30:17
 * @lastTime: 2020-04-01 00:06:29
 * @LastAuthor: gooing
 * @FilePath: \pixiciv-pc\src\views\Donate\Donate.vue
 * @message:
 -->
<template>
  <div class="Donate">
    <el-card class="donate-card">
      <div slot="header">
        <span>微信</span>
      </div>
      <img
        alt="支付宝"
        src="@/assets/images/alipay.jpg"
      >
    </el-card>
    <el-card class="donate-card">
      <div slot="header">
        <span>支付宝</span>
      </div>
      <img
        alt="微信"
        src="@/assets/images/wechat.jpg"
      >
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Donate',
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.Donate {
    display: flex;
    height: calc(~"100vh - 60px");
    align-items: center;
    .donate-card {
        height: 300px;
        width: 200px;
        margin: 80px auto;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
}
</style>

<!--
 * @Author: Dongzy
 * @since: 2020-02-11 12:30:17
 * @lastTime: 2020-03-11 21:33:40
 * @LastAuthor: Dongzy
 * @FilePath: \pixiciv-pc\src\views\Donate\Donate.vue
 * @message:
 -->
<template>
  <div class="Donate">
    <el-card class="donate-card">
      <h3>支付宝</h3>
      <img
        alt="支付宝"
        src="@/assets/images/alipay.jpg"
      >
    </el-card>
    <el-card class="donate-card">
      <h3>微信</h3>
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
    height: calc(~'100vh - 60wpx');
    width: calc(~'100vw-65px');
    overflow: auto;
    background: #f5f5f5;
    display: flex;
    .donate-card {
        height: 480px;
        width: 400px;
        padding: 0 40px;
        margin: 100px auto;
        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
}
</style>

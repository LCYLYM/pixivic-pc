<!--
 * @Author: Dongzy
 * @since: 2020-03-13 22:45:40
 * @lastTime: 2020-03-15 13:25:06
 * @LastAuthor: Dongzy
 * @FilePath: \pixiciv-pc\src\components\PublicComponents\Login\index.vue
 * @message:
 -->
<template>
  <div class="login">
    <el-dialog
      v-if="$store.getters.loginBoolean"
      :close-on-click-modal="false"
      title="Login"
      :visible="$store.getters.loginBoolean"
      width="30%"
      center
      @close="$store.dispatch('setLoginBoolean')"
    >
      <login-form v-show="loginType" @typeChange="typeChange" />
      <register-form v-show="!loginType" @typeChange="typeChange" />

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {
    LoginForm: () => import('./Login'),
    RegisterForm: () => import('./Register')
  },
  data() {
    return {
      loginType: true

    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    typeChange() {
      this.loginType = !this.loginType;
    }
  }
};
</script>

<style scoped lang="less">

.login{}
</style>


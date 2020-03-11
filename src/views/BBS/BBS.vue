<!--
 * @Author: Dongzy
 * @since: 2020-03-11 00:30:09
 * @lastTime: 2020-03-11 22:37:44
 * @LastAuthor: Dongzy
 * @FilePath: \pixiciv-pc\src\views\BBS\BBS.vue
 * @message:
 -->
<template>
  <div class="bbs">
    <div>
      <a href="https://discuss.pixivic.com/" target="_Blank">
        <el-button round size="small" type="primary">点击跳转</el-button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BBS'
};
</script>

<style scoped lang="less">
.bbs {
  height: calc(~"100vh - 60px");
  width: calc(~"100vw-65px");
  overflow: auto;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

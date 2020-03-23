<!--
 * @Author: Dongzy
 * @since: 2020-03-23 23:15:20
 * @lastTime: 2020-03-24 00:37:48
 * @LastAuthor: Dongzy
 * @FilePath: \pixiciv-pc\src\views\User\BookMarked\index.vue
 * @message:
 -->
<template>
  <div class="bookmarked">
    <div>
      <keep-alive>
        <VirtualList
          :key="requestType"
          :list="requestType==='illust'?pictureList1:pictureList2"
          :identifier="identifier"
          @infinite="infinite"
        >
          <div class="bookmarked-tabs">
            <el-radio-group v-model="requestType">
              <el-radio-button label="illust" name="插画" />
              <el-radio-button label="manga" name="漫画" />
            </el-radio-group>
          </div></VirtualList></keep-alive>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'BookMarked',
  components: { VirtualList: () => import('@/components/Virtual-List/VirtualList') },
  data() {
    return {
      page: 1,
      requestType: 'illust',
      pictureList1: [],
      pictureList2: []
    };
  },
  computed: {
    ...mapGetters(['user', 'followStatus'])
  },
  watch: {},
  mounted() {},
  methods: {
    infinite($state) {
      this.$api.user
        .getCollectList({
          page: this.page++,
          type: this.requestType,
          userId: this.user.id
        })
        .then(res => {
          if (!res.data.data) {
            $state.complete();
          } else {
            if (this.requestType === 'illust') {
              this.pictureList1 = this.pictureList1.concat(res.data.data);
            } else { this.pictureList2 = this.pictureList2.concat(res.data.data); }
            $state.loaded();
          }
        });
    },
    getList(type) {
      this.type = type;
      this.page = 1;
      this.pictureList = [];
      this.identifier += 1;
    }

  }
};
</script>

<style scoped lang="less">

.bookmarked{
  height: calc(~'100vh - 60px');
  overflow: hidden;
  &-tabs{
display: flex;
justify-content: center;
margin: 20px;
  }
}
</style>

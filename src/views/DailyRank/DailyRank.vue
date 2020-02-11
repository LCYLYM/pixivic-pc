<!--
 * @Author: Dongzy
 * @since: 2020-01-28 23:11:51
 * @lastTime     : 2020-02-11 20:04:55
 * @LastAuthor   : Dongzy
 * @文件相对于项目的路径: \pixivic-pc\src\views\DailyRank.vue
 * @message: 
 -->
<template>
  <div class="DailyRank">
    <virtual-list
      :identifier="identifier"
      :list="pictureList"
      @infinite="infinite"
    ></virtual-list>
    <el-popover
      placement="left"
      style="position:fixed;z-index:9999;right:20px;bottom:20px;"
      trigger="hover"
      width="240"
    >
      <template>
        <el-radio
          label="0"
          v-model="modeFather"
        >综合排行</el-radio>
        <el-radio
          label="1"
          v-model="modeFather"
        >漫画排行</el-radio>
      </template>
      <el-radio-group
        @change="resetData"
        size="mini"
        style="padding: 20px 0;"
        v-model="mode"
      >
        <el-radio-button
          :key="radioItem.name"
          :label="radioItem.value"
          v-for="(radioItem) of modeList[modeFather].children"
        >{{radioItem.name}}</el-radio-button>
      </el-radio-group>
      <el-date-picker
        :picker-options="pickerOptions"
        @change="selectDate"
        align="right"
        placeholder="选择日期"
        type="date"
        v-model="value2"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-button
        circle
        icon="el-icon-time"
        slot="reference"
      ></el-button>
    </el-popover>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name: 'DailyRank',
  data() {
    return {
      modeFather: '0',
      modeList: [
        {
          name: '综合排行',
          children: [
            { name: '日', value: 'day' },
            { name: '周', value: 'week' },
            { name: '月', value: 'month' },
            { name: '女性', value: 'day_female' },
            { name: '男性', value: 'day_male' },
          ],
        },
        {
          name: '漫画排行',
          children: [
            { name: '日', value: 'day_manga' },
            { name: '周', value: 'week_manga' },
            { name: '月', value: 'month_manga' },
            { name: '一周新秀', value: 'week_rookie_manga' },
          ],
        },
      ],
      page: 1,
      mode: 'day',
      date: null,
      pictureList: [],
      identifier: +new Date(),
      value2: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  computed: {},
  components: {
    VirtualList: () => import('@/components/Virtual-List/VirtualList'),
  },
  watch: {},
  methods: {
    infinite($state) {
      this.$api.rank
        .getRank({
          page: this.page++,
          date: this.date,
          mode: this.mode,
        })
        .then(res => {
          if (!res.data.data.data.length) {
            $state.complete();
          } else {
            this.pictureList = this.pictureList.concat(res.data.data.data);
            $state.loaded();
          }
        });
    },
    changeData(e) {
      console.log(e);
    },
    resetData() {
      this.page = 1;
      this.pictureList = [];
      this.identifier += 1;
    },
    selectDate(date) {
      this.date = date;
      this.resetData();
    },
    selectMode() {
      this.resetData();
    },
  },
  mounted() {
    this.date = dayjs(new Date())
      .add(-3, 'days')
      .format('YYYY-MM-DD');
  },
};
</script>

<style scoped lang="less">
.DailyRank {
  height: calc(~'100vh - 60px');
  overflow-y: hidden;
  width: calc(~'100%');
  display: flex;
  justify-content: center;
}
</style>

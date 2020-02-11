<template>
  <div
    class="list"
    ref="list"
  >
    <VirtualCollection
      :cell-size-and-position-getter="cellSizeAndPositionGetter"
      :collection="list"
      :height="height"
      :identifier="identifier"
      :width="width"
      @infinite="infinite"
    >
      <slot />
      <template v-slot:cell="props">
        <Item
          :column="props.data"
          @handleLike="handleLike"
        />
      </template>
    </VirtualCollection>
  </div>
</template>

<script>
import VirtualCollection from '@/components/Collect/VirtualCollection';
import throttle from 'lodash/throttle';
import Item from './Item';
import { IMG_PREFIX } from '@/util/constants';
import { randomColor } from '@/util';
import { getClient } from '@/util/dom';
const columnWidth = 200; // 屏幕小于200则1列

export default {
  components: {
    VirtualCollection,
    Item,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    identifier: {
      type: Number,
      default: +new Date(),
    },
  },
  data() {
    return {
      scrollY: 0,
      headerHeight: 0,
      columnHeight: [],
      column: 0,
      width: getClient().width - 200,
      height: getClient().height,
    };
  },
  watch: {
    list: {
      handler(val, old) {
        if (val.length === 0) {
          this.columnHeight = new Array(this.column).fill(0);
        } else {
          const list = val.filter(e => !old.includes(e));
          for (let i = 0; i < list.length; i++) {
            const tmp = list[i];
            const per = tmp.height / tmp.width;
            const width = Math.floor(this.width / this.column);
            const height = Math.min(width * per, 400);

            let minHeight = this.columnHeight[0];
            let index = 0;
            for (let j = 0; j < this.columnHeight.length; j++) {
              if (minHeight > this.columnHeight[j]) {
                minHeight = this.columnHeight[j];
                index = j;
              }
            }
            tmp.x = index * width;
            tmp.y = this.columnHeight[index];
            this.columnHeight[index] += height;

            tmp['height'] = height;
            tmp['width'] = width;
            tmp['src'] = `${IMG_PREFIX}${tmp.imageUrls[0].medium}`;
            tmp['color'] = randomColor();

            tmp['style'] = {
              backgroundColor: randomColor(),
              filter: tmp.xrestrict === 1 || tmp.sanityLevel > 6 ? `blur(20px)` : '',
            };
          }
        }
      },
    },
  },
  mounted() {
    this.waterFall();
    if (this.$slots.default) {
      this.headerHeight = parseInt(this.$slots.default[0].elm.offsetHeight);
    }
    window.addEventListener('resize', throttle(this.waterFall));
  },
  destroyed() {
    window.removeEventListener('resize', this.waterFall);
  },
  methods: {
    onScroll(pos) {
      // console.log(this.$refs.scroll)
      this.scrollY = document.documentElement.scrollTop;
    },
    infinite($state) {
      this.$emit('infinite', $state);
    },
    cellSizeAndPositionGetter(item, index) {
      return {
        width: item.width,
        height: item.height,
        x: item.x,
        y: item.y + this.headerHeight,
      };
    },
    handleLike(data) {
      console.log(data.id);
      const item = this.list.find(item => item.id === data.id);
      item.isLiked = true;
      console.log(item);
    },
    waterFall() {
      this.width = getClient().width - 200;
      this.height = getClient().height;
      this.column = Math.ceil(this.width / columnWidth);
      this.columnHeight = new Array(this.column).fill(0);
      for (let i = 0; i < this.list.length; i++) {
        const tmp = this.list[i];
        const per = tmp.height / tmp.width;
        const width = Math.floor(this.width / this.column);
        const height = Math.min(width * per, 400);
        // 找出最小列
        let minHeight = this.columnHeight[0];
        let index = 0;
        for (let j = 0; j < this.columnHeight.length; j++) {
          if (minHeight > this.columnHeight[j]) {
            minHeight = this.columnHeight[j];
            index = j;
          }
        }
        tmp.x = index * width;
        tmp.y = this.columnHeight[index];
        this.columnHeight[index] += height;

        tmp['height'] = height;
        tmp['width'] = width;
        tmp['src'] = `${IMG_PREFIX}${tmp.imageUrls[0].medium}`;
        tmp['color'] = randomColor();
        tmp['style'] = {
          backgroundColor: randomColor(),
          filter: tmp.xrestrict === 1 || tmp.sanityLevel > 6 ? `blur(20px)` : '',
        };
      }
    },
  },
};
</script>

<style lang="stylus" scope>
.list
  position relative
  background-color #fff
</style>

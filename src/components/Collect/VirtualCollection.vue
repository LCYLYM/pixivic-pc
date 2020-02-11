<style lang="stylus" scoped>
.vue-virtual-collection
  overflow scroll
  -webkit-overflow-scrolling touch
  margin 0 auto
  &::-webkit-scrollbar
    background-color: #fff;
    width: 10px;
    height: 10px;
    background-clip: padding-box;
  &::-webkit-scrollbar-thumb
    border-radius:10px;
    background-color:lightgray;
  &-container
    position relative
    background #fff
  .cell-container
    position absolute
    top 0 
  .top
    position fixed
    bottom 50px
    right 10px
    width 50px
    height 50px
    transform translateY(100px)
    transition all 1s
    opacity 0
    i
      font-size 25px
      color pink
    &.is-active
      transform translateY(0)
      opacity 1
</style>

<template>
  <div
    :style="outerStyle"
    @scroll.passive="onScroll"
    class="vue-virtual-collection"
    ref="outer"
  >
    <div
      :style="containerStyle"
      class="vue-virtual-collection-container"
    >
      <slot />
      <div
        :key="item.id"
        :style="getComputedStyle(item)"
        class="cell-container"
        v-for="item in displayItems"
      >
        <slot
          :data="item"
          name="cell"
        />
      </div>
    </div>
    <div
      :class="['top', { 'is-active': showTab }]"
      @click.stop="scrollToTop"
    >
      <el-button
        circle
        icon="el-icon-search"
      ></el-button>
    </div>
    <infinite-loading
      :identifier="identifier"
      @infinite="infinite"
      spinner="circles"
    >
      <div slot="no-more">(￣ˇ￣)俺也是有底线的</div>
      <div slot="no-results">(￣ˇ￣)无结果</div>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import { mapGetters } from 'vuex';
import GroupManager from './GroupManager';
import { getClient } from '@/util/dom';

export default {
  components: {
    InfiniteLoading,
  },
  props: {
    cellSizeAndPositionGetter: {
      type: Function,
      required: true,
    },
    collection: {
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      validator(value) {
        return value >= 0;
      },
      default: getClient().height,
    },
    width: {
      type: Number,
      validator(value) {
        return value >= 0;
      },
      default: getClient().width,
    },
    sectionSize: {
      type: Number,
      default: getClient().width,
    },
    identifier: {
      default: +new Date(),
    },
  },
  data() {
    return {
      totalHeight: 0,
      totalWidth: 0,
      displayItems: [],
      scrollY: 0,
    };
  },
  computed: {
    ...mapGetters(['showTab']),
    containerStyle() {
      return {
        height: this.totalHeight + 'px',
        // width: this.totalWidth + 'px',
        width: '100%',
      };
    },
    outerStyle() {
      return {
        height: this.height + 'px',
        width: this.width + 'px',
      };
    },
  },
  watch: {
    collection() {
      // Dispose previous groups and reset associated data
      this.groupManagers.forEach(manager => manager.dispose());
      this.groupManagers = [];
      this.totalHeight = 0;
      this.totalWidth = 0;

      this.onCollectionChanged();
    },
    identifier() {
      this.totalHeight = 0;
    },
  },
  created() {
    this.groupManagers = [];
    this.onCollectionChanged();
  },
  activated() {
    this.$refs.outer.scrollTop = this.scrollY;
  },
  methods: {
    onCollectionChanged() {
      let collection = this.collection;

      // If the collection is flat, wrap it inside a single group
      if (collection.length > 0 && collection[0].group === undefined) {
        collection = [{ group: collection }];
      }

      // Create and store managers for each item group
      collection.forEach((groupContainer, i) => {
        const groupIndex = i; // Capture group index for closure
        const unwatch = this.$watch(
          () => groupContainer,
          () => this.onGroupChanged(groupContainer.group, groupIndex),
          { deep: true }
        );

        this.groupManagers.push(
          new GroupManager(
            groupContainer.group,
            groupIndex,
            this.sectionSize,
            this.cellSizeAndPositionGetter,
            unwatch
          )
        );
      });

      this.updateGridDimensions();
      this.flushDisplayItems();
    },
    updateGridDimensions() {
      this.totalHeight = Math.max(...this.groupManagers.map(it => it.totalHeight));
      this.totalWidth = Math.max(...this.groupManagers.map(it => it.totalWidth));
    },
    onGroupChanged(group, index) {
      this.groupManagers[index].updateGroup(group);
      this.updateGridDimensions();
      this.flushDisplayItems();
    },
    getComputedStyle(displayItem) {
      if (!displayItem) return;

      // Currently displayed items may no longer exist
      // if collection has been modified since
      const groupManager = this.groupManagers[displayItem.groupIndex];
      if (!groupManager) return;

      const cellMetadatum = groupManager.getCellMetadata(displayItem.itemIndex);
      if (!cellMetadatum) return;

      const { width, height, x, y } = cellMetadatum;
      return {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      };
    },
    onScroll(e) {
      this.flushDisplayItems();
      this.scrollY = this.$refs.outer.scrollTop;
    },
    flushDisplayItems() {
      let scrollTop = 0;
      let scrollLeft = 0;
      if (this.$refs.outer) {
        scrollTop = this.$refs.outer.scrollTop;
        scrollLeft = this.$refs.outer.scrollLeft;
      }

      const displayItems = [];
      this.groupManagers.forEach((groupManager, groupIndex) => {
        var indices = groupManager.getCellIndices({
          height: this.height,
          width: this.width,
          x: scrollLeft,
          y: scrollTop,
        });

        indices.forEach(itemIndex => {
          displayItems.push(
            Object.freeze({
              groupIndex,
              itemIndex,
              key: displayItems.length,
              ...groupManager.getItem(itemIndex),
            })
          );
        });
      });

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          this.displayItems = displayItems;
          this.$forceUpdate();
        });
      } else {
        this.displayItems = displayItems;
        this.$forceUpdate();
      }
    },
    infinite($state) {
      this.$emit('infinite', $state);
    },
    swipe(direction) {
      // if (this.$refs.outer.scrollTop < 400) {
      //   return this.$store.dispatch('changeTab', false);
      // }
      switch (direction) {
        case 'Up':
          this.$store.dispatch('changeTab', false);
          break;
        case 'Down':
          this.$store.dispatch('changeTab', true);
          break;
      }
    },
    scrollToTop() {
      this.$refs.outer.scrollTop = 0;
      // this.$store.dispatch('changeTab', false);
    },
  },
};
</script>

<template>
  <scroller
    ref="scroller"
    v-bind="$attrs"
    v-on="$listeners"
    :on-refresh="onRefresh"
    :on-infinite="onInfinite">
    <slot :list="thePage.list" :page="thePage"></slot>
  </scroller>
</template>

<script>
import Scroller from 'vue-scroller/src/components/Scroller.vue'
import pagination from './mixins/pagination.js'
export default {
  name: 'VScroll',
  inheritAttrs: false,
  components: {Scroller},
  mixins: [pagination],
  props: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    /**
     *下拉刷新触发
     * @public
     */
    async onRefresh(done) {
      await this.pullDownRefresh()
      done()
    },
    /**
     *滚动加载触发触发
     * @public
     */
    async onInfinite(done) {
      let infiniteRes = await this.pullUpLoad()
      done(infiniteRes)
    }
  },
  destroyed() {}
}
</script>

<style scoped>
.v-scroll {
}
</style>

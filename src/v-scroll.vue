<template>
  <scroller
    ref="scroller"
    :on-refresh="onRefresh"
    :on-infinite="onInfinite">
    <slot :list="thePage.list" :page="thePage"></slot>
  </scroller>
</template>

<script>
import pagination from './mixins/pagination.js'
export default {
  name: 'VScroll',
  components: {},
  mixins: [pagination],
  props: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async onRefresh(done) {
      await this.pullDownRefresh()
      done()
    },
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

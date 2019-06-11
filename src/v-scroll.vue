<template>
  <scroller
    ref="scroller"
    :on-refresh="pullDownRefresh"
    :on-infinite="pullUpLoad">
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
    /** 下拉刷新*/
    async pullDownRefresh(done) {
      console.log('pullDownRefresh')
      this.thePage.number = this.thePage.defaultFirstPage
      await this.fetchData()
      done()
    },
    /** 上拉加载*/
    async pullUpLoad(done) {
      console.log('pullUpLoad')
      if (this.thePage.list.length >= this.thePage.total) {
        done(true)
        return
      }
      await this.fetchData()
      this.thePage.number++
      done()
    }
  },
  destroyed() {}
}
</script>

<style scoped>
.v-scroll {
}
</style>

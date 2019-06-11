import _get from 'lodash/get'
import {timeout} from '../utils/index.js'
const dataPath = 'payload.content'
const totalPath = 'payload.totalElements'
const defaultFirstPage = 1
const defaultPageSize = 10
// 延迟时间ms
const fetchDelay = 200

/** 移动端分页数据处理逻辑*/
export default {
  props: {
    /** 获取列表数据地址*/
    url: {type: String, require: true, default: ''},
    /** url上分页参数名-页号*/
    urlPageName: {type: String, require: false, default: 'page'},
    /** url上分页参数名-页码*/
    urlSizeName: {type: String, require: false, default: 'size'},
    /** url响应数据中路径-list数据路径*/
    dataPath: {type: String, require: false, default: dataPath},
    /** url响应数据中路径-总数量的路径*/
    totalPath: {type: String, require: false, default: totalPath},
    /** 每页数量*/
    size: {type: Number, require: false, default: defaultPageSize}
  },
  data() {
    return {
      /** 分页参数*/
      thePage: {
        list: [], // 列表数据
        number: defaultFirstPage, // 页号
        size: this.size, // 每页数量
        total: 1, // 总数量
        defaultFirstPage: defaultFirstPage,
        defaultPageSize: defaultPageSize
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    /** 获取数据(isPush是否将请求到分页数据直接放入list中)*/
    async fetchData() {
      let param = {}
      param[this.urlPageName] = this.thePage.number
      param[this.urlSizeName] = this.thePage.size
      let resp = await this.$axios.get(this.url, param)
      // 手动延迟
      await timeout(fetchDelay)
      this.thePage.total = _get(resp.data, this.totalPath, 0)
      let list = _get(resp.data, this.dataPath, [])

      if (this.thePage.number == defaultFirstPage) {
        // 如果是第一页则重置
        this.thePage.list = list
      } else {
        // 如果是大于第一页则合并数据
        this.thePage.list = this.thePage.list.concat(list)
      }
      this.thePage.number++
    },
    /** 下拉刷新*/
    async pullDownRefresh() {
      console.log('pullDownRefresh')
      this.thePage.number = defaultFirstPage
      await this.fetchData()
    },
    /** 上拉加载 (return true:数据已全部加载，false:当前滚动已完成，但数据未加载完)*/
    async pullUpLoad() {
      console.log('pullUpLoad')
      if (this.thePage.list.length >= this.thePage.total) {
        return true
      }
      await this.fetchData()
      return false
    }
  },
  watch: {
    url: {
      handler(val) {
        this.thePage.number = defaultFirstPage
        this.fetchData()
      },
      immediate: false
    }
  },
  destroyed() {}
}

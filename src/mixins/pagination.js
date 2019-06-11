import _get from 'lodash/get'
const dataPath = 'payload.content'
const totalPath = 'payload.totalElements'
const defaultFirstPage = 1
const defaultPageSize = 10

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
      this.thePage.total = _get(resp.data, this.totalPath, 0)
      let list = _get(resp.data, this.dataPath, [])
      if (this.thePage.number == defaultFirstPage) {
        this.thePage.list = list
      } else {
        this.thePage.list = this.thePage.list.concat(list)
      }
    }
  },
  destroyed() {}
}

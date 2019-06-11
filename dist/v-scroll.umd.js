(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime/regenerator'), require('@babel/runtime/helpers/asyncToGenerator'), require('lodash/get')) :
  typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime/regenerator', '@babel/runtime/helpers/asyncToGenerator', 'lodash/get'], factory) :
  (global = global || self, factory(global.VScroll = {}, global._regeneratorRuntime, global._asyncToGenerator, global._get));
}(this, function (exports, _regeneratorRuntime, _asyncToGenerator, _get) { 'use strict';

  _regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
  _asyncToGenerator = _asyncToGenerator && _asyncToGenerator.hasOwnProperty('default') ? _asyncToGenerator['default'] : _asyncToGenerator;
  _get = _get && _get.hasOwnProperty('default') ? _get['default'] : _get;

  /**
   * setTimeout 的 promise 封装
   * @param {Number} time
   * @returns
   */
  function timeout(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  var dataPath = 'payload.content';
  var totalPath = 'payload.totalElements';
  var defaultFirstPage = 1;
  var defaultPageSize = 10; // 延迟时间ms

  var fetchDelay = 200;
  /** 移动端分页数据处理逻辑*/

  var pagination = {
    props: {
      /** 获取列表数据地址*/
      url: {
        type: String,
        require: true,
        "default": ''
      },

      /** url上分页参数名-页号*/
      urlPageName: {
        type: String,
        require: false,
        "default": 'page'
      },

      /** url上分页参数名-页码*/
      urlSizeName: {
        type: String,
        require: false,
        "default": 'size'
      },

      /** url响应数据中路径-list数据路径*/
      dataPath: {
        type: String,
        require: false,
        "default": dataPath
      },

      /** url响应数据中路径-总数量的路径*/
      totalPath: {
        type: String,
        require: false,
        "default": totalPath
      },

      /** 每页数量*/
      size: {
        type: Number,
        require: false,
        "default": defaultPageSize
      }
    },
    data: function data() {
      return {
        /** 分页参数*/
        thePage: {
          list: [],
          // 列表数据
          number: defaultFirstPage,
          // 页号
          size: this.size,
          // 每页数量
          total: 1,
          // 总数量
          defaultFirstPage: defaultFirstPage,
          defaultPageSize: defaultPageSize
        }
      };
    },
    computed: {},
    created: function created() {},
    mounted: function mounted() {},
    methods: {
      /** 获取数据(isPush是否将请求到分页数据直接放入list中)*/
      fetchData: function () {
        var _fetchData = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee() {
          var param, resp, list;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  param = {};
                  param[this.urlPageName] = this.thePage.number;
                  param[this.urlSizeName] = this.thePage.size;
                  _context.next = 5;
                  return this.$axios.get(this.url, param);

                case 5:
                  resp = _context.sent;
                  _context.next = 8;
                  return timeout(fetchDelay);

                case 8:
                  this.thePage.total = _get(resp.data, this.totalPath, 0);
                  list = _get(resp.data, this.dataPath, []);

                  if (this.thePage.number == defaultFirstPage) {
                    // 如果是第一页则重置
                    this.thePage.list = list;
                  } else {
                    // 如果是大于第一页则合并数据
                    this.thePage.list = this.thePage.list.concat(list);
                  }

                  this.thePage.number++;

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function fetchData() {
          return _fetchData.apply(this, arguments);
        }

        return fetchData;
      }(),

      /** 下拉刷新*/
      pullDownRefresh: function () {
        var _pullDownRefresh = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee2() {
          return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  console.log('pullDownRefresh');
                  this.thePage.number = defaultFirstPage;
                  _context2.next = 4;
                  return this.fetchData();

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function pullDownRefresh() {
          return _pullDownRefresh.apply(this, arguments);
        }

        return pullDownRefresh;
      }(),

      /** 上拉加载 (return true:数据已全部加载，false:当前滚动已完成，但数据未加载完)*/
      pullUpLoad: function () {
        var _pullUpLoad = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee3() {
          return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  console.log('pullUpLoad');

                  if (!(this.thePage.list.length >= this.thePage.total)) {
                    _context3.next = 3;
                    break;
                  }

                  return _context3.abrupt("return", true);

                case 3:
                  _context3.next = 5;
                  return this.fetchData();

                case 5:
                  return _context3.abrupt("return", false);

                case 6:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function pullUpLoad() {
          return _pullUpLoad.apply(this, arguments);
        }

        return pullUpLoad;
      }()
    },
    watch: {
      url: {
        handler: function handler(val) {
          this.thePage.number = defaultFirstPage;
          this.fetchData();
        },
        immediate: false
      }
    },
    destroyed: function destroyed() {}
  };

  var script = {
    name: 'VScroll',
    inheritAttrs: false,
    components: {},
    mixins: [pagination],
    props: {},
    data: function data() {
      return {};
    },
    computed: {},
    created: function created() {},
    mounted: function mounted() {},
    methods: {
      onRefresh: function () {
        var _onRefresh = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee(done) {
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.pullDownRefresh();

                case 2:
                  done();

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function onRefresh(_x) {
          return _onRefresh.apply(this, arguments);
        }

        return onRefresh;
      }(),
      onInfinite: function () {
        var _onInfinite = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee2(done) {
          var infiniteRes;
          return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.pullUpLoad();

                case 2:
                  infiniteRes = _context2.sent;
                  done(infiniteRes);

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function onInfinite(_x2) {
          return _onInfinite.apply(this, arguments);
        }

        return onInfinite;
      }()
    },
    destroyed: function destroyed() {}
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }
  var HEAD = document.head || document.getElementsByTagName('head')[0];
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) style.element.setAttribute('media', css.media);
        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  }

  var browser = createInjector;

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "scroller",
      _vm._g(
        _vm._b(
          {
            ref: "scroller",
            attrs: { "on-refresh": _vm.onRefresh, "on-infinite": _vm.onInfinite }
          },
          "scroller",
          _vm.$attrs,
          false
        ),
        _vm.$listeners
      ),
      [_vm._t("default", null, { list: _vm.thePage.list, page: _vm.thePage })],
      2
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-3cd1f614_0", { source: "\n.v-scroll[data-v-3cd1f614] {\n}\r\n", map: {"version":3,"sources":["C:\\liyang\\project\\vue-component\\v-scroll\\src\\v-scroll.vue"],"names":[],"mappings":";AAwCA;AACA","file":"v-scroll.vue","sourcesContent":["<template>\r\n  <scroller\r\n    ref=\"scroller\"\r\n    v-bind=\"$attrs\"\r\n    v-on=\"$listeners\"\r\n    :on-refresh=\"onRefresh\"\r\n    :on-infinite=\"onInfinite\">\r\n    <slot :list=\"thePage.list\" :page=\"thePage\"></slot>\r\n  </scroller>\r\n</template>\r\n\r\n<script>\r\nimport pagination from './mixins/pagination.js'\r\nexport default {\r\n  name: 'VScroll',\r\n  inheritAttrs: false,\r\n  components: {},\r\n  mixins: [pagination],\r\n  props: {},\r\n  data() {\r\n    return {}\r\n  },\r\n  computed: {},\r\n  created() {},\r\n  mounted() {},\r\n  methods: {\r\n    async onRefresh(done) {\r\n      await this.pullDownRefresh()\r\n      done()\r\n    },\r\n    async onInfinite(done) {\r\n      let infiniteRes = await this.pullUpLoad()\r\n      done(infiniteRes)\r\n    }\r\n  },\r\n  destroyed() {}\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.v-scroll {\r\n}\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = "data-v-3cd1f614";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    

    
    var Component = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      browser,
      undefined
    );

  // Import vue component

  function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('VScroll', Component);
  } // Create module definition for Vue.use()

  var plugin = {
    install: install // To auto-install when vue is found

  };
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  } // To allow use as module (npm/webpack/etc.) export component
  // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
  // export const RollupDemoDirective = component;

  exports.default = Component;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

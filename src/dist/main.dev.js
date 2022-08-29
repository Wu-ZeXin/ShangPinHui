"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _store = _interopRequireDefault(require("@/store"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _index = _interopRequireDefault(require("@/router/index"));

var _TypeNav = _interopRequireDefault(require("@/components/TypeNav"));

var _Carousel = _interopRequireDefault(require("@/components/Carousel"));

var _Pagination = _interopRequireDefault(require("@/components/Pagination"));

var API = _interopRequireWildcard(require("@/api"));

require("@/mock/serve");

require("swiper/css/swiper.min.css");

var _elementUi = require("element-ui");

var _vueLazyload = _interopRequireDefault(require("vue-lazyload"));

require("@/plugins/validate");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 引入Vuex 以及相关的store文件
// =====================================================
// 引入vue-router
// 引入路由文件 router
// Vue使用vue-router
_vue["default"].use(_vueRouter["default"]); // ======================================================
// 注册全局组件


_vue["default"].component('TypeNav', _TypeNav["default"]); // 注册轮播图为全局组件


_vue["default"].component('Carousel', _Carousel["default"]); // 注册分页器组件为全局组件


_vue["default"].component('Pagination', _Pagination["default"]); // ======================================================
// 向全局暴露所有的API接口(引入全部的请求函数)


_vue["default"].component(_elementUi.Button.name, _elementUi.Button);
/* 或写为
 * Vue.use(Button)
 */
//注册组件的形式：把elementUI中组件挂载到Vue.prototype原型对象上
//把组件挂载原型对象身上，则全部组件实例都可以获取到


_vue["default"].prototype.$notify = _elementUi.Notification; //注册弹框组件

_vue["default"].prototype.$msgbox = _elementUi.MessageBox;
_vue["default"].prototype.$alert = _elementUi.MessageBox.alert; // =======================================================
// 图片懒加载

// 引入加载图片
// import load from '@/assets/images/loading.gif'
_vue["default"].use(_vueLazyload["default"], {
  //设置图片懒加载默认图片
  loading: require('@/assets/images/loading.gif')
}); // =======================================================
// 引入自定义插件
// import myPlugin from '@/plugins/myPlugin'
// Vue.use(myPlugin, {
//   name: 'wzx'
// })
// =======================================================
// 引入表单验证插件


// 关闭生产提示
_vue["default"].config.productionTip = false;
new _vue["default"]({
  render: function render(h) {
    return h(_App["default"]);
  },
  //注册路由,给组件的身上添加了$router与$route两个属性
  router: _index["default"],
  //注册仓库，给每一个组件的身上添加$store属性
  store: _store["default"],
  beforeCreate: function beforeCreate() {
    //配置全局事件总线
    // Vue.prototype.$bus = this;
    //把全部的请求函数：作为Vue.prototype的属性，组件实例可以获取
    //请求函数只需要注册一次，可以在组件当中使用。
    _vue["default"].prototype.$API = API;
    _vue["default"].prototype.$bus = this;
  }
}).$mount('#app');
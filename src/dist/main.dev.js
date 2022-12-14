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

// ??????Vuex ???????????????store??????
// =====================================================
// ??????vue-router
// ?????????????????? router
// Vue??????vue-router
_vue["default"].use(_vueRouter["default"]); // ======================================================
// ??????????????????


_vue["default"].component('TypeNav', _TypeNav["default"]); // ??????????????????????????????


_vue["default"].component('Carousel', _Carousel["default"]); // ????????????????????????????????????


_vue["default"].component('Pagination', _Pagination["default"]); // ======================================================
// ????????????????????????API??????(???????????????????????????)


_vue["default"].component(_elementUi.Button.name, _elementUi.Button);
/* ?????????
 * Vue.use(Button)
 */
//???????????????????????????elementUI??????????????????Vue.prototype???????????????
//???????????????????????????????????????????????????????????????????????????


_vue["default"].prototype.$notify = _elementUi.Notification; //??????????????????

_vue["default"].prototype.$msgbox = _elementUi.MessageBox;
_vue["default"].prototype.$alert = _elementUi.MessageBox.alert; // =======================================================
// ???????????????

// ??????????????????
// import load from '@/assets/images/loading.gif'
_vue["default"].use(_vueLazyload["default"], {
  //?????????????????????????????????
  loading: require('@/assets/images/loading.gif')
}); // =======================================================
// ?????????????????????
// import myPlugin from '@/plugins/myPlugin'
// Vue.use(myPlugin, {
//   name: 'wzx'
// })
// =======================================================
// ????????????????????????


// ??????????????????
_vue["default"].config.productionTip = false;
new _vue["default"]({
  render: function render(h) {
    return h(_App["default"]);
  },
  //????????????,???????????????????????????$router???$route????????????
  router: _index["default"],
  //????????????????????????????????????????????????$store??????
  store: _store["default"],
  beforeCreate: function beforeCreate() {
    //????????????????????????
    // Vue.prototype.$bus = this;
    //?????????????????????????????????Vue.prototype????????????????????????????????????
    //??????????????????????????????????????????????????????????????????
    _vue["default"].prototype.$API = API;
    _vue["default"].prototype.$bus = this;
  }
}).$mount('#app');
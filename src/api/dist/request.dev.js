"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _nprogress = _interopRequireDefault(require("nprogress"));

require("nprogress/nprogress.css");

var _store = _interopRequireDefault(require("@/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 对axios的二次封装，加装请求拦截器和响应拦截器
// 引入进度条插件以及样式
// 引入仓库模块
var requests = _axios["default"].create({
  baseURL: '/api',
  timeout: 5000
}); // 请求拦截器
//config，请求拦截器的一个配置对象，包含有请求头


requests.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (_store["default"].state.shopcart.userTempId) {
    config.headers.userTempId = _store["default"].state.shopcart.userTempId;
  }

  if (_store["default"].state.user.token) {
    config.headers.token = _store["default"].state.user.token;
  }

  _nprogress["default"].start();

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
}); // 响应拦截器

requests.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  _nprogress["default"].done();

  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
var _default = requests;
exports["default"] = _default;
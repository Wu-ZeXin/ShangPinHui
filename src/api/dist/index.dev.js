"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqPayStatus = exports.reqOrderInfo = exports.reqPayInfo = exports.reqSubmitOrder = exports.reqUserAddressList = exports.reqTradeCartList = exports.reqLoginOut = exports.reqUserInfo = exports.reqLogin = exports.reqRegister = exports.reqCode = exports.reqDeleteCartById = exports.reqUpdateCartChecked = exports.reqShopCart = exports.reqAddOrUpdateShopCartList = exports.reqDetailList = exports.reqSearchList = exports.reqFloorList = exports.reqBannerList = exports.reqCategoryList = void 0;

var _request = _interopRequireDefault(require("./request"));

var _mockRequest = _interopRequireDefault(require("./mockRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 该模块：对API进行统一管理
// 引入二次封装的axios
// 引入引入二次封装的mock-axios
// TypeNav组件(三级联动)的接口
var reqCategoryList = function reqCategoryList() {
  return (0, _request["default"])({
    url: '/product/getBaseCategoryList',
    method: 'get'
  });
}; // 轮播图数据


exports.reqCategoryList = reqCategoryList;

var reqBannerList = function reqBannerList() {
  return (0, _mockRequest["default"])({
    url: '/banner',
    method: 'get'
  });
}; // floor组件数据


exports.reqBannerList = reqBannerList;

var reqFloorList = function reqFloorList() {
  return (0, _mockRequest["default"])({
    url: '/floor',
    method: 'get'
  });
}; // 获取搜索数据


exports.reqFloorList = reqFloorList;

var reqSearchList = function reqSearchList(data) {
  return (0, _request["default"])({
    url: '/list',
    method: 'post',
    data: data
  });
}; // 获取商品详情数据


exports.reqSearchList = reqSearchList;

var reqDetailList = function reqDetailList(skuId) {
  return (0, _request["default"])({
    url: "/item/".concat(skuId),
    method: 'get'
  });
}; //添加到购物车(对已有 物品进行数量 改动)
///api/cart/addToCart/{ skuId }/{ skuNum }  post


exports.reqDetailList = reqDetailList;

var reqAddOrUpdateShopCartList = function reqAddOrUpdateShopCartList(skuId, skuNum) {
  return (0, _request["default"])({
    url: "/cart/addToCart/".concat(skuId, "/").concat(skuNum),
    method: 'post'
  });
}; // 获取购物车列表数据


exports.reqAddOrUpdateShopCartList = reqAddOrUpdateShopCartList;

var reqShopCart = function reqShopCart() {
  return (0, _request["default"])({
    url: '/cart/cartList',
    method: 'get'
  });
}; // 更改商品是否选中状态


exports.reqShopCart = reqShopCart;

var reqUpdateCartChecked = function reqUpdateCartChecked(skuId, isChecked) {
  return (0, _request["default"])({
    url: "/cart/checkCart/".concat(skuId, "/").concat(isChecked),
    method: 'get'
  });
}; // 删除商品


exports.reqUpdateCartChecked = reqUpdateCartChecked;

var reqDeleteCartById = function reqDeleteCartById(skuId) {
  return (0, _request["default"])({
    url: "/cart/deleteCart/".concat(skuId),
    method: 'delete'
  });
}; // 获取验证码


exports.reqDeleteCartById = reqDeleteCartById;

var reqCode = function reqCode(phone) {
  return (0, _request["default"])({
    url: "/user/passport/sendCode/".concat(phone),
    method: 'get'
  });
}; // 用户注册


exports.reqCode = reqCode;

var reqRegister = function reqRegister(phone, code, password) {
  return (0, _request["default"])({
    url: '/user/passport/register/',
    method: 'post',
    data: {
      phone: phone,
      code: code,
      password: password
    }
  });
}; // 用户登录


exports.reqRegister = reqRegister;

var reqLogin = function reqLogin(phone, password) {
  return (0, _request["default"])({
    url: '/user/passport/login',
    method: 'post',
    data: {
      phone: phone,
      password: password
    }
  });
}; // 获取用户信息


exports.reqLogin = reqLogin;

var reqUserInfo = function reqUserInfo() {
  return (0, _request["default"])({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
  });
}; // 退出登录


exports.reqUserInfo = reqUserInfo;

var reqLoginOut = function reqLoginOut() {
  return (0, _request["default"])({
    url: '/user/passport/logout',
    method: 'get'
  });
}; // 获取订单交易页信息


exports.reqLoginOut = reqLoginOut;

var reqTradeCartList = function reqTradeCartList() {
  return (0, _request["default"])({
    url: '/order/auth/trade',
    method: 'get'
  });
}; // 获取用户地址信息


exports.reqTradeCartList = reqTradeCartList;

var reqUserAddressList = function reqUserAddressList() {
  return (0, _request["default"])({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
  });
}; // 提交订单


exports.reqUserAddressList = reqUserAddressList;

var reqSubmitOrder = function reqSubmitOrder(tradeNo, data) {
  return (0, _request["default"])({
    url: "/order/auth/submitOrder?tradeNo=".concat(tradeNo),
    method: 'post',
    data: data
  });
}; // 获取支付信息


exports.reqSubmitOrder = reqSubmitOrder;

var reqPayInfo = function reqPayInfo(orderId) {
  return (0, _request["default"])({
    url: "/payment/weixin/createNative/".concat(orderId),
    method: 'get'
  });
}; // 请求订单页面信息


exports.reqPayInfo = reqPayInfo;

var reqOrderInfo = function reqOrderInfo(page, limit) {
  return (0, _request["default"])({
    url: "/order/auth/".concat(page, "/").concat(limit),
    method: 'get'
  });
}; // 获取订单支付情况


exports.reqOrderInfo = reqOrderInfo;

var reqPayStatus = function reqPayStatus(orderId) {
  return (0, _request["default"])({
    url: "/payment/weixin/queryPayStatus/".concat(orderId),
    method: 'get'
  });
};

exports.reqPayStatus = reqPayStatus;
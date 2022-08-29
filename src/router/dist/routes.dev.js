"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// 该文件专门用于创建整个应用的路由器
// import VueRouter from 'vue-router'
var _default = [// 主页路由
{
  path: '/home',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/Home'));
    });
  },
  meta: {
    show: true
  }
}, // 重定向 / => /home
{
  path: '/',
  redirect: '/home'
}, // 登录路由
{
  path: '/login',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/Login'));
    });
  },
  meta: {
    show: false
  }
}, // 注册路由
{
  path: '/register',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/Register'));
    });
  },
  meta: {
    show: false
  }
}, // 搜索路由
{
  name: 'search',
  path: '/search/:keyword?',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/Search'));
    });
  },
  meta: {
    show: true
  }
}, // 商品详情页路由
{
  path: '/detail/:skuId',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/Detail'));
    });
  },
  meta: {
    show: true
  }
}, // 商品添加成功页面路由
{
  name: 'addshopcart',
  path: '/addcartsuccess',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/AddCartSuccess'));
    });
  },
  meta: {
    show: true
  }
}, // 购物车页面路由
{
  name: 'shopCart',
  path: '/shopcart',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/ShopCart'));
    });
  },
  meta: {
    show: true
  }
}, // 结算页面路由
{
  path: '/trade',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/Trade'));
    });
  },
  meta: {
    show: true
  }
}, // 支付页面路由
{
  path: '/pay/:orderId?',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/Pay'));
    });
  },
  meta: {
    show: true
  }
}, // 支付成功页面
{
  path: '/paysuccess',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/PaySuccess'));
    });
  },
  meta: {
    show: true
  }
}, // 我的订单页面 
{
  path: '/center',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/Center'));
    });
  },
  meta: {
    show: true
  },
  children: [{
    path: 'myorder',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/pages/Center/myOrder'));
      });
    }
  }, {
    path: 'grouporder',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/pages/Center/groupOrder'));
      });
    }
  }]
}];
exports["default"] = _default;
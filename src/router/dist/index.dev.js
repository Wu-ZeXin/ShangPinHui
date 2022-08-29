"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _store = _interopRequireDefault(require("@/store"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]); // 重写vue-router原型对象上的push和replace方法，以解决NavigationDuplicated错误
// 出现NavigationDuplicated错误的原因:push和replace的返回对象是一个promise对象
// 而promise对象需要接收成功回调和失败回调，如果没有这两个，便会报错NavigationDuplicated错误
// 备份vue-router原型对象上原有的push和replace方法


var originPush = _vueRouter["default"].prototype.push;
var originReplace = _vueRouter["default"].prototype.replace; // 重写push方法 
// 第一个参数：push方法要跳转的路由，第二个参数：成功回调，第三个参数：失败回调

_vueRouter["default"].prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, function () {}, function () {});
  }
}; // 重写replace方法


_vueRouter["default"].prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, function () {}, function () {});
  }
}; // ==============================================================================


var router = new _vueRouter["default"]({
  // 配置路由
  routes: _routes["default"],
  mode: 'history',
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return {
      y: 0
    };
  }
});
router.beforeEach(function _callee(to, from, next) {
  var token, name, toPath;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = _store["default"].state.user.token;
          name = _store["default"].state.user.userInfo.name;

          if (!token) {
            _context.next = 24;
            break;
          }

          if (!(to.path == '/login')) {
            _context.next = 7;
            break;
          }

          //用户登陆了，且想去登录页的分支
          next('/home');
          _context.next = 22;
          break;

        case 7:
          if (!name) {
            _context.next = 11;
            break;
          }

          next();
          _context.next = 22;
          break;

        case 11:
          _context.prev = 11;
          _context.next = 14;
          return regeneratorRuntime.awrap(_store["default"].dispatch('user/getUserInfo'));

        case 14:
          next();
          _context.next = 22;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](11);
          _context.next = 21;
          return regeneratorRuntime.awrap(_store["default"].dispatch('user/userLoginOut'));

        case 21:
          next('/login');

        case 22:
          _context.next = 26;
          break;

        case 24:
          // 用户未登录
          toPath = to.path;

          if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1 || toPath.indexOf('shopcart') != -1) {
            //判断未登录：去trade、去支付、去支付成功、去个人中心【我的订单、团购订单】
            //跳转到登录页
            next('/login?redirect=' + toPath);
          } else {
            //去的并非上面这些路由,放行
            next();
          }

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[11, 17]]);
});
var _default = router;
exports["default"] = _default;
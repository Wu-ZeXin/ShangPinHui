"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _home = _interopRequireDefault(require("./home"));

var _search = _interopRequireDefault(require("./search"));

var _detail = _interopRequireDefault(require("./detail"));

var _shopcart = _interopRequireDefault(require("./shopcart"));

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 引入Vuex
_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  modules: {
    home: _home["default"],
    search: _search["default"],
    detail: _detail["default"],
    shopcart: _shopcart["default"],
    user: _user["default"]
  }
});

exports["default"] = _default;
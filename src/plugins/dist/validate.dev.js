"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _veeValidate = _interopRequireDefault(require("vee-validate"));

var _zh_CN = _interopRequireDefault(require("vee-validate/dist/locale/zh_CN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 使用vee-validate
_vue["default"].use(_veeValidate["default"]);

_veeValidate["default"].Validator.localize('zh_CN', {
  messages: _objectSpread({}, _zh_CN["default"].messages, {
    is: function is(field) {
      return "".concat(field, "\u5FC5\u987B\u4E0E\u5BC6\u7801\u76F8\u540C");
    } // 修改内置规则的 message，让确认密码和密码相同

  }),
  //注册：有五个字段：phone、code、password、password1、agree【将来用中文显示，别用英文】
  attributes: {
    // 给校验的 field 属性名映射中文名称
    phone: '手机号',
    code: '验证码',
    password: '密码',
    confirmPassword: '确认密码',
    agree: '协议'
  }
}); //这个是vee-valadiate自定义校验规则-->同意复选框先关的


_veeValidate["default"].Validator.extend('agree', {
  validate: function validate(value) {
    return value;
  },
  getMessage: function getMessage(field) {
    return field + '必须同意';
  }
});
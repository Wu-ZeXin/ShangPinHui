"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userTemp = void 0;

var _uuid = require("uuid");

var userTemp = function userTemp() {
  var userInfo = localStorage.getItem('USERINFO');

  if (!userInfo) {
    userInfo = (0, _uuid.v4)();
    localStorage.setItem('USERINFO', userInfo);
  }

  return userInfo;
};

exports.userTemp = userTemp;
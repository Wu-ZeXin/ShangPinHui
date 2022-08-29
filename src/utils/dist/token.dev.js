"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearToken = exports.getToken = exports.setToken = void 0;

// 本地存储——持久化存储token
var setToken = function setToken(token) {
  localStorage.setItem("TOKEN", token);
}; // 获取本地token


exports.setToken = setToken;

var getToken = function getToken() {
  return localStorage.getItem("TOKEN");
}; // 清除本地token


exports.getToken = getToken;

var clearToken = function clearToken() {
  return localStorage.removeItem('TOKEN');
};

exports.clearToken = clearToken;
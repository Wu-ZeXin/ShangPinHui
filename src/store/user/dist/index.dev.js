"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("@/api/index");

var _token = require("@/utils/token");

var _default = {
  namespaced: true,
  state: {
    code: '',
    userInfo: {},
    token: (0, _token.getToken)()
  },
  actions: {
    getCode: function getCode(_ref, phone) {
      var commit, result;
      return regeneratorRuntime.async(function getCode$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.next = 3;
              return regeneratorRuntime.awrap((0, _index.reqCode)(phone));

            case 3:
              result = _context.sent;

              if (!(result.code == 200)) {
                _context.next = 8;
                break;
              }

              commit('GETCODE', result.data);
              _context.next = 9;
              break;

            case 8:
              return _context.abrupt("return", Promise.reject(new Error('failed')));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    getRegister: function getRegister(_ref2, _ref3) {
      var commit, phone, code, password, result;
      return regeneratorRuntime.async(function getRegister$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit;
              phone = _ref3.phone, code = _ref3.code, password = _ref3.password;
              _context2.next = 4;
              return regeneratorRuntime.awrap((0, _index.reqRegister)(phone, code, password));

            case 4:
              result = _context2.sent;

              if (!(result.code == 200)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", "ok");

            case 9:
              return _context2.abrupt("return", Promise.reject(new Error(result.message)));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    getLogin: function getLogin(_ref4, _ref5) {
      var commit, phone, password, result;
      return regeneratorRuntime.async(function getLogin$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref4.commit;
              phone = _ref5.phone, password = _ref5.password;
              _context3.next = 4;
              return regeneratorRuntime.awrap((0, _index.reqLogin)(phone, password));

            case 4:
              result = _context3.sent;

              if (!(result.code == 200)) {
                _context3.next = 11;
                break;
              }

              commit('SETTOKEN', result.data.token);
              (0, _token.setToken)(result.data.token);
              return _context3.abrupt("return", "ok");

            case 11:
              return _context3.abrupt("return", Promise.reject(new Error(result.message)));

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    getUserInfo: function getUserInfo(_ref6) {
      var commit, result;
      return regeneratorRuntime.async(function getUserInfo$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              commit = _ref6.commit;
              _context4.next = 3;
              return regeneratorRuntime.awrap((0, _index.reqUserInfo)());

            case 3:
              result = _context4.sent;

              if (!(result.code == 200)) {
                _context4.next = 8;
                break;
              }

              commit('GETUSERINFO', result.data);
              _context4.next = 9;
              break;

            case 8:
              return _context4.abrupt("return", Promise.reject(new Error(result.message)));

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    userLoginOut: function userLoginOut(_ref7) {
      var commit, result;
      return regeneratorRuntime.async(function userLoginOut$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              commit = _ref7.commit;
              _context5.next = 3;
              return regeneratorRuntime.awrap((0, _index.reqLoginOut)());

            case 3:
              result = _context5.sent;

              if (!(result.code == 200)) {
                _context5.next = 9;
                break;
              }

              commit('USERLOGINOUT');
              return _context5.abrupt("return", "ok");

            case 9:
              return _context5.abrupt("return", Promise.reject(new Error(result.message)));

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  },
  mutations: {
    GETCODE: function GETCODE(state, code) {
      state.code = code;
    },
    SETTOKEN: function SETTOKEN(state, token) {
      state.token = token;
    },
    GETUSERINFO: function GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    USERLOGINOUT: function USERLOGINOUT(state) {
      state.token = '';
      state.userInfo = {};
      (0, _token.clearToken)();
    }
  },
  getters: {}
};
exports["default"] = _default;
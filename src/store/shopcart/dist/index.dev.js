"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("@/api/index");

var _temp_token = require("@/utils/temp_token.js");

var _default = {
  namespaced: true,
  state: {
    userTempId: (0, _temp_token.userTemp)(),
    shopList: []
  },
  actions: {
    getShopCart: function getShopCart(_ref) {
      var commit, result;
      return regeneratorRuntime.async(function getShopCart$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.next = 3;
              return regeneratorRuntime.awrap((0, _index.reqShopCart)());

            case 3:
              result = _context.sent;

              if (result.code === 200) {
                commit('GETSHOPCART', result.data);
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    updateCartChecked: function updateCartChecked(_ref2, _ref3) {
      var commit, skuId, isChecked, result;
      return regeneratorRuntime.async(function updateCartChecked$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit;
              skuId = _ref3.skuId, isChecked = _ref3.isChecked;
              _context2.next = 4;
              return regeneratorRuntime.awrap((0, _index.reqUpdateCartChecked)(skuId, isChecked));

            case 4:
              result = _context2.sent;

              if (!(result.code == 200)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", "ok");

            case 9:
              return _context2.abrupt("return", Promise.reject('修改失败'));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    updateAllCart: function updateAllCart(_ref4, isChecked) {
      var getters = _ref4.getters,
          dispatch = _ref4.dispatch,
          commit = _ref4.commit;
      var arr = [];
      getters.shopCartList.cartInfoList.forEach(function (item) {
        var promise = dispatch("updateCartChecked", {
          skuId: item.skuId,
          isChecked: isChecked
        });
        arr.push(promise);
      });
      return Promise.all(arr);
    },
    deleteCart: function deleteCart(_ref5, skuId) {
      var commit, result;
      return regeneratorRuntime.async(function deleteCart$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref5.commit;
              _context3.next = 3;
              return regeneratorRuntime.awrap((0, _index.reqDeleteCartById)(skuId));

            case 3:
              result = _context3.sent;

              if (!(result.code == 200)) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", "ok");

            case 8:
              return _context3.abrupt("return", Promise.reject(new Error('failed')));

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    deleteCartByChecked: function deleteCartByChecked(_ref6) {
      var getters = _ref6.getters,
          dispatch = _ref6.dispatch;
      var arr = [];
      getters.shopCartList.cartInfoList.forEach(function (item) {
        if (item.isChecked == '1') {
          var promise = dispatch('deleteCart', item.skuId);
          arr.push(promise);
        }
      });
      return Promise.all(arr);
    }
  },
  mutations: {
    GETSHOPCART: function GETSHOPCART(state, shopList) {
      state.shopList = shopList;
    }
  },
  getters: {
    shopCartList: function shopCartList(state) {
      return state.shopList[0] || {};
    }
  }
};
exports["default"] = _default;
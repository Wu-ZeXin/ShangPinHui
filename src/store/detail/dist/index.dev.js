"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("@/api/index");

var _default = {
  namespaced: true,
  state: {
    DetailList: {}
  },
  actions: {
    getDetailList: function getDetailList(_ref, skuId) {
      var commit, result;
      return regeneratorRuntime.async(function getDetailList$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.next = 3;
              return regeneratorRuntime.awrap((0, _index.reqDetailList)(skuId));

            case 3:
              result = _context.sent;

              if (result.code == 200) {
                commit('GETDETAILLIST', result.data);
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    // //加入购物车产品||或者更新某一个产品的个数接口
    addShopCart: function addShopCart(_ref2, _ref3) {
      var commit, skuId, skuNum, result;
      return regeneratorRuntime.async(function addShopCart$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit;
              skuId = _ref3.skuId, skuNum = _ref3.skuNum;
              _context2.next = 4;
              return regeneratorRuntime.awrap((0, _index.reqAddOrUpdateShopCartList)(skuId, skuNum));

            case 4:
              result = _context2.sent;

              if (!(result.code === 200)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", 'ok');

            case 9:
              return _context2.abrupt("return", Promise.reject(new Error('failed')));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  },
  mutations: {
    GETDETAILLIST: function GETDETAILLIST(state, DetailList) {
      state.DetailList = DetailList;
    }
  },
  getters: {
    categoryView: function categoryView(state) {
      return state.DetailList.categoryView || {};
    },
    skuInfo: function skuInfo(state) {
      return state.DetailList.skuInfo || {};
    },
    spuSaleAttrList: function spuSaleAttrList(state) {
      return state.DetailList.spuSaleAttrList || [];
    }
  }
};
exports["default"] = _default;
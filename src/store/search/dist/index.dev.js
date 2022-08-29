"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("@/api");

var _default = {
  namespaced: true,
  state: {
    searchList: [],
    trademark: ''
  },
  actions: {
    getSearchList: function getSearchList(_ref, data) {
      var commit, result;
      return regeneratorRuntime.async(function getSearchList$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.next = 3;
              return regeneratorRuntime.awrap((0, _api.reqSearchList)(data));

            case 3:
              result = _context.sent;

              if (result.code == 200) {
                commit('GETSEARCHLIST', result.data);
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  },
  mutations: {
    GETSEARCHLIST: function GETSEARCHLIST(state, searchList) {
      state.searchList = searchList; // console.log(state.searchList);
    },
    CHANGETRADEMARK: function CHANGETRADEMARK(state, trademark) {
      state.searchList.trademarkList = [trademark];
      state.trademark = trademark;
    }
  },
  getters: {
    goodsList: function goodsList(state) {
      return state.searchList.goodsList || [];
    },
    // 品牌数据
    tradeMarkList: function tradeMarkList(state) {
      return state.searchList.trademarkList || [];
    },
    // 平台数据
    attrsList: function attrsList(state) {
      return state.searchList.attrsList || [];
    }
  }
};
exports["default"] = _default;
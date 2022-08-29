"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("@/api");

var _default = {
  namespaced: true,
  state: {
    // TypeNav组件 商品分类数据
    CategoryList: [],
    // 轮播图数据
    BannerList: [],
    // FLoor组件数据
    FloorList: [],
    keyword: ''
  },
  actions: {
    //获取商品分类的数据，并提交到mutations
    getCategory: function getCategory(_ref) {
      var commit, result;
      return regeneratorRuntime.async(function getCategory$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.next = 3;
              return regeneratorRuntime.awrap((0, _api.reqCategoryList)());

            case 3:
              result = _context.sent;

              if (result.code == 200) {
                commit('GETCATEGORY', result.data);
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    // 获取轮播图数据，并提交到mutations
    getBannerList: function getBannerList(_ref2) {
      var commit, result;
      return regeneratorRuntime.async(function getBannerList$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit;
              _context2.next = 3;
              return regeneratorRuntime.awrap((0, _api.reqBannerList)());

            case 3:
              result = _context2.sent;

              if (result.code == 200) {
                commit('GETBANNERLIST', result.data);
              }

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    getFloorList: function getFloorList(_ref3) {
      var commit, result;
      return regeneratorRuntime.async(function getFloorList$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref3.commit;
              _context3.next = 3;
              return regeneratorRuntime.awrap((0, _api.reqFloorList)());

            case 3:
              result = _context3.sent;

              if (result.code == 200) {
                commit('GETFLOORLIST', result.data);
              }

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  },
  mutations: {
    // 修改state.CategoryList
    GETCATEGORY: function GETCATEGORY(state, categroy) {
      state.CategoryList = categroy;
    },
    GETBANNERLIST: function GETBANNERLIST(state, bannerList) {
      state.BannerList = bannerList;
    },
    GETFLOORLIST: function GETFLOORLIST(state, floorList) {
      state.FloorList = floorList;
    },
    CHANGEKEYWORD: function CHANGEKEYWORD(state, keyword) {
      state.keyword = keyword;
    }
  }
};
exports["default"] = _default;
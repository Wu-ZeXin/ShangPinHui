import {reqBannerList, reqCategoryList, reqFloorList} from '@/api'

export default {
  namespaced: true,

  state:{
    // TypeNav组件 商品分类数据
    CategoryList:[],
    // 轮播图数据
    BannerList:[],
    // FLoor组件数据
    FloorList:[],

    keyword:''
  },  

  actions:{
    //获取商品分类的数据，并提交到mutations
     async getCategory({ commit }) {
      let result =  await reqCategoryList()
      if( result.code == 200 ) {
        commit('GETCATEGORY',result.data)
      }
    },

    // 获取轮播图数据，并提交到mutations
    async  getBannerList({ commit }) {
      let result = await reqBannerList()
      if( result.code == 200 ) {
        commit('GETBANNERLIST',result.data)
      }
    },

    async getFloorList({ commit }) {
      let result = await reqFloorList()
      if( result.code == 200 ) {
        commit('GETFLOORLIST',result.data)
      }
    },
  },

  mutations:{
    // 修改state.CategoryList
    GETCATEGORY(state,categroy) {
      state.CategoryList = categroy
    },

    GETBANNERLIST(state,bannerList) {
      state.BannerList = bannerList
    },

    GETFLOORLIST(state,floorList) {
      state.FloorList = floorList
    },

    CHANGEKEYWORD(state,keyword) {
      state.keyword = keyword
    }
  }
}
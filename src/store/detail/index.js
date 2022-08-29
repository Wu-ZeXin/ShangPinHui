import { reqDetailList, reqAddOrUpdateShopCartList } from '@/api/index'

export default {
  namespaced:true,

  state: {
    DetailList:{}
  },

  actions:{
    async getDetailList({ commit },skuId) {
      let result = await reqDetailList(skuId)
      if(result.code == 200) {
        commit('GETDETAILLIST',result.data)
      }
    },

    // //加入购物车产品||或者更新某一个产品的个数接口
    async addShopCart({ commit }, { skuId,skuNum }) {
      let result = await reqAddOrUpdateShopCartList(skuId,skuNum)
      if(result.code === 200) {
        return 'ok'
      }else {
        return Promise.reject(new Error('failed'))
      }
    }
  },

  mutations:{
    GETDETAILLIST(state,DetailList) {
      state.DetailList = DetailList
    }
  },

  getters:{
    categoryView(state) {
      return state.DetailList.categoryView || {}
    },

    skuInfo(state) {
      return state.DetailList.skuInfo || {}
    },

    spuSaleAttrList(state) {
      return state.DetailList.spuSaleAttrList || []
    }
  }
}
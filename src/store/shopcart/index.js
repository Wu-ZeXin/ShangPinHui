import { reqShopCart, reqUpdateCartChecked, reqDeleteCartById } from '@/api/index'

import { userTemp } from '@/utils/temp_token.js'

export default {
  namespaced: true,

  state: {
    userTempId: userTemp(),

    shopList:[]
  },

  actions: {
    async getShopCart({ commit }) {
      let result = await reqShopCart()
      if( result.code === 200 ) {
        commit('GETSHOPCART',result.data)
      }
    },

    async updateCartChecked({ commit },{ skuId, isChecked }) {
      let result = await reqUpdateCartChecked(skuId,isChecked)
      if( result.code == 200) {
        return "ok"
      } else {
        return Promise.reject('修改失败')
      }
    },

    updateAllCart({ getters, dispatch, commit },isChecked) {
      let arr = []
      getters.shopCartList.cartInfoList.forEach(item => {
        let promise = dispatch("updateCartChecked",{ skuId: item.skuId, isChecked })
        arr.push(promise)
      });
      return Promise.all(arr);
    },

    async deleteCart({ commit },skuId) {
      let result = await reqDeleteCartById(skuId)
      if(result.code == 200) {
        return "ok"
      } else {
        return Promise.reject(new Error('failed'))
      }
    },

    deleteCartByChecked({ getters, dispatch}) {
      let arr = []
      getters.shopCartList.cartInfoList.forEach(item => {
        if(item.isChecked == '1') {
          let promise = dispatch('deleteCart',item.skuId)
          arr.push(promise)
        }
        
      });

      return Promise.all(arr)
    }
  },

  mutations: {
    GETSHOPCART(state,shopList) {
      state.shopList = shopList
    }
  },

  getters: {
    shopCartList(state) {
      return state.shopList[0] || {}
    }
  }
}
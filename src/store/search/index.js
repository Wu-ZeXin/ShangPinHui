import { reqSearchList  } from "@/api"

export default {
  namespaced:true,

  state :{
    searchList: [],

    trademark:''
  },

  actions:{
    async getSearchList({ commit },data) {
      let result = await reqSearchList(data)
      if( result.code == 200 ) {
        commit('GETSEARCHLIST',result.data)
      }
    }
  },

  mutations:{
    GETSEARCHLIST(state,searchList) {
      state.searchList = searchList
      // console.log(state.searchList);
    },

    CHANGETRADEMARK(state,trademark) {
      state.searchList.trademarkList = [trademark]
      state.trademark = trademark
    }
  },

  getters:{

    goodsList(state) {
      return  state.searchList.goodsList || []
    },

    // 品牌数据
    tradeMarkList(state) {
      return state.searchList.trademarkList || []
    },
    
    // 平台数据
    attrsList(state) {
      return state.searchList.attrsList || []
    }

  }
} 
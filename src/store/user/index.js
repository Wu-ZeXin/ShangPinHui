import { reqCode, reqLogin, reqLoginOut, reqRegister, reqUserInfo } from "@/api/index" 
import { setToken, getToken, clearToken } from '@/utils/token'

export default {
  namespaced: true,

  state: {
    code: '',
    userInfo: {},
    token: getToken()
  },

  actions: {
    async getCode({ commit },phone) {
      let result = await reqCode(phone)
      if(result.code == 200) {
        commit('GETCODE',result.data)
      } else {
        return Promise.reject(new Error('failed'))
      }
    },

    async getRegister({ commit },{ phone, code, password}) {
      let result = await reqRegister(phone,code,password)
      if(result.code == 200) {
        return "ok"
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    async getLogin({ commit }, {phone, password}) {
      let result = await reqLogin(phone,password)
      if(result.code == 200) {
        commit('SETTOKEN',result.data.token)
        setToken(result.data.token)
        return "ok"
      } else {  
        return Promise.reject(new Error(result.message))
      }
    },

    async getUserInfo({ commit }) {
      let result = await reqUserInfo()
      if(result.code == 200) { 
        commit('GETUSERINFO',result.data)
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    async userLoginOut({ commit }) {
      let result = await reqLoginOut()
      if(result.code == 200) {
        commit('USERLOGINOUT')
        return "ok"
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
  },

  mutations: {
    GETCODE(state,code) {
      state.code = code
    },

    SETTOKEN(state,token) {
      state.token = token
    },

    GETUSERINFO(state,userInfo) {
      state.userInfo = userInfo
    },

    USERLOGINOUT(state) {
      state.token = ''
      state.userInfo = {}
      clearToken()
    }
    
  },
  
  getters: {

  }
}
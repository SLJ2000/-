import Vue from 'vue'
import Vuex from 'vuex'
import shoppingCart from './shoppingCart'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:'',//登入状态
    showlogin:false,  //显示登入开关
    shoppingCart: []   //购物车数据 
  },
  getters:{
    getUser(state){
      return state.user
    },
    getShowlogin(state){
      return state.showlogin
    }
  },
  mutations: {
    setUser(state,data){
      state.user = data
    },
    setShowlogin(state,data){
      state.showlogin = data
    }
  },
  actions: {
    setUser ({ commit }, data) {
      commit('setUser', data);
    },
    setShowlogin ({ commit }, data) {  // 控制组件
      commit('setShowlogin', data);
    },
  },
  modules: {
    shoppingCart
  }
})

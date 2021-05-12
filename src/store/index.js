/**
 * 状态管理模块
 */
import Vue from 'vue'
import Vuex from 'vuex'

import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

// 思考：这样写的好处是？
// const TOKEN_KEY='TOUTIAO_USER'

const store = new Vuex.Store({
  state: {
    // 存储登录用户的信息 token
    // user: JSON.parse(localStorage.getItem('token'))
    user: getItem('token')
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 防止刷新丢失数据 => 把数据备份到本地存储
      // localStorage.setItem('token', JSON.stringify(state.user))
      setItem('token', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store

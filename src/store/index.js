/**
 * 状态管理模块
 */
import Vue from 'vue'
import Vuex from 'vuex'

import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    /* 存储登录用户的信息 思考：作用是？*/
    // user: JSON.parse(localStorage.getItem('token'))
    user: getItem('token')
  },
  mutations: {
    setUser(state, data) {
      state.user = data

      /* 防止刷新丢失数据 => 把数据备份到本地存储 */
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

/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'

// 基本路径
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/'
  // baseURL: 'http://toutiao-app.itheima.net/'
  baseURL: 'http://localhost:8000'
})

// 请求拦截器
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default request

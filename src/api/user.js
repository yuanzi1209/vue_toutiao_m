/**
 * 请求用户数据模块
 */
import request from '../utils/request'
import store from '@/store'

export const login = (data) => {
  return request({
    method: 'POST',
    // url: '/app/v1_0/authorizations',
    url: '/v1_0/authorizations',
    data
  })
}

export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    // url: `/app/v1_0/sms/codes/${mobile}`
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    // url: '/app/v1_0/user',
    url: '/v1_0/user',
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 获取频道列表
export const getChannelList = () => {
  return request({
    method: 'GET',
    // url: '/app/v1_0/user/channels',
    url: '/v1_0/user/channels',
  })
}

// 关注用户
export const addFollow = (userId) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      userId
    }
  })
}

// 取消关注用户
export const cancelFollow = (userId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`,
  })
}

// 获取用户个人资料
// 注意点：获取自己的信息不用传参
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: `/v1_0/user/profile`,
  })
}
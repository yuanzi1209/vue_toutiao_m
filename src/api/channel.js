/**
 * 请求频道后台数据模块
 */
import request from '../utils/request'

// 获取全部频道列表
export const getAllChannelList = () => {
    return request({
        method: 'GET',
        // url: '/app/v1_0/channels',
        url: '/v1_0/channels',
    })
}

// 获取我的频道
export const getMyChannel = (channel) => {
    return request({
        method: 'PATCH',
        // url: '/app/v1_0/user/channels',
        url: '/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}

// 删除指定频道
export const removeChannelById = (id) => {
    return request({
        method: 'DELETE',
        // url: `/app/v1_0/user/channels/${id}`,
        url: `/v1_0/user/channels/${id}`,
    })
}
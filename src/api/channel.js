/**
 * 请求频道后台数据模块
 */
import request from '../utils/request'

// 获取全部频道列表
export const getAllChannelList = ()=> {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels',
    })
}
/**
 * 搜索请求后台数据模块
 */
import request from '../utils/request'

export const getSearchSuggestion = (q) => {
    return request({
        method: 'GET',
        // url: '/app/v1_0/suggestion',
        url: '/v1_0/suggestion',
        params: {
            q
        }
    })
}

export const getSearchResult = (params) => {
    return request({
        method: 'GET',
        // url: '/app/v1_0/search',
        url: '/v1_0/search',
        params
    })
}
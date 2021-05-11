/**
 * 文章请求后台数据模块
 */
import request from '../utils/request'

// 获取文章列表
export const articleList = params => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params,
    })
}
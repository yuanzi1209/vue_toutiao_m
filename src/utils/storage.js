/**
 * 本地存储模块
 */
// 存储数据
export const setItem = (key, value) => {
    if (value !== null && typeof value === 'object') {
        value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
}

// 获取数据
export const getItem = (key) => {
    const data = localStorage.getItem(key)
    // 把 JSON 格式字符串转成对象 思考：如何判断JSON格式字符串？（正则）
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }

}

// 删除数据
export const removeItem = key => {
    localStorage.removeItem(key)
}
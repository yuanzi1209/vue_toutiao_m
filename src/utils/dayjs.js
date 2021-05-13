import Vue from 'vue'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

// 导入并配置relativeTime
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})

dayjs.locale('zh-cn')

// console.log(dayjs().format('YYYY-MM-DD'))


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入 vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// 导入 amfe-flexible => 设置 rem 基准值
import 'amfe-flexible'

// 导入 dayjs
import '@/utils/dayjs'

// 导入全局样式
import './styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

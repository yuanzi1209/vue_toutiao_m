/**
 * 路由模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'layout',    // 如果父路由有默认子路由，则name无意义
    component: () => import('@/views/layout'),
    children: [
      {
        // 默认子路由
        path: '', name: 'home', component: () => import('@/views/home')
      },
      {
        path: '/qa', name: 'qa', component: () => import('@/views/qa')
      },
      {
        path: '/video', name: 'video', component: () => import('@/views/video')
      },
      { path: '/my', name: 'my', component: () => import('@/views/my') }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  // 动态路由
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 开启props传参 => 将路由动态参数映射到组件的 props 中
    props:true
  },
]

const router = new VueRouter({
  routes
})

export default router

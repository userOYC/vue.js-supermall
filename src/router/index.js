import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home'
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '首页',
    component: Home

  },
  {
    path: '/category',
    name: '分类',
    component: () => import('../views/categroy/Categroy')
  },
  {
    path: '/cart',
    name: '购物车',
    component: () => import('../views/cart/Cart')
  },
  {
    path: '/profile',
    name: '我的',
    component: () => import('../views/profile/Profile')
  },
  {
    path: '/detail:iid',
    name: '商品详情',
    component: () => import('../views/detail/Detail')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function (to, from, next) {
  next() /* 必须调用next方法 */
  document.title = to.name /* 设置标题为路由中定义好的名字 */
})

export default router

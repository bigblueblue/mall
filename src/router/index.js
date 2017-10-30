import Vue from 'vue'
import Router from 'vue-router'
import goodList from '@/components/goodList'
import Home from '@/components/Home'
import goodDetail from '@/components/goodDetail'
import shopCart from '@/components/shopCart'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'         //路由重定向
    },
    {
      path: '/home',            //定义路由规则
      component: Home
    },
    {
      path: '/shopcart',
      component: shopCart
    },
    {
      name: 'goodlist',
      path: '/goodlist/:id',
      component: goodList
    },
    {
      name: 'goodlist',
      path: '/goodlist',
      component: goodList
    },
    {
      name: 'gooddetail',
      path: '/gooddetail/:cid',
      component: goodDetail
    }
  ]
})

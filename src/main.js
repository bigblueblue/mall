// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '../node_modules/axios'
import '../static/css/normalize.css'            //引入全局样式
import '../static/css/public.css'
import '../static/iconfont/iconfont.css'
import headerDiv from './components/common/headerDiv'
import oneGood from './components/common/oneGood.vue'
import domain from './quanju/domain.js'    //定义vue的全局变量,跟axios差不多
Vue.prototype.domain = domain


Vue.config.productionTip = false
Vue.prototype.axios = axios

Vue.component('header-div', headerDiv)    //注册全局组件
Vue.component('one-good', oneGood)
Vue.filter('moneyFormat', function (value) {        //注册全局过滤器
  return Number(value).toFixed(2)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

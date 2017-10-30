<template>
  <div id="headerDiv">
    <header class="header">
      <div class=" w-1200 topheader clearfix">
        <div class="navbar-header f-fl">
          <router-link to="" class="navbar-brand"><img :src="logo" alt=""></router-link>
        </div>
        <div class="f-fr user-nav clearfix">
          <form action="" class="navbar-form zy-search">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="请输入关键词" name="key">
              <button class="button iconfont"></button>
            </div>
          </form>
          <ul class="nav nav-login" v-if="false">
            <li class="col-6 mr10">您好！欢迎来到职易网</li>
            <li><a class="lz" href="login.html">登录</a></li>
            <li><a class="lz" href="register.html">注册</a></li>
          </ul>
          <ul class="nav nav-login success-login" v-else>
            <li id="shopcart">
              <router-link to="/shopcart">
                <span class="iconfont icon-gouwuche"><i>4</i></span>
              </router-link>
            </li>
            <li><a class="lz" href="login.html">
               <img :src="userUrl" alt="" />
               <span>哈哈哈哈哈dddeeebb</span></a>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="nav-bar">
      <div class="w-1200 nav-menu">
          <a v-for="item in navs">{{ item.text }}</a>
      </div>
    </div>
  </div>
</template>
<style>
  .icon-gouwuche{
    font-size: 20px;
    color: #666;
  }
  #shopcart{
    position: relative;
  }
  .success-login li  span i {
    position: absolute;
    font-style: normal;
  }
  .success-login li  i {
    min-width: 14px;
    text-align: center;
    line-height: 14px;
    font-size: 12px;
    background: #f55600;
    border-radius: 7px;
    top: 26px;
    left: 14px;
    color: #fff;
    padding: 0 2px;
    font-family: 'arial';
  }
  .header {
    padding: 10px 0;
    background-color: #fff;
   /* box-shadow: 1.5px 2px 9px 0 rgba(0, 0, 0, 0.054);*/
  }
  .header .navbar-brand {
      display: block;
      height: 50px;
      padding: 15px 10px 15px 0px;
  }
  .topheader{
      height: 80px;
  }
  .user-nav .nav {
      position: relative;
      z-index: 1;
      background-color: #fff;
  }
  .header .index-nav.nav{
      margin-left: 20px;
  }
  .user-nav .nav-login {
      display: inline-block;
      vertical-align: middle;
  }
  .user-nav .nav>li {
      height: 80px;
      line-height: 80px;
      float: left;
      vertical-align: middle;
  }
  .user-nav .nav>li .lz {
      padding: 0px 10px;
      color: #0489e8;
      font-size: 16px;
  }
  .user-nav .nav>li .lz img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .user-nav .nav>li:last-child .lz{
      padding-right: 0;
  }
  .zy-search {
      height: 30px;
      border-width: 0;
      display: inline-block;
      vertical-align: middle;
  }
  .zy-search .form-group {
      background-color: #eee;
      border: transparent;
      border-radius: 50px;
      -moz-border-radius: 50px;
      -webkit-border-radius: 50px;
      -o-border-radius: 50px;
      -ms-border-radius: 50px;
      box-shadow: none;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      -o-box-shadow: none;
      -ms-box-shadow: none;
      width: 190px;
      height: 100%;
      line-height: 30px;
      position: relative;
      margin-right: 20px;
  }
  .zy-search .form-control {
      background: transparent;
      border: transparent;
      border-radius: 50px;
      -moz-border-radius: 50px;
      -webkit-border-radius: 50px;
      -o-border-radius: 50px;
      -ms-border-radius: 50px;
      box-shadow: none;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      -o-box-shadow: none;
      -ms-box-shadow: none;
      height: 30px;
      padding-left: 12px;
  }
  .zy-search .button {
      color: #0489e8;
      display: inline-block;
      padding: 0px 12px;
      font-size: 24px;
      position: absolute;
      top: 0;
      right: 0;
      border: 0 none;
      background-color: transparent;
      outline: none;
  }
  .nav-bar{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #00A3FE;
    text-align: left;
  }
  .nav-menu{
      height: 100%;
  }
  .nav-menu a{
      display: inline-block;
      color: #fff;
      font-size: 16px;
      padding: 0 20px;
  }
  .nav-menu a.active{
      background-color: ;
  }
</style>
<script>
export default{
  name: 'headerDiv',
  data () {
    return {
      navs: [
        {text: '首页'},
        {text: '在线课程'},
        {text: '专业技能'},
        {text: '资源中心'},
        {text: '培训认证'},
        {text: 'APP下载'},
        {text: '积分商城'}
      ]
    }
  },
  props: ['logo', 'userUrl']
}
</script>
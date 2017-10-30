<template>
  <div id="Home">
    <div class="w-1200 classify-banner">
      <div class="lf-classify">
        <p class="col-main title">商品分类</p>
        <ul class="classify-box">
          <li v-for="item in navs">
            <router-link :to="{ name: 'goodlist', params:{ id:item.id }}">{{ item.categoryName }}</router-link>
          </li>
        </ul>
      </div>
      <div id="slideBox" class="slideBox">
        <div class="hd">
          <ul><li v-for="(value,index) in bannerData.length" :class="{on: isOn === index}" :key="index" @click="changeOn(index)">{{index}}</li></ul>
        </div>
        <div class="bd">
          <transition name="imgFade">
            <ul>
              <li v-for="(value,index) in bannerData" :key="index" v-show="isOn === index"><img :src="value.bannerUrl" /></li>
            </ul>
          </transition>
        </div>
      </div>
    </div>
    <div class="w-1200 goods-content">
      <div class="top-content f-cb">
        <h2 class="lf-title">
          <span class="iconfont icon-remen"></span>
          热门推荐
        </h2>
          <router-link to="/goodlist" class="f-fr more-goods">更多></router-link>
      </div>
      <div class="goods-list">
        <one-good :courseArr='val' v-for="val in courseData"></one-good>
      </div>
    </div>
  </div>
</template>
<style>
  .classify-banner{
      height: 360px;
      margin: 20px auto;
      font-size: 0;
  }
  .classify-banner>div{
      display: inline-block;
      vertical-align: top;
  }
  .lf-classify{
      background-color: #f5f8fa;
      width: 300px;
      height: 100%;
      border: 1px solid #e6ebed;
  }
  .lf-classify .title{
      padding-left: 20px;
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      border-bottom: 1px solid #dfe3e6;
  }
  .classify-box li a{
      font-size: 16px;
      color: #4A4C4D;
      display: block;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
  }
  .classify-box li a:hover{
      background-color: #E8EBED;
      color: #00A3FE;
  }
  /*轮播图样式*/
  .slideBox{ width:900px; height:100%; overflow:hidden; position:relative;  }
  .slideBox .hd{ height:6px; overflow:hidden; position:absolute; left:50%; bottom:18px; z-index:1; -webkit-transform: translateX(-50%);
     -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
       -o-transform: translateX(-50%);
          transform: translateX(-50%);}
  .slideBox .hd ul{ overflow:hidden; zoom:1; }
  .slideBox .hd ul li{ float:left; margin-right:5px;  width:24px; height:6px; text-align:center; background:rgba(255,255,255,.5); cursor:pointer; font-size: 0; }
  .slideBox .hd ul li:last-child{
      margin-right: 0;
  }
  .slideBox .hd ul li.on{ background:#ff4a00;  }
  .slideBox .bd{ position:relative; height:100%; z-index:0;   }
  .slideBox .bd li{ zoom:1; vertical-align:middle; }
  .slideBox .bd img{ width:100%; height:100%; display:block;  }
  /*商品那块*/
  .goods-content .top-content{
      height: 52px;
      line-height: 52px;
      padding-right: 10px;
  }
  .top-content .lf-title{
       font-size: 18px;
      color: #333;
     display:inline-block;
  }
  .lf-title .iconfont{
      color: #00A3FE;
      vertical-align: middle;
  }
  .lf-title .icon-remen{
      font-size: 27px;
  }
  .lf-title .icon-xinpintuijian{
      font-size: 27px;
  }
  .top-content  .more-goods{
      color: #999;
      font-size: 14px;
  }
  .top-content  .more-goods:hover{
      color: #0489e8;
  }
  /*轮播图过渡样式*/
  .imgFade-enter,.imgFade-leave{
    opacity: 0;
  }
  .imgFade-enter-active,.imgFade-leave-active{
    opacity: 1;
  }
</style>
<script>
export default {
  name: 'app',
  data () {
    return {
      navs: [],
      bannerData: [],
      courseData: [],
      isOn: 0
    }
  },
  created () {
    setInterval(this.autoPlay, 3000)
  },
  mounted: function () {
    this.getBanner()
    this.getClassify()
    this.getRecommend()
  },
  methods: {
    getBanner: function () {
      var _this = this
      _this.axios.get(this.domain.api + '/service/app/getIndex.htm ')
      .then(function (res) {
        console.log(res)
        _this.bannerData = res.data.result.bannerList
      })
      .catch(function (error) {       //捕获没有获取到数据的异常
        console.log(error)
      })
    },
    getClassify: function () {
      var _this = this
      _this.axios.get(this.domain.api + '/service/course/postTypes.htm')
      .then(function (res) {
        console.log(res)
        function getFirst(a) {
          return a['pCategoryId'] === '0'
        }
        var arr = res.data.result.filter(getFirst)    //es5的高阶函数filter
        /*
        res.data.result.forEach(function (value, index) {
          if (value['pCategoryId'] === '0') {
            arr.push(value)
          }
        })*/
        arr.splice(6, 8)
        console.log(arr)
        _this.navs = arr
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getRecommend: function () {
      var _this = this
      _this.axios.get(this.domain.api + '/service/course/postCourseList.htm&num=6')
      .then(function (res) {
        console.log(res)
        _this.courseData = res.data.pageData
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    changeOn: function (a) {
      this.isOn = a
    },
    autoPlay: function () {
      this.isOn ++
      if (this.isOn === this.bannerData.length) {
        this.isOn = 0
      }
    }
  }
}
</script>
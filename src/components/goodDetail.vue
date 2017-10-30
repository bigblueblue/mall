<template>
  <div class="goods-detail">
    <div class="w-1200">
      <ul class="top-nav">
          <li>
              <router-link to='/home'>首页</router-link>
              <span>&gt;</span>
          </li>
          <li>
              <router-link to='/goodlist'>商品列表</router-link>
              <span>&gt;</span>
          </li>
          <li>
              <a>商品详情</a>
          </li>
      </ul>
      <div class="course-productbox">
        <a><img :src="courseImg"></a>
        <div class="product-details f-cb">
            <div class="courseName">
                <h1>{{courseName}}</h1>
            </div>
            <div class="price-box f-cb">
                <p class="first">
                    <span>价格：</span>
                    <span class="col-orange">{{isFreeFunc}}</span>
                </p> 
            </div>
            <div class="class-hour">
                <p class="first">
                     <a>课时：</a><span>{{lessonNumber | lessonNumFunc('课时')}}</span>
                </p>
                <p class="second">
                    <a>学习次数：</a><span>{{studyCount | studyNumFunc('次')}}</span>
                </p>
            </div>
            <div class="class-score">
                <a>评分：</a>
                <!-- <img :src="pic1" alt="" />
                <img src="../assets/star.png" alt="" /> -->
                <div class="scorebox">
                    <img v-for="item in this.domain.commentStar(stars)" :src="item">
                </div>
            </div>
            <div class="study-button ">
                <a href="submit-order.html" class="study">立即兑换</a>
            </div>
        </div>
      </div>
    </div>
    <div class="w-1200 good-detail">
        <!--左-->
        <div class="course-detail-left">
          <ul class="sub-nav f-cb">
            <li :class="{current:isCurrent == index}" v-for="(content,index) in tabs" @click="changeTabs(index,content.view)">{{ content.text }}</li>
          </ul>
          <div class="tab-content">
            <keep-alive>
              <component :is="currentView" :plArr="comment" :kcDesc="courseDesc" :mlArr="chapterArr" :noPic="noComment" :isShowFlag="isShow" :bgImg="bg" :defaultPic="dePic"></component>
            </keep-alive>
          </div>
        </div>  
        <!--右-->
        <div class="recommend-right">
          <!--推荐课程 go-->
          <div class="recom-good">
              <h2>类似课程</h2>
              <div class="recom-good-one" v-for="obj in similarCourse">
                <router-link :to="{name: 'gooddetail',params:{cid:obj.courseId}}">
                  <img :src="obj.courseUrl">
                  <a class="ellipsis">{{ obj.courseName }}</a>
                  <div class="recom-time">
                      <span class='col-9'>{{ obj.lessons | lessonNumFunc('课时')}}</span>
                      <span class="default" v-bind:class="{orange: isOrange}">{{isFreeFunc}}</span>
                  </div>
                </router-link>
              </div>
          </div>
          <!--推荐课程 end-->
        </div>
    </div>
  </div>
</template>
<script>
  import nocomment from '../assets/noComment.png'
  import defaultPic from '../assets/per-photo.png'
  import intro from './tabcontent/intro.vue'
  import list from './tabcontent/list.vue'
  import comment from './tabcontent/comment.vue'
  export default{
    data () {
      return {
        courseImg: '',
        courseName: '',
        isFree: '',
        lessonNumber: '',
        studyCount: '',
        stars: '',
        similarCourse: [],
        isOrange: false,
        bg: {
          backgroundImage: 'url(' + require('../assets/card-label.png') + ' )'
        },
        tabs: [
          {
            text: '课程介绍',
            view: intro
          },
          {
            text: '课程目录',
            view: list
          },
          {
            text: '课程评论',
            view: comment
          }
        ],
        isCurrent: 0,
        currentView: intro,
        courseDesc: '',
        chapterArr: [],
        comment: [],
        dePic: defaultPic,
        totalComments: '',
        isShow: true,
        noComment: nocomment
      }
    },
    beforeCreate: function () {
      document.getElementsByTagName('body')[0].className = 'grayBg'
    },
    created () {
      this.getCourseInfo()
      this.getSimilarCourse()
      this.getList()
      this.getComment()
    },
    beforeDestory: function () {
      document.body.removeAttribute('class', 'grayBg')
    },
    methods: {
      getCourseInfo: function () {
        var cid = this.$route.params.cid
        var _this = this
        _this.tabs[2].text = '课程评论'
        _this.axios.get(this.domain.api + '/service/course/postCourseDetail.htm&courseId=' + cid)
        .then(function (res) {
          _this.courseImg = res.data.result.courseUrl
          _this.courseName = res.data.result.courseName
          _this.isFree = res.data.result.discountPrice
          _this.lessonNumber = res.data.result.lessonNumber
          _this.studyCount = res.data.result.studyCount
          _this.stars = res.data.result.stars
          _this.courseDesc = res.data.result.courseDescription
          _this.tabs[2].text += '(' + res.data.result.commentCount + ')'
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      getSimilarCourse: function () {
        var cid = this.$route.params.cid
        var _this = this
        _this.axios.get(this.domain.api + '/service/home/getSimilarCourse.htm&courseId=' + cid + '&number=3')
        .then(function (res) {
          _this.similarCourse = res.data.result
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      getList: function () {
        var cid = this.$route.params.cid
        var _this = this
        _this.axios.get(this.domain.api + '/service/course/postChapters.htm&courseId=' + cid)
        .then(function (res) {
          _this.chapter = res.data.result
          var arr1 = []
          _this.chapter.forEach(function (value, index) {
            if (value.parentId === 0) {
              arr1.push(value)
            }
          })
          var Arr = []
          arr1.forEach(function (val, i) {
            var arr2 = []
            var obj = {}
            _this.chapter.forEach(function (value, index) {
              if (arr1[i].id === _this.chapter[index].parentId) {
                arr2.push(_this.chapter[index])
              }
            })
            obj['chapter'] = arr1[i]
            obj['name'] = arr2
            Arr.push(obj)
          })
          _this.chapterArr = Arr
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      getComment: function () {
        var cid = this.$route.params.cid
        var _this = this
        _this.axios.get(this.domain.api + '/service/resources/getResCommList.htm&commentType=6&resId=' + cid)
        .then(function (res) {
          if (res.data.pageData.length === 0) {
            _this.isShow = false
            _this.totalComments = 0
          } else {
            _this.isShow = true
            _this.comment = res.data.pageData
            _this.totalComments = res.data.maxResult
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      changeTabs: function (i, v) {
        this.isCurrent = i
        this.currentView = v
      }
    },
    filters: {
      lessonNumFunc: function (val2, unit) {
        return val2 + unit
      },
      studyNumFunc: function (val3, unit2) {
        return val3 + unit2
      }
    },
    computed: {
      isFreeFunc: function () {
        var val = this.isFree
        if (val === undefined) {
          this.isOrange = false
          return '免费'
        } else {
          this.isOrange = true
          return Number(val).toFixed(2)
        }
      }
    },
    watch: {
      '$route' (to, from) {
        console.log(from)
        this.getCourseInfo()
        this.getSimilarCourse()
        this.getList()
        this.getComment()
      }
    }
  }
</script>
<style>
  .grayBg{
    background: #f4f6f8;
  }
  .course-productbox {
    background: #fff;
    overflow: hidden;
    padding: 20px;
    position: relative;
    margin: 20px auto;
    margin-top: 0;
  }
  .course-productbox a img {
      width: 480px;
      height: 270px;
      float: left;
  }
  .course-productbox .product-details {
      width: 670px;
      float: left;
      margin-left: 10px;
      height:270px;
      position: relative;
  }
  .courseName {
      overflow: hidden;
      padding-left: 5px;
  }
  .courseName h1 {
      font-size: 18px;
      color: #333;
      line-height: 25px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 16px;
  }
  .courseName h1:hover {
      color: #0489e8;
      cursor: pointer;
  }
  /*价格*/
  .price-box {
      line-height: 50px;
      height: 50px;
      background-color: #F4F6F8;
      color: #999;
      padding:0 20px;
  }
  .price-box .col-orange {
      font-size: 30px;
  }
  .price-box .ruled {
      font-size: 14px;
      margin-left: 50px;
  }
  .product-details .first{
      /*width: 100px;*/
      display: inline-block;
  }
  .price-box .first{
      height: 50px;
  }
  /*学习信息*/
  .class-hour,.class-score{
      overflow: hidden;
      color: #999;
      padding: 0 20px;
      height: 46px;
      border-bottom: 1px #eee solid;
      line-height: 46px;
  }
  .class-hour p{
      display: inline-block;
  }
  .class-hour .second{
      margin-left: 50px;
  }
  .class-score{
       border-bottom: none;
  }
  .class-score .scorebox {
      display: inline-block;
  }

  .class-hour a, .class-score a {
      color: #999;
      cursor: default;
  }
  .class-hour span, .class-score span {
      color: #333;
  }
  .class-score .scorebox img {
      margin-top: -2px;
      margin-right: 4px;
  }
  .study-button a{
      display: block;
      width: 150px;
      text-align: center;
      font-size: 18px;
      background: #ff6b0a;
      color: #fff;
      margin-right: 10px;
      height: 40px;
      line-height: 40px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      -ms-border-radius: 4px;
      -o-border-radius: 4px;
      border-radius: 4px;
  }
  .study-button .study{
      position: absolute;
      bottom: 20px;
      left: 16px;
  }
  .study-button .sale-out{
      background: #999;
  }
  .study-button a.study:hover {
      background: #ff7e29;
  }
  .study-button a.sale-out:hover{
      background:#999;
      cursor: default;
  }
  .tab-content{
      min-height: 450px;
  }
  /*商品评论*/
  .good-detail{
      font-size: 0;
      margin-bottom: 20px;
  }
  .good-detail>div{
      display:inline-block;
      vertical-align: top;
      background-color: #fff;
      
  }
  .good-intro-box{
      padding: 20px ;
     /* text-align: center;*/
  }
  .course-detail-left{
      width: 940px;
  }
  .recommend-right{
      width: 240px;
      margin-left: 20px;
  }
  .sub-nav{
      height: 76px;
      line-height: 74px;
      border-bottom: 1px solid #eee;

  }
  .sub-nav li{
      display: inline-block;
      font-size: 16px;
      padding: 0 20px;
      cursor: pointer;
  }
  .sub-nav a{
      
  }
  .sub-nav li.current {
      display: inline-block;
      color: #0489E8;
      border-top: 4px solid #0489E8;
  }
  /*评论*/
  .comments-item{
      font-size: 0;
      padding: 30px 10px;
      border-bottom: 1px solid #eee;
  }
  .comments-item .userPic img{
      width: 60px;
      height: 60px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      -ms-border-radius: 50%;
      -o-border-radius: 50%;
      border-radius: 50%;
  }
  .comments-item .column-left{
      display: inline-block;
      vertical-align: top;
      margin-left: 20px;
      width: 800px;
  }
  .column-left .p-column{
      color: #999;
      line-height: 25px;
  }
  .column-left .p-column a{
      color: #999; 
  }
  .column-left .scorebox{
      margin: 5px 0 16px 0;
  }
  .column-left .scorebox img{
      margin-right: 5px;
  }
  .column-left .comment-area{
      line-height: 25px;
  }
  /*右边推荐*/
  .recom-good{
      padding: 0 20px 20px;
  }
  .recom-good h2{
      font-size: 18px;
      line-height: 25px;
      color: #333;
      padding: 16px 0;
      border-bottom: 1px solid #DCDCDC;
  }
  .recom-good-one{
      width: 200px;
      margin-top: 20px;
  }
  .recom-good-one img{
      width: 200px;
      height: 113px;
  }
  .recom-good-one a.ellipsis{
      width: 100%;
      display: block;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
  }
  .recom-good-one .recom-time{
       padding: 0 10px;
       overflow: hidden;
  }
  .recom-time span.col-9{
      font-size: 13px;
  }
  .recom-time span.default{
      float: right;
      font-size: 14px;
      color: #0489e8;
  }
  .recom-time span.orange{
      float: right;
      font-size: 14px;
      color: orange;
  }
  .cousre-introduce{
  padding-bottom: 20px;
  border-bottom: 1px solid #dcdcdc;
  }
  .cousre-introduce .exam-tit {
    overflow: hidden;
  }
  .exam-tit .exam-box{
    padding: 0 20px;
    margin-top: 10px;
  }
  .cousre-introduce .exam-tit em,.introduce-cont em {
    
    font-size: 16px;
    padding: 0 20px;
    line-height: 30px;
  }
  .cousre-introduce .exam-tit a {
    display: inline-block;
    padding: 0 5px;
    line-height: 30px;
    height: 30px;
    border: 1px solid #0489e8;
    color: #0489e8;
    margin-right: 20px;
    font-size: 13px;
    /*border-radius: 2px;*/
  }
  .cousre-introduce .exam-tit a:hover {
    background: #0489e8;
    color: #fff;
  }
  .cousre-introduce .introduce-cont {
    margin-top: 40px;
    min-height: 400px;
  }
  .cousre-introduce .introduce-cont p {
    padding: 0 20px;
    line-height: 26px;
    color: #666;
    word-wrap: break-word;
  }
  .lesson-catalog-box{
    padding:0 20px;margin-top: 20px;
  }
  .lesson-catalog-name h3{
    font-size: 16px;
    /*font-weight: 700;*/
  }
  .course-detail-left ul.fixed-sm-nav{
    position: fixed;
    border:1px solid #eee;
    /*border-bottom: 1px solid #0489e8;*/
    z-index: 999;
    top: 0;
    background: #fff;
    width: 940px;
    

  }
  /*-------------------------------课程目录--------------------------------------*/
  .course-listbox {
    margin-top: 20px;
  }
  .course-listbox .table-top {
    background: #f4f6f8;
    line-height: 60px;
    padding: 0 20px;
    font-size: 16px;
  }
  .course-listbox .table-cont {
    line-height: 40px;
    padding: 0 0 0 20px;
    overflow: hidden;
    position: relative;
    margin: 10px 0;
    background: #fff;
    cursor: pointer;
    -webkit-transition: background-color .25s ease;
       -moz-transition: background-color .25s ease;
        -ms-transition: background-color .25s ease;
         -o-transition: background-color .25s ease;
            transition: background-color .25s ease;
  }
  .course-listbox .table-cont:hover{
    background: #edf5fa;
  }
  .course-listbox .table-cont .study-logo{
    width: 14px;
    height: 14px;
    display:inline-block;
    float:left;
    margin:13px 10px 13px 4px;
    /*background: url(../images/card-label.png) no-repeat;*/
  }
  /*已经学完的标识*/
  .course-listbox .table-cont span.has-studyed{
    background-position: -32px -60px;
  }
  .course-listbox .table-cont span.studying{
    background-position: -16px -60px;
  }
  .course-listbox .table-cont span.no-study{
    background-position: 0px -60px;
  }
  .course-listbox .table-cont .hoverBtn{
    display:none;
    float: right;
    padding:0 12px;

  }
  .course-listbox .table-cont .icon-bofang {
    display: block;
    width: 30px;
    float: left;
    color: #999;
  }
  .course-listbox .table-cont .icon-bofang:hover {
    cursor: pointer;
  }
  .course-listbox .table-cont .title {
    display: block;
    float: left;
    overflow: hidden;
    margin-right: 40px;
  }
  .course-listbox .table-cont .time {
    float: right;
    color: #999;
    margin-right: 20px;
  }
  .course-listbox .table-cont .homeworks, .course-listbox .table-cont .sees, .zb-forcast {
    display: inline-block;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border: 1px solid #0489e8;
    color: #0489e8;
    padding: 0px 3px;
    text-align: center;
    height: 18px;
    line-height: 16px;
    font-size: 10px;
  }
  .course-listbox .table-cont .sees {
    margin: 11px 0;
    margin-right: 10px;
    border: 1px solid #ff6b0a;
    color: #ff6b0a;
  }
  .zb-forcast {
    padding: 0 4px;
    background: #fff7f2;
    border: 1px solid #f7cbaf;
    color: #ff6b0a;
  }
  .zb-forcast:hover {
    color: #ff6b0a;
  }

  /*.course-listbox .table-cont .sees{background:#0489e8;color:#fff;}*/
  .course-listbox .table-cont .sees:hover {
    background: #ff6b0a;
    color: #fff;
  }
  .hide{
    display: none; 
  }
</style>
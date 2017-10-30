<template>
  <div id="goodList">
    <div class="w-1200 ">
      <ul class="top-nav">
          <li>
              <router-link to='/home'>首页</router-link>
              <span>&gt;</span>
          </li>
          <li>
              <a>商品列表</a>
          </li>
      </ul>
      <div class="menu-bar">
          <ul class="menu-box">
              <li v-bind:class="{ current: isCurrent === item.id }" v-for="(item,index) in navs" :key="item.id" v-on:click="changeCur(item.id)" :name="item.id"><router-link :to="{ name: 'goodlist', params:{ id:item.id }}">{{ item.categoryName }}</router-link></li>
          </ul>
      </div>
      <div class="second-bar">
          <a href="#" class="chosen">按发布时间</a>
          <a href="#">按人气</a>
          <a href="#">按积分<span class="paixu"></span>
          </a>
      </div>
      <!-- 显示5排才有分页 -->
      <div class="goods-list">
        <one-good :courseArr='val' v-for="val in courseData"></one-good>
      </div>
      <!-- <div>{{$route.params.id}}</div> -->
    </div>
  </div>
</template>
<script>
  export default{
    name: 'goodlist',
    data () {
      return {
        navs: [],
        courseData: [],
        isCurrent: ''
      }
    },
    mounted: function () {
      this.getClassify()
      this.getCourseList()
      this.getCurrent()
      var id = this.$route.params.id
      this.isCurrent = id
    },
    methods: {
      getClassify: function () {
        var _this = this
        _this.axios.get(this.domain.api + '/service/course/postTypes.htm')
        .then(function (res) {
          var arr = []
          res.data.result.forEach(function (value, index) {
            if (value['pCategoryId'] === '0') {
              arr.push(value)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
          arr.splice(6, 8)
          _this.navs = arr
        })
      },
      getCourseList: function () {
        var _this = this
        var ct = ''
        var url = this.domain.api + '/service/course/postCourseList.htm'
        if (_this.$route.params.id) {
          ct = _this.$route.params.id
          url += '&num=6&courseType=' + ct
        }
        _this.axios.get(url)
        .then(function (res) {
          _this.courseData = res.data.pageData
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      changeCur: function (val) {
        this.isCurrent = val
        this.getCourseList()
      },
      getCurrent: function () {
        var id = this.$route.params.id
        console.log(id)
        if (id !== undefined) {
          this.isCurrent = true
        }
      }
    }
  }
</script>
<style>
  .menu-bar{
    line-height: 40px;
    background-color: #F5F8FA;
    border: 1px solid #E6EBED;
    padding: 20px 20px 10px 20px;
    font-size: 0;
  }
  .menu-bar span{
      font-size: 18px;
      color: #222;
  }
  .menu-bar .menu-box{
      display: inline-block;
      overflow: hidden;
      vertical-align: top;
      /*width: 1080px;*/
  }
  .menu-bar .menu-box li{
      float: left;
      margin:0 16px 10px 16px;
      font-size: 16px;
      color: #666;
      padding: 0 8px ;
      cursor: pointer;
  }
  .menu-bar .menu-box li a{
      font-size: 16px;
      color: #666;
      padding: 8px ;
  }
  .menu-bar .menu-box li.current {
      background-color:#E1EAF0;
      color: #00A3FE;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      -ms-border-radius: 6px;
      -o-border-radius: 6px;
      border-radius: 6px;
  }
  .menu-bar .menu-box li:hover a{
      background-color:#E1EAF0;
      color: #00A3FE;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      -ms-border-radius: 6px;
      -o-border-radius: 6px;
      border-radius: 6px;
  }
  .second-bar{
      margin:20px 0;
      height: 42px;
      line-height: 40px;
      border: 1px solid #E6EBED;
      font-size: 0;
  }
  .second-bar a{
      display: inline-block;
      height: 100%;
      padding:  0 20px;
      font-size: 14px;
      color: #4A4C4D;
  }
  .second-bar a.chosen{
      background-color: #00A3FE;
      color: #fff;
  }
  /*从大到小*/
  .second-bar a .paixu{
      width: 9px;
      height: 14px;
      display: inline-block;
      /*background: url(../images/paixu.png) no-repeat;*/
      vertical-align: middle;
      margin-left: 4px;
  }
  .second-bar a:hover .paixu,.second-bar a.chosen .paixu{
      background-position: -9px 0;
  }
  .second-bar a.chosen .paixu.reverse,.second-bar a .paixu.reverse{
      -webkit-transform: rotate(180deg);
         -moz-transform: rotate(180deg);
          -ms-transform: rotate(180deg);
           -o-transform: rotate(180deg);
              transform: rotate(180deg);
  }
  .second-bar a:hover{
      background-color: #00A3FE;
      color: #fff;
  }
</style>
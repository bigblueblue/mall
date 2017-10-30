<template>
  <div class="container main">
    <div class="container top-gap" v-if="true">
      <p class="sum-up lesson-sumUp" style="margin-top:20px;height:50px;line-height:50px;color:#333;">
      本次您将购买<i class="old-orange">2</i>个机构的<i class="old-orange">2</i>个课程，请在提交订单之前确认以下信息！
      </p>
      <ul class="ul1">
        <li class="li1">
          <div class="check-box ml20">
            <div class="check-btn">
              <input type="checkbox" checked="" style="position: absolute;">
              <i class=" model-check" @click="selectAll()">
                  <span class="iconfont col-zlan" :class="{iconOk: allChose}"></span>
              </i>
            </div>
            <label for="">全选</label>
          </div>
        </li>
        <li class="li2">订单名称</li>
        <li class="li3">价格（元）</li>
        <li class="li4">订单操作</li>
      </ul>
      <div class="one-oran" v-for="(item,index) in cartArr">
        <div class="gwc-table">
          <div class="check-box ml20">
            <div class="check-btn ">
              <input type="checkbox" checked="" style="position: absolute;">
              <i class="model-check" @click="selectOrg(item)">
                <span class="iconfont col-zlan" :class="{iconOk: item.orgIs}"></span>
              </i>
            </div>
            <label for="">{{item[0].orgName}}</label>
          </div>
        </div>
        <div class="good-group">
          <ul class="goods-body" v-for="val in item">
            <li class="li1">
              <div class="check-btn" style="float:none;">
                <input type="checkbox" style="position: absolute;">
                <i class=" model-check" @click="selectItem(val,item)">
                  <span class="iconfont col-zlan" :class="{iconOk: val.isChose}"></span>
                </i>
              </div>
            </li>
            <li class="li2 order-name">
              <router-link :to="{ name:'gooddetail',params: {cid: val.courseId}}">
                <dl class="course-info">
                    <dt class="course-pic">
                        <img :src="val.courseUrl" alt="">
                    </dt>
                    <dd class="course-name">
                        {{val.courseName}}
                    </dd>
                    <dd class="course-from">
                        {{val.orgName}}
                    </dd>
                </dl>
              </router-link>
            </li>
            <li class="li3 lesson-price">{{val.coursePrice | moneyFormat}}</li>
            <li class="li4">
              <a href="#" class="actions gwc-action">
                <span class="iconfont icon-delete col-9"></span>
                <i class="delete">删除</i>
              </a>
            </li>
          </ul>
          <div class="batch-panel gwc-totle-box f-cb">
            <span class="right pr20">该机构小计：<i class="old-orange">{{item.totalOrg||0 | moneyFormat}}</i></span>  
          </div>
        </div>
        
      </div>
      <div class="bottom-pay-box f-cb">
          <div class="check-box ml20 gwc-check">
              <div class="check-btn ">
                  <input type="checkbox" checked="" style="position: absolute;">
                  <i class=" model-check" @click="selectAll">
                      <span class="iconfont col-zlan" :class="{iconOk: allChose}"></span>
                  </i>
              </div>
              <label for="">全选</label>
          </div>
          <a href="#" class="gwc-action-select">删除选中课程</a>
          <div class="r-box f-cb">
              <div class="pay-words left">
                  <p class="fz12">合计：<i class="old-orange really-pay">{{totalMoneyFlag | moneyFormat}}</i></p>
                  <p class="col-zlan">(若您有优惠券，请在订单支付页面使用)</p>
              </div>
              <a href="confirm-order.html" class="right upload go-pay ml20">去结算</a>
          </div>
      </div>
    </div>
      <!-- 默认页面无结果 -->
    <div class="default-page-box pb80" style="padding-top: 80px;margin-bottom: 24px;" v-else>
      <img src="images/shopcart.png" alt="" class="defaultPic">
      <p class="defaultTxt">
          购物车空空的哦~，去看看心仪的课程吧~
      </p>  
      <a href="#" class="defaultBtn">去挑选课程</a>
    </div>
  </div>
</template>
<style>
  .course-pic{
    margin-right: 14px;
    float: left;
  }
  .course-pic img {
    width: 124px;
    height: 70px;
  }
  .batch-panel {
    width: 100%;
    height: 51px;
    line-height: 50px;
    background: #fafafa;
    border-top: 1px solid #eee;
  }
  .lesson-sumUp {
    color: #666;
    width: 100%;
    padding: 0 20px;
    border: none;
    margin: 0;
    background: #DCE9F5;
    height: 30px;
  }
  .sum-up i {
    margin: 0 4px;
    color: #ff6b0a;
  }
  .model-check {
    position: absolute;
    width: 18px;
    height: 18px;
    line-height: 18px;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    display: inline-block;
    background: #fff;
    border: 1px solid #d2d2d2;
    top: 50%;
    margin-top: -9px;
    text-align: center;
    left: 0;
  }
  .check-btn{
    height: 50px;
    width: 22px;
    position: relative;
    display: inline-block;
    float: left;
  }
  .check-btn input {
    top: 50%;
    margin-top: -9px;
    width: 18px;
    height: 18px;
    left: 0;
  }
  ul{
    overflow: hidden;
  }
  .goods-body{
      padding: 10px 0;
  }
  .ul1{
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    background: #f5f5f5;
    overflow: hidden;
  }
  .li1{
    width: 10%;
    text-align: center;
  }
  .li2{
    width: 50%;
  }
  .li3{
    width: 20%;
  }
  .li4{
    width: 20%;
  }
  .ul1 li{
    height:50px;
    line-height: 50px;
  }
  li{
    float: left;
  }
  
  .one-oran{
      margin-bottom: 0;
      border:1px solid #dcdcdc;
      margin-bottom: 30px;
  }
  .gwc-table{
      background: #fcfcfc;
      border-bottom: 1px solid #dcdcdc;
      height:50px;
      line-height: 50px;
  }
  .bottom-pay-box{
      height:60px;
      background:#f5f5f5;
      margin: 50px 0 20px 0;
  }
  .bottom-pay-box .check-box{
    float: left;
  }
  .bottom-pay-box a{
      line-height: 60px;
  }

  .pay-words{
      display:inline-block;
  }
  .pay-words p{
      text-align: right;
      line-height: 30px;
      margin-bottom: 0;
  }
  a.go-pay{
      background:#0489e8;
      width:100px;
      height:60px;
      display: block;
      text-align: center;
      color:#fff;
      font-size: 16px;
      line-height: 60px;
  }
  .col-zlan{
    color: #0489e8;
  }
  /*.go-pay:hover{
      color:#fff;
  }*/
  .gwc-check{
      line-height: 60px;
  }
  .gwc-check div.check-btn{
      height:60px;
  }
  .gwc-check label{
      line-height: 60px;
      font-weight: normal;
  }
  .total-calcu{
      font-weight: bold;
  }
  .r-box{
      display:inline-block;
      float: right;
  }
</style>
<script>
  export default{
    data () {
      return {
        cartArr: [],
        allChose: false,
        totalMoneyFlag: 0
      }
    },
    created () {
      this.getShopcart()
    },
    methods: {
      getShopcart: function () {
        var _this = this
        _this.axios.get('static/json/cart.js')
        .then(function (res) {
          res = res.data.result
          console.log(res)
          var obj = {}
          for (var i = 0; i < res.length; i++) {
            if (obj[res[i].orgId]) {
              obj[res[i].orgId].push(res[i])
            } else {
              obj[res[i].orgId] = [res[i]]
            }
          }
          _this.cartArr = obj
          console.log(obj)
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      //全选
      selectAll: function () {
        var _this = this
        _this.allChose = !this.allChose
        if(!this.allChose) {
          for(var k in _this.cartArr) {
            _this.cartArr[k].orgIs = _this.allChose
            _this.cartArr[k].forEach(function(val, i) {
              val.isChose = _this.allChose
            })
          }
        } else {
          for(var k in _this.cartArr) {
            if (typeof _this.cartArr[k].orgIs === 'undefined') {
              _this.$set(_this.cartArr[k], 'orgIs', true)     //局部注册没有的变量,因为是循环出来的，不能直接在data里面定义
              _this.totalOrg(_this.cartArr[k])
            } else {
              _this.cartArr[k].orgIs = true

            }
            _this.cartArr[k].forEach(function(val, i) {
              if (typeof val.isChose === 'undefined') {
                _this.$set(val, 'isChose', true)     //局部注册没有的变量,因为是循环出来的，不能直接在data里面定义
              } else {
                val.isChose = true
              } 
              _this.totalOrg(_this.cartArr[k])
            })
          }
        } 
        _this.totalMoney()
      },
      //机构选中的
      selectOrg: function (item) {
        var _this = this
        if (typeof item.orgIs === 'undefined') {
          this.$set(item, 'orgIs', true)     //局部注册没有的变量,因为是循环出来的，不能直接在data里面定义
          item.forEach(function(val, i) {
            if (typeof val.isChose === 'undefined') {
              _this.$set(val, 'isChose', true)     //局部注册没有的变量,因为是循环出来的，不能直接在data里面定义
            } else {
              val.isChose = item.orgIs
            } 
          })
        } else {
          item.orgIs = !item.orgIs
          item.forEach(function(val, i) {
              val.isChose = item.orgIs
          })
        }
        item.forEach(function(val, i) {
          if (typeof val.isChose === 'undefined') {
            this.$set(val, 'isChose', true)     //局部注册没有的变量,因为是循环出来的，不能直接在data里面定义
          } else {
            val.isChose = item.orgIs
          } 
        })
        var j = 0
        var l = 0
        for(var k in _this.cartArr) {
          if(_this.cartArr[k].orgIs) {
            ++j
          }
          l++
        }
        if (j === l) {
          _this.allChose = true
        } else {
          _this.allChose = false
        }
        _this.totalOrg(item)
        _this.totalMoney()
      },
      //单个选中
      selectItem: function (good, item) {
        if (typeof good.isChose === 'undefined') {
          this.$set(good, 'isChose', true)     //局部注册没有的变量,因为是循环出来的，不能直接在data里面定义
        } else {
          good.isChose = !good.isChose
        }
        var k = 0
        item.forEach(function (value,i) {
          if(value.isChose) {
            ++k
          }
        })
        if (k === item.length) {
          if (typeof item.orgIs === 'undefined') {
            this.$set(item, 'orgIs', true)     //局部注册没有的变量,因为是循环出来的，不能直接在data里面定义
          } else {
            item.orgIs = true
          }
        } else {
          item.orgIs = false
        }
        //全选勾选时，有一个没选中
        if (!good.isChose) {
          this.allChose = good.isChose
        }
        //一个个选 最后全选勾选中
        var j = 0
        var l = 0
        for(var k in this.cartArr) {
          if (this.cartArr[k].orgIs) {
            ++j
          }
          l++
        }
        if (j === l) {
          this.allChose = true
        } else {
          this.allChose = false
        }
        this.totalOrg(item)
        this.totalMoney()
      },
      totalOrg: function (item) {
        this.$set(item, 'totalOrg', 0)
        item.forEach(function (val, i) {
          if(val.isChose) {
            item.totalOrg += val.coursePrice
          }
        })
      },
      totalMoney: function() {
        var _this = this
        _this.totalMoneyFlag = 0
        for(var k in _this.cartArr) {
          _this.cartArr[k].forEach(function(val, i) {
            if(val.isChose) {
              _this.totalMoneyFlag += val.coursePrice
            }
          })
        }
      }
    },
    computed: {
    }
  }
</script>
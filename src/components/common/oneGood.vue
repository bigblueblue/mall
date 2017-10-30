<template>
  <div class="one-good">
    <router-link :to="{name: 'gooddetail',params: {cid: courseArr.courseId}}" class="good-img"><img :src="courseArr.courseUrl"  alt="" /></router-link>
    <router-link :to="{name:'gooddetail',params: {cid: courseArr.courseId}}" class="good-name">{{ courseArr.courseName }}</router-link>
    <div class="good-intro">
        <p class="grades">
            <span class="col-orange">{{ courseArr.lessons }}</span>课时
        </p>
        <p class="free" v-if="courseArr.isPay ==0">免费</p>
        <p class="price" v-else>
            商品价：{{ courseArr.coursePrice }}
        </p>
    </div>
    <div class="bottom-intro f-cb">
        <p class="sale-num">{{ courseArr.studyNumber | formatNum }}</p>  
        <a href="#" class="buy operate-btn">加入购物车</a>
    </div>
  </div>
</template>
<style>
  .one-good{
    width: 386px;
    height: 338px;
    border: 1px solid #eee;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    border-radius: 10px;
    overflow: hidden;
    margin:0 10px;
  }
  .one-good:hover{
      box-shadow:  0  4px 9px rgba(9,2,4,.03);
  }
  .one-good .good-img{
      width: 100%;
      display: block;
      height: 222px;
  }
  .one-good .good-img img{
      height: 222px;
      width: 100%;
  }
  .one-good .good-name{
      font-size: 14px;
      height: 45px;
      line-height: 45px;
      width: 100%;
      display: block;
      padding:0 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  .one-good .good-intro{
      padding: 0 20px;
      color: #999;
      font-size: 14px;
  }
  .good-intro p{
      display: inline-block;
  }
  .good-intro p.grades{
      margin-right: 20px;
  }
  .grades span{
      font-size: 22px;
      margin-right: 4px;
  }
  .bottom-intro{
      padding: 0 20px;
      height: 32px;
      line-height: 32px;
  }
  .bottom-intro .sale-num{
      color: #999;
      display: inline;
  }
  .one-good .buy{
      float: right;
      display: block;
      width: 72px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      -ms-border-radius: 4px;
      -o-border-radius: 4px;
      border-radius: 4px;
      color: #fff;
  }
</style>
<script>
  export default{
    props: ['courseArr'],
    filters: {
      formatNum: function (value) {
        return '已有' + value + '人学习'
      }
    }
  }
</script>
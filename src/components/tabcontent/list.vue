<template>
    <div class="lesson-catalog-box">
      <div class="lesson-catalog-name">
        <h3>课程目录</h3>
      </div>
      <div class="course-listbox">
        <ul class="one" v-for="(item,index) in mlArr">
          <li class="table-top"><a href="">章节{{index+1}}&nbsp;&nbsp;&nbsp;&nbsp;{{item['chapter'].name}}</a></li>
          <li class="table-cont" v-for="(val,i) in item['name']">
              <span class="study-logo no-study" :style="bgImg"></span>   <!-- 学完 -->
              <a class="title">{{index+1}}-{{i+1}}&nbsp;&nbsp;{{val.name}} </a>
              <!-- <a class="homeworks">作业</a> -->
              <a class="sees" v-if="val.isTry === 2">免费试看</a>
              <a href="#" class="upload hoverBtn">
                  <!-- 前面标识已经学完则按钮内容为‘再次学习’ -->
                  <span>再次学习</span>
              </a>
              <span class="time">12:20</span>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
  export default{
    props: ['mlArr', 'bgImg'],
    filters: {
      showTry: function (a) {
        if (a === 2) {
          return true
        }
      }
    }
  }
</script>
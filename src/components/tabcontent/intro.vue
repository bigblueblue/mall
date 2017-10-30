<template>
  <div class="course-listbox cousre-introduce">
    <div class="exam-tit">
      <em>相关考试</em>
        <div class="exam-box">
            <a href="#">小儿推拿师（初级）</a>
            <a href="#">小儿推拿师（中级）小儿推拿师（中级）小儿推拿师（中级）</a>
            <a href="#">小儿推拿师（高级）</a>
        </div>
      </div>
      <div class="introduce-cont">
        <em>简介</em>
          <p>{{kcDesc}}</p>
      </div>
  </div>
</template>
<script>
  export default{
    props: ['kcDesc']
  }
</script>

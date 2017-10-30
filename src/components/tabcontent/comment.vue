<template>
  <div class="comment-box">
    <div class="detail-table" v-if="isShowFlag" >
      <div class="comments-item" v-for="pl in plArr">
        <a class="userPic"><img :src="pl.userPic?pl.userPic: defaultPic"></a>
        <div class="column-left">
            <div class="p-column f-cb">
                <a class="name">{{pl.userName}}</a>
                <span class="f-fr comment-time">{{pl.createTime}}</span>
            </div>
            <div class="scorebox">
              <img :src="item" v-for="item in starList(pl.commentStar)">
            </div>
            <p class="comment-area">{{pl.content}}</p>
        </div>
      </div>
    </div>
    <div class="default-page-box" v-else >
      <img :src="noPic" alt="" class="defaultPic">
      <p class="defaultTxt">
          目前暂无评论
      </p>
    </div>
  </div> 
</template>
<script>
  export default{
    props: ['plArr', 'noPic', 'isShowFlag', 'defaultPic'],
    data () {
      return {
        num: 4
      }
    },
    methods: {
      starList: function(a) {
        return this.domain.commentStar(a)
      }
    }
  }
</script>
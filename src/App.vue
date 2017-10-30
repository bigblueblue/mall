<template>
  <div id="app">
    <header-div :logo="logoPic" :userUrl="imgUrl"></header-div>
    <keep-alive><router-view></router-view></keep-alive>
  </div>
</template>

<script>
import img from './assets/per-photo.png'
export default {
  name: 'app',
  data () {
    return {
      logoPic: '../static/img/top_logo.png',
      imgUrl: img
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
  }
</style>

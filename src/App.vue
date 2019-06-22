<template style="margin: 0 auto">
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  background-color: rgb(245,246,247);
  /*margin: 0 auto;*/
  /*padding: 0 auto;*/
  /*top: 0;*/
  /*left: 0;*/
  /*width: 100%;*/
  /*border: hidden;*/
  /*overflow: auto;*/
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: auto;
  padding-left: 12%;
  padding-right: 12%;
  position: absolute;
  z-index: 0;
}
</style>

<template>
  <div id="app">
    <img src="./assets/logo.jpg">
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width:1060px;
  margin: 0 auto;
  text-align : center;
}
#app > img{width: 100%;}
</style>

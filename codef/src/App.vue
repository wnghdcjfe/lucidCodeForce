<template>
  <div id="app">
    <nav>  
    <ul>
      <li v-for= "r in routes"> 
         <router-link :to="r.path" class="app_a" active-class="active" exact>{{r.name}}</router-link>  
      </li>
    </ul> 
    </nav>   
    <img src="./assets/logo.jpg">
    <router-view/>
  </div>
</template>

<script>   
export default {
  name: 'App',  
  data() {
    return {
      routes : this.$router.options.routes
    }
  }, 
  mounted(){
    console.log(this.routes)
  }
}
</script>

<style>  

li{
  display: inline-block;
  padding-right: 30px;
}  
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
.app_a{ 
  text-decoration: none; 
  font-size: 1.2rem;
  color: #aaa;
}
.active{
  color: #42b983; 
}
</style>

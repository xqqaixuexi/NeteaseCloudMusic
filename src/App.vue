<template>
  <div id="app">
    <router-view/>
    <MusicPlay></MusicPlay> 
  </div>
</template>

<script>
import MusicPlay from './components/common/MusicPlay'
export default {
  name: 'App',
  components: {
      MusicPlay
    }
}
</script>

<style lang='less'>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
/*  margin-top: 60px;*/
}
</style>

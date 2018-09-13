<template>
  <div>
  	<Top></Top>
  	<Banner></Banner>
    <Personalized></Personalized>
  </div>
</template>
<script>
 import Loading from './common/Loading'
 import Top from './common/Top'
 import Banner from './common/Banner'
 import Personalized from './home/Personalized'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
  	}
  },
   components: {
   		Loading,
    	Top,
    	Banner,
      Personalized
  },

}
</script>

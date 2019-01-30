<template>
  <div class="block cf">
    <Swipe class="my-swipe" :auto="5000" :speed="800" >
      <Swipe-item v-for="item in banners" >
      <div class="index-banner" :style="{backgroundImage:'url('+item.backgroundUrl+')'}">
      <a :href= " item.url.indexOf('http') === -1 ? 'https://music.163.com'+item.url : item.url" target="_blank">
      	      	<img :src="item.picUrl">
      </a>

      </div>
        
      </Swipe-item>
    </Swipe>
  </div>
</template>

<script>

	import {Swipe,SwipeItem} from 'vue-swipe'
	import api from "@/api"
	export default{
		name:'banner',
		data(){
			return{
				banners:{}
			}
		},
		mounted(){
			this.carousel()
		},
		computed: {

		},
		methods: {
			carousel(){
				api.get_banner().then(res =>{
					
					if(res.data.code = 200) {
						this.banners= res.data.banners
						console.log(this.banners)
					}
				})
			}
		},
		components:{
			Swipe,
			SwipeItem
		}
	}
</script>
<style>
@import 'vue-swipe/dist/vue-swipe.css'
.block{
	width: 100%;
	height: 336px;
}
.my-swipe{
	height:336px;
}
.index-banner{
}
</style>
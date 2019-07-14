import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Index.vue'
import login from '@/components/Login.vue'
import search from '@/components/Search.vue'
import userhome from '@/components/user/UserHome.vue'
import playlist from '@/components/play/PlayList.vue'
import song from '@/components/play/song.vue'
import album from '@/components/play/Album.vue'
Vue.use(Router)

export default new Router({
  routes: [
  	// {
  	// 	path:'/',
  	// 	redirect:'/index'
  	// },
  	{
  		path:'/',
      name:'Index',
  		component:index
  	},
  	{
  		path:'/login',
      name:'Login',
  		component:login
  	},
  	{
  		path:'/search',
      name:'Search',
  		component:search
  	},
    {
      path:'/user/home',
      component:userhome
    },
    //歌单详情
    {
      path:'/playlist',
      component:playlist
    },
    //单曲页面
    {
      path: '/song',
      component:song
    },
    //专辑页面
    {
      path: '/album',
      component:album
    }    

  ]
})

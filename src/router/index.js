import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Index.vue'
import login from '@/components/Login.vue'
import search from '@/components/Search.vue'
import userhome from '@/components/user/UserHome.vue'
import playlist from '@/components/play/PlayList.vue'
import song from '@/components/play/song.vue'
import album from '@/components/play/Album.vue'
import toplist from '@/components/play/TopList.vue'
Vue.use(Router)

export default new Router({
  routes: [
  	// {
  	// 	path:'/',
  	// 	redirect:'/index'
  	// },
  	{//主页
  		path:'/',
      name:'Index',
  		component:index
  	},
  	{//登录页面
  		path:'/login',
      name:'Login',
  		component:login
  	},
  	{//搜索页面
  		path:'/search',
      name:'Search',
  		component:search
  	},
    {//个人主页
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
    },
    // 排行榜   
    {
      path: '/discover/toplist',
      name: 'toplist',
      component: toplist
    }
  ]
})

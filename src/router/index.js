import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Index.vue'
import login from '@/components/Login.vue'
import helloworld from '@/components/HelloWorld.vue'
import userhome from '@/components/user/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
  	// {
  	// 	path:'/',
  	// 	redirect:'/index'
  	// },
  	{
  		path:'/',
  		component:index
  	},
  	{
  		path:'/login',
  		component:login
  	},
  	{
  		path:'/helloworld',
  		component:helloworld
  	},
    {
      path:'/user/home/:id',
      component:userhome
    }

  ]
})

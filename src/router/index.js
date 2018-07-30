import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Index.vue'
import login from '@/components/Login.vue'
import helloworld from '@/components/HelloWorld.vue'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path:'/',
  		redirect:'/index'
  	},
  	{
  		path:'/index',
  		component:index
  	},
  	{
  		path:'/login',
  		component:login
	},
	{
		path:'/helloworld',
		component:helloworld
	}
  ]
})

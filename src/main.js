// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import api from './api'
import ElementUI from 'element-ui';
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/layout.css'
import global_ from './Global'//引用文件
import base from './base'
  Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
  // Vue.prototype.base = base//挂载到Vue实例上面
// Vue.use(mint);
Vue.use(ElementUI);
Vue.use(base);
router.afterEach((to,from,next) => {
        window.scrollTo(0,0);
});

axios.defaults.baseURL = 'http://localhost:4000/';
axios.interceptors.request.use(function(config) { // 这里的config包含每次请求的内容
	if(config.params && config.params.auth && !logined) {
		// 需要登录验证的url 需带params.auth=true
		router.push({
			name: 'login'
		});
		return Promise.reject({
			"msg": '需先登录'
		});
	}
	return config;
}, function(err) {
	return Promise.reject(err);
});
axios.interceptors.response.use((res) => {
	if(res.data.code === 301) {
		console.log('未登录')
	} else if(res.data.code !== 200) {
		//alert('数据加载出错')
	}
	return res
}, (error) => {
	console.log('promise error:' + error)
	return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h => h(App),
  store,
  //components: { App },
  template: '<App/>'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import api from './api'
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/layout.css'
Vue.config.productionTip = false

Vue.use(mint);

// var instance = axios.create({
//   baseURL:"http://192.168.193.121:4000/",
//   timeout:5000,
//   headers: {'X-Custom-Header':'foobar'}
// });
axios.defaults.baseURL = 'http://localhost:4000/';
// axios.get('http://localhost:4000/artist/list')
//   .then(function(response){
//     console.log(response);
//   })
//   .catch(function(err){
//     console.log(err);
//   });
  // axios.get('http://localhost:4000/login?email=zhangmengqi0218@163.com&password=NINGYANXIA0218')
  // .then(function(response){
  //   console.log(response);
  // })
  // .catch(function(err){
  //   console.log(err);
  // });
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
		alert('账号或密码错误')
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
  store,
  components: { App },
  template: '<App/>'
})

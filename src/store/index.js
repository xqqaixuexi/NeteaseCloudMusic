
 import Vue from 'vue';
 import Vuex from 'vuex'
 import api from '@/api';

 Vue.use(Vuex)

 export default new Vuex.Store({
 	state: {
 		user: JSON.parse(localStorage.getItem('user')) || {},
 		
 	},
 	getters: {
 		getUserInfo: state =>{
 			return state.user;
 		}
 	},
 	mutations: {
 		userMsg(state, user){
 			localStorage.setItem("user", JSON.stringify(user));
 			state.user = user;
 			logined = user.account ? true : false;
 		}
 	},
 	actions: {
		// async userMsg({
		// 	state,
		// 	commit
		// }) {
		// 	await api.mine().then(res => {
		// 		commit("userMsg", res.data)
		// 	})
		// },
 	 }

 })
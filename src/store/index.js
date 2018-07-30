
 import Vue from 'vue';
 import Vuex from 'vuex'
 import api from '@/api';

 Vue.use(Vuex)

 export default new Vuex.Store({
 	state: {
 		user:{}
 	},
 	getters: {
 		 //getLogin: (state) => state.logined
 	},
 	mutations: {
 		userMsg(state, user){
 			state.user = user;
 			//logined = user.account ? true : false;
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
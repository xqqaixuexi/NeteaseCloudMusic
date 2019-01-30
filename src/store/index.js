
 import Vue from 'vue';
 import Vuex from 'vuex'
 import api from '@/api';

 Vue.use(Vuex)
const defaultMusic = {
	al: {},
	ar: [{}],
	artists: [{}],
	album: {},
	dj: {},
	radio: {},
	mainSong: {
		album: {}
	}
}
 export default new Vuex.Store({
 	state: {
 		count:0,
 		user: JSON.parse(localStorage.getItem('user')) || {},
 		isLogined: JSON.parse(localStorage.getItem('isLogined')) || false,
 		songId: localStorage.getItem('songId') || {},		
 		music: defaultMusic,
		playing: false,
		lrcObj: {
			lrc: [{}]
		},
		musicloading: true,
		playUrl: '',
		musicload: false,
		playtype: 1,
		scrolltop: 0,
		commentscount: 0,
		list_am: [],
		index_am: 0,
		list_fm: [],
		index_fm: 0,
		list_dj: [],
		index_dj: 0,
		playtime: 0,
		likeall: "",
		bgmchange: false,
		uplaylist: [],
		shuffle_am: 0,
		shuffle_dj: 0,
		musicPicUrl:{},
		singer:'',
		privileges:JSON.parse(localStorage.getItem('privileges')) || {},
		songIds:JSON.parse(localStorage.getItem('songIds')) || []
		//cw: document.getElementById("app").offsetWidth
 		
 	},
 	getters: {
 		getUserInfo: state =>{
 			return state.user;
 		},
 		logined: state =>{
 			return state.isLogined;
 		},
 		getSongId: state =>{
 			return state.songId;
 		},
 		getCount: state =>{
 			return state.count;
 		}
 		// getPlayUrl: state =>{
 		// 	return state.playurl;
 		// }

 	},
 	mutations: {
 		loginedMsg(state,isLogined){
 			localStorage.setItem("isLogined", JSON.stringify(isLogined));
 			state.isLogined = isLogined;
 		},
 		userMsg(state, user){
 			localStorage.setItem("user", JSON.stringify(user));
 			state.user = user;
 			logined = user.account ? true : false;
 		},
 		songIdMsg(state,songId){
 			localStorage.setItem("songId", JSON.stringify(songId));
 			state.songId = songId;			
 		},
 		playurlMsg(state,playUrl){
 			localStorage.setItem("playUrl", JSON.stringify(playUrl));
 			state.playUrl = playUrl;
 		},
 		musicPicUrlMsg(state,musicPicUrl){
 			//localStorage.setItem("musicPicUrl", JSON.stringify(musicPicUrl));
 			state.musicPicUrl = musicPicUrl; 			
 		},
 		singerMsg(state,singer){
 			//localStorage.setItem("singer", JSON.stringify(musicPicUrl));
 			state.singer = singer; 			
 		},
 		//歌单列表播放数据
 		privilegesMsg(state,privileges)	{
 			localStorage.setItem("privileges", JSON.stringify(privileges));
 			state.privileges = privileges;	

 		},	
 		songIdsMsg(state,songIds)	{
 			localStorage.setItem("songIds", JSON.stringify(songIds));
 			state.songIds = songIds;	

 		},
 		countMsg(state,count)	{
 			localStorage.setItem("count", JSON.stringify(count));
 			state.count = count;	

 		}, 		

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
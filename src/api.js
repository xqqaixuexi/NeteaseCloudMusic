// const limit = 20;
import axios from 'axios'
export default {
	//手机号登录
	login(name, pwd) {
		var data = {
			//email: name,
			phone: name,
			password: pwd

		}
		return axios(('login/cellphone'),{params:data})
		// return axios((/^0\d{2,3}\d{7,8}$|^1[34578]\d{9}$/.test(name) ? "login/cellphone" : "login"), {
		// 	params: data
		// })
	},
	//获取登录状态（接口状态码500）
	get_logined(){
		return axios("/login/status")
	},
	//退出登录(接口有问题404)
	logout(){
		return axios("/logout")
	},
	//用户详细信息
	user_detail(id) {
		return axios("user/detail?uid=" + id)
	},
	//获取用户信息 , 歌单，收藏，mv, dj 数量(需要登录)
	user_subcount(){
		return axios("/user/subcount")
	},
	//轮播图
	get_banner(){
		return axios("banner")
	},
	//热门推荐
	get_personalized(){
		return axios("personalized")
	},
	//新碟上架
	get_album(offset,limit){
		return axios("/top/album?offset="+offset+"&limit="+limit)
	},
	//排行榜
	get_topList(idx){
		return axios("/top/list?idx="+idx)
	},
	//所有榜单内容摘要
	topList(){
		return axios("/toplist/detail")
	},
	//获取歌手(可根据不同传参分类)
	get_singerList(cat){
		return axios("/artist/list?cat="+cat)
	},
	//歌单详情（热门推荐点击进去）
	get_playListDetail(id){
		return axios("/playlist/detail?id="+ id )
	},
	//歌曲详情
	get_songDetail(ids){
		return axios("/song/detail?ids="+ ids)
	},
	//获取歌词(接口有问题,获取不到歌词，之前是可以的)
	get_lyric(id){
		return axios("/lyric?id="+id)
	},
	//获取相似歌曲
	get_simiSong(id){
		return axios("/simi/song?id="+id)
	},
	//获取歌曲URL
	get_musicUrl(id){
		return axios("/music/url?id="+id)
	},
	//专辑详情
	get_albumDetail(id){
		return axios("/album?id="+id)
	},
	//获取用户歌单
	get_userPlayList(uid){
		return axios("/user/playlist?uid="+uid)
	},
	//搜索
	search(keywords){
		return axios("/search?keywords="+keywords)
	},
	// index_rec() {
	// 	// 首页个人推荐内容：歌单，新歌，mv，电台
	// 	let banner = axios("banner");
	// 	let pl = axios('personalized');
	// 	let ns = axios('personalized/newsong');
	// 	let mv = axios('personalized/mv');
	// 	let djprogram = axios('personalized/djprogram');
	// 	return axios.all([banner, pl, ns, mv, djprogram]).then(axios.spread(function(a, b, c, d, e) {
	// 		return Promise.resolve([a.data.banners, b.data.result, c.data.result, d.data.result, e.data.result])
	// 	}))
	// },
	// index_plcate() {
	// 	// 歌单类型分类列表
	// 	return axios("playlist/catlist")
	// },
	// index_playlist(type, offset) {
	// 	// 根据类型获取歌单列表
	// 	return axios("top/playlist?limit=" + limit + '&offset=' + offset + '&type=' + type)
	// },
	// index_dj() {
	// 	// 首页电台页内容：电台分类，推荐节目，推荐电台，电台列表
	// 	let cate = axios("djradio/catelist");
	// 	let rec_p = axios("program/recommend");
	// 	let rec_dj = axios("djradio/recommend");
	// 	let djlist = this.index_djlist(0);
	// 	return axios.all([cate, rec_p, rec_dj, djlist]).then(axios.spread(function(a, b, c, d) {
	// 		return Promise.resolve([a, b, c, d])
	// 	}))
	// },
	// index_djlist(offset) {
	// 	// 电台列表
	// 	return axios("djradio/hot?limit=" + limit + '&offset=' + offset);
	// },
	// index_hqpl(cat, offset) {
	// 	//精品歌单
	// 	return axios("top/playlist/highquality", {
	// 		params: {
	// 			type: cat,
	// 			offset: offset,
	// 			limit: limit
	// 		}
	// 	})
	// },
	// likeall() {
	// 	return axios("likelist")
	// },
	// index_sort() {
	// 	return axios("toplist/detail")
	// },
	// search(name, type, offset) {
	// 	// 类型关键词搜索 type:1单曲；10专辑；100歌手；1000歌单；1004mv；1009电台；1002用户
	// 	return axios("search?keywords=" + name + '&type=' + type + '&limit=' + limit + '&offset=' + offset);
	// },
	// search_suggest(s, t) {
	// 	return axios("search/suggest?keywords=" + s)
	// },
	// search_hot(s, t) {
	// 	return axios("search/hot")
	// },
	// search_multimatch(s, t) {
	// 	return axios("search/multimatch?type=" + t + '&keywords=' + s)
	// },
	// playlist(id, offset) {
	// 	return axios.get("playlist/detail?id=" + id + '&offset=' + offset + '&limit=' + limit);
	// },
	// album(id) {
	// 	return axios("album/detail?id=" + id)
	// },
	// artist(id) {
	// 	return axios("artist?id=" + id)
	// },
	// artist_album(id, offset) {
	// 	return axios("artist/album?id=" + id + '&offset=' + offset + '&limit=' + limit)
	// },
	// artist_mv(id, offset) {
	// 	return axios("artist/mv?id=" + id + '&offset=' + offset + '&limit=' + limit)
	// },
	// artist_desc(id) {
	// 	return axios("artist/desc?id=" + id)
	// },
	// artist_simi(id) {
	// 	return axios("artist/simi?id=" + id)
	// },
	// lyric(id) {
	// 	return axios("lyric?id=" + id)
	// },
	// songtrack(id, t, d) {
	// 	return axios("song/tracks", {
	// 		params: {
	// 			id: id,
	// 			auth: true,
	// 			r: (!d ? '' : 'del'),
	// 			op: (!t ? 'like' : 'trash')
	// 		}
	// 	})
	// },
	// tracktpl(sid, pid, add = true) {
	// 	var op = add ? 'add' : 'del'
	// 	return axios("playlist/tracks?pid=" + pid + "&op=" + op + "&tracks=" + sid)
	// },
	// dislike(id, type) {
	// 	//每日推荐歌曲中不感兴趣某首歌
	// 	return axios("recommend/dislike", {
	// 		params: {
	// 			id: id,
	// 			type: type
	// 		}
	// 	})
	// },
	// comments(id, offset, type) {
	// 	id = (type == 1 ? '' : (type == 3 ? 'A_DJ_1_' : 'R_SO_4_')) + id
	// 	return axios("comments?id=" + id + '&offset=' + offset + '&limit=' + limit)
	// },
	// music_url(id) {
	// 	return axios("music/url?id=" + id + '&br=128000')
	// },
	// async music_detail(id) {
	// 	return axios("music/detail?id=" + id)
	// },
	// fm() {
	// 	return axios("fm")
	// },
	// simi(id) {
	// 	let pl = axios("simi/playlist", {
	// 		params: {
	// 			id: id,
	// 			auth: true
	// 		}
	// 	});
	// 	let song = axios("simi/song?id=" + id);
	// 	let user = axios("simi/user?id=" + id)
	// 	return axios.all([pl, song, user]).then(axios.spread(function(a, b, c) {
	// 		return Promise.resolve([a.data.playlists, b.data.songs, c.data.userprofiles])
	// 	}))
	// },
	// record(uid,t = 0) {
	// 	return axios("record",{params:{uid:uid,type:t}})
	// },
	// mv(id) {
	// 	let mv = axios.get('mv?id=' + id);
	// 	let simi = axios("mv/simi?id=" + id)
	// 	return axios.all([mv, simi]).then(axios.spread(function(a, b) {
	// 		return Promise.resolve([a.data.data, b.data.mvs]);
	// 	}))
	// },
	// dj_detail(id) {
	// 	return axios("dj/detail?id=" + id);
	// },
	// dj_getprogram(id, offset) {
	// 	return axios("dj/program", {
	// 		params: {
	// 			id: id,
	// 			offset: offset,
	// 			limit: limit
	// 		}
	// 	});
	// },
	// dj_sub(id, t) {
	// 	return axios("dj/sub", {
	// 		params: {
	// 			id: id,
	// 			t: t
	// 		}
	// 	});
	// },
	// program_detail(id) {
	// 	return axios("program/detail", {
	// 		params: {
	// 			id: id
	// 		}
	// 	})
	// },
	// program_like(id, t) {
	// 	return axios("resource/like", {
	// 		params: {
	// 			id: id,
	// 			t: t
	// 		}
	// 	})
	// },

	// user_playlist(id, offset) {
	// 	return axios("user/playlist?uid=" + id + '&offset=' + offset + '&limit=' + limit)
	// },
	// user_radio(id) {
	// 	return axios("user/radio", {
	// 		params: {
	// 			uid: id
	// 		}
	// 	});
	// },
	// user_event(id, offset) {
	// 	return axios("event/get", {
	// 		params: {
	// 			id: id,
	// 			offset: offset,
	// 			limit: limit
	// 		}
	// 	})
	// },
	// user_subcount(id) {
	// 	return axios("user/subcount", {
	// 		params: {
	// 			id: id,
	// 			auth: true
	// 		}
	// 	}, {
	// 		params: {
	// 			auth: true
	// 		}
	// 	})
	// },
	// user_cloud(offset) {
	// 	return axios("user/cloud", {
	// 		params: {
	// 			offset: offset,
	// 			limit: limit,
	// 			auth: true
	// 		}
	// 	});
	// },
	// user_recs() {
	// 	return axios("recommend/songs", {
	// 		params: {
	// 			auth: true
	// 		}
	// 	})
	// },
	// user_sublist(t, offset) {
	// 	return axios("sublist/" + t, {
	// 		params: {
	// 			auth: true,
	// 			offset: offset,
	// 			limit: limit
	// 		}
	// 	});
	// },
	// event_list(offset) {
	// 	return axios("event/list", {
	// 		params: {
	// 			auth: true,
	// 			offset: offset,
	// 			limit: limit
	// 		}
	// 	})
	// },
	// video_detail(id){
	// 	return axios("video/detail",{
	// 		params:{
	// 			id:id
	// 		}
	// 	})
	// },
	// video_playurl(id,br){
	// 	return axios("video/playurl",{
	// 		params:{
	// 			id:id,
	// 			br:br
	// 		}
	// 	})
	// },
	// video_rcmd(id){
	// 	return axios("video/rcmd",{
	// 		params:{
	// 			id:id
	// 		}
	// 	})
	// },
	// video_statistic(id){
	// 	return axios("video/statistic",{
	// 		params:{
	// 			id:id
	// 		}
	// 	})
	// },
	// video_info(id){
	// 	return axios("video/info",{
	// 		params:{
	// 			id:id
	// 		}
	// 	})
	// },
	// topic_detail(id){
	// 	return axios("topic/detail",{
	// 		params:{
	// 			id:id
	// 		}
	// 	})
	// },
	async mine() {
		return await axios("mine")
	}
}
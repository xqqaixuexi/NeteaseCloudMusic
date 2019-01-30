<template>
	<div>
		<Top></Top>
		<div id="m-playlist" class="g-bd4 cf">
			<div class="playlist-left">
				<div class="g-wrap6">
					<div class="playlistIntroduction cf">
						<div class="playlistImage">
<!-- 						<img class="coverImg" > -->
							<img class="coverImg" :src="picUrl">
						</div>
						<div class="playlistText">
							<div class="hd cf">
								<!-- <i class="u-icn"></i> -->
								<div class="tit">
									<h2>{{songDetail.name}}</h2>
								</div>
							</div>
							<div class="tags cf">
								<b>歌手：</b>
								<a href="">
									{{singer}}
								</a>
								
							</div>
							<p class="tags cf" >
								<b>所属专辑：</b>
								<a href="">
									{{album}}
								</a>							
							</p>
							<div class="m-info cf">
								<div class="play" @click="audioPlay(musicIdArr)">
									<div  class="circle " title="播放">
							            <div class="circle_inner_play">
							            </div>
							        </div>
							        <span>
							        	播放
							        </span>
								</div>
							</div>
							<p class="intro cf" v-html="lyricShow">
							</p>
							<p  class="intro cf " v-bind:class="{ hide: isHide }" v-html="lyricHide">
							</p>
							<div v-show="lyric!=''" class="changeBtn" @click="lyricShowOrHide($event)" >展开</div>
							<p  v-show="lyricUser.nickname"class="lyricUser">
								贡献歌词：
								<span >{{lyricUser.nickname}}</span>
							</p>
							<p  v-show="transUser.nickname" class="lyricUser">
								贡献翻译：
								<span >{{transUser.nickname}}</span>
							</p>							
						</div>
					</div>
				</div>
			</div>
			<div class="playlist-right">
				<div v-show="simiSong!=''"class="g-wrap7">
					<h3 class="u-hd3">
						<span>相似歌曲</span>
					</h3>
					<ul class="m-piclist cf">
						<li class="" v-for="item in simiSong">
							<div class="txt">
								<div class="f-thide">
									<router-link :to="{ path:'/song?id=', query: { id: item.id }}" >
											{{item.name}}										
									</router-link>
									
								</div>
								<div class="f-thide ">
									<a class="s-fc4" href="">
										{{item.artists[0].name}}
									</a>									
								</div>
							</div>

						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import api from "@/api"
 	//import Loading from './common/Loading'
 	import Top from '../common/Top'
	import { mapState,mapGetters } from 'vuex'
 	export default{
 		name:"song",
 		data(){
 			return{
 				isHide:true,
 				musicId:this.$route.query.id,
 				songDetail:{},
 				picUrl:{},
 				singer:{},
 				album:{},
 				lyric:{},
 				lyricShow:{},
 				lyricHide:{},
 				lyricUser:{},
 				transUser:{},
 				tlyric:{},
 				simiSong:{},
 				musicIdArr:[]
 				
 			}
 		},
 		mounted(){
			this.musicIdArr=[{'id':this.$route.query.id}]
			console.log(this.musicIdArr)
 			this.getSongDetail(this.musicId)
 			this.getLyric(this.musicId)
 			this.getSimiSong(this.musicId)
 		},
 		watch:{
 			//vue通过ID（参数）修改URL复用同一个页面（组件）不重新加载的问题
			 '$route' (to, from) { //监听路由是否变化
			    if(this.$route.query.id){// 判断条件1  判断传递值的变化
			      //获取文章数据
			        this.musicId = this.$route.query.id
			        this.musicIdArr=[{'id':this.musicId}]
		 			this.getSongDetail(this.musicId)
		 			this.getLyric(this.musicId)
		 			this.getSimiSong(this.musicId)
			    }
			   }
		},
 		computed:{
 			...mapGetters([
 				'getSongId',
 				'getCount'

 			]),
 			...mapState([
 				'songId',
 				'songIds',
 				'playUrl',
 				'count'
 				])
 		},
 		methods:{
 			// audioPlay() {
 			// 	var self = this;
 			// 	this.musicPlayShowOrHide(self)
 			// 	this.$store.commit('songIdMsg',this.musicId)
 			// 	localStorage.setItem("songId",this.musicId);
 			// 	if(this.songIds.indexOf(parseInt(this.musicId)) === -1){
 			// 		this.songIds.push(parseInt(this.musicId))
 			// 		this.$store.commit('countMsg',this.songIds.length-1)
 			// 	}
 			// 	else{
				// 	this.$store.commit('countMsg',this.songIds.indexOf(parseInt(this.musicId)))
 			// 	}
 			// 	if(Object.keys(this.getSongId).length!=0){
		  //   		var audio = document.getElementById("myAudio")
		  //   		var innerPlay = document.getElementById("innerPlay")
		  //   		var innerPause = document.getElementById("innerPause")
	   //  			var audioLength = document.getElementById("audioLength")
	   //  			var audioCircular = document.getElementById("audioCircular")
	   //  			var nowTime = document.getElementById("nowTime")
	   //  			var totalTime = document.getElementById("totalTime")
		  //   		//var audioDur = audio.duration
		    		
				// 	if(audio!==null){
				// 		//innerPause.classList.remove("hide")
				// 		//innerPlay.classList.add("hide")
				// 		//audio.currentTime = 0;//重新播放
				// 		console.log(audio)
				// 		audio.currentTime = 0;
				// 		//audio.play();
				// 		audio.addEventListener("canplay", function(){
				// 			//

				// 			audio.play();
				// 			innerPause.classList.remove("hide")
				// 			innerPlay.classList.add("hide")
				// 			console.log('canplay')
				// 		})
						
				// 		//监听音频播放时间，并更新进度条
				// 		audio.addEventListener('timeupdate', function () {
				//            updateProgress(audio)
				//         }, false);
						
				// 	}
		    		
			 //        //进度条进度及播放暂停按钮切换
				// 	function updateProgress(audio) {
				// 		var audioTime = (audio.currentTime/audio.duration)*500
				// 		audioLength.style.width = audioTime + 'px'
				// 		audioCircular.style.left = (audioTime-6) +'px'
				// 		if(audio.paused === true && audio.currentTime===audio.duration) {
				// 		 	innerPause.classList.add("hide")
				// 			innerPlay.classList.remove("hide")
						 	
				// 		 } 
				// 		 //console.log(audioDur)
				// 	    nowTime.innerHTML = transTime(audio.currentTime);
				// 	    totalTime.innerHTML = transTime(audio.duration);
				// 	}
				// 	//时间换算
				// 	function transTime(value) {
				// 	    var time = "";
				// 	    var h = parseInt(value / 3600);
				// 	    value %= 3600;
				// 	    var m = parseInt(value / 60);
				// 	    var s = parseInt(value % 60);
				// 	    if (h > 0) {
				// 	        time = formatTime(h + ":" + m + ":" + s);
				// 	    } else {
				// 	        time = formatTime(m + ":" + s);
				// 	    }

				// 	    return time;
				// 	}
				// 	//格式化时间
				// 	function formatTime(value) {
				// 	    var time = "";
				// 	    var s = value.split(':');
				// 	    var i = 0;
				// 	    for (; i < s.length - 1; i++) {
				// 	        time += s[i].length == 1 ? ("0" + s[i]) : s[i];
				// 	        time += ":";
				// 	    }
				// 	    time += s[i].length == 1 ? ("0" + s[i]) : s[i];

				// 	    return time;
				// 	} 				 	
 			// 	}

	   //      	//console.log(localStorage.getItem("songId"))

	   //      },
 			//获取歌曲详情
 			getSongDetail(ids){
 				api.get_songDetail(ids).then(res=>{
 					//console.log(res)
 					if(res.code=200){
 						this.songDetail = res.data.songs[0]
 						this.picUrl = this.songDetail.al.picUrl
 						this.singer = this.songDetail.ar[0].name
 						this.album = this.songDetail.al.name
 					}
 				})
 			},
 			//获取歌词
 			getLyric(id){
 				api.get_lyric(id).then(res=>{
 					//console.log(res)
 					if(res.status=200){
 						if(res.data.lrc!=null||res.data.lrc!=undefined){
 							if(res.data.lyricUser){
 								this.lyricUser = res.data.lyricUser
 							}

 							
 							 if(res.data.transUser){
 							this.transUser = res.data.transUser
	 						}
	 						this.lyric = res.data.lrc.lyric.replace(/\[.*?\]/g,'')
	 						this.lyric = this.lyric.replace(/\n/g,",")
	 						this.lyric = this.lyric.split(",")
	 						this.lyric = this.filter_array(this.lyric) 						 						
	 						if(res.data.tlyric.lyric!=null){
	 							this.tlyric = res.data.tlyric
	 							this.tlyric = res.data.tlyric.lyric.replace(/\[.*?\]/g,'')
	 							this.tlyric = this.tlyric.replace(/\n/g,",")
	 							this.tlyric = this.tlyric.split(",")
	 							this.tlyric = this.filter_array(this.tlyric)
	 							this.lyric = this.alternateConcat(this.lyric,this.tlyric) 							
	 						}
							this.lyric = this.lyric.join("<br/>")
	 						let lyricLength = this.lyric.length
	 						let num = this.getLyricShow(this.lyric,'<br/>',14)
	 						this.lyricShow = this.lyric.substring(0,num)
	 						this.lyricHide = this.lyric.substring(num,lyricLength)
 						}
 						else{
 							this.lyricShow = "暂时没有歌词"
 						}


 					}
 				})
 			},
 			//获取相似歌曲
 			getSimiSong(id){
 				api.get_simiSong(id).then(res=>{
 					if(res.data.code = 200){
 						this.simiSong = res.data.songs;

 					}
 				})
 			},
 			//某个字符串(str)中字符c第n次出现的位置下标
 			getLyricShow(str,c,n){
			    let x = str.indexOf(c);//首次出现的位置
			    for(var i=1;i<n;i++){
			        x=str.indexOf(c,x+1);
			    }
			    return x;
 			},
 			lyricShowOrHide(event){
 				let lyricText = event.currentTarget.innerText
 				if(lyricText == "展开"){
 					this.isHide = false
 					event.currentTarget.innerText = "收起"
 				}
 				else{
 					this.isHide = true
 					event.currentTarget.innerText = "展开"
 				}
 			},
 			//去除空数组
 			filter_array(array) { 
				  return array.filter(item=>item); 
			},
 			//交替合并两个任意长度的数组(arrA中的值在前）
 			alternateConcat(arrA,arrB){
 				var  arrC = []
 				if(arrA.length>arrB.length){
	 				for(let i = 0; i<arrA.length; i++){
	 					arrC.push(arrA[i])
	 					for(let j = i; j<i+1&&j<arrB.length; j++){
	 						arrC.push(arrB[j])
	 					}
	 				} 					
 				}
 				else{
	 				for(let i = 0; i<arrA.length; i++){
	 					arrC.push(arrA[i])
	 					for(let j = i; j<i+1; j++){
	 						arrC.push(arrB[j])
	 						
	 					}
	 				} 
	 				arrC = arrC.concat(arrB.slice(arrA.length,arrB.length))
 				}
 				return arrC
 			},
 			//获取歌曲URL
 			getMusicUrl(id){
 				api.get_musicUrl(id).then(res=>{
 					//console.log(res)
 					if(res.code=200){
 						//this.musicUrl = res.data.data[0].url
 						this.$store.commit('playurlMsg',res.data.data[0].url)
 						console.log(this.playUrl)
 					}

 					//localStorage.setItem("songId", this.urlId);
 				})
 			},
 			//获取歌曲详情
 			getSongDetail2(idx){
 				// console.log(this.getSongId)
 				api.get_songDetail(idx).then(res=>{
 					if(res.code=200){
 						this.songDetail = res.data.songs[0]
 						//this.picUrl = this.songDetail.al.picUrl
 						//this.singer = this.songDetail.ar[0].name
 						console.log(this.songDetail)
 						this.$store.commit('musicPicUrlMsg',res.data.songs[0].al.picUrl)
 						this.$store.commit('singerMsg',res.data.songs[0].ar[0].name)
 						// this.album = this.songDetail.al.name
 					}
 				})
 			},
 		},
 		components:{
 			Top,
 		}
 	}
</script>
<style lang="less" scoped>
.g-bd4 {
    background: url(../../images/wrap4.png) repeat-y center 0;;
    width: 980px;
    min-height: 700px;
    _height: 700px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    font-size:12px;
}
.playlist-left{
	float: left;
	width: 708px;
	.g-wrap6{
		width:100%;
		height:100%;
		padding: 47px 30px 40px 39px;
		.playlistIntroduction{
			.playlistImage{
				width: 200px;
				height: 200px;
				float:left;
				position:relative;
				display:inline;
				border:1px solid #ccc;
				.coverImg{
					width:100%;
					height:100%;
					padding:3px;
					display:block;
				}
			}
			.playlistText{
				width:410px;
				float:right;
				.hd{
					position: relative;
					margin: 0 0 12px;
					line-height: 24px;
					.u-icn{
						    background: url(../../images/icon.png) no-repeat 0 9999px;
						    width: 54px;
							height: 24px;
							background-position: 0 -243px;
							display:inline-block;
							float:left;
					}
					.tit{
						margin-left: 64px;
						position: relative;
						h2{
							text-align:left;
							line-height: 24px;
						    font-size: 20px;
						    font-weight: normal;
						    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
						}
					}
				}
				.user{
					margin: 0 0 20px;
					line-height: 35px;
					.face{
						float: left;
					    width: 35px;
					    height: 35px;
					    margin-right:10px;
					}
				}
				.tags{
					text-align:left;
					margin: 25px 0 5px;
					line-height: 22px;
					b{
						float:left;
						font-weight: normal;
						color: #666;
						font-size: 12px;
					}
					span{
						float: left;
						margin: 0px 10px 3px 0;
						width:45px;
						height: 20px;
						line-height: 20px;
						display:inline-block;
						background-color:#f6f6f6;
						border-radius:18px;
						border:1px solid #f4f4f4;
						font-size:12px;
					}
				}
				.m-info{
					.play{
						cursor:pointer;
						width:65px;
						height:30px;
						float:left;
						background-color:#0c73c2;
						border:1px solid #0c73c2;
						border-radius:5px;
						position:relative;
						color:#fff;
						.circle {
						    height: 20px;
						    width: 20px;
						    border: solid 2px #fff;
						    border-radius: 50%;
						    position:absolute;
						    margin-top:5px;
						    margin-left:5px;
    						.circle_inner_play {
							    content: "";
							    display: block;
							    width: 0;
							    height: 0;
							    border-style: solid;
							    border-width: 5px 0 5px 10px;
							    border-color: transparent transparent transparent #fff;
							    position: absolute;
							    top: 50%;
							    left: 50%;
							    margin-top:-5px;
							    margin-left:-3px;
							}
						}
						span{
							display:inline-block;
							height:30px;
							line-height:30px;
							margin-left:22px;
						}
					}
				}
				.intro{
				    margin-top: 4px;
				    line-height: 22px;
				    color: #666;
				    text-align:left;
				    b{
				    	font-weight: normal;
						color: #666;
						display:inline-block;
						float:left;
				    }
				}
				.changeBtn{
					margin-top:10px;
					float:left;
					color:#0c73c2;
					cursor:pointer;
				}
				.lyricUser{
					margin-top:80px;
					float:right;
					span{
						color:#0c73c2;	
					}
				}
			}
		}
	}
}
	.playlist-right{
		float: right;
		width: 270px;
		height: 700px;
		.g-wrap7{
			padding: 20px 40px 40px 30px;
			.u-hd3{
				position: relative;
			    height: 23px;
			    margin-bottom: 20px;
			    border-bottom: 1px solid #ccc;
			    color: #333;
			    span{
			    	float:left;
			    }
			}
			.m-piclist {
				margin-left: -13px;
			    padding-bottom: 25px;
			    li{
			    	margin-top: 10px;
			    	float: left;
    				padding: 0 0 13px 13px;
    				.txt{
    					float: left;
					    width: 156px;
					    .f-thide{
					    	text-align: left;
					    	overflow: hidden;
						    text-overflow: ellipsis;
						    white-space: nowrap;
						    word-wrap: normal;
						    a{
						    	line-height: 16px;
						    }
					    }
					    .s-fc4{
					    		color: #999;	
					    	
					    }
    				}
			    }
			}
			.m-rctlist {
			    margin-bottom: 25px;
			    li{

			    }
			}
		}
	}
</style>
<template>
	<div>
		<Top></Top>
		<div id="m-playlist" class="g-bd4 cf">
			<div class="playlist-left">
				<div class="g-wrap6">
					<div class="playlistIntroduction cf">
						<div class="playlistImage">
							<img class="coverImg":src="playListDetail.coverImgUrl">
						</div>
						<div class="playlistText">
							<div class="hd cf">
								<i class="u-icn"></i>
								<div class="tit">
									<h2>{{playListDetail.name}}</h2>
								</div>
							</div>
<!-- 							<div class="user cf">
								<a class="face" :href="'/#/user/home?id='+playListDetail.userId">
								1
									<img src="">
								</a>
								<span></span>
								<sup></sup>
								<span></span>
							</div> -->
							<div class="tags cf">
								<b>标签：</b>
								<span v-for="item in playListDetail.tags">{{item}}</span>
							</div>
							<div class="m-info cf">
								<div class="play" @click="audioPlay(privileges)">
									<div  class="circle " title="播放">
							            <div class="circle_inner_play">
							            </div>
							        </div>
							        <span>
							        	播放
							        </span>
								</div>
							</div>
							<p class="intro cf" v-html="description">
								<b>介绍：</b>
							</p>
						</div>
					</div>
					<div class="n-songtb">
						<div class="u-title cf">
							<h3>
								<span>歌曲列表</span>
							</h3>
							<span class="sub">
								<span>{{playListDetail.trackCount}}</span>
								首歌
							</span>
							<div class="more">
								播放：
								<strong>{{playListDetail.playCount}}</strong>
								次
							</div>
						</div>
						<div class="song-table">
							<table class="m-table">
								<thead>
									<tr>
										<th class="w1">
											<div class="wp"></div>
										</th>
										<th class="">
											<div class="wp">歌曲标题</div>
										</th>
										<th class="w2">
											<div class="wp">时长</div>
										</th>
										<th class="w3">
											<div class="wp">歌手</div>
										</th>
										<th class="w4">
											<div class="wp">专辑</div>
										</th>																				
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,index) in playListDetail.tracks">
										<td class="w1">
											<div>{{index+1}}</div>
										</td>
										<td class="">
											<div>
												<a :href="'/#/song?id='+item.id">
													<span>
														{{item.name}}
													</span>
												</a>
											</div>
										</td>
										<td class="w2">
											<div>
												<a :href="'/#/song?id='+item.id">
													<span>
														{{formatDuring(item.dt)}}
													</span>
												</a>
											</div>
										</td>
										<td class="w3">
											<div>
												<a href="">
													<span>
														{{item.ar[0].name}}
													</span>
												</a>
											</div>
										</td>
										<td class="w4">
											<div>
												<a :href="'#/album?id='+item.al.id">
													<span :title="item.al.name">
														{{item.al.name.length>7?item.al.name.substr(0,7)+'...':item.al.name}}
													</span>
												</a>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="playlist-right">
				<div class="g-wrap7">
					<h3 class="u-hd3">
						<span>喜欢这个歌单的人</span>
					</h3>
					<ul class="m-piclist cf">
						<li class=""v-for="item in playListDetail.subscribers">
							<a :href="'/#/user/home?id='+item.userId" :title="item.nickname">
								<img :src="item.avatarUrl">
							</a>
						</li>
					</ul>
<!--					<h3 class="u-hd3">
						<span>相关歌单推荐</span>
					</h3>
					<ul class="m-rctlist cf">
						<li class=""></li>
					</ul> -->
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
export default {
  name: 'playlist',
  data () {
    return {
    	playListDetail:{},
    	privileges:{},
    	description:'',
    	musicId:''
  	}
  },
  components: {
   		//Loading,
    	Top,
  },
  computed:{
  		...mapState([
  			'songIds',
  			'count'
  		]),
    	...mapGetters([
	    	'getCount',
	    	'getSongId'
    	])
  			
  		
  },
  mounted(){
  		console.log(this.getSongId)
  		this.getPlayListDetail(this.$route.query.id)
  		//console.log(this.privileges)
  		
  },
  methods:{
  		getPlayListDetail(id){
  			api.get_playListDetail(id).then(res=>{
  				if(res.data.code=200){
  					this.playListDetail = res.data.playlist
  					this.privileges = res.data.privileges
  					this.musicId = res.data.privileges[0].id

  					//this.$store.commit('privilegesMsg',res.data.privileges)
  					//localStorage.setItem("privileges",res.data.privileges);
  					console.log(res.data)
  					this.description = res.data.playlist.description
  					this.description = this.description.length>100?this.description.substr(0,100)+'...':this.description
  					this.description = this.description.replace(/\n/g,"<br/>")

  				}
  				console.log(this.description)
  			})
  		},
		// audioPlay() {
		// 	var self = this
	 //    	console.log(this.getSongId)
	 //    	this.$store.commit('songIdMsg',this.musicId)
	 //    	console.log(this.getSongId)
	 //    	this.getSongIds( this.privileges)
	 //    	this.musicPlayShowOrHide(self)
		// 	var audio = document.getElementById("myAudio")
		// 	var innerPlay = document.getElementById("innerPlay")
		// 	var innerPause = document.getElementById("innerPause")
		// 	var audioLength = document.getElementById("audioLength")
		// 	var audioCircular = document.getElementById("audioCircular")
		// 	var nowTime = document.getElementById("nowTime")
		// 	var totalTime = document.getElementById("totalTime")
		// 	var audioDur = audio.duration
			
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
		// 		if(audio.paused === true && audio.currentTime===audioDur) {
		// 		 	innerPause.classList.add("hide")
		// 			innerPlay.classList.remove("hide")
				 	
		// 		 } 
		// 		 //console.log(audioDur)
		// 	    nowTime.innerHTML = transTime(audio.currentTime);
		// 	    totalTime.innerHTML = transTime(audioDur);
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
	 //    },
	    // getSongIds(p){

	    // 	var arr = this.songIds
	    // 	console.log(this.songIds)
	    // 	this.$store.commit('countMsg',this.songIds.length)
	    // 	console.log(this.getCount)
	    // 	for(var i=0;i<p.length;i++){
	    // 		// arr.push(p[i].id)
	    // 		if(this.songIds.indexOf(parseInt(p[i].id)) === -1){
	    // 			arr.push(p[i].id)
	    // 			//this.$store.commit('countMsg',this.count+1)

	    // 		}
	    // 		else{
	    // 			//console.log(this.songIds.indexOf(parseInt(p[0].id)))

	    // 			this.$store.commit('countMsg',this.songIds.indexOf(parseInt(p[0].id)))
	    // 		}
	    		
	    // 	}
	    // 	console.log(this.getCount)
	    // 	this.$store.commit('songIdsMsg',arr)
	    // 	this.$store.commit('songIdMsg',this.songIds[this.getCount])
	    // 	console.log(this.songIds)
	    // },
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
				}
			}
			.n-songtb {
			    margin-top: 27px;
			    color:#666;
			    .u-title{
			    	height:33px;
			    	border-bottom: 2px solid #c20c0c;
			    	h3{
			    		color: #333;
			    		float:left;
		    		    font-size: 20px;
    					line-height: 28px;
    					font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
    					font-weight:normal;
			    	}
			    	.sub{
			    		margin: 9px 0 0 20px;
			    		float:left;

			    	}
			    	.more{
			    		margin-top: 5px;
			    		float:right;
			    		strong{
			    			color: #c20c0c;
			    		}
			    	}
			    }
			    .song-table{
					.m-table {
					    width: 100%;
					    border-right: 1px solid #d9d9d9;
					    border-bottom: 1px solid #d9d9d9;
					    border-collapse:collapse;
					    thead{
					    	border-bottom: 2px solid #d9d9d9;
					    		th{
					    			background-color: #f7f7f7;
					    			height: 38px;
		    						text-align: left;
		    						font-weight: normal;
		    						color: #666;
									border-left: 1px solid #d9d9d9;
							    	border-top: 1px solid #d9d9d9;
		    						.wp{
		    							height: 38px;
									    line-height: 18px;
									    padding: 8px 10px;
		    						}
					    		}
					    }
					    .w1{
					    	width:74px;
					    }
					    .w2{
					    	width:110px;
					    }
					    .w3{
					    	width:90px;
					    }
					    .w4{
					    	width: 130px;
					    }					    
					    td{
					    	padding: 6px 10px;
						    line-height: 15px;
						    text-align: left;
					    	height: 30px;
    						text-align: left;
    						font-weight: normal;
    						color: #666;
							border-left: 1px solid #d9d9d9;
					    	border-top: 1px solid #d9d9d9;
    						.wp{
    							height: 38px;
							    line-height: 18px;
							    padding: 8px 10px;
    						}
					    }
					    tbody{
					    	tr:nth-child(even){

								background-color: #fff;

							}
							tr:nth-child(odd){

								background-color: #f7f7f7;

							}
							tr{
								td{
									border-left:0;
									border-top:0;
								}
								.w1{
									border-left:1px solid #d9d9d9;
								}
							}
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
			    	float: left;
			    	display: inline;
    				padding: 0 0 13px 13px;
				    img{
					    width: 40px;
					    height: 40px;
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

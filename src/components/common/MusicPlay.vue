<template>
	<div class="musicPlay" >
		<div class="m-play" id="mPlay" style="top:0px;">
			<div class="hand" title="展开播放条">
			</div>	
			<div class="wrap">
				<div class="btns cf">
					<div class="prev " >
						<div class="circle" title="上一首"  @click="prevMusic(getCount)">
							<div class="circle_inner_1">
								|
							</div>
				            <div class="circle_inner_prev">
				            </div>							
						</div>						
					</div>
					<div class="play" @click="playOrPause()">
						<div  class="circle " id="innerPlay"title="播放">
				            <div class="circle_inner_play">
				            </div>
				        </div>
				        <div  class="circle hide"  id="innerPause"title="暂停" >
				            <div class="circle_inner_pause">
				                | |
				            </div>
			        	</div>
					</div>
					<div class="next">
				        <div  class="circle " title="下一首"  @click="nextMusic(getCount)">
				        	<div class="circle_inner_next">
				            </div>
							<div class="circle_inner_2">
								|
							</div>
			        	</div>						
					</div>
				</div>
				<div class="musicImage">
					<img :src="musicPicUrl" class="musicImg">
				</div>
				<div class="play cf">
					<div class="musicInfo">
						<a :href="'/#/song?id='+getSongId" class="songName" @click="changeSongId()">
							{{songDetail.name}}
						</a>
						<a href="" class="musicSinger">
							<!-- {{singer}} -->
							{{singer}}
						</a>
					</div>
					<div class="m-pbar">
						<div class="barbg" @click="getElPosition($event)">
							<div class="cur" id="audioLength"></div>
							<span class="f-tdn" id="audioCircular">
							</span>
						</div>
						<div class="time">
							<span id="nowTime">
								00:00
							</span>
							/
							<span id="totalTime">
								00:00
							</span>
						</div>
					</div>
				</div>
				<div class="clearSongs" @click="clearSongs()">
					清除列表
				</div>
			</div>		
		</div>
		<audio  :src="playUrl" controls="controls" ref="audio" id="myAudio">
				{{singer}}
		</audio>
	</div>
</template>
<script>
	import { mapState,mapGetters } from 'vuex'
	import api from"@/api"
	export default{
		name:"musicplay",
		data(){
			return{
				urlId:this.$route.query.id,
				musicUrl:{},
				songDetail:{},
				picUrl:{},
				audioDur:{}
			}
		},
		mounted(){
			//this.$store.commit('songIdMsg',this.urlId)
			 if(Object.keys(this.getSongId).length!=0){
				this.getMusicUrl(this.getSongId)
				this.getSongDetail(this.getSongId)
				this.nextMusic2(this.getCount)				
			}

			
		},
		watch:{
			getSongId(id){
				this.getMusicUrl(id)
				this.getSongDetail(id)
				this.playOrPause()								
				//this.nextMusic2(this.getCount)

				//this.makeAudioPlay(id)
			},
			// getCount(count){
				
			// 	this.nextMusic2(count)
			// }
		},
		computed:{
			...mapGetters([
		      'getSongId',
		      'getCount'
		    ]),
		    ...mapState([
		    	'musicPicUrl',
		    	'playUrl',
		    	'singer',
		    	'songIds'
		    	])

		},
		methods:{
			//获取歌曲URL
 			getMusicUrl(id){
 				api.get_musicUrl(id).then(res=>{
 					//console.log(res)
 					if(res.code=200){
 						//this.musicUrl = res.data.data[0].url
 						this.$store.commit('playurlMsg',res.data.data[0].url)
 					}

 					//localStorage.setItem("songId", this.urlId);
 				})
 			},
 			//获取歌曲详情
 			getSongDetail(idx){
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
		   	getElPosition(event){
		   		var audio = document.getElementById("myAudio")
			    if (!audio.paused || audio.currentTime != 0) {
				    var evt =event||window.event;
				    var srcObj = evt.target || evt.srcElement;
				    var x
				    if (evt.offsetX){
				            x=evt.offsetX
				    }else{
				        var rect = srcObj.getBoundingClientRect();
				            x=evt.clientX - rect.left
				    }
			    	var rate = x / 500;
			    	audio.currentTime = audio.duration * rate;
			    }
			    else{
			    	return
			    }

			},
           playOrPause(){
	    		var audio = document.getElementById("myAudio")
	    		var innerPlay = document.getElementById("innerPlay")
	    		var innerPause = document.getElementById("innerPause")
	    		var audioLength = document.getElementById("audioLength")
	    		var audioCircular = document.getElementById("audioCircular")
	    		var nowTime = document.getElementById("nowTime")
	    		var totalTime = document.getElementById("totalTime")
	    		//var audioDur = audio.duration
	    		//监听音频播放时间，并更新进度条
	    		audio.addEventListener('timeupdate', function () {
		           updateProgress(audio)
		        }, false);
		        
		        //进度条进度及播放暂停按钮切换
				function updateProgress(audio) {
					var audioTime = (audio.currentTime/audio.duration)*500
					audioLength.style.width = audioTime + 'px'
					audioCircular.style.left = (audioTime-6) +'px'
					if(audio.paused === true && audio.currentTime===audio.duration) {
					 	innerPause.classList.add("hide")
						innerPlay.classList.remove("hide")
					 	
					 } 
				    if(audio.duration){
				    	nowTime.innerHTML = transTime(audio.currentTime);
				    	totalTime.innerHTML = transTime(audio.duration);
				    } 
				}
				//时间换算
				function transTime(value) {
				    var time = "";
				    var h = parseInt(value / 3600);
				    value %= 3600;
				    var m = parseInt(value / 60);
				    var s = parseInt(value % 60);
				    if (h > 0) {
				        time = formatTime(h + ":" + m + ":" + s);
				    } else {
				        time = formatTime(m + ":" + s);
				    }

				    return time;
				}
				//格式化时间
				function formatTime(value) {
				    var time = "";
				    var s = value.split(':');
				    var i = 0;
				    for (; i < s.length - 1; i++) {
				        time += s[i].length == 1 ? ("0" + s[i]) : s[i];
				        time += ":";
				    }
				    time += s[i].length == 1 ? ("0" + s[i]) : s[i];

				    return time;
				}
				if(audio!==null){ 
					if(audio.paused){ 
						audio.play();// 播放 
						innerPause.classList.remove("hide")
						innerPlay.classList.add("hide")					//计时器获取当前播放时间
					}else{

						audio.pause();// 暂停
						innerPause.classList.add("hide")
						innerPlay.classList.remove("hide")
						
				}

				}else{
					console.log("音频获取失败")
				}           	
           },
           nextMusic(count){
           		if(this.songIds.length <= 1){
           			alert("当前您只播放过这一首歌")
           		}else{
           			count = count<this.songIds.length-1 ? count+1 : 0;
           			this.$store.commit('countMsg',count)
	           		console.log(this.getCount,this.songIds[count])
	           		this.$store.commit('songIdMsg',this.songIds[count])
	           		var audio = document.getElementById("myAudio")
		    		//var innerPause = document.getElementById("innerPause")
	           		if(audio!==null){

	           			audio.addEventListener("canplay", function(){	
	           				innerPause.classList.remove("hide")
							innerPlay.classList.add("hide")				
							audio.play();

							//console.log('canplay')
						})
	           		}
           		}
           },
           prevMusic(count){
           	    if(this.songIds.length<=1){
           			alert("当前您只播放过这一首歌")
           		}else{
	           		count = count===0 ? this.songIds.length-1 : count-1 ;
	           		
	           		this.$store.commit('countMsg',count)
	           		console.log(this.getCount,this.songIds[count])
	           		this.$store.commit('songIdMsg',this.songIds[count])
	           		var audio = document.getElementById("myAudio")


		    		//var innerPause = document.getElementById("innerPause")
	           		if(audio!==null){

	           			audio.addEventListener("canplay", function(){					
							audio.play();
							innerPause.classList.remove("hide")
							innerPlay.classList.add("hide")
							//console.log('canplay')
						})
	           		}           			
           		}

           },
           //自动播放下一首
            nextMusic2(count){
            	
            	var self = this
            	var innerPlay = document.getElementById("innerPlay")
	    		var innerPause = document.getElementById("innerPause")
            	var audio = document.getElementById("myAudio")
            	var totalTime = document.getElementById("totalTime") 
            	//this.$options.methods.nextMusic(count)
				audio.addEventListener('ended', function () {					
	           		if(self.songIds.length <= 1){
	           			alert("当前您只播放过这一首歌")
	           		}else{
	           			count = self.getCount<self.songIds.length-1 ? self.getCount+1 : 0;
	           			console.log(count,self.getCount)
	           			self.$store.commit('countMsg',count)
		           		self.$store.commit('songIdMsg',self.songIds[count])
			    		//var innerPause = document.getElementById("innerPause")
			    		//console.log(111)
		           		if(audio!==null){
		           			audio.addEventListener("canplay", function(){
		           				//console.log(222)					
								audio.play();
								innerPause.classList.remove("hide")
								innerPlay.classList.add("hide")
								//console.log('canplay')
							})	         			
		           		}
	           		}
		        }, false);
           },
           //清除歌曲缓存
           clearSongs(){
           		this.$store.commit("songIdsMsg" , [])
           		alert("播放列表清除成功")
           }, 
      

		},
		components:{

		}
	}
</script>
<style lang="less" scoped>
	audio{
		display:none;
	}

	.musicPlay{
	    position: fixed;
	    bottom:0;
	    zoom: 1;
	    left: 0;
	    right: 0;
	    height:0;
	    width: 100%;
	    z-index: 1002;
		.m-play{
		    position: absolute;
		    zoom: 1;
		    left: 0;
		    width: 100%;
		    height: 45px;
		    margin: 0 auto;
		    background-color:black;
		    opacity:0.85;
			.hand {
			    position: absolute;
			    top: -10px;
			    width: 100%;
			    height: 20px;
			    cursor: pointer;
			}
			.wrap{
				position: absolute;
			    left: 50%;
			    z-index: 15;
			    width: 980px;
			    height: 45px;
			    margin-left:-490px;
			    .btns{
			    	width:137px;
			    	height:45px;
			    	position:relative;
			    	float:left;
			    	.circle_inner_1{
			    		color:#D6D6D6;
			    		margin-left:-10px;
			    		margin-top:-2px;
			    	}
			    	.circle_inner_2{
			    		color:#D6D6D6;
			    		margin-left:5px;
			    		margin-top:-2px;
			    	}
			    	.circle {
					    border-radius: 50%;
					    position: absolute;
					    cursor:pointer;
					}
					 
					.circle:hover {
					    transform: scale(1.1);
					    -webkit-transform: scale(1.1);
					    -moz-transform: scale(1.1);
					}
                    .prev{
                    	float:left;
						position:relative;
						width:20px;
						height:20px;
						margin-top:12.5px;
						margin-right:10px;
						.circle {
						    height: 20px;
						    width: 20px;
						    border: solid 1px #D6D6D6;
						    .circle_inner_prev {
								    content: "";
								    display: block;
								    width: 0;
								    height: 0;
								    border-style: solid;
								    border-width: 6px;
								    border-color:  transparent #D6D6D6 transparent transparent ;
								    position: absolute;
								    top: 50%;
								    left: 50%;
								    margin-top:-6px;
								    margin-left:-8px;
								}	
						}
                    }
                    .play{	
                    	float:left;	
                    	position:relative;	
                    	width:30px;
						height:30px;
						margin-top:7.5px;
						margin-right:10px;
						.circle {
						    height: 30px;
						    width: 30px;
						    border: solid 2px #fff;
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
							 
							.circle_inner_pause {
							    position: absolute;
							    top: 50%;
							    left: 50%;
							    margin-left: -5px;
							    margin-top: -10px;
							    color: #fff;
							}
						}
                    }
                    .next{
                    	float:left;
						position:relative;
                    	width:20px;
						height:20px;
						margin-top:12.5px;
						.circle {
						    height: 20px;
						    width: 20px;
						    border: solid 1px #D6D6D6;
						    .circle_inner_next {
								    content: "";
								    display: block;
								    width: 0;
								    height: 0;
								    border-style: solid;
								    border-width: 6px;
								    border-color:  transparent transparent transparent #D6D6D6 ;
								    position: absolute;
								    top: 50%;
								    left: 50%;
								    margin-top:-6px;
								    margin-left:-3px;
								}	
						}						
                    }
			    }
			    .musicImage{
			    	float:left;
			    	position: relative;
    				margin: 6px 15px 0 0;
    				width:34px;
    				height:34px;
    				img{
    					width:34px;
    					height:34px;
    					border-radius:5px;
    				}
			    }
			    .play{
			    	float:left;
			    	position: relative;
    				width: 608px;
    				.musicInfo{
					    height: 28px;
					    overflow: hidden;
					    color: #e8e8e8;
					    text-shadow: 0 1px 0 #171717;
					    line-height: 28px;
					    text-align:left;
					    .songName{
							color: #e8e8e8;
							margin-right:10px;
					    }
					    .musicSinger{
					    	color: #9b9b9b;
					    }
    				}
    				.m-pbar{
    					width: 608px;
    					.barbg{
    						cursor:pointer;
    						float:left;
    						width:500px;
    						height: 9px;
    						background-color:#333;
    						border-radius:5px;
    						position:relative;
    						.cur{
    							width:0px;
    							height: 9px;
    							border-radius:5px;
    							background-color:#C20C0C;
    						}
    						.f-tdn{
							    position: absolute;
							    left:-6px;
							    top:-2px;
							    width: 12px;
							    height: 12px;
							    border-radius:6px;
							    background-color:#fff;
    						}
    					}
    					.time{
    						float:left;
							color: #a1a1a1;
							height: 9px;
							line-height:9px;
							margin-left:10px;
    					}
    				}
			    }
			    .clearSongs{
			    	font-size:12px;
	                float:left;
	                margin-top:15px;
	                padding:4px;
	                height:22px;
	                line-height:14px; 
	                color: #e8e8e8; 
	                cursor:pointer;	
	                background-color: #666;
				    border: 1px solid #666;
				    border-radius: 10px;
                }
			}	
		}	
	}
</style>
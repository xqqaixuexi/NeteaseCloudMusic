<template>
	<div>
		<Top></Top>
		<div id="m-playlist" class="g-bd4 cf">
			<div class="playlist-left">
				<div class="g-wrap6">
					<div class="playlistIntroduction cf">
						<div class="cf">
							<div class="playlistImage">
								<img class="coverImg" :src="albumDetail.album.picUrl">
							</div>
							<div class="playlistText">
								<div class="hd cf">
									<i class="u-icn"></i>
									<div class="tit">
										<h2>{{albumDetail.album.name}}</h2>
									</div>
								</div>
								<div class="tags cf">
									<b>歌手：</b>
									<span>{{albumDetail.album.artist.name}}</span>
								</div>
								<div class="tags cf">
									<b>发行公司：</b>
									<span>{{albumDetail.album.company}}</span>
								</div>																					
								<div class="m-info cf">
									<div class="play" @click="audioPlay(albumDetail.songs)">
										<div  class="circle " title="播放">
								            <div class="circle_inner_play">
								            </div>
								        </div>
								        <span>
								        	播放
								        </span>
									</div>
								</div>
							</div>							
						</div>
						<div v-if="description"class="n-albdesc cf" >
							<h3>专辑介绍：</h3>
							<p>
								{{description}}
							</p>
						</div>
					</div>
					<div class="n-songtb">
						<div class="u-title cf">
							<h3>
								<span>包含歌曲列表</span>
							</h3>
							<span class="sub">
								<span>{{albumDetail.album.size}}</span>
								首歌
							</span>
<!-- 							<div class="more">
								播放：
								<strong>{{playListDetail.playCount}}</strong>
								次
							</div> -->
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
										<!-- songs[i].dt -->
											<div class="wp">时长</div>
										</th>
										<th class="w3">
											<div class="wp">歌手</div>
										</th>
<!-- 										<th class="w4">
											<div class="wp">专辑</div>
										</th>	 -->																			
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item,index) in albumDetail.songs">
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
<!-- 										<td class="w2">
											<div></div>
										</td> -->
										<td class="w3">
											<div>
												<a href="">
													<span>
														{{formatDuring(item.dt)}}
													</span>
												</a>
											</div>
										</td>
										<td class="w4">
											<div>
												<a href="">
													<span :title="item.ar[0].name">
														{{item.ar[0].name}}
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
<!-- 			<div class="playlist-right">
				<div class="g-wrap7">
					<h3 class="u-hd3">
						<span>喜欢这张专辑的人</span>
					</h3>
					<ul class="m-piclist cf">
						<li class=""v-for="item in playListDetail.subscribers">
							<a :href="'/#/user/home?id='+item.userId" :title="item.nickname">
								<img :src="item.avatarUrl">
							</a>
						</li>
					</ul>
				</div>
			</div> -->
		</div>
	</div>
</template>
<script>
	import api from "@/api"
 //import Loading from './common/Loading'
 import Top from '../common/Top'
 import { mapState,mapGetters } from 'vuex'
export default {
  name: 'album',
  data () {
    return {
    	playListDetail:{},
    	albumDetail:{},
    	//privileges:{},
    	description:'',

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
  		console.log(this.songIds)
  		this.getAlbumDetail(this.$route.query.id)
  		//this.getPlayListDetail(this.$route.query.id)
  		//console.log(this.privileges)
  		
  },
  methods:{
  		getAlbumDetail(id){
  			api.get_albumDetail(id).then(res=>{
  				if(res.data.code=200){
  					console.log(res.data)
  					this.albumDetail = res.data
  					
  					this.description = res.data.album.description
  					this.description = this.description.length>100?this.description.substr(0,100)+'...':this.description
  				}
  			})
  		},	    

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
	    text-align:left;
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
							    text-align:left;
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
						margin: 5px 0 5px;
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
							height: 20px;
							line-height: 20px;
							display:inline-block;
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
				}
				.n-albdesc{
				    margin-top: 14px;
				    line-height: 22px;
				    color: #666;
				    h3{
				    	text-align:left;
				    }
				    p{
				    	font-weight: normal;
						color: #666;
						display:inline-block;
						float:left;
						text-align:left;
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

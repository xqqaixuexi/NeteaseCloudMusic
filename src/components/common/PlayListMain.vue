<template>
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
						<div class="user cf">
							<a class="face" :href="'/#/user/home?id='+playListDetail.userId">
							
								<img :src="playListDetail.creator.avatarUrl">
							</a>
							<span class="name">
								<a :href="'/#/user/home?id='+playListDetail.userId">  
									{{playListDetail.creator.nickname}}
								</a>
							</span>
							<!-- <span>{{playListDetail.createTime| formatDate }}</span> -->
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
						<div v-show="playListDetail.tags.length!=0"class="tags cf">
							<b>标签：</b>
							<span v-for="item in playListDetail.tags">{{item}}</span>
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
</template>
<script>
import api from "@/api"
 import { mapState,mapGetters } from 'vuex'
export default {
  name: 'playlistmain',
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
  		this.getPlayListDetail(this.$route.query.id)
  		
  },
  watch:{
  		'$route' (to,from){
  			if(this.$route.query){
  				this.getPlayListDetail(this.$route.query.id)
  			}
  		}
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
  					if(res.data.playlist.description!=null)
  					this.description = res.data.playlist.description
  					this.description = this.description.length>100?this.description.substr(0,100)+'...':this.description
  					this.description = this.description.replace(/\n/g,"<br/>")

  				}
  			})
  		}
  }

}
</script>
<style lang="less" scoped>
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
    					.name{
    						float:left;
    						a{
    							color: #0c73c2;
    							cursor: pointer;
    						}
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
						margin-top:20px;
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
							    margin-left:3px;
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
</style>

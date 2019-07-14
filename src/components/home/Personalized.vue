<template>
<div class="home">
<div class="home-main cf">
	<div class="home-left">
		<div class="personalized">
			<div class="homenav-h2">
				<div class="cf">
					<a href="/discover/playlist/" class="tit">热门推荐</a>
					<div class="tab">
						<a href="javascript:void(0);">华语</a>
						<span>|</span>
						<a href="javascript:void(0);">流行</a>
						<span>|</span>
						<a href="javascript:void(0);">摇滚</a>
						<span>|</span>
						<a href="javascript:void(0);">民谣</a>
						<span>|</span>
						<a href="javascript:void(0);">电子</a>
						<span>|</span>
					</div>
					<span class="more">
						<a href="javascript:void(0);">更多</a>
						→
					</span>
				</div>
			</div>
			<ul class="personalized-main cf">
				<li v-for="(item, index) in personalized" v-if='index<8'>
					<div class="u-cover">
						<img :src="item.picUrl">
							<router-link :to="{ path:'/playlist', query: { id: item.id }}">
								<a class="msk" title="查看歌单"></a>
							</router-link>

						
						<!-- <a :href="'/#/playlist/?id='+item.id" class="msk" title="查看歌单"></a> -->
						<div class="bottom">
							<span class="nb">
								{{item.playCount|formatCount}}
							</span>
						</div>
					</div>
					<p>{{item.name}}</p>
				</li>
			</ul>
		</div>
		<div class="newMusic cf">
			<div class="homenav-h2">
				<a href="" class="tit f-ff2 f-tdn">新碟上架</a>
				<span class="more">
					<a href="javascript:void(0);">更多</a>
					→
				</span>
			</div>
			<div class="album-main">
				<ul class="cf">
					<li v-for="item in albums">
						<div class="u-cover">
							<img :src="item.picUrl">
							<a :href="'/#/album/?id='+item.id" class="msk" title="查看详情"></a>
						</div>
						<p>{{item.name}}</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="topList">
			<div class="homenav-h2">
				<a href="/discover/toplist" class="tit f-ff2 f-tdn">榜单</a>
				<span class="more">
					<a href="javascript:void(0);">更多</a>
					→
				</span>
			</div>
			<div class="topList-main cf">
				<dl class="blk cf">
					<dt class="blk-top cf">
						<div class="u-cover-4">
							<img :src="cloudMusicList.coverImgUrl">
							<a href="" class="msk"></a>
						</div>
						<div class="tit">
							<a href="">
								<h4>{{cloudMusicList.name}}</h4>
							</a>
						</div>				
					</dt>
					<dd>
						<ol>
							<li v-for="(item, index) in cloudMusicList.tracks" v-if="index<10">
								<span :style="topListStyle" > {{index+1}}</span>
								<a :href="'#/song?id='+item.id" :title="item.name">{{item.name}}</a>
							</li>
							<div class="more">
								<a href="">查看全部></a>
							</div>
						</ol>
					</dd>
				</dl>
				<dl class="blk cf">
					<dt class="blk-top cf">
						<div class="u-cover-4">
							<img :src="newMusicList.coverImgUrl">
							<a href="" class="msk"></a>
						</div>
						<div class="tit">
							<a href="">
								<h4>{{newMusicList.name}}</h4>
							</a>
						</div>				
					</dt>
					<dd>
						<ol>
							<li v-for="(item, index) in newMusicList.tracks" v-if="index<10">
								<span :style="topListStyle" > {{index+1}}</span>
								<a :href="'#/song?id='+item.id" :title="item.name">{{item.name}}</a>
							</li>
							<div class="more">
								<a href="">查看全部></a>
							</div>
						</ol>
					</dd>
				</dl>
				<dl class="blk cf">
					<dt class="blk-top cf">
						<div class="u-cover-4">
							<img :src="yuancMusicList.coverImgUrl">
							<a href="" class="msk"></a>
						</div>
						<div class="tit">
							<a href="">
								<h4>{{yuancMusicList.name}}</h4>
							</a>
						</div>				
					</dt>
					<dd>
						<ol>
							<li v-for="(item, index) in yuancMusicList.tracks" v-if="index<10">
								<span :style="topListStyle" > {{index+1}}</span>
								<a :href="'#/song?id='+item.id" :title="item.name">{{item.name}}</a>
							</li>
							<div class="more">
								<a href="">查看全部></a>
							</div>
						</ol>
					</dd>
				</dl>
			</div>
		</div>		
	</div>
	<div class="home-right">
		<div v-if="!logined" class="userInfo">
			<p class="note">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
			<a href="/#/login" class="btn">用户登录</a>
		</div>
		<div v-if="logined" class="userInfo2">
			<div class="n-myinfo">
				<div class="cf">
					<a :href="'#/user/home?id='+getUserInfo.profile.userId" class="head">
						<img :src="getUserInfo.profile.avatarUrl">
					</a>
					<div class="info">
						<h4>{{getUserInfo.profile.nickname}}</h4>
					</div>
				</div>
				<ul class="dny cf">
					<li class="fst">
						<a href="'#/user/home?id='+getUserInfo.profile.userId">
							<strong>{{getUserInfo.profile.eventCount}}</strong>
							<span>动态</span>
						</a>
					</li>
					<li>
						<a href="'#/user/home?id='+getUserInfo.profile.userId">
							<strong>{{getUserInfo.profile.follows}}</strong>
							<span>关注</span>									
						</a>
					</li>
					<li class="thr">
						<a href="'#/user/home?id='+getUserInfo.profile.userId">
							<strong>{{getUserInfo.profile.followeds}}</strong>
							<span>粉丝</span>									
						</a>
					</li>														
				</ul>
			</div>		
		</div>
		<div class="singerList">
			<h3 class="v-hd3">
				<span>入驻歌手</span>
				<a href="javascript:void(0);">查看全部></a>
			</h3>
			<ul class="singerList-main">
				<li v-for="(item,index) in artists" v-if="index<5" class="cf">		
					<a href="" class="itm">
						<div class="head">
							<img :src="item.picUrl">
						</div>
						<div class="ifo">
							<h4>
								<span>{{item.name}}</span>
							</h4>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</div>
</div>
</template>
<script>
	import api from "@/api"
	import { mapState,mapGetters } from 'vuex'
	export default{
		name:"personalized",
		data(){
			return{
				personalized:{},
				albums:{},
				cloudMusicList:{},
				newMusicList:{},
				yuancMusicList:{},
				artists:{}
			}
		},
		filters: {
			formatCount(count){
				if(count>100000000){//亿
					count = Math.floor(count/100000000*10)/10+'亿次'
				}
				else if(count>100000){//10万
					count = Math.floor(count/10000*10)/10+'万次'
				}
				else{
					count = count +'次'
				}
				return count;
			}
		},
		mounted(){
			this.pl()
			this.album(0,5)
			this.topList(3)
			this.topList(0)
			this.topList(2)
			this.singerList(5001)
			console.log(this.getUserInfo)
		},
		computed:{
		  	topListStyle() {
			        if( this.index<3) {
			            return 'color: #c10d0c';
			        }
			        // 否则不添加样式
			        return 'color: #666';
		  	},
		  	...mapGetters([
				'logined',
				'getUserInfo'
			]),

		},
		methods:{
			pl(){
				api.get_personalized().then(res =>{					
					if(res.data.code = 200) {
						this.personalized= res.data.result
						//console.log(this.personalized)
					}
				})
			},
			album(o,l){
				api.get_album(o,l).then(res =>{
					if(res.data.code = 200) {
						this.albums= res.data.albums
						// console.log(res)
					}
				})
			},
			topList(idx){
				api.get_topList(idx).then(res =>{
					if(res.data.code = 200){
						if(idx==3){
							this.cloudMusicList = res.data.playlist
							 // console.log(res.data)
						}
						if(idx==0){
							this.newMusicList = res.data.playlist
							// console.log(res.data.playlist)
						}
						if(idx==2){
							this.yuancMusicList = res.data.playlist
							// console.log(res.data.playlist)
						}
					}
				})
			},
			singerList(cat){
				api.get_singerList(cat).then(res =>{
					console.log(res)
					if(res.data.code = 200){
						this.artists = res.data.artists
					}
					// console.log(this.artists)
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.home{
		a{
	    	color: #666;
	    }
	}
	.home-main{
		    width: 980px;
		    margin:0 auto;
		    border: 1px solid #d3d3d3;
		    border-top:0;
		    font-family: Arial, Helvetica, sans-serif;
		    font-size: 12px;
		    background: #fff;
		    .home-left{
		    	float:left;
		    	width: 75%;
    			padding: 20px 20px 0px ;
    			border-right: 1px solid #d3d3d3;		   
    		}
		    .home-right{
		    	position:relative;
		    	float:right;
		    	width:25%;	
		    }
	}
	.personalized,.newMusic,.topList{
		    a{
		    	color: #666;
		    }
	}
	.topList{
		margin-bottom:30px;
	}
	.homenav-h2 {
	    height: 33px;
	    padding: 0 10px 0 34px;
	    background-position: -225px -156px;
	    border-bottom: 2px solid #C10D0C;
	    .tit{
	   		float: left;
	    	font-size: 20px;
	    	font-weight: normal;
	    	line-height: 28px;
	    	color:#333;
	    }
	    .tab{
		    float: left;
	    	margin: 7px 0 0 20px;
	    	a{
	    		color: #666;
	    	}
	    }
	    .more{
	    	float:right;
	    	margin-top:9px;
	    	color:red;
	    	a{
	    		color:#666;
	    	}
	    }
	}
	.personalized-main{
		    margin: 20px 0 0 -42px;
		    li{
		    	width: 180px;
			    height: 204px;
			    padding-left: 42px;
			    float: left;
				display: inline-block;
				overflow: hidden;
				padding: 0 0 30px 50px;
				line-height: 1.4;
				.u-cover {
					position: relative;
					display: block;
					img {
					    display: block;
					    width: 100%;
					    height: 100%;
					}
					a{
						position:absolute;
						top:0;
						left:0;
						width:100%;
						height:100%;
					}
					a:hover{
						background-color:black;
						opacity:0.2;
					}
					.bottom {
					    position: absolute;
					    bottom: 0;
					    left: 0;
					    width: 100%;
					    height: 27px;
					    background-position: 0 -537px;
					    background: url(../../images/coverall.png) no-repeat;
					    .nb{
					    	line-height:27px;
					    }
					}
				}
		    }
	}
	.album-main{
	    float: left;
	    width: 670px;
	    height: 180px;
	    overflow: hidden;
	    margin-top:10px;
	    li {
		    float: left;
		    display: inline;
		    width: 118px;
		    height: 180px;
		    margin-left: 15px;
		    .u-cover{
		    	width: 110px;
    			height: 110px;
    			margin-right:10px;
    			position:relative;
				img {
				    display: block;
				    width: 100%;
				    height: 100%;
				    border-radius:50%;
				}
				a{
					position:absolute;
					top:0;
					left:0;
					width:100%;
					height:100%;
					border-radius:50%;
				}
				a:hover{
					background-color:black;
					opacity:0.2;
				}
		    }
		}
		p{
			margin-top:10px;
			width:100px;
		}
	}
	.topList-main{
		height: 472px;
	    margin-top: 20px;
	    padding-left: 1px;
	    background: url(../../images/index_bill.png) no-repeat;
	    .blk{
	    	float: left;
    		width: 230px;
    		.blk-top{
			    height: 120px;
			    padding: 20px 0 0 19px;
    			.u-cover-4{
    				position:relative;
    				width:80px;
    				height:80px;
    				float:left;
    				display:inline;
    				img{
	    				display:block;
	    				width:100%;
	    				height:100%;
	    			}
	    			.msk{
	    				position:absolute;
	    				top:0;
	    				left:0;
	    				width:100%;
	    				height:100%;
	    			}
    			}
    			.tit{
    				float: left;
				    width: 116px;
				    margin: 6px 0 0 10px;
    			}
    		}
    		ol {
			    height: 319px;
			    margin-left: 50px;
			    line-height: 32px;
			    li{
			    	height: 32px;
			    	span{
			    		float: left;
					    position: relative;
					    width: 35px;
					    height: 32px;
					    margin-left: -35px;
					    text-align: center;
					    color: #666;
					    font-size: 16px;
			    	}
			    	a{
			    		float: left;
					    width: 170px;
					    height: 32px;
					    text-align:left;
					    font-size:12px;
					    overflow:hidden;
			    	}
			    }
			    .more{
			    	height: 32px;
				    margin-right: 32px;
				    text-align: right;
				    line-height: 32px;
			    }
			    a:hover{
			    	text-decoration:underline;
			    }
			}
	    }
	    .middle{
	    	border-left:0;
	    	border-right:0;
	    }
	}
	.userInfo2{
		height: 185px;
		border-bottom:1px solid #ccc;
		background:#fafafa;	
		.n-myinfo {
		    height: 106px;
		    padding-top: 20px;
		    .head {
		    	position:relative;
			    float: left;
			    width: 80px;
			    height: 80px;
			    margin-left: 20px;
			    padding: 2px;
			    background: #fff;
			    border: 1px solid #dadada;
			}
			.info{
			    float: left;
			    width: 115px;
			    margin-left: 18px;
			    padding-top: 30px;
			}
		}
		.dny{
			margin: 22px 0 0 20px;
		    color: #666;
		    li {
			    float: left;
			    height: 40px;
			    padding: 0 18px;
			    border-right: 1px solid #e4e4e4;
			    a{
		    	    display: block;
                	color: #666;
                	text-decoration:none;
                	strong{
            		    display: block;
					    font-size: 20px;
					    font-weight: normal;
                	}
                	span{
            		    margin-left: 2px;
                	}
			    }
			}
			.fst{
				padding-left: 0;
			}
			.thr{
				border-right:0;
			}
		}	
	}
	.userInfo{
		height: 126px;
		padding-top: 0;
		background-position: 0 0;
		background: url(../../images/index.png) no-repeat 0 0px;
		.note{
			width: 205px;
		    margin: 0 auto;
		    padding: 16px 0;
		    line-height: 22px;
		    text-align:left;
		}
		.btn{
			display: block;
		    width: 100px;
		    height: 31px;
		    margin: 0 auto;
		    line-height: 31px;
		    text-align: center;
		    color: #fff;
		    background-color:#C10D0C;
		    box-shadow: 1px 1.5px 0 #8a060b;
		    border-radius:5px;
		}

	}
	.singerList{
		margin-top:15px;
		.v-hd3{
			position: relative;
		    height: 23px;
		    margin: 0 20px;
		    border-bottom: 1px solid #ccc;
		    color: #333;
		    span{
		    	float:left;
		    }
		    a{
		    	float:right;
		    	color:#333;
		    	font-weight: normal;
		    }
		    a:hover{
		    	text-decoration:underline;
		    }
		}
		.singerList-main{
			margin: 6px 0 14px 20px;
			li{
				margin-top: 14px;
				.itm{
					float: left;
				    width: 210px;
				    height: 62px;
				    background: #fafafa;
				    .head{
				    	float: left;
						width: 62px;
						height: 62px;
				    	img{
							width:100%;
							height:100%;
				    	}
				    }
				    .ifo{
					    float: left;
					    width: 146px;
					    height: 62px;
					    padding-left: 14px;
					    border: 1px solid #e9e9e9;
					    border-left: none;
					    h4{
					    	margin-top:8px;
					    	text-align:left;
					    	font-size:14px;
					    	span{
					    		color:#333;
					    	}
					    }
				    }
				}
			}
		}
	}
</style>
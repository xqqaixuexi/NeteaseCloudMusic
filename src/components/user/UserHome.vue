<template>
	<div>
		<Top></Top>
		<div class="g-bd">
			<div v-show="this.logined" class="wrap">
				<dl class="m-proifo cf">
					<dt class="f-pr">
						<img :src="userDetail.profile.avatarUrl">
					</dt>
					<dd>
						<div class="name cf">
							<h2>
								<span class="tit">
									{{userDetail.profile.nickname+' (Lv.'+userDetail.level+')'}}									
								</span>
							</h2>
						</div>
						<ul class="data cf">
							<li class="fst">
								<a href="">
									<strong>{{userDetail.profile.eventCount}}</strong>
									<span>动态</span>
								</a>
							</li>
							<li>
								<a href="">
									<strong>{{userDetail.profile.follows}}</strong>
									<span>关注</span>									
								</a>
							</li>
							<li>
								<a href="">
									<strong>{{userDetail.profile.followeds}}</strong>
									<span>粉丝</span>									
								</a>
							</li>														
						</ul>
					</dd>
				</dl>
				<div class="u-title" v-show="likePlaylist.length>0">
					<h3>
						<span v-if="myOrThem">{{"我创建的歌单®（"+likePlaylist.length+"）"}}</span>
						<span v-if="!myOrThem">
							{{userDetail.profile.nickname+"收藏的歌单®（"+likePlaylist.length+"）"}}
						</span>
					</h3>
				</div>
				<div class="m-likePlaylist cf">
					<ul>
						<li v-for="(item,index) in likePlaylist">
							<div class="u-cover">
								<img :src="item.coverImgUrl">
								<a :href="'/#/playlist?id='+item.id" titel="查看歌单"></a>
								<div class="bottom">
									<span class="nb">
										{{item.playCount>10000 ? Math.floor(item.playCount/10000)+'万次': item.playCount+'次'}}
									</span>
								</div>
							</div>
							<p>{{item.name}}</p>
						</li>
					</ul>
				</div>
				<div class="u-title" v-show="collectPlaylist.length>0">
					<h3>
						<span v-if="myOrThem">{{"我收藏的歌单®（"+collectPlaylist.length+"）"}}</span>
						<span v-if="!myOrThem">
							{{userDetail.profile.nickname+"收藏的歌单®（"+collectPlaylist.length+"）"}}
						</span>
					</h3>
				</div>	
				<div class="m-collectPlaylist cf">
					<ul>
						<li v-for="(item,index) in collectPlaylist">
							<div class="u-cover">
								<img :src="item.coverImgUrl">
								<a :href="'/#/playlist?id='+item.id" titel="查看歌单"></a>
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
		name:"userhome",
		data(){
			return{
				likePlaylist:{},
				collectPlaylist:{},
				userDetail:{},
				myOrThem:true
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
			if(this.getUserInfo.profile.userId == this.$route.query.id){
				this.myOrThem = true
			}else{
				this.myOrThem = false
			}
			console.log(this.myOrThem)
			//this.getUserSubcount()
			this.getUserDetail(this.$route.query.id)
			this.getUserPlayList(this.$route.query.id)
			
		},
		computed:{
			...mapGetters([
				'getUserInfo',
				'logined'
				])
		},
		methods:{
			getUserDetail(uid){
				api.user_detail(uid).then(res=>{
					if(res.status=200){
						if(res.data.code=200){
							console.log(res)
							this.userDetail = res.data
						}
						else{
							console.log(res.data.code)
						}
					}
				})
			},
			getUserPlayList(uid){
				api.get_userPlayList(uid).then(res=>{
					if(res.status=200){
						var arrA=[],
							arrB=[],
							playlist = res.data.playlist
						console.log(res.data.playlist)
						for(let i=0;i<playlist.length;i++){
							if(playlist[i].userId == this.$route.query.id){
								arrA.push(playlist[i])
							}
							else{
								arrB.push(playlist[i])								
							}
						}
						this.likePlaylist = arrA
						this.collectPlaylist = arrB
						console.log(this.likePlaylist)
						console.log(this.collectPlaylist)
					}
				})
			}
		},
		components:{
			Top,
		}
	}
</script>
<style lang="less" scoped>
	.g-bd{
		width: 980px;
	    min-height: 700px;
	    margin: 0 auto;
	    background-color: #fff;
	    border: 1px solid #d3d3d3;
	    border-width: 0 1px;
	    .wrap{
	    	padding:40px;
	    	.m-proifo{
	    		margin-bottom: 43px;
	    		.f-pr{
    			    float: left;
				    width: 188px;
				    margin-right: 40px;
				    position: relative;
    				zoom: 1;
    				img{
					    display: block;
					    width: 180px;
					    height: 180px;
					    padding: 3px;
					    background: #fff;
					    border: 1px solid #d5d5d5;
    				}
	    		}
	    		dd{
    			    float: left;
    				width: 670px;
		    		.name{
		    			padding-bottom: 12px;
					    margin-bottom: 10px;
					    border-bottom: 1px solid #ddd;
					    .tit{
				    	    float: left;
						    margin-top: 3px;
						    font-size: 22px;
						    font-weight: normal;
						    line-height: 30px;
					    }
		    		}
		    		.data{
	    			    height: 41px;
    					margin-bottom: 15px;
    					li{
    						float: left;
    						padding: 0 40px 0 20px;
    						border-left: 1px solid #ddd;
    						a{
    							display: inline-block;
							    position: relative;
							    zoom: 1;
							    color: #666;
							    text-decoration: none;
							    strong{
						    	    display: block;
								    margin-top: -4px;
								    font-size: 24px;
								    font-weight: normal;
								    cursor: pointer;
							    }
							    span{
						    	    display: block;
								    text-indent: 2px;
								    cursor: pointer;
							    }
    						}
				    		a:hover{
				    			color: #0c73c2;
				    		}
    					}
    					.fst{
						    padding-left: 0;
    						border-left: none;
    					}
		    		}
	    		}
	    	}
	    	.u-title{
	    		height:33px;
	    		border-bottom:2px solid #c20c0c;
	    		h3{
	    			float:left;
	    			font-size: 20px;
    				line-height: 28px;
    				font-weight: normal;
	    		}
	    	}
	    	.m-likePlaylist,.m-collectPlaylist {
	    		margin: 20px 0 0 -42px;
	    		ul{
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
							    min-height:130px;
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
	    	}
	    }
	}
</style>
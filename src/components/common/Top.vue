<template>
	<div class="header">
		<div class="m-top">
			<div class="warp cf">
				<h1 class="logo">
					<a href="#/">网易云音乐</a>
				</h1>
				<ul class="m-nav">
					<li class="fst">
						<span>
							<a href="" class="bg-black">
								<em>发现音乐</em>
								<sub class="cor triangle_border_up"></sub>
							</a>
						</span>
					</li>
					<li>
						<span>
							<a href="javascript:void(0);" class="">
								<em>我的音乐</em>
								<sub class="cor"></sub>
							</a>
						</span>
					</li>
				</ul>
				<div class="login">
					<div v-if="!logined">
						<a class="link" href="/#/login">登录</a>
					</div>
					<div v-if="logined">
						<div class="userInfo ">
							<img v-bind:src="getUserInfo.profile.avatarUrl">
						</div>
						<div class="userInfoList">
							<ul>
							<router-link :to="{ path: '/user/home', query: { id: getUserInfo.profile.userId }}">
								<li>
								我的主页
								</li>
							</router-link>

								<li>
									<a v-on:click="Logout()">退出</a>
								</li>
							</ul>
						</div>
					</div> 
				</div>
				<div class="search">
					<div class="searchbg">
						<span class="parent">
							<input ref="search" type="" name="" placeholder="搜索歌曲" v-model.trim="search_value" @keyup.enter="enterSearchMember($event)">
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="m-subnav m-subnav-up j-tflag"></div>
		<div class="m-nav2">
			<div class="warp cf">
				<ul class="nav-ul">
					<li>
						<a href="/#">
							<em class="bg-red">推荐</em>
						</a>
					</li>
					<li>
						<a href="">
							<em class="">排行榜</em>
						</a>
					</li>
					<li>
						<a href="">
							<em class="">歌单</em>
						</a>
					</li>
					<li>
						<a href="">
							<em class="">主播电台</em>
						</a>
					</li>
					<li>
						<a href="">
							<em class="">歌手</em>
						</a>
					</li>
					<li>
						<a href="">
							<em class="">新碟上架</em>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import api from "@/api"
	import { mapGetters } from 'vuex'
	export default {
		name:'top',
		// props:{
		// 	["search_value"]
		// },
		data(){
			return{
				search_value:''
			}
		},
		mounted (){
			//this.$refs.search.value = this.getKeyWords
			this.search_value= this.getKeyWords
		},
		computed: {
		    ...mapGetters([
		    	'getUserInfo',
		    	'logined',
		    	'getKeyWords'
		      // ...
		    ])
		},
		methods: {
			//搜索
			enterSearchMember(e){
				let searchNick = e.srcElement.value
				if (searchNick !== 0 && searchNick !==undefined && searchNick !=='') {
					this.$store.commit('keyWords',searchNick)
					this.$router.push({name:'Search', query:{keywords:searchNick}})	
				}
			},
			//登出接口有问题，只能模拟登出
			Logout() {
				let r=confirm("您确定退出吗？");
				if(r==true){
					// api.logout().then(res=>{
					// 	console.log(this.res)
					// })
					this.$store.commit('loginedMsg',false)
					this.$router.push({name:'Index'})
					// this.$router.go(0)
				}
				else{
					return
				}			
			}
		}
	}
</script>
<style lang="less" scoped>
    a{
    	color: #fff; 
    }
	.bg-black{
		background: #000;
	}
	.bg-red{
		background: #9B0909;
	}
	.m-nav li, .m-nav li span, .m-nav a, .m-nav a em {
	    float: left;
	    height: 70px;
	    font-size: 14px;
	}
	.m-top{
		height:70px;
	    position: relative;
	    z-index: 1000;
	    box-sizing: border-box;
	    background: #242424;
	    border-bottom: 1px solid #000;
	    .warp{
		   	width: 1000px;
	    	margin: 0 auto;
	    	.logo{
	    		float: left;
			    width: 176px;
			    height: 69px;
			    background-position: 0 0;
			    background: url(../../../static/images/top/topbar.png) no-repeat 0 0;
			    a{
					float: left;
				    width: 157px;
				    height: 100%;
				    padding-right: 20px;
				    text-indent: -9999px;
			    }
	    	}
	    	.m-nav{
	    		float:left;
	    		li{
	    			position: relative;
    				background-position: right -300px;
    				a{
						padding: 0 19px;
						text-align: center;
						line-height: 70px;
						.cor{
							display: block;
						    position: absolute;
						    left: 50%;
						    top: 64px;
						    width: 12px;
						    height: 7px;
						    margin-left: -6px;
						    overflow: hidden;
						    background-position: -226px 0;
						    background: url(../../../static/images/top/topbar.png) no-repeat 0 9999px;
						}
    				}
	    		}
	    	}
	    	.login {
	    		cursor:pointer;
	    		position:relative;
			    float: right;
			    height: 45px;
			    margin: 19px 0 0 20px;
			    padding: 0 22px 0 0;
			    background-position: right -47px;
			    background: url(../../../static/images/top/topbar.png) no-repeat 0 9999px;
			    .link{
			    	display: block;
				    width: 28px;
				    margin-top: 7px;
				    color: #787878;
			    }
			    .userInfo{
			    	img{
			    		border-radius:100%;
			    		width:30px;
			    		height:30px;
			    		min-height:20px;
			    	}
			    }
			    .userInfoList{
			    	display:none;
			    	position: absolute;
					top: 38px;
				    right: -43px;
				    width: 158px;
				    background: #2b2b2b;
				    border: 1px solid #202020;
				    box-shadow: 0 8px 24px 0 rgba(0,0,0,0.50);
				    border-radius: 4px;
				    li{
				    		float: left;
						    box-sizing: border-box;
						    width: 100%;
						    height: 34px;
    						line-height: 34px;
				    }
			    }
			    &:hover{
					.userInfoList{
						display:block;
					}
		    	}
			}
			.search{
				float: right;
			    width: 158px;
			    .searchbg{
			    	margin-top: 19px;
				    background-position: 0 -99px;
				    background-color: #fff;
				    border-radius: 32px;
				    .parent{
				    	display: block;
					    position: relative;
					    input{
					    	height:32px;
					    	color: #333;
    						line-height: 16px;
    						width: 95%;
						    margin: 0;
						    padding: 0;
						    background: transparent;
						    border:0;
					    }
				    }
			    }
			}
		}
	}
	.m-nav2{
		z-index: 90;
	    height: 35px;
	    box-sizing: border-box;
	    background-color: #C20C0C;
	    border-bottom: 1px solid #a40011;
	    .warp{
	    	width: 1000px;
		    height: 34px;
		    margin: 0 auto;
		    .nav-ul{
		    	float: left;
    			padding-left: 180px;
				li{
					float: left;
				    height: 34px;
				    text-align: center;
				    em{
				    	font-size:12px;
				    	display: inline-block;
					    height: 20px;
					    padding: 0 13px;
					    margin: 7px 17px 0;
					    border-radius: 20px;
					    line-height: 21px;
				    }
				    &:hover{
				    	em{
				    		background: #9B0909;				    		
				    	}

				    }
				}
		    }
	    }
	}

</style>
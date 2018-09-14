<template>
<div class="home">
<div class="home-main cf">
	<div class="personalized">
		<div class="homenav-h2">
			<div class="cf">
				<a href="/discover/playlist/" class="tit">热门推荐</a>
				<div class="tab">
					<a href="">华语</a>
					<span>|</span>
					<a href="">流行</a>
					<span>|</span>
					<a href="">摇滚</a>
					<span>|</span>
					<a href="">民谣</a>
					<span>|</span>
					<a href="">电子</a>
					<span>|</span>
				</div>
				<span class="more">
					<a href="">更多</a>
					>>
				</span>
			</div>
		</div>
		<ul class="personalized-main cf">
			<li v-for="(item, index) in personalized" v-if='index<8'>
				<div class="u-cover">
					<img :src="item.picUrl">
					<a :href="'/playlist/?id='+item.id" class="msk" title="查看歌单"></a>
					<div class="bottom">
<!-- 						<a class="icon-play" title="播放" href="javascript:;" data-res-type="" data-res-id="" data-res-action="play"></a>
						<span class="icon-headset"></span> -->
						<span class="nb">{{item.trackCount}}万</span>
					</div>
				</div>
				<p>{{item.name}}</p>
			</li>
		</ul>
	</div>
	<div class="newMusic cf">
		<div class="homenav-h2">
			<a href="/discover/album/" class="tit f-ff2 f-tdn">新碟上架</a>
			<span class="more">
				<a href="">更多</a>
				>>
			</span>
		</div>
		<div class="album-main">
			<ul class="cf">
				<li v-for="item in albums">
					<div class="u-cover">
						<img :src="item.picUrl">
						<a :href="'/album/?id='+item.id" class="msk" title="查看详情"></a>
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
				<a href="">更多</a>
				>>
			</span>
		</div>
		<div class="topList-main cf">
			<dl class="blk cf">
				<div class="blk-top">
				<a href="">
					<h4>{{cloudMusicList.name}}</h4>
				</a>
				</div>
				<ul>
					<li>111</li>
				</ul>
			</dl>
			<dl class="blk middle">
				<div class="blk-top">
					<a href="">
						<h4>{{newMusicList.name}}</h4>
					</a>
				</div>
				<ul>
					<li>111</li>
				</ul>
			</dl>
			<dl class="blk">
				<div class="blk-top">
					<a href="">
						<h4>{{yuancMusicList.name}}</h4>
					</a>
				</div>
				<ul>
					<li>111</li>
				</ul>
			</dl>
		</div>
	</div>
</div>
</div>
</template>
<script>
	import api from "@/api"
	export default{
		name:"personalized",
		data(){
			return{
				personalized:{},
				albums:{},
				cloudMusicList:{},
				newMusicList:{},
				yuancMusicList:{},
			}
		},
		mounted(){
			this.pl()
			this.album(0,5)
			this.topList(3)
			this.topList(0)
			this.topList(2)
		},
		computed:{

		},
		methods:{
			pl(){
				api.get_personalized().then(res =>{					
					if(res.data.code = 200) {
						this.personalized= res.data.result
						// console.log(this.personalized)
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
							console.log(res.data.playlist)
						}
						if(idx==0){
							this.newMusicList = res.data.playlist
							console.log(res.data.playlist)
						}
						if(idx==2){
							this.yuancMusicList = res.data.playlist
							console.log(res.data.playlist)
						}
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.home{

	}
	.home-main{
		    width: 980px;
		    margin:0 auto;
		    border: 1px solid #d3d3d3;
	}
	.personalized,.newMusic,.topList{
		width: 75%;
		    padding: 20px 20px 0px;
		    a{
		    	color: #333;
		    }
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
						.icon-play {
							display:block;
						    width: 16px;
						    height: 17px;
						    background-position: 0 -100px;
						    background: url(../../images/iconall.png) no-repeat;
						    float: right;
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
	    .blk{
	    	float: left;
    		width: 230px;
    		border:1px solid #d3d3d3;
    		.blk-top{
	    		height:40px;
    			line-height:40px;
    			border-bottom:1px solid #d3d3d3;
    		}
	    }
	    .middle{
	    	border-left:0;
	    	border-right:0;
	    }
	}
</style>
<template>
<div class="home">
<div class="home-main cf">
	<div class="personalized">
		<div class="personalized-nav">
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
		<ul class="personalized-main">
			<li v-for="(item, index) in personalized" v-if='index<8'>
				<div class="u-cover">
					<img :src="item.picUrl">
					<a :href="'/playlist/?id='+item.id" class="msk"></a>
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
</div>
</div>
</template>
<script>
	import api from "@/api"
	export default{
		name:"personalized",
		data(){
			return{
				personalized:{}
			}
		},
		mounted(){
			this.pl()
		},
		computed:{

		},
		methods:{
			pl(){
				api.get_personalized().then(res =>{					
					if(res.data.code = 200) {
						this.personalized= res.data.result
						console.log(this.personalized)
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
	.personalized{
		width: 75%;
		    padding: 20px 20px 40px;
		    a{
		    	color: #333;
		    }
	}
	.personalized-nav {
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
</style>
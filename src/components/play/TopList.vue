<template>
	<div>
		<Top></Top>
		<div id="toplist" class="g-bd cf">
			<div class="toplist-nav">
				<div class="n-minelst">
					<h2>云音乐特色榜</h2>
					<ul class="cf" ref="m-ul">
						<li v-for="(item,index) in toplistDetail" v-if="index<4" :data-res-id="item.id" 
						:class="item.id==toplistId?'z-selected':''" @click="addClass(item.id)">
							<a :href="'/#/discover/toplist?id='+item.id">
								<div class="item cf">
									<div class="left">
										<a :href="'/#/discover/toplist?id='+item.id" class="avatar">
											<img :src="item.coverImgUrl" alt="item.name">
										</a>
									</div>
									<p class="name">
										<a :href="'/#/discover/toplist?id='+item.id">
											{{item.name}}
										</a>
									</p>
									<p class="s-fc4">
										{{item.updateFrequency}}
									</p>
								</div>							
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="toplist-main">
				<PlayListMain></PlayListMain>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import api from "@/api"
	import Top from '../common/Top'
	import PlayListMain from '../common/PlayListMain'
	export default{
		name:'toplist',
		data(){
			return{
				toplistDetail:{},
				toplistId:''
			}
		},
		mounted(){
			this.toplistId = this.$route.query.id
			this.getToplist();
		},
		// watch:{
		// 	'$route' (to,from){
		// 		if(this.$route.query.id){
		// 			alert(this.$route.query.id)
		// 		}
		// 	}
		// },
		computed:{
		},
		methods:{

			getToplist(){
				api.topList().then(res=>{
					console.log(res)
					if(res.data.code=200){
						this.toplistDetail = res.data.list;
					}
				})
			},
			addClass(idx){
				this.toplistId = idx
			}
		},
		components:{
			Top,
			PlayListMain
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
		    .toplist-nav{
		    	float:left;
		    	width:269px;
		    	min-height:1000px;
		    	background:#F9F9F9;
		    	p{
		    		text-align:left;
		    	}
		    	a{
	    	    	text-align:left;
		    	}
		    	.n-minelst{
		    		margin-top:40px;
		    		h2{
	    			    padding: 0 10px 12px 15px;
					    font-size: 14px;
					    text-align:left;
		    		}
		    		ul{
		    			cursor: pointer;
		    			.z-selected{
		    				background: #e6e6e6;
		    			}
		    			.z-selected:hover{
		    				background: #e6e6e6;
		    			}
		    			li{
	    				    position: relative;
						    zoom: 1;
						    height:62px;
						    padding: 10px 0 10px 20px;
						    a{
						    	text-decoration:none;
							    .item{
							    	padding-left: 50px;
							    	font-size:12px;
							    	.left{
						    		    display: inline;
									    float: left;
									    margin-left: -50px;
									    overflow: hidden;
									    width: 40px;
									    .avatar{
								    	    display: block;
										    position: relative;
										    width: 40px;
										    height: 40px;
										    img{
									    	    width: 40px;
	    										height: 40px;
										    }
									    }
							    	}
							    	.name{
						    		    width: 150px;
									    overflow: hidden;
									    margin-top: 2px;
									    margin-bottom: 8px;
									    a{
							    	    	white-space: nowrap;
							    	    	color:#000;
									    }
							    	}
							    	.s-fc4{
							    		color: #999;
							    	}
							    }
						    }
		    			}
		    			li:hover{
		    				background:#f5f5f5;
		    			}
		    		}
		    		ul:nth-child(1){
		    			background: #e6e6e6;
		    		}
		    	}
		    }
		    .toplist-main{
			    float: right;
			    padding-bottom: 50px;
			    border-left:1px solid #d3d3d3;
		    }
		}
</style>
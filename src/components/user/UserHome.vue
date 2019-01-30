<template>
	<div>
		<Top></Top>
		<div class="g-bd">
			<div class="wrap">
				<dl class="m-proifo cf">
					<dt class="f-pr">
						<img :src="getUserInfo.profile.avatarUrl">
					</dt>
					<dd>
						<div class="name cf">
							<h2>
								<span class="tit">
									{{getUserInfo.profile.nickname}}									
								</span>
							</h2>
						</div>
						<ul class="data cf">
							<li class="fst">
								<a href="">
									<strong>{{getUserInfo.profile.eventCount}}</strong>
									<span>动态</span>
								</a>
							</li>
							<li>
								<a href="">
									<strong>{{getUserInfo.profile.follows}}</strong>
									<span>关注</span>									
								</a>
							</li>
							<li>
								<a href="">
									<strong>{{getUserInfo.profile.followeds}}</strong>
									<span>粉丝</span>									
								</a>
							</li>														
						</ul>
					</dd>
				</dl>
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

			}
		},
		mounted(){
			this.getUserSubcount()
			console.log(this.getUserInfo)
		},
		computed:{
			...mapGetters([
				'getUserInfo'
				])
		},
		methods:{
			getUserSubcount(){
				api.user_subcount().then(res=>{
					if(res.status=200){
						console.log(res)
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
	    height: 700px;
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
	    }
	}
</style>
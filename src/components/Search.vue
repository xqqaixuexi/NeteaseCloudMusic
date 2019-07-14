<template>
	<div>
		<Top></Top>
		<div>
			<div class="g-bd">
				<div class="g-wrap n-srch">
<!-- 					<div class="pg-search">
						<input type="" name="" placeholder="搜索歌曲">
					</div> -->
					<div class="m-search">
						<div class="snote">
							{{'搜索“'+searchKeywords+'”，找到'}}
							<em>
								{{searchResult.songCount}}
							</em>
							首单曲
						</div>
						<ul class="m-tabs m-tabs-srch">
							<li class="fst">
							    <a href="javascript:void(0)" data-type="1">
							    	<em>
							    		单曲
							    	</em>
							    </a>
							</li>
							<li>
							    <a href="javascript:void(0)" data-type="1">
							    	<em>
							    		歌手
							    	</em>
							    </a>
							</li>
							<li>
							    <a href="javascript:void(0)" data-type="1">
							    	<em>
							    		专辑
							    	</em>
							    </a>
							</li>
							<li>
							    <a href="javascript:void(0)" data-type="1">
							    	<em>
							    		视频
							    	</em>
							    </a>
							</li>
							<li>
							    <a href="javascript:void(0)" data-type="1">
							    	<em>
							    		歌词
							    	</em>
							    </a>
							</li>
							<li>
							    <a href="javascript:void(0)" data-type="1">
							    	<em>
							    		歌单
							    	</em>
							    </a>
							</li>
							<li>
							    <a href="javascript:void(0)" data-type="1">
							    	<em>
							    		主播电台
							    	</em>
							    </a>
							</li>
							<li>
							    <a href="javascript:void(0)" data-type="1">
							    	<em>
							    		用户
							    	</em>
							    </a>
							</li>
						</ul>
						<div class="search-result">
							<div class="n-srchrst">
								<div class="srchsongst">
									<div v-for="(item,index) in searchResult.songs" class="item cf">
										<div class="td">
											<a :href="'/#/song?id='+item.id"
											 :class="item.name.indexOf(searchKeywords) != -1? 'td-blue':''">
												{{item.name}}
											</a>											
										</div>
										<div class="td">
											<a href="javascript:void(0)" :class="item.artists[0].name.indexOf(searchKeywords) != -1?'td-blue':''">
												{{item.artists[0].name}}
											</a>											
										</div>
										<div class="td">
											<a href="javascript:void(0)" :class="item.album.name.indexOf(searchKeywords) != -1?'td-blue':''">
												{{item.album.name}}
											</a>											
										</div>
										<div class="td">
											{{formatDuring(item.duration)}}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import api from "@/api"
	import Top from './common/Top'
	import { mapGetters } from 'vuex'
	export default{
		name:'search',
		data(){
			return{
				searchResult:{},
				searchKeywords:''
			}
		},
		mounted(){
			//console.log(this.$route.query.keywords)
			this.searchKeywords = this.$route.query.keywords
            this.getSearchResult(this.$route.query.keywords)
		},
		watch:{
			'$route' (to,from){
				if(this.$route.query.keywords){
					this.getSearchResult(this.$route.query.keywords)
				}
			}
		},
		computed: {
		    // ...mapGetters([
		    // 	'getUserInfo',
		    // 	'logined',
		    // 	'getKeyWords'
		    //   // ...
		    // ])
		},
		methods:{
			getSearchResult(keywords){
				api.search(keywords).then(res=>{
					console.log(res)
					this.searchResult = res.data.result

				})
			}
		},
		components:{
			Top
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
	    .g-wrap{
	    	padding:40px;
	    }
	    .n-srch{
	    	.pg-search{
	    		width: 420px;
			    height: 40px;
			    margin: 0 auto;
			    background-position: 0 0;
			    z-index: 10;
			    input{
			    	height: 32px;
				    color: #333;
				    line-height: 16px;
				    width: 300px;
				    margin: 0;
				    padding: 0;
				    background: transparent;
				    border: 1px solid #d3d3d3;
				    border-radius: 5px;
			    }
	    	}
	    	.snote {
			    margin: 28px 0 17px;
			    color: #999;
			    text-align:left;
			    em{
		    	    font-style: normal;
				    text-align: left;
				    font-size: inherit;
			        color: #c20c0c;
			    }
			}
			.m-tabs {
			    height: 38px;
			    background-position: 0 0;
			    background-repeat: repeat-x;
			    border-left:1px solid #d9d9d9;
			    border-right:1px solid #d9d9d9; 
			    li{
			    	float: left;
    				background-color: #f7f7f7;
    				width:12.5%;
				    height: 38px;
				    text-align: left;
				    font-weight: normal;
				    color: #666;
				    border-top:2px solid #d9d9d9;
				    border-bottom: 1px solid #d9d9d9;
    				a{
    					text-decoration:none;
    					em{
    						display:block;
						    height: 38px;
						    width: 100%;
						    line-height: 38px;
						    cursor: pointer;
						    text-align: center;
    					}
    				}
			    }
			    li:hover{
    					border-top: 2px solid #c20c0c;
    				}
			    .fst{
				    border-top: 2px solid #c20c0c;
				    background-color: #fff;
				    border-bottom: 0;
			    }
			}
			.search-result{
				.n-srchrst{
					margin-top:20px;
					.item{
						padding: 10px 10px 8px 18px;
    					border: 1px solid #fff;
    					.td{
    						width:25%;
    						float:left;
    					}
    					.td-blue{
    						color: #0c73c2;  						
    					}
					}
					.item:nth-child(even){
						background: #f7f7f7;
					}
					.item:hover{
						background: #d9d9d9;
    					border-color: #d9d9d9;
					}
				}
			}
	    }
	}
</style>
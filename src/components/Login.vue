<template>
	<div class="form-common ">
<!-- 		<mt-header fixed  title="登录">
		</mt-header> -->
		<form @submit.prevent="login">
			<div class="formc-cnt">
				<span>账号：</span>
				<input auto-focus placeholder="手机号" type="text" required v-model="name" />
			</div>
			<div class="formc-cnt">
				<span>密码：</span>
				<input type="password" v-model="pwd" required />
			</div>
			<div>
				<!-- <mt-button type="danger" v-bind:class="{'is-disabled':(!name||!pwd||loading)}" size="large">登录</mt-button> -->
				<button  class="btn"type="danger" v-bind:class="{'is-disabled':(!name||!pwd||loading)}" size="large">登录</button>
			</div>
		</form>
	</div>
</template>

<script>
	import api from "@/api"
	import { mapGetters } from 'vuex'
	import { Toast } from 'mint-ui';
	export default {
		name: 'login',
		data() {
			return {
				name: '',
				pwd: '',
 				loading: false
			}
		},
		components: {
			Toast
		},
		mounted () {

		},
		computed: {
		    // ...mapGetters([
		    //   'getLogin'
		    // ])
		},
		methods: {
			login() {
				this.loading = true;
				api.login(this.name, this.pwd).then(res => {
					this.loading = false;
					console.log(res)
					if(res.data.code != 200) {
						if(res.data.code == -460){
							Toast({
								message: '登录接口被关了(伪造请求被屏蔽）',
								duration: 5000
							});
						}
						else Toast({
							message: res.data.msg,
							duration: 5000
						});
						return;
					}
					//this.isLogined=true;
					localStorage.setItem("user", JSON.stringify(res.data));
					// console.log(res.data)
					this.$store.commit('userMsg',res.data)
					//this.$store.dispatch('getlike');
					console.log(res.data)
					//改变登录状态
					//localStorage.setItem("isLogined", true);
					this.$store.commit("loginedMsg",true)
        			this.$router.back()
					
				})
			}
		}
	}
</script>

<style scoped>
	.mint-header {
		background: #2d2d2d;
/*		max-width: 750px;*/
		width: 100%;
		position: relative;
	}
	.mint-header-title {
		font-size: 1rem;
	}
	.form-common {
		/*padding: 5em 5% 0;*/
	}
	
	.formc-cnt {
		display: flex;
		border-bottom: 1px solid #eee;
		align-items: center;
		padding: .5em 0
	}
	
	.form-common button {
		margin-top: 2em;
		background-color: #d43c33;
	}
	
	.formc-cnt span {
		text-align: left
	}
	
	.formc-cnt input {
		flex: 1;
		display: block;
		background: transparent;
		border: none;
		padding: 1em .5em;
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
	    cursor:pointer;
	}
</style>
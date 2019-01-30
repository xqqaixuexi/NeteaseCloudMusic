
export default {
    install(Vue)  {
    	//毫秒转换为分秒
    	Vue.prototype.formatDuring=function(mss) {
    		 //    var days = parseInt(mss / (1000 * 60 * 60 * 24));
		 		var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))>9 ? parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)) : '0'+parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
			    var seconds = parseInt((mss % (1000 * 60)) / 1000)>9 ? parseInt((mss % (1000 * 60)) / 1000):'0'+parseInt((mss % (1000 * 60)) / 1000)
			    if(hours===0){
			    	return   minutes + " : " + seconds 
			    }else{
			    	hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))>9 ? parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : '0'+parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			    	return  hours + " : " + minutes + " : " + seconds ;
			    }
			    
    	},
    	//下方音乐播放器的显示隐藏
   //  	Vue.prototype.musicPlayShowOrHide=function(self){
	  //   	alert(2)
			// var musicPlay = document.getElementById("musicPlay")
			// console.log(self,self.getSongId)
			// if(self.getSongId!=undefined){
			// 	alert(111)
			// 	musicPlay.style.bottom = 0;
			// }
   //      },
        Vue.prototype.audioPlay=function(songs){
			//var self = this;
			//console.log(self,this)
	    	
	    	getSongIds(songs,this)
	    	musicPlayShowOrHide(this)
	    	// this.$store.commit('songIdMsg',this.songIds[this.getCount])
			var audio = document.getElementById("myAudio")
			var innerPlay = document.getElementById("innerPlay")
			var innerPause = document.getElementById("innerPause")
			var audioLength = document.getElementById("audioLength")
			var audioCircular = document.getElementById("audioCircular")
			var nowTime = document.getElementById("nowTime")
			var totalTime = document.getElementById("totalTime")
			var audioDur = audio.duration
			
			if(audio!==null){
				//innerPause.classList.remove("hide")
				//innerPlay.classList.add("hide")
				//audio.currentTime = 0;//重新播放
				console.log(audio)
				audio.currentTime = 0;
				//audio.play();
				audio.addEventListener("canplay", function(){
					//

					audio.play();
					innerPause.classList.remove("hide")
					innerPlay.classList.add("hide")
					console.log('canplay')
				})
				
				//监听音频播放时间，并更新进度条
				audio.addEventListener('timeupdate', function () {
		           updateProgress(audio)
		        }, false);
				
			}
			//把专辑页面或歌单页面的歌曲ID传入songids
		    function getSongIds(p,that){
		    	var arr = that.songIds

		    	that.$store.commit('countMsg',that.songIds.length)
		    	console.log(that.songIds,p,p.length)
		    	for(var i=0;i<p.length;i++){
		    		// arr.push(p[i].id)
		    		console.log(p[i].id)
		    		if(that.songIds.indexOf(parseInt(p[i].id)) === -1){
		    			arr.push(p[i].id)

		    		}
		    		else{
		    			//console.log(this.songIds.indexOf(parseInt(p[0].id)))
		    			that.$store.commit('countMsg',that.songIds.indexOf(parseInt(p[0].id)))
		    		}
		    		
		    	}
		    	
		    	that.$store.commit('songIdsMsg',arr)
		    	that.$store.commit('songIdMsg',that.songIds[that.getCount])
		    	console.log(that.songIds)
		    }
		    //控制下方音乐播放器显示隐藏
			function musicPlayShowOrHide(that){
				var musicPlay = document.getElementById("mPlay")
				//musicPlay.style.top = '-45px'
				//console.log(that,that.getSongId)
				if(that.getSongId!=undefined){
					      
					var timer;
					    function move(){
					      //
							console.log(musicPlay.offsetTop)
					      if(musicPlay.offsetTop>-45){//边界判断
					      	
					      	musicPlay.style.top = musicPlay.offsetTop-1 +'px'

					      }

					      timer = window.setTimeout(move,10)
					      if(musicPlay.offsetTop==-45){
					      	window.clearTimeout(timer);
					      }
					    }
					    move();
					//musicPlay.style=musicPlay.style+"animation:mymove 5s infinite;"
				}
	        }
	        //进度条进度及播放暂停按钮切换
			function updateProgress(audio) {
				var audioTime = (audio.currentTime/audio.duration)*500
				audioLength.style.width = audioTime + 'px'
				audioCircular.style.left = (audioTime-6) +'px'
				if(audio.paused === true && audio.currentTime===audioDur) {
				 	innerPause.classList.add("hide")
					innerPlay.classList.remove("hide")
				 	
				 } 
				 //console.log(audioDur)
				 if(audio.duration){
				    nowTime.innerHTML = transTime(audio.currentTime);
				    totalTime.innerHTML = transTime(audioDur);				 	
				 }

			}
			//时间换算
			function transTime(value) {
			    var time = "";
			    var h = parseInt(value / 3600);
			    value %= 3600;
			    var m = parseInt(value / 60);
			    var s = parseInt(value % 60);
			    if (h > 0) {
			        time = formatTime(h + ":" + m + ":" + s);
			    } else {
			        time = formatTime(m + ":" + s);
			    }

			    return time;
			}
			//格式化时间
			function formatTime(value) {
			    var time = "";
			    var s = value.split(':');
			    var i = 0;
			    for (; i < s.length - 1; i++) {
			        time += s[i].length == 1 ? ("0" + s[i]) : s[i];
			        time += ":";
			    }
			    time += s[i].length == 1 ? ("0" + s[i]) : s[i];

			    return time;
			}
	    }
    }
}
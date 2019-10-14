# Vue.js模仿网易云音乐（NodeJS 版 API）

## 技术栈
1. Vue全家桶(vue,vue-router,vuex)
2. axios(http)
3. 网易云音乐 NodeJS 版 API（接口服务)[地址在这里](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)
4.webpack


## 部署

### 后端项目

``` bash
# 克隆node后端代码到本地
git clone 

cd NeteaseCloudMusicApi

# install dependencies
npm install 

# serve at localhost:4000
node app.js
```

### 前台项目

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 预览图
首页
![首页](https://github.com/xqqaixuexi/NeteaseCloudMusic/blob/master/image/index.jpg)

![首页-专辑](https://github.com/xqqaixuexi/NeteaseCloudMusic/blob/master/image/index_album.png)

![首页-排行榜](https://github.com/xqqaixuexi/NeteaseCloudMusic/blob/master/image/index_toplist.png)


歌单
![歌单](https://github.com/xqqaixuexi/NeteaseCloudMusic/blob/master/image/playlist.png)


排行榜
![排行榜](https://github.com/xqqaixuexi/NeteaseCloudMusic/blob/master/image/toplist.png)


歌曲
![歌曲](https://github.com/xqqaixuexi/NeteaseCloudMusic/blob/master/image/song.png)


搜索
![搜索](https://github.com/xqqaixuexi/NeteaseCloudMusic/blob/master/image/search.png)


音乐播放
![音乐播放](https://github.com/xqqaixuexi/NeteaseCloudMusic/blob/master/image/musicPlay.jpg)


登录
![登录](https://github.com/xqqaixuexi/NeteaseCloudMusic/blob/master/image/login.png)


用户信息
![用户信息](https://github.com/xqqaixuexi/NeteaseCloudMusic/blob/master/image/user.png)


![用户收藏歌单](https://github.com/xqqaixuexi/NeteaseCloudMusic/blob/master/image/collectPlaylist.png)

## 已完成功能
1. 首页（滚动页、热门推荐、新碟上架、榜单、入驻歌手)
2. 搜索（ 单曲、歌单、歌手、mv等...)
3. 详情单页类（歌单、专辑、评论、用户)
4. 播放页（单曲、上下一曲，播放、进度条、清空播放列表）
5. 我的（登录，个人信息）



## 存在的问题或bug
1. 由于后台接口数据问题，暂时提供不了歌词。

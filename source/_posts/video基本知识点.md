---
title: video基本知识点
author:
  - 徐勇超
tags: []
categories:
  - js知识库
comments: true
date: 2020-07-08 11:38:50
updated: 2020-07-08 11:38:50
---

## 前言
HTML5中 **video** 标签定义视频，比如电影片段或其他视频流。也就是说video是用来播放视频的，而且是HTML5中的新标签。所以对老浏览器是不支持的，来看看支持。
## Video属性

|属性|值|描述|
|----| ----|---|
|autoplay |autoplay |如果出现该属性，则视频在就绪后马上播放。
|controls |controls |如果出现该属性，则向用户显示控件，比如播放按钮。
|height |pixels |设置视频播放器的高度。
|width |pixels |设置视频播放器的宽度。
|loop |loop |如果出现该属性，则当媒介文件完成播放后再次开始播放。
|muted |muted |规定视频的音频输出应该被静音。
|poster |URL |规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。
|preload |pixels |如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。
|src |URL |要播放的视频的 URL。

## Video事件

|属性|值|描述|
| --- | --- | --- |
|oncanplay|script|当文件就绪可以开始播放时运行的脚本（缓冲已足够开始时）。
|oncanplaythrough|script|当媒介能够无需因缓冲而停止即可播放至结尾时运行的脚本。|onemptied|script|当发生故障并且文件突然不可用时运行的脚本（比如连接意外断开时）。
|onended|script|当媒介已到达结尾时运行的脚本（可发送类似“感谢观看”之类的消息）。|onerror|script|当在文件加载期间发生错误时运行的脚本。|onloadeddata|script|当媒介数据已加载时运行的脚本。|onpause|script|当媒介被用户或程序暂停时运行的脚本。
|onplay|script|当媒介已就绪可以开始播放时运行的脚本。|onplaying|script|当媒介已开始播放时运行的脚本。
|onprogress|script|当浏览器正在获取媒介数据时运行的脚本。
|ontimeupdate|script|当播放位置改变时（比如当用户快进到媒介中一个不同的位置时）运行的脚本。
|onvolumechange|script|每当音量改变时（包括将音量设置为静音）时运行的脚本。
|onwaiting|script|当媒介已停止播放但打算继续播放时（比如当媒介暂停已缓冲更多数据）

### 运行脚本
```
<video width="100%" height="100%" id="playVideo">
  <source src="视频地址" type="video/mp4"></source>
</video>
<!--自定义进度条和音量控制-->
<div class="playControll">
    <div class="playPause playIcon"></div>
    <div class="timebar">
        <span class="currentTime">0:00:00</span>
        <div class="progress">
            <div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
        </div>
        <span class="duration">0:00:00</span>
    </div>
    <div class="otherControl">
        <span class="volume glyphicon glyphicon-volume-down"></span>
        <span class="fullScreen glyphicon glyphicon-fullscreen"></span>
        <div class="volumeBar">
            <div class="volumewrap">
                <div class="progress">
                    <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 8px;height: 40%;"></div>
                </div>
            </div>
        </div>
    </div>
</div>
```
js
```
var myVid=document.getElementById("playVideo");
//播放的速度
myVid.playbackRate = 1
myVid.onloadstart = function(){
  console.log(`onloadstart  客户端开始请求数据  `);
}
myVid.ondurationchange=function(){
  console.log(`durationchange 资源长度改变  `);
}
myVid.onratechange=function(){
  console.log(`onratechange  //播放速率改变  `);
}
myVid.onseeking=function(){
  console.log(` //seeking  寻找中 点击一个为（缓存）下载的区域`);
}
myVid.onseeked=function(){
  console.log(` //seeked 寻找完毕 `);
}
myVid.onplay=function(){
  console.log(`开始播放时触发 `);
}
myVid.onwaiting=function(){
  console.log(`播放由于下一帧数据未获取到导致播放停止，但是播放器没有主动预期其停止，仍然在努力的获取数据，简单的说就是在等待下一帧视频数据，暂时还无法播放。 `);
}
myVid.onplaying=function(){
  console.log(`真正处于播放的状态，这个时候我们才是真正的在观看视频。 `);
}
myVid.oncanplay=function(){
  console.log(`视频播放器已经可以开始播放视频了，但是只是预期可以正常播放，不保证之后的播放不会出现缓冲等待。 `);
}
myVid.onpause=function(){
  console.log(`暂停播放时触发 `);
}
myVid.onended=function(){
  alert(` //播放结束 loop 的情况下不会触发  `);
}
myVid.onvolumechange=function(){
  console.log(`音量改变  `);
}
myVid.onloadedmetadata=function(){
  console.log(`获取视频meta信息完毕，这个时候播放器已经获取到了视频时长和视频资源的文件大小。 `);
}
myVid.onloadeddata=function(){
  console.log(`"视频播放器第一次完成了当前播放位置的视频渲染。"`);
}

myVid.onabort=function(){
  console.log(`客户端主动终止下载（不是因为错误引起）， `);
}

myVid.onerror=function(){
  console.log(`请求数据时遇到错误`);
  //1.用户终止 2.网络错误 3.解码错误 4.URL无效
  alert(myVid.error.code);
}

//客户端请求数据
myVid.onprogress=function(){
  console.log(`客户端正在请求数据 触发多次，是分段请求的`);
  console.log(myVid.buffered);
   //0.此元素未初始化  1.正常但没有使用网络  2.正在下载数据  3.没有找到资源
  console.log(`networkState ${myVid.networkState}`);
  //  //当前播放的位置，赋值可改变位置 myVid.currentTime = 11 从11秒位置开始播放
  console.log(myVid.currentTime);
  // //返回当前资源的URL
  console.log(myVid.currentSrc);

  console.log(myVid.videoWidth);
  //播放结束 返回true 或 false
  console.log(myVid.ended);
  //音量大小 为0-1 之间的值
  console.log(myVid.volume);


  //当前资源长度
  console.log(myVid.duration);
  console.log(myVid.startDate)
  // myVid.currentTime = 11
}
```
### 视频控制
```
var myVid=document.getElementById("playVideo");
myVid.play(); //播放视频
myVid.pause();  //暂停视频
myVid.width=560; //设置视频宽度
myVid.height=560;  //设置视频高度
myVid.volume = 0.8; // 音量控制
全屏和退出全屏
// 全屏
if (playVideo[0].requestFullscreen) {
    playVideo[0].requestFullscreen();
} else if (playVideo[0].mozRequestFullScreen) {
    playVideo[0].mozRequestFullScreen();
} else if (playVideo[0].webkitRequestFullscreen) {
    playVideo[0].webkitRequestFullscreen();
} else if (playVideo[0].msRequestFullscreen) {
    playVideo[0].msRequestFullscreen();
}
// 退出全屏
if (document.exitFullscreen) {
    document.exitFullscreen();
} else if (document.mozExitFullScreen) {
    document.mozExitFullScreen();
} else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
}
```
## .Media方法和属性

>HTMLVideoElement和HTMLAudioElement 均继承自HTMLMediaElement
* Media.error; //null:正常
* Media.error.code; //1.用户终止 2.网络错误 3.解码错误 4.URL无效
#### 网络状态 

*  Media.currentSrc; //返回当前资源的URL 
*  Media.src = value; //返回或设置当前资源的URL 
*  Media.canPlayType(type); //是否能播放某种格式的资源 
*  Media.networkState; //0.此元素未初始化 1.正常但没有使用网络 2.正在下载数据 3.没有找到资源 
*  Media.load(); //重新加载src指定的资源 
*  Media.buffered; //返回已缓冲区域，TimeRanges 
*  Media.preload; //none:不预载 metadata:预载资源信息 auto:
3.2准备状态 

* Media.readyState;
1. HAVE_NOTHING 
2. HAVE_METADATA 
3. HAVE_CURRENT_DATA 
4. HAVE_FUTURE_DATA 
5. HAVE_ENOUGH_DATA 
*  Media.seeking; //是否正在seeking
#### 回放状态

- Media.currentTime = value; //当前播放的位置，赋值可改变位置
- Media.startTime; //一般为0，如果为流媒体或者不从0开始的资源，则不为0
- Media.duration; //当前资源长度 流返回无限
- Media.paused; //是否暂停
- Media.defaultPlaybackRate = value;//默认的回放速度，可以设置
- Media.playbackRate = value;//当前播放速度，设置后马上改变
- Media.played; //返回已经播放的区域，TimeRanges，关于此对象见下文
- Media.seekable; //返回可以seek的区域 TimeRanges
- Media.ended; //是否结束
- Media.autoPlay; //是否自动播放
- Media.loop; //是否循环播放
- Media.play(); //播放
- Media.pause(); //暂停
#### 视频控制

- Media.controls;//是否有默认控制条
- Media.volume = value; //音量
- Media.muted = value; //静音 TimeRanges(区域)对象
- TimeRanges.length; //区域段数
- TimeRanges.start(index) //第index段区域的开始位置
- TimeRanges.end(index) //第index段区域的结束位置


>摘自: https://cloud.tencent.com/developer/article/1588145 和
>https://cloud.tencent.com/developer/article/1462727?from=10680

## 常见应用
### 视频非全屏播放
```
<video
  x5-video-player-type="h5"
  playsinline
  webkit-playsinline>
</video>
``` 

### 隐藏视频右下角的三个点
```
 <video
  //关闭下载， 音轨
  controlslist="nodownload noremoteplayback"
  //禁止画中画
  disablePictureInPicture
/>
```
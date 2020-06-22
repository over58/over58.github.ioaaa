---
title: vue-awesome-swiper的坑
author:
  - 徐勇超
tags:
  - vue
date: 2019-11-26 17:24:08
categories:
  - js知识库
---

### loop下点击事件无效
#### 问题描述： 
  当启用loop时，如果在swiper-slide中添加了点击事件，那么当开始下一个循环的时候，又一个短暂的时间， 点击是无效的。这样的原因大概是： 开启loop后，vue-awesome-swiper会复制几个swiper-slide,但是却没有复制相应的事件。
#### 过程
  找了很多，也发现了很多hack方法，一一试了下，都不太满足我的需求。最后找的这个https://blog.csdn.net/sxs1995/article/details/90648523 还不错。
我试了之后，确实，能够解决点击失效问题。但是我的逻辑是要在点击的同时需要一个TouchEvent, 按照上面的例子，获得的是事件对象在我使用clipboard进行复制的时候，报错 “clipboard.js?f71e:32 Uncaught TypeError: Cannot read property 'hasAttribute' of null”。于是我查了文档。发现了这个。
![[lifecycle](https://www.swiper.com.cn/api/event/226.html)](vue-awesome-swiper的坑/QQ20191126-173814@2x.png)

<!-- more -->

#### 最后核心代码
```
data () {
  return {
     swiperOption: {
        loop: true,
        speed: 700,
        slidesPerView: 1,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        on: {
          // 推荐使用这种方式解决loop下dom失效问题，注意事件类型为tap
          click: function (e) {
            vm.download(e, this.realIndex)
          }
        }
      }
  }
},
methods: {
  download (e, index) {
    console.log('操作的slide的索引',index)
    //handleClipboard 是封装clipboard的一个函数，不必追究
      handleClipboard('复制文本', e, {
        showToast: false
      })
    }
}
```
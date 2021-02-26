---
title: vue-intro使用方法及注意点
date: 2019-03-04 19:01:39
tags: [vue]
---

1、使用时必须引入intro.js
2、let intro=Intro.intro()
3、intro.setOptions({}).start().oncomplete().onskip(function) 
4、intro这个插件只能提示一些静态的页面上已经有的一些元素，异步的或者是后来动态显示的元素无法加上提示.

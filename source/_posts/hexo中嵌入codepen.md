---
title: hexo中嵌入codepen
author:
  - 徐勇超
tags: []
categories:
  - js知识库
comments: true
date: 2020-01-08 11:20:16
updated: 2020-01-08 11:20:16
---
### 安装
使用npm安装插件
```
$ npm install hexo-codepen --save
```

### 语法
```
{% codepen userId|anonymous|anon slugHash theme [defaultTab [height [width]]] %}
```

### 生成的html
```
<p data-height="265" data-theme-id="dark" data-slug-hash="bgjKKE" data-default-tab="css,result" data-user="CiTA" data-embed-version="2" data-pen-title="CSS sidebar toggle" class="codepen">See the Pen <a href="https://codepen.io/CiTA/pen/bgjKKE/">CSS sidebar toggle</a> by Silvestar Bistrović (<a href="https://codepen.io/CiTA">@CiTA</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
看源码实际上是插入了一个iframe

```
参数使用
|参数|	值|
|:-- |:-- |
|userId	|codepen的用户名|
|slugHash|	当前pen url上的hash值|
|theme	|dark|
|defaultTab|	css,result 默认展现的tab|
|height	|265|
|width	|默认100%，这个值应该由主题调整|

### demo
```
{% codepen xuyongchaos rNaJGRW dark %}
```
### 效果
{% codepen xuyongchaos rNaJGRW dark %}

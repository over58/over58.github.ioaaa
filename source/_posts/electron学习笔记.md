---
title: electron学习笔记
author:
  - 徐勇超
tags: []
categories:
  - js知识库
comments: true
date: 2020-04-05 11:39:56
updated: 2020-04-05 11:39:56
---

###  开发第一个基础应用

```js
const { app, BrowserWindow} = require('electron')
function createWindow(){
	var win = new BrowserWindow({height: 800, width:800})
	win.loadFile('./index.html')
}

app.on('ready',createWindow)
```


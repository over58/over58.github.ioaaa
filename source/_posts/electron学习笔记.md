---
title: electron学习笔记
author:
  - 徐勇超
tags: []
categories:
  - electron
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

### 常用点

#### 标题栏设置目录

```
mainWindow.setRepresentedFilename('/Users/xyc/Learn/projects/hexo-blog')
```

#### 打开对话框

```js
let options = {
        title: '标题',
        message: 'mac中的标题',
        // createDirectory只针对 mac
        // multiSelections 用于多选
        properties: ['openFile', 'createDirectory', 'multiSelections'],
        buttonLabel: '我的打开',
        default: '/Users/yongchao9/',
        filters: [
          {name: '图片', extensions: ['jpg', 'png', 'gif', 'jpeg']},
          {name: '视频', extensions: ['mp4', 'avi']},
          // eslint-disable-next-line standard/object-curly-even-spacing
          {name: '全部', extensions: ['*'] }
        ]
      }

      if (process.platform === 'darwin') {
        options.properties.push('openDirectory')
      }
      dialog.showOpenDialog(options, (files) => {
        this.files = files
      })
```

> 如果需要同时选择多个文件和目录的话，mac 和 windows的设置方法不同
> Mac: 需要同时指定 openFile和 openDirectory
> Windows： 只需要指定 openFile, 就可以选择文件和目录，如果指定了openDirectory，就只能选择目录了






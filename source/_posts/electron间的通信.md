---
title: electron间的通信
author:
  - 徐勇超
tags: []
categories:
  - electron
comments: true
date: 2020-04-29 10:24:08
updated: 2020-04-29 10:24:08
---

### 示意图



### 主进程和子进程间的通信

#### 渲染进程---->主进程(利用 ipcMain, ipcRenderer和 webContents.send)

##### 渲染进程：

```js
const {ipcRenderer} = require('electron')
ipcRenderer.send('custom-event', 'I am renderer process')
```



##### 主进程

```js
const {ipcMain} = require('electron')
ipcMain.on('custom-event', ({sender}, args)=>{
  sender.send('reply', '我收到了')
})
```



<!-- more -->



#### 主进程---->渲染进程

##### 主进程

```js
// 主进程.main.js
var mainWindow = null;
app.on('ready', function() {
	mainWindow = new BrowserWindow({width: 800, height: 600});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	mainWindow.webContents.on('did-finish-load', function() {
		mainWindow.webContents.send('ping', 'whoooooooh!');
	});
});
```

###### 渲染进程

```js
	const {ipcRenderer} = require('electron')
  ipcRenderer.on('ping', ({sender, args}) =>{
  	console.log(args)
  })
```

>**注意**，`webContents.on` 监听的是已经定义好的事件，如上面的 `did-finish-load`。要监听自定义的事件还是通过 `ipcMain` 和 `ipcRenderer`。

#### 渲染进程 A 和 渲染进程 B之间的通信

通过主进程 mainProcess作为中转站，转发事件





#### 利用 electron.remote 模块进行通信

在渲染进程中，可以通过

```js
const { remote } = require('electron');
```

获取到 `remote` 对象，通过 `remote` 对象可以让渲染进程访问/使用主进程的模块。例如，通过 `remote` 在渲染进程中新建一个窗口：

```js
const { BrowserWindow } = require('electron').remote
  let win = new BrowserWindow({width: 800, height: 600})
  win.loadURL('https://github.com')
```

同样的，我们也可以通过 `remote` 对象访问到 `app` 对象。这样我们就可以访问到我们在主进程中挂载到 `electron.app` 对象上的方法。

如：

`main.js` 文件：

```js
// In main process
const { app } = require('electron');
const utils = require('./utils');

app.utils = utils; // 将在 Electron 层实现的接口绑定到 app 上
```

`index.js` 文件(被网页引用的脚本文件)：

```js
const { remote } = require('electron');
// In renderer process
function() {
    // remote.app.utils 对象与上述文件中的 utils 对象是一样的。
    remote.app.utils.test();
}
```

### Electron 的两种进程通信方法是如何实现的？

知道怎么用还不够，还需要了解 Electron 是如何实现这两种通信方法的，以及 Electron 为什么要实现两种通信方法，这两种通信方法的有什么不同的地方。弄清楚这些开发起来才会对程序的数据流比较清晰。

#### `ipcMain` 和 `ipcRenderer`

> The ipcMain module is an instance of the EventEmitter class. When used in the main process, it handles asynchronous and synchronous messages sent from a renderer process (web page). Messages sent from a renderer will be emitted to this module.

`ipcMain` 和 `ipcRenderer` 都是 `EventEmitter` 类的一个实例。而 `EventEmitter` 类由 NodeJS 中的 [events](https://nodejs.org/api/events.html) 模块导出。

#### `events.EventEmitter`

`EventEmitter` 类是 NodeJS 事件的基础，实现了事件模型需要的接口， 包括 `addListener`，`removeListener`, `emit` 及其它工具方法. 同原生 `JavaScript` 事件类似， 采用了发布/订阅(观察者)的方式， 使用内部 `_events` 列表来记录注册的事件处理器。

我们通过 `ipcMain`和`ipcRenderer` 的 `on`、`send` 进行监听和发送消息都是 `EventEmitter` 定义的相关接口。

那么 ipcMain 和 ipcRenderer 是如何实现这些接口的呢？

#### ipc-renderer.js

[ipc-renderer.js](https://github.com/electron/electron/blob/master/lib/renderer/api/ipc-renderer.js)：

```
const binding = process.atomBinding('ipc')

...

// Created by init.js.
const ipcRenderer = v8Util.getHiddenValue(global, 'ipc')

ipcRenderer.send = function (...args) {
  return binding.send('ipc-message', args)
}

....

module.exports = ipcRenderer
```

调用了 `atomBinding('ipc')` 得到的 `binding` 对象的 `send` 方法。后面 `binding.send` 应该就是 IPC 相关的实现了：对传送的数据进行序列化和反序列化。

```js
// 主进程
ipcMain.on('test1', (e) => {
    const obj = {};
    obj.toJSON = () => 'call toJSON';
    e.returnValue = obj;
})
ipcMain.on('test2', (e) => {
    const obj = { name: '123' };
    e.returnValue = obj;
})
// 渲染进程
let returnValue = ipcRenderer.sendSync('test1');
console.log(typeof returnValue, returnValue); // 'string call toJSON'

returnValue = ipcRenderer.sendSync('test2');
console.log(typeof returnValue, returnValue); // 'object Object name: "123"__proto__: Object'
```

从渲染进程输出的消息可以看到，主进程将返回值调用 `toJSON` 后传递给渲染进程。渲染进程再对传输过来的内容进行反序列化。

#### `remote` 远程对象

通过 `remote` 对象，我们可以不必发送进程间消息来进行通信。但实际上，我们在调用远程对象的方法、函数或者通过远程构造函数创建一个新的对象，实际上都是在发送一个同步的进程间消息（[官方文档](https://electronjs.org/docs/api/remote#remote) 上说这类似于 JAVA 中的 [RMI](https://en.wikipedia.org/wiki/Java_remote_method_invocation)）。

也就是说，`remote` 方法只是不用让我们显式的写发送进程间的消息的方法而已。在上面通过 `remote` 模块创建 `BrowserWindow` 的例子里。我们在渲染进程中创建的 `BrowserWindow` 对象其实并不在我们的渲染进程中，它只是让主进程创建了一个 `BrowserWindow` 对象，并返回了这个相对应的远程对象给了渲染进程。



> 摘自 https://imweb.io/topic/5b13a663d4c96b9b1b4c4e9c
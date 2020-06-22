---
title: js的事件模型
author:
  - 徐勇超
tags:
  - 事件模型
date: 2019-09-15 18:21:20
  - js知识库
---

### 引言
其实，说起js的事件模型，有点基础的都能说几句， 分为三个阶段， 捕获-事件处理-冒泡，巴拉巴拉...。但是这并没有考虑到我们 **"伟大"** 的IE，有点考虑的不够全面。接下来系统性的详细的讲一波儿



### 事件模型的前世今生
故事源于传说中的浏览器大战，微软的 IE 和网景的Netspace Navigator。
IE的事件流是冒泡 从里面往上面冒, netscape是从外部元素往内部元素捕获;后来出来了个W3C委员会，想要统一，为了兼容，宣布了后来的W3C事件模型（捕获-事件处理-冒泡），从此天下一统。 

<!-- more -->
### 事件的三种模型
####  DOM0(原始事件模型)
```
<input id="myButton" type="button" value="Press Me" onclick="alert('thanks');" >

or

document.getElementById("myButton").onclick = function () {alert('thanks');}

```
通常情况下事件监听函数如果返回一个值并且是false，则会阻止浏览器执行默认的动作

优点：
>所有浏览器都兼容

缺点：
>1. 代码耦合严重
>2. 事件监听器只能有一个，重复赋值，后面会覆盖前面的
>3. 没有事件的冒泡、委托等机制完成更为负载的情况

####  IE
IE将event作为window的一个属性。IE的事件模型只有两步，执行处理函数，然后冒泡。
添加和移除事件监听的方式
```
attachEvent( "eventType","handler")
//其中evetType为事件的类型，如onclick，注意要加’on’。

detachEvent("eventType","handler" )
```


####  DOM2
事件分为三个阶段： 捕获-处理目标-冒泡（IE8以及更早版本不支持DOM事件流）

1. 捕获阶段： 事件被从document一直向下传播到目标元素,在这过程中依次检查经过的节点是否注册了该事件的监听函数，若有则执行。
2. 事件处理： 事件到达目标元素,执行目标元素的事件处理函数
3. 冒泡：    事件从目标元素上升一直到达document，同样依次检查经过的节点是否注册了该事件的监听函数，有则执行。

### 事件对象
#### 常用对象和属性
- DOM事件模型中的事件对象常用属性:

1. type用于获取事件类型
2. currentTarget 当前正在处理的事件的节点，在事件捕获或冒泡阶段
2. target获取事件目标
3. stopPropagation()阻止事件冒泡
4. preventDefault()阻止事件默认行为
5. keyCode：按下的键的值；
6. stopImmediatePropagation() (DOM3)阻止任何事件的运行；详情看http://39.105.159.58:8080/2019/09/16/stopImmediatePropagation%E5%92%8CstopPropagation%E7%9A%84%E5%8C%BA%E5%88%AB/


- IE事件模型中的事件对象常用属性:

1. type用于获取事件类型
2. srcElement获取事件目标
3. cancelBubble阻止事件冒泡
4. returnValue阻止事件默认行为

#### 事件对象中和定位相关的属性

1. x/y与clientX/clientY值一样，表示距浏览器可视区域（工具栏除外区域）左/上的距离；
2. pageX/pageY，距页面左/上的距离，它与clientX/clientY的区别是不随滚动条的位置变化；
3. screenX/screenY，距计算机显示器左/上的距离，拖动你的浏览器窗口位置可以看到变化；
4. layerX/layerY与offsetX/offsetY值一样，表示距有定位属性的父元素左/上的距离。

### 事件委托/代理
```
<ul id="parent">
  <li class="child">1</li>
  <li class="child">2</li>
  <li class="child">3</li>
</ul>

<script type="text/javascript">
  //父元素
  var dom= document.getElementById('parent');

  //父元素绑定事件，代理子元素的点击事件
  dom.onclick= function(event) {
    var event= event || window.event;
    var curTarget= event.target || event.srcElement;

    if (curTarget.tagName.toLowerCase() == 'li') { //找到被代理的节点
      //事件处理
    }
  }
</script>
```
优点：

1. 节省内存占用，减少事件注册
2. 新增子对象时无需再次对其绑定事件，适合动态添加元素

### eventBus的事件模型
```
/**
 * 完整的思路就是，使用一个map存储 type：处理函数
 *  有两种存储形式
 *  type: function
 *  type: [function, funciton, ...]
 *  删除和添加的时候考虑到这两种情况就行了
 */
class EventEmitter{
  constructor () {
    this._events = this._events || new Map()
    this._maxListeners = this._maxListeners || 10
  }
}

EventEmitter.prototype.emit = function(type, ...args){
  let handler = this._events.get(type)
  if (Array.isArray(handler)) {
    for(let i=0;i<handler.length;i++) {
      if(args.length > 0) {
        handler[i].apply(this, args)
      }else {
        handler[i].call(this)
      }
    }
  }else {
    if(args.length >0) {
      handler.apply(this, args)
    } else {
      handler.call(this)
    }
  }
  return true
}

EventEmitter.prototype.addListener = function(type, fn) {
  const handler = this._events.get(type)
  if(!handler) {
    this._events.set(type, handler)
  }else if(handler && typeof handler === 'function') {
    this._events.set(type, [handler, fn])
  }else {
    handler.push(fn)
  }
}

EventEmitter.prototype.removeListener = function(type, fn) {
  const handler = this._events.get(type)
  if(handler && typeof handler === 'function') {
    this._events.delete(type)
  } else {
    let position = -1
    for (let i=0;i<handler.length;i++) {
      if (handler[i] === fn) {
        position = i
      }
    }
    if (position !== -1) {
      handler.splice(position, 1)
      if (handler.length === 1) {
        this._events.set(type, handler[0])
      }
    } else {
      return this
    }
  }
}
```
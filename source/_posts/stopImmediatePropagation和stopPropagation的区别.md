---
title: stopImmediatePropagation和stopPropagation的区别
author:
  - 徐勇超
tags:
  - js
date: 2019-09-15 18:22:11
categories:
---

在事件处理程序中，每个事件处理程序中间都会有一个event对象，而这个event对象有两个方法，一个是stopPropagation方法，一个是stopImmediatePropagation方法，两个方法只差一个Immediate，这里就说说这两个方法的区别
<!-- more -->
### stopImmediatePropagation方法：
stopImmediatePropagation方法作用在当前节点以及事件链上的所有后续节点上，目的是在执行完当前事件处理程序之后，停止当前节点以及所有后续节点的事件处理程序的运行

### stopPropagation方法
stopPropagation方法作用在后续节点上，目的在执行完绑定到当前元素上的所有事件处理程序之后，停止执行所有后续节点的事件处理程序
### 区别：
从概念上讲，在调用完stopPropagation函数之后，就会立即停止对后续节点的访问，但是会执行完绑定到当前节点上的所有事件处理程序；而调用stopImmediatePropagation函数之后，除了所有后续节点，绑定到当前元素上的、当前事件处理程序之后的事件处理程序就不会再执行了
    
### Demo 
```
// html
<div id = "div1">
    <button id = "button1"></button>
</div>

// js
　var div = document.getElementById("div1");
  var btn = document.getElementById("button1");
          
  div.addEventListener("click" , function(e){
    // e.stopImmediatePropagation()
    e.stopPropagation()
    alert("第一次执行");
  } , true);        //1
  div.addEventListener("click" , function(){alert("第二次执行");} , true);        //2
  btn.addEventListener("click" , function(){alert("button 执行");}); 
```

>1.在这里，给 1 函数alert后加上stopImmediatePropagation， 那么之后弹出窗口“第一次执行”
>2.但是如果给 1 函数alert后加上stopPropagation ， 那么之后会弹出窗口“第一次执行”，“第二次执行”两个窗口
---
title: 模拟一些常见的js函数
author:
  - 徐勇超
tags:
  - js
  - 模拟函数
date: 2019-09-15 23:29:42
categories:
---


#### apply

```
Function.prototype.myapply = function(context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
  }

  delete context.fn;
  return result;
};
```

#### call
```
Function.prototype.myCall = function(context) {
  context.fn = this
  let args = Array.prototype.slice(arguments, 1)
  let result = context.fn(...args)
  delete context.fn
  return result
}
```

#### instanceof
都知道instanceof实际上是用来判断对象的原型链上面能不能找到指定类型的原型。然后就按照这个原理来写歌demo
```
function instance_of(l, r){
    let proto = r.__proto__
    l = l.__proto__
    while(l) {
        if (l === proto) return true
        if(l === null) return false
        l = l.__proto__
    }
    return false
}
```
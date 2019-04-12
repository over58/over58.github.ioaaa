---
title: js中的this机制
date: 2019-04-08 20:01:38
tags: [js]
author: [徐勇超]
---

### 概念
this是函数 ( 运行时,即指的是被调用时 )的上下文， 指向调用它的 (最近的上下文)。

### 绑定规则
1. 函数绑定
2. new绑定 
3. 箭头函数绑定
  
<!--more-->

#### 1.函数调用
JS（ES5）里面有三种函数调用形式：
```
  func(p1, p2) 
  obj.child.method(p1, p2)
  func.call(context, p1, p2) // 先不讲 apply
```
一般，初学者都知道前两种形式，而且认为前两种形式「优于」第三种形式。
从看到这篇文章起，你一定要记住，第三种调用形式，才是正常调用形式：
```
  func.call(context, p1, p2)
```
其他两种都是语法糖，可以等价地变为 call 形式：
```
  func(p1, p2) 等价于
  func.call(undefined, p1, p2)

  obj.child.method(p1, p2) <=>
  obj.child.method.call(obj.child, p1, p2)
```
请记下来。（我们称此代码为「转换代码」，方便下文引用）
至此我们的函数调用只有一种形式：
``` 
  func.call(context, p1, p2)
```
举些其他例子：
```
var a= {
  name: 'XXX',
  xxx: function () {
    console.log(this)
  }
}

function xxx() {
  console.log(this)
}
(b = a.xxx)()
<=> var b = a.xxx.bind(undefined); b()

(a.xxx)()
<=> a.xxx()

```
##### Dom元素绑定事件时的this
MDN这样解释：
>通常来说this的值是触发事件的元素的引用，这种特性在多个相似的元素使用同一个通用事件监听器时非常让人满意。当使用 addEventListener() 为一个元素注册事件的时候，句柄里的 this 值是该元素的引用。其与传递给句柄的 event 参数的 currentTarget 属性的值一样。
这种this绑定时浏览器内置的，不方便看，但可以假想为：
```
var button = document.getElementById("btn)
button.addEventListener('click', handlder)

// 当事件被触发时
handler.call(event.currentTarget, event) 
// 那么 this 是什么不言而喻
```
#### 2.new绑定
使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1、创建（或者说构造）一个新的临时对象。
2、指定原型。
3、返回这个新对象(这个新对象会绑定到函数调用的this)。
4、给原型指定名字为prototype

手写一个new实现
```
function Person() {
	  // 1. 创建一个空的对象
    var obj = new Object(),
	  
    // 2. 链接到原型，obj 可以访问到构造函数原型中的属性  

    // 获得构造函数，arguments中去除第一个参数(构造函数)
    obj.__proto__ = Person.prototype;
    obj.__proto__.constructor = Person
    
    // 3. 
    var ret = Person.apply(obj, arguments);
	  return ret instanceof Object ? ret : obj;
};

//4.
Person.prototype = {
  constructor: null
}
```
####  3.箭头函数
ES6新增一种特殊函数类型：箭头函数,根据外层（函数或者全局）作用域（词法作用域）来决定this。

foo()内部创建的箭头函数会捕获调用时foo()的this。由于foo()的this绑定到obj1，bar(引用箭头函数)的this也会绑定到obj1，箭头函数的绑定无法被修改(new也不行)。
```
function foo() {
    // 返回一个箭头函数
    return (a) => {
        // this继承自foo()
        console.log( this.a );
    };
}
var obj1 = {
  a: 2
};
var obj2 = {
    a: 3
}
var bar = foo.call( obj1 );
bar.call( obj2 ); // 2，不是3！
```
ES6之前和箭头函数类似的模式，采用的是词法作用域取代了传统的this机制。
```
function foo() {
    var self = this; // lexical capture of this
    setTimeout( function() {
        console.log( self.a ); // self只是继承了foo()函数的this绑定
    }, 100 );
}
var obj = {
    a: 2
};
foo.call(obj); // 2
```

代码风格统一问题：如果既有this风格的代码，还会使用 seft = this 或者箭头函数来否定this机制。

- 只使用词法作用域并完全抛弃错误this风格的代码；
- 完全采用this风格，在必要时使用bind(..)，尽量避免使用 self = this 和箭头函数。

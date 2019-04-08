---
title: this
date: 2019-04-08 18:13:17
tags: [this]
---

### this的概念
this是函数 ( 运行时,即指的是被调用时 )的上下文， 指向调用它的 (最近的上下文)。

### this的绑定规则
1. 默认绑定（严格/非严格模式）
2. 隐式绑定 (作为一个普通对象的属性调用)
3. 显示绑定 （apply,call, bind等等）
4. new绑定 
5. 箭头函数绑定

#### 1.默认绑定（严格/非严格模式）
独立函数调用：
严格模式下， this指向undefined ; 非严格模式下， this指向window
```
//非严格模式
function foo() {
  console.log(this) // window
}
//严格模式
function foo() {
  "use strict";
  console.log(this) // undefined
}
```
<!-- more -->
#### 2.隐式绑定

当函数引用有上下文对象时，隐式绑定规则会把函数中的this绑定到这个上下文对象。对象属性引用链中只有上一层或者说最后一层在调用中起作用。
1.作为对象的一个属性被调用
```
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
obj.foo(); // 2
```
2.给Dom元素绑定事件的时候
```
let dom = document.getElementById('btn')
dom.addEventListener('click', function() {
  console.log(this) //dom元素， 如果想要this指向dom元素，注意不要使用箭头函数，原因看下文。
})
```

有趣的情况
1.
```
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // 函数别名
var a = "oops, global"; // a是全局对象的属性
bar(); // "oops, global"  
```

2.
```
function foo() {
    console.log( this.a );
}
function doFoo(fn) {
    // fn其实引用的是foo
    fn(); // <-- 调用位置！
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // a是全局对象的属性
doFoo( obj.foo ); // "oops, global"
function setTimeout(fn, delay) {
    // 等待delay毫秒
    fn(); // <-- 调用位置！
}
```

>应用规则1，this指的时运行时的上下文，指向调用它的 (最近的上下文)。！！！
#### 3.显示绑定
通过call(..) 或者 apply(..)方法。第一个参数是一个对象，在调用函数时将这个对象绑定到this。因为直接指定this的绑定对象，称之为显示绑定。
1.利用call、apply、bind函数显示的指定上下文
2.API调用的“上下文”  
  JS许多内置函数提供了一个可选参数，被称之为“上下文”（context），其作用和bind(..)一样，确保回调函数使用指定的this。这些函数实际上通过call(..)和apply(..)实现了显式绑定。
```
function foo(el) {
	console.log( el, this.id );
}

var obj = {
    id: "awesome"
}

var myArray = [1, 2, 3]
// 调用foo(..)时把this绑定到obj
myArray.forEach( foo, obj );
// 1 awesome 2 awesome 3 awesome
```

#### 4.new绑定
使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1、创建（或者说构造）一个新对象。
2、这个新对象会被执行[[[[Prototype]]]]连接。
3、这个新对象会绑定到函数调用的this。
4、如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

手写一个new实现
```
function create() {
	// 创建一个空的对象
    var obj = new Object(),
	// 获得构造函数，arguments中去除第一个参数(构造函数)
    Con = [].shift.call(arguments);
	// 链接到原型，obj 可以访问到构造函数原型中的属性
    obj.__proto__ = Con.prototype;
	// 绑定 this 实现继承，obj 可以访问到构造函数中的属性
    var ret = Con.apply(obj, arguments);
	// 优先返回构造函数返回的对象
	return ret instanceof Object ? ret : obj;
};
```
##### 被忽略的this
把null或者undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认规则。

下面两种情况下会传入null
```
使用apply(..)来“展开”一个数组，并当作参数传入一个函数
bind(..)可以对参数进行柯里化（预先设置一些参数）
function foo(a, b) {
    console.log( "a:" + a + "，b:" + b );
}

// 把数组”展开“成参数
foo.apply( null, [2, 3] ); // a:2，b:3

// 使用bind(..)进行柯里化
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2，b:3 
```
总是传入null来忽略this绑定可能产生一些副作用。如果某个函数确实使用了this，那默认绑定规则会把this绑定到全局对象中。

更安全的this

安全的做法就是传入一个特殊的对象（空对象），把this绑定到这个对象不会对你的程序产生任何副作用。

JS中创建一个空对象最简单的方法是**Object.create(null)**，这个和{}很像，但是并不会创建Object.prototype这个委托，所以比{}更空。
```
function foo(a, b) {
    console.log( "a:" + a + "，b:" + b );
}

// 我们的空对象
var ø = Object.create( null );

// 把数组”展开“成参数
foo.apply( ø, [2, 3] ); // a:2，b:3

// 使用bind(..)进行柯里化
var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2，b:3 
```
##### 间接引用
间接引用下，调用这个函数会应用默认绑定规则。间接引用最容易在赋值时发生。
```
// p.foo = o.foo的返回值是目标函数的引用，所以调用位置是foo()而不是p.foo()或者o.foo()
function foo() {
    console.log( this.a );
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4};

o.foo(); // 3
(p.foo = o.foo)(); // 2
```
####  5.箭头函数
ES6新增一种特殊函数类型：箭头函数，箭头函数无法使用上述四条规则，而是根据外层（函数或者全局）作用域（词法作用域）来决定this。

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

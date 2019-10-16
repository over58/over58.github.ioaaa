---
title: 变量、作用域和内存问题
date: 2019-04-30 15:24:17
author: ['徐勇超']
tags:
  - 类型转换
categories: [js知识库]
---
### 变量
#### 全局属性的两种创建方法的区别
##### 1. var a='a'
执行Object.getOwnPropertyDescriptor(window, 'a')
```
{
  value: "a", 
  writable: true,
  enumerable: true,
  configurable: false
}
```

##### 2. a='a'
```
{
  value: "a",
  writable: true,
  enumerable: true,
  configurable: true
}
```
总而言之，最明显的区别就是var a = 'a'这种方式定义的变量不能删除

<!-- more -->

#### 复制变量的方式
1. 复制基本类型时直接复制的是值
2. 复制引用类型时复制的是一个指针

#### 传递参数
>传递参数的时候都是按值传递的。（在看了js高级程序设计之前，我是懵的。）访问变量有按值和按引用两种方式，而参数只能按值传递
举个栗子就清楚了
```
function setName(obj) {
    obj.name = "Nicholas";
}
var person = new Object();
setName(person);
alert(person.name);    //"Nicholas"
```

```
function setName(obj) {
  obj.name = "Nicholas";
  obj = new Object();
  obj.name = "Greg";
}
var person = new Object();
setName(person);
alert(person.name);    //"Nicholas"
```

### 执行环境和作用域
执行环境(execution context，为简单起见，有时也称为“环境”)是 JavaScript 中最为重要的一个概 念。执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个 与之关联的变量对象(variable object)，环境中定义的所有变量和函数都保存在这个对象中。虽然我们 编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。
当代码在一个环境中执行时，会创建变量对象的一个作用域链(scope chain)。作用域链的用途，是 保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所 在环境的变量对象。如果这个环境是函数，则将其活动对象(activation object)作为变量对象。活动对 6 象在最开始时只包含一个变量，即 arguments 对象(这个对象在全局环境中是不存在的)。作用域链中 的下一个变量对象来自包含(外部)环境，而再下一个变量对象则来自下一个包含环境。这样，一直延 续到全局执行环境;全局执行环境的变量对象始终都是作用域链中的最后一个对象。
标识符解析是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始， 然后逐级地向后回溯，直至找到标识符为止(如果找不到标识符，通常会导致错误发生)。

#### 基本类型
1. Undefined
2. Unll
3. Boolean
4. Number
5. String
6. Symbol

### 小结
1、基本类型值在内存中占据固定大小的空间，因此被保存在栈内存中;
2、从一个变量向另一个变量复制基本类型的值，会创建这个值的一个副本;
3、引用类型的值是对象，保存在堆内存中;
4、包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针;
5、从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象
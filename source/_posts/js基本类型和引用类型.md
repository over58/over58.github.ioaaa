---
title: 变量、作用域和内存问题
date: 2019-04-30 15:24:17
author: ['徐勇超']
tags:
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

#### 执行环境和作用域

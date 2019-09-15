---
title: 从js的属性描述符描述vue.js的响应式视图
date: 2019-03-15 19:57:05
tags: [js, vue]
---

### 前言

JavaScript 的对象，拥有任意数量的唯一键，键可以是字符串（String）类型或标记（Symbol，ES6 新增的基本数据类型）类型，每个键对应一个值，值可以是任意类型的任意值。对于对象内的属性，JavaScript 提供了一个属性描述器接口 PropertyDescriptor

### 定义对象的属性

```
var obj = {
  name: 'Tom',
  sex: 'man
}

or

var obj = {}
obj.name = 'Tom'
```

### Object.defineProperty()

上面使用的方式不能对属性描述符的操作，需要使用 Object.ddefineProperty(obj, prop, descriptor)

#### 当使用 defineProperty()方法操作属性的时候，描述符的默认值为：

1. value: undefined
2. set: undefined
3. get: undefined
4. writable: false
5. enumerable: false
6. configable: false

#### 不使用该方法定义属性，默认值为：

1. value: undefined
2. set: undefined
3. get: undefined
4. writable: true
5. enumerable: true
6. configable: true

#### 还支持批量修改对象属性以及描述对象

```
Object.defineProperties(obj, {
  name: {
    value: 'Tom',
    configable: true
  },
  sex: {
    value: 'man'
  }
})
```
<!-- more -->
#### 读取属性描述符对象 Object.getOwnPropertyDescriptor(obj,prop)

### 属性描述符对象

#### value 属性的值

#### 存储器函数（setter/getter）

1.get
2.set

```
var x = {}
Object.defineProperty(x, 'count', {
  get: funciton () {
    return this.value
  },
  set: function (val) { 
    this.count = val
  } 
})
console.log(x) 
x.count = 1 
console.log(x.count)

```
执行上面的代码，会发现报错，执行栈溢出。
>上述代码在执行set 函数中执行 count赋值操作的时候(this.count = val)，循环调用自己，形成了死循环。
更改为以下代码：
```
var x = {}
Object.defineProperty(x, 'count', {
  get: () {
    return this._count
  }
  set: function (val) { 
     this._count = val 
  }
})
console.log(x) 
x.count = 1 
console.log(x.count)
```
实际上，在使用 defineProperty()方法设置对象的属性的时候，通常需要在对象内部维护一个新的内部变量(以下划线_开头，表示为内部变量)
>注：当设置了存取器描述时，不能设置value 和writable, 可以当作没有这两个属性
#### writable 指定对象的value是否可以改变

#### enumerable 指定对象中的某属性是否可以枚举，就是for in 操作是否可以遍历出来

#### configable 指定对象属性的描述符是否可以改变

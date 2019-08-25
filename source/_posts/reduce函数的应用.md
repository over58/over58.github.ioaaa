---
title: reduce函数的应用
author:
  - 徐勇超
date: 2019-08-25 22:38:13
tags:
categories:
---

```
var arr = [11,3,4,556,7,8,-4]
```
#### 获得最大值/最小值
```
var a= arr.reduce((a, b) => {
  return a > b ? a: b
})
```
<!-- more -->

#### 数组去重
```
var arr1 = [1, 2, 3, 1, 1, 2, 3, 3, 4, 3, 4, 5]
let ret1 = arr1.reduce((a, b) => {
  if(!a.includes(b)) {
    a.push(b)
  }
  return a
}, [])

```
#### 实现map函数

```
Array.prototype._map = function(cb) {
  if(typeof cb === 'function') {
    let arr = this
    return arr.reduce((prev, next, index, array) => {
      prev.push(cb(next, index, array))
      return prev
    }, [])
  }else{
    throw new Error('cb' + ' is not function' )
  }
}
```
#### 实现一个filter函数
```
Array.prototype._filter = function(cb) {
  if(typeof cb === 'function') {
    let arr = this
    return arr.reduce((prev, next, index, array) => {
      cb(next, index, array) && prev.push(next)
      return prev
    }, [])
  }else{
    throw new Error('cb' + ' is not function' )
  }
}
```

#### 数组扁平化
```
let arr2 = [1, 2, '3js', [4, 5, [6], [7, 8, [9, 10, 11], null, 'abc'], {age: 12}, [13, 14]], '[]'];
function flatten(arr) {
  if(Array.isArray(arr)) {
    return arr.reduce((prev, cur) => {
       // 如果遍历的当前项是数组，再迭代展平
      return Array.isArray(cur) ? prev.concat(flatten(cur)) : prev.concat(cur)
    }, [])
  } else {
    throw new Error(arr + ' is not array')
  }
}
```

#### 统计字符串中每个字符出现的次数
```
const str = '9kFZTQLbUWOjurz9IKRdeg28rYxULHWDUrIHxCY6tnHleoJ'

var ret3 = Array.from(str).reduce((accumulator, current) => {
  current in accumulator ? accumulator[current]++ : accumulator[current] = 1
  return accumulator
}, {})
```

#### 过滤满足多个条件的数组
>将过滤函数作为数组进行调用， 初始值为原数据数组
```
const filter1 = (arr) => arr.filter(item => item.name.length === 3)
const filter2 = (arr) => arr.filter(item => item.age > 26)
var ret5 = [filter1, filter2].reduce((accumulator, fn) => fn(accumulator), arr4)
```
---
title: stringify的使用
date: 2019-03-13 14:34:07
tags: JSON js
---

这篇文章的由来是这样的：前两天遇到这样一个场景，接口返回了一个json对象，要求我进行格式化显示（显示出json对象的结构）。那么我就想了，一个对象要想显示出来，得转成string 类型的，于是我就使用了JSON.stringify(),但是转成字符串之后并没有缩进，显示出来的是一个长长的字符串。难道我还要自己人为的遍历对象,自己拼接一个带缩进的字符串么？太TM扯了！于是查看了stringify的官方文档，发现了很多有意思的东西，这个函数的作用远远不止是将json对象转成string那么简单，下面是我列举的stringify的几个小功能:

1. json格式化，带缩进
2. 过滤掉无效的字段
3. 对符合某种条件的字段做操作

原始数据
```
person = {
    sex: 'man',
    name: 'Tom',
    telphones: [
        "234123423",
        "2345234523"
    ]
}
```
一、原始情况，直接显示json字符串

code:
```
JOSN.stringify(person)
```

运行结果：
```
{"sex":"man","name":"Tom","age":22,"telphones":["2341234123","3452345"]}
```

二、将一个json对象格式化显示出来

code:
```
JOSN.stringify(person, null, 2)
```
运行结果：
```
{
    sex: 'man',
    name: 'Tom',
    telphones: [
        "234123423",
        "2345234523"
    ]   
}

```
三、不显示某些字段（哪些字段不需要显示就返回undefined）

code

```
JOSN.stringify(person, function(k, v){
    if (k === 'telphones'){
        return undefined
    }
    return v
}, 2)
```
运行结果：
```
{
    sex: 'man',
    name: 'Tom'
}

```
四、只显示某些字段

code

```
JOSN.stringify(person, ['sex'], 2)
```
运行结果：
```
{
    sex: 'man'
}

```
更多详情
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
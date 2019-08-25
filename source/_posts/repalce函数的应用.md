---
title: repalce函数的应用
author:
  - 徐勇超
date: 2019-08-20 21:51:37
tags: js
categories:
---


### 介绍

| 字符 |替换文本  |
| --- | --- |
|$1、$2...$99  |与 regexp 中的第 1 到第 99 个子表达式相匹配的文本。 |
| $&	 | 与 regexp 相匹配的子串。|
| $` | 位于匹配子串左侧的文本。|
| $'| 位于匹配子串右侧的文本。|
| $$ | 直接量符号。|

<!-- more -->
### 格式化日期
```
var date = new Date().toLocaleString()
//method1
var formatDate= date.replace(/(\d+)\/(\d+)\/(\d+)\s+[\u4e00-\u9fa5]+(\d+):(\d+):(\d+)/g, '$1/$2/$3 $3:$4:$5')

console.log(formatDate ) // 2019/8/20 20:11:43


//method2
date.replace(/[\u4e00-\u9fa5]+(\d+):(\d+):(\d+)/g, function(all, p1,p2,p3){
  return [p1, p2, p3].join(':')
})
```

### 转换为驼峰命名
```
var s1 = "get-element-by-id"
```
// 转化为 getElementById

```
var f = function(s) {
    return s.replace(/-\w/g, function(x) {
        return x.slice(1).toUpperCase();
    })
}
```

### 查找字符串中出现最多的字符和个数
>例: abbcccddddd -> 字符最多的是d，出现了5次


```
let str = "abcabcabcbbccccc";
let num = 0;
let char = '';

 // 使其按照一定的次序排列
str = str.split('').sort().join('');
// "aaabbbbbcccccccc"

// 定义正则表达式
let re = /(\w)\1+/g;
str.replace(re,($0,$1) => {
    if(num < $0.length){
        num = $0.length;
        char = $1;        
    }
});
console.log(`字符最多的是${char}，出现了${num}次`);
```

### 实现千位分隔符
>// 保留三位小数
parseToMoney(1234.56); // return '1,234.56'
parseToMoney(123456789); // return '123,456,789'
parseToMoney(1087654.321); // return '1,087,654.321'

```
function parseToMoney(num) {
  num = parseFloat(num.toFixed(3));
  let [integer, decimal] = String.prototype.split.call(num, '.');
  integer = integer.replace(/\d(?=(\d{3})+$)/g, '$&,');
  return integer + '.' + (decimal ? decimal : '');
}

作者：寻找海蓝96
链接：https://juejin.im/post/5d51e16d6fb9a06ae17d6bbc
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

> ?=正向肯定预查 详细信息看这里[正则的基本知识](https://app.yinxiang.com/shard/s25/nl/22912984/8cb64e8c-9f29-47f5-b235-72a6c4d55489/)
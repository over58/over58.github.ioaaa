---
title: css特性
author:
  - 徐勇超
tags:
  - css
  - 权重
  - 盒模型
date: 2019-09-16 00:11:25
categories:
---

### 权重
- ！important  Infinity
- 行间样式         1000 
- id               100
- class |属性|伪类   10
- 标签选择器|伪元素    1
- 通配符             0
- 继承
>不存在进位的情况，只要高位大，就不用比了，权重一定高

### 层叠性
当同一个元素的有多个样式且权重相同时，后面覆盖前面的

### 盒模型
1. content
2. padding
3. border
4. margin
>box-sizing属性可以设置盒模型
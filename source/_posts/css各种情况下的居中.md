---
title: css各种情况下的居中
date: 2019-02-27 15:39:58
tags: css
author: 徐勇超
---

### 1.水平居中行内元素
    
只需要把行内元素包裹在一个属性display为block的父层元素中，并且把父层元素添加text-align: center即可。    
适用元素：文字，链接，及其其它inline或者inline-*类型元素（inline-block，inline-table，inline-flex )

### 2.水平居中(多个块状元素居中)
    1. 如果页面里有多个块状元素需要水平排列居中，可以将元素的display属性设置为inline-block，并且把父元素的text-align属性设置为center即可实现。
    
    2. 使用flex布局解决，父元素定义display:flex;

### 3.垂直居中（单行、多行的元素居中）
    当一个行内元素，即inline，inline-*类型的元素需要居中的话，可以将它的height和line-height同时设置为父元素的高度即可实现垂直居中效果。
    多行元素居中：
组合使用display:table-cell和vertical-align:middle属性来定义需要居中的元素的父容器元素生成效果

<!-- more -->

### 4.垂直居中（未知块状元素高度）

```
.item{
  top: 50%;
  position: absolute;
  transform: translateY(-50%); /* 这里我们使用css3的transform来达到类似效果 */
}
```

### 5.水平垂直居中（使用flex布局实现）

```
.parent{
  display: flex;
  justify-content:center;
  align-items: center;
  
  /* 注意这里需要设置高度来查看垂直居中效果 */
  background: #AAA;
  height: 300px;
}
```

### 6.水平垂直居中(已知高度和宽度的元素解决方案)

    设置元素定位为absolute，并且设置top, left绝对值为50%，margin-top和margin-left为元素高度一半的负值即可，如下：


```
.item{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -75px;
  margin-left: -75px;
}
```
### 7.水平垂直居中（未知高度和宽度元素解决方案）
    使用类似的transform属性来定义，即可实现，如下：

```
.item{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### 8.水平居中总结
1. 水平居中之inline-block+text-align
-   兼容性非常好
-   inline+zoom:1  //兼容IE8以下
-   child会继承text-align:center，需要对子元素进行reset

2. 水平居中之table+margin
-   table元素宽度为内容宽度
-   只需要设置child ,IE6 7可以child可以采用table的方式如th tr来实现

3. 水平居中之absolute+transform
- 脱离文档流 不会对其他元素产生影响
- 不兼容低版本IE

4. 水平居中之flex+justify-content

```
.child{
    margin: 0 auto
}
```

-不兼容低版本IE
---
title: css中的各种单位
author:
  - 徐勇超
tags: []
categories:
  - js知识库
comments: true
date: 2021-02-25 15:25:42
updated: 2021-02-25 15:25:42
---

## 物理像素（设备像素）

表示物理设备中最小的点， 是绝对单位

## px

- 相对单位
- px / 设备像素 = dpr

## rem
html中font-size的值

## %
相对于父元素

## em 
当前元素中font-size的值。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。

EM特点

1. em的值并不是固定的；
2. em会继承父级元素的字体大小。

<!-- more -->

>注意：任意浏览器的默认字体高都是16px。所有未经调整的浏览器都符合: 1em=16px。那么12px=0.75em,10px=0.625em。为了简化font-size的换算，需要在css中的body选择器中声明Font-size=62.5%，这就使em值变为 16px*62.5%=10px, 这样12px=1.2em, 10px=1em, 也就是说只需要将你的原来的px数值除以10，然后换上em作为单位就行了。

>所以我们在写CSS的时候，需要注意两点：
>
>1. body选择器中声明Font-size=62.5%；
>2. 将你的原来的px数值除以10，然后换上em作为单位；
>3. 重新计算那些被放大的字体的em数值。避免字体大小的重复声明。

>也就是避免1.2 * 1.2= 1.44的现象。比如说你在#content中声明了字体大小为1.2em，那么在声明p的字体大小时就只能是1em，而不是1.2em, 因为此em非彼em，它因继承#content的字体高而变为了1em=12px。

## vh/vw
分别是视窗的高和宽， 相对于视窗，将视窗分成了100份

## vmin/vmax
- vmin 代表vh、vw中的最小值
- vmax 代表vh、vw中的最大值

## fr
fr是一个自适应单位，被用于在一系列长度值中分配剩余空间
```html
<div class="grid">
  <div class="column"></div>
  <div class="column"></div>
  <div class="column"></div>
  <div class="column"></div>
</div>

```
```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-column-gap: 10px;
}

```

常常和repeat结合起来用
```bash
repeat(number of columns/rows, the column width we want);
```

## 数字

在写line-height的时候直接写数字，代表是几倍的font-size
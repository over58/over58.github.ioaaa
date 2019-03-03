---
title: 'overflow-x/overflow-y一个为visible,一个为非visible时候的怪异行为'
date: 2019-03-02 17:12:50
tags: [css, overflow]
---

MDN的官方解释：

```
The computed values of ‘overflow-x’ and ‘overflow-y’ are the same as their specified values, except that some combinations with ‘visible’ are not possible: if one is specified as ‘visible’ and the other is ‘scroll’ or ‘auto’, then ‘visible’ is set to ‘auto’. The computed value of ‘overflow’ is equal to the computed value of ‘overflow-x’ if ‘overflow-y’ is the same; otherwise it is the pair of computed values of ‘overflow-x’ and ‘overflow-y’. 
```

overflow-x 和overflow-y的计算值和它们指定的值是相同的，除了某些与visible组合的是不可能的。
1. 如果一个为visible, 另一个被指定为scroll、 auto 、hidden(实际测试所得) ，那么visible 将被设置为auto
1. 如果overflow的指定值和overflow-x相等的话（如果overflow-y相同的话）

其余情况，overflow-x 和overflow-y的值和指定的值相同

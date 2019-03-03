---
title: css实现单行、多行文本溢出
date: 2019-02-28 15:09:23
tags: [css]
---

###　单行：
```
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
```

###　多行：
```
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
```
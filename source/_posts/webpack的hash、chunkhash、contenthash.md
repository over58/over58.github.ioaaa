---
title: webpack的hash、chunkhash、contenthash
author:
  - 徐勇超
tags: []
categories:
  - webpack
comments: true
date: 2021-02-25 15:22:13
updated: 2021-02-25 15:22:13
---

对于webpack的hash，常用于cdn缓存。我理解的是文件不变的情况下，最后打包出来的hash串也不会变。最近被问到了这是三个hash的区别，就查了一下，发现还很有讲究。

先看一下三个hash的解释：

- [hash] is a "unique hash generated for every build"  每次build都会变
- [chunkhash] is "based on each chunks' content"  基于每个chunk内容生产的hash值， 每次chunk内容变了，chunk生成的文件的哈希值就都变了
- [contenthash] is "generated for extracted content"   基于具体的文件内容生成文件自己的hash


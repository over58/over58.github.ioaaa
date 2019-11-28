---
title: webpack总览
author:
  - 徐勇超
tags: []
categories:
  - webpack
comments: true
date: 2019-11-27 21:19:17
updated: 2019-11-27 21:19:17
---

### entry
#### context 
解析weboack.config.js的目录，默认为执行启动 Webpack 时所在的当前工作目录。

#### Chunk 名称
Webpack 会为每个生成的 Chunk 取一个名称，Chunk 的名称和 Entry 的配置有关：
- 如果 entry 是一个 string 或 array，就只会生成一个 Chunk，这时 Chunk 的名称是 main；
- 如果 entry 是一个 object，就可能会出现多个 Chunk，这时 Chunk 的名称是 object 键值对里键的名称
  
### output
#### filename

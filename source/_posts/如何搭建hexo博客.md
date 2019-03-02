---
layout: hexo
title: 如何搭建hexo博客
date: 2019-02-28 09:48:34
tags: hexo blog
---

### 准备开发环境（默认已安装好node、git）
```
npm install -g hexo-cli
```

### 创建项目
```
mkdir blog
cd blog
npm install hexo-autoprefixer hexo-generator-feed hexo-generator-json-content hexo-generator-search hexo-helper-qrcode hexo-related-popular-posts hexo-renderer-less hexo-renderer-marked --save
```
此时是如下目录结构
> 
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes

### 更换配置
更改项目根目录下的_config.ymal中的url、author、keywords等参数


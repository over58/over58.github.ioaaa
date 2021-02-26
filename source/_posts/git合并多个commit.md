---
title: git合并多个commit
author:
  - 徐勇超
tags:
  - git
date: 2019-10-24 23:19:56
categories:
---

### 一般的做法（直接merge）
```
git chekcout another
modify ...
git chekcout master
git merge another

```

### 改进版本:合并多个提交为一条(git merge --squash branchname)
```
git merge --squash another
git commit -m "message here"
```
--squash含义和原理如下:

--squash选项的含义是：本地文件内容与不使用该选项的合并结果相同，但是不提交、不移动HEAD，因此需要一条额外的commit命令。其效果相当于将another分支上的多个commit合并成一个，放在当前分支上，原来的commit历史则没有拿过来。

判断是否使用--squash选项最根本的标准是，待合并分支上的历史是否有意义。

如果在开发分支上提交非常随意，甚至写成微博体，那么一定要使用--squash选项。版本历史记录的应该是代码的发展，而不是开发者在编码时的活动。

只有在开发分支上每个commit都有其独自存在的意义，并且能够编译通过的情况下（能够通过测试就更完美了），才应该选择缺省的合并方式来保留commit历史。
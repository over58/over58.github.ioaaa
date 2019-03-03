---
title: git常用知识点
date: 2019-03-03 21:43:19
tags: [git]
---

### 常用的几个命令
```
git add
git commit
git status
git diff 
git branch
git remote
git pull 
git push 
git reset
git tag
```

### 常见的场景
#### 版本需要回退到旧版本
```
1、git reset
 git reset --hard "目标版本commmit-id"
 git push origin master -f 暴力，不建议
 适用场景： 如果想恢复到之前某个提交的版本，且那个版本之后提交的版本我们都不要了，就可以用这种方法。


2、git revert
 git revert的作用通过反做创建一个新的版本，这个版本的内容与我们要回退到的目标版本一样，但是HEAD指针是指向这个新生成的版本，而不是目标版本。
 git revert -n 版本号
 git commit -m 版本名
 适用场景： 如果我们想恢复之前的某一版本（该版本不是merge类型），但是又想保留该目标版本后面的版本，记录下这整个版本变动流程，就可以用这种方法。

```
#### 拉取远程分支并创建本地分支
1、git checkout -b newBranch origin/remoteBranch
2、git fetch origin remoteBranch:newBranch
3、git checkout -b newBranch --trace origin/remoteBranch

#### 修改上一次commit的信息，未push到远程分支
```
git commit -m 'message' --amend
```
#### 忽略对某个文件或者文件夹的的修改
将文件或者文件夹的名字添加到.gitignore文件


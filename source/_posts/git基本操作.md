---
title: git基本操作
author:
  - 徐勇超
tags: []
categories:
  - git
comments: true
date: 2020-05-02 12:05:23
updated: 2020-05-02 12:05:23
---

### 最近一次 Commit 的代码有问题
```
git add 我是修改内容.txt
git commit --amend
```
【amend】修正，会对最新一条 commit 进行修正，会把当前 commit 里的内容和暂存区（stageing area）里的内容合并起来后创建一个新的 commit，用这个新的 commit 把当前 commit 替换掉。

输入上面的命令后，Git 会进入提交信息编辑界面，然后你可以删除之前的 changeId，并且修改或者保留之前的提交信息，:wq 保存按下回车后，你的 commit 就被更新了。
对于 amend 还可能出现几种小问题，下面列举下：

#### 刚刚写的提交信息有问题，想修改怎么办？

```
git commit --amend -m "新的提交信息"
```

#### 刚刚提交完代码发现，我有个文件没保存，漏了提交上去怎么办？

最简单的方式，再次 commit：
```
git  commit -m "提交信息"
```

另一中方式,使用--no-edit，它表示提交信息不会更改，在 git 上仅为一次提交。

```
git add changgeFile // changeFile 刚刚漏了提交的文件
git commit --amend --no-edit
```

<!-- more -->

### 最新提交的代码没问题，它上一次提交的有问题怎么办？
上面说的是最新一次的提交出了问题，接下来说之前提交的代码发现有问题了想修改，应该怎么办？需要一个新的命令：
```
git rebase -i
```
rebase -i 是 rebase --interactive 的缩写形式，意为「交互式 rebase」。所谓「交互式 rebase」，就是在 rebase 的操作执行之前，你可以指定要 rebase 的 commit 链中的每一个 commit 是否需要进一步修改。
>注意点：看 commit 历史的时候，最新的提交在最下面，刚开始使用时候总是搞错。

### 刚刚写完的提交太烂了，不想改了，想直接丢弃怎么办？

你可以用 reset --hard 来撤销 commit
```
git reset --hard HEAD^
```
HEAD 表示 HEAD^ 往回数一个位置的 commit ，HEAD^ 表示你要恢复到哪个 commit。因为你要撤销最新的一个 commit，所以你需要恢复到它的父 commit ，也就是 HEAD^。那么在这行之后，你的最新一条就被撤销了。

### Git 代码已经 push 上去发现有问题

#### 情况一：如果出错内容还在私有分支

这种情况你修改后，再次提交会报错，由于你在本地对已有的 commit 做了修改，这时你再 push 就会失败，因为中央仓库包含本地没有的 commits。这种情况只在你自己的分支 branch1 ，可以使用强制 push 的方式解决冲突。
```
git push origin branch1 -f
```
-f 是 --force 的缩写，意为「忽略冲突，强制 push」
#### 情况2：如果出错内容已经 push 到了 master 分支

这种情况可以使用 Git 的 revert 指令。
```
git revert HEAD^
```
上面这行代码就会增加一条新的 commit，它的内容和倒数第二个 commit 是相反的，从而和倒数第二个 commit 相互抵消，达到撤销的效果。
在 revert 完成之后，把新的 commit 再 push 上去，这个 commit 的内容就被撤销了。
revert 与前面说的 reset 最主要的区别是，这次改动只是被「反转」了，并没有在历史中消失掉，你的历史中会存在两条 commit ：一个原始 commit ，一个对它的反转 commit。

### Git 关于暂存的问题
假如正在开发手中需求的时候，突然来了个紧急 bug 要修复，这时候需要先 stash 已经写的部分代码，使自己返回到上一个 commit 改完 bug 之后从缓存栈中推出之前的代码，继续工作。
- 添加缓存栈: git stash
- 查看缓存栈: git stash list
- 推出缓存栈: git stash pop
- 取出特定缓存内容：git stash apply stash@{1}
>注意：没有被 track 的文件（即从来没有被 add 过的文件不会被 stash 起来，因为 Git 会忽略它们。如果想把这些文件也一起 stash，可以加上 -u 参数，它是 --include-untracked 的简写。就像这样：git stash -u
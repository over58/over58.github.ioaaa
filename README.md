# hexo
这是使用hexo创建的一个简单的博客。一方面为自己提供了一个存笔记的地方，另一方面也是为了熟悉一下，makefile, docker之类的知识。同时添加了webhook，结合makefile中自定义命令实现了自动化部署，妈妈再也不用担心我写一篇文章，就跑到服务上重新部署代码了，哇哈哈！！！

# 本地操作
  # 生成静态文件
  hexo generate

  # 运行
  hexo server
  
  # 提交代码
   为了简化git 操作，我将常用的提交代码的操作写在了makefile中
   make commit-add
   make commit-update
   这两个都能直接提交代码，唯一的区别就是git commit -m "message"中message的不同。

# 服务器端
  # 第一次部署的时候：
    make start
  
  # 第二次以后：
    make restart
    
  # 还有一些其他的简单的命令，想要了解的看一下Makefile文件就行，非常的简单，这里就不再赘述了。




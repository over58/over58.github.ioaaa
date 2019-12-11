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

#### 配置动态Entry
假如项目里有多个页面需要为每个页面的入口配置一个entry，但这些页面数量可能会不断增长，这时entry的配置会受到其他因素的影响导致不能写成静态的值。解决办法就是把entry设置成一个函数去动态返回上面所说的配置：

```
//同步函数
entry: () => {
    return {
        a: './pages/a',
        b: './pages/b'
    }
}

//异步函数
entry: () => {
    return new Promise((resolve) => {
        resolve({
            a: './pages/a',
            b: './pages/b'
        })
    })
}
当结合 output.library 选项时：如果传入数组，则只导出最后一项。
```

### output
- filename
- path 配置输出后文件存在本地的目录
- publicPath 发布到线上的url前缀
#### library导出
- libraryTaraget  指明库(library)被打包后，以什么形式导出，赋值到哪个**位置**
- library 指明导出后库的**名字**，或者说key
- libraryExport 指明导出哪一个模块
  1. undefined 导出整个模块
  2. default **var MyDefaultModule = _entry_return_.default;**
  3. ['MyModule', 'MySubModule']  **var MySubModule = _entry_return_.MyModule.MySubModule;**
demo 
```
当 libraryTarget: 'window' ；   library: 'MyLibrary' 时

window['MyLibrary'] = _entry_return_;
window.MyLibrary.doSomething();
```

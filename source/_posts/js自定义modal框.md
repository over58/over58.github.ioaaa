---
title: js自定义modal框
date: 2019-03-17 20:55:41
tags: [js]
---

### 前言
作为一个Web开发而言，modal模态框一定不会陌生。本文将简单的讲一下如何使用js自定义一个modal框，当然了，本文的重点并不是教你如何构建一个modal框，而是希望能够教你如何构建一个组件的思路。好了，废话不多说，正文开始。

### modal是什么，有什么功能
modal是位于用户主窗口之上的一个元素，当它打开的时候，主窗口无法操作，位于主窗口之上的modal框内可以操作。一个modal至少包含以下几个功能：
1. 模态框的蒙版 .modal-overlay
2. 头部  .modal-header
3. 主体 .modal-body
4. 脚步 .modal-footer
5. 关闭按钮 .modal-close

>关闭按钮包括多种方式：取消按钮（footer中）、关闭按钮(右上角)、ESC按键、点击模态框主体外的蒙版的区域

### 构建插件
1.首先选择iife。这里使用了闭包的知识，因为闭包可以创建一个私有域。

<!-- more -->

```
(function(){
  var 私有变量 = 值
})()
```

2.设置选项（options）
```
  <!-- 设置一个windo中可以访问的函数 -->
  this.Modal = function() {
    this.modal = null; // 模态弹出框
    this.overlay = null; //蒙板
    this.closeButton = null; // 右上角关闭按钮
    this.footerCloseButton = null //footer关闭按钮
    this.options = {
      className: 'fade-and-drop',
      content: '这是一个自定义的模态框',
      minHeight: '300px',
      maxHeight: '600px',
      closable: true, // 是否可关闭，决定着是否有关闭按钮
      overlay: true
    };
    //  合并默认设置和用户自定义设置，用户自定义配置>默认配置
    if (arguments[0] && typeof arguments[0] === 'object') {
      this.options = mergeOptions(this.options, arguments[0]);
    }
  };

  //合并对象属性的工具方法
  function mergeOptions(target, source) {
    for (let property in source) {
      if (source.hasOwnProperty(property)) {
        target[property] = source[property];
      }
    }
    return target;
  }
```
3.　核心功能

现在我们对模态框的插件架构有了一定的了解，它包括了：构造函数、选项和公共方法。但它还不能做什么？接下来我们就要给他们添加相应的核心功能。所以我们再来看看，一个模态框应该做什么：

- 构建一个模态元素并将其添加到页面中
- 将选项（options）中的className指定一个类名，并将其添加到模态元素中
- 如果选项中的closeButton为true，则添加关闭按钮
- 如果选项中的content是 HTML 字符串，则将其设置为模态元素中的内容
- 如果选项中的content是domNode，则将其内部内容设置为模态元素的内容
- 分别设置模态的maxWidth和minWidth
- 如果选项中的overlay为true，则给模态框添加一个蒙层
- 当模态框显示时，添加一个scotch-open类名，可以在 CSS 中使用它来定义一个open状态
- 当模态框关闭时，删除scotch-open类名
- 如果模态框的高度超过视窗的高度，还可以添加一个scotch-anchored类，这样就可以处理这个场景的样式展示

### 代码思路
```
(function(){
  //构造函数
  this.Modal = function () {
    // 初始化默认option，　
    this.options = {

    }
    //合并用户自定义配置和默认配置，并赋值给options, 每个实例都可能不一样，所有不能放在prototype上，同时在其它函数中又要引用它，所有定义为公有属性
    
    this.options = mergeOptions(this.options, arguments[0])

  }
  // 打开Modal的方法,每个实例中的这个方法都是一样的,定义在prototype上
  Modal.prototype.open = function(){

    // 初始化Dom
    1.overlay蒙版元素
    2.modal元素{
      close按钮
      content
      footer
    }


    // 初始化Event
    包括：{
      close事件
      transitionEnd事件(关闭按钮中Css使用了过渡动画，等过渡动画完成之后才能移除dom)，需要注意的就是不同的的浏览器中这个时间的名字可能不一样
    }
  }

  //关闭方法
  Modal.prototype.close = function(){
    //移除Dom
  }

})()

```

### !!!!完整的代码链接 https://codepen.io/xuyongchaos/pen/aMGXLy?editors=1010

### 使用到的东西
1. 闭包
2. DocumentFragment
3. 如何减少浏览器回流
4. DOM操作
5. DOM事件
6. this相关call, bind
7. css样式

### 总结：
编写一个简单的插件需要的知识还是挺多的，没事的话可以自己编写一下，不仅锻炼了模块化编程思维，还可以对以前的知识进行查缺补漏。fighting!!!
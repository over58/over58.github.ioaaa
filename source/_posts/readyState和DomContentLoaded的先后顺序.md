---
title: readyState和DomContentLoaded的先后顺序
author:
  - 徐勇超
tags: []
categories:
  - js知识库
comments: true
date: 2019-12-30 15:42:08
updated: 2019-12-30 15:42:08
---

### 快速了解document.readyState
document.readyState是一个只读属性，可以返回当前文档的准备状态。

语法
var state = document.readyState;
其中state值包含下面三个值：

#### loading
表示文档正在加载中。
#### interactive
表示文档已完成加载，文档已被解析，但图像、样式表和框架等子资源仍在加载。
#### complete
表示文档和所有子资源已完成加载。如果状态变成这个，表明load事件即将触发。
document.readyState是一个IE7，IE8浏览器也支持的很古老的属性，设计的初衷是好的，看起来也会是一个非常有用的属性，但是实际上我敢保证，对于绝大多数的前端开发人员，肯定没有在实际项目中用过这个属性。

包括我自己，在很长一段时间以内，都认为这个属性中看不中用，连个锤子用都没有。

为什么呢？

原因有两个：一是没必要；二是有更好的选择。
### DOM事件绑定没必要等domready
对于web页面开发，JavaScript最主要的功能之一就是页面上DOM元素的交互实现，如果DOM元素还没有加载也没有被解析，自然这些DOM操作难以为继。于是，JS初始化的时机就变得很重要。

实际上，如果我们的JS文件以及script代码都放在页面的**底部**，我们不用考虑JS初始化时机，因为JS放在底部，等到要执行的时候，上面DOM都已经解析好了，百分之一亿可以放心运行。也就是什么readyState，什么DOMContentLoaded都不需要考虑。


我们经常会看到下面的代码：
```
$(document).ready(function() {
    // 少年的你，代码写在这里...
});
```
我会立即马上把$(document).ready这一戳东西删掉，只要你的JS代码是在页面底部的，这些都完全不需要，放心删除，绝对不会有任何问题，直接下面这样就好了：
```
(function() {
    // zhangxinxu: 这里代码...
})();
```
执行时机更快。

结合现状
几乎所有的网页性能分析工具都会把JS文件放在底部作为考察项之一，JS放在底部已经算是网页开发常事之一了。很多萌新可能不知道，在10年前，绝大多数网页的JavaScript引用都是在**head**中的，所以那个时期，有大量的文章探讨文档的加载机制，JS的执行时间等等问题。

随着一年一年的进步，现在这样的现象已经不多了，大家习惯都比较好，遇不到问题，自然探讨的就少了，探讨的少了，很多开发人员就不知道这样的事情，也就自然不会用了，毕竟，还有大把的新技术新框架要去学习呢。

这就是document.readyState以及'readystatechange'事件现在出现比较少的原因。

附上实际开发'readystatechange'事件使用示例：
```
document.onreadystatechange = function () {
    // document.readyState发生变化的时候执行
}
```
### DOMContentLoaded事件
document.readyState越来越少用到的另外一个原因，就是半路上杀出一个程咬金——'DOMContentLoaded'事件。

DOMContentLoaded事件是DOM Level 3新增的一个事件类型，IE9+浏览器支持，表示DOM节点内容加载完毕。
```
document.addEventListener('DOMContentLoaded', function () {});
或者：

window.addEventListener('DOMContentLoaded', function () {});
```
DOMContentLoaded设计初衷就是为了方便JS代码的初始化，要比记得记不住的interactive状态容易理解，也
容易使用的多。

因此，如果为了提防我们的JavaScript代码不小心跑到了页面的顶部，需要确保在DOM加载完毕之后执行，推荐使用下面代码：
```
window.addEventListener('DOMContentLoaded', function () {
    // https://www.zhangxinxu.com/wordpress/?p=9032代码这里...
});
```
由于script元素本身也是DOM元素，因此，只要脚本不是异步加载的，无论放在页面什么位置，DOMContentLoaded事件一定会触发。

我们不妨来看一个例子，了解更多关于DOMContentLoaded事件触发更多细节。

假设有一个名为 insert.js 的文件，里面的JS代码如下：
```
console.log('zxx被加载了~' + document.readyState);
window.addEventListener('DOMContentLoaded', function () {
    console.log('CSS选择器这本书很赞哦！' + document.readyState);
});
```
然后还有一个名为load-test.html的页面，里面代码这样：
```
<body>
<script src="./insert.js"></script>
</body>
```
结果页面进入，控制台出现了下图所示的结果：

控制台输出结果截图

可以看到，"DOMContentLoaded"事件绑定时候文档状态是'loading'，执行的时候文档状态是可交互的'interactive'。

配合其他测试（这里不展示），我们可以得出一个网页文档几个加载状态变化和事件触发顺序是这样子的：

```
document.readyState = 'loading'
↓
document.readyState变成'interactive'
↓
'DOMContentLoaded'事件执行
↓
document.readyState变成'complete'
↓
'load'事件执行
```
以及可以推测出一个结论：

DOMContentLoaded事件必须在文档状态为loading时候绑定才有效。

正是由于上面推论，才使得document.readyState有了应用场景。

### 需要用到document.readyState的场景
由于DOMContentLoaded事件绑定后可能并不会执行，于是出现了需要用到document.readyState的场景。

什么时候DOMContentLoaded事件不会执行呢？

那就是相关脚本是在页面DOM加载完毕后执行的场景下。

眼见为实，我们看例子：

假设有一个名为 insert.js 的文件，里面的JS代码如下：
```
console.log('zxx被加载了~' + document.readyState);
window.addEventListener("DOMContentLoaded", function () {
    console.log('CSS选择器这本书很赞哦！');
});
```
然后还有一个名为load-test.html的页面，里面代码这样：
```
<body>
  <script>
    var eleScript = document.createElement('script');
    eleScript.src = './insert.js';
    document.head.appendChild(eleScript);
  </script>
</body>
```
结果页面进入，控制台只有'zxx被加载了~'的文案，并没有DOMContentLoaded事件中的console.log输出，如下图所示：

因为DOMContentLoaded事件绑定的时候，页面的准备状态已经是'interactive'而不是'loading'了。

如果insert.js是一个公用组件，尤其以后会开源的那种，那势必要考虑到各种加载场景，页面的头部，页面底部，或者异步动态加载，此时，单纯靠DOMContentLoaded事件只能覆盖前两种情况，异步动态加载无能为力。

此时，一直认为没什么锤子用的document.readyState倒是排上了用场，假设组件的初始方法名为init，则好的实现方法是这样的：
```
if (document.readyState != 'loading') {
    init();
} else {
    window.addEventListener("DOMContentLoaded", function () {
        init();
    });
}
```
这是当下实际开发中，唯一需要使用document.readyState的场景，在开源或者大规模使用的框架或组件中精准初始化使用。

>摘自 https://www.zhangxinxu.com/wordpress/2019/10/document-readystate/
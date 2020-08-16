---
layout: css
title: css知识点大全
date: 2020-08-16 20:16:46
tags:[css]
---

1. Style标签写在body后和body前有什么区别?

- 一般情况下,页面加载时自上而下的。将stye标签至于body之前,为的是先加载样式。
- 若是写在body标签之后,由于浏览器以逐行方式对html文档进行解析,当解析到写在写在文档尾部的样式表时,会导致浏览器停止之前的渲染,等待加载且解析样式表完成之后会重新渲染,在 windows的E下可能会出现FOUC现象(页面闪烁)。

2. 什么是FOUC(Flash of Unstyled Content)?如何来避免fouC

- 当使用@import导入CSS时,会导致某些页面在出现奇怪的现象:没有样式的页面内容显示瞬间闪烁,这种现象被称为“文档样式暂时失效”,简称FOUC.
- 产生原因:当样式表晚于结构性html加载时,加载到此样式表时,页面将会停止之前的渲染。等待此样式表被下载和解析后,再重新渲染页面,期间导致短暂的花屏现象。
- 解决办法:只要在之间加入一个或者元素即可。

<!-- more -->

1. css样式
    - 可继承样式    font-size, font-fastClick, color, ul, li, dd, dl
    - 不可继承样式  width, height, padding, border, margin

2. 伪元素和伪类
   - 伪元素
     - **::selection** 选择被用户选择的元素
     - **::first-line** 选择元素的第一行
     - **::first-letter** 选择元素中的第一个字符
     - **::after** 在元素后添加内容
     - **::before** 在元素之前添加内容
   - 伪类
     - **:root**  html 元素
     - **:empty**  选择没有子元素的元素
     - **target** 选择当前活动的目标元素
     - **:enabled** 选择可用的表单元素
     - **:disabled** 选择禁用的表单元素
     - **:checked** 选择被选中的表单元素
     - **:first-child** 选取当前选择器下第一个元素。
     - **:last-child** 和 **:first-child** 相反，选取当前选择器下最后一个元素。
     - **:only-child** 选取唯一子元素。如果一个元素的父元素只有它一个子元素，这个伪类就会生效。如果一个元素还有兄弟元素，这个伪类就不会对它生效。
     - **:only-of-type** 选取唯一的某个类型的元素。如果一个元素的父元素里只有它一个当前类型的元素，这个伪类就会生效。这个伪类允许父元素里有其他元素，只要不和自己一样就可以。
     - **:link**
     - **:hover**
     - **:active**
   - 伪元素和伪类的区别
        1. 它们是否创造了新的元素(抽象)。伪元素创建了，伪类没有
        2. 伪元素只能出现一次
        3. 伪类则是像类一样发挥着类的作用，没有数量上的限制，只要不是相互排斥的伪类，也可以同时使用在相同的元素上面
        4. 伪类用一个冒号表示 :first-child，伪元素则使用两个冒号表示 ::first-line(为了向下兼容，现在的浏览器中伪元素选择器用单冒号和双冒号都可以)
3. 关于盒模型
    - IE 盒模型(怪异盒模型)
        - width = border + padding + content
        - 一个盒子的占据空间 width + margin
    - W3C盒模型
      - width = content
      - 一个盒子的占据空间 width + padding + boarder + margin
    - 转换盒模型
        ```
        box-sizing: content-box; // W3C盒模型标准
        box-sizing: border-box; // IE盒模型标准
        ```
4. 盒子的一些相关的尺寸
   1. client
      - clientWidth = width + padding
      - clientLeft = border-left-width
      - clientHeight = height + padding
      - clientTop = border-top-width
   2. offset
      - offsetWidth = width + padding + border
      - offsetLeft = 当前元素 **左边框** **外边缘** 到 最近的已定位父级（offsetParent） **左边框** **内边缘**的距离。如果父级都没有定位，则分别是到body 顶部 和左边的距离
      - offsetTop = 当前元素 **上边框** **外边缘** 到 最近的已定位父级（offsetParent） **上边框** **内边缘**的 距离。如果父 级都没有定位，则分别是到body 顶部 和左边的距离
    1. scroll
        - scrollWidth 可视区域和隐藏区域的 width
        - scrollHeight 可视区域和隐藏区域的 height
        - scrollTop 内容层 top 端到可视区域top 端的距离
        - scrollTop 内容层 left 端到可视区域 left 端的距离
    >常见应用，判断滚动到底部 el.scrollHeight - (el.offsetHeight + el.scrollTop) < 10

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
5. BFC
    block format context 特点是内部子元素绝不会影响外部的元素
    1. 根元素(html)
    2. 绝对定位元素：position (absolute、fixed)
    3. 浮动元素: float 除 none 以外的值
    4. display 为 inline-block、table-cell、table-caption、flex、inline-flex
    5. overflow 除了 visible 以外的值 (hidden、auto、scroll)

6. BFC 有哪些用途
   1. 同一个 bfc 下外边距会发生折叠
   2. 可以包含浮动的元素
   3. 可以阻止元素被浮动元素覆盖
   
7. 元素高度，宽度获取， style, currentStyle, getComputedStyle getBoundingClientRect
    - dom.style.width 只能获取内联样式
    - dom.currentStyle.width Element.currentStyle 是一个与 window.getComputedStyle方法功能相同的属性。这个属性实现在旧版本的IE浏览器中。
    - window.getComputedStyle  方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值。因此输出的值是准确的
    - window.getBoundingClientRect 对象包含了一组用于描述边框的只读属性-——- left、top、right 和 bottom，单位为px。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
  
8. 全屏滚动的原理
    类似于轮播图，整体元素一直排列下去，假设有5个需要展示的全屏页面，那么高度将回是500%，但我们只能展示100%，剩下的内容可以通过 transform 进行 Y 轴定位， 也可以通过 margin-top 实现

    **涉及css 属性**
    overflow:hiidden | transition: all 1s ease;

9. z-index层叠上下文
    - z-index 可以解决元素之前的覆盖顺序问题，设置它的层叠顺序
    - 如果元素是没有定位的，对其设置的 z-index 会是无效的

    ## 元素层叠时，覆盖关系准则(*)
    ### 同父同级元素
      - 当具有明显的层叠水平标识时，如识别的 z-index 值 
        - z-index大的覆盖小的，数值越大，越靠近视觉点。
        - z-index相同时，在DOM流中处于后面会覆盖前面
     - 都没有设置 z-index 时， 使用默认值，一个定位一个没有定位，那么定位覆盖未定位元素
     - 都没有发生定位且发生位置重合现象时，在 dom 流中处于后面的会覆盖前面
    ### 父子层级元素
      - 不同父元素，只要父元素越大，那么整体就越靠近视觉点，而不管其子元素大小情况。
      - 如果父元素 z-index 有效，那么子元素无论是否设置 z-index 都和父元素一致，会在父元素上方；
      - 如果父元素 z-index 失效（未定位或者使用默认值），那么定位子元素的 z-index 设置生效。

## 层叠上下文的创建

### 根层叠上下文

指的是页面根元素，也就是滚动条的默认的始作俑者元素。这就是为什么，绝对定位元素在left/top等值定位的时候，如果没有其他定位元素限制，会相对浏览器窗口定位的原因。👉

### 定位元素与传统层叠上下文

对于包含有position:relative/position:absolute/position:fixed的定位元素，当其z-index值不是auto的时候，会创建层叠上下文。👉

### CSS3与新时代的层叠上下文

CSS3的出现除了带来了新属性，同时还对过去的很多规则发出了挑战。例如，👉CSS3 transform对overflow隐藏对position:fixed定位的影响等。而这里，层叠上下文这一块的影响要更加广泛与显著。
如下：

1. z-index值不为auto的flex项(父元素display:flex|inline-flex).
2. 元素的opacity值不是1.
3. 元素的transform值不是none.
4. 元素mix-blend-mode值不是normal.
5. 元素的filter值不是none.
6. 元素的isolation值是isolate.
7. will-change指定的属性值为上面任意一个。
8. 元素的-webkit-overflow-scrolling设为touch

![image-20200817132141238](css知识点大全/image-20200817132141238.png)

10. CSS优化及性能提升

- 将css文件放在页面最上面，多个css可合并，并尽量减少http请求

- 避免过渡约束，避免使用后代选择符，链式选择符，多种类型选择符

- 避免不必要的命名空间，避免不必要的重复样式，移除空的css规则

- 使用具有语义的名字，使用紧凑的语法

- 避免使用 !important

- 尽可能地精简规则，尽可能合并不同类的重复规则，修复解析错误

- 正确使用display属性
  - inline后不应该使用width、height、margin、padding以及float
  - inline-block后不应该使用float；block后不应该使用vertical-align

- 不滥用浮动，遵守盒模型规则

- 不滥用web字体，不声明过多font-size，不重复定义h1-h6，不给h1-h6定义过多样式

- 值为0时不需要任何单位

- 标准化各种浏览器前缀

## 问几个问题👉

### Q1:  当position跟display、overflow、float这些特性相互叠加后会出现什么情况？
display：规定元素应该生成的框的类型（子元素的排序方式）
position：规定元素的定位类型
float：定义元素在哪个方向浮动
其中，position:absolute / fixed 优先级最高，当position设置为absolute或者fixed时，float失效，display需要调整，float / absolute定位的元素，只能是块元素或表单（block / table）👉
### Q2：display:none 与 visibility:hidden 的区别是什么？
display:none  隐藏对应的元素，在文档布局中不再分配空间（导致重排）
visibility:hidden  隐藏对应的元素，在档布局中保留原来的空间（导致重绘）
前者会使元素及其后代全部隐藏；后者具有继承性，子代会保持 hidden 的状态，但也可以单独设置为 visibility: visible 进行显示。👉
### Q3：border:none;与border:0;有什么区别？
性能差异：

{border：0;}: 把border设置为0像素，虽然在页面上看不到，但是按border默认值理解，浏览器依然对border-width/border-color进行了渲染，即已经占用内存值；
{border：none；}被理解为border-style:none。boder:0;比border:none多渲染了一个border-width:0,也就是为什么border:none的性能要比border:0高；
兼容性差异：

{border:none;}当border为“none”时似乎对IE6/7无效边框依然存在当border为“0”时，感觉比“none”更有效，所有浏览器都一致把边框隐藏。👉
### Q4：px | em| REM 有什么区别?
#### PX
px像素（Pixel）。相对长度单位。像素px是相对于显示器屏幕分辨率而言的。
#### EM
em的值并不是固定的， em会继承父级元素的字体大小。（浏览器body中1em=16px）

body选择器中声明Font-size=62.5%；
将你的原来的px数值除以10，然后换上em作为单位；
重新计算那些被放大的字体的em数值。避免字体大小的重复声明。
REM（css3新增）
使用rem相对的只是HTML根元素。集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。
EX（不推荐）

#### ex
是一个相对长度单位，1ex 被定义为一种给定字体的小写字母 “x” 的高度。因此，这个值会随字体的不同而变化。
然而，很多浏览器都没有内置 ex 高度值，只是简单的取 em 的值，再取其一半作为 ex 的值。所以，一般不推荐使用 ex 这个长度单位。选择使用什么字体单位主要由你的项目来决定，如果你的用户群都使用最新版的浏览器，那推荐使用rem，如果要考虑兼容性，那就使用px,或者两者同时使用。👉

### Q5：视口单位 vw、vh、vmin、vmax
- vw： 视口宽度的1/100。
- vh：  视口高度的1/100。
- vmin：  vw 和 vh 中的最小值。
- vmax： vw 和 vh 中的最大值。

### Q6：RGBA() 与 opacity 在透明效果上有什么区别？
- opacity 作用于元素，以及元素内的所有内容的透明度
- rgba() 只作用于元素的颜色或者背景色（设置rgba透明的元素的子元素不会继承透明效果）👉

### Q7：png、jpg、 jpeg、 bmp、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？
- png便携式网络图片（Portable Network Graphics）,是一种无损数据压缩位图文件格式。优点是：压缩比高，色彩好。大多数地方都可以用。
- jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。
- gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果。
- bmp的优点：高质量图片；缺点：体积太大；适用场景：windows桌面壁纸；
- webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。👉

### Q8：隐藏或者透明元素的方法？
opacity: 0; //1透明度为 0，整体都看不见了；
visibility: hidden; //2这个和上边类似；
display: none; //3消失，不占用位置；
background-color: rgba(0,0,0,0.2); //4只是背景色透明


### Q9：css sprites是什么？如何使用？
CSS sprites（雪碧）的基本原理是把你的网站上用到的一些图片整合到一张单独的图片中，从而减少你的网站的HTTP请求数量。
该图片使用CSS background和background-position属性渲染，这也就意味着你的标签变得更加复杂了，图片是在CSS中定义，而非标签。👉

### Q10：什么是渐进增强和优雅降级？
渐进增强

是指从最基本的可用性出发，在保证站点页面在低级浏览器中 的可用性和可访问性的基础上，逐步增加功能及提高用户体验。
本质上讲，我们日常的一些开发习惯，例如首先使用标记语言编写页面，然后通过样式表来控制页面 样式等，都属于渐进增强的概念
其他更为明显的行为包括使用HTML5、CSS3等新技术，针对高级浏览器为页面提高用户体验的丰富程度。
优雅降级

是指首先使用最新的技术面向高级浏览器构建最强的功能及用户体验，然后针对低级浏览器的限制，逐步衰减那些无法被支持的功能及体验。
在我们日常的开 发中，一个典型的平稳退化的例子就是首先针对Chrome编写页面代码，然后修复IE中的异常或针对IE去除那些无法被实现的功能特色
所以

这两个概念方法其实早已并存在我们的日常开发工作中了，只是“渐进增强”与“优雅降级”这样的措辞是近些年才开始被普及。
在我们眼下的HTML5与 CSS3实战中，这两个概念就尤其重要了，怎样保证使用不断变化的新技术来构建在主流浏览器下都具有基本可用性的站点，并针对高级浏览器进行体验提升，是我们在开发过程中需要明确的思路。


>摘自https://mp.weixin.qq.com/s/NRFtO9d7JzzrCy6e3N8rxw
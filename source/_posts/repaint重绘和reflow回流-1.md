---
title: repaint重绘和reflow回流
author:
  - 徐勇超
tags: [css, 渲染过程，]
date: 2019-09-07 12:16:40
categories:
---
前言： 为什么不能用CSS通配符 *，CSS选择器层叠为什么不能超过三层，CSS为什么尽量使用类选择器，书写HTML为什么少使用table，为什么结构要尽量简单-DOM树要小….

### 浏览器解析大概的工作流程大致可归纳为四个步骤：
  1. 解析HTML以构建DOM树：渲染引擎开始解析HTML文档，转换树中的html标签或js生成的标签到DOM节点，它被称为 – 内容树。
  2. 构建渲染树：解析CSS（包括外部CSS文件和样式元素以及js生成的样式）成样式结构体，根据CSS选择器计算出节点的样式，创建另一个树 —- 渲染树（render tree）。 注：在解析的过程中会去掉浏览器不能识别的样式，比如IE会去掉-moz开头的样式，而firefox会去掉_开头的样式。
  3. 布局渲染树: 从根节点递归调用，计算每一个元素的大小、位置等，给每个节点所应该出现在屏幕上的精确坐标。
  4. 绘制渲染树: 遍历渲染树，每个节点将使用UI后端层来绘制。
比较：
    render tree能识别样式，render tree中每个node都有自己的style，而且render tree不包含隐藏的节点(比如display:none的节点，还有head节点)，因为这些节点不会用于呈现，而且不会影响呈现的，所以就不会包含到 render tree中。注意 visibility:hidden隐藏的元素还是会包含到render tree中的，因为visibility:hidden 会影响布局(layout)，会占有空间。
定义 
    我们可以看到 Reflow 和Repaint 分别出现在了第三和第四步。因此我们给出下面的定义： 对于DOM结构中的各个元素都有自己的盒子（模型），这些都需要浏览器根据各种样式（浏览器的、开发人员定义的等）来计算并根据计算结果将元素放到它该出现的**位置**，这个过程称之为**reflow**； 当各种盒子的**位置、大小以及其他属性**，例如颜色、字体大小等都确定下来后，浏览器于是便把这些元素都按照各自的特性绘制了一遍，于是页面的内容出现了，这个过程称之为**repaint**。
回流与重绘总结：
        当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(reflow)。
        **每个页面至少需要一次回流**，就是在页面第一次加载的时候。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为重绘。 当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为repaint重绘。 **注意：回流必将引起重绘，而重绘不一定会引起回流。 引起Repain和Reflow的一些操作 Reflow 的成本比 Repaint 的成本高得多的多**。DOM Tree 里的每个结点都会有 reflow 方法，一个结点的 reflow 很有可能导致子结点，甚至父点以及同级结点的 reflow。 当你增加、删除、修改 DOM 结点时，会导致 Reflow 或 Repaint。 当你移动 DOM 的位置，或是搞个动画的时候。 当你修改 /删除CSS 样式的时候。 当你 Resize 窗口的时候（移动端没有这个问题），或是滚动的时候。 当你修改网页的默认字体时。 当你设置 style 属性的值 （Setting a property of the style attribute）。 
>注：display:none 会触发 reflow，而 visibility:hidden 只会触发 repaint，因为没有发现位置变化。
### 如何减少Repain和Reflow? Reflow是不可避免的，只能将Reflow对性能的影响减到最小,给出下面几条建议：
  1. 不要一条一条地修改 DOM 的样式。与其这样，还不如预先定义好 css 的 class，然后修改 DOM 的 className，即将多次改变样式属性的操作合并成一次操作：
  // 不好的写法 var left = 10, top = 10; el.style.left = left + "px"; el.style.top = top + "px"; el.style.background = '#eee'; // 比较好的写法 el.className += " theclassname";
  2. 让要操作的元素进行”离线处理”，处理完后一起更新
    使用DocumentFragment进行缓存操作,引发一次回流和重绘；
    使用display:none技术，只引发两次回流和重绘;
    原理：由于isplay属性为none的元素不在渲染树中，对隐藏的元素操 作不会引发其他元素的重排。如果要对一个元素进行复杂的操作时，可以先隐藏它，操作完成后再显示。这样只在隐藏和显示时触发2次重排。
    使用cloneNode(true or false) 和 replaceChild 技术，引发一次回流和重绘；
  3. 不要把 DOM 节点的属性值放在一个循环里当成循环里的变量。不然这会导致大量地读写这个结点的属性。
  4. 尽可能的修改层级比较低的 DOM节点。当然，改变层级比较底的 DOM节点有可能会造成大面积的 reflow，但是也可能影响范围很小。 因为改变 DOM 树中的一级会导致所有层级的改变，上至根部，下至被改变节点的子节点。这导致大量时间耗费在执行 reflow 上面
  5. 将需要多次重排的元素，position属性设为absolute或fixed，这样此元素就脱离了文档流，它的变化不会影响到其他元素为动画的 HTML 元素，例如动画，那么修改他们的 CSS 是会大大减小 reflow 。因为,   它们不影响其他元素的布局，所它他们只会导致重新绘制，而不是一个完整回流。这样消耗会更低。
  6. 不要用tables布局的一个原因就是tables中某个元素一旦触发reflow就会导致table里所有的其它元素reflow。在适合用table的场合，可以设置table-layout为auto或fixed，这样可以让table一行一行的   渲染，这种做法也是为了限制reflow的影响范围。
  7. 避免使用CSS的JavaScript表达式，如果css里有expression，每次都会重新计算一遍。
>来源： https://blog.csdn.net/ClaireKe/article/details/51375622

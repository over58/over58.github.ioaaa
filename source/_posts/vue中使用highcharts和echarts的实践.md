---
layout: post
title: vue中使用highcharts和echarts的实践
author: 徐勇超
tag: [vue, highcharts, echarts]
categories: [graph]
---

  我从事云平台前端的开发，由于项目的需要，写了一个云监控Monitor项目。起初，我选择了 Echarts， 原因很简单，中文文档，定制化能力也比较好。事实上，使用了一年多来，用的也是蛮顺手的。但是，这是一个监控项目,里面存在大量的图，每个图有着巨量的数据，而且每条line的名字也超长。带来的问题就是，页面及其卡顿，即使是我限制了每个图中的数据量，仍然无法降低，页面无操作的情况下，CPU仍然占据20%以上（八个图，每个图平均10条line）。网上找了一通，都指向z_render()函数，echarts会不停的执行这个函数。实在是不堪忍受这样的卡顿，在进行了充分调研的情况下,果断换了highcharts。

  经过实际项目测试：同等数量的情况下，highcharts和echarts 所占的内存相近，但CPU占比很低。举一个栗子，一个页面上有八个图，每个图平均大概10条线，当页面渲染完成，无任何鼠标点击的时候，echarts的CPU占比稳定在20%左右，highcharts始终在1%以下。

![highcharts](/images/highcharts-q.png)
![echarts](/images/echarts-q.png)


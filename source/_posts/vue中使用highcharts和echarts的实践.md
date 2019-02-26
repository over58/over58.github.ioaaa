---
layout: post
title: vue中使用highcharts和echarts的实践
author: 徐勇超
tag: [vue, highcharts, echarts]
---


  经过实际项目测试：同等数量的情况下，highcharts和echarts 所占的内存相近，但CPU占比很低。就一个栗子，一个页面上有八个图，每个图平均大概10条线，当页面平稳一下，无任何鼠标点击的时候，echarts的CPU占比稳定在20%左右，highcharts始终在1%以下


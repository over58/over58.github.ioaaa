---
title: vue中引入higcharts拓展模块
date: 2019-04-12 19:01:37
tags: [vue, graph]
---

#### 场景
vue中使用highcharts绘制图表的时候，当数据位空的时候，图表显示空白，没有问题提示，不太友好。

#### 解决方法
highcharts中存在很多拓展模块，当你引入import Highcharts from 'highcharts' 的时候，并没有自动引入，需手动引用.那里面又一个模块就是专门解决上述问题的，no-data-to-display模块。
```
import Highcharts from 'highcharts'
import HighchartsNoData from 'highcharts/modules/no-data-to-display'
HighchartsNoData(Highcharts)

Highcharts.setOptions({
  global: {
    useUTC: true
  },
  lang: {
    loading: '加载中...', 
    shortMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    noData: '暂无数据' //指定无数据时的文字提示
  }
})
```
####  结果如下
![highcharts-no-data](/images/highcharts-no-data.png)
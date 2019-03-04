---
title: 对于echarts图表随着浏览器窗口resize的优化
date: 2019-03-04 19:07:32
tags: [vue]
---

说明： 有时候项目中会显示一些图表，而且width可能并不是固定的（可能100%），那么当浏览器窗口变化的时候，图表的大小应该跟随着变大或变小，称之为resize

<!-- more -->

```
/**
 * 用来处理每一个有图表的页面添加resize , 离开时移除resize函数
 */
import echarts from 'echarts'
import _ from 'lodash'
export default {
  data () {
    return {
      doms: []
    }
  },
  computed: {
    chartResize () {
      return _.throttle(() => {
        return this.doms.forEach(dom => {
          dom && dom.resize()
        })
      }, 400)
    }
  },
  methods: {
    initChart () {
      this.doms.forEach(dom => {
        dom && echarts.init(dom)
      })
    }
  },
  mounted () {
    console.log('mixins mounted')
    this.doms = [this.$refs['charts']]
    this.initChart()
    window.addEventListener('resize', this.chartResize)
  },
  destroyed () {
    console.log('mixins destroyed')
    window.removeEventListener('resize', this.chartResize)
  }
}

```
ps: 使用的时候在需要图表的页面引入这个mixins

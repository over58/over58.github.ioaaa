---
title: vue中使用cytoscape绘制拓扑图方案
date: 2019-03-08 15:36:50
tags: [vue, graph]
---

有一个需求需要绘制拓扑图，然后选图表库选择了cytoscape,看了官方文档http://js.cytoscape.org，感觉和network.js很像，包括两种element,一种是node（描述其相关信息），另一种是 edge(描述node之间的关系， 通过指明source, target确定指向)，其余的都是一些样式配置和事件的监听，可以说是非常的清晰明了了。此外文档的Extensions部分提供了各种的UI插件和API插件，拓展性也不错。
### 数据结构
```
nodes: [
  {
    id: 'a',//required
    name: 'demo',//optional
    ...
  },
  {
    id: 'b',//required
    name: 'demo',//optional
    ...
  }
]

edges: [
  //描述了 a-->b
  {
    id: 'aadsfasdf', //optional
    source: 'a', //required, source-node-id
    target: 'b,  //required target-node-id
  },
  //描述了 a-->a,会出现一个指向自己的圆，不过想要实现这一点需要cytoscape-edgehandles插件
  {
    id: 'aadsfasdf', //optional
    source: 'a', //required, source-node-id
    target: 'a,  //required target-node-id
  }
]

```
### 实际栗子
```
<template>
  <div id="cy"></div>
</template>

<script>
import cytoscape from 'cytoscape'
<!--为edge添加事件和二维的布局 -->
import edgehandles from 'cytoscape-edgehandles'

<!-- 提供类似于tooltip的提示框 -->
import popper from 'cytoscape-popper'
import tippy from 'tippy.js'

<!-- 引入data -->
import data from './data.js'

<!-- 使用插件 -->
cytoscape.use(edgehandles)
cytoscape.use(popper)

<!-- 可以使用自己选的配色 -->
let colors = ['#FFFFCC', '#CCFFFF', '#FFCCCC', '#FFFF99', '#CCCCFF', '#FF9966', '#FF6666', '#FFCC99', '#CCFF99', '#CCCCCC', '#CCFFCC', '#99CC99', '#99CCCC']
let colors1 = ['#FF6666', '#006699', '#FF9966', '#0066CC', '#339933', '#FFCC33', '#FF9900', '#FFFFCC', '#CC6600', '#CCCC44', '#99CC33', '#0099CC', '#99CCCC', '#FF0033', '#333399', '#CCCC00', '#33CC99', '#FFFF00', '#336699']
let colors2 = ['#CCFF99', '#99CCFF', '#99CCCC', '#CCFFCC', '#66CCCC', '#CCCCFF', '#FFFFCC', '#CCFFFF', '#66CCFF', '#6699CC']


let vm = null
export default {
  props: {
  },
  components: {
  },
  data () {
    return {
      tippyInstance: null
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    draw () {
      let nodes = data.nodes
      let edges = data.edges
      nodes.map((x, i) => {
        x.data.color = colors[i % 13]
        // x.data.color = colors1[i % 19]
        x.data.color = colors2[i % 10]
        return x
      })
      let cy = cytoscape({
        container: document.getElementById('cy'),
        layout: {
          name: 'grid',
          concentric: function (n) { return n.id() === 'j' ? 200 : 0 },
          levelWidth: function (nodes) { return 100 },
          minNodeSpacing: 100
        },

        style: [
          {
            selector: 'node',
            style: {
              'content': 'data(name)',
              'width': 'mapData(size, 0, 1.0, 40, 60)',
              'height': 'mapData(size, 0, 1.0, 40, 60)',
              'background-color': 'data(color)'
            }
          },

          {
            selector: 'edge',
            style: {
              'curve-style': 'unbundled-bezier',
              'target-arrow-shape': 'triangle',
              'target-arrow-color': 'data(colour)',
              'line-color': 'data(colour)',
              'width': 'mapData(width, 0, 1.0, 1, 3)',
              // 'label': 'data(info)'
              'control-point-distances': [40, -40],
              'control-point-weights': [0.25, 0.75]
            }
          },
          // some style for the extension

          {
            selector: '.eh-handle',
            style: {
              'background-color': 'red',
              'width': 12,
              'height': 12,
              'shape': 'ellipse',
              'overlay-opacity': 0,
              'border-width': 12, // makes the handle easier to hit
              'border-opacity': 0
            }
          },

          {
            selector: '.eh-hover',
            style: {
              'background-color': 'red'
            }
          },

          {
            selector: '.eh-source',
            style: {
              'border-width': 2,
              'border-color': 'red'
            }
          },

          {
            selector: '.eh-target',
            style: {
              'border-width': 2,
              'border-color': 'red'
            }
          },

          {
            selector: '.eh-preview, .eh-ghost-edge',
            style: {
              'background-color': 'red',
              'line-color': 'red',
              'target-arrow-color': 'red',
              'source-arrow-color': 'red'
            }
          },

          {
            selector: '.eh-ghost-edge.eh-preview-active',
            style: {
              'opacity': 0
            }
          }
        ],

        elements: {
          nodes: nodes,
          edges: edges
        }
      })

      // edge添加事件
      cy.on('tap', 'edge', function (evt) {
        var node = evt.target
        if (vm.tippyInstance) {
          vm.tippyInstance.hide()
          vm.tippyInstance.destroy()
        }
        vm.makeTippy(node)
        vm.tippyInstance.show()
      })
      
      // node 添加事件
      cy.on('tap', 'node', function (evt) {
        var node = evt.target
        console.log('current node:', node)
      })
    },
    makeTippy (node) {
      <!-- 点击edge出现一个弹框，显示一些额外的信息 -->
      this.tippyInstance = tippy(node.popperRef(), {
        content: function () {
          var div = document.createElement('div')
          div.innerHTML = `<p style="text-align:left;padding-top:8px;">${node._private.data.info}</p>`
          return div
        },
        trigger: 'manual',
        arrow: true,
        placement: 'bottom',
        hideOnClick: false,
        multiple: true,
        sticky: true
      })
    }
  },
  created () {
    vm = this
  },
  mounted () {
    this.$nextTick(() => {
      this.draw()
    })
  }
}

</script>

<style lang="less">
#cy{
  width: 100%;
  height: 100%;
}
</style>

```
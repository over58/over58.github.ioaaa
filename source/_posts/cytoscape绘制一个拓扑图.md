---
title: cytoscape绘制一个拓扑图
author:
  - 徐勇超
date: 2019-07-18 14:52:39
tags: [cytoscape, graph]
categories:
---

### 只记录核心代码
```
    import cytoscape from 'cytoscape'
    import edgehandles from 'cytoscape-edgehandles'
    cytoscape.use(edgehandles)


      let makeSvg = function (node) {
        let data = node.data()
        return { image: data.image || 'none', width: 50, height: 50 }
      }


      const cy = cytoscape({
        container: this.$refs.topology,
        layout: {
          name: 'breadthfirst',
          directed: true
        },
        userZoomingEnabled: false,

        style: [
          {
            selector: 'node',
            style: {
              shape: 'ellipse', // rectangle vee pentagon
              content: function (ele) {
                const data = ele.data()
                if (data.title) {
                  return `${data.title}-${data.name}`
                } else {
                  return `${data.id}`
                }
              },
              'text-valign': 'center',
              'text-halign': 'right',
              'color': 'data(color)',
              'background-color': 'data(color)',
              'background-image': function (node) { return makeSvg(node).image },
              'background-width': '60%',
              'background-height': '60%',
              'width': function (node) { return makeSvg(node).width },
              'height': function (node) { return makeSvg(node).height },
              'text-rotation': function (node) {  //根据条件旋转文字，避免节点太多文字相互覆盖
                let data = node.data()
                if (data.level === 3 && level3Len > 10) {
                  return 45
                } else {
                  return 0
                }
              }
            }
          },
          {
            'selector': 'node:selected',
            'style': {
              'min-zoomed-font-size': 0,
              'z-index': 9999,
              'border-color': 'black',
              'border-width': 2,
              'color': 'black'
            }
          },

          {
            selector: 'edge',
            style: {
              'curve-style': 'straight',
              'target-arrow-shape': 'triangle',
              'line-color': 'gray',
              'width': 0.8,
              'line-style': 'data(lineStyle)'
            }
          }
        ],

        elements: {
          nodes: nodes,
          edges: edges
        }
      })

      cy.on('tap', 'node', function (evt) {
        let data = evt.target.data()
        if (data.click) {
          vm.getIpStat(data.ip)
        }
      })
```
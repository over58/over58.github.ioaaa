---
title: cytoscape的简单使用
date: 2019-03-07 14:29:42
tags: [graph, cytoscape]
categories: [graph]
---

### cy实例对象常用操作
  #### 添加
    cy.add(eleObj/eleObjs/eles)
  #### remove
    cy.remove(elems/selector)
  #### 获取
    cy.colleciton 返回一个new empty collection
    cy.getElementById() or  cy.$id()   return one element
    cy.$(selector)、cy.elements(selector)  return  elements
    cy.nodes(selector)
    cy.edges(selector)
    cy.filter(selector) return elements
    cy.filter(function(ele, i, eles))
      - ele The current element under consideration for filtering.
      - i The counter used for iteration over the elements in the graph.
      - eles The collection of elements being filtered
  >ps: cy.nodes('[weight > 50]');
  #### 批量修改(能够有效的减少渲染成本)
    cy.batch()
    cy.satrtBatch()
    cy.endBatch()
  >demo如下
  ```
    cy.startBatch();

    <!-- 多次的样式修改操作 -->
    cy.$('#j')
      .data('weight', '70')
      .addClass('funny')
      .removeClass('serious')

    cy.endBatch();
    能够减少中间的redraw的成本，和jquery中将一系列修改样式的操作合并到一个类中，对这个类进行操作一个道理。
  ```
  #### create
    cy.mount()
    cy.unmount()
  #### 销毁
    cy.destroy() 有利于gc
  #### 临时数据操作
    cy.scratch([namespace], [value])
    cy.removeScratch()

### 全局函数： cytoscape在调试过程中在console中打印一些错
- cytoscape.warnings(false) 禁止报错
- cytoscape.warnings(true)  开启报错
- cytoscape.warnings()      得到当前状态

### collection的一些操作




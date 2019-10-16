---
title: vue组件生命周期
author:
  - 徐勇超
tags:
  - vue
date: 2019-10-16 10:36:39
categories:
---

### 单个组件的生命周期

{% asset_img lifecycle.png %}

分为三个阶段：

* 初始化阶段：
    1. 只有默认的事件，没有data,methods
    2. beforeCreate
    3. 监听对象和初始化事件坚挺
    4. created 此时已经可以访问data和methods
    5. 内存中编译好模版
    6. beforeMount 此时页面仍然是旧的，没有挂载到上面
    7. vm.$el 替换 el ，挂载页面
    8. mounted
    9. 挂载完成，页面此时是最新的
    
* 运行阶段：
    1.  监听数据变化
    2.  beforeUpdate
    3.  diff, 虚拟dom 重新绘制, patch
    4.  updated
* 销毁阶段：
    1. beforeDestroy 此时仍然可以正常访问data, methods
    2. 关闭watchers和子组件的事件监听
    3. destroyed

### Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：
#### 加载渲染过程
父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
#### 子组件更新过程
父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
#### 父组件更新过程
父 beforeUpdate -> 父 updated
#### 销毁过程
父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

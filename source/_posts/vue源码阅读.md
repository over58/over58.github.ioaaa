---
title: vue源码阅读
author:
  - 徐勇超
tags: []
categories:
  - vue
comments: true
date: 2020-04-06 14:37:54
updated: 2020-04-06 14:37:54
---



### new 的时候到底干了什么

> 入口文件时/core/index.js

```javascript
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue

```



#### 定义Vue


```javascript
//定义Vue

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}


initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

```

#### initMixin

```javascript
// 每次new vue()的时候都会调用这个方法
Vue.prototype._init = function(){
	//指定全局唯一的uid
    
    vm.uid = uid++
    
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    //抛出beforeCreate Hooks， 也就是说在beforeCreate之前做的操作有 ：
    // 1. 初始化生命周期，2 初始化事件， 3。 初始化render函数
    callHook(vm, 'beforeCreate')
    
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
}
```

####  stateMixin

```javascript
// 主要初始化了以下内容
Vue.prototype.$data
Vue.prototype.$props
Vue.prototype.$watch
Vue.prototype.$set
Vue.prototype.$delele
```

#### eventsMixin

```javascript
Vue.prototype.$on
Vue.prototype.$once
Vue.prototype.$off
Vue.prototype.$emit
```

#### lifecycleMixin

```javascript
 Vue.prototype._update
 Vue.prototype.$forceUpdate
 Vue.prototype.$destroy
```



#### renderMixin

```javascript
Vue.prototype.$nextTick 
Vue.prototype._render
```



### global-api/index.js

```javascript
Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  Vue.observable

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

// 继承keep-alive
  extend(Vue.options.components, builtInComponents)

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
```

#### global-api/use.js

````javascript
Vue.use
````

#### global-api/mixin.js

````javascript
Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
````

#### global-api/extend.js

```javascript
Vue.extend
```



#### global-api/assets.js

```javascript
export const ASSET_TYPES = [
  'component',
  'directive',
  'filter'
]

 ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    )
 })
```


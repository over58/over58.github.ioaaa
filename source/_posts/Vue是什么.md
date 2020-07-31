---
title: Vue是什么
author:
  - 徐勇超
tags: []
categories:
  - vue
comments: true
category: post
date: 2020-07-30 14:15:27
updated: 2020-07-30 14:15:27
---

## 代码
```
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

export default Vue
```

<!-- more -->

## 主要步骤
1.initMixin(Vue)
2.stateMixin(Vue)
3.eventsMixin(Vue)
4.lifecycleMixin(Vue)
5.renderMixin(Vue)

### initMixin(Vue)
添加了Vue.prototype._init()方法
### stateMixin(Vue)
添加了
- Vue.prototype.$data
- Vue.prototype.$props
- Vue.prototype.$set(响应式更改，并通知)
- Vue.prototype.$delete(响应式删除，并通知)
- Vue.prototype.$watch

并已经为$data和$props添加了set,get方法,执行如下
```
 Object.defineProperty(Vue.prototype, '$data', {
    get () {
      return this._data
    },
    set () {
        warn(
          'Avoid replacing instance root $data. ' +
          'Use nested data properties instead.',
          this
        )
     }
 })
 Object.defineProperty(Vue.prototype, '$props', {
    get () {
      return this._props
    },
    set () {
      warn(`$props is readonly.`, this)
    }
})
```

### eventsMixin(Vue)
添加了
- Vue.prototype.$on
- Vue.prototype.$once
- Vue.prototype.$off
- Vue.prototype.$emit

#### $on
使用了发布-订阅模式，类似于node中的events模块,所有的event存在于vm._events中，结构如下:
```
{
  event1: [fn1, fn2...]
  event2: []
}
```


### lifecycleMixin(Vue)
添加了
- Vue.prototype._update
- Vue.prototype.$forceUpdate
- Vue.prototype.$destroy
### renderMixin(Vue)
添加了
- Vue.prototype.$nextTick
- Vue.prototype._render

## new Vue()的时候干了什么
执行了**initMixin(Vue)**中添加的**Vue.prototype._init**方法
```js
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid， 全局唯一
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true


    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm

    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
```

如上所示，主要做了下面的这些事情
1. 添加一些属性 _uid, _isVue
2. merge options
3. 初始化lifecycle
4. 初始化events
5. 初始化render
6. 调用beforeCreate
7. 初始化injections
8. 初始化state
9. 初始化provide
10. 调用created
11. 如果$el存在，则调用$mount($el)方法

### 初始化lifecycle
```
vm.$parent = parent
vm.$root = parent ? parent.$root : vm

vm.$children = []
vm.$refs = {}

vm._watcher = null
vm._inactive = null
vm._directInactive = false
vm._isMounted = false
vm._isDestroyed = false
vm._isBeingDestroyed = false
```

### 初始化events
```
vm._events = Object.create(null)
vm._hasHookEvent = false

// init parent attached events
const listeners = vm.$options._parentListeners
if (listeners) {
  updateComponentListeners(vm, listeners)
}
```

### 初始化render
```
vm.$slots = resolveSlots(options._renderChildren, renderContext)
vm.$scopedSlots = emptyObject

// bind the createElement fn to this instance
// so that we get proper render context inside it.
// args order: tag, data, children, normalizationType, alwaysNormalize
// internal version is used by render functions compiled from templates
vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)

// normalization is always applied for the public version, used in
// user-written render functions.
vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

<!-- 响应式的定义了$attrs和$listeners -->
defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
```

### 调用beforeCreate
>这里才调用beforeCreate钩子
>此时有了events, $attrs,$listeners

### 初始化injections
>resolve injections before data/props
将**inject**全部执行响应式操作**defineReactive(vm, key, result[key])**

### 初始化state
```

export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```
1. 初始化props   (initProps)
2. 初始化methods (initMethods)
3. 初始化data    (initData)
4. 初始化计算属性 (initComputed)  **vm._computedWatchers**
5. 初始化watch   (initWatch)  **vm.$watch(expOrFn, handler, options)**

### 初始化provide
```
export function initProvide (vm: Component) {
  const provide = vm.$options.provide
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
}
```
将provide中的对象存储到vm._provided中
### 调用created
```
vm.$emit('hook:' + hook)
```
### 如果$el存在，则调用$mount($el)方法
1. callHook(vm, 'beforeMount')
2. vm._update()
3. 
```
 new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
 ```
4. callHook(vm, 'mounted')
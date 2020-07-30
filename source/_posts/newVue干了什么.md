---
title: newVue干了什么
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

并已经为\$data和\$props添加了set,get方法,执行如下
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
### renderMixin(Vue)

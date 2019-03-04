---
title: vue-directive
date: 2019-03-04 19:34:37
tags: [vue]
---

### vue-directive 的几个钩子函数
- bind  指令第一次被绑定到元素时调用，只调用一次
- inserted 被绑定元素插入到父节点时调用
- update 被绑定元素所在模版更新时调用，不论绑定值是否变化都调用
- componentUpdated 被绑定元素所在模版在完成一次更新周期时调用
- unbind 元素解绑时调用，只调用一次
  
<!-- more -->
### 每个钩子函数都有参数：
- el: 指令绑定的element,用来操作dom
- binging 一个对象，包含以下属性
  - name: 指令名，不包含v-前缀
  - value: 指令的绑定值，例如 v-my-directive=叮+ l”， value的值是，2
  - oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用.无论value 值是否改变都可用。
  - expression: 绑定值的字符串形式。例如v-my-directive="1+ 1”，expression的值是”1+I”.
  - arg： 指令的arguments, 例如 v-my-directive:foo, arg 的值是 foo
  - modifiers: 一个包含修饰符的对象 。 例如 v-my-directive.foo.bar，修饰符对象 modifiers的值是{ foo: true, bar: true }
- vnode
- oldVnode: 上一个虚拟节点仅在 update 和 componentUpdated 钩子中可用 。 

#### clickoutsize指令的实现
```
Vue.directive('clickoutside', {
  bind: function (el, binding) {
    function documentHandler (e) {
      if (binding.arg === 'esc' && e.keyCode === 27) {
        <!-- v-clickoutside的value 是一个函数，这里相当于执行绑定的函数 -->
        binding.value(e)
      }
      <!-- 如果点击的元素是在绑定了v-clickoutside指令元素的内容，则忽略 -->
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    <!-- 在元素添加一个元素用来存绑定的函数，是为了unbind的时候能够找到这个函数 -->
    el.__vueClickOutside__ = documentHandler
    
    <!-- 在全局添加一些事件 -->
    window.addEventListener('keydown', documentHandler)
    document.addEventListener('click', documentHandler)
    document.addEventListener('keydown', documentHandler)
  },
  unbind: function (el) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
})
```
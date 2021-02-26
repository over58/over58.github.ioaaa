---
title: iview组件探索
author:
  - 徐勇超
tags: []
categories:
  - js知识库
comments: true
date: 2020-05-25 19:30:37
updated: 2020-05-25 19:30:37
---

### directives

```js
Vue.directive('clickoutside', {
  bind (el, binding,  vnode) {
    function documentHandler(e){
      if(el.contains(e.target)) {
        return false
      }

      if(binding.value) {
        binding.value(e)
      }
    }
    
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind(el, binding){
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}) 
```

### utils

```js
export function camelcaseToHyphen (str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function scrollTop(el, from = 0, to, duration = 500, endCallback) {
	  let ratio = 50; // 随意设置的因子，根据具体情况设置的，无实际逻辑意义，无需纠结

      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            return window.setTimeout(callback, 1000 / 60);
          }
        );
      }
      const difference = Math.abs(from - to);
      const step = Math.ceil(difference / duration * ratio);

      function scroll(start, end, step) {
        if (start === end) {
          endCallback && endCallback();
          return;
        }

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
          d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
          window.scrollTo(d, d);
        } else {
          el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
      }
      scroll(from, to, step);
    }
```

### 查找组件的相关函数

```js
function findComponentDownward(context, componentName) {
  const childrens = context.children
  let children = null
  if(childrens.length) {
    for(const child of childrens) {
      const {name} = child.$options
      if(name === componentName) {
        children = child
        break
      }else{
        // 深度优先遍历
        children = findComponentDownward(child, componentName)
        if(children) break
      }
    }
  }
  return children
}

// ignoreComponnetNames指的是不再往下找了

function findComponentsDownward(context, componentName, ignoreComponnetNames = []){
  if(!Array.isArray(ignoreComponnetNames)) {
    ignoreComponnetNames = [ignoreComponnetNames]
  }

  return context.$children.reduce((components, child) => {
    if(child.$options.name === componentName) {
      components.push(child)
    }
    if(ignoreComponnetNames.indexOf(child.$options.name) < 0) {
      const foundChilds = findComponentDownward(child, componentName)
      return components.concat(foundChilds)
    }else{
      return components
    }
  }, [])
}

function findComponentUpward(context, componentName) {
  if(typeof componentName === 'string') {
    componentNames = [componentName]
  }else{
    componentNames = componentName
  }
  let parent = context.$parent
  let name = parent.$options.name

  while(parent && (!name || componentNames.indexOf(componentName)<0)){
    parent = parent.$parent
    if(parent) name = parent.$optins.name
  }

  return parent
}

// 递归向上查找
function findComponentsUpward(context, componentName, ignoreComponnetNames) {
  let parents = []
  const parent = context.$parent
  if(parent) {
    if(parent.$options.name === componentName) parents.push(parent)
    return parents.concat(findComponentsDownward(parent, componentName))
  }else{
    return []
  }
}


function findBrothersComponents (context, componentName, exceptMe = ture) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName
  })

  let index = res.findIndex(item => item._uid === context._uid)
  if(exceptMe) res.splice(index,1)
  return res
}
```



### dom 上添加监听和移除监听的简单封装

```js
const on = (function(){
  if(document.addEventListener) {
    return function(element, event, handler, useCapture = true) {
      element.addEventListener(event, handler, useCapture)
    }
  }else{
    return function(element, event, handler) {
      if(element && event && handler) {
        element.attchEvent('on'+ event, handler)
      }
    }
  }
})()

const off = (function(){
  if(document.removeEventListener) {
    return function(element, event, handler, useCapture = true) {
      element.removeEventListener(event, handler, useCapture)
    }
  }else{
    return function(element, event, handler) {
      if(element && event && handler) {
        element.detachEvent('on'+ event, handler)
      }
    }
  }
})()
```


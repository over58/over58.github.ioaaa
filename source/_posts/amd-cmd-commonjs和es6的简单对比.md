---
title: amd/cmd/commonjs和es6的简单对比
author:
  - 徐勇超
date: 2019-07-08 23:11:12
tags: [js]
categories:
---

### AMD
AMD是RequireJS在推广过程中的对模块定义的规范化产出。异步加载模块，依赖前置
```
define("package/lib", function(lib){
  function () foo{
    lib.log("hello world)
  }
  return {
    foo: foo
  }
})
```

### CMD 
CMD是SeaJS在推广过程中对模块定义的规范化产出。 异步加载， 依赖就近
```
define(function(require, exports, module){})

//通过require引入依赖
var $ = require("jquery");
var Spinning = require("./Spinning") 
```

### CommonJS
CommonJS规范 - module.exports 适用于服务端
```
exports.area = function() {
  return Math.PI * r * r
}
```

### ES6 - import/export

import $ from 'jquery'

export default{
  data () {
    return {
    }
  },
  methods:{
  }
}



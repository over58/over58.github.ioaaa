---
title: 缓存memorize
author: 徐勇超
date: 2019-06-11 16:41:04
tags: [js]
categories: [js知识库]
---

### code
```
function memoize(func, hashFunc) {
  var memoize = function(key) {
    var cache = memoize.cache
    var address = '' + (hashFunc ? hashFunc.apply(this, arguments) : key)
    if(Object.getOwnPropertyNames(cache).indexOf(address) === -1) {
      cache[address] = func.apply(this, arguments)
    }
      return cache[address]
  }
  memoize.cache = {}
  return memoize
}


```

### test
```
let fibonacci = memoize(function(n){
  return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
})
console.log(fibonacci(1))
console.log(fibonacci(2))
console.log(fibonacci(3))
console.log(fibonacci(4))
console.log(fibonacci(10))
console.log(fibonacci(100))
```
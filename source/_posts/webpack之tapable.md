---
title: webpack之tapable
author:
  - 徐勇超
tags: []
categories:
  - webpack
comments: true
date: 2020-04-11 16:33:04
updated: 2020-04-11 16:33:04
---

### 示意图

![image-20200411170808449](webpack之tapable/image-20200411170808449.png)

### Sync

#### SyncHook

##### 使用

```javascript
const { SyncHook } = require('tapable')

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncHook(['arch'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tap('a', function(name) {
      console.log('node', name)
    })
    this.hooks.arch.tap('b', function(name) {
      console.log('react', name)
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.call('world')
  }
}

var a = new Lesson()
a.tap()
a.start()

```

<!-- more -->

##### 原理 

```js
class SyncHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    this.tasks.forEach(item => {
      item.task.call(null, ...args)
    })
  }
}

```

#### SyncBailHook

##### 使用

```js
const { SyncBailHook } = require('tapable')
// 指的是保险hook，可以随时停止后续事件的执行

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncBailHook(['arch', 'a'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tap('a', function(name) {
      console.log('node', name)

      // return '返回一个不为 === undefined的值，就会阻断后续的代码'
      return 0
    })
    this.hooks.arch.tap('b', function(name) {
      console.log('react', name)
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.call('world')
  }
}

var a = new Lesson()
a.tap()
a.start()

```

##### 原理

```js

class SyncBailHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    let res = true
    let i = 0
    do {
      res = this.tasks[i++].call(null, ...args)
    } while (i < this.tasks.length && res === undefined)
  }
}


```

#### SyncWaterfallHook

##### 使用

```js
const { SyncWaterfallHook } = require('tapable')

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(['arch', 'a'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tap('a', function(name) {
      console.log('node', name)

      return '返回数据作为下一个事件的参数(如果返回undefined的话，等同于没有返回，不做处理 )'
    })
    this.hooks.arch.tap('b', function(data) {
      console.log('react', data)
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.call('world')
  }
}

var a = new Lesson()
a.tap()
a.start()
```

##### 原理

```js
class SyncWaterfallHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    const [first, ...others] = this.tasks
    const ret = first(...args)
    others.reduce((a, b) => {
      if (a === undefined) {
        return b(...args)
      } else {
        return b(a)
      }
    }, ret)
  }
}
```

#### SyncLoopHook

##### 使用

```js
const { SyncLoopHook } = require('tapable')
// 同步遇到某个不返回undefined的监听函数会执行多次

class Lesson {
  constructor() {
    this.index = 0
    this.hooks = {
      arch: new SyncLoopHook(['arch', 'a'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tap('a', (name) => {
      console.log('node', name)
      return ++this.index === 3 ? undefined : '继续学'
    })
    this.hooks.arch.tap('b', function(name) {
      console.log('react', name)
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.call('world')
  }
}

var a = new Lesson()
a.tap()
a.start()

```

##### 原理

```js
class SyncLoopHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    let index = 0
    let ret
    do {
      ret = this.tasks[index](...args)
      if (ret === undefined) {
        index++
      }
    } while (index < this.tasks.length)
  }
}
```

### Async

#### AsyncParallelHook

##### 使用
```js
const { AsyncParallelHook } = require('tapable')

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(['arch'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tapAsync('a', (name, cb) => {
      setTimeout(() => {
        console.log('node', name)
        cb()
      }, 2000)
    })
    this.hooks.arch.tapAsync('b', (name, cb) => {
      setTimeout(() => {
        console.log('react', name)
        cb()
      }, 1000)
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.callAsync('world', function() {
      console.log('end')
    })
  }
}

var a = new Lesson()
a.tap()
a.start()
```

##### 原理-tapAsync

```js
class AsyncParallelHook {
  constructor() {
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push({
      name,
      task
    })
  }

  callAsync(...args) {
    const cb = args.pop()
    let index = 0
    const done = () => {
      index++
      if (index === this.tasks.length) {
        cb()
      }
    }
    this.tasks.forEach(item => {
      item.task(...args, done)
    })
  }
}
```

##### 原理-tapPromise

```js
class AsyncParallelHook {
  constructor() {
    this.tasks = []
  }

  tapPromise(name, task) {
    this.tasks.push({
      name,
      task
    })
  }

  promise(...args) {
    const tasks = this.tasks.map(task => task(...args))
    return Promise.all(tasks)
  }
}

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(['arch', 'a'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tapPromise('a', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name)
          resolve()
        }, 2000)
      })
    })
    this.hooks.arch.tapPromise('react', (name, cb) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react', name)
          resolve()
        }, 2000)
      })
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.promise('world').then(() => {
      // 这个方法是所有的promise全部执行完之后才会调用这个的
      console.log('end')
    })
  }
}

var a = new Lesson()
a.tap()
a.start()

```

#### AsyncParallelBailHook

##### 使用

```js
const { AsyncParallelBailHook } = require('tapable')

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelBailHook(['arch'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tapPromise('a', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name)
          reject('wrong')
        }, 1000)
      })
    })
    this.hooks.arch.tapPromise('b', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react', name)
          resolve()
        }, 2000)
      })
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.promise('world').then(() => {
      console.log('success')
    }).catch(() => {
      console.log('fail')
    })
  }
}

var a = new Lesson()
a.tap()
a.start()
```

##### 原理

```js

```

#### AsyncSeriesHook

##### 使用

```js
const { AsyncSeriesHook } = require('tapable')
// 异步串行

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesHook(['arch'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tapAsync('a', (name, cb) => {
      setTimeout(() => {
        console.log('node', name)
        cb()
      }, 1000)
    })
    this.hooks.arch.tapAsync('b', (name, cb) => {
      setTimeout(() => {
        console.log('react', name)
        cb()
      }, 1000)
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.callAsync('world', function() {
      // 每一个结束后都回调这里，也可以自己计数实现类似于Promise.all的效果
      console.log('end')
    })
  }
}

var a = new Lesson()
a.tap()
a.start()

```

##### 原理-tapAsync/callAsync

```js
class AsyncSeriesHook {
  constructor() {
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    const fn = args.pop()
    let index = 0
    const next = () => {
      if (this.tasks.length === index) return fn()
      const task = this.tasks[index++]
      task(...args, next)
    }
    next()
  }
}

```

##### 原理tapPromise/promise

```js
class AsyncSeriesHook {
  constructor() {
    this.tasks = []
  }

  tapPromise(name, task) {
    this.tasks.push(task)
  }

  promise(...args) {
    const [first, ...others] = this.tasks
    return others.reduce((p, n) => { // 跟redux的源码一致
      return p.then(() => n(...args))
    }, first(...args))
  }
}
```

#### AsyncSeriesWaterfallHook

##### 使用

```js
const { AsyncSeriesWaterfallHook } = require('tapable')
// 异步串行

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(['arch'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tapAsync('a', (name, cb) => {
      setTimeout(() => {
        console.log('node', name)
        cb()
      }, 2000)
    })
    this.hooks.arch.tapAsync('b', (name, cb) => {
      setTimeout(() => {
        console.log('react', name)
        cb()
      }, 1000)
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.callAsync('world', function() {
      // 每一个结束后都回调这里，也可以自己计数实现类似于Promise.all的效果
      console.log('end')
    })
  }
}

var a = new Lesson()
a.tap()
a.start()

```

##### 原理

```js

class AsyncSeriesWaterfallHook {
  constructor() {
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    const fn = args.pop()
    let index = 0
    const next = (err, data) => {
      const task = this.tasks[index]
      if (!task || err === 'error') return fn()
      if (index === 0) {
        task(data, next)
      } else {
        task(data, next)
      }
      index++
    }
    next(null, ...args)
  }
}
```




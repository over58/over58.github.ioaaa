---
title: 批量发送请求batchRequest
author:
  - 徐勇超
tags: []
categories:
  - js知识库
comments: true
date: 2021-02-24 15:58:32
updated: 2021-02-24 15:58:32

---



```js

class BatchRequest {
    constructor(max = 3) {
        this.queue = [];
        this.max = max
    }
    addRequest(fn) {
        this.queue.push(fn)
    }
    run() {
        let count = 0
        let timer = null
        if (this.queue.length) {
            timer = setInterval(() => {
                Array.from({ length: Math.max(0, this.max - count) }).forEach(() => {
                    let fn = this.queue.shift()
                    if (fn) {
                        count++
                        console.log('执行')
                        fn().then(() => {
                            console.log('over')
                            count--
                        })
                    }
                })
            })
        }else{
            clearInterval(timer)
        }
    }
}


var a = new BatchRequest()
a.addRequest(fn)
a.addRequest(fn)
a.addRequest(fn)
a.addRequest(fn)
a.addRequest(fn)

a.run()
```


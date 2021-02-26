---
title: vue中定时器问题
date: 2019-03-04 18:58:04
tags: [vue]
---

Vue中使用了定时器后在关闭页面后必须手动清理

<!-- more -->

```
方案一

data: {
  tiemr: null  
},
method: {
  method1 () {
    this.timer = setInterval(()=> {
      // logic 
    }, interval)
  }  
},
beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
}


方案二：

通过$once来监听定时器，在beforeDestroy中可以被清除


优点：这两段代码写在一起，不用特意定义一个data.timer,减少了数据监听的成本消耗
缺点：适用于只有离开页面关闭定时器的情况，
const timer = setInterval(()=>{
    // logic
}, interval)

this.$once('hook:beforeDestroy', ()=>{
    clearInterval(timer)
})

ps: 


template>
  <div class="test">
    <Button @click="addInterval()">add</Button>
    <h1>测试</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    addInterval () {
      const timer = setInterval(() => {
        console.log('aaa')
      }, 100)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
      })
    }
  }
}
</script>
```



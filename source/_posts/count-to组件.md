---
title: count-to组件
date: 2019-04-29 19:37:54
tags: [组件]
categories:
 - vue
---

```
<template>
  <div>
    <slot name="prepend"></slot><span :class="classes" ref="number" :id="eleId"></span><slot name="append"></slot>
  </div>
</template>

<script>
import CountUp from 'countup'
export default {
  name: 'CountTo',
  props: {
    satrtVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      required: true
    },
    /**
     *
     * @description 小数点的精度
     */
    decimals: {
      type: Number,
      default: 0
    },
    /**
     *
     * @description 动画时间，单位： 秒
     */
    duration: {
      type: Number,
      default: 1
    },
    separator: {
      type: String,
      default: ','
    },
    /**
     *
     * @description 是否使用分组
     */
    useGrouping: {
      type: Boolean,
      default: true
    },
    /**
     *
     * @description 动画开始延迟，单位：毫秒
     */
    delay: {
      type: Number,
      default: 0
    },
    className: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      counter: {}
    }
  },
  computed: {
    eleId () {
      return `count-to-${this._uid}`
    },
    classes () {
      return [
        'count-to-number',
        this.className
      ]
    }
  },
  watch: {
    endVal (newVal) {
      this.counter.update(newVal)
      this.emitEndEvent()
    }
  },
  methods: {
    getCount () {
      return this.$refs.number.innerText
    },
    /**
     *
     * @description 动画结束时发送事件
     */
    emitEndEvent () {
      setTimeout(() => {
        this.$nextTick(() => {
          this.$emit('on-animation-end')
        })
      }, this.duration * 1000 + 5)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.counter = new CountUp(this.eleId, this.satrtVal, this.endVal, this.decimals, this.duration, {
        useEasing: true,
        useGrouping: this.useGrouping,
        separator: this.separator,
        decimal: '.'
      })
      setTimeout(() => {
        this.counter.start()
        this.emitEndEvent()
      }, this.delay)
    })
  }
}
</script>

<style lang="less" scoped>
.count-to-number{
  color: #000;
}
</style>

```
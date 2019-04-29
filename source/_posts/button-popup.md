---
title: button-popup
date: 2019-04-29 17:58:49
tags: [vue, components]
---

### 效果图

![btn-popup-1](/../images/btn-popup-1.png)
![btn-popup-2](/../images/btn-popup-2.png)

<!-- more -->

### 代码
```
<template>
    <Poptip :width="width" placement="bottom-start" trigger="click">
        <Button>{{title}}{{checkAll ? '(全选)' : ''}}</Button>

        <div class="content" slot="content">
          <Input v-model="search" class="item"/>
          <Checkbox v-model="checkAll" class="item" label="all" @on-change="handleChangeAll">全部</Checkbox>
          <CheckboxGroup v-model="select" @on-change="handleChange">
            <Checkbox v-for="item in groups" v-show="item.value.indexOf(search) > -1" :key="item.value" :label="item.label" class="item">
              {{item.label}}
            </Checkbox>
          </CheckboxGroup>
        </div>
    </Poptip>
</template>
<script>
/**
 * 数据格式
 *
 * [{
 *    label: '',
 *    value: ''
 * }]
 *
 * or
 *
 * [{
 *  label: ''
 * }]
 *
 * or
 *
 * ['XXX1', 'xxx2']
 *
 */
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      select: this.value,
      checkAll: false,
      search: ''
    }
  },
  computed: {
    groups () {
      return this.data.map(item => {
        if (typeof item === 'string') {
          return {
            label: item,
            value: item
          }
        } else if (typeof item === 'object') {
          if ('value' in item) {
            return {
              label: item.value,
              value: item.value
            }
          }
        } else {
          throw new Error('data is valid')
        }
      })
    }
  },
  watch: {
    value () {
      this.init()
    }
  },
  methods: {
    handleChange (val) {
      if (val.length === this.data.length) {
        this.select = this.data
        this.checkAll = true
      } else {
        this.checkAll = false
      }
      this.$emit('on-change', this.select)
    },
    handleChangeAll (checkAll) {
      if (checkAll) {
        this.select = this.data
      } else {
        this.select = []
      }
      this.$emit('on-change', this.select)
    },
    init () {
      this.select = this.value
      if (this.select.length === this.data.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.content{
  overflow: hidden;
}
.item{
  display: block;
  text-overflow: ellipsis;
}
</style>

```
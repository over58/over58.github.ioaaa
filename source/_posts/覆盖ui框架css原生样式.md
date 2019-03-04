---
title: 覆盖ui框架css原生样式
date: 2019-03-04 19:03:48
tags: [vue]
---


- 加scoped
```
<style scoped>
/deep/.rootName .className{
    
}

or 

.rootName >>> .className{
    
}
</style>

```

- 不加scoped
原理：在组件中添加了父css类, 在修改的样式作用域限定为父css类，减小css的影响范围
```
<style>
.rootName .className{
}
</style>
```

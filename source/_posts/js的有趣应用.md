---
title: js的有趣应用
date: 2019-04-29 14:14:53
tags: [js]
---

### 打乱数组
```
let fn = (arr) => arr.slice().sort(() => Math.random() - 0.5)
```

### 生成随机的十六进制颜色

#### 1
``` 
'#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')
```

#### 2
```
Array.from({length:6},()=>Math.floor(Math.random()*16).toString(16)).join("")
// Array.from()的第一个参数指定了第二个参数的运行次数
```

### 数组去重
```
[new Set(arr)]
```

### 获取URL的查询参数
```
q={};location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);q;
```

### 返回一个键盘
```
// 用字符串返回一个键盘图形
(_=>[..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"].map(x=>(o+=`/${b='_'.repeat(w=x<y?2:' 667699'[x=["BS","TAB","CAPS","ENTER"][p++]||'SHIFT',p])}\\|`,m+=y+(x+'    ').slice(0,w)+y+y,n+=y+b+y+y,l+=' __'+b)[73]&&(k.push(l,m,n,o),l='',m=n=o=y),m=n=o=y='|',p=l=k=[])&&k.join``)()
```

来源 https://juejin.im/post/5cc55eb5e51d456e577f93f0

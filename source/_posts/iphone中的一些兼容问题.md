---
title: iphone中的一些兼容问题
author: 徐勇超
date: 2019-06-03 19:46:19
tags: [css, vue]
categories:
---

### 滚动不流畅
解决办法：
```
  overflow-y: scroll;
	touch-action: pan-y;
	-webkit-overflow-scrolling: touch;
```

### input再次获得焦点时，需要多次点击
```
<!-- 解决300ms延迟 -->
import fastClick from 'fastclick'

// 解决ios输入框bug：第一次点击输入框，正常反应；
// 点击键盘完成后，再次点击输入框，很难再获得焦点的问题
fastClick.prototype.onTouchEnd = function (event) {
  if (event.target.hasAttribute('type') && event.target.getAttribute('type') === 'text') {
    event.preventDefault()
    return false
  }
}

fastClick.attach(document.body)

```
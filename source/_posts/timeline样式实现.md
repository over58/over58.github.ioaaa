---
title: timeline样式实现
date: 2019-02-28 14:59:51
tags: css components
---

```
<ul>
	<li>
		<div class="head">
			<span class="title">标题1</span>
		    <span class="extra">2019/01/03</span>
		</div>
        <div class="content">内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
	</li>
 
	<li>
      <div class="head">
        <span class="title">标题2</span>
        <span class="extra">2019/01/04</span>
	   </div>
      <div class="content">
          内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内
	</li>
</ul>

.head{
	overflow:hidden;
	height:25px;
	line-height:25px;
	padding:0 5px;
}

.extra{
	float:right;
}

.content{
	border-left:solid 3px #333;
	padding-left:5px;
}
```
![timeline](images/timeline.png)

---
title: button样式的实现
date: 2019-02-28 15:57:49
tags:
---

使用stylus 编写
工具函数:

```
vendor(prop,value)
  -webkit-{prop} value
  -moz-{prop} value
  {prop} value

border-radius(n = 5px)
  vendor(border-radius,n)
```

```
.btn
  padding: 0 40px
  border:none
  height:40px
  border-radius(5px)
  background-color: #5df
  cursor pointer
  transition: all .5s ease
  &:hover
    background-color #666
    color #fff
    transition: all .5s ease
  &:focus
    outline: none
```


```
.btn-3d
  position relative
  top 0
  box-shadow: 0 7px 0 rgba(0,0,0,.2), 0 8px 3px #333
  transition: all .15s ease
  &:active
    position relative
    top 5px
    box-shadow: 0 2px 0 rgba(0,0,0,.2), 0 3px 3px #333
    transition: all .3s ease
```



```
.btn-glowing
  animation:  glowing 3s infinite;

@keyframes glowing 
  from
    box-shadow: 0 0 0 rgba(44, 154, 219, 0.3)
  50%
    box-shadow: 0 0 20px rgba(44, 154, 219, 0.8)
  to
    box-shadow: 0 0 0 rgba(44, 154, 219, 0.3)
```

按钮菜单
```
.btn-dropdown
  position relative
  overflow visible
  display inline-block
  &:hover,&:active
    .btn-dropdown-list
      display inline-block
.btn-dropdown-list
  display none
  position absolute
  top 100%
  left 0
  margin 0
  padding 0
  z-index 1000
  min-width 100%
  list-style-type: none
  background: rgba(255, 255, 255, 0.95)
  border-style: solid
  border-width: 1px
  border-color: #d4d4d4
  font-family: "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif
  -webkit-box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2)
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2)
  border-radius: 3px
  -webkit-box-sizing: border-box
  -moz-box-sizing: border-box
  box-sizing: border-box
  &:hover
    display inline-block

.btn-dropdown-list>li
  padding: 0
  margin: 0
  display: block
.btn-dropdown-list>li>a
  display: block
  line-height: 40px
  font-size: 12.8px
  padding: 5px 10px
  float: none
  color: #666
  text-decoration: none
  &:hover
    color: #5e5e5e
    background: #f6f6f6
    text-decoration: none
```


```
.btn-group
  position relative
  display inline-block
  &:after
    content: ''
    display block
    clear both
.btn-group .btn
  border-radius: 0
  float: left
  border: solid 1px #333
  &:first-child
    border-top-left-radius: 5px
    border-bottom-left-radius: 5px
  &:last-child
    border-top-right-radius: 5px
    border-bottom-right-radius: 5px
  &:not(:last-child)
    border-right none
```



```
.btn-raised
  border-color: #e1e1e1
  border-style: solid
  border-width: 1px
  line-height: 38px
  background: -webkit-gradient(linear, left top, left bottom, from(#f6f6f6), to(#e1e1e1))
  background: linear-gradient(#333, #e1e1e1)
  -webkit-box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.15)
  box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.15)

```

```
.btn-wrap
  display inline-block
  padding 9px
  border-radius 200px
  border solid 1px #e3e3e3
  background linear-gradient(#f2f2f2,#fff)
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.04)
  & .btn
    border-radius: 200px
```


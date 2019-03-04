---
title: js的灵活
date: 2019-03-04 14:53:55
tags:
---

### js是超级灵活的语言
#### step1
```
var checkObj = function () {}
    checkObj.prototype.checkName = function(){
    console.log('checkName')
}
checkObj.prototype.checkEmail = function(){
    console.log('checkEmail')
}
checkObj.prototype.checkPassword = function(){
    console.log('checkPassword')
}
var a = new checkObj()
a.checkName()
a.checkEmail()
a.checkPassword()
```

<!-- more -->
#### step2
```
var checkObj = function () {}
checkObj.prototype = {
    checkName:function(){
        console.log('checkName')
    },
    checkEmail: function(){
        console.log('checkEmail')
    },
    checkPassword: function(){
        console.log('checkPassword')
    }
}
var a = new checkObj()
a.checkName()
a.checkEmail()
a.checkPassword()
```
### step3 链式调用
```
var checkObj = function () {}
    checkObj.prototype = {
        checkName:function(){
        console.log('checkName')
        return this
    },
    checkEmail: function(){
        console.log('checkEmail')
        return this
    },
    checkPassword: function(){
        console.log('checkPassword')
        return this
    }
}
var a = new checkObj()
a.checkName().checkEmail().checkPassword()
```
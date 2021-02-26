---
title: js中对象的delete
author:
  - 徐勇超
date: 2019-06-18 10:23:34
tags: [js]
categories:
---

### delete操作有以下几个特点:
1. 删除自有属性，不影响原型上的，如果自己没有这个属性，仍然返回true
2. 属性描述符configable: false的属性是不能被删除的， 返回false
3. 删除是将key-value都删除了


### demo
```
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
  console.log(this.name)
}

var person1 = new Person();
console.log(person1)
console.log('person1是否自己存在属性name: ', person1.hasOwnProperty("name"));  //false
person1.name = "Greg";
console.log('person1的name进行重新赋值以后的person1（对象的属性赋值）', person1)

delete person1.name;
console.log('删除person1的name属性',person1)
console.log('获取person1的name属性（prototype上的）', person1.name)
```

### result
```
Person {}
person1是否自己存在属性name:  false
person1的name进行重新赋值以后的person1（对象的属性赋值） Person { name: 'Greg' }
删除person1的name属性 Person {}
获取person1的name属性（prototype上的） Nicholas
```
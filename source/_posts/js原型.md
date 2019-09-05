---
title: js的封装和继承 
date: 2019-03-04 14:20:07
tags: [js]
---

###　简单介绍
谈到JAVASCRIPT的继承，只有一种结构：对象。每个对象都有一个私有属性__proto__ 指向它的原型对象(prototype) . 原型对象也有自己的__proto__ ,层层向上直到一个对象的原型对象为NULL.根据定义，NULL是没有原型的，并作为这个原型链的最后一个环节。

！！！ 实例对象的__proto__ 等于该对象构造函数的prototype
ps: 
```

![js prototype]('/source/images/原型链.png')
var obj = {}
obj.__proto__ === Object.prototype
```
<!-- more -->

### 封装
```
var Book = function (id,name, price) {
    // 私有属性
    var num = 1
    // 私有函数
    function checkId(){
    }
    // 公有属性
    this.id = id
    this.name = name
    this.price = price
    // 公有函数
    this.getName=function(){}
    this.getPrice = function(){}
    this.setName = function (name){this.name = name}
    this.setPrice = function(price){this.price = price}
    this.getNum = function(){return num}
}
//类静态公有属性（对象不能访问）
Book.isChinese = true
//类静态公有方法（对象不能访问）
Book.resetTime = function(){}

var book = new Book('adf2323','js设计模式', 232)
console.log(book.name, book.price, book.id)
console.log(book.getNum())
```

###　New的作用

```
Function Book(id, name , price) {
    Var this = {}
    This.name = name
    This.id = id
    This.price = price
    Return this
}
```

### 类的原型对象的作用
    继承通过将父类的实例赋值给子类的原型对象。
    类的原型对象的作用就是为类的原型添加共有方法，但是类并不能直接访问这些函数和方法。当我实例化的时候，新创建的对象复制了父类的构造函数内的属性与方法并且将原型__proto__ 指向父类的原型对象，这样就拥有了父类的原型对象上的属性和方法，并且这个新创建的对象可以访问到父类原型对象上到的属性和方法

### 常见的继承的几种方式

#### 类式继承
```
//声明父类
function SuperClass(){}
// 为父类添加共有方法
SuperClass.prototype.getSuperValue=function(){}

//声明子类
function SubClass(){
    this.subValue = false
}

//继承
SubClass.prototype = new SuperClass();

// 为子类添加共有方法
SubClass.prototype.getSubValue = function (){
    return this.subValue
}

缺点：由于子类通过其原型prototype 对父类进行实例化，继承了父类。所以说父类中的共有属性如果是引用类型，就会被子类中的所有实例共用，存在被修改的可能。
```

#### 构造函数式继承
```
function SuperClass(id){
  this.books = ['js', 'html', 'css']
  this.id = id
}

SuperClass.prototype.getSuperValue = function () {
  console.log('getSuperValue')
}

function SubClass(id){
  // 继承父类
  SuperClass.call(this, id)
}

缺点：只继承了父类构造函数中的公有属性。如果一个函数后者变量想要被继承么，就必须放在父类构造函数中，这样创建的每个实例都会单独拥有一份而不能共用，这样违背了代码复用的原则。为了综合这两种模式的有点，后来有了组合式继承。
```

#### 组合式继承
```
function SuperClass(id){
  // 将公有引用类型放在构造函数中
  this.books = ['js', 'html', 'css']
  this.id = id
}

SuperClass.prototype.getSuperValue = function () {
  console.log('getSuperValue')
}

function SubClass(id){
  // 继承父类中构造函数的属性和方法
  SuperClass.call(this, id)
}
SubClass.prototype = new SuperClass()
SubClass.prototype.getTime = function(){
    
}
缺点： 
SuperClass.call(this, id)执行了一次父类构造函数
new SuperClass()又执行了一次父类构造函数
```

#### 寄生组合式继承
```
function SuperClass(id){
  // 将公有引用类型放在构造函数中
  this.books = ['js', 'html', 'css']
  this.id = id
}

SuperClass.prototype.getSuperValue = function () {
  console.log('getSuperValue')
}

function SubClass(id){
  // 继承父类中构造函数的属性和方法
  SuperClass.call(this, id)
}
function inherit(subClass, superClass){
    //定义了一个没有自有属性的对象
    var F = function(){}
    F.prototype = superClass.prototype
    subClass.prototype = new F() // 干净的继承了父类的公有属性
}
```

#### 补充：inherit函数
```
function inherit(p){
    if(p === null) throw TypeError
    if(Object.create){
        return Object.create(p)
    }
    let t = typeof p
    if(t !== "object" || t!== "function") throw TypeError
    function F(){}
    F.prototype = p
    return new F();
}
```

---
title: js的几种模块化方式
date: 2019-04-29 15:03:11
tags: [js]
---

模块化的必要性：
为了提高代码的开发效率，方便代码的维护，重构。


模块化与组件化的区别：
模块可以理解为分解的页面逻辑，比如一个网站的登录，用户管理等；
组件则是一个具体的功能。
具体来说一个下拉框是一个组件，一个登录功能一个模块。


目前常见的模块化规范（排名不分先后）：

- AMD
- CMD
- CommonJS
- ES6



### 1. AMD
AMD与CMD类似，不同的是AMD推崇依赖前置，--requireJS 推广过程中出现的规范。
```
/** main.js中引入1.js及2.js **/
// 执行基本操作
define(["1.js","2.js"],function($,_){
  // some code here
});
/** 如果1.js中又引入了3.js，那就会先广度优先，然后深度遍历。   
请求1.js和2.js然后在1.js中进行3.js的请求，3.js返回结果后查看2.js是否已经返回，   
如果已经返回则合并结果后返回给main.js
**/
```

### 2. CMD
CMD推崇就近依赖。   --sea.js推广过程中出现的规范。
但是因为在AMD&CMD都是在浏览器端使用，采用的是异步加载，其实CMD还是需要在一开始就请求需要的，只是写法上更方便了。（采用的是正则匹配来获得js文件名，所以注释掉的仍然会请求，并且只可以书写字符串，不可以使用表达式）
```
/** AMD写法 **/
define(["1", "2"], function(1, 2) { 
     // 依赖前置
  function foo(){
    lib.log('hello world!');
  }

  return {
    foo: foo
  };
});

/** CMD写法 **/
define(function(require, exports, module) {
    var test = require('./1'); //就近依赖
    test.sayHi();
});
```
### 3. CommonJS
大前端使用的Node即时CommonJS的实例。
与AMD&CMD的不同之处在于CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。
require参数规则:

3.1. 如果参数字符串以“/”开头，则表示加载的是一个位于绝对路径的模块文件。   
比如，require('/home/marco/foo.js')将加载/home/marco/foo.js。   
3.2. 如果参数字符串以“./”开头，则表示加载的是一个位于相对路径（跟当前执行脚本的位置相比）的模块文件。   
比如，require('./circle')将加载当前脚本同一目录的circle.js。   
3.3. 如果参数字符串不以“./“或”/“开头，则表示加载的是一个默认提供的核心模块（位于Node的系统安装目录中），   
或者一个位于各级node_modules目录的已安装模块（全局安装或局部安装）。   
3.4. 如果参数字符串不以“./“或”/“开头，而且是一个路径，比如require('example-module/path/to/file')，   
则将先找到example-module的位置，然后再以它为参数，找到后续路径。   
3.5. 如果指定的模块文件没有发现，Node会尝试为文件名添加.js、.json、.node后，再去搜索。    
.js件会以文本格式的JavaScript脚本文件解析，.json文件会以JSON格式的文本文件解析，   
.node文件会以编译后的二进制文件解析。   
3.6. 如果想得到require命令加载的确切文件名，使用require.resolve()方法。
```
const webpack = require('webpack');//引入
const sayHi = function (){
    console.log('haha');
}
module.exports = {
    sayHi:sayHi
}//导出
```
### 4. ES6
相对于以上的AMD&CMD是用于浏览器端，CommonJS用于服务器端。ES6的模块化非常可喜可贺的是浏览器和服务器通用的模块解决方案。
那它是怎么做到的呢？
区别与以上三者需要在 进行时加载，ES6尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
使用：
```
ES6使用import进行引入，export default(比export更友好)进行导出。
import { lastName as surname } from './profile.js';
function foo() {
  console.log('foo');
}

export default foo;
```
作者：littleStar
链接：https://juejin.im/post/5cc5909d518825253f4a5a68
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
---
title: require和import比较
author:
  - 徐勇超
tags: []
categories:
  - 工程化
comments: true
date: 2020-12-27 15:39:40
updated: 2020-12-27 15:39:40
---



### A--require 和 import比较

|  | 出现时间 | 加载机制 | 输出 | 用法 | 特点 |
| ------ | ------ | ------ | - | - | -------- |
| require | 2009 | 运行时加载 | 浅拷贝 | 见下 | 社区方案，提供了服务器/浏览器的模块加载方案。非语言层面的标准。只能在运行时确定模块的依赖关系及输入/输出的变量，无法进行静态优化。
| import | 2015 | 静态编译 | 值引用 | 见下 | 语言规格层面支持模块功能。支持编译时静态分析，便于JS引入宏和类型检验。动态绑定

### B--用法比较
* require
````
const fs = require('fs')
exports.fs = fs
module.exports = fs
````
* import
````
import fs from 'fs'
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'

export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'
````

### B1--支持实现度
| 模块 | 浏览器 | node |
| -    | -     | -    |
| require | x  | 支持 |
| es module| [look](https://caniuse.com/#search=ES%20modules) | node > 13 |

### C--解析结果
* require是赋值过程，其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量
* import是解构过程，但是目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require

### D--引用实例
````
// ES2015 modules

// ---------------------------------
// one.js
console.log('running one.js');
import { hello } from './two.js';
console.log(hello);

// ---------------------------------
// two.js
console.log('running two.js');
export const hello = 'Hello from two.js';
````

````
// CommonJS modules

// ---------------------------------
// one.js
console.log('running one.js');
const hello = require('./two.js');
console.log(hello);

// ---------------------------------
// two.js
console.log('running two.js');
module.exports = 'Hello from two.js';
````
````
es6
running two.js
running one.js
hello from two.js

commonjs
running one.js
running two.js
hello from two.js
````

### E--前景展望，谁会一统模块江湖
1. node > 13 已经全面支持 [link](https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_enabling),目前是共存局面
2. deno 使用es模块[deno](http://www.ruanyifeng.com/blog/2020/01/deno-intro.html)
3. 两种同事存在的可能性，不是很大，es6模块会越来越普及，建议以后都使用es6模块机制

### F--资源分享 [es module in browser](https://www.zhangxinxu.com/wordpress/2018/08/browser-native-es6-export-import-module/)
---
title: webpack如何查找模块
author:
  - 徐勇超
tags: []
categories:
  - js知识库
comments: true
date: 2019-11-27 20:24:10
updated: 2019-11-27 20:24:10
-----

### 主要涉及的东西
- resolve.modules
- resolve.mainFields
- resolve.mainFiles
- resolve.extensions
- resolve.alias

### resolve.modules指定寻找模块时的目录
引入模块时分为绝对路径和相对路径
但绝对路径和相对路径有些区别
1. 绝对路径：直接在指定的目录中搜索   
2. 相对路径：通过查看当前目录以及祖先路径（即 ./node_modules, ../node_modules 等等），相对路径将类似于 Node 查找 'node_modules' 的方式进行查找。

实行的是**广度优先遍历**

假设有如下配置：
```
{
    // some other configs
    resolveLoader: {
      modules: ['loaders1', 'loaders2']
    }
    // some other configs
}
```
如果当前进程目录是 /a/b/c ，现在要查找 babel-loader ，就会按照如下顺序查找：
```
/a/b/c/loaders1/babel-loader/...
/a/b/c/loaders2/babel-loader/...

/a/b/loaders1/babel-loader/...
/a/b/loaders2/babel-loader/...

/a/loaders1/babel-loader/...
/a/loaders2/babel-loader/...

/loaders1/babel-loader/...
/loaders2/babel-loader/...
```

### 具体如何解析寻找模块
这个过程有一个很关键的模块 enhanced-resolve 就是处理依赖模块路径的解析的，这个模块可以说是 Node.js 那一套模块路径解析的增强版本，有很多可以自定义的解析配置。
**模块解析规则**
####  解析绝对路径
  由于我们已经取得文件的绝对路径，因此不需要进一步再做解析。
####  解析相对路径
  相对路径+上下文路径（context  path） => 绝对路径
####  解析模块名
  模块将**resolve.modules**指定的所有目录内搜索，也可以通过添加**resolve.alias** 来创建一个别名。一旦根据上述规则解析路径后，解析器(resolver)将检查路径是否指向文件或目录
   ##### 如果路径指向一个文件：
     1.  如果路径具有文件扩展名，则被直接将文件打包。
     2.  否则，将使用 resolve.extensions 选项作为文件扩展名来解析，此选项告诉解析器在解析中能够接受哪些扩展名（例如 .js, .jsx）。
   #####  指向一个目录
     1.  文件夹包含package.json,  则按照顺序查找 resolve.mainFields 配置选项中指定的字段。并且 package.json 中的第一个这样的字段确定文件路径。
     2. 如果 package.json 文件不存在或者 package.json 文件中的 main 字段没有返回一个有效路径，则按照顺序查找 resolve.mainFiles 配置选项中指定的文件名，看是否能在 import/require 目录下匹配到一个存在的文件名
     3.  文件扩展名通过 resolve.extensions 选项采用类似的方法进行解析

### demo
#### resolve
在 webpack 配置中，和模块路径解析相关的配置都在 resolve 字段下：
```
module.exports = {
  resolve: {
    // ...
  }
}
```
#### resolve.alias

假设我们有个 utils 模块极其常用，经常编写相对路径很麻烦，希望可以直接 import 'utils' 来引用，那么我们可以配置某个模块的别名，如：
```
alias: {
 utils: path.resolve(__dirname, 'src/utils')
 // 这里使用 path.resolve 和 __dirname 来获取绝对路径 
}
```
上述的配置是模糊匹配，意味着只要模块路径中携带了 utils 就可以被替换掉，如：
```
import 'utils/query.js' 
// 等同于 import '[项目绝对路径]/src/utils/query.js'
 
如果需要进行精确匹配可以使用：
alias: { 
utils$: path.resolve(__dirname, 'src/utils')
 // 只会匹配 import 'utils' 
}
```

#### resolve.extensions
```
extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
// 这里的顺序代表匹配后缀的优先级，例如对于 index.js 和 index.jsx，会优先选择 index.js
```
看到数组中配置的字符串大概就可以猜到，这个配置的作用是和文件后缀名有关的。是的，这个配置可以定义在进行模块路径解析时，webpack 会尝试帮你补全那些后缀名来进行查找，例如有了上述的配置，当你在 src/utils/ 目录下有一个 common.js 文件时，就可以这样来引用.
import * as common from './src/utils/common'
webpack 会尝试给你依赖的路径添加上 extensions 字段所配置的后缀，然后进行依赖路径查找，所以可以命中 src/utils/common.js 文件。
resolve.modules

#### resolve.mainFiles
```
默认：
mainFiles: ['index']
```
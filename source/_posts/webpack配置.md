---
title: webpack配置
author:
  - 徐勇超
tags:
  - js
  - webpack
date: 2019-10-11 00:26:56
categories:
  - webpack
---

#### devtool
如果是生产环境,压根不应该有devtool这个选项，这样build之后不会产生map文件，如果需要map文件用来方便查找问题，则设置devtool就行


#### performance

```
performance: {
    hints: 'warning', // false | warning | error
    maxEntrypointSize: 1048576, // 入口文件最大值为1M
    maxAssetSize: 3145728, // 资源文件最大值为3M
    assetFilter: function (assetFilename) {
      // 只给出js文件的性能提示
      return assetFilename.endsWith('.js')
    }
  }
```


#### resolve.alias用来设置快捷方式
```
  resolve: {
    alias: {
      // 只能匹配到vue$结尾的字符串
      // 比如：import Test1 from 'vue';
      // 不能匹配 import Test1 from 'vue-router';
      vue$: 'vue/dist/vue.esm.js'
    },
    
    // 自动解析确定的扩展, ps: import File from '../path/to/file';

    extensions: ['*', '.js', '.vue', '.json']
  },
```

#### externals
防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。

例如，从 CDN 引入 jQuery，而不是把它打包
```
externals: {
    highcharts: {
      root: 'Highcharts',
      commonjs: 'highcharts',
      commonjs2: 'highcharts',
      amd: 'highcharts'
    }
  },
```

#### library 和 libraryTarget
```
output: {
    filename: '[name].js',
    // 以何种形式暴露library， 指的是暴露出来的名字
    library: 'HighchartsVueXyc',
    // 选项将导致 bundle 带有更完整的模块头部，以确保与各种模块系统的兼容性。
    // 将你的 library 暴露为所有的模块定义下都可运行的方式。它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量。
    libraryTarget: 'umd',
    path: path.resolve(__dirname, './dist')
  },
```
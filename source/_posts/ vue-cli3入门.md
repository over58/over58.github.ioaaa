---
title: vue-cli3 入门
author: 徐勇超
tag: [vue]
---

[官方文档](https://cli.vuejs.org/zh/guide/)

### 1. vue-cli3实现分环境打包步骤

通过改变 `process.env.NODE_ENV` 值区分打包环境，但是webpack打包时针对`process.env.NODE_ENV==='production'` 和其他情况打出来的包结构和大小都不一样；

为了消除这种差异，可以使用其他变量比如 `process.env.VUE_APP_TITLE` 来区分环境。
XXXXx
<!-- more -->

需求：
> 打包一个测试环境alpha，该环境的打包和production一样，只是开发中用到的一些变量需要区分环境

说明：
* 打包时判断环境还是用`process.env.NODE_ENV`，我们不用处理
* 项目中用到的区分环境的变量我们自己定义

实施：
1. package.json中打包命令：
```
{
···
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "alpha": "vue-cli-service build --mode alpha"
  },
···
}
```
2. 在项目根目录添加文件.env.alpha”，其内容为：
```js
NODE_ENV=production
VUE_APP_TITLE=alpha
```

3. 区分环境:
```
通过env判断环境
var env = process.env.VUE_APP_TITLE === 'alpha' ? 'alpha'
      : process.env.NODE_ENV === 'production' ? 'production' : 'development'
```

### 2. 配置

#### 2.1 基本配置

默认 `baseUrl: '/'` , 再部署环境会报错，需要改成 `./`

vue.config.js
```
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false
}
```

#### 2.2. 配置alias
```
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('styles', resolve('src/assets/styles'))
      .set('components', resolve('src/components'))
  }
}

```

#### 2.3. 设置启动端口
默认是8080，被占用时依次累加。注意：mac上普通用户可设置的最小端口是1024，要配置小于1024的端口需要管理员权限
```
devServer: {
    port: 80
}
```

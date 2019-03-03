---
title: npm常用知识点
date: 2019-03-03 14:26:47
tags: [npm]
---

### 更新到最新正式版本
```
npm install npm@latest -g
```

### 更新到未来将会释放的版本
```
npm install npm@next -g
```

### 列出某个包的所有历史banbe
```
npm view <package> versions
```

### 初始化
```
npm init or npm init --yes(直接使用默认的设置)
```
<!-- more -->

### 安装包
```
npm install package  or npm i package

```
#### 安装包之 --save
```
npm install package --save 安装包并将包的信息写入package.json中的dependencies
```
#### 安装包之 --save-dev
```
npm install package --save-dev 安装包并将包的信息写入package.json中的devDependencies
```

### 安装包之 指定版本
```
npm install package@version 
```

### 全局包
```
安装：npm install package -g
查看那些全局包过期： npm outdated -g --depth=0
更新某个全局包：npm update package -g
更新所有的全局包： npm update -g
卸载全局包： npm uninstall package -g
```

### semver package的版本问题
  semver的格式： 主版本号.次版本号.修订号

#### range
```
< 
<= 
> 
>=
= 
```
#### Advanceed Range Syntax
- 1.2.3 - 2.3.4 := >=1.2.3 <=2.3.4
- 1.2.3 - 2.3   := >=1.2.3 <2.4.0
- 1.2.3 - 2     := >=1.2.3 <3.0.0

#### X-Ranges 
- * := >=0.0.0 (Any version satisfies)
- 1.x := >=1.0.0 <2.0.0 (Matching major version)
- 1.2.x := >=1.2.0 <1.3.0 (Matching major and minor versions)
```

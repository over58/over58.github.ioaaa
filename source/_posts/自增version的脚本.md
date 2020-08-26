---
title: 自增version的脚本
author:
  - 徐勇超
tags: []
categories:
  - js知识库
comments: true
date: 2020-08-26 15:37:48
updated: 2020-08-26 15:37:48
---
开发一些个npm包的时候经常忘了更改version, 然后写了个打包时自增version的小脚本
```
/**
 * 自动的增加一个version patch
 * version: major.minor.patch
 */
const fse = require('fs-extra')
const semver = require('semver')
const path = require('path')

const fileName = path.join(__dirname,'../package.json')
fse.readJSON(fileName,{throws:false})
.then(packageJson => {
  packageJson.version = semver.inc(packageJson.version, 'patch')
  fse.writeJSONSync(fileName, packageJson, {spaces: '  ', EOL: '\n',  encoding:'utf-8'}, err =>{
    if(err) {
      console.error(err)
      process.exit(-1)
    }
  })
}).catch(err =>{
  console.log(err);
  process.exit(-1)
})

```
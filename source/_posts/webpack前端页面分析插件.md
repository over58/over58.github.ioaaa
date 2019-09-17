---
title: webpack前端页面分析插件
author:
  - 徐勇超
tags:
  - js
  - vue
  - webpack
date: 2019-09-17 19:23:07
categories:
---

1.添加插件
```
cnpm install webpack-bundle-analyzer -save
```

2. vue.config.js文件
```
 chainWebpack: config => {
    // 运行npm run analyze 显示性能分析
    if (process.env.analyze && process.NODE_ENV === production) {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
  },
```

3.scripts中添加
```
  "analyz": "NODE_ENV=production analyze=true npm run build"
```

4. 运行
```
npm run analyze
```
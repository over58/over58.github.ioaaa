---
title: vue中自定义属性的d.ts书写问题
author:
  - 徐勇超
tags: []
categories:
  - typescript
comments: true
date: 2020-12-27 15:53:55
updated: 2020-12-27 15:53:55
---

## 在vue的instance上添加自定义的属性


```
// plugin.ts
const plugin:PluginInterface = {

    install (app: App) {
           app.config.global.globalProperties.http = http
    }
}
```

```
//plugin.d.ts
declare interface PluginInterface {
  install: PluginInstallFunction,
  initVue: (instance: App, layout: any) => App
}
```


## 在window上挂载自定义属性
```
 global{
    interface Window {
        webkit: any
        Vue: any,
        _hmt: any,
        msRequestAnimationFrame?:any
        mozRequestAnimationFrame?:any
        WeixinJSBridge: any
        wx: any
    }
}

```


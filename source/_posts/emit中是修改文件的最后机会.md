---
title: emit中是修改文件的最后机会
author:
  - 徐勇超
tags: []
categories:
  - webpack
comments: true
date: 2020-06-19 15:47:09
updated: 2020-06-19 15:47:09
---

以一个 webpack-console-clear 插件为例，去掉每一个文件中 console 函数

```javascript
compiler.hooks.emit.tapAsync('emit', (compilation, callback) => {
    compilation.chunks.forEach(chunk => {
      chunk.files.forEach(filename => {
        var source = compilation.assets[filename].source()

        var consoleName = ['console', 'window.console']
        var consoleType = ['log', 'info', 'warn', 'error', 'assert', 'count', 'clear', 'group',
          'groupEnd', 'groupCollapsed', 'trace', 'debug', 'dir', 'dirxml', 'profile', 'profileEnd',
          'time', 'timeEnd', 'timeStamp', 'table', 'exception']

        const rConsole = new RegExp('(' + consoleName.join('|') + ')' + '.(?:' + consoleType.join('|') + ')\\s{0,}\\([^;]*\\)(?!\\s*[;,]?\\s*\\/\\*\\s*NotClearConsole\\s*\\*\\/)\\s{0,};?', 'gi')

        source = source.replace(rConsole, function () {
          return source.replaceWith || ''
        })

        compilation.assets[filename] = {
          source: function () {
            return source
          },
          size: function () {
            return source.length
          }
        }
      })
    })
    callback()
  })
```


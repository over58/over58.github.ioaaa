---
title: codemirror基本配置
author:
  - 徐勇超
tags:
  - js
  - codemirror
date: 2019-09-9 22:51:12
categories: 
  - 插件
---
```
export const editorOption = {
  tabSize: 2,
  styleActiveLine: true,
  line: true,
  mode: 'text/x-nginx-conf',
  lineNumbers: true,  // 显示行号
  theme: 'solarized',  // 设置主题
  keyMap: 'sublime',  // 绑定sublime
  fullScreen: false,  // 全屏模式
  matchBrackets: true,  // 括号匹配
  indentWithTabs: true,
  readOnly: false
}
import { codemirror } from 'vue-codemirror'
import { editorOption } from '@/api/convention'
require('codemirror/keymap/sublime.js')


<div style="width: 80%;">
   <codemirror v-model="templateForm.content" :options="editorOption"></codemirror>
</div>


<style>
.CodeMirror {
  height: 360px;
}
.CodeMirror-fullscreen {
  z-index: 9999;
}
</style>
｀｀｀

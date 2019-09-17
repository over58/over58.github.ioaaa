---
title: vue-cli3中iview按需引入
author:
  - 徐勇超
tags:
  - js
  - vue
  - webpack
date: 2019-09-17 19:16:59
categories:
---

1.安装babel-plugin-import插件
```
cnpm install babel-plugin-import --save-dev
```

2. 在文件.babelrc中添加配置
```
"plugins": [
    "transform-vue-jsx", "transform-runtime",
    ["import", {
      "libraryName": "iview",
      "libraryDirectory": "src/components"
    }]
  ]
]
```
3. 在plugins文件夹中新建一个iview.js文件
```import Vue from 'vue'
import 'iview/dist/styles/iview.css'
import {
  Row,
  Col,
  Switch,
  Form,
  FormItem,
  Select,
  Input,
  InputNumber,
  Button,
  Icon,
  Card,
  Modal,
  Menu,
  MenuItem,
  Submenu,
  Message,
  Notice,
  Layout,
  Sider,
  Content,
  Tag,
  Table,
  Poptip,
  Page,
  Timeline,
  TimelineItem,
  Tabs,
  TabPane,
  Tooltip,
  Alert,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio
} from 'iview'

Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('iSwitch', Switch)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Select', Select)
Vue.component('Input', Input)
Vue.component('InputNumber', InputNumber)
Vue.component('Button', Button)
Vue.component('Icon', Icon)
Vue.component('Card', Card)
Vue.component('Modal', Modal)
Vue.component('Card', Card)
Vue.component('Menu', Menu)
Vue.component('Submenu', Submenu)
Vue.component('MenuItem', MenuItem)
Vue.component('Layout', Layout)
Vue.component('Sider', Sider)
Vue.component('Content', Content)
Vue.component('Tag', Tag)
Vue.component('Table', Table)
Vue.component('Poptip', Poptip)
Vue.component('Page', Page)
Vue.component('Timeline', Timeline)
Vue.component('TimelineItem', TimelineItem)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
Vue.component('Tooltip', Tooltip)
Vue.component('Alert', Alert)
Vue.component('Checkbox', Checkbox)
Vue.component('CheckboxGroup', CheckboxGroup)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)

Vue.component('Message', Message)
Vue.component('Notice', Notice)
```
4.在main.js文件中
```
// import iView from 'iview'
// Vue.use(iView)
import '@/plugins/iview
```

5. 到这里基本完成，但是还有一些iview的全局API是需要额外处理的，这里就不多说了
---
title: dataTable中自定义列排序问题
author:
  - 徐勇超
tags:
  - js
  - dataTable
date: 2019-09-10 22:49:54
categories:
  - 插件
---

在使用dataTables的时候，有些列中会是一些包含内容的按钮或链接，不是单纯的文字内容。那么dataTables会将这些内容视为字符串，进行排序，有时候这不符合我们的期望。那么就需要自己能够灵活的指定某些列按照我们的意愿进行排序，幸运的是dataTable支持这样的插件拓展。
1. 首先创建一个文件叫dataTables.sort.plungin.js，加入以下代码。

    
```
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "html-percent-pre": function (a) {
        var x = String(a).replace(/<[\s\S]*?>/g, "");    //去除html标记
        x = x.replace(/&amp;nbsp;/ig, "");                   //去除空格
        x = x.replace(/%/, "");                          //去除百分号
        return parseFloat(x);
    },

    "html-percent-asc": function (a, b) {                //正序排序引用方法
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "html-percent-desc": function (a, b) {                //倒序排序引用方法
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});
```

<!-- more -->

2.在前台页面中加入以下的 js 引用。

```
<script type="text/javascript" src="jquery.dataTables.js"></script>
<script type="text/javascript" src="dataTables.numericComma.js"></script> 
<script type="text/javascript">
            var oTable1 = $('#table_report').dataTable({
                "aoColumnDefs": [
                    { "sType": "html-percent", "aTargets": [8] },    //指定列号使用自定义排序
                ],
                "bLengthChange": true, //开关，是否显示每页大小的下拉框
                "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "所有"]],
                'iDisplayLength': 25, //每页显示10条记录
                'bFilter': true,  //是否使用内置的过滤功能
                "bInfo": true, //开关，是否显示表格的一些信息
                "bPaginate": true //开关，是否显示分页器
            });
        });
</script>
```

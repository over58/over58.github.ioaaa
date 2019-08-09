---
title: list转成tree型数据结构
author:
  - 徐勇超
date: 2019-08-09 14:53:18
tags:
categories:
---

```
function convert(list) {
	const res = []
  const map = list.reduce((res, v) => (res[v.id] = v, res), {})
	for (const item of list) {
		if (item.parentId === 0) {
			res.push(item)
			continue
		}
		if (item.parentId in map) {
			const parent = map[item.parentId]
			parent.children = parent.children || []
			parent.children.push(item)
		}
	}
	return res
}
```
原始 list 数据 如下
```
let list =[
  {id:1,name:'部门A',parentId:0},
  {id:2,name:'部门B',parentId:0},
  {id:3,name:'部门C',parentId:1},
  {id:4,name:'部门D',parentId:1},
  {id:5,name:'部门E',parentId:2},
  {id:6,name:'部门F',parentId:3},
  {id:7,name:'部门G',parentId:2},
  {id:8,name:'部门H',parentId:4},
  {id:9,name:'部门H',parentId:8}
];
const result = convert(list);
```
 ### 结果
```

[
    {
        "id":1,
        "name":"部门A",
        "parentId":0,
        "children":[
            {
                "id":3,
                "name":"部门C",
                "parentId":1,
                "children":[
                    {
                        "id":6,
                        "name":"部门F",
                        "parentId":3
                    }
                ]
            },
            {
                "id":4,
                "name":"部门D",
                "parentId":1,
                "children":[
                    {
                        "id":8,
                        "name":"部门H",
                        "parentId":4,
                        "children":[
                            {
                                "id":9,
                                "name":"部门H",
                                "parentId":8
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id":2,
        "name":"部门B",
        "parentId":0,
        "children":[
            {
                "id":5,
                "name":"部门E",
                "parentId":2
            },
            {
                "id":7,
                "name":"部门G",
                "parentId":2
            }
        ]
    }
]
```
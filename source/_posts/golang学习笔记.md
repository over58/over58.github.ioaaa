# 数组

1. 数组是**值类型**
2. 数组的三种定义方式， var, : , […]int
3. 函数的参数传递只有一种传递，就是值传递

# slice

1. slice是一个array的view,本身不存储数据，slice可以向后扩展（cap中进行拓展），不可以向前拓展 

2. Slice: ptr, len, cap

3. 如果添加元素时大于cap, 系统会分配一个新的array. 由于值传递的关系，必须要接受append的返回值， s = append(s, val)

4. 创建

   1. S1  = []int{1,2,3,4,5} 
   2. Append(s1, val)
   3. make([]int, 16 , 32)    type, len, cap

5. 删除

   ```go
   s2 = append(s2[:3], s2[4:]... )
   ```

<!-- more -->

# Map

## 定义

```go
var s = map[string]string  ={
  "name": "tom",
  "age": 20,
  "sex": "man"
}

//简单map
map[K]V 
//复合map
map[K]map[K2]V

//空map
make(map[string]string)
```

## 取值

```go
courseNamem, ok : = m['cause']

如果没有取到对应的map的值，会自动的返回空， 为了防止这种情况，添加了ok来判断map是不是真的有这个key 
```

## 遍历

range

## map的key

1. 使用哈希表，必须可以比较相等
2. 除了slice,map,funcion 的内建类型都可以作为key



# 面向对象	

## 结构体

1. 只支持封装，不支持继承和多态

2. 没有class,只有struct

   ```go
   type treeNode struct{
   	value int
   	left, right *treeNode
   }
   
   
   func (node treeNode) print() {
   	fmt.Println(node.value)
   }
   
   //可以更改原值， 通过传个地址进去
   func (node *treeNode) setValue (val int) {
     node.vlaue = val
   }
   ```

3. nil指针也可以调用方法




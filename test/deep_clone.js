// 浅拷贝
function clone (source) {
  let target = {}
  for (let key in source){
    target[key] = source[key]
  }
  return target
}

// 深拷贝

function deep_clone1 (source) {
  if (typeof source === 'object') {
    let target = {}
    for(let key in source) {
      target[key] = deep_clone1(source[key])
    }
    return target
  }else{
    return source
  }
}

const source = {
  field1: 1,
  field2: undefined,
  field3: 'ConardLi',
  field4: {
      child: 'child',
      child2: {
          child2: 'child2'
      }
  },
  field5: ['a', 'b', 'c']
};

// var target = deep_clone1(source)
// source.field4 = 'hello'
// console.log(source)
// console.log(target)

// for (let i in ['a', 'b', 'c']) {
//   console.log(i)
// }

// 考虑数组
function deep_clone2 (source) {
  if (typeof source === 'object') {
    let target = Array.isArray(source) ? [] : {}
    for(let key in source) {
      target[key] = deep_clone2(source[key])
    }
    return target
  }else{
    return source
  }
}

// 考虑循环引用
function deep_clone3 (source, map = new Map()) {
  if (typeof source === 'object') {
    let target = Array.isArray(source) ? [] : {}
    // 专门处理循环引用问题（object类型)
    if(map.get(source)) {
      return map.get(source)
    }
    map.set(source, target)

    for(let key in source) {
      target[key] = deep_clone3(source[key], map)
    }
    return target
  }else{
    return source
  }
}

const source2 = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8]
};
source2.b = source2;

console.log(source2)
var target1 = deep_clone3(source2)
console.log(target1)


function isType(type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`
  }
}

var  isObject = isType('Object')
var  isArray = isType('Array')
var  isMap = isType('Map')
var  isSet = isType('Set')
var  isBoolean = isType('Boolean')
var  isDate = isType('Date')
var  isError = isType('Error')
var  isNumber = isType('Number')
var  isRegExp = isType('RegExp')
var  isString = isType('String')
var  isSymbol = isType('Symbol')

console.log(isArray([]))
console.log(isDate(new Date()))
console.log(isError( new Error() ))
console.log(isString('string'))

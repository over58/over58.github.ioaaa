var obj = {
  name: 'Tom',
  sex: 'man'
}

console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
console.log(Object.getOwnPropertyDescriptor(obj, 'sex'))


Object.defineProperty(obj, 'phone', {
})

console.log(Object.getOwnPropertyDescriptor(obj, 'phone'))

var obj2 ={}
Object.defineProperty(obj2, 'name', {
  get () {
    console.log('getter')
    return this._name
  },
  configable: false
})
console.log('----')
console.log(obj2)
console.log(obj2.name)

obj2.name = '后期更改的value'
console.log(obj2.name)
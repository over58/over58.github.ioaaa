
/*
* 添加自定义事件
* 全部事件 (类型[category]+操作[action]+标签[label])
* */

var statistics = {}

const readAloudID = '2306a802782087441eacb63a2407394e'

statistics.mergeObject = (source = {}, target = {}) => {
  const result = { ...source }
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      result[key] = target[key]
    }
  }
  return result
}

let BaiDuReady = false
statistics.addBaiDuTongJi = id => {
  const url = 'https://hm.baidu.com/hm.js?' + id
  window._hmt = window._hmt || []
  if (BaiDuReady) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    document.body.appendChild(script)
    script.addEventListener('load', () => {
      resolve()
      BaiDuReady = true
    })
    script.addEventListener('error', err => {
      reject(err)
    })
  })
}

statistics.pushEvent = option => {
  // 指定什么情况下不要埋点
  // const reg = /test|dev|prod/
  // if (reg.test(window.location.origin)) {
  //   return false
  // }

  const defaultOpt = {
    category: '',
    action: '',
    label: '',
    value: ''
  }
  const opt = statistics.mergeObject(defaultOpt, option)
  const { category, action, label, value } = opt
  return statistics.addBaiDuTongJi(opt.eventID).then(() => {
    window._hmt.push(['_trackEvent', category, action, label, value])
  })
}

//  埋点
statistics.pushBaiDuEvent = option => {
  const opt = { ...option }
  opt.eventID = readAloudID
  return statistics.pushEvent(opt)
}


var push = function (option) {
  statistics.pushBaiDuEvent(option)
  return statistics.pushBaiDuEvent
}

push.show = function (category, label, value = '') {
  utils.log(category, label, value)
  statistics.pushBaiDuEvent({
    category,
    label,
    action: 'show',
    value
  })
  report({
    event: category,
    tag: label,
    type: 1
  })
  return statistics.pushBaiDuEvent
}

push.click = function (category, label, value = '') {
  utils.log(category, label, value)
  statistics.pushBaiDuEvent({
    category,
    label,
    action: 'click',
    value
  })
  report({
    event: category,
    tag: label,
    type: 2
  })
  return statistics.pushBaiDuEvent
}

window.$push = push
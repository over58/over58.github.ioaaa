---
title: vue实现文件下载
date: 2019-03-21 10:45:33
tags: [js, vue]
---

### 原理
```
<a href="url" download="文件名.后缀名">
```

### 实际使用场景
上面的原理中适合开放的资源下载，http请求中无需验证时使用。在实际使用过程中，a标签中的url中直接设置header比较麻烦且不安全，
而且从开发规范上api一般上要封装一下（header中需要一些特定设置），放到统一的文件。

解决办法：下载相关和api responseType设置为blob(!!!重要)，在以blob形式获取到文件之后js创建一个a标签，设置url和downlaod后并触发，最后释放url资源并删除创建的a标签
```
api:
downloadFile (url) => {
  axios.get(url, {
    params: {

    },
    headers: {

    },
    // 重要
    responseType: 'blob'
  })
}


html: 
<button @click="download">下载</button>


js: 
  function downlaod (param){
    api.downloadFile(param).then(data => {
      if (!data) {
        this.$Message.error('下载内容为空')
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', etcdCluster + '.zip')
        
      document.body.appendChild(link)
      link.click()
      //释放URL对象所占资源
      window.URL.revokeObjectURL(url)
      //用完即删
      document.body.removeChild(link)
    }).catch(err => {
      console.log('err: ', err)
    })
  } 
    
```

### MDN相关链接
https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL
https://developer.mozilla.org/zh-CN/docs/Web/API/URL/revokeObjectURL
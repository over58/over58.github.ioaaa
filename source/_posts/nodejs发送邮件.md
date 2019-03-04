---
title: nodejs发送邮件
date: 2019-03-04 10:44:17
tags: [nodejs]
---

<!-- more -->

```
var express = require('express')
const nodemailer = require('nodemailer')
const app = express()
const PORT = process.env.PORT || 3000

// 配置163邮箱
let transporter = nodemailer.createTransport({
  service: 'smpt.163.com',
  host: 'smtp.163.com',
  secureConnection: true,
  port:    465,
  auth: {
    user: 'XXXX@163.com',
    pass: 'XXXX'
  }
});
// 配置gmail邮箱
// let transporter  = nodeMailer.createTransport('SMTP',{
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   secure: true,
//   port:465,
//   auth: {
//       //邮箱
//       user: 'XXXXXXX@gmail.com',
//       //登入密码
//       pass: 'XXXXXXX',
//   }   
// });

let defaultOpions = {
  from: 'XXX@163.com',
  to: 'XXX@qq.com',
  subject: '主题',
  text: '内容',
  html: '<b>内容</b>'
}

app.get('/', (req, res) => {
  transporter.sendMail(defaultOpions, (err, info) => {
    if(err) {
      console.error(err)
    }else{
      console.log(err, info)
    }
    res.send()
  })
})

app.listen(PORT, () => {
  console.log('start service')
})
```
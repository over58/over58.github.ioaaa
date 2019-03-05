---
title: webhook-demo
date: 2019-03-05 09:46:15
tags:
---

```
var http = require('http')
  , exec = require('exec')


const PORT = process.env.PORT || 9988


let transporter = nodemailer.createTransport({
  service: 'smpt.163.com',
  host: 'smtp.163.com',
  secureConnection: true,
  port:    465,
  auth: {
    user: 'XXX@163.com',
    pass: 'XXXXXXX'
  }
});

let defaultOpions = {
  from: 'yongchao blog <XXX@163.com>',
  to: 'XXXX@qq.com',
  subject: 'yongchao blog',
  html: '<b>blog deploy success !</b>'
}

var deployServer = http.createServer(function(request, response) {
  if (request.url.search(/deploy\/?$/i) > 0) {
 
    var commands = [
      'make restart' //这是我自定义的重新部署的代码
    ].join(' && ')
 
    exec(commands, function(err, out, code) {
      if (err instanceof Error) {
        response.writeHead(500)
        response.end('Server Internal Error.')
        throw err
      }
      process.stderr.write(err)
      process.stdout.write(out)
      response.writeHead(200)
      response.end('Deploy Done.')
      transporter.sendMail(defaultOpions, (err, info) => {
          if(err) {
                  console.error(err)
          }else{
              console.log(err, info)
          }
      })
    })
 
  } else {
 
    response.writeHead(404)
    response.end('Not Found.')
 
  }
})
deployServer.listen(PORT, () => {
  console.log('start service' + PORT)
})


```
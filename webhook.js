var express = require('express')
const nodemailer = require('nodemailer')
const app = express()
var exec = require('exec');

const PORT = process.env.PORT || 9988


let transporter = nodemailer.createTransport({
  service: 'smpt.163.com',
  host: 'smtp.163.com',
  secureConnection: true,
  port:    465,
  auth: {
    user: '13639628276@163.com',
    pass: 'hello@230058'
  }
});

let defaultOpions = {
  from: 'yongchao blog <13639628276@163.com>',
  to: '2658553345@qq.com',
  subject: 'yongchao blog',
  html: '<b>blog deploy success !</b>'
}

app.get('/deploy', (req, res) => {
  exec(['make restart'], function(err, info) {
      if(err) {
          console.error(err)
      }else{
        transporter.sendMail(defaultOpions, (err, info) => {
            if(err) {
                    console.error(err)
            }else{
                console.log(err, info)
            }
            res.send()
        })
    
      }
    })
})
app.listen(PORT, () => {
    console.log('start service' + PORT)
})

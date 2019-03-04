var http = require('http')
  , exec = require('exec')


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

var deployServer = http.createServer(function(request, response) {
  if (request.url.search(/deploy\/?$/i) > 0) {
 
    var commands = [
      'make restart'
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


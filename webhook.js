var http = require('http')
  , exec = require('exec')

const nodemailer = require('nodemailer');
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
  if (request.url.search(/deploy$/) > 0) {
 
    var commands = [
      'make restart'
    ].join(' && ')
 
    exec(commands, function(err, out, code) {
	console.log(err, out)
      if (err instanceof Error) {
        response.writeHead(500)
        response.end('Server Internal Error.')
        throw err
      }else{
      	process.stderr.write(err)
      	process.stdout.write(out)
      	transporter.sendMail(defaultOpions, (err, info) => {
          if(err) {
                  console.error(err)
          }else{
		response.writeHead(200)
      		response.end('Deploy Done.')
          }
      	})
      }
    })
 
  } else {
 
    response.writeHead(404)
    response.end('Not Found.')
 
  }
})
deployServer.listen(PORT, () => {
  console.log('start service' + PORT)
})


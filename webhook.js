var http = require('http')
  , exec = require('exec')
const nodemailer = require('nodemailer');

const PORT = 9988
let transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  service: 'smtp.163.com', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
  port: 465, // SMTP 端口
  secureConnection: true, // 使用了 SSL
  auth: {
    user: '13639628276@163.com',
    // 这里密码不是qq密码，是你设置的smtp授权码
    pass: 'hello@230058',
  }
});
function getEmailContent(content){
  return {
    from: '"yongchao blog" <13639628276@163.com>', // sender address
    to: '2658553345@qq.com', // list of receivers
    subject: '博客部署任务', // Subject line
    html: '<b>'+ content +'</b>'
  };
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
      let mailOptions = getEmailContent('部署成功！')
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
      });
    })

  } else {

    response.writeHead(404)
    response.end('Not Found.')

  }
})
deployServer.listen(PORT, function(){
	console.log('start service')
})

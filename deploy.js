let exec = require('child_process').execSync
let chalk  = require('chalk')

let commands = [
  'git add .',
  'git commit -m "update artcile"',
  'git push origin master',
  'hexo d -g'
]

commands.forEach(command => {
  exec(command)
})

console.log(chalk.green('部署成功！'));
let exec = require('child_process').execSync
let chalk  = require('chalk')

let commands = [
  'git add .',
  'git commit -m "update artcile"',
  'git push origin master',
  'hexo d -g'
]

let comments = [
  "添加暂存",
  "编辑提交信息",
  "提交代码",
  "开启部署..."
]
commands.forEach(command => {
  exec(command)
})

console.log(chalk.green('部署成功！'));
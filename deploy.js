let exec = require('child_process').execSync
let chalk  = require('chalk')

let commands = [
  'git add .',
  'git commit -m "update artcile"',
  'git push origin myblog'
]

let comments = [
  "添加暂存...",
  "编辑提交信息...",
  "提交代码中..."
]
commands.forEach((command, index) => {
  console.log(chalk.yellowBright(comments[index]))
  exec(command)
})

console.log(chalk.green('部署成功！'));
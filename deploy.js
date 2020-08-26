let exec = require('child_process').execSync
let chalk  = require('chalk')
const ora = require('ora')
const spinner = ora('start...').start()

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
  spinner.text = 'loading'
  console.log(chalk.yellowBright(comments[index]))
  exec(command)
})

spinner.succeed('success!')
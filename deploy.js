let exec = require('child_process').execSync
let chalk  = require('chalk')
const ora = require('ora')
const spinner = ora('start...').start()

let commands = [
  'git add .',
  'git commit -m "update artcile"',
  'git push origin myblog'
]

commands.forEach((command, index) => {
  spinner.text = 'loading'
  exec(command)
})

spinner.succeed(chalk.green('success!'))
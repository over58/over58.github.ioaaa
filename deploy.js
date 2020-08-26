let exec = require('child_process').execSync
let chalk  = require('chalk')
const ora = require('ora')
const spinner = ora('start...').start()

let commands = [
  'git add .',
  'git commit -m "feat: update artcile"',
  'git push origin myblog'
]

spinner.text = 'loading'
commands.forEach((command, index) => {
  exec(command)
})

spinner.succeed(chalk.green('success!'))
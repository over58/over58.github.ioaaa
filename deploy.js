let execSync = require('child_process').execSync
let chalk  = require('chalk')
const ora = require('ora')
const spinner = ora().start(chalk.bgGrey('start...\n'))

let commands = [
  'git add .',
  'git commit -m "feat: update artcile"',
  'git push origin myblog'
]

spinner.text = 'loading'
commands.forEach((command) => {
  execSync(command)
})

spinner.succeed(chalk.green('success!'))
let execSync = require('child_process').execSync
let chalk  = require('chalk')
const ora = require('ora')
const spinner = ora().start(chalk.blue('start...\n'))

spinner.text = 'loading'
spinner.color = "yellow"

let commands = [

  'git add .',
  'git commit -m "feat: update article"',
  'git push origin myblog'
]

commands.forEach((command) => {
  try {
    execSync(command)
    
  } catch (error) {
    console.log(error)
  }
})
  
spinner.succeed(chalk.green('success!'))
# 常用的npm package	

- [commander.js](https://github.com/tj/commander.js)，可以自动的解析命令和参数，用于处理用户输入的命令。
- [download-git-repo](https://github.com/flipxfx/download-git-repo)，下载并提取 git 仓库，用于下载项目模板。
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)，通用的命令行用户界面集合，用于和用户进行交互。
- [handlebars.js](https://github.com/wycats/handlebars.js)，模板引擎，将用户提交的信息动态填充到文件中。
- [ora](https://github.com/sindresorhus/ora)，下载过程久的话，可以用于显示下载中的动画效果。
- [chalk](https://github.com/chalk/chalk)，可以给终端的字体加上颜色。
- [log-symbols](https://github.com/sindresorhus/log-symbols)，可以在终端上显示出 √ 或 × 等的图标



作者：Rick_Lee
		链接：https://juejin.cn/post/6844903875808346120
		来源：掘金
		著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

<!-- more -->

# 一个例子

```js
	#!/usr/bin/env node
const chalk = require('chalk')
console.log('Hello, cli!')
console.log(chalk.green('init创建'))
const fs = require('fs')
const program = require('commander')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const ora = require('ora')
const symbols = require('log-symbols')
const handlebars = require('handlebars')
program
  .version(require('./package').version, '-v, --version')
  .command('init <name>')
  .action(name => {
    console.log(name)
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'author',
          message: '请输入你的名字'
        }
      ])
      .then(answers => {
        console.log(answers.author)
        const lqProcess = ora('正在创建...')
        lqProcess.start()
        download(
          'direct:https://github.com/Chant-Lee/rick-cli-templates1.git',
          name,
          { clone: true },
          err => {
            if (err) {
              lqProcess.fail()
              console.log(symbols.error, chalk.red(err))
            } else {
              lqProcess.succeed()
              const fileName = `${name}/package.json`
              const meta = {
                name,
                author: answers.author
              }
              if (fs.existsSync(fileName)) {
                const content = fs.readFileSync(fileName).toString()
                const result = handlebars.compile(content)(meta)
                fs.writeFileSync(fileName, result)
              }
              console.log(symbols.success, chalk.green('创建成功'))
            }
          }
        )
      })
  })
program.parse(process.argv)


```


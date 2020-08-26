"use strict";

var execSync = require('child_process').execSync;

var chalk = require('chalk');

var ora = require('ora');

var spinner = ora().start(chalk.blue('start...\n'));
spinner.text = 'loading';
spinner.color = "yellow";
var commands = ['git add .', 'git commit -m "feat: update artcile"', 'git push origin myblog'];
commands.forEach(function (command) {
  execSync(command);
});
spinner.succeed(chalk.green('success!'));
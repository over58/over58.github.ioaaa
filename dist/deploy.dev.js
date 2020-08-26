"use strict";

var exec = require('child_process').execSync;

var chalk = require('chalk');

var ora = require('ora');

var spinner = ora('start...').start();
var commands = ['git add .', 'git commit -m "update artcile"', 'git push origin myblog'];
spinner.text = 'loading';
commands.forEach(function (command, index) {
  exec(command);
});
spinner.succeed(chalk.green('success!'));
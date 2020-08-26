"use strict";

var exec = require('child_process').execSync;

var chalk = require('chalk');

var ora = require('ora');

var spinner = ora('start...').start();
var commands = ['git add .', 'git commit -m "update artcile"', 'git push origin myblog'];
commands.forEach(function (command, index) {
  spinner.text = 'loading';
  exec(command);
});
spinner.succeed(chalk.green('success!'));
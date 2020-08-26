"use strict";

var execSync = require('child_process').execSync;

var chalk = require('chalk');

var ora = require('ora');

var spinner = ora().start('start...');
var commands = ['git add .', 'git commit -m "feat: update artcile"', 'git push origin myblog'];
spinner.text = 'loading';
commands.forEach(function (command) {
  execSync(command);
});
spinner.succeed(chalk.green('success!'));
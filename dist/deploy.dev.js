"use strict";

var exec = require('child_process').execSync;

var chalk = require('chalk');

var ora = require('ora');

var spinner = ora('start...');
var commands = ['git add .', 'git commit -m "update artcile"', 'git push origin myblog'];
var comments = ["添加暂存...", "编辑提交信息...", "提交代码中..."];
commands.forEach(function (command, index) {
  spinner.text = 'loading';
  console.log(chalk.yellowBright(comments[index]));
  exec(command);
});
spinner.succeed('success!');
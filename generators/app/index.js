const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  setupGitignore() {
    const file = this.destinationPath('.gitignore');
    const lines = require('./gitignore');
    const gitignore = this.fs.read(file).split(/\s+/);
    lines.forEach(_ => {
      if (!gitignore.includes(_)) gitignore.push(_);
    });
    this.fs.write(file, lines.join('\n') + '\n');
  }
};

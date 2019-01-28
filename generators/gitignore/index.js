const Generator = require('yeoman-generator');
const gitignoreLines = require('./gitignore');

module.exports = class extends Generator {
  setupGitignore() {
    const file = this.destinationPath('.gitignore');
    let gitignore = [];
    if (this.fs.exists(file)) {
      gitignore = this.fs.read(file).split(/\s+/);
    }
    gitignoreLines.forEach((_) => {
      if (!gitignore.includes(_)) {
        gitignore.push(_);
      }
    });
    this.fs.write(file, `${gitignore.join('\n')}\n`);
  }
};

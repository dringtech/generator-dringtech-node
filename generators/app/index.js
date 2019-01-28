const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  setupNyc () {
    this.npmInstall(['nyc'], { 'save-dev': true });
    this.fs.copyTpl(
      this.templatePath('nycrc'),
      this.destinationPath('.nycrc'),
    );
  }

  setupMocha () {
    this.npmInstall([
      'mocha',
      'chai',
      'chai-as-promised',
      'sinon',
      'sinon-chai',
      'mocha-multi-reporters',
      'mochawesome',
    ], { 'save-dev': true });

    const files = [
      'test/mocha.opts',
      'test/reporter-config.json',
      'test/helpers/mochaSetup.js',
    ];
    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
      );
    });
  }

  setupGitignore () {
    const file = this.destinationPath('.gitignore');
    const lines = require('./gitignore');
    const gitignore = this.fs.read(file).split(/\s+/);
    lines.forEach(_ => {
      if (!gitignore.includes(_)) gitignore.push(_);
    });
    this.fs.write(file, lines.join('\n') + '\n');
  }
};

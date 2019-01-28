const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  setupScripts () {
    const packageFile = this.destinationPath('package.json');
    const scripts = require('./package-scripts.js');
    const config = this.fs.readJSON(packageFile);
    config.scripts = Object.assign({}, config.scripts, scripts);
    this.fs.write(packageFile, JSON.stringify(config, null, 2) + '\n');
  }

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
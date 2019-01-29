const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  install() {
    this.npmInstall([
      'mocha',
      'chai',
      'chai-as-promised',
      'sinon',
      'sinon-chai',
      'mocha-multi-reporters',
      'mochawesome',
      'nyc',
    ], { 'save-dev': true });
  }

  configuring() {
    const files = [
      'test/mocha.opts',
      'test/reporter-config.json',
      'test/helpers/mochaSetup.js',
    ];
    files.forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
      );
    });
    this.fs.copy(
      this.templatePath('nycrc'),
      this.destinationPath('.nycrc'),
    );
  }
};

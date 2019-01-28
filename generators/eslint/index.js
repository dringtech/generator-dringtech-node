const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  install () {
    this.npmInstall([
      'eslint',
      'eslint-config-standard',
      'eslint-plugin-standard',
      'eslint-plugin-promise',
      'eslint-plugin-import',
      'eslint-plugin-node',
      'eslint-plugin-mocha',
    ], { 'save-dev': true });
  };

  setupEslint () {
    this.fs.copy(
      this.templatePath('eslintrc.js'),
      this.destinationPath('.eslintrc.js'),
    );
    this.fs.copy(
      this.templatePath('test/eslintrc.js'),
      this.destinationPath('test/.eslintrc.js'),
    );
    this.fs.copy(
      this.templatePath('eslintignore'),
      this.destinationPath('.eslintignore'),
    );
  }
};

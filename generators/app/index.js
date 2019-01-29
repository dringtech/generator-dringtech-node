const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../eslint'));
    this.composeWith(require.resolve('../gitignore'));
    this.composeWith(require.resolve('../scripts'));
    this.composeWith(require.resolve('../test'));
  };
};

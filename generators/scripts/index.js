const { existsSync } = require('fs');
const Generator = require('yeoman-generator');

const packageScripts = {
  test: 'nyc --all mocha',
  build: 'npm prune',
  lint: 'eslint .',
  precoverage: 'npm test',
  coverage: 'nyc check-coverage',
  scan: 'npm audit',
};

module.exports = class extends Generator {
  setupScripts() {
    const packageFile = this.destinationPath('package.json');
    let config = {};
    if (existsSync(packageFile)) {
      config = this.fs.readJSON(packageFile);
    }
    config.scripts = Object.assign({}, config.scripts, packageScripts);
    this.fs.writeJSON(packageFile, config, null, 2);
  }
};

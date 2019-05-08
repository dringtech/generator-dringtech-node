const { existsSync } = require('fs');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'checkbox',
        name: 'frameworks',
        message: 'Which frameworks do you want to use?',
        choices: ['react'],
        store: true,
      },
    ]);  
  }

  install() {
    let packageList = [
      'rollup',
      'rollup-plugin-node-resolve',
      'rollup-plugin-commonjs',
      'rollup-plugin-babel',
      'rollup-plugin-copy',
      'rollup-plugin-uglify',
      '@babel/core',
      '@babel/plugin-transform-runtime',
      '@babel/preset-env',
      '@babel/runtime',
    ];

    if (this.answers.frameworks.includes('react')) {
      packageList = packageList.concat([
        '@babel/preset-react',
        'react',
        'react-dom',
      ]);
    }

    this.npmInstall(packageList, { 'save-dev': true });
  }

  configuring() {
    const packageFile = this.destinationPath('package.json');
    let config = {};
    if (existsSync(packageFile)) {
      config = this.fs.readJSON(packageFile);
    }
    config.scripts = Object.assign({}, config.scripts, {
      build: 'rollup --config',
    });
    this.fs.writeJSON(packageFile, config, null, 2);

    let externals = [];
    let globals = [];

    if (this.answers.frameworks.includes('react')) {
      externals.push("'react'");
      globals.push("react: 'React'");
      externals.push("'react-dom'");
      globals.push("'react-dom': 'ReactDOM'");
    }
    this.fs.copyTpl(
      this.templatePath('rollup.config.js'),
      this.destinationPath('rollup.config.js'),
      {
        frameworks: this.answers.frameworks,
        externals: externals,
        globals: globals,
      },
    );
  }
};

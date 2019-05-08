describe('rollup subgenerator', function () {
  const fs = require('fs-extra');
  const path = require('path');
  const { assert, runGenerator } = require('../helpers');

  let entryCwd;

  before(function () {
    entryCwd = process.cwd();
  });

  after(function () {
    process.chdir(entryCwd);
  });

  const files = [
    'rollup.config.js',
  ];

  files.forEach((file) => {
    it(`should create ${file}`, function () {
      return runGenerator('rollup')
        .withPrompts({ frameworks: [] })
        .then(() => {
          assert.file(file);
        });
    });
  });

  it('should add script to the package file', function () {
    return runGenerator('rollup')
      .then(() => {
        assert.fileContent('package.json', /"build": "rollup --config"/);
      });
  });

  it('should not overwrite package scripts', function () {
    return runGenerator('rollup')
      .inTmpDir(function (dir) {
        // `dir` is the path to the new temporary directory
        fs.copySync(path.join(__dirname, '../fixtures/rollup'), dir)
      })
      .then(() => {
        assert.fileContent('package.json', /"build": "rollup --config"/);
        assert.fileContent('package.json', /"run": "npm start"/);
      });
  });

  describe('react config', function () {
    it('should add react and react-dom packages', function () {
      return runGenerator('rollup')
        .withPrompts({ frameworks: ['react'] })
        .then(() => {
          assert.fileContent('rollup.config.js', /react/);
          assert.fileContent('rollup.config.js', /react-dom/);
        });
    });
  });
});

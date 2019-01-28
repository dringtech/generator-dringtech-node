describe('eslint subgenerator', function () {
  const { assert, runGenerator } = require('../helpers');
  let entryCwd;

  before(function () {
    entryCwd = process.cwd();
  });

  after(function () {
    process.chdir(entryCwd);
  });

  const files = [
    '.eslintrc.js',
    '.eslintignore',
    'test/.eslintrc.js',
  ];

  files.forEach((file) => {
    it(`should create ${file}`, function () {
      return runGenerator('eslint')
        .then(() => assert.file(file));
    });
  });
});

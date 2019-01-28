describe('eslint subgenerator', function () {
  const path = require('path');
  const generator = path.join(__dirname, '../../generators/eslint');
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

  files.forEach(file => {
    it(`should create ${file}`, function () {
      return runGenerator(generator)
        .then(_ => assert.file(file));
    });
  });
});

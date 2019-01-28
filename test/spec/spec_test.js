describe('test subgenerator', function () {
  const { assert, runGenerator } = require('../helpers');

  let entryCwd;

  before(function () {
    entryCwd = process.cwd();
  });

  after(function () {
    process.chdir(entryCwd);
  });

  const files = [
    'test/helpers/mochaSetup.js',
    'test/mocha.opts',
    'test/reporter-config.json',
    '.nycrc',
  ];

  files.forEach((file) => {
    it(`should create ${file}`, function () {
      return runGenerator('test')
        .then(() => {
          assert.file(file);
        });
    });
  });
});

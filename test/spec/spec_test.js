describe('test subgenerator', function () {
  const path = require('path');
  const generator = path.join(__dirname, '../../generators/test');

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
      return runGenerator(generator)
        .then(() => {
          assert.file(file);
        });
    });
  });
});

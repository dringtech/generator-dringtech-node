describe('scripts subgenerator', function () {
  const path = require('path');
  const { writeFileSync } = require('fs');
  const { assert, runGenerator } = require('../helpers');
  let entryCwd;

  before(function () {
    entryCwd = process.cwd();
  });

  after(function () {
    process.chdir(entryCwd);
  });

  const scripts = [
    'test',
    'lint',
    'precoverage',
    'coverage',
    'scan',
  ];

  scripts.forEach((script) => {
    it(`should create ${script} script`, function () {
      return runGenerator('scripts')
        .inTmpDir(() => {
          // TODO: Why is this not working with an async write?
          writeFileSync('package.json', '{ "scripts": {} }');
        })
        .then(() => {
          const config = require(path.join(process.cwd(), 'package.json'));
          assert(Object.keys(config.scripts).includes(script));
        });
    });
  });

  it('should work if the package.json file is missing', function () {
    return runGenerator('scripts')
      .then(() => {
        assert.fileContent('package.json', 'scripts');
      });
  });

  it('should work if the scripts key is not defined', function () {
    return runGenerator('scripts')
      .inTmpDir(() => {
        writeFileSync('package.json', '{}');
      })
      .then(() => {
        assert.fileContent('package.json', 'scripts');
      });
  });
});

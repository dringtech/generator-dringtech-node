describe('scripts subgenerator', function () {
  const path = require('path');
  const fs = require('fs');
  const generator = path.join(__dirname, '../../generators/scripts');
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

  scripts.forEach(script => {
    it(`should create ${script} script`, function () {
      return runGenerator(generator)
        .inTmpDir(_ => {
          fs.writeFileSync('package.json', '{ "scripts": {} }');
        })
        .then(_ => {
          const config = require(path.join(process.cwd(), 'package.json'));
          assert(Object.keys(config.scripts).includes(script));
        });
    });
  });

  it('should work if the package.json file is missing', function () {
    return runGenerator(generator)
      .then(_ => {
        assert.fileContent('package.json', 'scripts');
      });
  });

  it('should work if the scripts key is not defined', function () {
    return runGenerator(generator)
      .inTmpDir(_ => {
        fs.writeFileSync('package.json', '{}');
      })
      .then(_ => {
        assert.fileContent('package.json', 'scripts');
      });
  });
});

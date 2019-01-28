describe('gitignore submodule', function () {
  const { writeFile } = require('fs');
  const { runGenerator } = require('../helpers');

  let entryCwd;

  before(function () {
    entryCwd = process.cwd();
  });

  after(function () {
    process.chdir(entryCwd);
  });

  it('should create a .gitignore file if one does not exist', function () {
    return runGenerator('gitignore')
      .then(async function () {
        assert.file('.gitignore');
      });
  });

  it('should maintain the current content of the .gitignore file', function () {
    return runGenerator('gitignore')
      .inTmpDir(async () => {
        await writeFile('.gitignore', 'ITEM1\n', () => {});
      })
      .then(() => {
        assert.fileContent('.gitignore', 'ITEM1');
      });
  });

  it('should append the requested items', function () {
    return runGenerator('gitignore')
      .then(async function () {
        assert.fileContent([
          ['.gitignore', '/node_modules/'],
          ['.gitignore', '/output/'],
          ['.gitignore', '/.nyc_output/'],
          ['.gitignore', '/coverage/'],
        ]);
      });
  });

  it('should not duplicate items', function () {
    return runGenerator('gitignore')
      .inTmpDir(async () => {
        await writeFile('.gitignore', '/node_modules/\n\n', () => {});
      })
      .then(async () => {
        assert.noFileContent('.gitignore', /(\/node_modules\/[.\n]*?){2}/m);
      });
  });
});

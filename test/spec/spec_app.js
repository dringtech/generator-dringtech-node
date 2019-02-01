describe('root generator', function () {
  const { spy } = require('sinon');
  const Generator = require('yeoman-generator');
  const { runGenerator, assert } = require('../helpers');
  let entryCwd;

  before(function () {
    entryCwd = process.cwd();
  });

  after(function () {
    process.chdir(entryCwd);
  });

  beforeEach(function () {
    spy(Generator.prototype, 'composeWith');
  });

  afterEach(function () {
    Generator.prototype.composeWith.restore();
  });

  [
    'eslint',
    'gitignore',
    'scripts',
    'test',
  ].forEach((subgen) => {
    it(`should compose the ${subgen}`, function () {
      return runGenerator('app')
        .then(() => {
          assert(Generator.prototype.composeWith.calledWithMatch(subgen));
        });
    });
  });
});

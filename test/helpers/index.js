const path = require('path');
const { run } = require('yeoman-test');
const assert = require('yeoman-assert');

function getGeneratorPath(name) {
  return path.join(__dirname, '../../generators', name);
}

function runGenerator(name) {
  return run(getGeneratorPath(name));
}

module.exports = {
  runGenerator,
  assert,
};

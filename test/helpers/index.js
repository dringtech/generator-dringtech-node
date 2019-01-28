const path = require('path');
const { run } = require('yeoman-test');

function getGeneratorPath(name) {
  return path.join(__dirname, '../../generators', name);
}

function runGenerator(name) {
  return run(getGeneratorPath(name));
}

module.exports = { runGenerator };

const yeomanTest = require('yeoman-test');
const yeomanAssert = require('yeoman-assert');

process.env.NODE_ENV = 'test';

// Set up globals
global.assert = assert = yeomanAssert;
global.runGenerator = runGenerator = yeomanTest.run;

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);

process.env.NODE_ENV = 'test';

// Set up globals
global.expect = expect = chai.expect;

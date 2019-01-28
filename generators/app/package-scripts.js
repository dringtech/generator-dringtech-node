module.exports = {
  test: 'nyc --all mocha',
  build: 'npm install',
  'quality:lint': 'eslint .',
  'prequality:coverage': 'npm test',
  'quality:coverage': 'nyc check-coverage',
  'security:vulnerable-packages': 'npm audit',
};

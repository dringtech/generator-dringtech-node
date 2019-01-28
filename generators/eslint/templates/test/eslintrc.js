module.exports = {
  plugins: [
    'mocha',
  ],
  env: {
    mocha: true,
  },
  rules: {
  },
  overrides: [{
    files: ['spec_*.js'],
    rules: {
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'mocha/no-mocha-arrows': 'error',
      'mocha/no-exclusive-tests': 'error',
      'mocha/no-skipped-tests': 'warn',
      'func-names': 'off', // describe and if use unnamed functions
      'prefer-arrow-callback': 'off', // Arrow callback breaks describe and if, OK elsewhere
      'quote-props': 'off', // proxyquire uses quoted string literals to replace modules
      'global-require': 'off', // Best practice is to limit scope of to test suites
      'import/no-dynamic-require': 'off', // Test suite uses generator functions
    },
  },
  {
    files: ['helpers/mochaSetup.js'],
    rules: {
      'no-undef': 'off',
      'no-multi-assign': 'off',
      'prefer-destructuring': 'off',
    },
  }],
};

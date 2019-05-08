import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import { uglify } from 'rollup-plugin-uglify';

const NODE_ENV = process.env.NODE_ENV || 'development';

const isDev = (NODE_ENV === 'development');

const babelConfig = {
  configFile: false,
  runtimeHelpers: true,
  exclude: 'node_modules/**', // only transpile our source code
  presets: [
    [ '@babel/env', { 'modules': false } ],
    <%_ if ( frameworks.includes('react')) { -%>
    [ '@babel/react', {} ],
    <%_ } -%>
  ],
  plugins: ['@babel/transform-runtime'],
};

const jsPlugins = [
  babel(babelConfig),
  resolve(),
  commonjs(),
  isDev || uglify(),
  copy({
    targets: [
      <%_ if ( frameworks.includes('react')) { -%>
      'node_modules/react/umd/react.development.js',
      'node_modules/react/umd/react.production.min.js',
      'node_modules/react-dom/umd/react-dom.development.js',
      'node_modules/react-dom/umd/react-dom.production.min.js',
      <%_ } -%>
    ],
    outputFolder: 'build/vendor',
  }),
];

export default [
  {
    input: 'src/main.js',
    output: {
      dir: 'build',
      format: 'iife',
    },
    plugins: jsPlugins,
    external: [ <%- externals.join(', ') %> ],
    globals: {
      <%- globals.join(',\n      ') %>
    }
  },
];

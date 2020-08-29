// @ts-check
module.exports = {
  plugins: ['simple-import-sort', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: { browser: true, node: true, es6: true },
  rules: require('./rules/babel'),
};

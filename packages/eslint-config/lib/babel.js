// @ts-check
module.exports = {
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: { browser: true, node: true, es6: true },
};

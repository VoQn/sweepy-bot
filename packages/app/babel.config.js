const ignore = [];
if (process.env.NODE_ENV !== 'test') {
  ignore.push('**/*.test.ts');
}

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ],
  ignore,
};

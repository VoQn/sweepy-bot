module.exports = function (api) {
  return {
    presets: [
      [
        '@babel/preset-env',
        { targets: { node: 'current' }, useBuiltIns: 'usage', corejs: 3 },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/proposal-object-rest-spread',
    ],
  };
};

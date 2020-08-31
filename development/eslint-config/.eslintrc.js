module.exports = {
  extends: [
    require.resolve('./config/babel'),
    require.resolve('./config/json'),
    require.resolve('./config/typescript'),
    require.resolve('./config/jest'),
    require.resolve('./config/prettier'),
  ],
};

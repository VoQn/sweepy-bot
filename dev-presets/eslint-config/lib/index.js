module.exports = {
  extends: [
    require.resolve('./babel'),
    require.resolve('./json'),
    require.resolve('./typescript'),
    require.resolve('./jest'),
    require.resolve('./prettier'),
  ],
};

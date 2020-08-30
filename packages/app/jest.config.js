module.exports = {
  preset: '@sweepy-bot/jest',
  name: 'app',
  displayName: 'app',
  testEnvironment: 'node',
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/$1',
  },
};

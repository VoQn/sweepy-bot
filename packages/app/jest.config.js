module.exports = {
  preset: '@sweepy-bot/jest',
  name: 'app',
  displayName: 'app',
  testEnvironment: 'node',
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/$1',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      packageJson: 'package.json',
    },
  },
};

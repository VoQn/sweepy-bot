module.exports = {
  preset: '@sweepy-bot/jest',
  name: 'sweepy-dock',
  displayName: 'sweepy-dock',
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

module.exports = {
  name: 'app',
  displayName: 'app',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'json', 'js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/.jest/transform.js',
  },
  // moduleNameMapper: {
  //   'src/(.*)': '<rootDir>/src/$1',
  // },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      packageJson: 'package.json',
    },
  },
  testMatch: ['<rootDir>/src/**/?(*.)(spec|test).(ts|js)?(x)'],
};

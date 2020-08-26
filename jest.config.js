module.exports = {
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'json', 'js'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },

  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      packageJson: 'package.json',
    },
  },
  testMatch: ['**/src/**/*.test.ts'],
};

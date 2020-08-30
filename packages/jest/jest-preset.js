const os = require('os');
const fs = require('fs');
const path = require('path');

const tsconfigPath = fs.existsSync(
  path.join(process.cwd(), 'tsconfig.test.json')
)
  ? 'tsconfig.test.json'
  : 'tsconfig.json';
const collectCoverage = process.env.COVERAGE ? true : false;

module.exports = {
  automock: false,
  bail: 0,
  clearMocks: false,
  collectCoverage,
  collectCoverageFrom: [
    './src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/*.test.{js,jsx,ts,tsx}',
    '!**/*.stories.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['json', 'html', 'lcov', 'text'],
  coverageThreshold: undefined,
  dependencyExtractor: undefined,
  displayName: undefined,
  errorOnDeprecated: true,
  extraGlobals: undefined,
  forceCoverageMatch: [''],
  globals: {
    'ts-jest': {
      tsConfig: tsconfigPath,
    },
    __JEST__: true,
  },
  maxConcurrency: os.cpus().length,
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  resetMocks: false,
  resetModules: false,
  restoreMocks: false,
  // rootDir: undefined,
  // roots: ["."],
  runner: 'jest-runner',
  setupFiles: [],
  setupFilesAfterEnv: [],
  snapshotResolver: undefined,
  snapshotSerializers: [],
  testEnvironment: 'node',
  testEnvironmentOptions: {},
  testMatch: [
    '**/__test__/**/*.[jt]s?(x)',
    '**/src/**/?(*.)(spec|test).[jt]s?(x)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testResultsProcessor: undefined,
  testRunner: 'jasmine2',
  testSequencer: '@jest/test-sequencer',
  testURL: 'http://localhost',
  timers: 'real',
  transform: {
    '\\.js$': ['babel-jest', { rootMode: 'upward' }],
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules'],
  unmockedModulePathPatterns: [],
  verbose: false,
  watchPathIgnorePatterns: [],
  watchPlugins: [],
};

module.exports = {
  preset: '@sweepy-bot/jest',
  name: 'physics',
  displayName: 'physics',
  rootDir: '.',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/**.test.{js,jsx,ts,tsx}',
  ],
};

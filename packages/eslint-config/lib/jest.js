module.exports = {
  plugins: ['jest'],
  overrides: [
    {
      files: [
        '*.test.ts',
        '*.test.tsx',
        '**/__test__/**/*.ts',
        '**/__test__/**/*.tsx',
        '*.test.js',
        '*.test.jsx',
        '**/__test__/**/*.js',
        '**/__test__/**/*.jsx',
      ],
      env: {
        'jest/globals': true,
      },
    },
  ],
};

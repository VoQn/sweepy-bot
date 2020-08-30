module.exports = {
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'default',
      format: [
        'camelCase',
        'PascalCase',
        // 'snake_case'
        'UPPER_CASE',
        // ID とかを許さない variation ( Id なら可 )
        // 'strictCamelCase'
        // 'StrictPascalCase'
      ],
      leadingUnderscore: 'allow',
    },
  ],
};

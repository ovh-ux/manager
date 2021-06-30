module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'lines-between-class-members': 'off',
        'import/extensions': 'off',
        'no-use-before-define': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
      },
    },
  ],
};

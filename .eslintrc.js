module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2, { 'SwitchCase': 1 }],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    'space-before-function-paren': ['error', 'always'],
    'lines-between-class-members': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'no-multi-spaces': 'error',
    'no-console': 2,
    'no-tabs': 2
  }
};

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "react-app"
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-unused-vars': 'error',
    'operator-linebreak': [2, 'before'],
    'space-before-function-paren': [
      'error',
      'never',
    ],
    semi: ['error', 'always'],
    'prefer-destructuring': ['error', {'object': true, 'array': false}],
    'linebreak-style': 0,
    'object-curly-spacing': ["error", "always"],
    quotes: ['error', 'single', 'avoid-escape'],
    'comma-dangle': ['error', 'always-multiline'],
    'import/no-cycle': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'arrow-parens': ['error', 'as-needed'],
    curly: 'off',
    'no-console': 'off',
    'camelcase': 'off',
  },
};
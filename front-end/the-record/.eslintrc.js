module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'global-require': 0,
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'no-console': 0,
    'no-alert': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'jsx-a11y/label-has-associated-control': 'off',
  },
}

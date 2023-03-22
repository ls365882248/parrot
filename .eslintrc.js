module.exports = {
  ignorePatterns: ['dist/*', 'node_modules/*', 'public/*'],
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    semi: ['error', 'always'],
    'no-useless-escape': 'off',
    'array-callback-return': 'error',
    'class-methods-use-this': 'off',
    'default-case': 'off',
    eqeqeq: 'error',
    'guard-for-in': 'error',
    'no-alert': 'error',
    'no-div-regex': 'error',
    'no-else-return': 'error',
    'no-extend-native': 'error',
    'no-var': 'error',
    'no-console': 'off',
    'no-empty': 'error',
    'no-unused-vars': 'off',
    'no-multiple-empty-lines': 'error',
    'no-unreachable': 'error',
    'no-param-reassign': 'error',
    'no-duplicate-imports': 'error',
    'no-restricted-imports': [
      'warn',
      {
        paths: [
          {
            name: 'lodash',
            message: '请使用 lodash-es 代替',
          },
        ],
      },
    ],
    '@typescript-eslint/no-unused-vars': ['off'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    // '@typescript-eslint/no-explicit-any': ['warning'],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'no-undef': 'off',
    'max-len': [
      'error',
      {
        code: 150,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-boolean-value': 'warn',
    'react/self-closing-comp': 'warn',
    'react/jsx-fragments': 'warn',
    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'never', children: 'never' },
    ],
    'react/jsx-handler-names': [
      'warn',
      {
        eventHandlerPrefix: 'on',
        eventHandlerPropPrefix: 'on',
      },
    ],
  },
};

const { resolve } = require('path');

const aliases = [
  ['core', './src/core'],
  ['shared', './src/shared'],
  ['modules', './src/modules'],
];

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  plugins: ['@typescript-eslint', 'immutable', 'import', 'prettier', 'promise', 'react', 'react-hooks', 'sonarjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['.next/**/*', 'node_modules/**/*'],
  settings: {
    'boundaries/types': ['pages'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: resolve(__dirname, 'tsconfig.json'),
      },
      webpack: {
        config: 'webpack.common.js',
      },
      alias: {
        map: aliases,
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.md'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    'jsx-a11y/anchor-is-valid': ['warn'],
    '@typescript-eslint/no-empty-interface': ['warn'],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/generic-type-naming': 'off',
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
          object: false,
        },
      },
    ],

    'immutable/no-let': 'error',
    'immutable/no-mutation': 'warn',

    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'error',
    'import/no-named-as-default': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default-member': 'off',

    'prettier/prettier': 'warn',

    'unicorn/consistent-function-scoping': 'warn',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
    'unicorn/no-reduce': 'off',
    'unicorn/prefer-includes': 'off',

    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-handler-names': 'off',
    'react/prop-types': 'off',
    'react/default-props-match-prop-types': 'warn',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',

    'sonarjs/no-duplicate-string': 'warn',

    'no-process-env': 'off',
    'id-length': ['warn', { exceptions: ['_'] }],
    'no-console': 'warn',
    'no-underscore-dangle': 'off',
    'sort-imports': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'global-require': 'off',
    'consistent-return': 'warn',
    'no-use-before-define': 'off',
    'no-shadow': 'off',
  },
  overrides: [
    {
      files: ['*.spec.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',

        'unicorn/consistent-function-scoping': 'off',

        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/no-identical-functions': 'off',

        'immutable/no-let': 'off',
      },
    },
  ],
};

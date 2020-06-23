const aliases = [
  ['core', './src/core'],
  ['shared', './src/shared'],
  ['modules', './src/modules'],
  ['app', './src/core/app'],
  ['theme', './src/core/theme'],
  ['components', './src/shared/components'],
  ['config', './src/shared/config'],
  ['context', './src/shared/context'],
  ['entity', './src/shared/entity'],
  ['utils', './src/shared/utils'],
  ['hooks', './src/shared/hooks'],
];

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'es/browser',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:boundaries/recommended',
  ],
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'sonarjs', 'promise', 'immutable', 'import', 'prettier', 'boundaries'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  ignorePatterns: ['lib/**/*', 'node_modules/**/*'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  settings: {
    'boundaries/types': [
      'assets',
      'core',
      'app',
      'layout',
      'theme',
      'modules',
      'shared',
      'components',
      'context',
      'config',
      'entity',
      'utils',
      'hooks',
    ],
    'boundaries/alias': aliases.reduce((aliasesMap, [alias, path]) => {
      return Object.assign(aliasesMap, { [alias]: path });
    }, {}),
    'boundaries/ignore': ['src/index.tsx'],
    'boundaries/no-import-ignored': true,
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
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
    'boundaries/no-private': [
      'error',
      {
        allowUncles: true,
      },
    ],
    'boundaries/entry-point': 'off',
    'boundaries/allowed-types': [
      'warn',
      {
        allow: {
          assets: [],
          core: ['core', 'modules', 'shared'],
          modules: ['assets', 'core', 'shared'],
          shared: ['shared', 'assets', 'core'],
        },
      },
    ],
    'immutable/no-let': 'error',
    'immutable/no-mutation': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
    'prettier/prettier': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/prop-types': 'off',
    'import/extensions': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-cycle': 'error',
    'react/require-default-props': 'warn',
    'react/default-props-match-prop-types': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    'no-underscore-dangle': 'off',
    'sort-imports': 'off',
    'unicorn/no-fn-reference-in-iterator': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/generic-type-naming': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-boolean-value': ['error', 'never'],
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'warn',
    'sonarjs/cognitive-complexity': ['error', 20],
    'id-length': 'warn',
    'react/jsx-handler-names': 'off',
  },
};

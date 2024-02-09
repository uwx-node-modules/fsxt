// @ts-check

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'google',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-type-checked'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: true,
    tsconfigRootDir: '.',
    ecmaFeatures: {
      impliedStrict: true
    },
  },
  env: {
    node: true, // just in case
    es6: true, // let, const, ``...
    mocha: true
  },
  'rules': {
    'quote-props': 'off',
    'indent': [
      'warn',
      4,
      {
        'SwitchCase': 1
      }
    ],
    'linebreak-style': [
      'off'
    ],
    'object-curly-spacing': [
      'off'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-console': 0,
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'max-len': 'off',
    'curly': 'off',
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/await-thenable': 'off',
    'new-cap': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    'operator-linebreak': ['error', 'before'],
    'strict': [
      'error',
      'never'
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  overrides: [
    {
      files: ['*.js', '*.mjs', '*.cjs', '*.jsx', '*.mjsx', '*.cjsx'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      rules: {
        'indent': [
          'warn',
          2,
          {
            'SwitchCase': 1
          }
        ],
      }
    },
    {
      files: ['lib/**/*.js', 'test/**.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      rules: {
        'indent': [
          'warn',
          4,
          {
            'SwitchCase': 1
          }
        ],
      }
    },
  ],
};
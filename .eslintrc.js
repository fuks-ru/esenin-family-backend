const resolver = require('eslint-config-fuks/resolver');

require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['eslint-config-fuks'],
  parserOptions: {
    project: [
      'entries/*/tsconfig.json',
      'entries/*/tsconfig.config.json',
      'tsconfig.eslint.json',
    ],
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '18.0.0',
    },
    'import/resolver': {
      [resolver]: {
        project: 'entries/*/tsconfig.json',
      },
    },
  },
  rules: {
    'jsdoc/require-jsdoc': ['off'],
    'i18next/no-literal-string': ['off'],
    'react/jsx-props-no-spreading': ['off'],
  },
};

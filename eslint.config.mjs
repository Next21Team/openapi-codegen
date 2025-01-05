import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

const stylisticConfigRules = {
  ...stylistic.configs.customize({
    indent: 'tab',
    jsx: true,
    semi: true,
    quoteProps: 'consistent',
    quotes: 'single',
  }).rules,
  '@stylistic/indent-binary-ops': ['off'],
  '@stylistic/jsx-one-expression-per-line': ['off'],
  '@stylistic/jsx-quotes': ['error', 'prefer-single'],
  '@stylistic/multiline-ternary': ['off'],
  '@stylistic/max-len': ['error', {
    code: 150,
    ignoreComments: true,
    ignoreTemplateLiterals: true
  }],
};

export default tseslint.config({
  extends: [
    js.configs.recommended, 
    ...tseslint.configs.recommended,
  ],
  files: [
    'packages/core/src/**/*.ts',
    'packages/cli/src/**/*.ts',
    'packages/amxx-pawn-easyhttp/src/**/*.ts',
  ],
  languageOptions: {
    ecmaVersion: 2020
  },
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    ...stylisticConfigRules,
  },
})

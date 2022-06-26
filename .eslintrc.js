module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'no-throw-literal': 0
  },
  overrides: [
    {
      files: [
        '**/*.spec.ts'
      ],
      env: {
        jest: true
      }
    }
  ]
}

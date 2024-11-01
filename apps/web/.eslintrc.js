/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true
  },
  // https://stackoverflow.com/questions/45399923/eslint-disable-warning-defined-but-never-used-for-specific-function
  rules: {
    'no-unused-vars': 'off'
  }
}

const groups = [
  ['^\\u0000'],
  ['^react', '^@mui/material', '^@mui/lab'],
  ['^'],
  ['^@/\\w'],
  ['^jotai', '^@/store/\\w'],
  ['^@/types/', '\\u0000$'],
]

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'simple-import-sort', '@limegrass/import-alias'],
  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': ['error', { groups }],
    '@limegrass/import-alias/import-alias': ['error', { aliasConfigPath: './tsconfig.app.json' }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  settings: {
    'import/resolver': { typescript: { alwaysTryTypes: true, project: './tsconfig.json' } },
  },
}

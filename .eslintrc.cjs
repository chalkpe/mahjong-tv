module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'type'],
        pathGroups: [
          { pattern: 'react', group: 'builtin', position: 'after' },
          { pattern: 'react-dom/*', group: 'builtin', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-dom'],
        alphabetize: { order: 'asc' },
        'newlines-between': 'never',
      },
    ],
  },
}

const prettier = require('eslint-plugin-prettier');
const jest = require('eslint-plugin-jest');
const js = require('@eslint/js');

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', '*.log', '.env*', '.vscode/**', '.idea/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    plugins: {
      prettier,
      jest,
    },
    rules: {
      'prettier/prettier': ['error'],
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prefer-const': 'warn',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
      },
    },
    rules: {
      'jest/expect-expect': 'off',
    },
  },
];

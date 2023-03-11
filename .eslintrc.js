module.exports = {
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};

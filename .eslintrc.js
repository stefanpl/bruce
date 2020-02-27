module.exports = {
  extends: ['airbnb-typescript/base', 'plugin:prettier/recommended'],
  rules: {
    'no-plusplus': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        'src/tests/**', 
        'webpack.config.js',
      ],
      optionalDependencies: false,
    }],
    'no-use-before-define': ['error', { functions: false, variables: true, classes: true }],
	  'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
  },
  plugins: ['prettier'],
}

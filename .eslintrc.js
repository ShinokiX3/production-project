module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'linebreak-style': ['error', 'windows'],
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.ts', '.tsx', 'ts'] },
		],
		'import/no-unresolved': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				'': 'never',
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'import/prefer-default-export': 'off',

		'no-unused-vars': 'warn',
		'@typescript-eslint/no-unused-vars': ['off'],

		'react/require-default-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/function-component-definition': 'off',
		'no-shadow': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-underscore-dangle': 'off',

		'comma-dangle': 'off',
		'@typescript-eslint/comma-dangle': ['error', 'only-multiline'],

		'react/jsx-props-no-spreading': 'warn',
		'react/prop-types': 'off',
	},
	globals: {
		__IS_DEV__: true,
	},
};

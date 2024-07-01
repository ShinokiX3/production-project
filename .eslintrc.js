module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:i18next/recommended',
        'plugin:storybook/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
        'shinoki-eslint-plugin',
        'unused-imports',
    ],
    rules: {
        // indent: [2, 'tab'],
        // 'no-tabs': 0,
        // 'react/jsx-indent': [2, 'tab'],
        // 'react/jsx-indent-props': [2, 'tab'],
        // 'linebreak-style': 'off',
        'unused-imports/no-unused-imports': 'error',
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

        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: [
                    'data-testid',
                    'to',
                    'target',
                    'justify',
                    'align',
                    'direction',
                    'gap',
                    'role',
                    'as',
                    'border',
                    'feature',
                    'color',
                    'variant',
                    'size',
                    'wrap',
                ],
            },
        ],

        'max-len': ['error', { code: 150, ignoreComments: true }],

        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',

        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'jsx-props-no-spreading': 'off',
        'react/no-array-index-key': 'off',
        'shinoki-eslint-plugin/path-checker': ['error', { alias: '@' }],
        'shinoki-eslint-plugin/public-api-imports': [
            'error',
            {
                alias: '@',
                testFilesPatterns: [
                    '**/*.test.{ts,tsx}',
                    '**/*.story.{ts,tsx}',
                    '**/StoreDecorator.tsx',
                ],
            },
        ],
        'react/jsx-max-props-per-line': ['error', { maximum: 3 }],
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
};

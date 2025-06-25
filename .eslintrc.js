module.exports = {
    root: true,
    env: {
        es2022: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
        'no-console': 'warn',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'prefer-const': 'error',
        'no-var': 'error',
    },
    overrides: [
        {
            files: ['packages/frontend/**/*.{js,jsx}'],
            env: {
                browser: true,
                es2022: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:react-hooks/recommended',
                'plugin:jsx-a11y/recommended',
                'prettier',
            ],
            plugins: ['react', 'react-hooks', 'jsx-a11y', 'prettier'],
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            settings: {
                react: {
                    version: 'detect',
                },
            },
            rules: {
                'prettier/prettier': 'error',
                'react/react-in-jsx-scope': 'off',
                'react/prop-types': 'warn',
                'react-hooks/rules-of-hooks': 'error',
                'react-hooks/exhaustive-deps': 'warn',
                'jsx-a11y/anchor-is-valid': 'warn',
                'no-console': 'warn',
            },
        },
        {
            files: ['packages/backend/**/*.js'],
            env: {
                node: true,
                es2022: true,
                jest: true,
            },
            extends: ['eslint:recommended', 'prettier'],
            plugins: ['prettier'],
            rules: {
                'prettier/prettier': 'error',
                'no-console': 'off', // Allow console in backend
                'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            },
        },
        {
            files: ['**/*.test.js', '**/__tests__/**/*.js'],
            env: {
                jest: true,
            },
            extends: ['plugin:jest/recommended'],
            plugins: ['jest'],
        },
    ],
};

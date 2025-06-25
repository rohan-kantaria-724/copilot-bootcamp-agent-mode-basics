# Linting and Formatting

This project uses ESLint for code linting and Prettier for code formatting to maintain consistent code quality across the monorepo.

## Setup

The project is configured with:

- **ESLint**: Code linting with rules for JavaScript and React
- **Prettier**: Code formatting with consistent style rules
- **VS Code Integration**: Automatic formatting on save and lint error highlighting

## Configuration Files

- `.eslintrc.js` - ESLint configuration for the entire monorepo
- `.prettierrc.json` - Prettier formatting rules
- `.eslintignore` - Files to exclude from linting
- `.prettierignore` - Files to exclude from formatting
- `.vscode/settings.json` - VS Code editor integration settings
- `.vscode/extensions.json` - Recommended VS Code extensions

## Available Scripts

### Root Level Scripts

```bash
# Lint all packages
npm run lint

# Fix auto-fixable linting issues in all packages
npm run lint:fix

# Format all files with Prettier
npm run format

# Check if files are properly formatted
npm run format:check
```

### Package-Specific Scripts

```bash
# Frontend linting
npm run lint:frontend
npm run lint:fix:frontend

# Backend linting
npm run lint:backend
npm run lint:fix:backend
```

## ESLint Rules

### General Rules (All JavaScript files)

- `prettier/prettier`: Enforces Prettier formatting
- `no-console`: Warns about console statements
- `no-unused-vars`: Errors on unused variables
- `prefer-const`: Prefers const over let when possible
- `no-var`: Disallows var declarations

### Frontend-Specific Rules (React)

- React hooks rules for proper hook usage
- JSX accessibility rules for better accessibility
- React-specific best practices

### Backend-Specific Rules (Node.js)

- Allows console statements (common in server environments)
- Node.js environment globals

### Test-Specific Rules

- Jest-specific rules and globals for test files

## Prettier Configuration

The project uses the following Prettier settings:

- **Semi**: true (semicolons required)
- **Single Quote**: true (prefer single quotes)
- **Trailing Comma**: "es5" (trailing commas where valid in ES5)
- **Tab Width**: 2 spaces
- **Print Width**: 100 characters
- **Arrow Parens**: "avoid" (no parens for single param arrows)

## VS Code Integration

The project includes VS Code configuration for:

- **Format on Save**: Automatically formats files when saving
- **ESLint Auto-fix**: Automatically fixes ESLint issues on save
- **Recommended Extensions**: Suggests useful extensions for the project

### Recommended Extensions

1. **ESLint** (`dbaeumer.vscode-eslint`) - JavaScript linting
2. **Prettier** (`esbenp.prettier-vscode`) - Code formatting
3. **Path Intellisense** (`christian-kohler.path-intellisense`) - File path autocompletion

## Workflow

1. **During Development**:
   - VS Code will show linting errors in real-time
   - Files are automatically formatted on save
   - Use `npm run lint:fix` to fix auto-fixable issues

2. **Before Committing**:
   - Run `npm run lint` to check for any issues
   - Run `npm run format:check` to verify formatting
   - Use the pre-commit hook for automated checks

3. **In CI/CD**:
   - Include `npm run lint` and `npm run format:check` in your pipeline
   - Fail builds if linting or formatting issues are found

## Troubleshooting

### Common Issues

1. **ESLint errors after installing new dependencies**:

   ```bash
   npm install
   npm run lint:fix
   ```

2. **Prettier conflicts with ESLint**:
   - The configuration is set up to work together
   - Use `npm run lint:fix` to apply both ESLint and Prettier fixes

3. **VS Code not showing linting errors**:
   - Install the recommended extensions
   - Reload VS Code window
   - Check the ESLint output panel for errors

### Ignoring Rules

For rare cases where you need to ignore specific rules:

```javascript
// Disable for a single line
// eslint-disable-next-line no-console
console.log('Debug message');

// Disable for a block
/* eslint-disable no-console */
console.log('Debug message 1');
console.log('Debug message 2');
/* eslint-enable no-console */
```

## Customization

To modify the linting or formatting rules:

1. **ESLint rules**: Edit `.eslintrc.js`
2. **Prettier rules**: Edit `.prettierrc.json`
3. **Package-specific rules**: Use the `overrides` section in `.eslintrc.js`

Remember to run `npm run lint:fix` and `npm run format` after making configuration changes.

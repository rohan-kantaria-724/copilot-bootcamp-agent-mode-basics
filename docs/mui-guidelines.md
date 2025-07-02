# Material-UI (MUI) Guidelines

This document outlines the guidelines and best practices for using Material-UI (MUI) components in this project.

## Overview

Material-UI is a React component library that implements Google's Material Design principles. It provides a comprehensive set of pre-built components that are accessible, customizable, and performant.

## Installation and Setup

### Core Dependencies

```bash
npm install @mui/material @emotion/react @emotion/styled
```

### Additional Dependencies (as needed)

```bash
# For icons
npm install @mui/icons-material

# For date pickers and advanced components
npm install @mui/x-date-pickers

# For data grid
npm install @mui/x-data-grid
```

### Theme Configuration

Always use MUI's theme system for consistent styling across the application:

```javascript
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## Component Usage Guidelines

### 1. Import Organization

Follow this import order for MUI components:

```javascript
// React imports
import React, { useState, useEffect } from 'react';

// MUI component imports (alphabetical order)
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

// MUI icons (if needed)
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

// Other imports
import './App.css';
```

### 2. Layout Components

#### Container
Use `Container` for main page layouts:

```javascript
<Container maxWidth="lg">
  {/* Page content */}
</Container>
```

#### Box
Use `Box` for flexible layout and spacing:

```javascript
<Box sx={{ p: 2, mb: 3 }}>
  {/* Content */}
</Box>
```

#### Paper
Use `Paper` for elevated content sections:

```javascript
<Paper elevation={2} sx={{ p: 2 }}>
  {/* Section content */}
</Paper>
```

### 3. Typography

Use MUI's Typography component instead of HTML headings and paragraphs:

```javascript
<Typography variant="h4" component="h1" gutterBottom>
  Page Title
</Typography>

<Typography variant="h6" component="h2" gutterBottom>
  Section Title
</Typography>

<Typography variant="body1">
  Regular text content
</Typography>
```

### 4. Forms and Inputs

#### TextField
Use `TextField` for all text inputs:

```javascript
<TextField
  fullWidth
  label="Item Name"
  value={inputValue}
  onChange={handleChange}
  placeholder="Enter item name"
  margin="normal"
  variant="outlined"
/>
```

#### Buttons
Use MUI Button component with appropriate variants:

```javascript
// Primary action
<Button variant="contained" color="primary" onClick={handleSubmit}>
  Add Item
</Button>

// Secondary action
<Button variant="outlined" color="secondary" onClick={handleCancel}>
  Cancel
</Button>

// Destructive action
<Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
  Delete
</Button>
```

### 5. Data Display

#### Tables
Use MUI Table components for data display:

```javascript
<TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="items table">
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((item) => (
        <TableRow key={item.id} hover>
          <TableCell component="th" scope="row">
            {item.id}
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell align="right">
            <Button
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

## Styling Guidelines

### 1. Use the sx Prop

Prefer the `sx` prop for component-specific styling:

```javascript
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 3,
    bgcolor: 'background.paper',
    borderRadius: 1,
  }}
>
  {/* Content */}
</Box>
```

### 2. Theme Values

Use theme values instead of hard-coded values:

```javascript
// Good
<Box sx={{ p: 2, mb: 3, bgcolor: 'primary.main' }}>

// Avoid
<Box sx={{ padding: '16px', marginBottom: '24px', backgroundColor: '#1976d2' }}>
```

### 3. Responsive Design

Use theme breakpoints for responsive design:

```javascript
<Box
  sx={{
    width: { xs: '100%', sm: '50%', md: '33%' },
    p: { xs: 1, sm: 2, md: 3 },
  }}
>
  {/* Responsive content */}
</Box>
```

## Component Composition

### Higher-Order Components

Create reusable component patterns:

```javascript
// Custom section wrapper
function Section({ title, children, ...props }) {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }} {...props}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

// Usage
<Section title="Add New Item">
  <TextField label="Item Name" fullWidth />
  <Button variant="contained" sx={{ mt: 2 }}>
    Add Item
  </Button>
</Section>
```

## Accessibility Guidelines

### 1. Use Semantic Components

Always use appropriate semantic components and props:

```javascript
<Button
  aria-label={`Delete ${item.name}`}
  onClick={() => handleDelete(item.id)}
>
  <DeleteIcon />
</Button>
```

### 2. Form Labels

Ensure all form inputs have proper labels:

```javascript
<TextField
  id="item-name"
  label="Item Name"
  required
  error={!!error}
  helperText={error || 'Enter a unique item name'}
/>
```

### 3. Table Accessibility

Use proper table structure for screen readers:

```javascript
<Table aria-label="items data table">
  <TableHead>
    <TableRow>
      <TableCell component="th" scope="col">ID</TableCell>
      <TableCell component="th" scope="col">Name</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell component="th" scope="row">{item.id}</TableCell>
      <TableCell>{item.name}</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Performance Best Practices

### 1. Import Only What You Need

Use named imports to reduce bundle size:

```javascript
// Good
import { Button, TextField } from '@mui/material';

// Avoid
import * as MUI from '@mui/material';
```

### 2. Component Composition

Break down complex components into smaller, reusable pieces:

```javascript
// Separate table components
function ItemsTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

function ItemsTableRow({ item, onDelete }) {
  return (
    <TableRow hover>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>
        <Button color="error" onClick={() => onDelete(item.id)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
```

## Error Handling and Loading States

### Loading States

Use MUI components for loading indicators:

```javascript
import { CircularProgress, Skeleton } from '@mui/material';

// For buttons
<Button disabled={loading} variant="contained">
  {loading ? <CircularProgress size={20} /> : 'Submit'}
</Button>

// For content placeholders
{loading ? (
  <Skeleton variant="rectangular" width="100%" height={200} />
) : (
  <TableContainer>
    {/* Table content */}
  </TableContainer>
)}
```

### Error Display

Use Alert component for error messages:

```javascript
import { Alert, AlertTitle } from '@mui/material';

{error && (
  <Alert severity="error" sx={{ mb: 2 }}>
    <AlertTitle>Error</AlertTitle>
    {error}
  </Alert>
)}
```

## Migration from Custom CSS

When migrating existing components to MUI:

1. **Replace HTML elements** with MUI components
2. **Convert CSS classes** to sx props or theme values
3. **Use MUI spacing** system instead of custom margins/padding
4. **Implement MUI color** palette instead of custom colors
5. **Test accessibility** and responsive behavior

### Example Migration

Before (Custom CSS):
```javascript
<div className="items-section">
  <h2>Items from Database</h2>
  <table className="items-table">
    {/* table content */}
  </table>
</div>
```

After (MUI):
```javascript
<Paper elevation={2} sx={{ p: 2 }}>
  <Typography variant="h6" gutterBottom>
    Items from Database
  </Typography>
  <TableContainer>
    <Table>
      {/* table content */}
    </Table>
  </TableContainer>
</Paper>
```

## Testing with MUI

When testing MUI components:

```javascript
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function renderWithTheme(component) {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
}

test('renders button with correct text', () => {
  renderWithTheme(<Button>Click me</Button>);
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
});
```

## Common Patterns

### Form with Validation

```javascript
function ItemForm({ onSubmit }) {
  const [values, setValues] = useState({ name: '' });
  const [errors, setErrors] = useState({});

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Item Name"
        value={values.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        fullWidth
      >
        Add Item
      </Button>
    </Box>
  );
}
```

### Responsive Grid Layout

```javascript
import { Grid } from '@mui/material';

<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    <Paper sx={{ p: 2 }}>Content 1</Paper>
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <Paper sx={{ p: 2 }}>Content 2</Paper>
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <Paper sx={{ p: 2 }}>Content 3</Paper>
  </Grid>
</Grid>
```

For more detailed information, refer to the [official MUI documentation](https://mui.com/).

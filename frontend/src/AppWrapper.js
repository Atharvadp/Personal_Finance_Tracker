import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Typography } from '@mui/material';

// Custom theme with palette & typography
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f7fa' },
    success: { main: '#388e3c' },
    error: { main: '#d32f2f' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: { fontWeight: 700, letterSpacing: '0.1em' },
    body1: { fontSize: '1.1rem' },
  },
});

export const AppWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        PERSONAL FINANCE TRACKER
      </Typography>
      {children}
    </Container>
  </ThemeProvider>
);

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from 'styled-components'
import theme from './theme'

test('renders the welcome text', () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
  const welcomeElement = screen.getByText('Happy coding!');
  expect(welcomeElement).toBeInTheDocument();
});

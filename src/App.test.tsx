import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders application header', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /Credit Cards Application/i, level: 1 });
  expect(headerElement).toBeInTheDocument();
});

test('renders user form initially', () => {
  render(<App />);
  const formTitle = screen.getByText(/Enter Your Details/i);
  expect(formTitle).toBeInTheDocument();
});

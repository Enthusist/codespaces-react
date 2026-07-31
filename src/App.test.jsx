import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page with hero title', () => {
  render(<App />);
  const heading = screen.getByText(/اكتشف مسارك المهني/i);
  expect(heading).toBeDefined();
});

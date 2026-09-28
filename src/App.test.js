import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Noma storefront', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /little details/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /most loved/i })).toBeInTheDocument();
});

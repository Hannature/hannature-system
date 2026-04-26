import { render, screen } from '@testing-library/react-native';

import App from './App';

test('renders the navigation shell with bottom tabs', () => {
  render(<App />);
  expect(screen.getAllByText('Sport').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Nutrition').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Recipes').length).toBeGreaterThan(0);
});

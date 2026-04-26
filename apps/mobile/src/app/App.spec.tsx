import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';

import { TabNavigator } from '../navigation/TabNavigator';
import { ThemeProvider } from './ThemeProvider';

test('renders bottom tabs with Sport, Nutrition, Recipes labels', () => {
  render(
    <ThemeProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ThemeProvider>,
  );
  expect(screen.getAllByText('Sport').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Nutrition').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Recipes').length).toBeGreaterThan(0);
});

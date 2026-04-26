import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { ComponentProps } from 'react';

import { useTheme } from '../app/ThemeProvider';
import { NutritionScreen } from '../screens/NutritionScreen';
import { RecipesScreen } from '../screens/RecipesScreen';
import { SportScreen } from '../screens/SportScreen';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

type IconName = ComponentProps<typeof Ionicons>['name'];

const tabIcons: Record<keyof TabParamList, IconName> = {
  Sport: 'barbell-outline',
  Nutrition: 'nutrition-outline',
  Recipes: 'restaurant-outline',
};

export function TabNavigator() {
  const tokens = useTheme();
  const { semantic } = tokens.colors;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: semantic.cta,
        tabBarInactiveTintColor: semantic.bodyText,
        tabBarStyle: {
          backgroundColor: semantic.surface,
          borderTopColor: semantic.border,
        },
        tabBarLabelStyle: {
          fontFamily: tokens.typography.fontFamilies.sans,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIcons[route.name]} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="Sport" component={SportScreen} />
      <Tab.Screen name="Nutrition" component={NutritionScreen} />
      <Tab.Screen name="Recipes" component={RecipesScreen} />
    </Tab.Navigator>
  );
}

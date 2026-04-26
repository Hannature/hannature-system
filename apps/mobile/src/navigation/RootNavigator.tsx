import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import type { ComponentProps } from 'react';

import { useTheme } from '../app/ThemeProvider';
import { LegalScreen } from '../screens/LegalScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RewardsScreen } from '../screens/RewardsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { TabNavigator } from './TabNavigator';
import type { DrawerParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();

type IconName = ComponentProps<typeof Ionicons>['name'];

const drawerIcons: Record<keyof DrawerParamList, IconName> = {
  MainTabs: 'home-outline',
  Profile: 'person-outline',
  Settings: 'settings-outline',
  Rewards: 'star-outline',
  Legal: 'document-text-outline',
};

export function RootNavigator() {
  const tokens = useTheme();
  const { semantic } = tokens.colors;

  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: semantic.surface },
        headerTintColor: semantic.titleText,
        headerTitleStyle: {
          fontFamily: tokens.typography.fontFamilies.serif,
        },
        drawerActiveTintColor: semantic.cta,
        drawerInactiveTintColor: semantic.bodyText,
        drawerStyle: { backgroundColor: semantic.background },
        drawerLabelStyle: {
          fontFamily: tokens.typography.fontFamilies.sans,
        },
        drawerIcon: ({ color, size }) => (
          <Ionicons name={drawerIcons[route.name]} color={color} size={size} />
        ),
      })}
    >
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ title: 'Home' }}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Rewards" component={RewardsScreen} />
      <Drawer.Screen name="Legal" component={LegalScreen} />
    </Drawer.Navigator>
  );
}

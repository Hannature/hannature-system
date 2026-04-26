import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from '../app/ThemeProvider';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { OnboardingConsentScreen } from '../screens/auth/OnboardingConsentScreen';
import { OnboardingGoalScreen } from '../screens/auth/OnboardingGoalScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import { useAuthStore } from '../state/useAuthStore';
import type { AuthParamList } from './types';

const Stack = createNativeStackNavigator<AuthParamList>();

export function AuthNavigator() {
  const tokens = useTheme();
  const { semantic } = tokens.colors;
  const status = useAuthStore((s) => s.status);

  // Authenticated but onboarding incomplete: jump straight into goal step.
  const initialRoute: keyof AuthParamList =
    status === 'authenticated' ? 'OnboardingGoal' : 'Welcome';

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerStyle: { backgroundColor: semantic.surface },
        headerTintColor: semantic.titleText,
        headerTitleStyle: {
          fontFamily: tokens.typography.fontFamilies.serif,
        },
        contentStyle: { backgroundColor: semantic.background },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="OnboardingGoal"
        component={OnboardingGoalScreen}
        options={{ title: '', headerBackVisible: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="OnboardingConsent"
        component={OnboardingConsentScreen}
        options={{ title: '', gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}

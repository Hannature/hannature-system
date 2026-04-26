import '../../global.css';

import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { initI18n } from '../i18n';
import { AuthNavigator } from '../navigation/AuthNavigator';
import { RootNavigator } from '../navigation/RootNavigator';
import { useAuthStore } from '../state/useAuthStore';
import { AppProviders } from './providers/AppProviders';
import { useTheme } from './ThemeProvider';

function SplashScreen() {
  const tokens = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: tokens.colors.semantic.background,
      }}
    >
      <ActivityIndicator color={tokens.colors.semantic.cta} />
    </View>
  );
}

function Gate() {
  const status = useAuthStore((s) => s.status);
  const onboardingComplete = useAuthStore((s) => s.onboardingComplete);
  const hydrate = useAuthStore((s) => s.hydrate);
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([initI18n(), hydrate()]).then(() => {
      if (!cancelled) setI18nReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [hydrate]);

  if (!i18nReady || status === 'loading') return <SplashScreen />;

  const showAuthFlow = status === 'unauthenticated' || !onboardingComplete;
  return (
    <NavigationContainer>
      {showAuthFlow ? <AuthNavigator /> : <RootNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProviders>
      <Gate />
    </AppProviders>
  );
}

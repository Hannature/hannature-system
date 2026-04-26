import { Button } from '@hannature/ui';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../app/ThemeProvider';
import { useAuthStore } from '../state/useAuthStore';

const pxToNumber = (value: string) => parseInt(value, 10);

export function SettingsScreen() {
  const tokens = useTheme();
  const { semantic } = tokens.colors;
  const { textStyles } = tokens.typography;
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={[styles.root, { backgroundColor: semantic.background }]}
    >
      <View style={styles.content}>
        <Text
          style={{
            fontFamily: textStyles.h2.fontFamily,
            fontSize: pxToNumber(textStyles.h2.fontSize),
            lineHeight: pxToNumber(textStyles.h2.lineHeight),
            fontWeight: textStyles.h2.fontWeight as '600',
            color: semantic.titleText,
          }}
        >
          Settings
        </Text>
        <Text
          style={{
            marginTop: 12,
            fontFamily: textStyles.body.fontFamily,
            fontSize: pxToNumber(textStyles.body.fontSize),
            lineHeight: pxToNumber(textStyles.body.lineHeight),
            fontWeight: textStyles.body.fontWeight as '400',
            color: semantic.bodyText,
          }}
        >
          {user
            ? `Signed in as ${user.fullName} (${user.email}).`
            : 'Preferences, notifications, and account controls.'}
        </Text>

        <View style={styles.cta}>
          <Button
            variant="secondary"
            accessibilityLabel="Sign out"
            onPress={() => {
              void logout();
            }}
            testID="settings-logout"
          >
            Sign out
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  cta: {
    marginTop: 24,
    alignSelf: 'flex-start',
  },
});

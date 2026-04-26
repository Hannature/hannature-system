import { Button } from '@hannature/ui';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../app/ThemeProvider';

const pxToNumber = (value: string) => parseInt(value, 10);

export interface PlaceholderScreenProps {
  title: string;
  subtitle: string;
  ctaLabel?: string;
}

export function PlaceholderScreen({
  title,
  subtitle,
  ctaLabel = 'Coming soon',
}: PlaceholderScreenProps) {
  const tokens = useTheme();
  const { semantic } = tokens.colors;
  const { textStyles } = tokens.typography;

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
          {title}
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
          {subtitle}
        </Text>
        <View style={styles.cta}>
          <Button accessibilityLabel={ctaLabel}>{ctaLabel}</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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

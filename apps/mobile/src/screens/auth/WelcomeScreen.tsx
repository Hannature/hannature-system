import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@hannature/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../app/ThemeProvider';
import type { AuthParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthParamList, 'Welcome'>;

const SLIDE_KEYS = ['valueProp', 'behavioral', 'privacy'] as const;

export function WelcomeScreen({ navigation }: Props) {
  const { t } = useTranslation('onboarding');
  const tokens = useTheme();
  const { semantic } = tokens.colors;
  const { width } = Dimensions.get('window');
  const [index, setIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    if (next !== index) setIndex(next);
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom', 'left', 'right']}
      style={[styles.root, { backgroundColor: semantic.background }]}
    >
      <FlatList
        style={styles.list}
        data={SLIDE_KEYS}
        keyExtractor={(k) => k}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]} testID={`welcome-slide-${item}`}>
            <Text
              style={{
                fontFamily: tokens.typography.fontFamilies.serif,
                fontSize: 28,
                color: semantic.titleText,
                textAlign: 'center',
              }}
            >
              {t(`welcome.slides.${item}.title`)}
            </Text>
            <Text
              style={{
                marginTop: 16,
                fontFamily: tokens.typography.fontFamilies.sans,
                fontSize: 16,
                lineHeight: 22,
                color: semantic.bodyText,
                textAlign: 'center',
              }}
            >
              {t(`welcome.slides.${item}.body`)}
            </Text>
          </View>
        )}
      />

      <View style={styles.dots}>
        {SLIDE_KEYS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor:
                  i === index ? semantic.cta : semantic.border,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <Button
          accessibilityLabel={t('welcome.cta.getStarted')}
          onPress={() => navigation.navigate('Register')}
          testID="welcome-get-started"
        >
          {t('welcome.cta.getStarted')}
        </Button>
        <View style={{ height: 12 }} />
        <Button
          variant="ghost"
          accessibilityLabel={t('welcome.cta.haveAccount')}
          onPress={() => navigation.navigate('Login')}
          testID="welcome-have-account"
        >
          {t('welcome.cta.haveAccount')}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  list: { flex: 1 },
  slide: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  actions: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
});

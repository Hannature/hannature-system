import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  CONSENT_VERSION,
  type ConsentItems,
} from '@hannature/shared-types';
import { Button, Modal } from '@hannature/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../app/ThemeProvider';
import type { AuthParamList } from '../../navigation/types';
import { useAuthStore } from '../../state/useAuthStore';

type Props = NativeStackScreenProps<AuthParamList, 'OnboardingConsent'>;

type ConsentKey = keyof ConsentItems;

const REQUIRED: ConsentKey[] = ['termsOfService', 'privacyPolicy'];

export function OnboardingConsentScreen({ route }: Props) {
  const { goal } = route.params;
  const { t } = useTranslation(['onboarding', 'legal']);
  const tokens = useTheme();
  const { semantic } = tokens.colors;
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);

  const [items, setItems] = useState<ConsentItems>({
    termsOfService: false,
    privacyPolicy: false,
    marketing: false,
  });
  const [openKey, setOpenKey] = useState<ConsentKey | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const canSubmit = REQUIRED.every((k) => items[k]);

  const toggle = (key: ConsentKey) =>
    setItems((prev) => ({ ...prev, [key]: !prev[key] }));

  const onSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await completeOnboarding(goal, items);
      // Auth gate flips; component will unmount.
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'consent/unknown');
    } finally {
      setSubmitting(false);
    }
  };

  const renderRow = (
    key: ConsentKey,
    legalKey: 'termsOfService' | 'privacyPolicy' | 'marketing',
    requiredFlag: 'required' | 'optional',
  ) => (
    <View style={styles.row} key={key}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: items[key] }}
        accessibilityLabel={t(`onboarding:consent.items.${key}.label`)}
        onPress={() => toggle(key)}
        testID={`consent-${key}`}
        style={[
          styles.checkbox,
          {
            backgroundColor: items[key] ? semantic.cta : 'transparent',
            borderColor: items[key] ? semantic.cta : semantic.border,
          },
        ]}
      >
        {items[key] ? (
          <Text style={{ color: semantic.ctaForeground, fontSize: 14 }}>✓</Text>
        ) : null}
      </Pressable>
      <View style={styles.rowText}>
        <Text
          style={{
            fontFamily: tokens.typography.fontFamilies.sans,
            fontSize: 15,
            color: semantic.titleText,
          }}
        >
          {t(`onboarding:consent.items.${key}.label`)}
        </Text>
        <Pressable
          accessibilityRole="link"
          onPress={() => setOpenKey(key)}
          testID={`consent-${key}-read`}
        >
          <Text
            style={{
              marginTop: 2,
              fontFamily: tokens.typography.fontFamilies.sans,
              fontSize: 12,
              color: semantic.cta,
              textDecorationLine: 'underline',
            }}
          >
            {t(`legal:${legalKey}.title`)} ·{' '}
            {t(`onboarding:consent.items.${key}.${requiredFlag}`)}
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={[styles.root, { backgroundColor: semantic.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text
          style={{
            fontFamily: tokens.typography.fontFamilies.serif,
            fontSize: 26,
            color: semantic.titleText,
          }}
        >
          {t('onboarding:consent.title')}
        </Text>
        <Text
          style={{
            marginTop: 6,
            marginBottom: 20,
            fontFamily: tokens.typography.fontFamilies.sans,
            fontSize: 15,
            color: semantic.bodyText,
          }}
        >
          {t('onboarding:consent.subtitle')}
        </Text>

        {renderRow('termsOfService', 'termsOfService', 'required')}
        {renderRow('privacyPolicy', 'privacyPolicy', 'required')}
        {renderRow('marketing', 'marketing', 'optional')}

        <Text
          style={{
            marginTop: 16,
            fontFamily: tokens.typography.fontFamilies.sans,
            fontSize: 12,
            color: semantic.bodyText,
            opacity: 0.7,
          }}
        >
          {t('onboarding:consent.version', { version: CONSENT_VERSION })}
        </Text>

        {submitError ? (
          <Text
            accessibilityRole="alert"
            style={{ marginTop: 12, color: semantic.titleText, fontSize: 13 }}
          >
            {submitError}
          </Text>
        ) : null}
      </ScrollView>

      <View style={styles.cta}>
        <Button
          accessibilityLabel={t('onboarding:consent.cta')}
          disabled={!canSubmit || submitting}
          onPress={onSubmit}
          testID="consent-submit"
        >
          {t('onboarding:consent.cta')}
        </Button>
      </View>

      <Modal
        open={openKey !== null}
        onOpenChange={(open) => {
          if (!open) setOpenKey(null);
        }}
        title={openKey ? t(`legal:${openKey}.title`) : ''}
      >
        <ScrollView style={{ maxHeight: 320 }}>
          <Text
            style={{
              fontFamily: tokens.typography.fontFamilies.sans,
              fontSize: 14,
              color: semantic.bodyText,
              lineHeight: 20,
            }}
          >
            {openKey ? t(`legal:${openKey}.body`) : ''}
          </Text>
        </ScrollView>
        <View style={{ marginTop: 12 }}>
          <Button
            variant="secondary"
            onPress={() => setOpenKey(null)}
            accessibilityLabel="Close"
          >
            Close
          </Button>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  rowText: { flex: 1 },
  cta: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 8,
  },
});

import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  SUPPORTED_LANGUAGES,
  type LanguagePreference,
} from '@hannature/shared-types';
import { Button, Input } from '@hannature/ui';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../app/ThemeProvider';
import type { AuthParamList } from '../../navigation/types';
import { useAuthStore } from '../../state/useAuthStore';
import {
  passwordStrength,
  registerSchema,
  type RegisterFormValues,
} from './schemas/registerSchema';

type Props = NativeStackScreenProps<AuthParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation(['auth', 'common']);
  const tokens = useTheme();
  const { semantic } = tokens.colors;
  const register = useAuthStore((s) => s.register);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialLanguage: LanguagePreference = (
    SUPPORTED_LANGUAGES as readonly string[]
  ).includes(i18n.language)
    ? (i18n.language as LanguagePreference)
    : 'en';

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      language: initialLanguage,
    },
    mode: 'onBlur',
  });

  const passwordValue = watch('password');
  const strength = passwordStrength(passwordValue ?? '');

  const onSubmit = async (values: RegisterFormValues) => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      await register({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        language: values.language as LanguagePreference,
      });
      navigation.navigate('OnboardingGoal');
    } catch (e) {
      setSubmitError(
        e instanceof Error ? e.message : 'register/unknown',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={[styles.root, { backgroundColor: semantic.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text
            style={{
              fontFamily: tokens.typography.fontFamilies.serif,
              fontSize: 26,
              color: semantic.titleText,
            }}
          >
            {t('auth:register.title')}
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
            {t('auth:register.subtitle')}
          </Text>

          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, value } }) => (
              <Input
                testID="register-fullName"
                label={t('auth:register.fields.fullName.label')}
                placeholder={t('auth:register.fields.fullName.placeholder')}
                value={value}
                onChangeText={onChange}
                error={
                  errors.fullName?.message
                    ? t(`auth:${errors.fullName.message}`)
                    : undefined
                }
              />
            )}
          />
          <View style={styles.gap} />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                testID="register-email"
                label={t('auth:register.fields.email.label')}
                placeholder={t('auth:register.fields.email.placeholder')}
                value={value}
                onChangeText={onChange}
                error={
                  errors.email?.message
                    ? t(`auth:${errors.email.message}`)
                    : undefined
                }
              />
            )}
          />
          <View style={styles.gap} />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                testID="register-password"
                label={t('auth:register.fields.password.label')}
                placeholder={t('auth:register.fields.password.placeholder')}
                value={value}
                onChangeText={onChange}
                helperText={t(`auth:register.fields.password.strength.${strength}`)}
                error={
                  errors.password?.message
                    ? t(`auth:${errors.password.message}`)
                    : undefined
                }
              />
            )}
          />
          <View style={styles.gap} />

          <Controller
            control={control}
            name="language"
            render={({ field: { onChange, value } }) => (
              <View>
                <Text
                  style={{
                    fontFamily: tokens.typography.fontFamilies.sans,
                    fontSize: 14,
                    color: semantic.titleText,
                    marginBottom: 6,
                  }}
                >
                  {t('auth:register.fields.language.label')}
                </Text>
                <View style={styles.langRow}>
                  {SUPPORTED_LANGUAGES.map((lng) => {
                    const selected = value === lng;
                    return (
                      <Pressable
                        key={lng}
                        accessibilityRole="radio"
                        accessibilityState={{ selected }}
                        testID={`register-lang-${lng}`}
                        onPress={() => onChange(lng)}
                        style={[
                          styles.langChip,
                          {
                            backgroundColor: selected
                              ? semantic.cta
                              : semantic.surface,
                            borderColor: selected
                              ? semantic.cta
                              : semantic.border,
                          },
                        ]}
                      >
                        <Text
                          style={{
                            fontFamily: tokens.typography.fontFamilies.sans,
                            fontSize: 14,
                            color: selected
                              ? semantic.ctaForeground
                              : semantic.titleText,
                          }}
                        >
                          {t(`common:languages.${lng}`)}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            )}
          />

          {submitError ? (
            <Text
              accessibilityRole="alert"
              style={[styles.gap, { color: semantic.titleText, fontSize: 13 }]}
            >
              {submitError}
            </Text>
          ) : null}

          <View style={styles.cta}>
            <Button
              accessibilityLabel={t('auth:register.submit')}
              onPress={handleSubmit(onSubmit)}
              disabled={submitting}
              testID="register-submit"
            >
              {t('auth:register.submit')}
            </Button>
            <View style={{ height: 8 }} />
            <Button
              variant="ghost"
              accessibilityLabel={t('auth:register.haveAccount')}
              onPress={() => navigation.navigate('Login')}
            >
              {t('auth:register.haveAccount')}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
  },
  gap: { height: 14 },
  langRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  langChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  cta: { marginTop: 24 },
});

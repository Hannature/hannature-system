import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input } from '@hannature/ui';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../app/ThemeProvider';
import type { AuthParamList } from '../../navigation/types';
import { useAuthStore } from '../../state/useAuthStore';
import { loginSchema, type LoginFormValues } from './schemas/loginSchema';

type Props = NativeStackScreenProps<AuthParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { t } = useTranslation('auth');
  const tokens = useTheme();
  const { semantic } = tokens.colors;
  const login = useAuthStore((s) => s.login);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      await login(values);
      // Auth gate flips automatically; nothing else to do.
    } catch {
      setSubmitError(t('login.errors.invalidCredentials'));
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
            {t('login.title')}
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
            {t('login.subtitle')}
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                testID="login-email"
                label={t('login.fields.email.label')}
                placeholder={t('login.fields.email.placeholder')}
                value={value}
                onChangeText={onChange}
                error={
                  errors.email?.message ? t(errors.email.message) : undefined
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
                testID="login-password"
                label={t('login.fields.password.label')}
                placeholder={t('login.fields.password.placeholder')}
                value={value}
                onChangeText={onChange}
                error={
                  errors.password?.message
                    ? t(errors.password.message)
                    : undefined
                }
              />
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
              accessibilityLabel={t('login.submit')}
              onPress={handleSubmit(onSubmit)}
              disabled={submitting}
              testID="login-submit"
            >
              {t('login.submit')}
            </Button>
            <View style={{ height: 8 }} />
            <Button
              variant="ghost"
              accessibilityLabel={t('login.forgot')}
              onPress={() => {
                // Stub: forgot-password flow is a future story.
              }}
            >
              {t('login.forgot')}
            </Button>
            <View style={{ height: 8 }} />
            <Button
              variant="ghost"
              accessibilityLabel={t('login.noAccount')}
              onPress={() => navigation.navigate('Register')}
            >
              {t('login.noAccount')}
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
  cta: { marginTop: 24 },
});

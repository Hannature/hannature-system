import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  SUPPORTED_LANGUAGES,
  type LanguagePreference,
} from '@hannature/shared-types';

import enAuth from './locales/en/auth.json';
import enCommon from './locales/en/common.json';
import enLegal from './locales/en/legal.json';
import enOnboarding from './locales/en/onboarding.json';

const FALLBACK: LanguagePreference = 'en';

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    onboarding: enOnboarding,
    legal: enLegal,
  },
} as const;

function detectLanguage(): LanguagePreference {
  const locales = Localization.getLocales?.() ?? [];
  const code = locales[0]?.languageCode?.toLowerCase();
  if (code && (SUPPORTED_LANGUAGES as readonly string[]).includes(code)) {
    return code as LanguagePreference;
  }
  return FALLBACK;
}

let initPromise: Promise<void> | null = null;

export function initI18n(): Promise<void> {
  if (initPromise) return initPromise;
  initPromise = i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: detectLanguage(),
      fallbackLng: FALLBACK,
      ns: ['common', 'auth', 'onboarding', 'legal'],
      defaultNS: 'common',
      interpolation: { escapeValue: false },
      returnNull: false,
      compatibilityJSON: 'v4',
    })
    .then(() => undefined);
  return initPromise;
}

export function getDeviceLocale(): string {
  const locales = Localization.getLocales?.() ?? [];
  return locales[0]?.languageTag ?? 'en';
}

export { i18n };

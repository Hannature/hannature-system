import type { AuthSession } from '@hannature/shared-types';
import * as SecureStore from 'expo-secure-store';

import {
  clearSession,
  getOnboardingComplete,
  getStoredUser,
  getTokens,
  persistSession,
} from './secureStorage';

const resetStore = (
  SecureStore as unknown as { __resetSecureStoreForTests: () => void }
).__resetSecureStoreForTests;

const session: AuthSession = {
  user: {
    id: 'u1',
    email: 'a@b.co',
    fullName: 'Test User',
    language: 'en',
    behavioralGoal: null,
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  tokens: {
    accessToken: 'a',
    refreshToken: 'r',
    expiresAt: '2026-01-01T01:00:00.000Z',
  },
};

beforeEach(() => {
  resetStore();
});

test('persistSession round-trips tokens, user, and onboarding flag', async () => {
  await persistSession(session, true);

  expect(await getTokens()).toEqual(session.tokens);
  expect(await getStoredUser()).toEqual(session.user);
  expect(await getOnboardingComplete()).toBe(true);
});

test('clearSession wipes all auth keys', async () => {
  await persistSession(session, true);
  await clearSession();

  expect(await getTokens()).toBeNull();
  expect(await getStoredUser()).toBeNull();
  expect(await getOnboardingComplete()).toBe(false);
});

import { CONSENT_VERSION } from '@hannature/shared-types';
import * as SecureStore from 'expo-secure-store';

import {
  __getConsentAuditQueueForTests,
  __resetConsentAuditQueueForTests,
} from '../auth/mockAuthService';
import { useAuthStore } from './useAuthStore';

const resetStore = (
  SecureStore as unknown as { __resetSecureStoreForTests: () => void }
).__resetSecureStoreForTests;

function reset() {
  resetStore();
  __resetConsentAuditQueueForTests();
  useAuthStore.setState({
    status: 'loading',
    user: null,
    tokens: null,
    onboardingComplete: false,
  });
}

beforeEach(reset);

test('hydrate sets unauthenticated when no session is stored', async () => {
  await useAuthStore.getState().hydrate();
  expect(useAuthStore.getState().status).toBe('unauthenticated');
});

test('register persists session and leaves onboardingComplete=false', async () => {
  await useAuthStore.getState().register({
    email: 'jane@example.com',
    password: 'password123',
    fullName: 'Jane Doe',
    language: 'en',
  });
  const state = useAuthStore.getState();
  expect(state.status).toBe('authenticated');
  expect(state.user?.email).toBe('jane@example.com');
  expect(state.onboardingComplete).toBe(false);
});

test('completeOnboarding records consent with current version and flips flag', async () => {
  await useAuthStore.getState().register({
    email: 'jane@example.com',
    password: 'password123',
    fullName: 'Jane Doe',
    language: 'en',
  });
  await useAuthStore.getState().completeOnboarding('move_more', {
    termsOfService: true,
    privacyPolicy: true,
    marketing: false,
  });
  const state = useAuthStore.getState();
  expect(state.onboardingComplete).toBe(true);
  expect(state.user?.behavioralGoal).toBe('move_more');

  const queue = __getConsentAuditQueueForTests();
  expect(queue).toHaveLength(1);
  expect(queue[0]?.version).toBe(CONSENT_VERSION);
  expect(queue[0]?.items).toEqual({
    termsOfService: true,
    privacyPolicy: true,
    marketing: false,
  });
});

test('logout clears session', async () => {
  await useAuthStore.getState().register({
    email: 'jane@example.com',
    password: 'password123',
    fullName: 'Jane Doe',
    language: 'en',
  });
  await useAuthStore.getState().logout();
  const state = useAuthStore.getState();
  expect(state.status).toBe('unauthenticated');
  expect(state.user).toBeNull();
  expect(state.tokens).toBeNull();
});

test('hydrate restores authenticated state from prior session', async () => {
  await useAuthStore.getState().register({
    email: 'jane@example.com',
    password: 'password123',
    fullName: 'Jane Doe',
    language: 'en',
  });
  await useAuthStore.getState().completeOnboarding('eat_better', {
    termsOfService: true,
    privacyPolicy: true,
    marketing: false,
  });

  // Simulate app relaunch.
  useAuthStore.setState({
    status: 'loading',
    user: null,
    tokens: null,
    onboardingComplete: false,
  });
  await useAuthStore.getState().hydrate();

  const state = useAuthStore.getState();
  expect(state.status).toBe('authenticated');
  expect(state.onboardingComplete).toBe(true);
  expect(state.user?.behavioralGoal).toBe('eat_better');
});

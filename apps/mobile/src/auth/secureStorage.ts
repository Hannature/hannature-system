import * as SecureStore from 'expo-secure-store';
import type { AuthSession, AuthTokens, User } from '@hannature/shared-types';

const TOKENS_KEY = 'hannature.auth.tokens';
const USER_KEY = 'hannature.auth.user';
const ONBOARDING_KEY = 'hannature.auth.onboardingComplete';

export async function getTokens(): Promise<AuthTokens | null> {
  const raw = await SecureStore.getItemAsync(TOKENS_KEY);
  return raw ? (JSON.parse(raw) as AuthTokens) : null;
}

export async function setTokens(tokens: AuthTokens): Promise<void> {
  await SecureStore.setItemAsync(TOKENS_KEY, JSON.stringify(tokens));
}

export async function clearTokens(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKENS_KEY);
}

export async function getStoredUser(): Promise<User | null> {
  const raw = await SecureStore.getItemAsync(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export async function setStoredUser(user: User): Promise<void> {
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
}

export async function clearStoredUser(): Promise<void> {
  await SecureStore.deleteItemAsync(USER_KEY);
}

export async function getOnboardingComplete(): Promise<boolean> {
  const raw = await SecureStore.getItemAsync(ONBOARDING_KEY);
  return raw === 'true';
}

export async function setOnboardingComplete(value: boolean): Promise<void> {
  await SecureStore.setItemAsync(ONBOARDING_KEY, value ? 'true' : 'false');
}

export async function persistSession(
  session: AuthSession,
  onboardingComplete: boolean,
): Promise<void> {
  await Promise.all([
    setTokens(session.tokens),
    setStoredUser(session.user),
    setOnboardingComplete(onboardingComplete),
  ]);
}

export async function clearSession(): Promise<void> {
  await Promise.all([
    clearTokens(),
    clearStoredUser(),
    SecureStore.deleteItemAsync(ONBOARDING_KEY),
  ]);
}

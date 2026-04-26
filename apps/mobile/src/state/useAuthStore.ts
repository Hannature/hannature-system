import { create } from 'zustand';
import {
  CONSENT_VERSION,
  type AuthTokens,
  type BehavioralGoal,
  type ConsentItems,
  type ConsentRecord,
  type LoginRequest,
  type RegisterRequest,
  type User,
} from '@hannature/shared-types';

import * as authService from '../auth/mockAuthService';
import * as storage from '../auth/secureStorage';
import { getDeviceLocale } from '../i18n';

export type AuthStatus = 'loading' | 'unauthenticated' | 'authenticated';

type AuthState = {
  status: AuthStatus;
  user: User | null;
  tokens: AuthTokens | null;
  onboardingComplete: boolean;
  hydrate: () => Promise<void>;
  register: (req: RegisterRequest) => Promise<void>;
  login: (req: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: (
    goal: BehavioralGoal,
    items: ConsentItems,
  ) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  status: 'loading',
  user: null,
  tokens: null,
  onboardingComplete: false,

  hydrate: async () => {
    const [tokens, user, onboardingComplete] = await Promise.all([
      storage.getTokens(),
      storage.getStoredUser(),
      storage.getOnboardingComplete(),
    ]);
    if (tokens && user) {
      set({
        status: 'authenticated',
        tokens,
        user,
        onboardingComplete,
      });
    } else {
      set({
        status: 'unauthenticated',
        tokens: null,
        user: null,
        onboardingComplete: false,
      });
    }
  },

  register: async (req) => {
    const session = await authService.register(req);
    await storage.persistSession(session, false);
    set({
      status: 'authenticated',
      user: session.user,
      tokens: session.tokens,
      onboardingComplete: false,
    });
  },

  login: async (req) => {
    const session = await authService.login(req);
    // Returning users keep their onboarding state if previously persisted; mock treats login as fresh.
    await storage.persistSession(session, true);
    set({
      status: 'authenticated',
      user: session.user,
      tokens: session.tokens,
      onboardingComplete: true,
    });
  },

  logout: async () => {
    await authService.logout();
    await storage.clearSession();
    set({
      status: 'unauthenticated',
      user: null,
      tokens: null,
      onboardingComplete: false,
    });
  },

  completeOnboarding: async (goal, items) => {
    const { user } = get();
    if (!user) throw new Error('completeOnboarding/no-user');
    const updatedUser: User = { ...user, behavioralGoal: goal };
    const record: ConsentRecord = {
      userId: user.id,
      version: CONSENT_VERSION,
      acceptedAt: new Date().toISOString(),
      items,
      deviceLocale: getDeviceLocale(),
    };
    await authService.logConsent(record);
    await storage.setStoredUser(updatedUser);
    await storage.setOnboardingComplete(true);
    set({ user: updatedUser, onboardingComplete: true });
  },
}));

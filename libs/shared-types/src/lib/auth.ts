export type LanguagePreference = 'en' | 'fr' | 'de' | 'es' | 'it';

export const SUPPORTED_LANGUAGES: readonly LanguagePreference[] = [
  'en',
  'fr',
  'de',
  'es',
  'it',
] as const;

export type BehavioralGoal =
  | 'move_more'
  | 'eat_better'
  | 'sleep_better'
  | 'reduce_stress'
  | 'build_habits';

export const BEHAVIORAL_GOALS: readonly BehavioralGoal[] = [
  'move_more',
  'eat_better',
  'sleep_better',
  'reduce_stress',
  'build_habits',
] as const;

export interface User {
  id: string;
  email: string;
  fullName: string;
  language: LanguagePreference;
  behavioralGoal: BehavioralGoal | null;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface AuthSession {
  user: User;
  tokens: AuthTokens;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  language: LanguagePreference;
}

export interface LoginRequest {
  email: string;
  password: string;
}

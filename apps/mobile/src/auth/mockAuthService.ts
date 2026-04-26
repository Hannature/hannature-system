import type {
  AuthSession,
  ConsentRecord,
  LoginRequest,
  RegisterRequest,
  User,
} from '@hannature/shared-types';

// TODO(HAN-XX): replace with real /auth + /consent endpoints once the backend is implemented.

const SIMULATED_LATENCY_MS = 350;

const consentAuditQueue: ConsentRecord[] = [];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function uuid(): string {
  // RFC4122-ish, mock-only.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function buildSession(user: User): AuthSession {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  return {
    user,
    tokens: {
      accessToken: `mock.${uuid()}`,
      refreshToken: `mock-refresh.${uuid()}`,
      expiresAt,
    },
  };
}

export async function register(req: RegisterRequest): Promise<AuthSession> {
  await delay(SIMULATED_LATENCY_MS);
  if (!req.email || !req.password || !req.fullName) {
    throw new Error('register/invalid');
  }
  const user: User = {
    id: uuid(),
    email: req.email.toLowerCase().trim(),
    fullName: req.fullName.trim(),
    language: req.language,
    behavioralGoal: null,
    createdAt: new Date().toISOString(),
  };
  return buildSession(user);
}

export async function login(req: LoginRequest): Promise<AuthSession> {
  await delay(SIMULATED_LATENCY_MS);
  if (!req.email || !req.password) {
    throw new Error('login/invalid');
  }
  // Mock: any non-empty creds succeed. Returning a synthetic returning user.
  const user: User = {
    id: uuid(),
    email: req.email.toLowerCase().trim(),
    fullName: req.email.split('@')[0] ?? 'Friend',
    language: 'en',
    behavioralGoal: null,
    createdAt: new Date().toISOString(),
  };
  return buildSession(user);
}

export async function logout(): Promise<void> {
  await delay(100);
}

export async function logConsent(record: ConsentRecord): Promise<void> {
  await delay(SIMULATED_LATENCY_MS);
  consentAuditQueue.push(record);
  // Visible integration point for future backend wiring.
  console.info('[consent-audit-stub]', record);
}

export function __getConsentAuditQueueForTests(): readonly ConsentRecord[] {
  return consentAuditQueue;
}

export function __resetConsentAuditQueueForTests(): void {
  consentAuditQueue.length = 0;
}

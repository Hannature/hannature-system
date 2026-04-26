export const CONSENT_VERSION = '2026-04-26';

export interface ConsentItems {
  termsOfService: boolean;
  privacyPolicy: boolean;
  marketing: boolean;
}

export interface ConsentRecord {
  userId: string;
  version: string;
  acceptedAt: string;
  items: ConsentItems;
  deviceLocale: string;
}

import { SUPPORTED_LANGUAGES } from '@hannature/shared-types';
import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, 'register.errors.fullNameRequired'),
  email: z.string().trim().email('register.errors.emailInvalid'),
  password: z
    .string()
    .min(8, 'register.errors.passwordTooShort')
    .regex(/[0-9]/, 'register.errors.passwordTooWeak')
    .regex(/[a-zA-Z]/, 'register.errors.passwordTooWeak'),
  language: z.enum(SUPPORTED_LANGUAGES as unknown as [string, ...string[]]),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function passwordStrength(value: string): 'weak' | 'fair' | 'strong' {
  if (value.length < 8) return 'weak';
  const hasNumber = /[0-9]/.test(value);
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasSymbol = /[^A-Za-z0-9]/.test(value);
  const score = [hasNumber, hasLetter, hasSymbol].filter(Boolean).length;
  if (score >= 3 && value.length >= 12) return 'strong';
  if (score >= 2) return 'fair';
  return 'weak';
}

import { passwordStrength, registerSchema } from './registerSchema';

test('rejects empty fields', () => {
  const result = registerSchema.safeParse({
    fullName: '',
    email: '',
    password: '',
    language: 'en',
  });
  expect(result.success).toBe(false);
});

test('rejects short password', () => {
  const result = registerSchema.safeParse({
    fullName: 'Jane',
    email: 'a@b.co',
    password: 'short',
    language: 'en',
  });
  expect(result.success).toBe(false);
});

test('rejects unsupported language', () => {
  const result = registerSchema.safeParse({
    fullName: 'Jane',
    email: 'a@b.co',
    password: 'password123',
    language: 'jp',
  });
  expect(result.success).toBe(false);
});

test('accepts valid input', () => {
  const result = registerSchema.safeParse({
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password123',
    language: 'en',
  });
  expect(result.success).toBe(true);
});

test('passwordStrength grades short, fair, and strong inputs', () => {
  expect(passwordStrength('abc')).toBe('weak');
  expect(passwordStrength('abcdefgh1')).toBe('fair');
  expect(passwordStrength('abcdefgh1234!')).toBe('strong');
});

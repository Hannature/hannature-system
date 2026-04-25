export const radius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
  pill: '9999px',
  full: '9999px',
} as const;

export type RadiusToken = keyof typeof radius;

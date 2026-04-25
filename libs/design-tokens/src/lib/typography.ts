export const fontFamilies = {
  sans: '"Inter", "Helvetica Neue", Arial, sans-serif',
  serif: '"Cormorant Garamond", "Georgia", serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const fontSizes = {
  xs: '12px',
  sm: '14px',
  base: '16px',
  md: '18px',
  lg: '20px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '40px',
  '4xl': '48px',
} as const;

export type TextStyle = {
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
};

export const textStyles = {
  h1: {
    fontFamily: fontFamilies.serif,
    fontSize: fontSizes['4xl'],
    lineHeight: '56px',
    fontWeight: fontWeights.semibold,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontFamily: fontFamilies.serif,
    fontSize: fontSizes['3xl'],
    lineHeight: '48px',
    fontWeight: fontWeights.semibold,
    letterSpacing: '-0.015em',
  },
  h3: {
    fontFamily: fontFamilies.serif,
    fontSize: fontSizes['2xl'],
    lineHeight: '40px',
    fontWeight: fontWeights.medium,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xl,
    lineHeight: '32px',
    fontWeight: fontWeights.semibold,
    letterSpacing: '0em',
  },
  h5: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.lg,
    lineHeight: '28px',
    fontWeight: fontWeights.semibold,
    letterSpacing: '0em',
  },
  h6: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.md,
    lineHeight: '24px',
    fontWeight: fontWeights.semibold,
    letterSpacing: '0.01em',
  },
  body: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    lineHeight: '24px',
    fontWeight: fontWeights.regular,
    letterSpacing: '0em',
  },
  bodySm: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    lineHeight: '20px',
    fontWeight: fontWeights.regular,
    letterSpacing: '0em',
  },
  caption: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    lineHeight: '16px',
    fontWeight: fontWeights.medium,
    letterSpacing: '0.02em',
  },
} as const satisfies Record<string, TextStyle>;

export type TextStyleToken = keyof typeof textStyles;

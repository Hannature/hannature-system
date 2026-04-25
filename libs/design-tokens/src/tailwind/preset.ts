import type { Config } from 'tailwindcss';
import { palette, semanticColors } from '../lib/colors.js';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  textStyles,
} from '../lib/typography.js';
import { spacing } from '../lib/spacing.js';
import { radius } from '../lib/radius.js';
import { shadows } from '../lib/shadows.js';

const tailwindFontSize = Object.fromEntries(
  Object.entries(textStyles).map(([key, style]) => [
    key,
    [style.fontSize, { lineHeight: style.lineHeight, fontWeight: style.fontWeight, letterSpacing: style.letterSpacing }],
  ]),
) as Record<keyof typeof textStyles, [string, { lineHeight: string; fontWeight: string; letterSpacing: string }]>;

const preset = {
  theme: {
    extend: {
      colors: {
        ...palette,
        titleText: semanticColors.titleText,
        bodyText: semanticColors.bodyText,
        background: semanticColors.background,
        surface: semanticColors.surface,
        cta: semanticColors.cta,
        ctaForeground: semanticColors.ctaForeground,
        border: semanticColors.border,
      },
      fontFamily: {
        sans: fontFamilies.sans.split(',').map((s) => s.trim()),
        serif: fontFamilies.serif.split(',').map((s) => s.trim()),
        mono: fontFamilies.mono.split(',').map((s) => s.trim()),
      },
      fontSize: {
        ...fontSizes,
        ...tailwindFontSize,
      },
      fontWeight: fontWeights,
      spacing,
      borderRadius: radius,
      boxShadow: shadows,
    },
  },
} satisfies Partial<Config>;

export default preset;

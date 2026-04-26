import { describe, expect, it } from 'vitest';
import { palette, semanticColors } from './colors.js';

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace('#', '');
  const num = Number.parseInt(value, 16);
  return [(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const channel = (c: number): number => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(hexToRgb(fg));
  const l2 = relativeLuminance(hexToRgb(bg));
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

const WCAG_AA_NORMAL = 4.5;
const WCAG_AA_LARGE = 3.0;

describe('WCAG 2.1 AA contrast — semantic token pairs', () => {
  const pairs = [
    {
      name: 'bodyText on background',
      fg: semanticColors.bodyText,
      bg: semanticColors.background,
      threshold: WCAG_AA_NORMAL,
    },
    {
      name: 'bodyText on surface',
      fg: semanticColors.bodyText,
      bg: semanticColors.surface,
      threshold: WCAG_AA_NORMAL,
    },
    {
      name: 'bodyText on cream palette',
      fg: semanticColors.bodyText,
      bg: palette.cream,
      threshold: WCAG_AA_NORMAL,
    },
    {
      name: 'titleText on background',
      fg: semanticColors.titleText,
      bg: semanticColors.background,
      threshold: WCAG_AA_LARGE,
    },
    {
      name: 'titleText on background (small text)',
      fg: semanticColors.titleText,
      bg: semanticColors.background,
      threshold: WCAG_AA_NORMAL,
    },
    {
      name: 'titleText on surface',
      fg: semanticColors.titleText,
      bg: semanticColors.surface,
      threshold: WCAG_AA_LARGE,
    },
    {
      name: 'titleText on surface (small text)',
      fg: semanticColors.titleText,
      bg: semanticColors.surface,
      threshold: WCAG_AA_NORMAL,
    },
    {
      name: 'titleText on cream palette',
      fg: semanticColors.titleText,
      bg: palette.cream,
      threshold: WCAG_AA_NORMAL,
    },
    {
      name: 'ctaForeground on cta',
      fg: semanticColors.ctaForeground,
      bg: semanticColors.cta,
      threshold: WCAG_AA_NORMAL,
    },
    {
      name: 'titleText on cta (RewardBanner body)',
      fg: semanticColors.titleText,
      bg: semanticColors.cta,
      threshold: WCAG_AA_NORMAL,
    },
    {
      name: 'bodyText on cta',
      fg: semanticColors.bodyText,
      bg: semanticColors.cta,
      threshold: WCAG_AA_NORMAL,
    },
    {
      name: 'cream on titleText (Badge success)',
      fg: palette.cream,
      bg: semanticColors.titleText,
      threshold: WCAG_AA_NORMAL,
    },
  ];

  it.each(pairs)(
    '$name meets ratio >= $threshold:1',
    ({ fg, bg, threshold }) => {
      const ratio = contrastRatio(fg, bg);
      expect(ratio).toBeGreaterThanOrEqual(threshold);
    },
  );
});

import { describe, it, expect } from 'vitest';
import { tokens } from './tokens.js';
import { palette, semanticColors } from './colors.js';
import { textStyles } from './typography.js';
import { spacing, SPACING_BASE_PX } from './spacing.js';
import { radius } from './radius.js';

describe('tokens', () => {
  it('exposes the brand palette hex values from the spec', () => {
    expect(palette.brown).toBe('#793b17');
    expect(palette.cream).toBe('#f9faf1');
    expect(palette.blush).toBe('#e8bfb0');
    expect(palette.black).toBe('#000000');
  });

  it('maps semantic colors onto the brand palette', () => {
    expect(semanticColors.titleText).toBe(palette.brown);
    expect(semanticColors.bodyText).toBe(palette.black);
    expect(semanticColors.background).toBe(palette.cream);
    expect(semanticColors.cta).toBe(palette.blush);
  });

  it('covers H1-H6, body, and caption text styles with size, line-height, and weight', () => {
    const required = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'body',
      'caption',
    ] as const;
    for (const key of required) {
      const style = textStyles[key];
      expect(style.fontSize).toMatch(/^\d+px$/);
      expect(style.lineHeight).toMatch(/^\d+px$/);
      expect(style.fontWeight).toMatch(/^\d{3}$/);
    }
  });

  it('keeps every spacing value on the 4pt grid', () => {
    for (const value of Object.values(spacing)) {
      const pixels = Number(value.replace('px', ''));
      expect(pixels % SPACING_BASE_PX).toBe(0);
    }
  });

  it('exposes a radius scale including pill and full', () => {
    expect(radius.none).toBe('0px');
    expect(radius.pill).toBe('9999px');
    expect(radius.full).toBe('9999px');
  });

  it('groups every domain under the frozen tokens object', () => {
    expect(Object.isFrozen(tokens)).toBe(true);
    expect(tokens.colors.palette).toBe(palette);
    expect(tokens.typography.textStyles).toBe(textStyles);
    expect(tokens.spacing).toBe(spacing);
    expect(tokens.radius).toBe(radius);
  });
});

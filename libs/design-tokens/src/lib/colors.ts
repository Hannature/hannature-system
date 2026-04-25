export const palette = {
  brown: '#793b17',
  cream: '#f9faf1',
  blush: '#e8bfb0',
  black: '#000000',
  white: '#ffffff',
} as const;

export const semanticColors = {
  titleText: palette.brown,
  bodyText: palette.black,
  background: palette.cream,
  surface: palette.white,
  cta: palette.blush,
  ctaForeground: palette.brown,
  border: palette.blush,
} as const;

export type PaletteToken = keyof typeof palette;
export type SemanticColorToken = keyof typeof semanticColors;

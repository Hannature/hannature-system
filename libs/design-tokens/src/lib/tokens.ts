import { palette, semanticColors } from './colors.js';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  textStyles,
} from './typography.js';
import { spacing } from './spacing.js';
import { radius } from './radius.js';
import { shadows, nativeShadows } from './shadows.js';

export const tokens = Object.freeze({
  colors: {
    palette,
    semantic: semanticColors,
  },
  typography: {
    fontFamilies,
    fontWeights,
    fontSizes,
    textStyles,
  },
  spacing,
  radius,
  shadows,
  nativeShadows,
});

export type Tokens = typeof tokens;

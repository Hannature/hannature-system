const STEP = 4;

export const spacing = {
  0: '0px',
  1: `${STEP * 1}px`,
  2: `${STEP * 2}px`,
  3: `${STEP * 3}px`,
  4: `${STEP * 4}px`,
  5: `${STEP * 5}px`,
  6: `${STEP * 6}px`,
  8: `${STEP * 8}px`,
  10: `${STEP * 10}px`,
  12: `${STEP * 12}px`,
  16: `${STEP * 16}px`,
  20: `${STEP * 20}px`,
  24: `${STEP * 24}px`,
} as const;

export const SPACING_BASE_PX = STEP;

export type SpacingToken = keyof typeof spacing;

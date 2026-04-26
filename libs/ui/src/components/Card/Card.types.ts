import type { ReactNode } from 'react';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardBaseProps {
  padding?: CardPadding;
  className?: string;
  children?: ReactNode;
  testID?: string;
}

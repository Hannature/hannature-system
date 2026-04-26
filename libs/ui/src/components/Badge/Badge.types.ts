import type { ReactNode } from 'react';

export type BadgeTone = 'neutral' | 'accent' | 'success';

export interface BadgeBaseProps {
  tone?: BadgeTone;
  className?: string;
  children?: ReactNode;
  testID?: string;
}

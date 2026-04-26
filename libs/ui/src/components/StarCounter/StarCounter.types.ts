export type StarCounterSize = 'sm' | 'md' | 'lg';

export interface StarCounterBaseProps {
  count: number;
  threshold?: number;
  size?: StarCounterSize;
  showProgress?: boolean;
  className?: string;
  testID?: string;
  accessibilityLabel?: string;
}

export const DEFAULT_STAR_THRESHOLD = 20;

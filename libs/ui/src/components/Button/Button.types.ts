import type { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onPress?: () => void;
  className?: string;
  children?: ReactNode;
  accessibilityLabel?: string;
  testID?: string;
}

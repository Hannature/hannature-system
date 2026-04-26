import { forwardRef } from 'react';
import { Pressable, Text, type View } from 'react-native';
import type {
  ButtonBaseProps,
  ButtonSize,
  ButtonVariant,
} from './Button.types.js';

const containerByVariant: Record<ButtonVariant, string> = {
  primary: 'bg-cta',
  secondary: 'bg-surface border border-border',
  ghost: 'bg-transparent',
};

const containerBySize: Record<ButtonSize, string> = {
  sm: 'h-8 px-3',
  md: 'h-10 px-4',
  lg: 'h-12 px-6',
};

const labelByVariant: Record<ButtonVariant, string> = {
  primary: 'text-ctaForeground',
  secondary: 'text-titleText',
  ghost: 'text-titleText',
};

const labelBySize: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export type ButtonProps = ButtonBaseProps;

export const Button = forwardRef<View, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    disabled,
    onPress,
    className,
    accessibilityLabel,
    testID,
    children,
  },
  ref,
) {
  const containerClass = [
    'flex-row items-center justify-center rounded-md',
    containerByVariant[variant],
    containerBySize[size],
    disabled ? 'opacity-50' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const labelClass = [
    'font-sans font-medium',
    labelByVariant[variant],
    labelBySize[size],
  ].join(' ');

  return (
    <Pressable
      ref={ref}
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      testID={testID}
      className={containerClass}
    >
      <Text className={labelClass}>{children}</Text>
    </Pressable>
  );
});

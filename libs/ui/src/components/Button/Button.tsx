import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/cn.js';
import type { ButtonBaseProps } from './Button.types.js';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-sans font-medium transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-titleText focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-cta text-ctaForeground hover:opacity-90',
        secondary: 'bg-surface text-titleText border border-border hover:bg-cream',
        ghost: 'bg-transparent text-titleText hover:bg-cream',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>,
    ButtonBaseProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    className,
    onPress,
    accessibilityLabel,
    testID,
    type = 'button',
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={onPress}
      aria-label={accessibilityLabel}
      data-testid={testID}
      {...rest}
    >
      {children}
    </button>
  );
});

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn.js';
import type { BadgeBaseProps, BadgeTone } from './Badge.types.js';

const toneClass: Record<BadgeTone, string> = {
  neutral: 'bg-surface text-bodyText border border-border',
  accent: 'bg-cta text-ctaForeground',
  success: 'bg-titleText text-cream',
};

export interface BadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'>,
    BadgeBaseProps {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = 'neutral', className, testID, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      data-testid={testID}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-sans font-medium',
        toneClass[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
});

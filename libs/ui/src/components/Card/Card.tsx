import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn.js';
import type { CardBaseProps, CardPadding } from './Card.types.js';

const paddingClass: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export interface CardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    CardBaseProps {}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { padding = 'md', className, testID, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-testid={testID}
      className={cn(
        'bg-surface text-bodyText rounded-md border border-border shadow-sm',
        paddingClass[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

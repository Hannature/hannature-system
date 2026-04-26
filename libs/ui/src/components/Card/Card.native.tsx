import { forwardRef } from 'react';
import { View } from 'react-native';
import type { CardBaseProps, CardPadding } from './Card.types.js';

const paddingClass: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export type CardProps = CardBaseProps;

export const Card = forwardRef<View, CardProps>(function Card(
  { padding = 'md', className, testID, children },
  ref,
) {
  return (
    <View
      ref={ref}
      testID={testID}
      className={[
        'bg-surface rounded-md border border-border',
        paddingClass[padding],
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </View>
  );
});

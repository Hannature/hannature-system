import { forwardRef } from 'react';
import { Text, View } from 'react-native';
import type { BadgeBaseProps, BadgeTone } from './Badge.types.js';

const toneContainer: Record<BadgeTone, string> = {
  neutral: 'bg-surface border border-border',
  accent: 'bg-cta',
  success: 'bg-titleText',
};

const toneLabel: Record<BadgeTone, string> = {
  neutral: 'text-bodyText',
  accent: 'text-ctaForeground',
  success: 'text-cream',
};

export type BadgeProps = BadgeBaseProps;

export const Badge = forwardRef<View, BadgeProps>(function Badge(
  { tone = 'neutral', className, testID, children },
  ref,
) {
  return (
    <View
      ref={ref}
      testID={testID}
      className={[
        'self-start flex-row items-center rounded-full px-2.5 py-0.5',
        toneContainer[tone],
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Text className={['text-xs font-sans font-medium', toneLabel[tone]].join(' ')}>
        {children}
      </Text>
    </View>
  );
});

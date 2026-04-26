import { Text, View } from 'react-native';
import { ProgressBar } from '../ProgressBar/ProgressBar.js';
import {
  DEFAULT_STAR_THRESHOLD,
  type StarCounterBaseProps,
  type StarCounterSize,
} from './StarCounter.types.js';

export type StarCounterProps = StarCounterBaseProps;

const labelSize: Record<StarCounterSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const starSize: Record<StarCounterSize, string> = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
};

export function StarCounter({
  count,
  threshold = DEFAULT_STAR_THRESHOLD,
  size = 'md',
  showProgress = true,
  className,
  testID,
  accessibilityLabel,
}: StarCounterProps) {
  const safeCount = Math.max(0, Math.min(count, threshold));
  const label =
    accessibilityLabel ?? `${safeCount} of ${threshold} stars earned`;

  return (
    <View
      testID={testID}
      accessible
      accessibilityLabel={label}
      className={['gap-2', className ?? ''].filter(Boolean).join(' ')}
    >
      <View className="flex-row items-center gap-2">
        <Text className={['text-titleText', starSize[size]].join(' ')}>★</Text>
        <Text
          className={[
            'text-titleText font-sans font-semibold',
            labelSize[size],
          ].join(' ')}
        >
          {safeCount} / {threshold}
        </Text>
      </View>
      {showProgress && (
        <ProgressBar value={safeCount} max={threshold} label={label} />
      )}
    </View>
  );
}

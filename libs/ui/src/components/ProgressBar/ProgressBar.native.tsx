import { View } from 'react-native';
import type { ProgressBarBaseProps } from './ProgressBar.types.js';

export type ProgressBarProps = ProgressBarBaseProps;

export function ProgressBar({
  value,
  max = 100,
  label,
  className,
  testID,
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const pct = max === 0 ? 0 : (clamped / max) * 100;

  return (
    <View
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ now: clamped, min: 0, max }}
      className={[
        'h-2 w-full rounded-full bg-cream border border-border overflow-hidden',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <View className="h-full bg-cta" style={{ width: `${pct}%` }} />
    </View>
  );
}

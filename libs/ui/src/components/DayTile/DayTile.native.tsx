import { Pressable, Text, View } from 'react-native';
import type { DayTileBaseProps, DayTileStatus } from './DayTile.types.js';

export type DayTileProps = DayTileBaseProps;

const statusClass: Record<DayTileStatus, string> = {
  locked: 'bg-surface border-border opacity-50',
  upcoming: 'bg-surface border-border',
  today: 'bg-surface border-cta',
  completed: 'bg-cream border-titleText',
};

const labelColor: Record<DayTileStatus, string> = {
  locked: 'text-bodyText',
  upcoming: 'text-bodyText',
  today: 'text-titleText',
  completed: 'text-titleText',
};

function defaultLabel(
  dayNumber: number,
  dateLabel: string | undefined,
  status: DayTileStatus,
  starsEarned: number | undefined,
): string {
  const parts = [dateLabel ?? `Day ${dayNumber}`];
  parts.push(status);
  if (status === 'completed' && typeof starsEarned === 'number') {
    parts.push(`${starsEarned} star${starsEarned === 1 ? '' : 's'} earned`);
  }
  return parts.join(', ');
}

export function DayTile({
  dayNumber,
  dateLabel,
  status = 'upcoming',
  starsEarned,
  onPress,
  className,
  testID,
  accessibilityLabel,
}: DayTileProps) {
  const label = accessibilityLabel ?? defaultLabel(dayNumber, dateLabel, status, starsEarned);
  const interactive = !!onPress && status !== 'locked';

  const tileClass = [
    'h-20 w-20 items-center justify-center rounded-md border',
    statusClass[status],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <View className="items-center justify-center gap-1">
      <Text className={['font-serif text-base font-semibold', labelColor[status]].join(' ')}>
        {dateLabel ?? String(dayNumber)}
      </Text>
      {status === 'completed' && (
        <Text className={['text-sm', labelColor[status]].join(' ')}>
          {typeof starsEarned === 'number' ? `★ ${starsEarned}` : '✓'}
        </Text>
      )}
    </View>
  );

  if (interactive) {
    return (
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        className={tileClass}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      testID={testID}
      accessible
      accessibilityLabel={label}
      accessibilityState={{ disabled: status === 'locked' }}
      className={tileClass}
    >
      {content}
    </View>
  );
}

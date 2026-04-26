import { Text, View } from 'react-native';
import { Badge } from '../Badge/Badge.js';
import { Button } from '../Button/Button.js';
import { Card } from '../Card/Card.js';
import { ProgressBar } from '../ProgressBar/ProgressBar.js';
import {
  intensityLabels,
  statusLabels,
  type WorkoutCardBaseProps,
} from './WorkoutCard.types.js';

export type WorkoutCardProps = WorkoutCardBaseProps;

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem === 0 ? `${hours} h` : `${hours} h ${rem} min`;
}

export function WorkoutCard({
  title,
  durationMinutes,
  intensity,
  progress,
  status = 'upcoming',
  onStart,
  startLabel,
  className,
  testID,
  accessibilityLabel,
}: WorkoutCardProps) {
  const buttonLabel = startLabel ?? statusLabels[status];
  const progressValue = typeof progress === 'number' ? progress : null;

  return (
    <Card
      padding="md"
      className={['gap-3', className ?? ''].filter(Boolean).join(' ')}
      testID={testID}
    >
      <View
        accessible
        accessibilityRole="summary"
        accessibilityLabel={accessibilityLabel ?? title}
        className="gap-2"
      >
        <View className="flex-row items-start justify-between gap-2">
          <Text className="text-titleText font-serif text-lg font-semibold flex-shrink">
            {title}
          </Text>
          {intensity && <Badge tone="neutral">{intensityLabels[intensity]}</Badge>}
        </View>
        <Text className="text-bodyText text-sm">{formatDuration(durationMinutes)}</Text>
      </View>
      {progressValue !== null && (
        <ProgressBar
          value={progressValue}
          max={100}
          label={`${Math.round(progressValue)}% complete`}
        />
      )}
      {onStart && (
        <Button
          variant={status === 'completed' ? 'secondary' : 'primary'}
          size="md"
          disabled={status === 'completed'}
          onPress={onStart}
          accessibilityLabel={buttonLabel}
        >
          {buttonLabel}
        </Button>
      )}
    </Card>
  );
}

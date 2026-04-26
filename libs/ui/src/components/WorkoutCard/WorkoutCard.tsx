import { cn } from '../../lib/cn.js';
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
  const headingId = `workout-${title.replace(/\s+/g, '-').toLowerCase()}`;
  const buttonLabel = startLabel ?? statusLabels[status];
  const progressValue = typeof progress === 'number' ? progress : null;

  return (
    <Card
      padding="md"
      className={cn('flex flex-col gap-3', className)}
      testID={testID}
      role="article"
      aria-labelledby={headingId}
      aria-label={accessibilityLabel}
    >
      <div className="flex items-start justify-between gap-2">
        <h3
          id={headingId}
          className="text-titleText font-serif text-lg font-semibold leading-tight"
        >
          {title}
        </h3>
        {intensity && <Badge tone="neutral">{intensityLabels[intensity]}</Badge>}
      </div>
      <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 text-bodyText text-sm">
        <div className="flex items-center gap-1">
          <dt className="sr-only">Duration</dt>
          <dd>{formatDuration(durationMinutes)}</dd>
        </div>
      </dl>
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
        >
          {buttonLabel}
        </Button>
      )}
    </Card>
  );
}

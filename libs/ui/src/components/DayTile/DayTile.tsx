import { cn } from '../../lib/cn.js';
import type { DayTileBaseProps, DayTileStatus } from './DayTile.types.js';

export type DayTileProps = DayTileBaseProps;

const statusClass: Record<DayTileStatus, string> = {
  locked:
    'bg-surface text-bodyText border-border opacity-50 cursor-not-allowed',
  upcoming: 'bg-surface text-bodyText border-border',
  today: 'bg-surface text-titleText border-cta ring-2 ring-cta',
  completed: 'bg-cream text-titleText border-titleText',
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

  const tileClass = cn(
    'flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-md border text-sm font-sans',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-titleText focus-visible:ring-offset-2',
    statusClass[status],
    className,
  );

  const content = (
    <>
      <span className="font-serif text-base font-semibold leading-none">
        {dateLabel ?? dayNumber}
      </span>
      {status === 'completed' && (
        <span aria-hidden className="text-titleText">
          {typeof starsEarned === 'number' ? `★ ${starsEarned}` : '✓'}
        </span>
      )}
    </>
  );

  if (interactive) {
    return (
      <button
        type="button"
        data-testid={testID}
        aria-label={label}
        onClick={onPress}
        className={tileClass}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      data-testid={testID}
      role="gridcell"
      aria-label={label}
      aria-disabled={status === 'locked'}
      className={tileClass}
    >
      {content}
    </div>
  );
}

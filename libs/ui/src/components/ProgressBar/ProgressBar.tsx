import { cn } from '../../lib/cn.js';
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
    <div
      data-testid={testID}
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn(
        'h-2 w-full rounded-full bg-cream overflow-hidden border border-border',
        className,
      )}
    >
      <div
        className="h-full bg-cta transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

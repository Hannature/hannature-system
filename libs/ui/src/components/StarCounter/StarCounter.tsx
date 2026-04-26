import { cn } from '../../lib/cn.js';
import { ProgressBar } from '../ProgressBar/ProgressBar.js';
import {
  DEFAULT_STAR_THRESHOLD,
  type StarCounterBaseProps,
  type StarCounterSize,
} from './StarCounter.types.js';

export type StarCounterProps = StarCounterBaseProps;

const starSize: Record<StarCounterSize, number> = {
  sm: 14,
  md: 20,
  lg: 28,
};

const labelSize: Record<StarCounterSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

function StarIcon({ size, filled }: { size: number; filled: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.6l-5.9 3.08 1.13-6.58L2.45 9.44l6.6-.96L12 2.5z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
  const px = starSize[size];

  return (
    <div
      data-testid={testID}
      role="group"
      aria-label={label}
      className={cn('flex flex-col gap-2 text-titleText', className)}
    >
      <div className="flex items-center gap-2">
        <span className="flex items-center" aria-hidden="true">
          <StarIcon size={px} filled />
        </span>
        <span className={cn('font-sans font-semibold', labelSize[size])}>
          {safeCount} / {threshold}
        </span>
      </div>
      {showProgress && (
        <ProgressBar value={safeCount} max={threshold} label={label} />
      )}
    </div>
  );
}

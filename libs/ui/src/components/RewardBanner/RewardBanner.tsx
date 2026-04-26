import { cn } from '../../lib/cn.js';
import { Button } from '../Button/Button.js';
import { formatExpiry, type RewardBannerBaseProps } from './RewardBanner.types.js';

export type RewardBannerProps = RewardBannerBaseProps;

export function RewardBanner({
  title,
  description,
  code,
  expiresAt,
  onClaim,
  claimLabel = 'Claim reward',
  dismissible = false,
  onDismiss,
  className,
  testID,
  accessibilityLabel,
}: RewardBannerProps) {
  const headingId = `reward-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div
      data-testid={testID}
      role="status"
      aria-live="polite"
      aria-labelledby={headingId}
      aria-label={accessibilityLabel}
      className={cn(
        'relative flex flex-col gap-3 rounded-md bg-cta p-6 shadow-sm',
        className,
      )}
    >
      {dismissible && onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss reward"
          className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full text-titleText hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-titleText focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
      <h3
        id={headingId}
        className="text-titleText font-serif text-xl font-semibold"
      >
        {title}
      </h3>
      {description && (
        <p className="text-titleText text-sm leading-snug">{description}</p>
      )}
      {code && (
        <div className="flex flex-col gap-1">
          <span className="text-titleText text-xs font-medium uppercase tracking-wide">
            Discount code
          </span>
          <code className="rounded-md bg-surface px-3 py-2 font-mono text-sm text-titleText border border-border self-start">
            {code}
          </code>
        </div>
      )}
      {expiresAt && (
        <p className="text-titleText text-xs">Expires {formatExpiry(expiresAt)}</p>
      )}
      {onClaim && (
        <div className="self-start">
          <Button variant="secondary" size="md" onPress={onClaim}>
            {claimLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

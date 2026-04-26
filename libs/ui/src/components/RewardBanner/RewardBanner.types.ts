export interface RewardBannerBaseProps {
  title: string;
  description?: string;
  code?: string;
  expiresAt?: string;
  onClaim?: () => void;
  claimLabel?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  testID?: string;
  accessibilityLabel?: string;
}

export function formatExpiry(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

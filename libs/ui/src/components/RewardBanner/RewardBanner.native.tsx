import { Pressable, Text, View } from 'react-native';
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
  return (
    <View
      testID={testID}
      accessible
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      accessibilityLabel={accessibilityLabel ?? title}
      className={['relative gap-3 rounded-md bg-cta p-6', className ?? '']
        .filter(Boolean)
        .join(' ')}
    >
      {dismissible && onDismiss && (
        <Pressable
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss reward"
          className="absolute right-3 top-3 h-6 w-6 items-center justify-center rounded-full"
        >
          <Text className="text-titleText">×</Text>
        </Pressable>
      )}
      <Text className="text-titleText font-serif text-xl font-semibold">
        {title}
      </Text>
      {description && (
        <Text className="text-titleText text-sm">{description}</Text>
      )}
      {code && (
        <View className="gap-1">
          <Text className="text-titleText text-xs font-medium uppercase">
            Discount code
          </Text>
          <View className="self-start rounded-md bg-surface border border-border px-3 py-2">
            <Text className="font-mono text-sm text-titleText">{code}</Text>
          </View>
        </View>
      )}
      {expiresAt && (
        <Text className="text-titleText text-xs">
          Expires {formatExpiry(expiresAt)}
        </Text>
      )}
      {onClaim && (
        <View className="self-start">
          <Button variant="secondary" size="md" onPress={onClaim}>
            {claimLabel}
          </Button>
        </View>
      )}
    </View>
  );
}

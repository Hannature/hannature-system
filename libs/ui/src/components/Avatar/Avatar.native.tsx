import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import type { AvatarBaseProps, AvatarSize } from './Avatar.types.js';

const containerSize: Record<AvatarSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

const labelSize: Record<AvatarSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

function deriveInitials(value: string | undefined): string {
  if (!value) return '';
  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export type AvatarProps = AvatarBaseProps;

export function Avatar({
  source,
  initials,
  alt,
  size = 'md',
  className,
  testID,
}: AvatarProps) {
  const [errored, setErrored] = useState(false);
  const showImage = !!source && !errored;
  const fallback = initials ?? deriveInitials(alt);

  return (
    <View
      testID={testID}
      accessible
      accessibilityLabel={alt}
      accessibilityRole="image"
      className={[
        'items-center justify-center rounded-full bg-cream overflow-hidden',
        containerSize[size],
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showImage ? (
        <Image
          source={{ uri: source }}
          accessibilityLabel={alt}
          onError={() => setErrored(true)}
          className="h-full w-full"
          resizeMode="cover"
        />
      ) : (
        <Text
          className={['text-titleText font-sans font-medium', labelSize[size]].join(' ')}
        >
          {fallback}
        </Text>
      )}
    </View>
  );
}

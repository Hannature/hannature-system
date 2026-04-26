import { useState } from 'react';
import { cn } from '../../lib/cn.js';
import type { AvatarBaseProps, AvatarSize } from './Avatar.types.js';

const sizeClass: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
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
    <span
      data-testid={testID}
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-cream text-titleText font-sans font-medium overflow-hidden',
        sizeClass[size],
        className,
      )}
    >
      {showImage ? (
        <img
          src={source}
          alt={alt ?? ''}
          className="h-full w-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <span aria-hidden={!!alt}>{fallback}</span>
      )}
      {!showImage && alt && <span className="sr-only">{alt}</span>}
    </span>
  );
}

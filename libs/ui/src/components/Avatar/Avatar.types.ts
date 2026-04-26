export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarBaseProps {
  source?: string | null;
  initials?: string;
  alt?: string;
  size?: AvatarSize;
  className?: string;
  testID?: string;
}

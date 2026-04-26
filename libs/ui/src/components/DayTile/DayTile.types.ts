export type DayTileStatus = 'locked' | 'upcoming' | 'today' | 'completed';

export interface DayTileBaseProps {
  dayNumber: number;
  dateLabel?: string;
  status?: DayTileStatus;
  starsEarned?: number;
  onPress?: () => void;
  className?: string;
  testID?: string;
  accessibilityLabel?: string;
}

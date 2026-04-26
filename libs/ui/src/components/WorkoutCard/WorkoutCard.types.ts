export type WorkoutIntensity = 'gentle' | 'moderate' | 'vigorous';
export type WorkoutStatus = 'upcoming' | 'in-progress' | 'completed';

export interface WorkoutCardBaseProps {
  title: string;
  durationMinutes: number;
  intensity?: WorkoutIntensity;
  progress?: number;
  status?: WorkoutStatus;
  onStart?: () => void;
  startLabel?: string;
  className?: string;
  testID?: string;
  accessibilityLabel?: string;
}

export const intensityLabels: Record<WorkoutIntensity, string> = {
  gentle: 'Gentle',
  moderate: 'Moderate',
  vigorous: 'Vigorous',
};

export const statusLabels: Record<WorkoutStatus, string> = {
  upcoming: 'Start workout',
  'in-progress': 'Resume',
  completed: 'Completed',
};

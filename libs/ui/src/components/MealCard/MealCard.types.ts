export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MealCardBaseProps {
  title: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  mealType?: MealType;
  completed?: boolean;
  onValidate?: () => void;
  validateLabel?: string;
  className?: string;
  testID?: string;
  accessibilityLabel?: string;
}

export const mealTypeLabels: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
};

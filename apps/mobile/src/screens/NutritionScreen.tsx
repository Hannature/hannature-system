import { useEffect } from 'react';

import { useAppStore } from '../state/useAppStore';
import { PlaceholderScreen } from './PlaceholderScreen';

export function NutritionScreen() {
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  useEffect(() => {
    setActiveTab('Nutrition');
  }, [setActiveTab]);

  return (
    <PlaceholderScreen
      title="Nutrition"
      subtitle="Meals, macros, and daily intake will live here."
    />
  );
}

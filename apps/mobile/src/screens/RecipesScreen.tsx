import { useEffect } from 'react';

import { useAppStore } from '../state/useAppStore';
import { PlaceholderScreen } from './PlaceholderScreen';

export function RecipesScreen() {
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  useEffect(() => {
    setActiveTab('Recipes');
  }, [setActiveTab]);

  return (
    <PlaceholderScreen
      title="Recipes"
      subtitle="Browse and save recipes that fit your plan."
    />
  );
}

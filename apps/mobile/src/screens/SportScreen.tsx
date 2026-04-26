import { useEffect } from 'react';

import { useAppStore } from '../state/useAppStore';
import { PlaceholderScreen } from './PlaceholderScreen';

export function SportScreen() {
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  useEffect(() => {
    setActiveTab('Sport');
  }, [setActiveTab]);

  return (
    <PlaceholderScreen
      title="Sport"
      subtitle="Track workouts, plans, and progress. Real content lands in a later story."
    />
  );
}

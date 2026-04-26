import { create } from 'zustand';

import type { TabParamList } from '../navigation/types';

type ActiveTab = keyof TabParamList;

type AppState = {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
};

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'Sport',
  setActiveTab: (activeTab) => set({ activeTab }),
}));

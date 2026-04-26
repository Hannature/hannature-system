import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Sport: undefined;
  Nutrition: undefined;
  Recipes: undefined;
};

export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  Profile: undefined;
  Settings: undefined;
  Rewards: undefined;
  Legal: undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
    interface RootParamList extends DrawerParamList {}
  }
}

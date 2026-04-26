import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  BEHAVIORAL_GOALS,
  type BehavioralGoal,
} from '@hannature/shared-types';
import { Button, Card } from '@hannature/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../app/ThemeProvider';
import type { AuthParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthParamList, 'OnboardingGoal'>;

export function OnboardingGoalScreen({ navigation }: Props) {
  const { t } = useTranslation('onboarding');
  const tokens = useTheme();
  const { semantic } = tokens.colors;
  const [selected, setSelected] = useState<BehavioralGoal | null>(null);

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={[styles.root, { backgroundColor: semantic.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text
          style={{
            fontFamily: tokens.typography.fontFamilies.serif,
            fontSize: 26,
            color: semantic.titleText,
          }}
        >
          {t('goal.title')}
        </Text>
        <Text
          style={{
            marginTop: 6,
            marginBottom: 20,
            fontFamily: tokens.typography.fontFamilies.sans,
            fontSize: 15,
            color: semantic.bodyText,
          }}
        >
          {t('goal.subtitle')}
        </Text>

        <View style={styles.grid}>
          {BEHAVIORAL_GOALS.map((goal) => {
            const isSelected = selected === goal;
            return (
              <Pressable
                key={goal}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={t(`goal.options.${goal}.label`)}
                testID={`goal-${goal}`}
                onPress={() => setSelected(goal)}
                style={{ width: '100%' }}
              >
                <Card
                  padding="md"
                  className={isSelected ? 'border-cta' : ''}
                >
                  <Text
                    style={{
                      fontFamily: tokens.typography.fontFamilies.serif,
                      fontSize: 18,
                      color: isSelected ? semantic.cta : semantic.titleText,
                    }}
                  >
                    {t(`goal.options.${goal}.label`)}
                  </Text>
                  <Text
                    style={{
                      marginTop: 4,
                      fontFamily: tokens.typography.fontFamilies.sans,
                      fontSize: 14,
                      color: semantic.bodyText,
                    }}
                  >
                    {t(`goal.options.${goal}.description`)}
                  </Text>
                </Card>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.cta}>
        <Button
          accessibilityLabel={t('goal.continue')}
          disabled={!selected}
          onPress={() => {
            if (selected) {
              navigation.navigate('OnboardingConsent', { goal: selected });
            }
          }}
          testID="goal-continue"
        >
          {t('goal.continue')}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  grid: {
    gap: 12,
  },
  cta: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 8,
  },
});

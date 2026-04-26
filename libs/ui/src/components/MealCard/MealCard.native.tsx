import { Image, Text, View } from 'react-native';
import { Badge } from '../Badge/Badge.js';
import { Button } from '../Button/Button.js';
import { Card } from '../Card/Card.js';
import { mealTypeLabels, type MealCardBaseProps } from './MealCard.types.js';

export type MealCardProps = MealCardBaseProps;

export function MealCard({
  title,
  description,
  imageUrl,
  imageAlt,
  mealType,
  completed = false,
  onValidate,
  validateLabel,
  className,
  testID,
  accessibilityLabel,
}: MealCardProps) {
  const buttonLabel = validateLabel ?? (completed ? 'Completed' : 'Mark complete');

  return (
    <Card
      padding="md"
      className={['gap-3', className ?? ''].filter(Boolean).join(' ')}
      testID={testID}
    >
      <View
        accessible
        accessibilityRole="summary"
        accessibilityLabel={accessibilityLabel ?? title}
        className="gap-3"
      >
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            accessibilityLabel={imageAlt}
            className="h-32 w-full rounded-md"
            resizeMode="cover"
          />
        )}
        <View className="flex-row items-center justify-between gap-2">
          <Text className="text-titleText font-serif text-lg font-semibold flex-shrink">
            {title}
          </Text>
          {mealType && <Badge tone="accent">{mealTypeLabels[mealType]}</Badge>}
        </View>
        {description && (
          <Text className="text-bodyText text-sm">{description}</Text>
        )}
      </View>
      {onValidate && (
        <Button
          variant={completed ? 'secondary' : 'primary'}
          size="md"
          disabled={completed}
          onPress={onValidate}
          accessibilityLabel={buttonLabel}
        >
          {buttonLabel}
        </Button>
      )}
    </Card>
  );
}

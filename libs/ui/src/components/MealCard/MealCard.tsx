import { cn } from '../../lib/cn.js';
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
  const headingId = `meal-${title.replace(/\s+/g, '-').toLowerCase()}`;
  const buttonLabel = validateLabel ?? (completed ? 'Completed' : 'Mark complete');

  return (
    <Card
      padding="md"
      className={cn('flex flex-col gap-3', className)}
      testID={testID}
      role="article"
      aria-labelledby={headingId}
      aria-label={accessibilityLabel}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={imageAlt ?? ''}
          className="h-32 w-full rounded-md object-cover"
        />
      )}
      <div className="flex items-center justify-between gap-2">
        <h3
          id={headingId}
          className="text-titleText font-serif text-lg font-semibold leading-tight"
        >
          {title}
        </h3>
        {mealType && <Badge tone="accent">{mealTypeLabels[mealType]}</Badge>}
      </div>
      {description && (
        <p className="text-bodyText text-sm leading-snug">{description}</p>
      )}
      {onValidate && (
        <Button
          variant={completed ? 'secondary' : 'primary'}
          size="md"
          disabled={completed}
          onPress={onValidate}
          aria-pressed={completed}
        >
          {buttonLabel}
        </Button>
      )}
    </Card>
  );
}

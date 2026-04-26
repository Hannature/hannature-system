import { Modal as RNModal, Text, View } from 'react-native';
import type { ModalBaseProps } from './Modal.types.js';

export type ModalProps = ModalBaseProps;

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  testID,
}: ModalProps) {
  return (
    <RNModal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
      testID={testID}
    >
      <View className="flex-1 items-center justify-center bg-black/40 px-4">
        <View
          className={[
            'w-full max-w-md rounded-lg bg-surface border border-border p-6',
            className ?? '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {title ? (
            <Text className="text-titleText font-serif text-xl mb-1">{title}</Text>
          ) : null}
          {description ? (
            <Text className="text-sm text-bodyText opacity-80 mb-4">{description}</Text>
          ) : null}
          <View>{children}</View>
        </View>
      </View>
    </RNModal>
  );
}

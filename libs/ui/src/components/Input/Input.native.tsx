import { forwardRef } from 'react';
import { Text, TextInput, View } from 'react-native';
import type { InputBaseProps } from './Input.types.js';

export type InputProps = InputBaseProps;

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    error,
    helperText,
    value,
    defaultValue,
    placeholder,
    disabled,
    onChangeText,
    className,
    testID,
  },
  ref,
) {
  return (
    <View className={['flex-col gap-1', className ?? ''].filter(Boolean).join(' ')}>
      {label ? (
        <Text className="text-sm font-sans font-medium text-titleText">{label}</Text>
      ) : null}
      <TextInput
        ref={ref}
        testID={testID}
        editable={!disabled}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChangeText={onChangeText}
        accessibilityLabel={label}
        accessibilityState={{ disabled: !!disabled }}
        className={[
          'h-10 px-3 rounded-md border bg-surface text-bodyText font-sans text-base',
          error ? 'border-titleText' : 'border-border',
          disabled ? 'opacity-50' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />
      {error ? (
        <Text accessibilityRole="alert" className="text-xs font-sans text-titleText">
          {error}
        </Text>
      ) : helperText ? (
        <Text className="text-xs font-sans text-bodyText opacity-70">{helperText}</Text>
      ) : null}
    </View>
  );
});

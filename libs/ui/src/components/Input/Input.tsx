import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn.js';
import type { InputBaseProps } from './Input.types.js';

export interface InputProps
  extends Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'onChange' | 'value' | 'defaultValue' | 'disabled'
    >,
    InputBaseProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    helperText,
    onChangeText,
    className,
    id,
    testID,
    disabled,
    value,
    defaultValue,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy = error
    ? `${inputId}-error`
    : helperText
      ? `${inputId}-help`
      : undefined;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-sans font-medium text-titleText"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        data-testid={testID}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChangeText?.(e.target.value)}
        className={cn(
          'h-10 px-3 rounded-md border bg-surface text-bodyText font-sans text-base',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-titleText focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error ? 'border-titleText' : 'border-border',
        )}
        {...rest}
      />
      {error ? (
        <span
          id={`${inputId}-error`}
          role="alert"
          className="text-xs font-sans text-titleText"
        >
          {error}
        </span>
      ) : helperText ? (
        <span
          id={`${inputId}-help`}
          className="text-xs font-sans text-bodyText opacity-70"
        >
          {helperText}
        </span>
      ) : null}
    </div>
  );
});

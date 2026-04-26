export interface InputBaseProps {
  label?: string;
  error?: string;
  helperText?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  onChangeText?: (value: string) => void;
  className?: string;
  testID?: string;
  id?: string;
}

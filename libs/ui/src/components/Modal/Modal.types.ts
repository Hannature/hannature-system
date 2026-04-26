import type { ReactNode } from 'react';

export interface ModalBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  testID?: string;
}

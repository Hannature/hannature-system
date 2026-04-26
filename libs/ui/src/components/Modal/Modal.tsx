import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../lib/cn.js';
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
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content
          data-testid={testID}
          className={cn(
            'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md',
            'rounded-lg bg-surface text-bodyText p-6 shadow-md border border-border',
            'focus:outline-none',
            className,
          )}
        >
          {title && (
            <Dialog.Title className="text-titleText font-serif text-xl mb-1">
              {title}
            </Dialog.Title>
          )}
          {description && (
            <Dialog.Description className="text-sm text-bodyText opacity-80 mb-4">
              {description}
            </Dialog.Description>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

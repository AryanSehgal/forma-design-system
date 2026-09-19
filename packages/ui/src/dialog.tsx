'use client';
import * as React from 'react';
import { Dialog as Primitive } from 'radix-ui';
import { clsx } from 'clsx';
export const Dialog = Primitive.Root;
export const DialogTrigger = Primitive.Trigger;
export const DialogClose = Primitive.Close;
export const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof Primitive.Title>,
  React.ComponentPropsWithoutRef<typeof Primitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return <Primitive.Title ref={ref} className={clsx('f-dialog-title', className)} {...props} />;
});
export const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof Primitive.Description>,
  React.ComponentPropsWithoutRef<typeof Primitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <Primitive.Description
      ref={ref}
      className={clsx('f-dialog-description', className)}
      {...props}
    />
  );
});
export interface DialogContentProps extends React.ComponentPropsWithoutRef<
  typeof Primitive.Content
> {
  container?: HTMLElement | null;
  closeLabel?: string;
  showClose?: boolean;
}
export const DialogContent = React.forwardRef<
  React.ComponentRef<typeof Primitive.Content>,
  DialogContentProps
>(function DialogContent(
  { className, children, container, closeLabel = 'Close dialog', showClose = true, ...props },
  ref,
) {
  return (
    <Primitive.Portal container={container}>
      <Primitive.Overlay className="f-dialog-overlay" />
      <Primitive.Content ref={ref} className={clsx('f-dialog-content', className)} {...props}>
        {children}
        {showClose && (
          <Primitive.Close className="f-dialog-close" aria-label={closeLabel}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M6 18 18 6" />
            </svg>
          </Primitive.Close>
        )}
      </Primitive.Content>
    </Primitive.Portal>
  );
});

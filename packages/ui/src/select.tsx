'use client';
import * as React from 'react';
import { Select as Primitive } from 'radix-ui';
import { clsx } from 'clsx';
export const Select = Primitive.Root;
export const SelectValue = Primitive.Value;
export const SelectGroup = Primitive.Group;
export const SelectLabel = Primitive.Label;
export const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof Primitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof Primitive.Trigger>
>(function SelectTrigger({ className, children, ...props }, ref) {
  return (
    <Primitive.Trigger ref={ref} className={clsx('f-select-trigger', className)} {...props}>
      {children}
      <Primitive.Icon>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Primitive.Icon>
    </Primitive.Trigger>
  );
});
export interface SelectContentProps extends React.ComponentPropsWithoutRef<
  typeof Primitive.Content
> {
  container?: HTMLElement | null;
}
export const SelectContent = React.forwardRef<
  React.ComponentRef<typeof Primitive.Content>,
  SelectContentProps
>(function SelectContent({ className, children, container, position = 'popper', ...props }, ref) {
  return (
    <Primitive.Portal container={container}>
      <Primitive.Content
        ref={ref}
        position={position}
        sideOffset={6}
        className={clsx('f-select-content', className)}
        {...props}
      >
        <Primitive.ScrollUpButton className="f-select-scroll">↑</Primitive.ScrollUpButton>
        <Primitive.Viewport>{children}</Primitive.Viewport>
        <Primitive.ScrollDownButton className="f-select-scroll">↓</Primitive.ScrollDownButton>
      </Primitive.Content>
    </Primitive.Portal>
  );
});
export const SelectItem = React.forwardRef<
  React.ComponentRef<typeof Primitive.Item>,
  React.ComponentPropsWithoutRef<typeof Primitive.Item>
>(function SelectItem({ className, children, ...props }, ref) {
  return (
    <Primitive.Item ref={ref} className={clsx('f-select-item', className)} {...props}>
      <Primitive.ItemText>{children}</Primitive.ItemText>
      <Primitive.ItemIndicator aria-hidden="true">✓</Primitive.ItemIndicator>
    </Primitive.Item>
  );
});

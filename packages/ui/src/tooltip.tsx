'use client';
import * as React from 'react';
import { Tooltip as Primitive } from 'radix-ui';
import { clsx } from 'clsx';
export const TooltipProvider = Primitive.Provider;
export const Tooltip = Primitive.Root;
export const TooltipTrigger = Primitive.Trigger;
export interface TooltipContentProps extends React.ComponentPropsWithoutRef<
  typeof Primitive.Content
> {
  container?: HTMLElement | null;
}
export const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof Primitive.Content>,
  TooltipContentProps
>(function TooltipContent({ className, container, sideOffset = 6, children, ...props }, ref) {
  return (
    <Primitive.Portal container={container}>
      <Primitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={clsx('f-tooltip', className)}
        {...props}
      >
        {children}
        <Primitive.Arrow className="f-tooltip-arrow" />
      </Primitive.Content>
    </Primitive.Portal>
  );
});

'use client';
import * as React from 'react';
import { Checkbox as Primitive } from 'radix-ui';
import { clsx } from 'clsx';
export type CheckboxProps = React.ComponentPropsWithoutRef<typeof Primitive.Root>;
export const Checkbox = React.forwardRef<React.ComponentRef<typeof Primitive.Root>, CheckboxProps>(
  function Checkbox({ className, ...props }, ref) {
    return (
      <Primitive.Root ref={ref} className={clsx('f-checkbox', className)} {...props}>
        <Primitive.Indicator className="f-checkbox-indicator">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path className="f-check-tick" d="m3 8 3 3 7-7" stroke="currentColor" strokeWidth="2" />
            <path className="f-check-minus" d="M3 8h10" stroke="currentColor" strokeWidth="2" />
          </svg>
        </Primitive.Indicator>
      </Primitive.Root>
    );
  },
);

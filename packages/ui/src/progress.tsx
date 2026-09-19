'use client';
import * as React from 'react';
import { Progress as Primitive } from 'radix-ui';
import { clsx } from 'clsx';
export type ProgressProps = React.ComponentPropsWithoutRef<typeof Primitive.Root>;
export const Progress = React.forwardRef<React.ComponentRef<typeof Primitive.Root>, ProgressProps>(
  function Progress({ value = 0, max = 100, className, ...props }, ref) {
    const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
    const safeValue =
      value === null ? null : Math.min(safeMax, Math.max(0, Number.isFinite(value) ? value : 0));
    return (
      <Primitive.Root
        ref={ref}
        max={safeMax}
        value={safeValue}
        className={clsx('f-progress', className)}
        {...props}
      >
        <Primitive.Indicator
          className="f-progress-indicator"
          style={
            safeValue === null
              ? undefined
              : { transform: `translateX(-${100 - (safeValue / safeMax) * 100}%)` }
          }
        />
      </Primitive.Root>
    );
  },
);

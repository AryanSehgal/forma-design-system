'use client';
import * as React from 'react';
import { Switch as Primitive } from 'radix-ui';
import { clsx } from 'clsx';
export type SwitchProps = React.ComponentPropsWithoutRef<typeof Primitive.Root>;
export const Switch = React.forwardRef<React.ComponentRef<typeof Primitive.Root>, SwitchProps>(
  function Switch({ className, ...props }, ref) {
    return (
      <Primitive.Root ref={ref} className={clsx('f-switch', className)} {...props}>
        <Primitive.Thumb className="f-switch-thumb" />
      </Primitive.Root>
    );
  },
);

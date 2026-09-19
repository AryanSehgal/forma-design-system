'use client';
import * as React from 'react';
import { Separator as Primitive } from 'radix-ui';
import { clsx } from 'clsx';
export const Separator = React.forwardRef<
  React.ComponentRef<typeof Primitive.Root>,
  React.ComponentPropsWithoutRef<typeof Primitive.Root>
>(function Separator({ className, decorative = true, ...props }, ref) {
  return (
    <Primitive.Root
      ref={ref}
      decorative={decorative}
      className={clsx('f-separator', className)}
      {...props}
    />
  );
});

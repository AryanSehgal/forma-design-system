import * as React from 'react';
import { clsx } from 'clsx';
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden="true" className={clsx('f-skeleton', className)} {...props} />;
}

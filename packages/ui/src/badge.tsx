import * as React from 'react';
import { clsx } from 'clsx';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger';
}
export function Badge({ variant = 'neutral', className, ...props }: BadgeProps) {
  return <span className={clsx('f-badge', `f-badge--${variant}`, className)} {...props} />;
}

'use client';
import * as React from 'react';
import { Slot } from 'radix-ui';
import { clsx } from 'clsx';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  asChild?: boolean;
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    asChild = false,
    disabled,
    className,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : type}
      className={clsx('f-button', `f-button--${variant}`, `f-button--${size}`, className)}
      disabled={asChild ? undefined : disabled || loading}
      aria-disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
      {...props}
      onClick={(e) => {
        if (disabled || loading) {
          e.preventDefault();
          return;
        }
        props.onClick?.(e);
      }}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading && <span className="f-spinner" aria-hidden="true" />}
          {children}
        </>
      )}
    </Comp>
  );
});

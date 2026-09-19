'use client';
import * as React from 'react';
import { clsx } from 'clsx';
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={clsx('f-input', 'f-textarea', className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
});

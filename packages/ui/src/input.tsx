'use client';
import * as React from 'react';
import { clsx } from 'clsx';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={clsx('f-input', className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
});
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  htmlFor: string;
  description?: string;
  error?: string;
  required?: boolean;
}
export function Field({
  label,
  htmlFor,
  description,
  error,
  required,
  children,
  className,
  ...props
}: FieldProps) {
  return (
    <div className={clsx('f-field', className)} {...props}>
      <label htmlFor={htmlFor}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error ? (
        <p className="f-field-error" id={`${htmlFor}-error`}>
          {error}
        </p>
      ) : description ? (
        <p className="f-field-description" id={`${htmlFor}-description`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

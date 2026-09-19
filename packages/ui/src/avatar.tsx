'use client';
import * as React from 'react';
import { Avatar as Primitive } from 'radix-ui';
import { clsx } from 'clsx';
export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof Primitive.Root> {
  src?: string;
  alt: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
}
export const Avatar = React.forwardRef<React.ComponentRef<typeof Primitive.Root>, AvatarProps>(
  function Avatar({ src, alt, fallback, size = 'md', className, ...props }, ref) {
    return (
      <Primitive.Root
        ref={ref}
        className={clsx('f-avatar', `f-avatar--${size}`, className)}
        {...props}
      >
        <Primitive.Image className="f-avatar-image" src={src} alt={alt} />
        <Primitive.Fallback className="f-avatar-fallback" role="img" aria-label={alt}>
          {fallback}
        </Primitive.Fallback>
      </Primitive.Root>
    );
  },
);

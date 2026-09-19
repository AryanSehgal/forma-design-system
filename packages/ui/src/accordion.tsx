'use client';
import * as React from 'react';
import { Accordion as Primitive } from 'radix-ui';
import { clsx } from 'clsx';
export const Accordion = Primitive.Root;
export const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof Primitive.Item>,
  React.ComponentPropsWithoutRef<typeof Primitive.Item>
>(function AccordionItem({ className, ...props }, ref) {
  return <Primitive.Item ref={ref} className={clsx('f-accordion-item', className)} {...props} />;
});
export const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof Primitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof Primitive.Trigger>
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <Primitive.Header className="f-accordion-header">
      <Primitive.Trigger ref={ref} className={clsx('f-accordion-trigger', className)} {...props}>
        {children}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Primitive.Trigger>
    </Primitive.Header>
  );
});
export const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Primitive.Content>
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <Primitive.Content ref={ref} className={clsx('f-accordion-content', className)} {...props}>
      <div>{children}</div>
    </Primitive.Content>
  );
});

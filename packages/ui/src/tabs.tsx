'use client';
import * as React from 'react';
import { Tabs as Primitive } from 'radix-ui';
import { clsx } from 'clsx';
export const Tabs = Primitive.Root;
export const TabsList = React.forwardRef<
  React.ComponentRef<typeof Primitive.List>,
  React.ComponentPropsWithoutRef<typeof Primitive.List>
>(function TabsList({ className, ...props }, ref) {
  return <Primitive.List ref={ref} className={clsx('f-tabs-list', className)} {...props} />;
});
export const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof Primitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof Primitive.Trigger>
>(function TabsTrigger({ className, ...props }, ref) {
  return <Primitive.Trigger ref={ref} className={clsx('f-tabs-trigger', className)} {...props} />;
});
export const TabsContent = React.forwardRef<
  React.ComponentRef<typeof Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Primitive.Content>
>(function TabsContent({ className, ...props }, ref) {
  return <Primitive.Content ref={ref} className={clsx('f-tabs-content', className)} {...props} />;
});

'use client';
import { useId, useState } from 'react';
import { Plus, ArrowRight, Bookmark, Check } from 'lucide-react';
import {
  Button,
  Input,
  Field,
  Textarea,
  Checkbox,
  Switch,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Badge,
  Avatar,
  Progress,
  Skeleton,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@forma-design/ui';
import type { ButtonProps, BadgeProps, AvatarProps } from '@forma-design/ui';
export type Values = Record<string, string | number | boolean>;
export function Demo({
  slug,
  values: v,
  portalContainer,
}: {
  slug: string;
  values: Values;
  portalContainer?: HTMLElement | null;
}) {
  const id = useId();
  const [checked, setChecked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState('Jamie Lee');
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);
  const label = String(v.label ?? '');
  const disabled = Boolean(v.disabled);
  switch (slug) {
    case 'button':
      return (
        <div className="center-stack">
          <Button
            variant={v.variant as ButtonProps['variant']}
            size={v.size as ButtonProps['size']}
            disabled={disabled}
            loading={Boolean(v.loading)}
            onClick={() => setClicks((n) => n + 1)}
          >
            {label || 'Continue'}
            <ArrowRight size={16} />
          </Button>
          <span className="demo-feedback" role="status">
            {clicks
              ? `Activated ${clicks} ${clicks === 1 ? 'time' : 'times'}`
              : 'Try it. Every detail is interactive.'}
          </span>
        </div>
      );
    case 'input':
      return (
        <div className="demo-form">
          <Field
            htmlFor={id}
            label="Email address"
            description="We’ll use this to contact you."
            error={v.invalid ? 'Enter a valid email address.' : undefined}
          >
            <Input
              id={id}
              type="email"
              placeholder={label}
              disabled={disabled}
              invalid={Boolean(v.invalid)}
              aria-describedby={`${id}-${v.invalid ? 'error' : 'description'}`}
            />
          </Field>
        </div>
      );
    case 'textarea':
      return (
        <div className="demo-form">
          <Field
            htmlFor={id}
            label="About your project"
            description="A few sentences is a great start."
            error={v.invalid ? 'Please add a description.' : undefined}
          >
            <Textarea
              id={id}
              placeholder={label}
              disabled={disabled}
              invalid={Boolean(v.invalid)}
              aria-describedby={`${id}-${v.invalid ? 'error' : 'description'}`}
            />
          </Field>
        </div>
      );
    case 'checkbox':
      return (
        <label className="demo-check">
          <Checkbox
            checked={v.indeterminate ? 'indeterminate' : checked}
            onCheckedChange={(c) => setChecked(c === true)}
            disabled={disabled}
          />
          <span>
            {label || 'Accept terms and conditions'}
            <small>
              {v.indeterminate
                ? 'A partially selected group.'
                : 'Press Space to toggle the selection.'}
            </small>
          </span>
        </label>
      );
    case 'switch':
      return (
        <div className="demo-setting">
          <div>
            <label htmlFor={id}>{label || 'Email notifications'}</label>
            <p>Keep up with what matters to you.</p>
          </div>
          <Switch id={id} disabled={disabled} checked={checked} onCheckedChange={setChecked} />
        </div>
      );
    case 'select':
      return (
        <div className="demo-form">
          <Field htmlFor={id} label="Framework">
            <Select defaultValue="next" disabled={disabled}>
              <SelectTrigger id={id}>
                <SelectValue placeholder="Choose a framework" />
              </SelectTrigger>
              <SelectContent container={portalContainer}>
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="remix">Remix</SelectItem>
                <SelectItem value="astro">Astro</SelectItem>
                <SelectItem value="soon" disabled>
                  More coming soon
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
      );
    case 'badge':
      return <Badge variant={v.variant as BadgeProps['variant']}>{label || 'Published'}</Badge>;
    case 'avatar':
      return (
        <Avatar size={v.size as AvatarProps['size']} fallback={label || 'AS'} alt="Aryan Sehgal" />
      );
    case 'progress':
      return (
        <div className="demo-form">
          <div className="progress-label">
            <span>Uploading your files</span>
            <span>{v.value}%</span>
          </div>
          <Progress value={Number(v.value)} aria-label="File upload progress" />
        </div>
      );
    case 'skeleton':
      return (
        <div className="demo-form" role="status" aria-label="Loading profile">
          <div className="skeleton-example">
            <Skeleton style={{ width: 48, height: 48, borderRadius: '50%' }} />
            <div>
              <Skeleton style={{ height: 14, width: 150 }} />
              <Skeleton style={{ height: 12, width: 110, marginTop: 10 }} />
            </div>
          </div>
          <Skeleton style={{ height: 12, width: '100%', marginTop: 24 }} />
          <Skeleton style={{ height: 12, width: '80%', marginTop: 10 }} />
          <span className="sr-only">Loading profile…</span>
        </div>
      );
    case 'card':
      return (
        <Card className="demo-form">
          <CardHeader>
            <Badge variant="brand">Workspace</Badge>
            <CardTitle style={{ marginTop: 14 }}>{label || 'Your next great idea'}</CardTitle>
            <CardDescription>Give your ideas a place to grow.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="muted-text">
              A flexible foundation for your next project, from the first sketch to the final
              detail.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setSaved(!saved)} variant={saved ? 'secondary' : 'primary'}>
              {saved ? <Check size={15} /> : <Plus size={15} />}{' '}
              {saved ? 'Project created' : 'Create project'}
            </Button>
          </CardFooter>
        </Card>
      );
    case 'separator':
      return v.orientation === 'vertical' ? (
        <div className="separator-demo vertical">
          <span>Overview</span>
          <Separator orientation="vertical" />
          <span>Activity</span>
          <Separator orientation="vertical" />
          <span>Settings</span>
        </div>
      ) : (
        <div className="separator-demo">
          <strong>A little breathing room.</strong>
          <Separator />
          <span>Group related content with a subtle boundary.</span>
        </div>
      );
    case 'tabs':
      return (
        <Tabs defaultValue="account" className="demo-form">
          <TabsList aria-label="Profile settings">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Field htmlFor={id} label="Display name">
              <Input id={id} defaultValue="Jamie Lee" />
            </Field>
          </TabsContent>
          <TabsContent value="security">
            <div className="demo-setting">
              <label htmlFor={`${id}-secure`}>Two-factor authentication</label>
              <Switch id={`${id}-secure`} defaultChecked />
            </div>
          </TabsContent>
          <TabsContent value="billing">
            <p>
              Your workspace is on the <strong>Personal plan</strong>.
            </p>
            <Badge variant="success">Free</Badge>
          </TabsContent>
        </Tabs>
      );
    case 'dialog':
      return (
        <div className="center-stack">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">{label || 'Edit profile'}</Button>
            </DialogTrigger>
            <DialogContent container={portalContainer}>
              <DialogTitle>Edit your profile</DialogTitle>
              <DialogDescription>
                Make yourself at home. Changes in this demo stay on this page.
              </DialogDescription>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSaved(true);
                  setOpen(false);
                }}
              >
                <Field htmlFor={id} label="Display name">
                  <Input id={id} value={name} onChange={(e) => setName(e.target.value)} required />
                </Field>
                <div className="dialog-actions">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <span className="demo-feedback" role="status">
            {saved ? `Profile saved for ${name}` : 'Opens a focus-managed modal.'}
          </span>
        </div>
      );
    case 'accordion':
      return (
        <Accordion type="single" collapsible defaultValue="one" className="demo-form">
          <AccordionItem value="one">
            <AccordionTrigger>Can I customize the components?</AccordionTrigger>
            <AccordionContent>
              Absolutely. Change the CSS tokens, pass a className, or compose the primitives into
              something entirely your own.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="two">
            <AccordionTrigger>Does it work with Next.js?</AccordionTrigger>
            <AccordionContent>
              Yes. Interactive exports preserve their client boundaries, and every component ships
              with TypeScript definitions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="three">
            <AccordionTrigger>Can I use the library in another project?</AccordionTrigger>
            <AccordionContent>
              Install the compiled package in any compatible React 19 project. The documentation
              website is not a runtime dependency.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    case 'tooltip':
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Bookmark"
              onClick={() => setSaved(!saved)}
              aria-pressed={saved}
            >
              <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
            </Button>
          </TooltipTrigger>
          <TooltipContent container={portalContainer}>
            {label || 'Add to your collection'}
          </TooltipContent>
        </Tooltip>
      );
    default:
      return null;
  }
}
export function exampleCode(slug: string, v: Values) {
  const q = (s: unknown) => JSON.stringify(String(s));
  const str = (key: string) => q(v[key]);
  const bool = (key: string) => (v[key] ? ` ${key}` : '');
  const label = q(v.label || 'Continue');
  const examples: Record<string, string> = {
    button: `import { Button } from '@forma-design/ui/button';\n\n<Button variant=${str('variant')} size=${str('size')}${bool('disabled')}${bool('loading')}>\n  {${label}}\n</Button>`,
    input: `import { Field, Input } from '@forma-design/ui/input';\n\n<Field htmlFor="email" label="Email address"${v.invalid ? ' error="Enter a valid email address."' : ' description="We’ll use this to contact you."'}>\n  <Input id="email" type="email"\n    placeholder=${str('label')}${bool('disabled')}${bool('invalid')}\n    aria-describedby="email-${v.invalid ? 'error' : 'description'}" />\n</Field>`,
    textarea: `import { Field } from '@forma-design/ui/input';\nimport { Textarea } from '@forma-design/ui/textarea';\n\n<Field htmlFor="about" label="About your project"${v.invalid ? ' error="Please add a description."' : ' description="A few sentences is a great start."'}>\n  <Textarea id="about" placeholder=${str('label')}${bool('disabled')}${bool('invalid')}\n    aria-describedby="about-${v.invalid ? 'error' : 'description'}" />\n</Field>`,
    checkbox: `import { Checkbox } from '@forma-design/ui/checkbox';\n\n<label>\n  <Checkbox${v.indeterminate ? ' checked="indeterminate"' : ''}${bool('disabled')} />\n  {${str('label')}}\n</label>`,
    switch: `import { Switch } from '@forma-design/ui/switch';\n\n<label htmlFor="notifications">{${str('label')}}</label>\n<Switch id="notifications"${bool('disabled')} />`,
    select: `import { Select, SelectTrigger, SelectValue,\n  SelectContent, SelectItem } from '@forma-design/ui/select';\n\n<label htmlFor="framework">Framework</label>\n<Select defaultValue="next"${bool('disabled')}>\n  <SelectTrigger id="framework"><SelectValue /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value="next">Next.js</SelectItem>\n    <SelectItem value="remix">Remix</SelectItem>\n    <SelectItem value="astro">Astro</SelectItem>\n    <SelectItem value="soon" disabled>More coming soon</SelectItem>\n  </SelectContent>\n</Select>`,
    badge: `import { Badge } from '@forma-design/ui/badge';\n\n<Badge variant=${str('variant')}>{${str('label')}}</Badge>`,
    avatar: `import { Avatar } from '@forma-design/ui/avatar';\n\n<Avatar alt="Aryan Sehgal" fallback=${str('label')} size=${str('size')} />`,
    progress: `import { Progress } from '@forma-design/ui/progress';\n\n<Progress value={${Number(v.value)}} aria-label="File upload progress" />`,
    skeleton: `import { Skeleton } from '@forma-design/ui/skeleton';\n\n<div role="status" aria-label="Loading profile">\n  <Skeleton style={{ width: 48, height: 48, borderRadius: '50%' }} />\n  <Skeleton style={{ width: 150, height: 14, marginTop: 12 }} />\n</div>`,
    card: `import { Card, CardHeader, CardTitle, CardDescription,\n  CardContent, CardFooter } from '@forma-design/ui/card';\nimport { Button } from '@forma-design/ui/button';\n\n<Card>\n  <CardHeader>\n    <CardTitle>{${str('label')}}</CardTitle>\n    <CardDescription>Give your ideas a place to grow.</CardDescription>\n  </CardHeader>\n  <CardContent>A flexible foundation for your next project.</CardContent>\n  <CardFooter><Button>Create project</Button></CardFooter>\n</Card>`,
    separator: `import { Separator } from '@forma-design/ui/separator';\n\n<Separator orientation=${str('orientation')} />`,
    tabs: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@forma-design/ui/tabs';\n\n<Tabs defaultValue="account">\n  <TabsList aria-label="Profile settings">\n    <TabsTrigger value="account">Account</TabsTrigger>\n    <TabsTrigger value="security">Security</TabsTrigger>\n    <TabsTrigger value="billing">Billing</TabsTrigger>\n  </TabsList>\n  <TabsContent value="account">Account settings</TabsContent>\n  <TabsContent value="security">Security settings</TabsContent>\n  <TabsContent value="billing">Billing settings</TabsContent>\n</Tabs>`,
    dialog: `import { Dialog, DialogTrigger, DialogContent, DialogTitle,\n  DialogDescription, DialogClose } from '@forma-design/ui/dialog';\nimport { Button } from '@forma-design/ui/button';\n\n<Dialog>\n  <DialogTrigger asChild><Button>{${str('label')}}</Button></DialogTrigger>\n  <DialogContent>\n    <DialogTitle>Edit your profile</DialogTitle>\n    <DialogDescription>Update your display name.</DialogDescription>\n    {/* Add your profile form here. */}\n    <DialogClose asChild><Button>Close</Button></DialogClose>\n  </DialogContent>\n</Dialog>`,
    accordion: `import { Accordion, AccordionItem, AccordionTrigger,\n  AccordionContent } from '@forma-design/ui/accordion';\n\n<Accordion type="single" collapsible defaultValue="customize">\n  <AccordionItem value="customize">\n    <AccordionTrigger>Can I customize the components?</AccordionTrigger>\n    <AccordionContent>Yes. Override CSS tokens or pass a className.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
    tooltip: `import { TooltipProvider, Tooltip, TooltipTrigger,\n  TooltipContent } from '@forma-design/ui/tooltip';\nimport { Button } from '@forma-design/ui/button';\n\n<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger asChild><Button>Bookmark</Button></TooltipTrigger>\n    <TooltipContent>{${str('label')}}</TooltipContent>\n  </Tooltip>\n</TooltipProvider>`,
  };
  return `'use client';\n\n${examples[slug] ?? ''}`;
}

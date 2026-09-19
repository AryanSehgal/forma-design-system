# @aryan_sehgal/forma-ui

Forma UI is a composable React 19 component library with TypeScript declarations, semantic CSS tokens, and accessible interaction primitives. Explore the complete component playground at [forma-design-system-docs.vercel.app/getting-started](https://forma-design-system-docs.vercel.app/getting-started).

[View the package on npm](https://www.npmjs.com/package/@aryan_sehgal/forma-ui) · [View the author profile](https://github.com/AryanSehgal)

## Install

```sh
npm install @aryan_sehgal/forma-ui
```

Import the shared stylesheet once, then use a focused component entry point:

```tsx
'use client';

import { Button } from '@aryan_sehgal/forma-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@aryan_sehgal/forma-ui/dialog';
import '@aryan_sehgal/forma-ui/styles.css';

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Your project</DialogTitle>
        <DialogDescription>A focused space for your next idea.</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
```

## Public entry points

Individual ESM entry points are available for `button`, `input`, `textarea`, `checkbox`, `switch`, `select`, `badge`, `avatar`, `progress`, `skeleton`, `card`, `separator`, `tabs`, `dialog`, `accordion`, and `tooltip`. The package root exports all components.

`@aryan_sehgal/forma-ui/registry` exports framework-independent, serializable `catalog` and `defaults` data for visual editors and page builders.

## Design and accessibility

- React and React DOM are peer dependencies; Next.js is not required.
- ESM JavaScript and TypeScript declarations are built for every public entry point.
- Complex interactions use Radix primitives for keyboard behavior, semantics, focus management, and controlled/uncontrolled state.
- CSS uses the `f-` class prefix and `--f-` token namespace. It does not reset global HTML elements.
- Import `styles.css` once and customize semantic variables with CSS. Scope dark themes with `data-f-theme="dark"`.
- Floating `Dialog`, `Select`, and `Tooltip` content accepts a `container` prop for theme-aware portal placement.
- Button defaults to `type="button"`; loading makes it busy and disabled.
- `Field` renders label, help, and error content. Connect inputs with `id`, `htmlFor`, and `aria-describedby`.
- `Progress` accepts `null` for an indeterminate state and clamps numeric values to its configured maximum.

These primitives support accessible interfaces, but consumers remain responsible for meaningful names, content structure, contrast, and testing the complete application state.

## Local package development

From the repository root:

```sh
npm install
npm run build -w @aryan_sehgal/forma-ui
npm test
```

The full development and deployment guide lives in the root repository README.

## License

No distribution license has been selected yet. Choose and add a license before accepting external contributions or encouraging redistribution.

Built by [Aryan Sehgal](https://github.com/AryanSehgal).

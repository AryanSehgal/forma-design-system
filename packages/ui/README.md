# @forma-design/ui

A composable React 19 component library with TypeScript declarations, semantic CSS tokens, and accessible interaction primitives.

**Local review release:** this provisional package has not been published to npm. Install the generated tarball to try it in another app. A distribution license has not yet been selected.

```tsx
import { Button } from '@forma-design/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@forma-design/ui/dialog';
import '@forma-design/ui/styles.css';

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

## Imports

Individual entry points: `button`, `input`, `textarea`, `checkbox`, `switch`, `select`, `badge`, `avatar`, `progress`, `skeleton`, `card`, `separator`, `tabs`, `dialog`, `accordion`, `tooltip`.

The package root also exports all components. `@forma-design/ui/registry` exports framework-independent, serializable component metadata and default editor values.

## Design

- React and React DOM are peer dependencies; Next.js is not required.
- ESM JavaScript and TypeScript declarations are built for every public entry point.
- Complex interactions are built on Radix primitives; Forma adds styling and APIs.
- Components forward native props and refs where applicable. Badge/Skeleton are simple functional wrappers.
- Dialog, Select, Tabs, Switch, Checkbox and Accordion support the underlying Radix controlled and uncontrolled patterns.
- CSS uses the `f-` class prefix and `--f-` tokens. It does not reset global HTML elements.
- Import `styles.css` once. Customize tokens through CSS variables; scope themes with `data-f-theme`.
- Floating content accepts a `container` for theme-aware portal placement.
- Button defaults to `type="button"`. Loading makes it busy and disabled. `asChild` supports a single React element; provide its accessible name and link semantics.
- Field renders label/help/error content. Explicitly connect your input with `id`, `htmlFor` and `aria-describedby`.
- Progress supports `null` for indeterminate state and clamps numeric values to the configured maximum.

These building blocks support accessible interfaces, but consumers remain responsible for meaningful names, correct content structure, contrast, and testing their complete application.

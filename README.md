# Forma UI

Forma UI is a reusable React component library and a companion design-system playground built with Next.js. It provides accessible primitives, semantic design tokens, interactive documentation, and metadata that can be consumed by the separate visual page builder project.

| Resource           | Link                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Live playground    | [https://forma-design-system-docs.vercel.app/](https://forma-design-system-docs.vercel.app/) |
| Public npm package | [@aryan_sehgal/forma-ui](https://www.npmjs.com/package/@aryan_sehgal/forma-ui)                                     |
| Author             | [Aryan Sehgal](https://github.com/AryanSehgal)                                                                     |

## What is included

- 16 component families: Button, Input/Field, Textarea, Checkbox, Switch, Select, Badge, Avatar, Progress, Skeleton, Card, Separator, Tabs, Dialog, Accordion, and Tooltip.
- Responsive component documentation with editable props, generated code, API summaries, keyboard guidance, and reset controls.
- A theme studio with palettes, custom colors, radius and typography controls, CSS export, and download support.
- An accessibility lab with contrast calculations, keyboard exercises, a manual checklist, and visible axe-core results.
- Searchable documentation with Command/Ctrl+K navigation.
- Light and dark themes, scoped preview themes, CSS custom properties, and portal-aware floating components.
- A serializable component registry for the page builder: catalog entries describe editor controls and default values without coupling the builder to the docs app.

Complex interactions use Radix primitives for focus management, keyboard behavior, semantics, and controlled/uncontrolled state. Forma owns the public component API, styling, tokens, examples, and editor metadata.

## Install the public package

Forma UI expects React 19 and React DOM 19 as peer dependencies. It does not require Next.js.

```sh
npm install @aryan_sehgal/forma-ui
```

Import the shared stylesheet once in the application root, then import components from focused entry points:

```tsx
'use client';

import { Button } from '@aryan_sehgal/forma-ui/button';
import { Field, Input } from '@aryan_sehgal/forma-ui/input';
import '@aryan_sehgal/forma-ui/styles.css';

export function ProjectForm() {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Field label="Project name" htmlFor="project">
        <Input id="project" name="project" required />
      </Field>
      <Button type="submit">Create project</Button>
    </form>
  );
}
```

The package root exports all components. Individual ESM entry points are available for `button`, `input`, `textarea`, `checkbox`, `switch`, `select`, `badge`, `avatar`, `progress`, `skeleton`, `card`, `separator`, `tabs`, `dialog`, `accordion`, and `tooltip`. The `@aryan_sehgal/forma-ui/registry` entry point exports serializable `catalog` and `defaults` data for editor integrations.

## Theming

Use the semantic `--f-*` variables from `styles.css` and scope a dark theme with `data-f-theme="dark"`:

```css
.brand-theme {
  --f-accent: #6d28d9;
  --f-accent-foreground: #ffffff;
  --f-radius-md: 10px;
}
```

`DialogContent`, `SelectContent`, and `TooltipContent` accept a `container` prop for portal placement. Pass a themed container when floating content needs to inherit a local theme; otherwise the components portal to `document.body`.

## Local development

Requirements: Node.js 22+ and npm 10+.

```sh
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). The dev script builds the package before starting the Next.js playground. After editing package source, run this in a second terminal:

```sh
npm run build -w @aryan_sehgal/forma-ui
```

The docs app uses Webpack polling so local changes continue to refresh on systems with restrictive file-watcher limits.

## Repository structure

```text
apps/docs/                 Next.js App Router playground
  app/                     Routes, layout, API route, and global styles
  components/              Documentation controls and interactive demos
  lib/                     Theme and contrast utilities
packages/ui/               Public React component package
  src/                     Component sources, tokens, and registry
  dist/                    Generated ESM, declarations, maps, and CSS
scripts/pack.mjs           Creates the installable npm tarball
tests/ui.test.mjs          Public package regression tests
.github/workflows/         GitHub Actions release workflow and guide
VALIDATION.md              Validation results and known testing limits
```

The playground and package are independent deliverables. The docs app consumes the compiled package, while another repository can install the same npm package and use the registry to build page-builder controls.

## Verification commands

```sh
npm test                 # Build the package and run public-package regression tests
npm run typecheck        # Type-check both workspaces
npm run build            # Build the package and production Next.js playground
npm run format:check     # Check Prettier formatting
npm run pack:ui          # Build and create an installable package artifact
```

The current automated and browser validation is documented in [VALIDATION.md](./VALIDATION.md). The accessibility lab reports the tested state; it is not a whole-site WCAG certification. Manual screen-reader testing, a formal audit, and additional browser/device coverage remain appropriate for a production release.

## Deploy the playground on Vercel

The public playground is deployed at [forma-design-system-docs.vercel.app/getting-started](https://forma-design-system-docs.vercel.app/getting-started).

For a new Vercel project connected to this monorepo, use:

- **Framework preset:** Next.js
- **Root directory:** `apps/docs`
- **Include source files outside the root directory:** enabled
- **Install command:** `cd ../.. && npm ci`
- **Build command:** `cd ../.. && npm run build`
- **Output directory:** Next.js default

The future visual page builder should have its own repository and Vercel project. Deploying the playground, publishing the npm package, and deploying the builder are separate release operations.

## Release the npm package

The package is published publicly as [`@aryan_sehgal/forma-ui`](https://www.npmjs.com/package/@aryan_sehgal/forma-ui). To build and publish a release manually from this repository:

```sh
npm run build -w @aryan_sehgal/forma-ui
npm publish --workspace=packages/ui --access public
```

The repository also includes [`.github/workflows/publish-ui.yml`](./.github/workflows/publish-ui.yml). After the GitHub repository is connected to npm Trusted Publishing, a push to `main` that changes `packages/ui`, `package.json`, or `package-lock.json` will:

1. Install dependencies and run type checks and package tests.
2. Increment the package patch version.
3. Build and publish the package with GitHub Actions OIDC authentication.
4. Commit the updated package version and lockfile back to `main`.

Configure the workflow's exact GitHub owner, repository, and filename in the npm package's **Trusted publishers** settings. The workflow stores no long-lived npm token. Every qualifying push creates a patch release, so use a deliberate versioning policy for feature and breaking releases.

## Contributing and accessibility

Keep public components independently importable, preserve the `f-` class prefix and `--f-` token namespace, and update registry metadata when editor-facing props change. Consumers are responsible for accessible names, meaningful content, contrast, and testing the complete application state around these building blocks.

## License

No distribution license has been selected yet. Choose and add a license before accepting external contributions or encouraging redistribution.

## Author

Built by [Aryan Sehgal](https://github.com/AryanSehgal).

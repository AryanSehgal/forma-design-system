# Forma — design system & component playground

A local-first React component library with a responsive Next.js documentation website. The website consumes the **compiled public package**, not source aliases. The next page-builder project can install the same package from its own repository.

**Status:** local review release, v0.1.0. Nothing has been pushed to GitHub, deployed, or published to npm. `@forma-design/ui` is a provisional package name; verify ownership/availability before publishing. A distribution license has not been selected.

## Run locally

Requirements: Node.js 22+ and npm 10+.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. No environment variables, account, database, or paid API is needed. Theme preference is stored in localStorage; demo form values stay in memory.

`npm run dev` builds the UI package before launching Next.js. After editing library source, run `npm run build -w @forma-design/ui` in another terminal. Changes in the docs app refresh automatically. The development configuration uses Webpack polling to work around local file-watcher limits.

## What’s included

- **16 component families:** Button, Input/Field, Textarea, Checkbox, Switch, Select, Badge, Avatar, Progress, Skeleton, Card, Separator, Tabs, Dialog, Accordion, Tooltip.
- Responsive collection overview with working example compositions.
- Individual component pages with editable props, generated code, API summaries, keyboard guidance, and reset controls.
- Scoped light/dark previews and persistent website theme selection.
- Theme studio with five palettes, custom color, radius, typography, CSS copying and download.
- Accessibility lab with contrast calculations, keyboard exercises, manual checklist, and real axe-core scans.
- Searchable documentation with Command/Ctrl+K.
- Optional WebMCP read/configure tools on component pages, with validated inputs and lifecycle cleanup.

The more complex interactive components use **Radix primitives** for keyboard behavior, semantics, focus management, and controlled/uncontrolled state. Forma supplies the styling, public wrappers, theme tokens, property metadata, examples, and integration. It is not a claim of having written Radix’s accessibility machinery.

## Repository layout

```text
apps/docs/               Next.js App Router showcase
  app/                   Routes, root layout and website styles
  app/api/theme/         Validated CSS attachment endpoint
  components/            Documentation controls and interactive demos
  lib/                   Shared contrast and theme generation logic
packages/ui/
  src/                   Individual component sources and styles
  src/registry.ts        Serializable metadata for editors/playgrounds
  dist/                  Built ESM, declarations, source maps, stylesheet
  scripts/               Build housekeeping
scripts/pack.mjs         Create the installable package artifact
tests/ui.test.mjs        Public-package regression tests
artifacts/               Generated npm tarball (ignored by Git)
```

## Verify

```sh
npm test                 # 9 package regression tests, against built exports
npm run typecheck        # Both workspaces
npm run build            # Library + production Next.js build
npm run format:check     # Source formatting
npm run pack:ui           # Build the standalone npm artifact
```

Browser checks and their limitations are recorded in [VALIDATION.md](./VALIDATION.md). Automated axe results are scoped to the visible preview; they do not certify whole-site WCAG compliance. Closed overlays and state-dependent content need separate testing. Manual screen-reader validation remains a release task.

## Install in a separate repository

```sh
# Run here:
npm run pack:ui

# Run in the consuming React 19 application:
npm install /absolute/path/to/artifacts/forma-design-ui-0.1.0.tgz
```

```tsx
'use client';

import { Button } from '@forma-design/ui/button';
import { Input, Field } from '@forma-design/ui/input';
import '@forma-design/ui/styles.css'; // Usually once in your root layout.

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

The package has no Next.js dependency. React and React DOM are peers, so it uses the consumer’s React instance. Individual ESM entry points allow unused JavaScript to be omitted by a consumer’s bundler. The CSS is a single shared stylesheet and is explicitly retained as a side effect. All component entry points currently carry a client boundary; `registry` is a plain, server-safe data module.

## Theme boundaries

Use semantic variables from `styles.css`. Override them on the document or a container. Set `data-f-theme="dark"` for the built-in dark palette. Theme-studio exports target the light baseline; define separate dark overrides if you want a custom dark theme.

DialogContent, SelectContent and TooltipContent accept a `container` prop for portal placement. This lets floating UI inherit the same scoped theme as its trigger. By default, they portal into the document body. The component playground supplies its own themed container. The editor shell and user-created content in the future page builder should have separate theme containers.

## Reuse in the page builder

```ts
import { catalog, defaults } from '@forma-design/ui/registry';

const button = catalog.find((component) => component.slug === 'button');
if (button) {
  const initialValues = defaults(button);
  // Build property controls using button.controls.
}
```

The registry describes **editor controls**, not an unrestricted props-spreading API. For example, a `label` control maps to children for Button and to placeholder for Input. The consuming builder should define explicit adapters and version its saved document schema. Keep drag/drop, editor state, canvas layout, and persistence in the builder repository. Pin the library version and upgrade it intentionally.

## Future Vercel deployment (not performed)

Create a Vercel project connected to this repository:

- Framework: Next.js
- Root directory: `apps/docs`
- Include source files outside the root directory: enabled
- Install command: `cd ../.. && npm ci`
- Build command: `cd ../.. && npm run build`
- Output directory: Next.js default

The future page builder will have its own repository and Vercel project. Publishing the UI package to npm is independent of deploying either website. Verify Vercel’s current Hobby eligibility and account limits before deployment.

## Before a public release

Choose the final name and license, add repository metadata, do manual screen-reader testing, review the API compatibility policy, and publish only when ready. No GitHub or npm credentials are stored in this project.

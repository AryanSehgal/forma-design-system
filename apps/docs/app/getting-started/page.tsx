import Link from 'next/link';
import {
  ChevronRight,
  ArrowRight,
  Package,
  Layers,
  ShieldCheck,
  Check,
  FolderTree,
} from 'lucide-react';
import { Badge, Button } from '@aryan_sehgal/forma-ui';
import { CodeBlock } from '@/components/code-block';
export const metadata = { title: 'Getting started' };
export default function Page() {
  return (
    <div className="content-page getting-started">
      <div className="breadcrumb">
        <Link href="/">Workspace</Link>
        <ChevronRight size={13} />
        <span>Getting started</span>
      </div>
      <div className="detail-heading">
        <div>
          <div className="eyebrow">DOCUMENTATION / THE FIRST STEP</div>
          <h1>
            Less setup. More making<span>.</span>
          </h1>
          <p>A portable React library, a shared visual language, and room to make it yours.</p>
        </div>
        <Badge variant="brand">React 19</Badge>
      </div>
      <div className="installation-note">
        <Package size={22} />
        <div>
          <strong>You’re exploring a local release.</strong>
          <p>
            The package is built and ready to test, but has not been published to npm. Use the local
            tarball below. The package name is provisional until registry availability is checked.
          </p>
        </div>
      </div>
      <div className="getting-layout">
        <div>
          <section className="doc-section">
            <h2>
              <span className="step-number">1</span> Package the library
            </h2>
            <p>
              From the repository root, compile the components and create an installable tarball.
            </p>
            <CodeBlock title="terminal" code={'npm install\nnpm run pack:ui'} />
            <p>
              This creates <code>artifacts/forma-design-ui-0.1.0.tgz</code>, containing JavaScript,
              TypeScript declarations, CSS, and the component registry.
            </p>
          </section>
          <section className="doc-section">
            <h2>
              <span className="step-number">2</span> Install it in your app
            </h2>
            <p>
              In another React 19 project, install the tarball using its actual path on your
              machine.
            </p>
            <CodeBlock title="terminal" code={'npm install /path/to/forma-design-ui-0.1.0.tgz'} />
            <p>
              React and React DOM are peer dependencies, so the library uses your application’s
              React instance.
            </p>
          </section>
          <section className="doc-section">
            <h2>
              <span className="step-number">3</span> Add the stylesheet once
            </h2>
            <p>
              In Next.js, import the shared styles in your root layout. Load your own theme
              overrides afterward.
            </p>
            <CodeBlock
              title="app/layout.tsx"
              code={`import '@aryan_sehgal/forma-ui/styles.css';\nimport './globals.css';\n\nexport default function RootLayout({ children }: {\n  children: React.ReactNode;\n}) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  );\n}`}
            />
          </section>
          <section className="doc-section">
            <h2>
              <span className="step-number">4</span> Make something happen
            </h2>
            <p>
              Import individual entry points and compose them. Client boundaries are included in the
              compiled interactive exports.
            </p>
            <CodeBlock
              title="components/save-button.tsx"
              code={`'use client';\n\nimport { useState } from 'react';\nimport { Button } from '@aryan_sehgal/forma-ui/button';\n\nexport function SaveButton() {\n  const [saved, setSaved] = useState(false);\n  return (\n    <Button onClick={() => setSaved(true)}>\n      {saved ? 'Saved' : 'Save changes'}\n    </Button>\n  );\n}`}
            />
          </section>
          <section className="doc-section">
            <h2>Bring your own character</h2>
            <p>
              Components use semantic CSS variables. Set tokens on the root or a container to scope
              a theme. Portal content uses the document theme unless you supply a themed portal
              container where supported.
            </p>
            <CodeBlock
              title="globals.css"
              code={`:root {\n  --f-accent: #7144c8;\n  --f-accent-hover: #6037ac;\n  --f-accent-soft: #f2ecff;\n  --f-radius: 10px;\n}\n\n/* Switch the entire application to the built-in dark theme. */\n/* <html data-f-theme="dark"> */`}
            />
            <Link href="/tokens" className="text-link">
              Open the theme studio <ArrowRight size={15} />
            </Link>
          </section>
          <section className="doc-section">
            <h2>Build once. Use it anywhere.</h2>
            <p>
              The shared registry describes editable properties independently of the showcase. A
              page builder can use it to generate a property panel, while importing the same
              compiled components.
            </p>
            <CodeBlock
              title="registry.ts"
              code={`import { catalog, defaults } from '@aryan_sehgal/forma-ui/registry';\n\nconst button = catalog.find(component => component.slug === 'button');\nif (button) {\n  const initialProps = defaults(button);\n  // Use button.controls to render your property editor.\n}`}
            />
          </section>
        </div>
        <aside className="getting-aside">
          <div className="a11y-note">
            <FolderTree size={23} />
            <h3>A clear separation.</h3>
            <pre>{`packages/\n  ui/       → npm package\napps/\n  docs/     → this website`}</pre>
            <p>The library has no dependency on the documentation app, Next.js, or its routes.</p>
          </div>
          <div className="on-this-page">
            <h3>What you get</h3>
            {[
              '16 component families',
              'Individual ESM entry points',
              'TypeScript declarations',
              'Light and dark themes',
              'Shared component registry',
              'Source maps',
            ].map((s) => (
              <div key={s}>
                <Check size={14} />
                <p>{s}</p>
              </div>
            ))}
          </div>
          <div className="a11y-note">
            <ShieldCheck size={22} />
            <h3>Strong foundations.</h3>
            <p>
              Complex interactions use Radix primitives. Forma adds its own visual system, component
              APIs, and developer experience.
            </p>
            <Link href="/accessibility">
              Explore accessibility <ArrowRight size={14} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

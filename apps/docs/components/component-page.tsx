'use client';
import Link from 'next/link';
import { useRef, useState, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Code2,
  Monitor,
  Smartphone,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Keyboard,
  ExternalLink,
} from 'lucide-react';
import {
  Badge,
  Button,
  Input,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@forma-design/ui';
import type { ComponentDefinition } from './catalog';
import { catalog, defaults } from './catalog';
import { CodeBlock } from './code-block';
import { Demo, exampleCode, Values } from './demos';
import { AuditPanel } from './lab';
import { useComponentTools } from './component-tools';
export function ComponentPage({ component: c }: { component: ComponentDefinition }) {
  const [v, setV] = useState<Values>(defaults(c));
  const [dark, setDark] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [revision, setRevision] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);
  const [previewNode, setPreviewNode] = useState<HTMLDivElement | null>(null);
  const setPreviewRef = useCallback((node: HTMLDivElement | null) => {
    previewRef.current = node;
    setPreviewNode(node);
  }, []);
  const code = exampleCode(c.slug, v);
  const index = catalog.findIndex((x) => x.slug === c.slug);
  useComponentTools(c, v, setV);
  const previous = catalog[index - 1];
  const next = catalog[index + 1];
  return (
    <div className="content-page">
      <div className="breadcrumb">
        <Link href="/">Components</Link>
        <ChevronRight size={13} />
        <span>{c.name}</span>
      </div>
      <div className="detail-heading">
        <div>
          <div className="eyebrow">{c.category.toUpperCase()} / COMPONENT</div>
          <h1>
            {c.name}
            <span>.</span>
          </h1>
          <p>{c.description}</p>
        </div>
        <Badge variant="brand">v0.1.0</Badge>
      </div>
      <div className="detail-tags">
        <span>
          <Code2 size={14} />
          TypeScript
        </span>
        <span>
          <Keyboard size={14} />
          Keyboard friendly
        </span>
        <span>
          <SlidersHorizontal size={14} />
          Customizable
        </span>
      </div>
      <section className="playground" aria-label={`${c.name} playground`}>
        <Tabs defaultValue="preview">
          <div className="playground-toolbar">
            <TabsList aria-label="Example view">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <div className="preview-actions">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Desktop preview"
                aria-pressed={!mobile}
                onClick={() => setMobile(false)}
              >
                <Monitor size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Mobile preview"
                aria-pressed={mobile}
                onClick={() => setMobile(true)}
              >
                <Smartphone size={16} />
              </Button>
              <span className="preview-divider" />
              <label className="preview-theme-label">
                <Switch checked={dark} onCheckedChange={setDark} aria-label="Dark preview" />
                Dark
              </label>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Reset component"
                onClick={() => {
                  setV(defaults(c));
                  setRevision((n) => n + 1);
                  setDark(false);
                  setMobile(false);
                }}
              >
                <RotateCcw size={15} />
              </Button>
            </div>
          </div>
          <TabsContent value="preview" className="playground-content">
            <div className="playground-layout">
              <div className="preview-stage" data-f-theme={dark ? 'dark' : 'light'}>
                <div
                  className={`preview-inner ${mobile ? 'narrow' : ''}`}
                  ref={setPreviewRef}
                  id="component-preview"
                >
                  <Demo key={revision} slug={c.slug} values={v} portalContainer={previewNode} />
                </div>
                <span className="preview-dimensions">
                  {mobile ? '375px · responsive preview' : 'Interactive preview'}
                </span>
              </div>
              <div className="props-panel">
                <div className="props-heading">
                  <SlidersHorizontal size={15} />
                  <span>Properties</span>
                  <span className="small-muted">{c.controls.length}</span>
                </div>
                {c.controls.length ? (
                  c.controls.map((control) => (
                    <div
                      className={`prop-control ${control.type === 'boolean' ? 'prop-boolean' : ''}`}
                      key={control.name}
                    >
                      <label htmlFor={`prop-${control.name}`}>{control.label}</label>
                      {control.type === 'select' ? (
                        <select
                          id={`prop-${control.name}`}
                          value={String(v[control.name])}
                          onChange={(e) => setV({ ...v, [control.name]: e.target.value })}
                        >
                          {control.options?.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      ) : control.type === 'boolean' ? (
                        <Switch
                          id={`prop-${control.name}`}
                          checked={Boolean(v[control.name])}
                          onCheckedChange={(checked) => setV({ ...v, [control.name]: checked })}
                        />
                      ) : control.type === 'range' ? (
                        <div className="range-control">
                          <input
                            id={`prop-${control.name}`}
                            type="range"
                            min="0"
                            max="100"
                            value={Number(v[control.name])}
                            onChange={(e) => setV({ ...v, [control.name]: Number(e.target.value) })}
                          />
                          <output>{v[control.name]}%</output>
                        </div>
                      ) : (
                        <Input
                          id={`prop-${control.name}`}
                          value={String(v[control.name])}
                          maxLength={80}
                          onChange={(e) => setV({ ...v, [control.name]: e.target.value })}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="composition-note">
                    <LayersIcon />
                    <strong>Made to compose</strong>
                    <p>
                      This example combines smaller primitives. Explore the code to make it your
                      own.
                    </p>
                  </div>
                )}
                <p className="props-footnote">Changes stay in this playground.</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="code" className="playground-content">
            <CodeBlock code={code} />
          </TabsContent>
        </Tabs>
      </section>
      <div className="documentation-grid">
        <div>
          <section className="doc-section">
            <h2>Usage</h2>
            <p>
              Import the component directly. Add the shared stylesheet once in your app’s root
              layout.
            </p>
            <CodeBlock code={code} />
          </section>
          <section className="doc-section">
            <h2>API reference</h2>
            <p>
              {c.composition
                ? 'Compose the exported primitives to control structure and behavior.'
                : 'Native element props, event handlers, and className are forwarded to the underlying element.'}{' '}
              TypeScript definitions are included with every export.
            </p>
            <div className="table-scroll">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Preview default</th>
                  </tr>
                </thead>
                <tbody>
                  {c.controls
                    .filter((x) => x.name !== 'label' && x.name !== 'indeterminate')
                    .map((p) => (
                      <tr key={p.name}>
                        <td>
                          <code>{p.name}</code>
                          <small>{p.description}</small>
                        </td>
                        <td>
                          <code>
                            {p.type === 'select'
                              ? p.options?.map((o) => `'${o}'`).join(' | ')
                              : p.type === 'range'
                                ? 'number'
                                : p.type === 'boolean'
                                  ? 'boolean'
                                  : 'string'}
                          </code>
                        </td>
                        <td>
                          <code>{String(p.defaultValue)}</code>
                        </td>
                      </tr>
                    ))}
                  <tr>
                    <td>
                      <code>className</code>
                      <small>Extend the component’s styles.</small>
                    </td>
                    <td>
                      <code>string</code>
                    </td>
                    <td>—</td>
                  </tr>
                  {!['badge', 'skeleton'].includes(c.slug) && (
                    <tr>
                      <td>
                        <code>ref</code>
                        <small>Access the underlying DOM element.</small>
                      </td>
                      <td>
                        <code>React.Ref</code>
                      </td>
                      <td>—</td>
                    </tr>
                  )}
                  {c.composition && (
                    <tr>
                      <td>
                        <code>children</code>
                        <small>Compose the documented subcomponents.</small>
                      </td>
                      <td>
                        <code>React.ReactNode</code>
                      </td>
                      <td>—</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="reference-note">
              See the package’s exported types for the complete API, including controlled and
              uncontrolled state where supported.
            </p>
          </section>
        </div>
        <aside className="detail-aside">
          <div className="a11y-note">
            <div className="aside-icon">
              <ShieldCheck size={20} />
            </div>
            <h3>Considered by default.</h3>
            <p>
              Semantic markup and visible focus states are built in. Your labels, content, and color
              choices complete the experience.
            </p>
            <Link href="/accessibility">
              Open accessibility lab <ArrowRight size={14} />
            </Link>
          </div>
          <div className="on-this-page">
            <h3>Good to know</h3>
            {c.notes.map((n) => (
              <div key={n}>
                <Check size={14} />
                <p>{n}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <section className="doc-section keyboard-section">
        <h2>Keyboard interactions</h2>
        <div className="keyboard-grid">
          {c.keyboard.map(([key, description]) => (
            <div key={key}>
              <kbd>{key}</kbd>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
      <AuditPanel
        targetRef={previewRef}
        label={`${c.name} preview`}
        revision={`${revision}-${JSON.stringify(v)}-${dark}`}
      />
      <div className="component-pagination">
        {previous ? (
          <Link href={`/components/${previous.slug}`}>
            <ArrowLeft size={16} />
            <div>
              <small>Previous component</small>
              <strong>{previous.name}</strong>
            </div>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/components/${next.slug}`}>
            <div>
              <small>Next component</small>
              <strong>{next.name}</strong>
            </div>
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
function LayersIcon() {
  return <Code2 size={24} />;
}

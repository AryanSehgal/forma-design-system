'use client';
import Link from 'next/link';
import { useState, type CSSProperties } from 'react';
import { ChevronRight, Download, RotateCcw, Check, ArrowRight, Palette, Copy } from 'lucide-react';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Field,
  Input,
  Switch,
  Avatar,
  Progress,
} from '@forma-design/ui';
import { CodeBlock } from './code-block';
import { ColorControl } from './lab';
import { contrastRatio } from '@/lib/contrast';
import { createTheme } from '@/lib/theme';
const palettes = [
  { name: 'Cobalt', color: '#3158df' },
  { name: 'Violet', color: '#7144c8' },
  { name: 'Emerald', color: '#137c57' },
  { name: 'Rose', color: '#c53261' },
  { name: 'Ink', color: '#242933' },
];
export function Tokens() {
  const [accent, setAccent] = useState('#3158df');
  const [radius, setRadius] = useState(8);
  const [density, setDensity] = useState('comfortable');
  const [font, setFont] = useState('sans');
  const [saved, setSaved] = useState(false);
  const { onAccent, css, variables } = createTheme(accent, radius, font);
  const style = variables as CSSProperties;
  const downloadUrl = `/api/theme?${new URLSearchParams({ accent, radius: String(radius), font })}`;
  return (
    <div className="content-page">
      <div className="breadcrumb">
        <Link href="/">Foundations</Link>
        <ChevronRight size={13} />
        <span>Design tokens</span>
      </div>
      <div className="detail-heading">
        <div>
          <div className="eyebrow">FOUNDATIONS / YOUR SIGNATURE</div>
          <h1>
            A system with your character<span>.</span>
          </h1>
          <p>A few considered decisions. A whole interface that feels like you.</p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setAccent('#3158df');
            setRadius(8);
            setDensity('comfortable');
            setFont('sans');
          }}
        >
          <RotateCcw size={14} />
          Reset
        </Button>
      </div>
      <div className="token-editor">
        <aside className="token-controls">
          <div className="props-heading">
            <Palette size={17} />
            Theme studio
          </div>
          <div className="token-control">
            <h3>Accent color</h3>
            <div className="palette-options">
              {palettes.map((p) => (
                <button
                  style={{ background: p.color }}
                  key={p.name}
                  aria-label={p.name}
                  aria-pressed={accent === p.color}
                  onClick={() => setAccent(p.color)}
                >
                  {accent === p.color && <Check size={17} />}
                </button>
              ))}
            </div>
            <ColorControl label="Custom accent" value={accent} onChange={setAccent} />
          </div>
          <div className="token-control">
            <label htmlFor="radius">
              Corner radius <span>{radius}px</span>
            </label>
            <input
              type="range"
              id="radius"
              min="0"
              max="20"
              step="2"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>Sharp</span>
              <span>Rounded</span>
            </div>
          </div>
          <div className="token-control">
            <label htmlFor="typeface">Typography</label>
            <select id="typeface" value={font} onChange={(e) => setFont(e.target.value)}>
              <option value="sans">Modern sans · Arial</option>
              <option value="humanist">Humanist · Verdana</option>
              <option value="serif">Editorial · Georgia</option>
            </select>
          </div>
          <div className="token-control">
            <label htmlFor="density">Example button size</label>
            <select id="density" value={density} onChange={(e) => setDensity(e.target.value)}>
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
            </select>
            <p className="reference-note">
              Use the component’s size prop; this is not a theme token.
            </p>
          </div>
          <div className="token-export">
            <Button className="full-width" asChild>
              <a href={downloadUrl} download="forma-theme.css">
                <Download size={15} />
                Export theme CSS
              </a>
            </Button>
            <p>Import after the library stylesheet.</p>
          </div>
        </aside>
        <div className="token-stage" data-f-theme="light" style={style}>
          <div className="token-preview-label">
            <span>LIVE PREVIEW</span>
            <Badge variant="brand">Your theme</Badge>
          </div>
          <Card className="theme-card">
            <CardHeader>
              <div className="theme-card-avatars">
                <Avatar alt="Jamie Lee" fallback="JL" />
                <Avatar alt="Alex Kim" fallback="AK" />
                <Avatar alt="Sam Rivera" fallback="SR" />
              </div>
              <CardTitle>Your next chapter starts here.</CardTitle>
              <CardDescription>
                Bring your people, ideas, and a little personality into one place.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Field htmlFor="theme-project" label="Project name">
                <Input id="theme-project" defaultValue="The Sunday Studio" />
              </Field>
              <div className="theme-setting">
                <label htmlFor="theme-share">Share with your team</label>
                <Switch id="theme-share" defaultChecked />
              </div>
              <div className="progress-label">
                <span>Workspace setup</span>
                <span>72%</span>
              </div>
              <Progress value={72} aria-label="Workspace setup" />
            </CardContent>
            <CardFooter>
              <Button size={density === 'compact' ? 'sm' : 'md'} onClick={() => setSaved(true)}>
                {saved ? <Check size={15} /> : null}
                {saved ? 'Workspace ready' : 'Create workspace'}
                <ArrowRight size={15} />
              </Button>
              <Button
                size={density === 'compact' ? 'sm' : 'md'}
                variant="outline"
                onClick={() => setSaved(false)}
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
          <div className="theme-preview-badges">
            <Badge variant="brand">In progress</Badge>
            <Badge variant="success">Published</Badge>
            <Badge>Draft</Badge>
          </div>
          <p className="token-scope-note">Your changes are scoped to this preview.</p>
        </div>
      </div>
      <div className="token-code-heading">
        <div>
          <h2>Your theme, ready to go.</h2>
          <p>Copy these tokens into your app. The same values work in the future page builder.</p>
        </div>
        <Badge variant="success">
          {contrastRatio(accent, onAccent).toFixed(2)}:1 button contrast
        </Badge>
      </div>
      <CodeBlock title="forma-theme.css" code={css} />
      <section className="doc-section">
        <h2>The foundation beneath it all</h2>
        <p>Semantic names keep your interface consistent, even as your brand evolves.</p>
        <div className="token-reference">
          {[
            ['--f-accent', 'Primary actions and selected states'],
            ['--f-bg', 'Component backgrounds'],
            ['--f-surface', 'Subtle surfaces and secondary areas'],
            ['--f-fg', 'Primary text'],
            ['--f-muted', 'Secondary text and descriptions'],
            ['--f-border', 'Dividers and control boundaries'],
            ['--f-radius', 'Shared corner radius'],
            ['--f-focus', 'Visible keyboard focus outline'],
          ].map(([name, desc]) => (
            <div key={name}>
              <code>{name}</code>
              <span>{desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

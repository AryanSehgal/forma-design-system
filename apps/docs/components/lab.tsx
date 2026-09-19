'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';
import Link from 'next/link';
import {
  Accessibility,
  ArrowRight,
  Check,
  ChevronRight,
  FlaskConical,
  Keyboard,
  Play,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import {
  Button,
  Badge,
  Input,
  Field,
  Switch,
  Checkbox,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@aryan_sehgal/forma-ui';
import type { AxeResults } from 'axe-core';
import { contrastRatio } from '@/lib/contrast';
export function AuditPanel({
  targetRef,
  label,
  revision,
}: {
  targetRef: RefObject<HTMLDivElement | null>;
  label: string;
  revision?: string;
}) {
  const [results, setResults] = useState<AxeResults | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    setResults(null);
    setError('');
  }, [revision]);
  async function run() {
    const target = targetRef.current;
    if (!target) {
      setError('Open the Preview tab before running the check.');
      return;
    }
    setRunning(true);
    setError('');
    try {
      const { default: axe } = await import('axe-core');
      const output = await axe.run(target, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      });
      setResults(output);
    } catch {
      setError('The check could not finish. Keep the preview visible and try again.');
    } finally {
      setRunning(false);
    }
  }
  return (
    <section className="audit-panel" aria-label="Automated accessibility check">
      <div className="audit-heading">
        <div className="audit-title">
          <ShieldCheck size={22} />
          <div>
            <h2>A second pair of eyes.</h2>
            <p>Run axe-core on the visible {label.toLowerCase()}.</p>
          </div>
        </div>
        <Button variant="outline" onClick={run} loading={running}>
          <Play size={14} />
          {running ? 'Checking…' : results ? 'Run again' : 'Run accessibility check'}
        </Button>
      </div>
      <div role="status" aria-live="polite">
        {error && <p className="audit-error">{error}</p>}
        {results && (
          <>
            <div className="audit-results">
              <div>
                <strong>{results.violations.length}</strong>
                <span>Violations</span>
              </div>
              <div>
                <strong>{results.passes.length}</strong>
                <span>Checks passed</span>
              </div>
              <div>
                <strong>{results.incomplete.length}</strong>
                <span>Need review</span>
              </div>
            </div>
            {results.violations.length === 0 && (
              <p className="audit-success">
                <Check size={16} />
                No automated violations found in this preview state.
              </p>
            )}
            {[...results.violations, ...results.incomplete].map((r) => (
              <div className="audit-issue" key={r.id}>
                <Badge variant={results.violations.includes(r) ? 'danger' : 'warning'}>
                  {results.violations.includes(r) ? 'Violation' : 'Review'}
                </Badge>
                <div>
                  <strong>{r.help}</strong>
                  <p>{r.description}</p>
                  <a href={r.helpUrl} target="_blank" rel="noreferrer">
                    Read guidance ↗
                  </a>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <p className="audit-disclaimer">
        Checks cover the preview’s current DOM, not closed dialogs or other hidden states. Automated
        checks support—but do not replace—keyboard and screen-reader testing.
      </p>
    </section>
  );
}
export function AccessibilityLab() {
  const [fg, setFg] = useState('#3158df');
  const [bg, setBg] = useState('#ffffff');
  const [focus, setFocus] = useState('Start with the first button');
  const target = useRef<HTMLDivElement>(null);
  const ratio = contrastRatio(fg, bg);
  return (
    <div className="content-page">
      <div className="breadcrumb">
        <Link href="/">Workspace</Link>
        <ChevronRight size={13} />
        <span>Accessibility lab</span>
      </div>
      <div className="detail-heading">
        <div>
          <div className="eyebrow">FOUNDATIONS / INCLUSION</div>
          <h1>
            Built for everyone<span>.</span>
          </h1>
          <p>Explore contrast, follow the focus, and put your components to the test.</p>
        </div>
        <span className="lab-stamp">
          <FlaskConical size={17} /> Interactive lab
        </span>
      </div>
      <div className="lab-intro">
        <Accessibility size={23} />
        <p>
          Accessibility is a practice, not a badge. These tools help you check the details that make
          interfaces work for more people.
        </p>
      </div>
      <section className="doc-section">
        <div className="section-heading-row">
          <div>
            <h2>01. Find the right contrast</h2>
            <p>Compare text and background colors using WCAG contrast calculations.</p>
          </div>
          <Badge variant={ratio >= 4.5 ? 'success' : 'danger'}>
            {ratio >= 4.5 ? 'AA normal text passes' : 'AA normal text fails'}
          </Badge>
        </div>
        <div className="contrast-grid">
          <div className="contrast-preview" style={{ color: fg, background: bg }}>
            <span className="contrast-eyebrow">A LITTLE CLARITY GOES A LONG WAY</span>
            <h3>Readable by design.</h3>
            <p>Good contrast makes every word easier to read.</p>
            <span className="contrast-sample">Aa Bb Cc 0123456789</span>
          </div>
          <div className="contrast-controls">
            <ColorControl label="Text color" value={fg} onChange={setFg} />
            <ColorControl label="Background color" value={bg} onChange={setBg} />
            <div className="contrast-number">
              <strong>
                {ratio.toFixed(2)}
                <span>:1</span>
              </strong>
              <span>Contrast ratio</span>
            </div>
            <div className="contrast-checks">
              {[
                ['AA · Normal text', 4.5],
                ['AA · Large text', 3],
                ['AAA · Normal text', 7],
              ].map(([name, min]) => (
                <div key={String(name)}>
                  <span>{name}</span>
                  <Badge variant={ratio >= Number(min) ? 'success' : 'danger'}>
                    {ratio >= Number(min) ? 'Pass' : 'Fail'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="reference-note">
          Large text means at least 18 pt regular or 14 pt bold. Thresholds use the full, unrounded
          ratio.
        </p>
      </section>
      <section className="doc-section">
        <h2>02. Follow the focus</h2>
        <p>
          Click “Start keyboard test”, then use Tab, Shift+Tab, Space, and the arrow keys. Look for
          the blue focus ring.
        </p>
        <div
          className="keyboard-lab"
          ref={target}
          onFocusCapture={(e) => {
            const el = e.target as HTMLElement;
            setFocus(
              el.getAttribute('aria-label') ||
                (el as HTMLInputElement).labels?.[0]?.textContent?.trim() ||
                el.textContent?.trim().slice(0, 50) ||
                'Text field',
            );
          }}
        >
          <div className="keyboard-lab-actions">
            <Button
              onClick={(e) => {
                e.currentTarget.focus();
                setFocus('Start keyboard test');
              }}
            >
              Start keyboard test
            </Button>
            <label className="check-row">
              <Checkbox />
              Receive updates
            </label>
            <label className="check-row">
              <Switch />
              Enable notifications
            </label>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open test dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Focus stays here.</DialogTitle>
                <DialogDescription>
                  Press Tab several times. Focus stays inside this dialog. Press Escape to return to
                  the trigger.
                </DialogDescription>
                <Field htmlFor="lab-name" label="Your name">
                  <Input id="lab-name" placeholder="Try typing here" />
                </Field>
                <div className="dialog-actions">
                  <DialogClose asChild>
                    <Button>Done</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Tabs defaultValue="first">
            <TabsList aria-label="Keyboard test tabs">
              <TabsTrigger value="first">First tab</TabsTrigger>
              <TabsTrigger value="second">Second tab</TabsTrigger>
              <TabsTrigger value="third">Third tab</TabsTrigger>
            </TabsList>
            <TabsContent value="first">
              Focus a tab and press the left or right arrow key.
            </TabsContent>
            <TabsContent value="second">The selected tab and panel update together.</TabsContent>
            <TabsContent value="third">Home and End jump to the first and last tab.</TabsContent>
          </Tabs>
          <div className="focus-readout">
            <Keyboard size={16} />
            <span>
              Last focused: <strong>{focus}</strong>
            </span>
          </div>
        </div>
      </section>
      <AuditPanel targetRef={target} label="keyboard lab" />
      <section className="doc-section">
        <h2>03. Check what automation misses</h2>
        <div className="manual-checks">
          {[
            ['Keyboard', 'Can you reach and use every action without a mouse?'],
            ['Screen reader', 'Are names, roles, states, and errors meaningful when spoken?'],
            ['Zoom & reflow', 'Does the interface remain usable with text enlarged to 200%?'],
            ['Motion', 'Does the interface respect reduced-motion preferences?'],
          ].map(([title, description]) => (
            <label key={title}>
              <Checkbox />
              <span>
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
export function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  const valid = /^#[0-9a-f]{6}$/i.test(draft);
  return (
    <div className="color-control">
      <label>
        {label}
        <div>
          <input
            type="color"
            aria-label={`${label} picker`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <input
            aria-label={`${label} hex`}
            value={draft}
            spellCheck={false}
            maxLength={7}
            aria-invalid={!valid}
            onChange={(e) => {
              setDraft(e.target.value);
              if (/^#[0-9a-f]{6}$/i.test(e.target.value)) onChange(e.target.value);
            }}
            onBlur={() => {
              if (!valid) setDraft(value);
            }}
          />
        </div>
      </label>
    </div>
  );
}

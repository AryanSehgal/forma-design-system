'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Copy,
  Plus,
  SlidersHorizontal,
  Accessibility,
  Code2,
  Layers,
  Mail,
  CheckCheck,
  ChevronRight,
  Package,
  Search,
  RotateCcw,
} from 'lucide-react';
import {
  Button,
  Badge,
  Input,
  Field,
  Switch,
  Checkbox,
  Avatar,
  Progress,
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
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@forma-design/ui';
import { catalog } from './catalog';
import { CopyButton } from './copy-button';
export function Overview() {
  const [filter, setFilter] = useState('All components');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [active, setActive] = useState(true);
  const [compact, setCompact] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  const categories = ['All components', 'Actions', 'Forms', 'Layout', 'Feedback', 'Navigation'];
  return (
    <div className="overview">
      <div className="breadcrumb">
        <span>Workspace</span>
        <ChevronRight size={13} />
        <span>Overview</span>
      </div>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> THE FORMA COLLECTION
          </div>
          <h1>
            Good interfaces start here<span>.</span>
          </h1>
          <p>Thoughtful components. Accessible foundations. Entirely yours.</p>
        </div>
        <Link href="/getting-started" className="heading-link">
          Start building <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="overview-toolbar">
        <div className="pill-row">
          <span>
            <BoxIcon />
            16 components
          </span>
          <span>
            <Accessibility size={14} />
            Accessible primitives
          </span>
          <span>
            <Code2 size={14} />
            TypeScript
          </span>
        </div>
        <div className="install-command">
          <span className="terminal-symbol">$</span>
          <code>npm install @forma-design/ui</code>
          <CopyButton text="npm install @forma-design/ui" label="Copy installation command" />
        </div>
      </div>
      <div className="local-note">
        <Package size={13} />
        <span>
          Local preview · Package prepared for publishing.{' '}
          <Link href="/getting-started">Use the local package →</Link>
        </span>
      </div>
      <section className="showcase" aria-labelledby="showcase-heading">
        <div className="section-top">
          <div>
            <h2 id="showcase-heading">Small pieces. Endless possibilities.</h2>
            <p>Real components, ready to interact with.</p>
          </div>
          <div className="showcase-controls">
            <button
              aria-pressed={previewTheme === 'light'}
              onClick={() => setPreviewTheme('light')}
            >
              Light
            </button>
            <button aria-pressed={previewTheme === 'dark'} onClick={() => setPreviewTheme('dark')}>
              Dark
            </button>
          </div>
        </div>
        <div
          className={`component-mosaic ${compact ? 'compact-preview' : ''}`}
          data-f-theme={previewTheme}
        >
          <div className="mosaic-column">
            <Card className="mosaic-card">
              <CardHeader>
                <div className="mini-overline">01 / ACTIONS</div>
                <CardTitle>A little push forward.</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="button-demo-row">
                  <Button onClick={() => setSaved((v) => !v)}>
                    {saved ? <Check size={15} /> : <Plus size={15} />}{' '}
                    {saved ? 'Added to project' : 'Create project'}
                  </Button>
                  <Button variant="outline" onClick={() => setSaved(false)}>
                    Cancel
                  </Button>
                </div>
                <div className="button-demo-row second">
                  <Button variant="secondary" size="sm" onClick={() => setSaved(true)}>
                    Secondary
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setSaved(false)}>
                    Ghost
                  </Button>
                  <Button size="sm" disabled>
                    Disabled
                  </Button>
                </div>
              </CardContent>
              <div className="mosaic-caption">
                <code>Button</code>
                <Link href="/components/button" aria-label="Explore Button">
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </Card>
            <Card className="mosaic-card preferences">
              <CardHeader>
                <div className="mini-overline">02 / PREFERENCES</div>
                <CardTitle>Make yourself at home.</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="setting-row">
                  <div>
                    <label htmlFor="overview-notifications">Email notifications</label>
                    <p>
                      {active
                        ? 'Updates are enabled for your projects.'
                        : 'Email updates are paused.'}
                    </p>
                  </div>
                  <Switch
                    id="overview-notifications"
                    checked={active}
                    onCheckedChange={setActive}
                  />
                </div>
                <div className="setting-row">
                  <div>
                    <label htmlFor="overview-compact">Compact view</label>
                    <p>A little less space, a little more focus.</p>
                  </div>
                  <Switch id="overview-compact" checked={compact} onCheckedChange={setCompact} />
                </div>
                <label className="check-row">
                  <Checkbox defaultChecked /> Show helpful tips
                </label>
              </CardContent>
              <div className="mosaic-caption">
                <code>Switch · Checkbox</code>
                <Link href="/components/switch" aria-label="Explore Switch">
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </Card>
          </div>
          <div className="mosaic-column">
            <Card className="mosaic-card subscribe-card">
              <CardHeader>
                <div className="mail-icon">
                  <Mail size={21} />
                </div>
                <CardTitle>A good thing in your inbox.</CardTitle>
                <CardDescription>
                  Product updates and occasional inspiration.
                  <br />
                  Only the useful stuff.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                  }}
                >
                  <Field htmlFor="overview-email" label="Email address">
                    <Input
                      id="overview-email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setSubscribed(false);
                      }}
                      autoComplete="email"
                    />
                  </Field>
                  <Button type="submit" className="full-width">
                    {subscribed ? (
                      <>
                        <Check size={15} /> You're on the list
                      </>
                    ) : (
                      <>
                        Subscribe <ArrowRight size={15} />
                      </>
                    )}
                  </Button>
                  <p className="form-footnote" role="status">
                    {subscribed
                      ? 'Demo complete. No email was sent.'
                      : 'A demo form. Your email stays in your browser.'}
                  </p>
                </form>
              </CardContent>
              <div className="mosaic-caption">
                <code>Input · Button · Card</code>
                <Link href="/components/input" aria-label="Explore Input">
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </Card>
            <Card className="mosaic-card status-card">
              <CardContent>
                <div className="mini-overline">03 / A LITTLE CONTEXT</div>
                <div className="badge-demo-row">
                  <Badge variant="success">
                    <Check size={11} />
                    Published
                  </Badge>
                  <Badge variant="brand">In progress</Badge>
                  <Badge>Draft</Badge>
                </div>
              </CardContent>
              <div className="mosaic-caption">
                <code>Badge</code>
                <Link href="/components/badge" aria-label="Explore Badge">
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </Card>
          </div>
          <div className="mosaic-column">
            <Card className="mosaic-card team-card">
              <CardHeader>
                <div className="mini-overline">04 / BETTER TOGETHER</div>
                <div className="card-heading-row">
                  <CardTitle>The studio</CardTitle>
                  <Badge>3 members</Badge>
                </div>
                <CardDescription>A small team with big ideas.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="team-row">
                  <Avatar fallback="JL" alt="Jamie Lee" />
                  <div>
                    <strong>Jamie Lee</strong>
                    <span>Design engineer</span>
                  </div>
                  <Badge variant="brand">You</Badge>
                </div>
                <div className="team-row">
                  <Avatar fallback="AK" alt="Alex Kim" className="avatar-peach" />
                  <div>
                    <strong>Alex Kim</strong>
                    <span>Product designer</span>
                  </div>
                </div>
                <div className="team-row">
                  <Avatar fallback="SR" alt="Sam Rivera" className="avatar-green" />
                  <div>
                    <strong>Sam Rivera</strong>
                    <span>Frontend developer</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="full-width">
                      <Plus size={15} /> Invite a teammate
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Invite a teammate</DialogTitle>
                    <DialogDescription>
                      Try the invitation flow. This local demo does not send email.
                    </DialogDescription>
                    <Field htmlFor="invite-email" label="Email address">
                      <Input id="invite-email" type="email" placeholder="teammate@studio.com" />
                    </Field>
                    <div className="dialog-actions">
                      <DialogClose asChild>
                        <Button variant="outline">Close preview</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
              <div className="mosaic-caption">
                <code>Avatar · Dialog</code>
                <Link href="/components/avatar" aria-label="Explore Avatar">
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </Card>
            <Card className="mosaic-card progress-card">
              <CardContent>
                <div className="progress-label">
                  <span>Library in the making</span>
                  <span>64%</span>
                </div>
                <Progress value={64} aria-label="Example library progress" />
                <p>Every detail makes a difference.</p>
              </CardContent>
              <div className="mosaic-caption">
                <code>Progress</code>
                <Link href="/components/progress" aria-label="Explore Progress">
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
      <div className="explore-heading">
        <div>
          <h2>Find your next building block</h2>
          <p>Explore the collection, one detail at a time.</p>
        </div>
        <span className="small-muted">16 components / v0.1.0</span>
      </div>
      <div className="filter-row" aria-label="Filter components">
        {categories.map((c) => (
          <button key={c} aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {c}
            {c === 'All components' && <span>16</span>}
          </button>
        ))}
      </div>
      <div className="component-directory">
        {catalog
          .filter((c) => filter === 'All components' || c.category === filter)
          .map((c) => (
            <Link href={`/components/${c.slug}`} key={c.slug} className="directory-item">
              <span className="directory-icon">{c.name.slice(0, 2)}</span>
              <div>
                <strong>{c.name}</strong>
                <span>{c.category}</span>
              </div>
              <ArrowUpRight size={16} />
            </Link>
          ))}
      </div>
      <div className="foundation-links">
        <Link href="/tokens">
          <SlidersHorizontal size={22} />
          <div>
            <h3>Your brand, down to the token.</h3>
            <p>Explore colors, spacing, and typography.</p>
          </div>
          <ArrowUpRight size={19} />
        </Link>
        <Link href="/accessibility">
          <Accessibility size={23} />
          <div>
            <h3>Good design includes everyone.</h3>
            <p>Test contrast and keyboard interactions.</p>
          </div>
          <ArrowUpRight size={19} />
        </Link>
      </div>
    </div>
  );
}
function BoxIcon() {
  return <Layers size={14} />;
}

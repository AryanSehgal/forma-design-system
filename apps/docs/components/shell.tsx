'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Box,
  Search,
  Sun,
  Moon,
  Menu,
  ArrowUpRight,
  Layers,
  SlidersHorizontal,
  Accessibility,
  BookOpen,
  ChevronRight,
  Command,
  Check,
} from 'lucide-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Input,
  TooltipProvider,
} from '@aryan_sehgal/forma-ui';
import { catalog } from './catalog';
export function Logo() {
  return (
    <span className="brand">
      <span className="brand-mark">
        <Layers size={20} strokeWidth={2} />
      </span>
      forma<span className="brand-period">.</span>
    </span>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [dark, setDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.dataset.fTheme === 'dark');
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  useEffect(() => {
    setMobile(false);
    setSearchOpen(false);
    setQuery('');
  }, [pathname]);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.fTheme = next ? 'dark' : 'light';
    try {
      localStorage.setItem('forma-theme', next ? 'dark' : 'light');
    } catch {}
  }
  const pages = [
    { href: '/', label: 'Overview', icon: Box },
    { href: '/getting-started', label: 'Getting started', icon: BookOpen },
    { href: '/tokens', label: 'Design tokens', icon: SlidersHorizontal },
    { href: '/accessibility', label: 'Accessibility lab', icon: Accessibility },
  ];
  const nav = (
    <>
      <div className="nav-label">WORKSPACE</div>
      <nav aria-label="Workspace">
        {pages.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            onClick={() => setMobile(false)}
            className={`nav-link ${pathname === p.href ? 'active' : ''}`}
            aria-current={pathname === p.href ? 'page' : undefined}
          >
            <p.icon size={17} />
            {p.label}
            {p.href === '/accessibility' && <span className="new-tag">Lab</span>}
          </Link>
        ))}
      </nav>
      <div className="nav-label component-label">
        COMPONENTS <span>{catalog.length}</span>
      </div>
      <nav aria-label="Components">
        {catalog.map((c) => (
          <Link
            className={`nav-link component-link ${pathname === `/components/${c.slug}` ? 'active' : ''}`}
            aria-current={pathname === `/components/${c.slug}` ? 'page' : undefined}
            href={`/components/${c.slug}`}
            onClick={() => setMobile(false)}
            key={c.slug}
          >
            <span className="component-glyph">{c.name.slice(0, 1)}</span>
            {c.name}
          </Link>
        ))}
      </nav>
      <div className="sidebar-foot">
        <span className="version-square">F</span>
        <div>
          Forma UI <span>Local development · v0.1.0</span>
        </div>
      </div>
    </>
  );
  const results = [
    ...pages.map((p) => ({ name: p.label, href: p.href, category: 'Workspace' })),
    ...catalog.map((c) => ({ name: c.name, href: `/components/${c.slug}`, category: c.category })),
  ].filter((c) => `${c.name} ${c.category}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <TooltipProvider delayDuration={250}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="topbar">
        <div className="topbar-brand">
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            aria-label="Open navigation"
            onClick={() => setMobile(true)}
          >
            <Menu size={20} />
          </Button>
          <Link href="/" aria-label="Forma home">
            <Logo />
          </Link>
          <span className="version-badge">v0.1.0</span>
        </div>
        <div className="header-center">
          <span className="header-slash">/</span>
          <span>Design system</span>
        </div>
        <div className="header-actions">
          <button
            className="search-button"
            aria-label="Search documentation"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={15} />
            <span>Search documentation</span>
            <kbd>⌘ K</kbd>
          </button>
          <div className="header-divider" />
          <Button
            variant="ghost"
            size="icon"
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={toggleTheme}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Link className="header-docs" href="/getting-started">
            Documentation <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>
      <aside className="sidebar">{nav}</aside>
      <Dialog open={mobile} onOpenChange={setMobile}>
        <DialogContent className="mobile-nav">
          <DialogTitle>
            <Logo />
          </DialogTitle>
          <DialogDescription>Explore the library and its foundations.</DialogDescription>
          {nav}
        </DialogContent>
      </Dialog>
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="search-dialog">
          <DialogTitle>Find your building block</DialogTitle>
          <DialogDescription>Search components and documentation.</DialogDescription>
          <div className="search-field">
            <Search size={18} />
            <Input
              autoFocus
              aria-label="Search documentation"
              placeholder="Search components…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="search-results">
            {results.length ? (
              results.map((r) => (
                <button
                  key={r.href}
                  onClick={() => {
                    router.push(r.href);
                    setSearchOpen(false);
                    setQuery('');
                  }}
                >
                  <Box size={16} />
                  <span>{r.name}</span>
                  <small>{r.category}</small>
                  <ChevronRight size={14} />
                </button>
              ))
            ) : (
              <p>No matches. Try “button” or “tokens”.</p>
            )}
          </div>
          <div className="search-footer">
            <Command size={13} /> K to open <span>Esc to close</span>
          </div>
        </DialogContent>
      </Dialog>
      <div className="page-area">
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer className="page-footer">
          <span>
            Component library &amp; playground built by{' '}
            <a className="creator-credit" href="https://github.com/AryanSehgal">
              Aryan Sehgal
            </a>
            .
          </span>
          <span>React · TypeScript · CSS variables</span>
        </footer>
      </div>
    </TooltipProvider>
  );
}

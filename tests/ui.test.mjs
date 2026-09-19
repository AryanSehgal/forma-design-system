import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import { Button } from '@forma-design/ui/button';
import { Input, Field } from '@forma-design/ui/input';
import { Progress } from '@forma-design/ui/progress';
import { Checkbox } from '@forma-design/ui/checkbox';
import { catalog, defaults } from '@forma-design/ui/registry';

test('buttons are non-submitting by default and accept explicit submit behavior', () => {
  assert.match(renderToStaticMarkup(h(Button, null, 'Save')), /type="button"/);
  assert.match(renderToStaticMarkup(h(Button, { type: 'submit' }, 'Save')), /type="submit"/);
});
test('loading prevents activation and exposes busy state while retaining the label', () => {
  const html = renderToStaticMarkup(h(Button, { loading: true }, 'Save profile'));
  assert.match(html, /disabled=""/);
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /Save profile/);
});
test('polymorphic links do not receive button-only type or disabled attributes', () => {
  const html = renderToStaticMarkup(
    h(Button, { asChild: true, disabled: true }, h('a', { href: '#target' }, 'Details')),
  );
  assert.match(html, /<a /);
  assert.doesNotMatch(html, / type=/);
  assert.doesNotMatch(html, / disabled=/);
  assert.match(html, /aria-disabled="true"/);
});
test('input preserves native accessibility connections and error state', () => {
  const html = renderToStaticMarkup(
    h(
      Field,
      { label: 'Email', htmlFor: 'email', error: 'Enter an email' },
      h(Input, {
        id: 'email',
        invalid: true,
        'aria-describedby': 'email-error',
        autoComplete: 'email',
      }),
    ),
  );
  assert.match(html, /for="email"/);
  assert.match(html, /aria-describedby="email-error"/);
  assert.match(html, /id="email-error"/);
  assert.match(html, /aria-invalid="true"/);
});
test('progress clamps invalid values, supports custom maxima and indeterminate state', () => {
  const render = (props) => renderToStaticMarkup(h(Progress, { 'aria-label': 'Upload', ...props }));
  assert.match(render({ value: 200 }), /aria-valuenow="100"/);
  assert.match(render({ value: -5 }), /aria-valuenow="0"/);
  assert.match(render({ value: NaN }), /aria-valuenow="0"/);
  assert.match(render({ value: 25, max: 50 }), /aria-valuemax="50"/);
  assert.match(render({ value: 25, max: 50 }), /translateX\(-50%\)/);
  assert.match(render({ value: null }), /data-state="indeterminate"/);
  assert.doesNotMatch(render({ value: null }), /aria-valuenow=/);
});
test('checkbox exposes the mixed state for partially selected groups', () => {
  const html = renderToStaticMarkup(
    h(Checkbox, { checked: 'indeterminate', 'aria-label': 'Select all' }),
  );
  assert.match(html, /aria-checked="mixed"/);
});
test('every registered component is independently importable', async () => {
  assert.equal(new Set(catalog.map((c) => c.slug)).size, catalog.length);
  for (const component of catalog) {
    const module = await import(`@forma-design/ui/${component.slug}`);
    assert.ok(module[component.name], `${component.name} must be exported`);
  }
});
test('registry is serializable and defaults conform to the property editor schema', () => {
  assert.deepEqual(JSON.parse(JSON.stringify(catalog)), catalog);
  for (const c of catalog) {
    const values = defaults(c);
    for (const control of c.controls) {
      assert.equal(values[control.name], control.defaultValue);
      if (control.type === 'select') assert.ok(control.options.includes(control.defaultValue));
      if (control.type === 'boolean') assert.equal(typeof control.defaultValue, 'boolean');
    }
  }
});
test('package exposes ESM, types, styles and keeps React external', () => {
  const p = JSON.parse(
    readFileSync(new URL('../packages/ui/package.json', import.meta.url), 'utf8'),
  );
  assert.ok(p.peerDependencies.react);
  assert.equal(p.dependencies.react, undefined);
  assert.deepEqual(p.sideEffects, ['**/*.css']);
  assert.ok(
    readFileSync(new URL('../packages/ui/dist/button.d.ts', import.meta.url), 'utf8').includes(
      'ButtonProps',
    ),
  );
  const js = readFileSync(new URL('../packages/ui/dist/button.js', import.meta.url), 'utf8');
  assert.match(js, /use client/);
  const registry = readFileSync(
    new URL('../packages/ui/dist/registry.js', import.meta.url),
    'utf8',
  );
  assert.doesNotMatch(registry, /use client/);
});

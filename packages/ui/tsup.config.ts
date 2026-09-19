import { defineConfig } from 'tsup';
import { readdirSync } from 'node:fs';
const shared = {
  format: ['esm' as const],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: false,
  external: ['react', 'react-dom', 'react/jsx-runtime', 'radix-ui'],
};
export default defineConfig([
  {
    ...shared,
    entry: Object.fromEntries(
      readdirSync('src')
        .filter((f) => /\.tsx?$/.test(f) && f !== 'registry.ts')
        .map((f) => [f.replace(/\.tsx?$/, ''), `src/${f}`]),
    ),
    banner: { js: '"use client";' },
  },
  { ...shared, entry: { registry: 'src/registry.ts' } },
]);

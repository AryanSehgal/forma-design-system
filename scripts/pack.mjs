import { mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
mkdirSync('artifacts', { recursive: true });
execFileSync('npm', ['pack', '-w', '@forma-design/ui', '--pack-destination', 'artifacts'], {
  stdio: 'inherit',
});
